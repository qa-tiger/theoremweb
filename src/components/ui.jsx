import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { programs as allPrograms } from '../config/site'

// Adds .is-visible once the element scrolls into view (used for smooth scroll reveals).
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return ref
}

/*
  Luxury Top Scroll Progress Indicator
  Fills dynamically based on current page scroll position.
*/
export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-signal via-[#f4f6f8] to-signal transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

/*
  Section: heading on the left, intro on the right aligned to the heading's baseline.
  The asymmetric split is the site's standard section opening.
  Includes smooth scroll reveal.
*/
export function Section({ id, title, intro, action, children, dark = false, tight = false, className = '' }) {
  const py = tight ? 'py-12 sm:py-16 lg:py-20' : 'py-16 sm:py-20 lg:py-24'
  const ref = useReveal()
  return (
    <section id={id} ref={ref} className={`scroll-mt-20 reveal-up ${py} ${dark ? 'bg-[#09090b] text-white' : 'bg-[#121215] text-white'} ${className}`}>
      <div className="wrap">
        {title && (
          <header className="grid-12 mb-8 sm:mb-12 gap-y-3 sm:gap-y-4">
            <h2 className="col-span-4 font-display text-2xl font-extrabold sm:col-span-8 sm:text-3xl lg:col-span-6 lg:text-4xl tracking-tight leading-tight text-white">{title}</h2>
            {(intro || action) && (
              <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:self-end">
                {intro && <p className="text-xs sm:text-sm leading-relaxed text-white/65 max-w-lg">{intro}</p>}
                {action && <div className="mt-2.5 text-xs font-semibold">{action}</div>}
              </div>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

/*
  Image block. Pass `src` when real photography exists; until then it renders a
  placeholder at the correct ratio, captioned with what should be photographed.
*/
export function ImageBlock({ src, alt = '', ratio = '3/2', caption, shotNote, initials, className = '' }) {
  const ref = useReveal()
  return (
    <figure ref={ref} className={className}>
      <div className="reveal panel relative overflow-hidden bg-[#16161d] border border-white/10" style={{ aspectRatio: ratio }}>
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        ) : initials || alt ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-5 bg-gradient-to-b from-[#181822] to-[#0f0f14] text-center" role="img" aria-label={alt || shotNote || caption}>
            <div className="size-20 sm:size-24 rounded-2xl bg-signal/15 border border-signal/30 text-signal font-display font-extrabold text-3xl sm:text-4xl flex items-center justify-center shadow-lg shadow-signal/5">
              {initials || (alt ? alt.replace(/^Portrait of\s+/i, '').charAt(0) : 'T')}
            </div>
            <p className="mt-3 text-xs sm:text-sm font-bold text-white/90">{alt ? alt.replace(/^Portrait of\s+/i, '') : ''}</p>
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-signal mt-0.5">Faculty Mentor</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5" role="img" aria-label={`Photo placeholder: ${shotNote || caption}`}>
            <p className="max-w-[28ch] text-xs leading-snug text-ink-soft">{shotNote}</p>
            <p className="mt-1 text-[0.65rem] text-ink-soft/70">Photo to come, {ratio.replace('/', ':')}</p>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-xs text-ink-soft">{caption}</figcaption>}
    </figure>
  )
}

/*
  Video block, same placeholder convention as ImageBlock. Pass `src` once a real classroom
  video exists; until then it shows a play-button placeholder captioned with what to film.
*/
export function VideoBlock({ src, poster, caption, shotNote, ratio = '16/9', className = '' }) {
  const ref = useReveal()
  return (
    <figure ref={ref} className={className}>
      <div className="reveal panel relative overflow-hidden bg-stone" style={{ aspectRatio: ratio }}>
        {src ? (
          <video src={src} poster={poster} controls preload="metadata" playsInline className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 sm:p-5" role="img" aria-label={`Video placeholder: ${shotNote || caption}`}>
            <span className="grid size-12 place-items-center rounded-full border border-white/20 text-white/70" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>
            </span>
            <p className="max-w-[28ch] text-center text-xs leading-snug text-ink-soft">{shotNote}</p>
            <p className="text-[0.65rem] text-ink-soft/70">Video to come, {ratio.replace('/', ':')}</p>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-xs text-ink-soft">{caption}</figcaption>}
    </figure>
  )
}

// Dark panel for anything transactional: fees, order summaries. Same surface as the board.
export function Ticket({ children, className = '' }) {
  return (
    <div className={`gold-foil-border-glow rounded-2xl p-5 text-white shadow-2xl sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

/*
  Program cards: filterable by market, with outcome checklists and compact clean height.
  Fees aren't published while the catalogue is being finalised (see config/site.js), so
  every card closes on a single "Contact us" action instead of a price and an Apply button.
*/
export function ProgramCards({ programs = allPrograms }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? programs
    : programs.filter((p) => p.market.toLowerCase().startsWith(filter.toLowerCase().slice(0, 6)))

  return (
    <div className="space-y-4">
      {/* Controls Bar: Filter by Market */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
        {[
          ['all', 'All programs'],
          ['forex', 'Forex'],
          ['crypto', 'Crypto'],
          ['equity', 'Equities'],
          ['indices', 'Indices'],
          ['commodity', 'Commodities'],
        ].map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => setFilter(val)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              filter === val
                ? 'bg-signal text-black font-extrabold shadow-sm'
                : 'border border-white/10 bg-[#1e1e26] text-white/70 hover:border-signal/40 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid of Compact Course Cards */}
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <article
            key={p.id}
            className={`card-hover-glow group relative flex flex-col justify-between p-5 sm:p-6 ${
              p.featured ? 'border-brand/50 ring-1 ring-brand/35 bg-gradient-to-b from-[#1a1a22] to-[#121217]' : 'bg-[#15151b]'
            }`}
          >
            <div>
              {/* Card Header Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#262630] border border-white/10 px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                    {p.market}
                  </span>
                  <span className="text-xs font-medium text-white/70">
                    {p.level} • {p.duration}
                  </span>
                </div>
                {p.featured && (
                  <span className="badge-signal text-xs py-0.5 px-2.5">
                    <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                    Popular
                  </span>
                )}
                {p.comingSoon && <span className="badge-outline text-xs py-0.5 px-2.5">Coming soon</span>}
              </div>

              {/* Title & Short Summary */}
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-extrabold text-white transition-colors group-hover:text-signal leading-snug">
                <Link to={`/programs/${p.id}`}>{p.title}</Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75 line-clamp-2">
                {p.summary}
              </p>

              {/* Inline Skills Tags */}
              <div className="mt-3.5 flex flex-wrap gap-2">
                {p.outcomes.slice(0, 3).map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded bg-[#22222a] border border-white/10 px-2.5 py-1 text-xs font-medium text-white/90">
                    <span className="text-signal font-bold">✓</span>
                    <span className="truncate max-w-[200px]">{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-5 flex items-center justify-end gap-2.5 border-t border-white/10 pt-4">
              <Link to={`/programs/${p.id}`} className="btn-ghost py-2 px-3 text-xs sm:text-sm font-semibold">
                Syllabus
              </Link>
              <Link to={`/contact?program=${p.id}`} className="btn-brand py-2 px-4 text-xs sm:text-sm font-bold shadow-sm">
                Contact us
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/*
  5-Market Vertical Matrix: Forex, Crypto, Equity, Indices, Commodity.
  Allows students to explore and jump directly to Basic, Intermediate, or Advanced
  across all five asset disciplines in an organized, executive multi-column layout.
*/
export function ProgramMatrix({ currentProgramId, programs = allPrograms }) {
  const [selectedTier, setSelectedTier] = useState('all')

  const marketDefs = [
    {
      id: 'forex',
      market: 'Forex',
      icon: '💱',
      subtitle: 'Currencies & Macro Pairs',
      badge: 'High Liquidity',
    },
    {
      id: 'crypto',
      market: 'Crypto',
      icon: '🪙',
      subtitle: 'Spot, Futures & Web3',
      badge: '24/7 Market',
    },
    {
      id: 'equity',
      market: 'Equity',
      icon: '📈',
      subtitle: 'Indian & US Stocks',
      badge: 'Cash & F&O',
    },
    {
      id: 'indices',
      market: 'Indices',
      icon: '📊',
      subtitle: 'Nifty, S&P 500, Nasdaq',
      badge: 'Index Volatility',
    },
    {
      id: 'commodity',
      market: 'Commodity',
      icon: '🛢️',
      subtitle: 'Gold, Silver & Crude Oil',
      badge: 'Bullion & Energy',
    },
  ]

  const tiers = ['Basic', 'Intermediate', 'Advanced']

  return (
    <div className="space-y-6">
      {/* Tier Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[0.7rem] font-bold text-white/50 uppercase tracking-wider mr-1">
            Skill Tier:
          </span>
          {[
            ['all', 'All Tiers'],
            ['Basic', 'Basic (Foundations)'],
            ['Intermediate', 'Intermediate'],
            ['Advanced', 'Advanced (Mastery)'],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setSelectedTier(val)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedTier === val
                  ? 'bg-signal text-black font-extrabold shadow-sm'
                  : 'border border-white/10 bg-[#1a1a24] text-white/70 hover:border-signal/40 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-[0.72rem] text-white/50 hidden sm:block">
          Select any level to view its full syllabus, dates & admissions details
        </p>
      </div>

      {/* 5 Vertical Market Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {marketDefs.map((m) => {
          const progs = programs.filter(
            (p) => p.market.toLowerCase().startsWith(m.id.slice(0, 6))
          )
          const isCurrentMarket = progs.some((p) => p.id === currentProgramId)

          return (
            <div
              key={m.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between p-4 sm:p-5 ${
                isCurrentMarket
                  ? 'border-signal/50 bg-gradient-to-b from-[#191924] to-[#111118] shadow-[0_0_30px_rgba(216,221,227,0.08)] ring-1 ring-signal/20'
                  : 'border-white/10 bg-[#121218] hover:border-white/20'
              }`}
            >
              {/* Market Column Header */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl" role="img" aria-label={m.market}>
                    {m.icon}
                  </span>
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                    {m.badge}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg sm:text-xl font-extrabold text-white">
                  {m.market}
                </h3>
                <p className="mt-0.5 text-[0.7rem] text-white/55 font-medium leading-snug">
                  {m.subtitle}
                </p>

                {/* 3 Level Action Buttons */}
                <div className="mt-4 space-y-2">
                  {tiers.map((lvl) => {
                    const prog = progs.find(
                      (p) => p.level.toLowerCase() === lvl.toLowerCase()
                    )
                    if (!prog) return null

                    const isCurrent = prog.id === currentProgramId
                    const isMuted =
                      selectedTier !== 'all' &&
                      selectedTier.toLowerCase() !== lvl.toLowerCase()

                    if (isCurrent) {
                      return (
                        <div
                          key={prog.id}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl border border-signal bg-signal/15 text-white font-bold text-xs shadow-sm"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                            <span>{prog.level}</span>
                          </div>
                          <span className="text-[0.6rem] uppercase tracking-wider py-0.5 px-2 rounded bg-signal text-black font-extrabold">
                            Viewing
                          </span>
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={prog.id}
                        to={`/programs/${prog.id}`}
                        className={`group/tier flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 ${
                          isMuted
                            ? 'opacity-35 hover:opacity-100 border-white/5 bg-[#171720]'
                            : 'border-white/10 bg-[#171720] hover:bg-white/10 hover:border-signal/50 hover:shadow-md'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-white group-hover/tier:text-signal transition-colors">
                            {prog.level}
                          </span>
                          <span className="block text-[0.62rem] text-white/50">
                            {prog.comingSoon ? 'Coming soon' : prog.duration}
                          </span>
                        </div>
                        <span className="text-white/40 group-hover/tier:text-signal group-hover/tier:translate-x-0.5 transition-all text-xs font-bold">
                          →
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Market Column Footer */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <Link
                  to={`/contact?program=${progs[0]?.id || m.id}`}
                  className="text-[0.68rem] font-semibold text-white/60 hover:text-signal flex items-center justify-between transition-colors"
                >
                  <span>Enquire {m.market}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/*
  ProgramBoard: provides backwards-compatibility, rendering the organized 5-column matrix.
*/
export function ProgramBoard({ programs = allPrograms, currentProgramId }) {
  return <ProgramMatrix currentProgramId={currentProgramId} programs={programs} />
}

// The four teaching stages. They happen in order, so they are numbered, on board tiles.
export const STAGES = [
  ['01. Theory & Live Charts', 'Interactive classes dissecting market structure, liquidity zones, and broker spreads.'],
  ['02. Simulated Demo Lab', 'Practice execution and position sizing on demo accounts until rules become routine.'],
  ['03. Practical Exercises & Review', 'Execute structured chart exercises. Your mentor personally reviews the assignments you submit during the course.'],
  ['04. Custom Plan & Certificate', 'Complete the course with a personalized written trading plan and official certificate of course completion.'],
]

export function MethodTrack({ dark = false }) {
  const ref = useReveal()
  return (
    <ol ref={ref} className="stagger grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STAGES.map(([title, body], i) => (
        <li
          key={title}
          className="card-hover-glow panel relative flex flex-col justify-between p-5 sm:p-6"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="flap flap-amber [--flap-w:1.4rem]" aria-hidden="true">{i + 1}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-signal">
                Phase 0{i + 1}
              </span>
            </div>
            <h3 className="mt-3.5 text-base sm:text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/75">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function FacultyProfile({ person, reverse = false }) {
  const teaches = allPrograms.filter((p) => person.teaches.includes(p.title))
  return (
    <article id={person.id || person.name.toLowerCase().replace(/\s+/g, '-')} className="grid-12 scroll-mt-24 items-center gap-y-6 lg:gap-x-10">
      <ImageBlock
        src={person.photo}
        alt={`Portrait of ${person.name}`}
        initials={person.initials}
        ratio="4/5"
        shotNote={`Portrait of ${person.name}, natural light, in the classroom`}
        className={`col-span-3 sm:col-span-4 lg:col-span-5 ${reverse ? 'lg:col-start-8 lg:row-start-1' : ''}`}
      />
      <div className={`col-span-4 sm:col-span-7 lg:col-span-6 ${reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'}`}>
        <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">{person.role}</span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">{person.name}</h2>
        <p className="mt-3 max-w-[34rem] text-xs sm:text-sm leading-relaxed text-white/75">{person.bio}</p>
        <dl className="mt-5 grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold text-white/55 uppercase tracking-wider">Teaches</dt>
            <dd className="mt-1 flex flex-col items-start gap-1">
              {teaches.map((p) => <Link key={p.id} to={`/programs/${p.id}`} className="link-line text-xs sm:text-sm font-semibold text-white hover:text-signal">{p.title}</Link>)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-white/55 uppercase tracking-wider">Focus</dt>
            <dd className="mt-1 text-xs sm:text-sm font-medium text-white/90">{person.focus}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export function Testimonial({ story, size = 'normal' }) {
  return (
    <figure className="card-rich p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#121218] flex flex-col justify-between hover:border-signal/40 transition-all duration-200">
      <div>
        {/* Top meta row: Stars + Google Review badge */}
        <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-1 text-signal text-sm" aria-label={`${story.stars || 5} out of 5 stars`}>
            {'★'.repeat(story.stars || 5)}
          </div>
          <span className="flex items-center gap-1.5 text-[0.68rem] font-bold text-white/60 tracking-wider">
            <svg className="size-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google Review
          </span>
        </div>

        {/* Quote */}
        <blockquote className="mt-4 text-xs sm:text-sm leading-relaxed text-white/90">
          <p>“{story.quote}”</p>
        </blockquote>
      </div>

      {/* Author Details Footer */}
      <figcaption className="mt-5 border-t border-white/10 pt-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-8 rounded-full bg-signal/15 border border-signal/30 text-signal font-extrabold text-xs flex items-center justify-center shrink-0">
            {story.name ? story.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="min-w-0">
            <span className="font-bold text-xs sm:text-sm text-white truncate block">{story.name}</span>
            <span className="text-[0.68rem] text-white/50 block truncate">
              {story.date ? `${story.date} • ` : ''}{story.program || 'Verified Review'}
            </span>
          </div>
        </div>
        {story.outcome && (
          <span className="badge-signal text-[0.62rem] py-0.5 px-2 rounded font-semibold shrink-0">
            {story.outcome}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

// Segmented choice: a row of square buttons, one selected.
export function Segmented({ name, options, value, onChange }) {
  return (
    <div className="flex flex-wrap overflow-hidden rounded-[var(--radius-ctl)] border border-white/15 bg-[#22222a] p-1 gap-1" role="radiogroup" aria-label={name}>
      {options.map(([val, label]) => (
        <label
          key={val}
          className={`flex-1 cursor-pointer rounded px-3 py-2 text-center text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            value === val
              ? 'bg-signal text-black shadow-md font-extrabold'
              : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <input type="radio" name={name} className="sr-only" checked={value === val} onChange={() => onChange(val)} />
          {label}
        </label>
      ))}
    </div>
  )
}
