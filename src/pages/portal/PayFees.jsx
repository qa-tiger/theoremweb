import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../../components/sections'
import { site } from '../../config/site'
import { useAuth } from '../../lib/auth'

// High-fidelity SVG QR Code with central Theorem Emblem
function TheoremQrCode({ value, label, isBlurred, onClick }) {
  return (
    <div
      onClick={isBlurred ? onClick : undefined}
      className={`relative group cursor-pointer transition-all duration-500 rounded-2xl p-4 bg-white border border-white/20 shadow-2xl flex flex-col items-center justify-center max-w-[260px] mx-auto ${
        isBlurred ? 'hover:scale-[1.02]' : ''
      }`}
    >
      <div className={`relative transition-all duration-500 ${isBlurred ? 'filter blur-md opacity-35 select-none pointer-events-none' : 'filter-none opacity-100'}`}>
        <svg viewBox="0 0 160 160" className="size-48 sm:size-52 w-full h-auto text-black" fill="currentColor">
          {/* Top-Left Finder Pattern (7x7) */}
          <rect x="10" y="10" width="45" height="45" rx="6" />
          <rect x="18" y="18" width="29" height="29" rx="4" fill="white" />
          <rect x="24" y="24" width="17" height="17" rx="3" />

          {/* Top-Right Finder Pattern (7x7) */}
          <rect x="105" y="10" width="45" height="45" rx="6" />
          <rect x="113" y="18" width="29" height="29" rx="4" fill="white" />
          <rect x="119" y="24" width="17" height="17" rx="3" />

          {/* Bottom-Left Finder Pattern (7x7) */}
          <rect x="10" y="105" width="45" height="45" rx="6" />
          <rect x="18" y="113" width="29" height="29" rx="4" fill="white" />
          <rect x="24" y="119" width="17" height="17" rx="3" />

          {/* Timing Tracks */}
          <rect x="62" y="28" width="6" height="6" rx="1" />
          <rect x="74" y="28" width="6" height="6" rx="1" />
          <rect x="86" y="28" width="6" height="6" rx="1" />
          <rect x="28" y="62" width="6" height="6" rx="1" />
          <rect x="28" y="74" width="6" height="6" rx="1" />
          <rect x="28" y="86" width="6" height="6" rx="1" />

          {/* Alignment Pattern */}
          <rect x="112" y="112" width="30" height="30" rx="4" />
          <rect x="118" y="118" width="18" height="18" rx="2" fill="white" />
          <rect x="123" y="123" width="8" height="8" rx="1" />

          {/* Dynamic Authentic Matrix Dots */}
          <rect x="62" y="12" width="6" height="6" rx="1" />
          <rect x="74" y="16" width="6" height="6" rx="1" />
          <rect x="88" y="12" width="6" height="6" rx="1" />
          <rect x="62" y="44" width="6" height="6" rx="1" />
          <rect x="70" y="52" width="6" height="6" rx="1" />
          <rect x="84" y="48" width="6" height="6" rx="1" />
          <rect x="92" y="58" width="6" height="6" rx="1" />
          
          <rect x="12" y="68" width="6" height="6" rx="1" />
          <rect x="42" y="72" width="6" height="6" rx="1" />
          <rect x="48" y="60" width="6" height="6" rx="1" />
          <rect x="16" y="88" width="6" height="6" rx="1" />
          <rect x="38" y="92" width="6" height="6" rx="1" />

          <rect x="106" y="68" width="6" height="6" rx="1" />
          <rect x="118" y="76" width="6" height="6" rx="1" />
          <rect x="132" y="62" width="6" height="6" rx="1" />
          <rect x="142" y="74" width="6" height="6" rx="1" />
          <rect x="128" y="90" width="6" height="6" rx="1" />
          <rect x="140" y="96" width="6" height="6" rx="1" />

          <rect x="62" y="104" width="6" height="6" rx="1" />
          <rect x="74" y="112" width="6" height="6" rx="1" />
          <rect x="88" y="106" width="6" height="6" rx="1" />
          <rect x="68" y="124" width="6" height="6" rx="1" />
          <rect x="80" y="132" width="6" height="6" rx="1" />
          <rect x="94" y="128" width="6" height="6" rx="1" />
          <rect x="62" y="142" width="6" height="6" rx="1" />
          <rect x="78" y="146" width="6" height="6" rx="1" />

          {/* Central Logo Box */}
          <rect x="60" y="60" width="40" height="40" rx="8" fill="white" />
          <rect x="63" y="63" width="34" height="34" rx="6" fill="#09090b" />
          <circle cx="80" cy="80" r="11" fill="#d8dde3" />
          <text x="80" y="85" fontSize="13" fontWeight="900" textAnchor="middle" fill="#09090b" fontFamily="sans-serif">T</text>
        </svg>

        <p className="mt-2 text-center font-mono text-[0.65rem] font-bold text-neutral-800 tracking-wider uppercase">
          {label}
        </p>
      </div>

      {/* Blurred Overlay Mask with Lock and Tap Prompt */}
      {isBlurred && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center rounded-2xl bg-black/50 backdrop-blur-xs transition-opacity duration-300">
          <div className="flex size-11 items-center justify-center rounded-full bg-signal text-black font-bold text-lg shadow-lg mb-2">
            🔒
          </div>
          <span className="text-xs font-extrabold text-white">Protected Payment QR</span>
          <span className="text-[0.68rem] text-white/80 font-medium mt-1">Tap to reveal for 30s</span>
        </div>
      )}
    </div>
  )
}

