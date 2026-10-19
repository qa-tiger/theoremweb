import { supabase, isSupabaseConfigured } from './supabase.js'

const LEADS_TABLE = 'leads'
const LOCAL_LEADS_KEY = 'academy-leads'

/**
 * Normalizes an email string.
 */
export function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return ''
  return email.trim().toLowerCase()
}

/**
 * Normalizes a phone string (removes whitespace and extra dashes).
 */
export function normalizePhone(phone) {
  if (!phone || typeof phone !== 'string') return ''
  return phone.trim().replace(/[\s-]/g, '')
}

/**
 * Loads leads saved in local storage fallback cache.
 */
function getLocalLeads() {
  try {
    const raw = localStorage.getItem(LOCAL_LEADS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Saves leads to local storage fallback cache.
 */
function saveLocalLeads(leads) {
  try {
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(leads))
  } catch {
    // Ignore storage errors in private browsing
  }
}

/**
 * Finds an existing lead in the local storage cache by email or phone.
 */
function findExistingLocalLead(cleanEmail, cleanPhone) {
  const localLeads = getLocalLeads()
  return localLeads.find((l) => {
    const matchEmail = cleanEmail && normalizeEmail(l.email) === cleanEmail
    const matchPhone = cleanPhone && normalizePhone(l.phone) === cleanPhone
    return matchEmail || matchPhone
  })
}

/**
 * Creates a formatted timeline note entry matching Theorem Admin's schema:
 * { id: 'n-...', date: 'YYYY-MM-DD', author: 'Website System', text: '...' }
 */
export function createNoteEntry(text, author = 'Website System') {
  return {
    id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date: new Date().toISOString().split('T')[0],
    author,
    text: text.trim(),
  }
}

/**
 * Central Lead Record & Deduplication Function
 * 
 * Centralizes all 3 website operations:
 * 1. Registration Form ('Website Registration' / 'Application Submitted')
 * 2. Download E-book ('Free eBook Download' / 'New Inquiry')
 * 3. Send Enquiry Form ('Website Form' / 'New Inquiry')
 * 
 * If a lead with matching email or phone already exists:
 * - Appends the new activity to their existing `notes` jsonb timeline.
 * - Updates stage (elevates if higher intent, e.g. New Inquiry -> Application Submitted).
 * - Updates metadata / campus / course if newly provided.
 * - Does NOT create a duplicate row.
 * 
 * @param {Object} params
 * @param {string} params.name - User's full name
 * @param {string} [params.email] - User's email
 * @param {string} [params.phone] - User's phone / WhatsApp
 * @param {string} [params.source] - 'Website Registration' | 'Free eBook Download' | 'Website Form'
 * @param {string} [params.stage] - 'New Inquiry' | 'Application Submitted'
 * @param {string} [params.campus] - 'Online' | 'Dubai' | 'India'
 * @param {string} [params.city] - City or Country
 * @param {string} [params.programId] - Course ID (e.g. 'forex-basic')
 * @param {string} [params.programName] - Course Title (e.g. 'Forex Basic')
 * @param {string} [params.noteText] - Activity description for chronological timeline
 * @param {number} [params.estimatedValue] - Course tuition estimate
 * @returns {Promise<{ success: boolean, leadId: string, isDuplicate: boolean, error?: any }>}
 */
export async function recordLead({
  name,
  email,
  phone,
  source = 'Website Form',
  stage = 'New Inquiry',
  campus = 'Online',
  city = null,
  programId = null,
  programName = null,
  noteText = '',
  estimatedValue = 2400,
}) {
  const cleanEmail = normalizeEmail(email)
  const cleanPhone = normalizePhone(phone)
  const leadName = (name || '').trim() || 'Website Visitor'

  const noteEntry = noteText ? createNoteEntry(noteText) : null

  // 1. Try to find an existing lead in Supabase or local cache
  let existingLead = null

  if (isSupabaseConfigured() && supabase) {
    try {
      if (cleanEmail) {
        const { data } = await supabase
          .from(LEADS_TABLE)
          .select('*')
          .ilike('email', cleanEmail)
          .limit(1)

        if (data && data.length > 0) {
          existingLead = data[0]
        }
      }

      if (!existingLead && cleanPhone) {
        const { data } = await supabase
          .from(LEADS_TABLE)
          .select('*')
          .eq('phone', cleanPhone)
          .limit(1)

        if (data && data.length > 0) {
          existingLead = data[0]
        }
      }
    } catch (err) {
      console.warn('Supabase lead query exception:', err)
    }
  }

  // Fallback to local storage if not found in Supabase
  if (!existingLead) {
    existingLead = findExistingLocalLead(cleanEmail, cleanPhone)
  }

  // =========================================================================
  // CASE A: EXISTING LEAD FOUND -> APPEND NOTE & UPDATE (NO DUPLICATE ROW)
  // =========================================================================
  if (existingLead) {
    const existingNotes = Array.isArray(existingLead.notes)
      ? existingLead.notes
      : existingLead.notes
      ? [{ id: `n-legacy`, date: new Date().toISOString().split('T')[0], author: 'System', text: String(existingLead.notes) }]
      : []

    const updatedNotes = noteEntry ? [noteEntry, ...existingNotes] : existingNotes

    // Elevate stage if newly submitting an application
    let newStage = existingLead.stage || 'New Inquiry'
    if (stage === 'Application Submitted') {
      newStage = 'Application Submitted'
    }

    const updates = {
      notes: updatedNotes,
      updated_at: new Date().toISOString(),
    }

    if (newStage !== existingLead.stage) updates.stage = newStage
    if (campus && campus !== 'Online') updates.campus = campus
    if (city && !existingLead.city) updates.city = city
    if (programId && !existingLead.program_id) updates.program_id = programId
    if (programName && !existingLead.program_name) updates.program_name = programName
    if (!existingLead.email && cleanEmail) updates.email = cleanEmail
    if (!existingLead.phone && cleanPhone) updates.phone = cleanPhone

    // Update in Supabase
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from(LEADS_TABLE)
          .update(updates)
          .eq('id', existingLead.id)

        if (error) {
          console.warn('Supabase lead update error:', error)
        }
      } catch (err) {
        console.warn('Supabase lead update exception:', err)
      }
    }

    // Update in local cache
    const localLeads = getLocalLeads()
    const updatedLocal = localLeads.map((l) => (l.id === existingLead.id ? { ...l, ...updates } : l))
    saveLocalLeads(updatedLocal)

    return {
      success: true,
      leadId: existingLead.id,
      isDuplicate: true,
    }
  }

  // =========================================================================
  // CASE B: NEW LEAD -> INSERT ROW
  // =========================================================================
  const newLeadId = `LD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  const initialNotes = noteEntry ? [noteEntry] : []

  const leadRow = {
    id: newLeadId,
    name: leadName,
    email: cleanEmail || null,
    phone: cleanPhone || null,
    campus: campus || 'Online',
    city: city || null,
    program_id: programId || null,
    program_name: programName || null,
    stage: stage || 'New Inquiry',
    lead_score: stage === 'Application Submitted' ? 90 : 80,
    source: source || 'Website Form',
    counselor: 'Admissions Desk',
    estimated_value: Number(estimatedValue) || 2400,
    compliance_agreed: true,
    notes: initialNotes,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Insert to Supabase
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from(LEADS_TABLE).insert(leadRow)
      if (error) {
        console.warn('Supabase lead insert error:', error)
      }
    } catch (err) {
      console.warn('Supabase lead insert exception:', err)
    }
  }

  // Save to local cache
  const localLeads = getLocalLeads()
  saveLocalLeads([leadRow, ...localLeads])

  return {
    success: true,
    leadId: newLeadId,
    isDuplicate: false,
  }
}
