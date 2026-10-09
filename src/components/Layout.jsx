import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { courseCategories, freeEbooks, locations, programs, site } from '../config/site'
import { useAuth } from '../lib/auth'
import TheoremIntroGate from './TheoremIntroGate'
import { ScrollProgressBar } from './ui'

// Social Media Brand SVG Icons
function SocialIcon({ label }) {
  switch (label) {
    case 'Instagram':
      return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    case 'YouTube':
      return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    case 'LinkedIn':
      return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    case 'X (Twitter)':
      return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'WhatsApp':
      return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      )
    case 'Telegram':
      return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
        </svg>
      )
    default:
      return <span>🔗</span>
  }
}

// Wordmark with a single board tile as the mark.
export function Wordmark({ className = '', onClick }) {
  return (
    <Link to="/" onClick={onClick} className={`flex items-center gap-2.5 ${className}`}>
      <span className="flap flap-amber mark-in [--flap-w:1.15rem]" aria-hidden="true">T</span>
      <span className="font-display text-[1.7rem] leading-none font-extrabold tracking-tight text-white">{site.name}</span>
    </Link>
  )
}

const NAV_LINKS = [
  ['About', '/about'],
  ['Our Team', '/mentors'],
  ['Contact', '/contact'],
]

// Current page: an amber bar along the bottom edge of the header, like a selected tab.
const desktopLink = ({ isActive }) =>
  `relative flex h-full items-center transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:transition-transform after:duration-300 after:ease-out ${
    isActive
      ? 'text-white font-bold after:scale-x-100 after:bg-signal after:shadow-[0_0_8px_rgba(242,177,52,0.8)]'
      : 'text-white/75 hover:text-signal after:scale-x-0 after:bg-signal/50 hover:after:scale-x-100'
  }`

// Pages where the sticky mobile call-to-action makes sense (not forms, not the portal).
const MARKETING = /^\/($|programs|technology|tools|about|mentors|contact)/

