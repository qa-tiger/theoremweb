// Data layer. Every screen talks to the backend only through these functions.
//
// This is a MOCK that stores everything in localStorage so the whole flow works
// before a backend is chosen. To go live, re-implement each function against the
// real backend (Supabase, Firebase, a custom API…) keeping the same signatures.
// Never ship this file to production: passwords are stored in plain text here.

import { programs } from '../config/site.js'
import { allLessons, curriculum } from '../config/curriculum.js'
import { recordLead } from './leads.js'
import { supabase, isSupabaseConfigured } from './supabase.js'

const KEY = 'academy-mock-db'
const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms))
const uid = () => Math.random().toString(36).slice(2, 10)

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || empty()
  } catch {
    return empty()
  }
}
function empty() {
  return { users: [], session: null, orders: [], enrollments: [], progress: [], quizResults: [], tickets: [], enquiries: [] }
}
function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db))
}
const publicUser = ({ password, ...u }) => u

// ---------- Auth Helper Transformers ----------

export function formatAuthUser(sbUser, studentProfile = null) {
  if (!sbUser) return null
  const meta = sbUser.user_metadata || {}
  return {
    id: sbUser.id,
    email: sbUser.email || '',
    name: studentProfile?.name || meta.name || sbUser.email?.split('@')[0] || 'Student',
    phone: studentProfile?.phone || meta.phone || '',
    country: studentProfile?.city || meta.country || 'India',
    campus: studentProfile?.campus || meta.campus || 'Online',
    programId: studentProfile?.program_id || meta.programId || 'forex-basic',
    programName: studentProfile?.program_name || meta.programName || 'Forex Basic',
    kycStatus: meta.kycStatus || 'Submitted',
    idType: meta.idType || 'aadhaar',
    idNumber: meta.idNumber || '',
    emailConfirmed: Boolean(sbUser.email_confirmed_at),
    createdAt: sbUser.created_at,
    rawUser: sbUser,
  }
}

export async function fetchStudentProfile(email, userId) {
  if (!isSupabaseConfigured() || !supabase) return null
  try {
    let query = supabase.from('students').select('*')
    if (email) {
      query = query.ilike('email', email)
    } else if (userId) {
      query = query.eq('id', userId)
    }
    const { data } = await query.limit(1)
    if (data && data.length > 0) return data[0]
  } catch (err) {
    console.warn('Error fetching student profile:', err)
  }
  return null
}

// ---------- Auth Operations ----------

export async function signUp({ name, email, phone, password, country, idType, idNumber, kycStatus, ...extraFields }) {
  const cleanEmail = (email || '').trim().toLowerCase()

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          name,
          phone,
          country: country || 'India',
          idType: idType || 'aadhaar',
          idNumber: idNumber || '',
          kycStatus: kycStatus || (country === 'India' ? 'Submitted' : 'Not Required'),
          ...extraFields,
        },
      },
    })

    if (error) {
      if (error.message?.includes('already registered')) {
        throw new Error('An account with this email already exists. Log in instead.')
      }
      if (error.code === 'over_email_send_rate_limit' || error.status === 429) {
        throw new Error('Verification email rate limit reached. Please wait a few moments before trying again.')
      }
      if (error.code === 'email_address_invalid') {
        throw new Error('Please enter a valid active email address.')
      }
      throw new Error(error.message)
    }

    const sbUser = data.user
    const isConfirmed = Boolean(sbUser?.email_confirmed_at)
    const formatted = formatAuthUser(sbUser)

    // Sync student record to public.students for Theorem Admin
    try {
      if (sbUser) {
        await supabase.from('students').insert({
          id: sbUser.id,
          name: name || 'Student',
          email: cleanEmail,
          phone: phone || null,
          campus: country === 'India' ? 'Offline' : 'Online',
          program_id: 'forex-basic',
          program_name: 'Forex Basic',
          fee_status: 'Pending',
          enrolled_at: new Date().toISOString().split('T')[0],
        })
      }
    } catch {
      // ignore students insert error if row already exists
    }

    return {
      ...formatted,
      needsEmailVerification: !isConfirmed,
    }
  }

  // Fallback to local storage if Supabase is offline
  await delay()
  const db = load()
  if (db.users.some((u) => u.email === cleanEmail)) {
    throw new Error('An account with this email already exists. Log in instead.')
  }
  const user = {
    id: uid(),
    name,
    email: cleanEmail,
    phone,
    password,
    country,
    idType,
    idNumber,
    kycStatus,
    ...extraFields,
    createdAt: Date.now(),
    onboarded: false,
  }
  db.users.push(user)
  db.session = user.id
  save(db)
  return { ...publicUser(user), needsEmailVerification: false }
}