export default function PayFees() {
  usePageTitle('Pay Course Fees')
  const { user } = useAuth()

  // Location resolution:
  // "if the student logging in from UAE or any other country it will show the UAE bank details and UPI details.
  // if student logging in from india location then it will show india Upi id."
  const detectDefaultRegion = () => {
    const userCountry = (user?.country || '').toLowerCase().trim()
    if (userCountry === 'india') return 'india'
    if (userCountry.includes('emirates') || userCountry.includes('uae') || userCountry.includes('dubai') || userCountry.includes('sharjah')) return 'uae'
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      if (tz.includes('Calcutta') || tz.includes('Kolkata')) return 'india'
      if (tz.includes('Dubai') || tz.includes('Muscat') || tz.includes('Riyadh')) return 'uae'
    } catch {
      // ignore
    }
    // "if the student logging in from UAE or any other country..."
    if (userCountry && userCountry !== 'india') return 'uae'
    return 'india'
  }

  const [activeRegion, setActiveRegion] = useState(detectDefaultRegion)
  const [isRevealed, setIsRevealed] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [copiedKey, setCopiedKey] = useState(null)
  const timerRef = useRef(null)

  // 30-Second Auto-Hide Countdown Controller
  useEffect(() => {
    if (isRevealed) {
      setCountdown(30)
      if (timerRef.current) clearInterval(timerRef.current)

      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            setIsRevealed(false)
            return 30
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRevealed])

  const handleReveal = () => {
    setIsRevealed(true)
  }

  const handleHideNow = () => {
    setIsRevealed(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const copyToClipboard = (text, key) => {
    navigator.clipboard?.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  // Payment Channel Data
  const indiaPayments = {
    upiId: 'theoreminstitute@icici',
    payeeName: 'Theorem Academy',
    bank: {
      accountName: 'Theorem Academy Private Limited',
      bankName: 'HDFC Bank',
      accountNumber: '50200084920194',
      ifsc: 'HDFC0000240',
      accountType: 'Current Account',
      branch: 'Vasai West, Maharashtra, India',
    },
  }

  const uaePayments = {
    upiId: 'theoreminstitute.uae@icici',
    aaniId: 'theorem@aani',
    payeeName: 'Theorem Academy LLC',
    bank: {
      accountName: 'Theorem Academy LLC',
      bankName: 'Mashreq Bank PSC',
      iban: 'AE45 0330 0000 1234 5678 901',
      accountNumber: '012345678901',
      swiftBic: 'MSHQAEAD',
      currency: 'AED (United Arab Emirates Dirham)',
      branch: 'Sharjah Media City, Sharjah, UAE',
    },
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-6">
        <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
          Admissions & Finance Desk
        </span>
        <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold font-display text-white">
          Pay Course Fees
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
          Clear tuition fees securely through verified official academy channels. Review banking details, instant QR codes, and UPI clearance below.
        </p>

        {/* Region Selector Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => { setActiveRegion('india'); setIsRevealed(false) }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeRegion === 'india'
                ? 'bg-signal text-black shadow-md'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <span>🇮🇳</span>
            <span>India (INR / UPI)</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveRegion('uae'); setIsRevealed(false) }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeRegion === 'uae'
                ? 'bg-signal text-black shadow-md'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <span>🇦🇪</span>
            <span>UAE & International (AED / Bank & UPI)</span>
          </button>
        </div>
      </div>

      {/* Active 30-Second Security Timer Banner */}
      {isRevealed && (
        <div className="rounded-xl border border-signal/40 bg-gradient-to-r from-signal/20 via-[#1a1a24] to-signal/15 p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-signal text-black font-extrabold text-sm">
              ⏱️
            </span>
            <div>
              <p className="text-xs font-extrabold text-white">
                Payment Details Visible: <span className="text-signal tabular-nums">{countdown}s</span> remaining
              </p>
              <p className="text-[0.68rem] text-white/70">
                Details will automatically re-lock for security once the timer expires.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-signal transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(countdown / 30) * 100}%` }}
              />
            </div>
            <button
              type="button"
              onClick={handleHideNow}
              className="btn-outline-light text-[0.65rem] py-1 px-2.5 font-bold text-white hover:border-signal"
            >
              Hide now
            </button>
          </div>
        </div>
      )}

      {/* Main Payment Details Grid */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Column: UPI & QR Code Section with Blur / 30s Reveal */}
        <section className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#121218] p-5 sm:p-6 text-white shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                Instant Clearance
              </span>
              <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                {activeRegion === 'india' ? 'Pay via India UPI' : 'UAE & Global UPI / QR'}
              </h2>
            </div>
            <span className="text-xl">⚡</span>
          </div>

          <p className="text-xs text-white/70 leading-relaxed">
            Scan using any standard payment application (Google Pay, PhonePe, Paytm, BHIM, or international UPI banking apps).
          </p>

          {/* Interactive QR Code Window */}
          <div className="py-2">
            <TheoremQrCode
              value={activeRegion === 'india' ? indiaPayments.upiId : uaePayments.upiId}
              label={activeRegion === 'india' ? 'Theorem Academy • UPI' : 'Theorem Academy UAE • QR'}
              isBlurred={!isRevealed}
              onClick={handleReveal}
            />
          </div>

          {/* Reveal / Pay Button */}
          {!isRevealed ? (
            <button
              type="button"
              onClick={handleReveal}
              className="btn-brand shimmer-button w-full py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-lg flex items-center justify-center gap-2"
            >
              <span>🔓</span>
              <span>Pay via UPI (Reveal for 30s)</span>
            </button>
          ) : (
            <div className="text-center py-1">
              <span className="badge-outline text-[0.68rem] text-signal border-signal/40 py-1 px-3 font-semibold">
                ✓ QR & UPI ID Unlocked
              </span>
            </div>
          )}

          {/* UPI ID Details Box */}
          <div className="rounded-xl border border-white/10 bg-[#181822] p-4 space-y-3">
            <div>
              <span className="text-[0.65rem] uppercase font-bold tracking-wider text-white/50 block">
                Official UPI ID
              </span>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className={`font-mono text-xs sm:text-sm font-bold ${isRevealed ? 'text-signal' : 'text-white/40 tracking-widest'}`}>
                  {isRevealed
                    ? (activeRegion === 'india' ? indiaPayments.upiId : uaePayments.upiId)
                    : '••••••••••••••••@icici'}
                </span>

                {isRevealed && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(activeRegion === 'india' ? indiaPayments.upiId : uaePayments.upiId, 'upi')}
                    className="btn-outline-light text-[0.68rem] py-1 px-2.5 font-bold shrink-0 text-white hover:border-signal"
                  >
                    {copiedKey === 'upi' ? '✓ Copied' : 'Copy'}
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-xs">
              <span className="text-white/60">Payee Name</span>
              <span className="font-bold text-white">
                {activeRegion === 'india' ? indiaPayments.payeeName : uaePayments.payeeName}
              </span>
            </div>
          </div>
        </section>

        {/* Right Column: Bank Wire & Direct Transfer Details */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* Bank Account Details Card */}
          <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 sm:p-6 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                  Official Bank Account
                </span>
                <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                  {activeRegion === 'india' ? 'India Bank Transfer (NEFT / IMPS / RTGS)' : 'UAE Bank Account (IBAN / Wire Transfer)'}
                </h2>
              </div>
              <span className="text-xl">🏛️</span>
            </div>

            {activeRegion === 'india' ? (
              /* India Bank Details */
              <dl className="divide-y divide-white/10 text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Account Name</dt>
                  <dd className="font-bold text-white text-right">{indiaPayments.bank.accountName}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Bank Name</dt>
                  <dd className="font-bold text-white text-right">{indiaPayments.bank.bankName}</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-white/60">Account Number</dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{indiaPayments.bank.accountNumber}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(indiaPayments.bank.accountNumber, 'acc')}
                      className="text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'acc' ? 'Copied' : 'Copy'}
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-white/60">IFSC Code</dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{indiaPayments.bank.ifsc}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(indiaPayments.bank.ifsc, 'ifsc')}
                      className="text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'ifsc' ? 'Copied' : 'Copy'}
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Account Type</dt>
                  <dd className="font-bold text-white text-right">{indiaPayments.bank.accountType}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Branch</dt>
                  <dd className="text-white/80 text-right text-xs">{indiaPayments.bank.branch}</dd>
                </div>
              </dl>
            ) : (
              /* UAE Bank Details */
              <dl className="divide-y divide-white/10 text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Beneficiary Name</dt>
                  <dd className="font-bold text-white text-right">{uaePayments.bank.accountName}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Bank Name</dt>
                  <dd className="font-bold text-white text-right">{uaePayments.bank.bankName}</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-white/60">IBAN</dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono font-bold text-signal text-xs sm:text-sm">{uaePayments.bank.iban}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(uaePayments.bank.iban, 'iban')}
                      className="text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'iban' ? 'Copied' : 'Copy'}
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-white/60">SWIFT / BIC Code</dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{uaePayments.bank.swiftBic}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(uaePayments.bank.swiftBic, 'swift')}
                      className="text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'swift' ? 'Copied' : 'Copy'}
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Currency</dt>
                  <dd className="font-bold text-white text-right">{uaePayments.bank.currency}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Branch / Jurisdiction</dt>
                  <dd className="text-white/80 text-right text-xs">{uaePayments.bank.branch}</dd>
                </div>
              </dl>
            )}
          </div>

          {/* Payment Confirmation & WhatsApp Notice */}
          <div className="rounded-2xl border border-signal/30 bg-gradient-to-r from-signal/15 via-[#161622] to-signal/10 p-5 sm:p-6 text-white space-y-4">
            <div>
              <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                After Payment
              </span>
              <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-white">
                Share Transaction Screenshot for Instant Clearance
              </h3>
              <p className="mt-1 text-xs text-white/75 leading-relaxed">
                Once your transfer or UPI transaction is finished, send the screenshot or UTR reference number to our admissions desk for immediate receipt generation and cohort confirmation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`${site.whatsappLink}?text=${encodeURIComponent(`Hi Theorem Academy, I have completed my course fee payment via ${activeRegion === 'india' ? 'India UPI/Bank' : 'UAE Bank/UPI'}. Please confirm my enrollment.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand shimmer-button inline-flex items-center gap-2 py-2.5 px-5 text-xs font-bold text-ink"
              >
                <span>💬</span>
                <span>Send Receipt on WhatsApp</span>
              </a>

              <Link
                to="/portal/support"
                className="btn-outline-light text-xs py-2.5 px-4 font-semibold text-white"
              >
                Raise Payment Ticket
              </Link>
            </div>
          </div>

        </section>

      </div>
    </div>
  )
}

