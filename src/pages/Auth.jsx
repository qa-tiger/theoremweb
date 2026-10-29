import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { usePageTitle } from '../components/sections'
import { Segmented, Ticket } from '../components/ui'
import { bundlePackage, formatINR, programs, site } from '../config/site'
import { updateProfile } from '../lib/api'
import { useAuth } from '../lib/auth'
import { useProgramFee } from '../lib/pricing'
import { recordLead } from '../lib/leads'

const ALL_OFFERINGS = [...programs, bundlePackage]

function AuthShell({ title, intro, children, aside }) {
  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="wrap grid-12 gap-y-8 lg:gap-x-10">
        <div className="col-span-4 sm:col-span-8 lg:col-span-6">
          <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">Theorem Portal</span>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">{title}</h1>
          {intro && <p className="mt-2 max-w-[30rem] text-xs sm:text-sm text-white/70 leading-relaxed">{intro}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {aside && <div className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8">{aside}</div>}
      </div>
    </section>
  )
}

function ErrorText({ children }) {
  if (!children) return null
  return <p role="alert" className="border-l-4 border-bear bg-bear/10 px-4 py-3 text-xs sm:text-sm text-bear rounded-r-lg">{children}</p>
}

// Password input with a show/hide toggle, so people can check what they typed before submitting.
function PasswordField({ id, label, value, onChange, autoComplete, minLength, hint }) {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <label className="label text-xs font-bold text-white/90" htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          className="field py-2 pr-10 text-xs sm:text-sm"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute right-0 top-0 flex h-full w-9 items-center justify-center text-white/50 hover:text-signal"
        >
          {visible ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M6.6 6.6C4.3 8.1 2.7 10 2 12c1.6 4.2 5.6 7 10 7 1.7 0 3.3-.4 4.7-1.1M12 5c4.4 0 8.4 2.8 10 7-.5 1.3-1.3 2.6-2.3 3.6" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M2 12c1.6-4.2 5.6-7 10-7s8.4 2.8 10 7c-1.6 4.2-5.6 7-10 7s-8.4-2.8-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {hint && <p className="mt-1 text-[0.7rem] text-white/50">{hint}</p>}
    </div>
  )
}

// ---------- Login ----------

export function Login() {
  usePageTitle('Log in')
  const { signIn, resendVerification, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [errorCode, setErrorCode] = useState('')
  const [busy, setBusy] = useState(false)

  // Resend verification email state
  const [resendStatus, setResendStatus] = useState('') // '' | 'sending' | 'sent' | 'error'
  const [resendMsg, setResendMsg] = useState('')

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotStatus, setForgotStatus] = useState('') // '' | 'sending' | 'sent'
  const [forgotMsg, setForgotMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setErrorCode('')
    setResendStatus('')
    try {
      await signIn(form)
      navigate(location.state?.from || '/portal', { replace: true })
    } catch (err) {
      setError(err.message)
      if (err.code === 'email_not_confirmed' || err.message?.toLowerCase().includes('verified') || err.message?.toLowerCase().includes('confirmed')) {
        setErrorCode('email_not_confirmed')
      }
    } finally {
      setBusy(false)
    }
  }

  async function handleResendVerification() {
    if (!form.email) return
    setResendStatus('sending')
    try {
      await resendVerification(form.email)
      setResendStatus('sent')
      setResendMsg(`Verification link sent to ${form.email}. Please check your inbox and spam folder.`)
    } catch (err) {
      setResendStatus('error')
      setResendMsg(err.message || 'Unable to resend verification link at this moment.')
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault()
    if (!forgotEmail.trim()) return
    setForgotStatus('sending')
    setForgotMsg('')
    try {
      await resetPassword(forgotEmail)
      setForgotStatus('sent')
      setForgotMsg(`Password reset link sent to ${forgotEmail}. Please check your inbox.`)
    } catch (err) {
      setForgotStatus('error')
      setForgotMsg(err.message || 'Failed to send password reset link.')
    }
  }

  return (
    <AuthShell title="Log in" intro="Continue your course where you left off.">
      <div className="max-w-[28rem] space-y-4">
        {/* Email Verification Required Banner */}
        {errorCode === 'email_not_confirmed' && (
          <div className="rounded-xl border border-signal/40 bg-signal/15 p-4 text-xs text-white space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-base">✉️</span>
              <span className="font-bold text-signal uppercase tracking-wider text-[0.7rem]">Verification Required</span>
            </div>
            <p className="text-white/80 leading-relaxed text-xs">
              Your email address has not been verified yet. Please check your inbox for the confirmation link sent by Theorem Academy.
            </p>
            {resendStatus === 'sent' ? (
              <p className="text-bull font-bold text-[0.75rem]">✓ {resendMsg}</p>
            ) : resendStatus === 'error' ? (
              <p className="text-bear font-medium text-[0.75rem]">{resendMsg}</p>
            ) : (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendStatus === 'sending'}
                className="btn-brand py-1.5 px-3 text-[0.7rem] font-bold shadow-sm"
              >
                {resendStatus === 'sending' ? 'Sending link…' : 'Resend verification link'}
              </button>
            )}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4 card-rich text-white p-5 sm:p-6">
          <div>
            <label className="label text-xs font-bold text-white/90" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="field py-2 text-xs sm:text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <PasswordField
            id="password"
            label="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                setShowForgot((prev) => !prev)
                setForgotEmail(form.email)
                setForgotStatus('')
                setForgotMsg('')
              }}
              className="link-line text-signal font-semibold"
            >
              {showForgot ? 'Cancel password reset' : 'Forgot your password?'}
            </button>
          </div>

          {/* Quick inline Password Reset form */}
          {showForgot && (
            <div className="rounded-xl border border-white/15 bg-black/50 p-3.5 space-y-2.5 text-xs">
              <span className="block font-bold text-white">Reset Account Password</span>
              <p className="text-[0.68rem] text-white/60">
                Enter your email address and we will send a password reset link to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="field py-1.5 text-xs flex-1"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={forgotStatus === 'sending' || !forgotEmail.trim()}
                  className="btn-brand py-1.5 px-3 text-xs font-bold shrink-0"
                >
                  {forgotStatus === 'sending' ? 'Sending…' : 'Send link'}
                </button>
              </div>
              {forgotStatus === 'sent' && (
                <p className="text-bull font-bold text-[0.7rem]">✓ {forgotMsg}</p>
              )}
              {forgotStatus === 'error' && (
                <p className="text-bear font-medium text-[0.7rem]">{forgotMsg}</p>
              )}
            </div>
          )}

          {errorCode !== 'email_not_confirmed' && <ErrorText>{error}</ErrorText>}

          <button className="btn-brand w-full py-2.5 text-xs sm:text-sm font-bold shadow-md" disabled={busy}>
            {busy ? 'Logging in…' : 'Log in'}
          </button>
          
          <p className="text-xs text-white/60 text-center pt-2">
            New here? <Link to="/register" className="link-line text-signal font-bold">Create an account</Link>
          </p>
        </form>
      </div>
    </AuthShell>
  )
}

// ---------- Registration + onboarding ----------

const STEPS = ['Your account', 'Your program', 'My Portal']

// The three steps really happen in order, so they are numbered on board tiles.
function Stepper({ current }) {
  return (
    <ol className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
      {STEPS.map((s, i) => (
        <li key={s} className="flex items-center gap-2" aria-current={i === current ? 'step' : undefined}>
          <span className={`flap [--flap-w:1.15rem] ${i === current ? 'flap-amber' : i < current ? '' : 'flap-dim'}`} aria-hidden="true">{i < current ? '✓' : i + 1}</span>
          <span className={`text-xs ${i === current ? 'font-bold text-white' : 'text-white/50'}`}>{s}</span>
        </li>
      ))}
    </ol>
  )
}

export function Register() {
  usePageTitle('Apply')
  const { user, signUp, setUser } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [step, setStep] = useState(user ? 1 : 0)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [account, setAccount] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    country: 'India',
    idType: 'aadhaar', // 'aadhaar' | 'pan'
    idNumber: '',
    idFileName: '',
    idFileData: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [prefs, setPrefs] = useState({
    programId: params.get('program') || user?.programId || 'forex-basic',
    mode: user?.mode || 'Online',
    experience: user?.experience || 'Never traded',
  })

  const [verificationNotice, setVerificationNotice] = useState(false)
  const [consentAgreed, setConsentAgreed] = useState(false)

  function handleIdFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      return setError('Document file size must be less than 10MB.')
    }
    const reader = new FileReader()
    reader.onload = () => {
      setAccount((prev) => ({
        ...prev,
        idFileName: file.name,
        idFileData: reader.result,
      }))
      setError('')
    }
    reader.readAsDataURL(file)
  }

  async function createAccount(e) {
    e.preventDefault()
    if (account.password.length < 8) return setError('Use at least 8 characters for your password.')
    if (account.password !== confirmPassword) return setError('Those passwords don’t match.')

    // KYC validation for Indian users
    if (account.country === 'India') {
      const cleanId = account.idNumber.replace(/\s/g, '').trim()
      if (!cleanId) {
        return setError(`Please enter your ${account.idType === 'aadhaar' ? 'Aadhaar' : 'PAN'} number.`)
      }
      if (account.idType === 'aadhaar' && cleanId.length !== 12) {
        return setError('Aadhaar number must contain exactly 12 digits.')
      }
      if (account.idType === 'pan' && cleanId.length !== 10) {
        return setError('PAN card number must contain exactly 10 characters (e.g. ABCDE1234F).')
      }
      if (!account.idFileName) {
        return setError(`Please upload a copy of your ${account.idType === 'aadhaar' ? 'Aadhaar' : 'PAN'} card to complete KYC verification.`)
      }
    }

    if (!consentAgreed) {
      return setError('Please agree to the User Agreement and DPDP Act Privacy Policy to continue.')
    }

    setBusy(true)
    setError('')
    try {
      const res = await signUp({
        ...account,
        kycStatus: account.country === 'India' ? 'Submitted' : 'Not Required',
      })

      if (res?.needsEmailVerification) {
        setVerificationNotice(true)
      }

      // Record lead in public.leads (with deduplication on email/phone)
      try {
        await recordLead({
          name: account.name.trim(),
          email: account.email.trim(),
          phone: account.phone.trim(),
          source: 'Website Registration',
          stage: 'Application Submitted',
          campus: account.country === 'India' ? 'Offline' : 'Online',
          city: account.country || 'India',
          noteText: `Website registration created. KYC: ${account.country === 'India' ? (account.idType ? account.idType.toUpperCase() : 'Submitted') : 'Not Required'} ${account.idNumber ? `(${account.idNumber})` : ''}`,
          estimatedValue: 2400,
        })
      } catch (leadErr) {
        console.warn('Lead capture error on register:', leadErr)
      }

      setStep(1)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const initialProgramId = params.get('program') || params.get('package') || user?.programId || 'forex-basic'
  const initialProgram = ALL_OFFERINGS.find((p) => p.id === initialProgramId) || programs[0]

  const [selectedMarket, setSelectedMarket] = useState(
    initialProgram.market === 'All Markets' ? 'Forex' : initialProgram.market || 'Forex'
  )
  const [selectedLevel, setSelectedLevel] = useState(
    initialProgram.level === 'Comprehensive' ? 'Basic' : initialProgram.level || 'Basic'
  )
  const [isBundle, setIsBundle] = useState(initialProgram.id === bundlePackage.id)

  function handleMarketSelect(market) {
    setSelectedMarket(market)
    setIsBundle(false)
    const match = programs.find(
      (p) => p.market.toLowerCase() === market.toLowerCase() &&
             p.level.toLowerCase() === selectedLevel.toLowerCase()
    )
    if (match) {
      setPrefs((prev) => ({ ...prev, programId: match.id }))
    }
  }

  function handleLevelSelect(level) {
    setSelectedLevel(level)
    setIsBundle(false)
    const match = programs.find(
      (p) => p.market.toLowerCase() === selectedMarket.toLowerCase() &&
             p.level.toLowerCase() === level.toLowerCase()
    )
    if (match) {
      setPrefs((prev) => ({ ...prev, programId: match.id }))
    }
  }

  function handleBundleSelect() {
    setIsBundle(true)
    setPrefs((prev) => ({ ...prev, programId: bundlePackage.id }))
  }

  const program = isBundle
    ? bundlePackage
    : (programs.find((p) => p.id === prefs.programId) || programs[0])

  const { showPrice, priceInr } = useProgramFee(program)

  async function savePrefs(e) {
    if (e) e.preventDefault()
    setBusy(true)
    const updated = await updateProfile(user.id, { ...prefs, onboarded: true })
    setUser(updated)

    // Update existing lead with selected course and batch format
    try {
      await recordLead({
        name: user?.name || account.name,
        email: user?.email || account.email,
        phone: user?.phone || account.phone,
        source: 'Website Registration',
        stage: 'Application Submitted',
        campus: prefs.mode || 'Online',
        city: user?.country || account.country || 'India',
        programId: prefs.programId,
        programName: program?.title || prefs.programId,
        noteText: `Selected program: ${program?.title} (${prefs.mode}). Experience level: ${prefs.experience}`,
        estimatedValue: priceInr || program?.price || 2400,
      })
    } catch (leadErr) {
      console.warn('Lead capture update error on savePrefs:', leadErr)
    }

    // As there is no payment gateway yet, navigate user directly to My Portal (My courses)
    navigate('/portal')
  }

  return (
    <AuthShell
      title={step === 0 ? 'Create your account' : 'Choose your program'}
      intro={step === 0 ? 'Takes 60 seconds. You will select your program and cohort next.' : 'Select your market, level and batch format. You can adjust your cohort anytime with advisors.'}
      aside={step === 1 && program && (
        <Ticket className="lg:sticky lg:top-24 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
              {program.market}
            </span>
            <span className="text-xs text-white/60 font-medium">
              {program.duration}
            </span>
          </div>

          <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-white">
            {program.title}
          </h2>

          <p className="mt-1 text-xs text-white/70 leading-relaxed">
            {program.summary || program.subtitle}
          </p>

          <ul className="mt-4 space-y-2 border-t border-white/15 pt-4 text-xs sm:text-sm text-white/80">
            {program.outcomes.map((o) => (
              <li key={o} className="flex items-center gap-1.5">
                <span className="text-signal font-bold">✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>

          {/* Pricing Logic: Only show prices if returned from DB with price flag active */}
          {showPrice ? (
            <div className="mt-5 flex items-baseline justify-between border-t border-white/15 pt-4">
              <span className="text-xs text-white/60">Cohort Fee</span>
              <div className="text-right">
                {program.originalPrice && (
                  <span className="text-xs line-through text-white/50 block">
                    {formatINR(program.originalPrice)}
                  </span>
                )}
                <span className="font-display text-2xl sm:text-3xl leading-none font-extrabold gold-foil-text tabular-nums">
                  {formatINR(priceInr || program.price)}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 border-t border-white/15 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Fees & Cohort Dates</span>
                <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                  {program.comingSoon ? 'Coming Soon' : 'Admissions Open'}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/75 leading-relaxed">
                Contact admissions for current cohort fees, the next cohort dates, and to check your batch (in person or online).
              </p>
            </div>
          )}

          {/* Contact options as provided across the academy */}
          <div className="mt-5 space-y-2.5 border-t border-white/15 pt-4">
            <Link
              to={`/contact?program=${program.id}`}
              className="btn-brand w-full py-2.5 text-xs sm:text-sm font-bold text-center block shadow-md"
            >
              Contact Admissions about {program.title}
            </Link>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full py-2 text-xs font-semibold text-center flex items-center justify-center gap-1.5 text-white/90"
            >
              <span>💬</span>
              <span>Chat on WhatsApp ({site.whatsapp})</span>
            </a>
          </div>
        </Ticket>
      )}
    >
      <Stepper current={step} />

      {step === 0 && (
        <form onSubmit={createAccount} className="space-y-4 card-rich text-white p-5 sm:p-6">
          <div>
            <label className="label text-xs font-bold text-white/90" htmlFor="name">Full name</label>
            <input id="name" required autoComplete="name" className="field py-2 text-xs sm:text-sm" value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} />
            <p className="mt-1 text-[0.7rem] text-white/50">As you want it printed on your certificate of course completion.</p>
          </div>

          <div>
            <label className="label text-xs font-bold text-white/90" htmlFor="country">Country of residence</label>
            <select
              id="country"
              required
              className="field py-2 text-xs sm:text-sm"
              value={account.country}
              onChange={(e) => setAccount({ ...account, country: e.target.value })}
            >
              <option value="India">India (KYC Required)</option>
              <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Singapore">Singapore</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other country</option>
            </select>
            {account.country === 'India' ? (
              <p className="mt-1 text-[0.7rem] text-signal font-semibold flex items-center gap-1.5">
                <span>🛡️</span> Government KYC verification required for Indian users below.
              </p>
            ) : (
              <p className="mt-1 text-[0.7rem] text-white/50">
                Identity verification is only required for students residing in India.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label text-xs font-bold text-white/90" htmlFor="email">Email</label>
              <input id="email" type="email" required autoComplete="email" className="field py-2 text-xs sm:text-sm" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} />
            </div>
            <div>
              <label className="label text-xs font-bold text-white/90" htmlFor="phone">WhatsApp number</label>
              <input id="phone" type="tel" required autoComplete="tel" placeholder="Phone number" className="field py-2 text-xs sm:text-sm" value={account.phone} onChange={(e) => setAccount({ ...account, phone: e.target.value })} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <PasswordField
              id="password"
              label="Password"
              autoComplete="new-password"
              minLength={8}
              value={account.password}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
              hint="At least 8 characters."
            />
            <PasswordField
              id="confirm-password"
              label="Confirm password"
              autoComplete="new-password"
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Conditional KYC Section for Indian users only */}
          {account.country === 'India' && (
            <div className="rounded-xl border border-signal/40 bg-gradient-to-b from-signal/15 via-[#121218] to-signal/5 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center size-7 rounded-lg bg-signal/25 text-signal text-sm">
                    🆔
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      KYC Identity Verification
                    </h3>
                    <p className="text-[0.68rem] text-white/60">
                      Mandatory for Indian residents. Upload your Aadhaar or PAN card.
                    </p>
                  </div>
                </div>
                <span className="badge-signal text-[0.62rem] font-bold uppercase tracking-wider py-0.5 px-2">
                  Mandatory
                </span>
              </div>

              {/* ID Type Chooser */}
              <div>
                <label className="label text-xs font-bold text-white/90 mb-2 block">
                  Select Document Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      account.idType === 'aadhaar'
                        ? 'border-signal bg-signal/20 text-white font-bold ring-1 ring-signal'
                        : 'border-white/10 bg-black/40 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="idType"
                      value="aadhaar"
                      checked={account.idType === 'aadhaar'}
                      onChange={() => setAccount({ ...account, idType: 'aadhaar', idNumber: '' })}
                      className="sr-only"
                    />
                    <span className="text-xl">🪪</span>
                    <div>
                      <span className="block text-xs font-bold">Aadhaar Card</span>
                      <span className="block text-[0.65rem] text-white/50 font-normal">12-digit UID</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      account.idType === 'pan'
                        ? 'border-signal bg-signal/20 text-white font-bold ring-1 ring-signal'
                        : 'border-white/10 bg-black/40 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="idType"
                      value="pan"
                      checked={account.idType === 'pan'}
                      onChange={() => setAccount({ ...account, idType: 'pan', idNumber: '' })}
                      className="sr-only"
                    />
                    <span className="text-xl">💳</span>
                    <div>
                      <span className="block text-xs font-bold">PAN Card</span>
                      <span className="block text-[0.65rem] text-white/50 font-normal">10-digit PAN</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* ID Number */}
              <div>
                <label className="label text-xs font-bold text-white/90" htmlFor="idNumber">
                  {account.idType === 'aadhaar' ? 'Aadhaar Number (12 digits)' : 'PAN Card Number (10 characters)'}
                </label>
                <input
                  id="idNumber"
                  type="text"
                  required
                  placeholder={account.idType === 'aadhaar' ? 'XXXX XXXX XXXX' : 'ABCDE1234F'}
                  maxLength={account.idType === 'aadhaar' ? 14 : 10}
                  className="field py-2 text-xs sm:text-sm font-mono uppercase tracking-wider"
                  value={account.idNumber}
                  onChange={(e) => {
                    let val = e.target.value
                    if (account.idType === 'aadhaar') {
                      val = val.replace(/\D/g, '').slice(0, 12).replace(/(\d{4})(?=\d)/g, '$1 ')
                    } else {
                      val = val.toUpperCase().slice(0, 10)
                    }
                    setAccount({ ...account, idNumber: val })
                  }}
                />
              </div>

              {/* ID Document File Upload */}
              <div>
                <label className="label text-xs font-bold text-white/90 mb-1.5 flex items-center justify-between">
                  <span>Upload {account.idType === 'aadhaar' ? 'Aadhaar Card' : 'PAN Card'}</span>
                  <span className="text-[0.68rem] text-white/50 font-normal">PDF, JPG, PNG up to 10MB</span>
                </label>

                {!account.idFileName ? (
                  <label className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-white/20 hover:border-signal/60 bg-black/40 hover:bg-black/60 cursor-pointer transition-all text-center group">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="sr-only"
                      onChange={handleIdFileUpload}
                    />
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">📄</span>
                    <span className="text-xs font-semibold text-white group-hover:text-signal transition-colors">
                      Click to upload ID document
                    </span>
                    <span className="text-[0.68rem] text-white/50 mt-0.5">
                      Ensure name and photo are clearly readable
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl border border-signal/40 bg-black/60">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {account.idFileData && account.idFileData.startsWith('data:image') ? (
                        <img
                          src={account.idFileData}
                          alt="ID preview"
                          className="size-9 rounded-lg object-cover border border-white/20 shrink-0"
                        />
                      ) : (
                        <span className="flex items-center justify-center size-9 rounded-lg bg-signal/20 text-signal font-bold text-sm shrink-0">
                          📄
                        </span>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[280px]">
                          {account.idFileName}
                        </p>
                        <p className="text-[0.68rem] text-bull font-semibold flex items-center gap-1 mt-0.5">
                          <span>✓</span> Document attached ready for verification
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAccount({ ...account, idFileName: '', idFileData: '' })}
                      className="text-xs text-bear hover:underline font-semibold ml-2 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-white/80 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consentAgreed}
                onChange={(e) => setConsentAgreed(e.target.checked)}
                className="mt-0.5 size-4 rounded border-white/20 bg-black/40 text-signal focus:ring-signal"
              />
              <span className="leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" target="_blank" className="text-signal underline hover:text-white">
                  User Agreement
                </Link>{' '}
                and provide explicit consent to Theorem Academy collecting and processing my data in accordance with the{' '}
                <Link to="/privacy" target="_blank" className="text-signal underline hover:text-white">
                  DPDP Act Privacy Policy
                </Link>.
              </span>
            </label>
          </div>

          <ErrorText>{error}</ErrorText>
          <button className="btn-brand w-full py-2.5 text-xs sm:text-sm font-bold shadow-md" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
          <p className="text-xs text-white/60 text-center pt-1">Already have an account? <Link to="/login" className="link-line text-signal font-bold">Log in</Link></p>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={savePrefs} className="space-y-6 card-rich text-white p-5 sm:p-6">
          {verificationNotice && (
            <div className="rounded-xl border border-signal/40 bg-signal/15 p-4 sm:p-5 text-white space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">✉️</span>
                <h3 className="font-display font-extrabold text-sm sm:text-base text-white">
                  Verification link sent to {account.email}
                </h3>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Please check your inbox (and spam folder) for the verification link. Once confirmed, you can log into your student portal. You can finalize your cohort options below:
              </p>
            </div>
          )}

          {/* 1. Market Selection: Forex, Crypto, Equity */}
          <div>
            <label className="label text-xs font-bold text-white/90 mb-2 block">
              1. Select Asset Market
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {[
                { id: 'Forex', name: 'Forex', icon: '💱', desc: 'Currencies' },
                { id: 'Crypto', name: 'Crypto', icon: '🪙', desc: 'Digital Assets' },
                { id: 'Equity', name: 'Equity', icon: '📈', desc: 'Stocks & Indices' },
              ].map((m) => {
                const active = !isBundle && selectedMarket === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMarketSelect(m.id)}
                    className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      active
                        ? 'border-signal bg-signal/20 text-white font-bold ring-2 ring-signal/50 shadow-lg'
                        : 'border-white/10 bg-[#0c0c0e] text-white/70 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl mb-1">{m.icon}</span>
                    <span className="font-display text-sm sm:text-base font-extrabold text-white leading-tight">
                      {m.name}
                    </span>
                    <span className="text-[0.65rem] text-white/50 mt-0.5 hidden sm:block">
                      {m.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Level Selection Dropdown: Basic, Intermediate, Advanced */}
          <div>
            <label className="label text-xs font-bold text-white/90 mb-1.5 block" htmlFor="level-select">
              2. Select Experience Tier
            </label>
            <select
              id="level-select"
              className="field py-2.5 text-xs sm:text-sm font-semibold"
              value={isBundle ? '' : selectedLevel}
              onChange={(e) => handleLevelSelect(e.target.value)}
            >
              <option value="Basic">Basic — Beginner foundations, chart mechanics & 1% risk rules</option>
              <option value="Intermediate">Intermediate — Higher-timeframe structure & reviewed journaling</option>
              <option value="Advanced">Advanced — Institutional liquidity concepts & weekly live reviews</option>
            </select>

            {/* Selected Program Indicator Banner */}
            <div className="mt-3 p-3 rounded-xl border border-white/10 bg-[#0c0c0e] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-white">
                    {program.title}
                  </span>
                  {program.comingSoon && (
                    <span className="rounded border border-white/20 bg-white/5 px-1.5 py-0.2 text-[0.65rem] font-bold text-white/70">
                      Coming soon
                    </span>
                  )}
                </div>
                <span className="text-[0.68rem] text-white/50 mt-0.5 block">
                  {program.level} • {program.duration} • {program.format}
                </span>
              </div>
              <button
                type="button"
                onClick={handleBundleSelect}
                className={`text-[0.68rem] font-bold px-2.5 py-1.5 rounded-lg border transition-all self-start sm:self-auto cursor-pointer ${
                  isBundle
                    ? 'bg-signal text-black border-signal'
                    : 'bg-white/5 text-signal border-signal/30 hover:bg-signal/15'
                }`}
              >
                {isBundle ? '✓ All 4 Bundle Selected' : 'Switch to 4-Course Bundle'}
              </button>
            </div>
          </div>

          {/* 3. Attendance Format */}
          <fieldset>
            <legend className="label text-xs font-bold text-white/90 mb-2">3. Attendance Format</legend>
            <Segmented
              name="Attendance"
              options={[['Online', 'Online'], ['Offline', 'Offline']]}
              value={prefs.mode}
              onChange={(mode) => setPrefs({ ...prefs, mode })}
            />
          </fieldset>

          {/* 4. Prior Trading Experience */}
          <div>
            <label className="label text-xs font-bold text-white/90" htmlFor="exp">4. Prior trading experience</label>
            <select id="exp" className="field py-2 text-xs sm:text-sm" value={prefs.experience} onChange={(e) => setPrefs({ ...prefs, experience: e.target.value })}>
              <option>Never traded</option>
              <option>Less than 1 year</option>
              <option>1–3 years</option>
              <option>More than 3 years</option>
            </select>
          </div>

          <div>
            <button className="btn-brand w-full py-2.5 text-xs sm:text-sm font-bold shadow-md" disabled={busy}>
              {busy ? 'Saving selection…' : 'Continue to My Courses →'}
            </button>
            <p className="text-[0.7rem] text-white/50 text-center mt-2">
              No upfront payment required. Your program selection is saved to your student portal.
            </p>
          </div>
        </form>
      )}
    </AuthShell>
  )
}