export async function signIn({ email, password }) {
  const cleanEmail = (email || '').trim().toLowerCase()

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    })

    if (error) {
      if (error.message?.includes('Email not confirmed') || error.code === 'email_not_confirmed') {
        const err = new Error('Your email address has not been verified. Please check your inbox for the confirmation link.')
        err.code = 'email_not_confirmed'
        throw err
      }
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Incorrect email or password. Please try again.')
      }
      throw new Error(error.message)
    }

    const student = await fetchStudentProfile(cleanEmail, data.user?.id)
    return formatAuthUser(data.user, student)
  }

  // Fallback to local storage
  await delay()
  const db = load()
  const user = db.users.find((u) => u.email === cleanEmail)
  if (!user || user.password !== password) {
    throw new Error('Email or password is incorrect.')
  }
  db.session = user.id
  save(db)
  return publicUser(user)
}

export async function signOut() {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.warn('Sign out exception:', err)
    }
  }
  const db = load()
  db.session = null
  save(db)
}

export function getSessionUser() {
  const db = load()
  const user = db.users.find((u) => u.id === db.session)
  return user ? publicUser(user) : null
}

export async function resendVerificationEmail(email) {
  const cleanEmail = (email || '').trim().toLowerCase()
  if (!isSupabaseConfigured() || !supabase) {
    return { success: true }
  }
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: cleanEmail,
  })
  if (error) {
    if (error.code === 'over_email_send_rate_limit' || error.status === 429) {
      throw new Error('Verification email rate limit reached. Please wait a few moments before requesting another link.')
    }
    throw new Error(error.message)
  }
  return { success: true }
}

export async function resetPasswordForEmail(email) {
  const cleanEmail = (email || '').trim().toLowerCase()
  if (!isSupabaseConfigured() || !supabase) {
    return { success: true }
  }
  const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
    redirectTo: `${window.location.origin}/login`,
  })
  if (error) {
    if (error.code === 'over_email_send_rate_limit' || error.status === 429) {
      throw new Error('Rate limit reached. Please wait a few moments before requesting another password reset email.')
    }
    throw new Error(error.message)
  }
  return { success: true }
}

export async function updateProfile(userId, patch) {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.auth.updateUser({
        data: patch,
      })

      // Update matching student record in public.students if exists
      const studentPatch = {}
      if (patch.programId) studentPatch.program_id = patch.programId
      if (patch.programName) studentPatch.program_name = patch.programName
      if (patch.mode || patch.campus) studentPatch.campus = patch.mode || patch.campus
      if (patch.name) studentPatch.name = patch.name
      if (patch.phone) studentPatch.phone = patch.phone

      if (Object.keys(studentPatch).length > 0) {
        studentPatch.updated_at = new Date().toISOString()
        await supabase.from('students').update(studentPatch).eq('id', userId)
      }
    } catch (err) {
      console.warn('Update user profile exception:', err)
    }
  }

  // Fallback to local storage
  const db = load()
  const user = db.users.find((u) => u.id === userId)
  if (user) {
    Object.assign(user, patch)
    save(db)
    return publicUser(user)
  }
  return patch
}

// ---------- Payments ----------
// Replace with Razorpay (India) / Stripe or Telr (UAE). The real flow is:
// createOrder on the server → open the gateway checkout → verify the signature
// on the server → create the enrollment. Never trust the browser to mark an order paid.

export async function createOrder(userId, programId, currency) {
  await delay(200)
  const db = load()
  const program = programs.find((p) => p.id === programId)
  const order = {
    id: 'ord_' + uid(),
    userId,
    programId,
    currency,
    amount: currency === 'AED' ? program.priceAed : program.price,
    status: 'created',
    createdAt: Date.now(),
  }
  db.orders.push(order)
  save(db)
  return order
}

