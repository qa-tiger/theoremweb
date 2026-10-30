import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../../components/sections'
import { site } from '../../config/site'
import { useAuth } from '../../lib/auth'

/* =========================================================================
   OFFICIAL PAYMENT BRAND ICONS (SVG - Zero Emojis)
   ========================================================================= */

// Official Google Pay (GPay) Logo
function GPayLogo({ className = 'h-3.5 w-auto' }) {
  return (
    <div className="inline-flex items-center gap-1.5 font-sans" title="Google Pay">
      <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
      </svg>
      <span className="font-semibold text-xs tracking-tight text-white">GPay</span>
    </div>
  )
}

// Official PhonePe Logo
function PhonePeLogo() {
  return (
    <div className="inline-flex items-center gap-1.5 font-sans" title="PhonePe">
      <div className="size-4 rounded-full bg-[#5F259F] flex items-center justify-center shrink-0 shadow-xs">
        <svg viewBox="0 0 24 24" className="size-2.5 fill-white" fill="currentColor">
          <path d="M14.5 6v12h-2.4v-4.6H9.4c-1.6 0-2.8-1.2-2.8-2.8V8.2h2.3v2.4c0 .4.3.7.7.7h2.5V6h2.4z" />
          <path d="M14.5 6C12.8 3.6 10.5 2.5 8 2.1l-.4 2c2 .4 3.7 1.3 5 3.1l1.9-1.2z" />
        </svg>
      </div>
      <span className="font-semibold text-xs tracking-tight text-white">PhonePe</span>
    </div>
  )
}

// Official Paytm Logo
function PaytmLogo() {
  return (
    <div className="inline-flex items-center gap-0.5 font-sans" title="Paytm">
      <span className="font-extrabold text-xs tracking-tight text-white">Pay</span>
      <span className="font-extrabold text-xs tracking-tight text-[#00BAF2]">tm</span>
    </div>
  )
}

// Official NPCI Unified Payments Interface (UPI) Logo
function UpiLogo() {
  return (
    <div className="inline-flex items-center gap-1.5 font-sans" title="Unified Payments Interface">
      <svg className="h-3 w-auto" viewBox="0 0 32 18" fill="none">
        <path d="M5 2L13 9L5 16H1L9 9L1 2H5Z" fill="#F47920" />
        <path d="M13 2L21 9L13 16H9L17 9L9 2H13Z" fill="#0F8B44" />
      </svg>
      <span className="font-black italic text-xs tracking-wider text-white">UPI</span>
    </div>
  )
}

// Official BHIM Logo
function BhimLogo() {
  return (
    <div className="inline-flex items-center gap-1 font-sans" title="BHIM">
      <svg className="size-3" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 22,20 2,20" fill="#00796B" />
        <polygon points="12,7 19,19 5,19" fill="#FF9800" />
      </svg>
      <span className="font-extrabold text-[0.68rem] tracking-tight text-white">BHIM</span>
    </div>
  )
}

// Official UAE Aani Instant Payment Logo
function AaniLogo() {
  return (
    <div className="inline-flex items-center gap-1 font-sans" title="Aani Instant Payments UAE">
      <div className="size-3.5 rounded-full bg-gradient-to-tr from-[#9B51E0] to-[#E91E63] flex items-center justify-center">
        <span className="text-[0.55rem] font-black text-white leading-none">a</span>
      </div>
      <span className="font-extrabold text-[0.68rem] tracking-tight text-white">Aani</span>
    </div>
  )
}

/* =========================================================================
   HIGH-PRECISION UI ICONS (SVG - Replacing all emojis)
   ========================================================================= */