/*
  Mobile action bar: once the visitor has scrolled past the first screen, Apply and
  WhatsApp stay within thumb reach. Hidden on desktop, where the header CTA is always visible.
*/
function MobileCtaBar() {
  const { pathname } = useLocation()
  const [shown, setShown] = useState(false)
  const enabled = MARKETING.test(pathname)

  useEffect(() => {
    if (!enabled) return
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div
        className={`cta-bar mobile-cta-dock fixed inset-x-0 bottom-0 z-30 w-full border-t border-board-line px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden ${
          shown ? 'is-shown' : ''
        }`}
        aria-hidden={!shown}
      >
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3">
          <Link
            to="/register"
            tabIndex={shown ? 0 : -1}
            className="btn btn-brand flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider text-ink shadow-md"
          >
            Apply now
          </Link>
          <a
            href={site.whatsappLink}
            tabIndex={shown ? 0 : -1}
            className="btn btn-outline-light flex-1 py-3 text-center text-xs font-semibold text-white"
          >
            WhatsApp us
          </a>
        </div>
      </div>
      {/* keeps the footer's last lines clear of the bar */}
      <div className="h-20 w-full bg-board lg:hidden" aria-hidden="true" />
    </>
  )
}

/*
  Desktop Concierge Pill: A discreet floating badge for instant Dubai & India admissions chat.
*/
function DesktopConciergePill() {
  const { pathname } = useLocation()
  const enabled = MARKETING.test(pathname)
  if (!enabled) return null

  return (
    <aside aria-label="Admissions Concierge" className="fixed bottom-6 right-6 z-40 hidden lg:block">
      <a
        href={site.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 rounded-full border border-signal/40 bg-[#0d0d12]/90 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-signal hover:shadow-[0_0_20px_rgba(255,215,0,0.35)]"
      >
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
        </span>
        <span>Admissions Desk • Dubai & India</span>
        <span className="rounded bg-signal/20 px-1.5 py-0.5 text-[0.65rem] font-bold text-signal">Online</span>
      </a>
    </aside>
  )
}

export function Nav({ isHidden = false, animateIn = false }) {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()
  const isPortal = pathname.startsWith('/portal')
  const [open, setOpen] = useState(false)
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(true)
  const [mobileTechOpen, setMobileTechOpen] = useState(false)
  const [mobileActiveMarket, setMobileActiveMarket] = useState('forex')
  const close = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  if (isHidden) return null

  // In the Student Portal & Dashboard Space: hide the public marketing horizontal menu bar
  if (isPortal) {
    return (
      <header className="site-header sticky top-0 z-50 border-b border-white/10 text-white shadow-md bg-[#09090b]/95 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Wordmark />
            <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
              Student Space
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">
            <Link
              to="/"
              className="text-white/70 hover:text-signal transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>← Back to Website</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-4">
              <div className="size-7 rounded-full bg-signal/20 border border-signal/40 flex items-center justify-center font-bold text-signal text-xs">
                {(user?.name || 'S').charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold text-white/90 text-xs truncate max-w-[140px]">
                {user?.name || 'Student'}
              </span>
            </div>

            <button
              onClick={signOut}
              className="btn-outline-light py-1.5 px-3 text-xs font-semibold text-white/80 hover:text-white"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className={`site-header sticky top-0 z-50 border-b border-white/10 text-white shadow-md bg-[#09090b]/95 backdrop-blur-md ${animateIn ? 'nav-entrance' : ''}`}>
      <div className="wrap flex h-16 items-center justify-between">
        <div className={animateIn ? 'nav-item-animated' : ''} style={animateIn ? { animationDelay: '120ms' } : undefined}>
          <Wordmark onClick={close} />
        </div>
        
        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden h-full items-stretch gap-7 text-xs sm:text-sm font-semibold lg:flex">
          
          {/* 1. Courses Mega-Dropdown (Forex, Crypto, Equity tracks with Basic, Intermediate, Advanced) */}
          <div
            className={`relative group flex items-center h-full ${animateIn ? 'nav-item-animated' : ''}`}
            style={animateIn ? { animationDelay: '200ms' } : undefined}
          >
            <NavLink
              to="/programs"
              className={({ isActive }) =>
                `relative flex h-full items-center gap-1.5 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:transition-transform after:duration-300 after:ease-out ${
                  isActive
                    ? 'text-white font-bold after:scale-x-100 after:bg-signal after:shadow-[0_0_8px_rgba(242,177,52,0.8)]'
                    : 'text-white/75 hover:text-signal after:scale-x-0 after:bg-signal/50 hover:after:scale-x-100'
                }`
              }
            >
              <span>Courses</span>
              <svg className="size-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </NavLink>

            {/* Courses Mega-Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] rounded-2xl bg-[#121218] border border-white/15 p-5 shadow-2xl backdrop-blur-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Flagship Trading Curriculums</span>
                  <p className="text-[0.7rem] text-white/50">Forex, Crypto, and Equity programs across 3 progressive skill levels</p>
                </div>
                <Link
                  to="/programs"
                  className="text-xs font-bold text-signal hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Programs</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {courseCategories.map((cat) => (
                  <div key={cat.id} className="space-y-2 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-white/10">
                      <span className="text-base">{cat.icon}</span>
                      <div>
                        <span className="font-display text-sm font-extrabold text-white block leading-tight">{cat.name}</span>
                        <span className="text-[0.65rem] text-white/50">{cat.tagline}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      {cat.items.map((item) => (
                        <Link
                          key={item.id}
                          to={`/programs/${item.id}`}
                          className="group/sub block p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-signal/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white group-hover/sub:text-signal transition-colors">{item.title}</span>
                            <span className="text-[0.6rem] font-mono text-signal bg-signal/10 px-1.5 py-0.5 rounded">{item.level}</span>
                          </div>
                          <p className="text-[0.68rem] text-white/55 line-clamp-1 mt-0.5">{item.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promotional Banner Footer (Requirement 1: "Learn all programs and save 40%") */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between bg-gradient-to-r from-signal/10 via-signal/5 to-transparent p-3 rounded-xl border border-signal/20">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🔥</span>
                  <div>
                    <span className="font-bold text-xs text-white block">Learn all programs and save 40%</span>
                    <span className="text-[0.7rem] text-white/65">Full multi-asset institutional pass with dedicated 1-on-1 mentor reviews</span>
                  </div>
                </div>
                <Link
                  to="/contact?bundle=all-access"
                  className="btn-brand py-1.5 px-3.5 text-xs font-bold shrink-0 shadow-sm"
                >
                  Inquire for 40% Pass →
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Knowledge Toolkit Dropdown (renamed from Technology) */}
          {/* 2. Knowledge Toolkit (Free E-books) */}
          <div
            className={`relative group flex items-center h-full ${animateIn ? 'nav-item-animated' : ''}`}
            style={animateIn ? { animationDelay: '270ms' } : undefined}
          >
            <NavLink
              to="/knowledge-toolkit#ebooks"
              className={({ isActive }) =>
                `relative flex h-full items-center gap-1.5 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:transition-transform after:duration-300 after:ease-out ${
                  isActive
                    ? 'text-white font-bold after:scale-x-100 after:bg-signal after:shadow-[0_0_8px_rgba(242,177,52,0.8)]'
                    : 'text-white/75 hover:text-signal after:scale-x-0 after:bg-signal/50 hover:after:scale-x-100'
                }`
              }
            >
              <span>Knowledge Toolkit</span>
              <svg className="size-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </NavLink>

            {/* Knowledge Toolkit Dropdown Menu (Free E-Books) */}
            <div className="absolute top-full left-0 w-80 rounded-2xl bg-[#121218] border border-white/15 p-3 shadow-2xl backdrop-blur-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
              <div className="text-[0.65rem] font-bold uppercase tracking-wider text-white/50 px-3 py-1.5 border-b border-white/10 mb-1.5">
                Institutional Resources
              </div>
              <div className="space-y-1">
                <Link
                  to="/knowledge-toolkit#ebooks"
                  className="flex flex-col p-2.5 rounded-xl hover:bg-white/5 hover:border-signal/30 border border-transparent transition-all group/item"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📚</span>
                    <span className="font-bold text-xs text-white group-hover/item:text-signal transition-colors">Free E-Books</span>
                  </div>
                  <span className="text-[0.72rem] text-white/60 mt-0.5">Institutional price action, order flow & crypto risk guides</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Standard Navigation Links (About, Our Team, Contact) */}
          {NAV_LINKS.map(([label, to], idx) => (
            <div
              key={to}
              className={`h-full flex items-center ${animateIn ? 'nav-item-animated' : ''}`}
              style={animateIn ? { animationDelay: `${340 + idx * 70}ms` } : undefined}
            >
              <NavLink to={to} className={desktopLink}>{label}</NavLink>
            </div>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div
          className={`hidden items-center gap-4 text-xs sm:text-sm lg:flex ${animateIn ? 'nav-item-animated' : ''}`}
          style={animateIn ? { animationDelay: '550ms' } : undefined}
        >
          <Link to={user ? '/portal' : '/login'} className="text-xs sm:text-sm font-semibold text-white/80 transition-colors hover:text-signal">
            {user ? 'My portal' : 'Log in'}
          </Link>
          <Link to="/contact" className="btn-brand shimmer-button rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink shadow-[0_0_12px_rgba(242,177,52,0.35)]">
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-signal lg:hidden ${animateIn ? 'nav-item-animated' : ''}`}
          style={animateIn ? { animationDelay: '200ms' } : undefined}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="mobile-nav-drawer fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col text-white px-6 pt-4 pb-8 sm:px-8 overflow-y-auto bg-[#0a0a0f] lg:hidden">
          <div className="space-y-4">
            
            {/* Mobile Courses Accordion */}
            <div className="border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                className="flex w-full items-center justify-between py-2 font-display text-2xl font-extrabold text-white"
              >
                <span>Courses</span>
                <span className="text-sm text-signal">{mobileCoursesOpen ? '▲' : '▼'}</span>
              </button>
              {mobileCoursesOpen && (
                <div className="mt-2 space-y-3 pl-3 border-l border-white/10">
                  {/* Category Switcher Tabs */}
                  <div className="flex gap-1.5 pb-2">
                    {courseCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setMobileActiveMarket(cat.id)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          mobileActiveMarket === cat.id ? 'bg-signal text-black' : 'bg-white/5 text-white/70'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {courseCategories.find((c) => c.id === mobileActiveMarket)?.items.map((item) => (
                      <Link
                        key={item.id}
                        to={`/programs/${item.id}`}
                        onClick={close}
                        className="flex items-center justify-between py-1.5 text-sm font-semibold text-white/80 hover:text-signal"
                      >
                        <span>{item.title}</span>
                        <span className="text-[0.65rem] text-signal font-mono bg-signal/10 px-1.5 py-0.5 rounded">{item.level}</span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to="/contact?bundle=all-access"
                    onClick={close}
                    className="block pt-2 text-xs font-bold text-signal"
                  >
                    🔥 Learn all programs and save 40% →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Knowledge Toolkit Link (Free E-Books) */}
            <div className="border-b border-white/10 pb-3">
              <NavLink
                to="/knowledge-toolkit#ebooks"
                onClick={close}
                className="flex items-center justify-between py-2 font-display text-2xl font-extrabold text-white hover:text-signal transition-colors"
              >
                <span>Free E-Books</span>
                <span className="text-sm text-signal">→</span>
              </NavLink>
            </div>

            {/* Other Links (About, Our Team, Contact) */}
            {NAV_LINKS.map(([label, to]) => (
              <div key={to} className="border-b border-white/10 pb-3">
                <NavLink
                  to={to}
                  onClick={close}
                  className="flex items-center justify-between py-2 font-display text-2xl font-extrabold text-white hover:text-signal transition-colors"
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? 'text-signal' : 'text-white'}>{label}</span>
                      {isActive && <span className="size-2 rounded-full bg-signal" aria-label="(current page)" />}
                    </>
                  )}
                </NavLink>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <Link to="/contact" onClick={close} className="btn btn-brand shimmer-button py-3 text-center text-xs font-bold uppercase tracking-wider text-ink shadow-lg">Contact Us</Link>
            <Link to={user ? '/portal' : '/login'} onClick={close} className="btn btn-outline-light py-3 text-center text-xs font-semibold text-white">{user ? 'My portal' : 'Log in'}</Link>
          </div>
        </nav>
      )}
    </header>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-semibold text-white/50">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-board-line bg-board text-white">
      <div className="wrap grid-12 gap-y-12 py-16 lg:py-20">
        {/* Col 1: Brand & Presence */}
        <div className="col-span-4 sm:col-span-8 lg:col-span-3">
          <Wordmark />
          <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-white/65">{site.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 text-xs font-bold text-signal">
              <span className="size-2 rounded-full bg-signal animate-pulse" />
              <span>🇮🇳 India • 🇦🇪 Dubai • 🌐 Online</span>
            </span>
          </div>
        </div>

        {/* Col 2: Knowledge Hub */}
        <div className="col-span-2 lg:col-span-2">
          <FooterColumn title="Knowledge Hub">
            <li><Link to="/programs" className="hover:text-signal">All Programs</Link></li>
            <li><Link to="/technology/tools" className="hover:text-signal">Tools & Software</Link></li>
            <li><Link to="/technology#ebooks" className="hover:text-signal text-signal font-semibold">📚 Free E-Books</Link></li>
            <li><Link to="/about" className="hover:text-signal">About Academy</Link></li>
            <li><Link to="/mentors" className="hover:text-signal">Our Team</Link></li>
            <li><Link to="/login" className="hover:text-signal">Student Portal</Link></li>
          </FooterColumn>
        </div>

        {/* Col 3: Courses Tracks */}
        <div className="col-span-2 lg:col-span-2">
          <FooterColumn title="Courses">
            <li><Link to="/programs" className="hover:text-signal">Forex Track</Link></li>
            <li><Link to="/programs" className="hover:text-signal">Crypto Track</Link></li>
            <li><Link to="/programs" className="hover:text-signal">Equity Track</Link></li>
            <li className="pt-2"><Link to="/contact?package=all-programs-40-off" className="text-xs text-signal font-bold hover:underline">🔥 All-Access Pass (Save 40%)</Link></li>
          </FooterColumn>
        </div>

        {/* Col 4: Social Channels with SVGs (Requirement 4) */}
        <div className="col-span-2 lg:col-span-2">
          <FooterColumn title="Community & Social">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/75 hover:text-signal group transition-colors"
                >
                  <span className="size-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:border-signal/50 group-hover:bg-signal/15 group-hover:text-signal transition-all">
                    <SocialIcon label={s.label} />
                  </span>
                  <span className="text-xs font-medium">{s.label}</span>
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        {/* Col 5: Admissions & Contact */}
        <div className="col-span-4 lg:col-span-3">
          <FooterColumn title="Admissions & Campuses">
            <li><a href={`mailto:${site.email}`} className="hover:text-signal">{site.email}</a></li>
            <li>{site.phone}</li>
            <li><a href={site.whatsappLink} className="hover:text-signal font-bold text-signal">WhatsApp {site.whatsapp}</a></li>
            {locations.filter((l) => l.city !== 'Online').map((l) => (
              <li key={l.city} className="pt-2 text-white/65">
                <span className="text-white font-semibold">{l.flag} {l.city} Campus</span>
                <br />
                <span className="text-xs text-white/60">{l.address}</span>
              </li>
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="wrap">
        <div className="border-t border-white/15 py-8 text-xs text-white/65">
          <p className="max-w-[64rem] leading-relaxed text-white/60">
            <strong>Educational Disclaimer:</strong> Theorem Institute is an independent educational and research training institution. All curricula, simulator tools, chart markups, and case studies are strictly for educational and instructional purposes only. We do not provide financial advice, trading signals, managed account services, or investment recommendations. Trading financial markets carries substantial risk of capital loss.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {site.name}</p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li><Link to="/contact" className="text-white/80 hover:text-white">Contact Us</Link></li>
              <li><a href="#" className="text-white/80 hover:text-white">Terms</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Refund policy</a></li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem('theorem_intro_seen_v4')
                    window.dispatchEvent(new CustomEvent('theorem_replay_intro'))
                  }}
                  className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2 py-0.5 text-[0.7rem] font-medium text-signal hover:bg-white/20 transition-colors"
                >
                  <span>✨ Replay Intro</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function SiteLayout() {
  const { pathname } = useLocation()
  const [forceIntro, setForceIntro] = useState(false)

  // Determine if intro needs to show
  const isIntroSeen = () => {
    try {
      return sessionStorage.getItem('theorem_intro_seen_v4') === 'true'
    } catch {
      return false
    }
  }

  const [introActive, setIntroActive] = useState(() => !isIntroSeen())
  const [navAnimatedIn, setNavAnimatedIn] = useState(false)

  useEffect(() => {
    const handleReplay = () => {
      setForceIntro(true)
      setIntroActive(true)
      setNavAnimatedIn(false)
    }
    window.addEventListener('theorem_replay_intro', handleReplay)
    return () => window.removeEventListener('theorem_replay_intro', handleReplay)
  }, [])

  // Triggered the instant user clicks "ENTER THEOREM" or Skip in intro gate
  const handleIntroEnter = () => {
    setIntroActive(false)
    setNavAnimatedIn(true)
    setTimeout(() => {
      setNavAnimatedIn(false)
    }, 1200)
  }

  const handleIntroClose = () => {
    setForceIntro(false)
    setIntroActive(false)
  }

  const isPortal = pathname.startsWith('/portal')
  const pageKey = isPortal ? '/portal' : pathname
  return (
    <div className="flex min-h-screen flex-col bg-[#07070a]">
      {/* Top Luxury Scroll Progress Indicator */}
      {!introActive && !isPortal && <ScrollProgressBar />}

      {/* First-time Loading Cinematic Intro */}
      <TheoremIntroGate
        forceOpen={forceIntro}
        onEnter={handleIntroEnter}
        onClose={handleIntroClose}
      />

      {/* Navigation Bar: dedicated portal top bar when in portal; slides in with option animation on enter */}
      <Nav isHidden={introActive} animateIn={navAnimatedIn} />

      <main key={pageKey} className="page-enter flex-1"><Outlet /></main>

      {/* Public Marketing Footer & Floating Conversion Widgets (Hidden in Student Portal) */}
      {!isPortal && <Footer />}
      {!introActive && !isPortal && <MobileCtaBar />}
      {!introActive && !isPortal && <DesktopConciergePill />}
    </div>
  )
}

export function PortalNavLink({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `block whitespace-nowrap border-l-[3px] rounded-r-lg px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
          isActive
            ? 'border-signal bg-signal/15 text-signal font-extrabold shadow-sm'
            : 'border-transparent text-white/65 hover:text-white hover:bg-white/5'
        }`
      }
    >
      {children}
    </NavLink>
  )
}