// Mock rule: a card number ending in 0002 is declined, anything else succeeds.
export async function payOrder(orderId, { cardNumber }) {
  await delay(1400)
  const db = load()
  const order = db.orders.find((o) => o.id === orderId)
  const declined = cardNumber.replace(/\s/g, '').endsWith('0002')
  order.status = declined ? 'failed' : 'paid'
  order.paidAt = declined ? null : Date.now()
  if (!declined && !db.enrollments.some((e) => e.userId === order.userId && e.programId === order.programId)) {
    db.enrollments.push({ id: uid(), userId: order.userId, programId: order.programId, orderId, enrolledAt: Date.now() })
  }
  save(db)
  if (declined) throw new Error('Your bank declined the payment. No money was taken. Try another card or UPI.')
  return order
}

// ---------- Courses, progress, quizzes ----------

export async function getEnrollments(userId) {
  await delay(150)
  return load().enrollments.filter((e) => e.userId === userId)
}

export async function getProgress(userId, programId) {
  const db = load()
  const done = new Set(db.progress.filter((p) => p.userId === userId && p.programId === programId).map((p) => p.lessonId))
  const quizzes = db.quizResults.filter((r) => r.userId === userId && r.programId === programId)
  const lessons = allLessons(programId)
  const modules = curriculum[programId] || []
  const passedModules = modules.filter((m) => quizzes.some((q) => q.moduleId === m.id && q.passed)).length
  const total = lessons.length + modules.length
  const complete = done.size + passedModules
  return {
    completedLessons: done,
    quizzes,
    percent: total ? Math.round((complete / total) * 100) : 0,
    finished: total > 0 && complete === total,
  }
}

export async function setLessonComplete(userId, programId, lessonId, complete) {
  const db = load()
  db.progress = db.progress.filter((p) => !(p.userId === userId && p.lessonId === lessonId))
  if (complete) db.progress.push({ userId, programId, lessonId, at: Date.now() })
  save(db)
}

export const PASS_MARK = 0.7

export async function submitQuiz(userId, programId, moduleId, answers) {
  await delay(300)
  const module = curriculum[programId].find((m) => m.id === moduleId)
  const correct = module.quiz.filter((q, i) => answers[i] === q.answer).length
  const score = correct / module.quiz.length
  const result = { id: uid(), userId, programId, moduleId, correct, total: module.quiz.length, passed: score >= PASS_MARK, at: Date.now() }
  const db = load()
  db.quizResults.push(result)
  save(db)
  return result
}

// ---------- Support ----------

export async function createTicket(userId, { topic, message }) {
  await delay()
  const db = load()
  const ticket = { id: 'T-' + (1000 + db.tickets.length + 1), userId, topic, message, status: 'Open', createdAt: Date.now() }
  db.tickets.push(ticket)
  save(db)
  return ticket
}

export async function getTickets(userId) {
  await delay(150)
  return load().tickets.filter((t) => t.userId === userId).reverse()
}

// ---------- Enquiries (contact page) ----------
// In production, store these and notify the admissions team (email or WhatsApp).

export async function createEnquiry(enquiry) {
  await delay()
  const db = load()
  db.enquiries = db.enquiries || []
  const saved = { id: 'E-' + uid(), ...enquiry, createdAt: Date.now() }
  db.enquiries.push(saved)
  save(db)

  // Record to public.leads (with deduplication on email/phone)
  try {
    const contact = (enquiry.contact || '').trim()
    const isEmail = contact.includes('@')
    const email = isEmail ? contact : ''
    const phone = !isEmail ? contact : ''

    const prog = programs.find((p) => p.id === enquiry.program)
    const programName = prog ? prog.title : enquiry.program !== 'not-sure' ? enquiry.program : 'General Inquiry'

    await recordLead({
      name: enquiry.name,
      email,
      phone,
      source: 'Website Form',
      stage: 'New Inquiry',
      campus: enquiry.location || 'Online',
      city: enquiry.location || '',
      programId: enquiry.program !== 'not-sure' ? enquiry.program : null,
      programName,
      noteText: `Submitted Contact Enquiry for ${programName} (${enquiry.location || 'Online'}). Message: ${enquiry.message || 'No additional message'}`,
    })
  } catch (err) {
    console.warn('Error recording enquiry lead:', err)
  }

  return saved
}