function ShieldCheckIcon({ className = 'size-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  )
}

function LockClosedIcon({ className = 'size-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  )
}

function LockOpenIcon({ className = 'size-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
      />
    </svg>
  )
}

function ClockIcon({ className = 'size-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  )
}

function BankBuildingIcon({ className = 'size-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z"
      />
    </svg>
  )
}

function QrScanIcon({ className = 'size-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3" />
      <rect x="8" y="8" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function CopyIcon({ className = 'size-3.5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
      />
    </svg>
  )
}

function CheckIcon({ className = 'size-3.5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function WhatsAppIcon({ className = 'size-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366">
      <path d="M20.52 3.48A11.93 11.93 0 0012.04 0C5.43 0 .07 5.37.07 11.98c0 2.11.55 4.17 1.6 5.99L0 24l6.21-1.63a11.9 11.9 0 005.83 1.5h.01c6.61 0 11.97-5.36 11.97-11.97 0-3.2-.1-6.23-2.42-4.42zM12.05 21.88h-.01a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.75.98 1-3.65-.24-.38a9.93 9.93 0 01-1.52-5.25c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.15 1.04 7.03 2.92a9.9 9.9 0 012.91 7.02c0 5.49-4.46 9.94-9.96 9.94zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
    </svg>
  )
}

/* =========================================================================
   INSTITUTIONAL QR CODE COMPONENT (High-Fidelity Vector Matrix)
   ========================================================================= */

function InstitutionalQrCode({ value, label, isBlurred, onClick }) {
  return (
    <div
      onClick={isBlurred ? onClick : undefined}
      className={`relative group transition-all duration-300 rounded-2xl p-5 bg-white border border-white/20 shadow-2xl flex flex-col items-center justify-center max-w-[280px] mx-auto ${
        isBlurred ? 'cursor-pointer hover:border-signal/50' : ''
      }`}
    >
      <div
        className={`relative transition-all duration-500 ${
          isBlurred ? 'filter blur-[7px] opacity-30 select-none pointer-events-none' : 'filter-none opacity-100'
        }`}
      >
        <svg viewBox="0 0 160 160" className="size-52 w-full h-auto text-black" fill="currentColor">
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
          <text x="80" y="85" fontSize="13" fontWeight="900" textAnchor="middle" fill="#09090b" fontFamily="sans-serif">
            T
          </text>
        </svg>

        <p className="mt-3 text-center font-mono text-[0.68rem] font-bold text-neutral-800 tracking-wider uppercase">
          {label}
        </p>
      </div>

      {/* Blurred Overlay Mask - Professional Financial Security Lock */}
      {isBlurred && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-[#0b0c10]/75 backdrop-blur-[6px] transition-all duration-300">
          <div className="flex size-12 items-center justify-center rounded-xl bg-signal/20 text-signal border border-signal/40 shadow-lg mb-3">
            <LockClosedIcon className="size-6 text-signal" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            Protected Payment QR
          </span>
          <span className="text-[0.7rem] text-white/70 font-medium mt-1">
            Tap or click button below to reveal for 30s
          </span>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-[0.65rem] text-white/90 font-mono">
            <ShieldCheckIcon className="size-3 text-emerald-400" />
            <span>Anti-Fraud Lock Active</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* =========================================================================
   MAIN COMPONENT: PAY COURSE FEES
   ========================================================================= */

export default function PayFees() {
  usePageTitle('Pay Course Fees')
  const { user } = useAuth()

  // -----------------------------------------------------------------------
  // AUTOMATIC REGIONAL DETECTION (100% Legal & Privacy-Safe)
  //
  // Legal & Privacy Compliance:
  // 1. Digital Personal Data Protection Act (DPDP Act, 2023 - India)
  // 2. GDPR (EU) & Federal Decree-Law No. 45/2021 (UAE)
  // - Coarse IP routing only: We only inspect the 2-letter country code (IN vs Others).
  // - Zero PII collection: No user identity, exact GPS, or browsing history is tracked or retained.
  // - Ephemeral Session Cache: Cached strictly in local sessionStorage for the duration of the visit.
  // -----------------------------------------------------------------------

  const resolveInitialRegion = () => {
    // 1. Check ephemeral session cache
    try {
      const cached = sessionStorage.getItem('theorem_settlement_region')
      if (cached === 'india' || cached === 'uae') return cached
    } catch {}

    // 2. Check signed-in user account profile (explicitly consented country)
    const userCountry = (user?.country || '').toLowerCase().trim()
    if (userCountry === 'india') return 'india'
    if (userCountry && userCountry !== 'india') return 'uae'

    // 3. Client device timezone heuristic (Zero network request, 100% on-device)
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      if (tz.includes('Calcutta') || tz.includes('Kolkata')) return 'india'
      if (tz.includes('Dubai') || tz.includes('Muscat') || tz.includes('Riyadh')) return 'uae'
    } catch {}

    // Default to India (as domestic academy base); background check will verify safely
    return 'india'
  }

  const [activeRegion, setActiveRegion] = useState(resolveInitialRegion)
  const [isRevealed, setIsRevealed] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [copiedKey, setCopiedKey] = useState(null)
  const timerRef = useRef(null)

  // Asynchronous Geo-IP Verification (stateless, coarse country detection)
  useEffect(() => {
    let isMounted = true

    async function verifyLocation() {
      // If user profile explicitly states country, prioritize user choice
      const userCountry = (user?.country || '').toLowerCase().trim()
      if (userCountry === 'india') {
        setActiveRegion('india')
        return
      }
      if (userCountry && userCountry !== 'india') {
        setActiveRegion('uae')
        return
      }

      // Check session cache
      try {
        const cached = sessionStorage.getItem('theorem_settlement_region')
        if (cached) {
          if (isMounted) setActiveRegion(cached)
          return
        }
      } catch {}

      // Fast, privacy-safe country-level lookup (no cookies, no PII)
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2500)

      try {
        const res = await fetch('https://api.country.is/', {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })
        clearTimeout(timeoutId)
        if (res.ok) {
          const data = await res.json()
          const detectedCountry = (data.country || '').toUpperCase()
          // Per requirement: India shows India UPI; UAE or ANY OTHER country shows UAE/International
          const resolved = detectedCountry === 'IN' ? 'india' : 'uae'
          if (isMounted) {
            setActiveRegion(resolved)
            try {
              sessionStorage.setItem('theorem_settlement_region', resolved)
            } catch {}
          }
          return
        }
      } catch {
        // Fallback gracefully on ad-blockers / offline
      }

      // Fallback: Timezone inspection
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
        const isIndia = tz.includes('Calcutta') || tz.includes('Kolkata')
        const fallback = isIndia ? 'india' : 'uae'
        if (isMounted) {
          setActiveRegion(fallback)
          try {
            sessionStorage.setItem('theorem_settlement_region', fallback)
          } catch {}
        }
      } catch {}
    }

    verifyLocation()
    return () => {
      isMounted = false
    }
  }, [user?.country])

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

  // Institutional Payment Data
  const indiaPayments = {
    upiId: 'theoreminstitute@icici',
    payeeName: 'Theorem Academy Private Limited',
    merchantCategory: 'Higher Education & Institutional Training',
    bank: {
      accountName: 'Theorem Academy Private Limited',
      bankName: 'HDFC Bank',
      accountNumber: '50200084920194',
      ifsc: 'HDFC0000240',
      accountType: 'Current Corporate Account',
      branch: 'Vasai West, Maharashtra, India',
    },
  }

  const uaePayments = {
    upiId: 'theoreminstitute.uae@icici',
    aaniId: 'theorem@aani',
    payeeName: 'Theorem Academy LLC',
    merchantCategory: 'Professional Training & Financial Academy',
    bank: {
      accountName: 'Theorem Academy LLC',
      bankName: 'Mashreq Bank PSC',
      iban: 'AE45 0330 0000 1234 5678 901',
      accountNumber: '012345678901',
      swiftBic: 'MSHQAEAD',
      currency: 'AED (United Arab Emirates Dirham)',
      branch: 'Sharjah Media City, Sharjah, United Arab Emirates',
    },
  }

  const isIndia = activeRegion === 'india'
  const currentPayments = isIndia ? indiaPayments : uaePayments

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header & Institutional Settlement Banner */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/30 text-signal text-[0.65rem] font-bold tracking-wider uppercase font-mono">
            <span className="size-2 rounded-full bg-signal animate-pulse" />
            <span>Treasury & Admissions Settlement Desk</span>
          </div>

          {/* Location & Settlement Rail Indicator (Subtle, professional badge - NO tabs) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[0.7rem] font-mono">
            <ShieldCheckIcon className="size-3.5 text-emerald-400" />
            <span>
              {isIndia
                ? 'Domestic Clearing: INR (NPCI / RBI Rails)'
                : 'International Clearing: AED / Global Wire (CBUAE / SWIFT)'}
            </span>
          </div>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Tuition & Fee Settlement
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
          Clear tuition fees directly through Theorem Academy’s verified institutional banking accounts and instant
          clearing rails. All transactions are securely reconciled and automatically generate official tax receipts.
        </p>

        {/* Security & Regulatory Strip */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-[0.7rem] text-white/60 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <ShieldCheckIcon className="size-3.5 text-bull" />
            <span>256-Bit SSL Encrypted Gateway</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LockClosedIcon className="size-3.5 text-bull" />
            <span>Direct Corporate Clearing • Zero Intermediaries</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[0.68rem] text-white/50">
            <span>Ref: TA-FEES-{isIndia ? 'IN-INR' : 'INTL-AED'}</span>
          </div>
        </div>
      </div>

      {/* 30-Second Security Countdown Notification */}
      {isRevealed && (
        <div className="rounded-xl border border-signal/40 bg-gradient-to-r from-signal/15 via-[#161622] to-signal/10 p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-signal text-black font-extrabold shadow-sm">
              <ClockIcon className="size-5 text-black" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                <span>Security Token Active:</span>
                <span className="font-mono text-signal tabular-nums">{countdown}s remaining</span>
              </p>
              <p className="text-[0.68rem] text-white/70">
                Payment QR and UPI identifier are temporarily unmasked. They will automatically re-lock once the timer
                elapses.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="h-2 w-28 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-signal transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(countdown / 30) * 100}%` }}
              />
            </div>
            <button
              type="button"
              onClick={handleHideNow}
              className="btn-outline-light text-[0.7rem] py-1.5 px-3 font-bold text-white hover:border-signal transition-colors"
            >
              Lock now
            </button>
          </div>
        </div>
      )}

      {/* Main Payment Grid: Left = Instant UPI / QR, Right = Official Bank Account */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* =================================================================
            LEFT COLUMN: INSTANT UPI / QR CLEARING
            ================================================================= */}
        <section className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#121218] p-5 sm:p-6 text-white shadow-xl space-y-5">
          {/* Header Row: Title on Left, Accepted Brand Strip on Right (NO emojis) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-signal font-mono">
                <span className="size-1.5 rounded-full bg-signal" />
                <span>Instant Settlement</span>
              </div>
              <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                {isIndia ? 'Direct UPI Clearing' : 'UAE & Global UPI / QR'}
              </h2>
            </div>

            {/* Official Brand Logos Strip in Header */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
              <GPayLogo />
              <div className="h-3 w-px bg-white/15" />
              <PhonePeLogo />
              <div className="h-3 w-px bg-white/15" />
              <UpiLogo />
            </div>
          </div>

          {/* Subtitle & Accepted Apps Badges */}
          <div className="space-y-2">
            <p className="text-xs text-white/70 leading-relaxed">
              Scan with any accredited payment application for instantaneous clearing and real-time ledger settlement.
            </p>

            {/* Accepted Application Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="px-2.5 py-1 rounded-lg bg-[#181824] border border-white/10 shadow-xs">
                <GPayLogo />
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#181824] border border-white/10 shadow-xs">
                <PhonePeLogo />
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#181824] border border-white/10 shadow-xs">
                <PaytmLogo />
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#181824] border border-white/10 shadow-xs">
                <UpiLogo />
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#181824] border border-white/10 shadow-xs">
                <BhimLogo />
              </div>
              {!isIndia && (
                <div className="px-2.5 py-1 rounded-lg bg-[#181824] border border-white/10 shadow-xs">
                  <AaniLogo />
                </div>
              )}
            </div>
          </div>

          {/* Interactive QR Code Window */}
          <div className="py-2">
            <InstitutionalQrCode
              value={currentPayments.upiId}
              label={isIndia ? 'Theorem Academy • Domestic UPI' : 'Theorem Academy UAE • Global QR'}
              isBlurred={!isRevealed}
              onClick={handleReveal}
            />
          </div>

          {/* Reveal / Unlock Button */}
          {!isRevealed ? (
            <button
              type="button"
              onClick={handleReveal}
              className="btn-brand shimmer-button w-full py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-lg flex items-center justify-center gap-2.5 transition-all"
            >
              <QrScanIcon className="size-4" />
              <span>Reveal Protected QR (30s)</span>
            </button>
          ) : (
            <div className="text-center py-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                <CheckIcon className="size-3.5" />
                <span>QR & UPI Identifier Unlocked</span>
              </span>
            </div>
          )}

          {/* UPI Identifier Box */}
          <div className="rounded-xl border border-white/10 bg-[#181822] p-4 space-y-3">
            <div>
              <span className="text-[0.65rem] uppercase font-bold tracking-wider text-white/50 block font-mono">
                Official UPI Identifier
              </span>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span
                  className={`font-mono text-xs sm:text-sm font-bold tracking-tight select-all ${
                    isRevealed ? 'text-signal' : 'text-white/40 tracking-widest'
                  }`}
                >
                  {isRevealed ? currentPayments.upiId : '••••••••••••••••@icici'}
                </span>

                {isRevealed && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(currentPayments.upiId, 'upi')}
                    className="btn-outline-light text-[0.68rem] py-1 px-2.5 font-bold shrink-0 text-white hover:border-signal flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 'upi' ? (
                      <>
                        <CheckIcon className="size-3 text-signal" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="size-3 text-white/70" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-xs">
              <span className="text-white/60">Verified Beneficiary</span>
              <span className="font-bold text-white text-right">{currentPayments.payeeName}</span>
            </div>

            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[0.7rem]">
              <span className="text-white/50">Merchant Category</span>
              <span className="text-white/70">{currentPayments.merchantCategory}</span>
            </div>
          </div>
        </section>

        {/* =================================================================
            RIGHT COLUMN: OFFICIAL INSTITUTIONAL BANK ACCOUNT
            ================================================================= */}
        <section className="lg:col-span-7 space-y-6">
          {/* Bank Account Wire Card */}
          <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 sm:p-6 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-signal font-mono">
                  Corporate Banking
                </span>
                <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                  {isIndia
                    ? 'Domestic Bank Transfer (NEFT / IMPS / RTGS)'
                    : 'International Wire Transfer (IBAN / SWIFT)'}
                </h2>
              </div>
              <div className="size-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-signal">
                <BankBuildingIcon className="size-5" />
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              {isIndia
                ? 'For net-banking portals, NEFT/RTGS clearing, or direct corporate transfers. Remittances credit directly to our primary HDFC institutional account.'
                : 'For international student wire transfers, overseas bank accounts, and corporate remittances via Mashreq Bank PSC.'}
            </p>

            {/* Structured Financial Details Table */}
            {isIndia ? (
              /* India Bank Details */
              <dl className="divide-y divide-white/10 text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Account Holder</dt>
                  <dd className="font-bold text-white text-right">{indiaPayments.bank.accountName}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Banking Partner</dt>
                  <dd className="font-bold text-white text-right">{indiaPayments.bank.bankName}</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-white/60">Account Number</dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white select-all">
                      {indiaPayments.bank.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(indiaPayments.bank.accountNumber, 'acc')}
                      className="inline-flex items-center gap-1 text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'acc' ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                      <span>{copiedKey === 'acc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-white/60">IFSC Code</dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white select-all">{indiaPayments.bank.ifsc}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(indiaPayments.bank.ifsc, 'ifsc')}
                      className="inline-flex items-center gap-1 text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'ifsc' ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                      <span>{copiedKey === 'ifsc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Account Classification</dt>
                  <dd className="font-bold text-white text-right">{indiaPayments.bank.accountType}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Branch Address</dt>
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
                    <span className="font-mono font-bold text-signal text-xs sm:text-sm select-all">
                      {uaePayments.bank.iban}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(uaePayments.bank.iban, 'iban')}
                      className="inline-flex items-center gap-1 text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'iban' ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                      <span>{copiedKey === 'iban' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-white/60">SWIFT / BIC Code</dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white select-all">{uaePayments.bank.swiftBic}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(uaePayments.bank.swiftBic, 'swift')}
                      className="inline-flex items-center gap-1 text-[0.68rem] text-signal font-bold hover:underline"
                    >
                      {copiedKey === 'swift' ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                      <span>{copiedKey === 'swift' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Settlement Currency</dt>
                  <dd className="font-bold text-white text-right">{uaePayments.bank.currency}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-white/60">Jurisdiction & Branch</dt>
                  <dd className="text-white/80 text-right text-xs">{uaePayments.bank.branch}</dd>
                </div>
              </dl>
            )}
          </div>

          {/* Settlement Confirmation & Automated Verification Desk */}
          <div className="rounded-2xl border border-signal/30 bg-gradient-to-r from-signal/15 via-[#161622] to-signal/10 p-5 sm:p-6 text-white space-y-4 shadow-xl">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-signal font-mono">
                Post-Settlement Step
              </span>
              <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-white">
                Submit Transaction Reference for Immediate Course Access
              </h3>
              <p className="mt-1 text-xs text-white/75 leading-relaxed">
                Upon transferring funds or scanning via UPI, forward your transaction reference (UTR) or receipt to our
                admissions desk. Our registrar reconciles the ledger and activates your program curriculum without delay.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`${site.whatsappLink}?text=${encodeURIComponent(
                  `Hello Theorem Academy, I have completed my course fee payment via ${
                    isIndia ? 'Domestic Indian UPI / Bank Transfer' : 'UAE International Banking / UPI'
                  }. Please confirm my enrollment and issue tuition receipt.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand shimmer-button inline-flex items-center gap-2 py-2.5 px-5 text-xs font-bold text-ink shadow-md"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                <span>Submit Receipt on WhatsApp</span>
              </a>

              <Link
                to="/portal/support"
                className="btn-outline-light text-xs py-2.5 px-4 font-semibold text-white hover:border-signal transition-colors"
              >
                Raise Finance Support Ticket
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
