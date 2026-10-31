import { useEffect, useRef, useState, useCallback } from 'react'

/*
  Crisp Platinum / Chrome Luxury Icons (Matching Reference Design)
*/
function CoreKnowledgeIcon({ isActive }) {
  return (
    <div
      className={`size-10 sm:size-11 rounded-xl bg-gradient-to-b from-[#222634] to-[#12141c] border flex items-center justify-center shadow-lg transition-all duration-500 shrink-0 ${
        isActive
          ? 'border-white/60 shadow-[0_0_18px_rgba(255,255,255,0.35)] scale-105'
          : 'border-white/15 shadow-black/60'
      }`}
    >
      <svg
        className="size-5 sm:size-5.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8M8 11h6" strokeOpacity="0.7" />
        <circle cx="14" cy="11" r="1.5" fill="currentColor" />
      </svg>
    </div>
  )
}

function HandsOnIcon({ isActive }) {
  return (
    <div
      className={`size-10 sm:size-11 rounded-xl bg-gradient-to-b from-[#222634] to-[#12141c] border flex items-center justify-center shadow-lg transition-all duration-500 shrink-0 ${
        isActive
          ? 'border-white/60 shadow-[0_0_18px_rgba(255,255,255,0.35)] scale-105'
          : 'border-white/15 shadow-black/60'
      }`}
    >
      <svg
        className="size-5 sm:size-5.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </div>
  )
}

function ProblemSolvingIcon({ isActive }) {
  return (
    <div
      className={`size-10 sm:size-11 rounded-xl bg-gradient-to-b from-[#222634] to-[#12141c] border flex items-center justify-center shadow-lg transition-all duration-500 shrink-0 ${
        isActive
          ? 'border-white/60 shadow-[0_0_18px_rgba(255,255,255,0.35)] scale-105'
          : 'border-white/15 shadow-black/60'
      }`}
    >
      <svg
        className="size-5 sm:size-5.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M15 9l4-4" />
      </svg>
    </div>
  )
}

function SkillMasteryIcon({ isActive }) {
  return (
    <div
      className={`size-11 rounded-xl bg-gradient-to-b from-[#222634] to-[#12141c] border flex items-center justify-center shadow-lg transition-all duration-500 shrink-0 ${
        isActive
          ? 'border-white/60 shadow-[0_0_18px_rgba(255,255,255,0.35)] scale-105'
          : 'border-white/15 shadow-black/60'
      }`}
    >
      <svg
        className="size-5.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          fillOpacity={isActive ? '0.35' : '0.15'}
        />
      </svg>
    </div>
  )
}

function CertificateIcon({ isActive }) {
  return (
    <div
      className={`size-11 rounded-xl bg-gradient-to-b from-[#222634] to-[#12141c] border flex items-center justify-center shadow-lg transition-all duration-500 shrink-0 ${
        isActive
          ? 'border-white/60 shadow-[0_0_18px_rgba(255,255,255,0.35)] scale-105'
          : 'border-white/15 shadow-black/60'
      }`}
    >
      <svg
        className="size-5.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M7 8h10M7 12h6" strokeOpacity="0.7" />
        <circle cx="16" cy="14" r="3" fill="#0B0D14" stroke="currentColor" />
        <path d="M15 17l-1.5 4 2.5-1.5 2.5 1.5-1.5-4" fill="currentColor" stroke="none" />
      </svg>
    </div>
  )
}

// Pixel-Perfect S-Path (viewBox: 0 0 1020 530)
// Starts cleanly after Foundation at (245, 80)
// Row 1 (y: 80): L 880 80
// Turn 1: C 970 80, 970 265, 880 265
// Row 2 (y: 265): L 140 265
// Turn 2: C 50 265, 50 450, 140 450
// Row 3 (y: 450): Terminates cleanly at Final Goal node (430, 450)
const DESKTOP_S_PATH =
  'M 245 80 L 880 80 C 970 80, 970 265, 880 265 L 140 265 C 50 265, 50 450, 140 450 L 430 450'

export default function LearningRoadmap() {
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const totalLengthRef = useRef(2400)

  // Butter-Smooth Damped Progress (Interpolated 60/120fps)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [cometPos, setCometPos] = useState({ x: 245, y: 80 })

  const currentProgressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const autoSurgeTriggeredRef = useRef(false)
  const isSurgingRef = useRef(false)
  const animFrameRef = useRef(null)

  // Measure path length once on mount
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength()
        if (len > 0) totalLengthRef.current = len
      } catch {
        // ignore
      }
    }
  }, [])

  // Continuous Silky Damping Loop (LERP):
  // Eliminates mouse wheel jitter and scroll lag by smoothly gliding toward the target
  useEffect(() => {
    let active = true

    const loop = () => {
      if (!active) return

      const current = currentProgressRef.current
      const target = targetProgressRef.current
      const diff = target - current

      if (Math.abs(diff) > 0.001) {
        // Smooth exponential damping factor (0.12 gives instant yet silky response)
        const next = current + diff * 0.12
        currentProgressRef.current = next
        setDisplayProgress(next)

        // Update comet position without reflow overhead
        const pathEl = pathRef.current
        if (pathEl) {
          try {
            const pt = pathEl.getPointAtLength(totalLengthRef.current * next)
            setCometPos({ x: pt.x, y: pt.y })
          } catch {
            // ignore
          }
        }
      } else if (current !== target) {
        currentProgressRef.current = target
        setDisplayProgress(target)
      }

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      active = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Auto-completion surge from Milestone 3 to Final Goal
  const triggerAutoSurge = useCallback(() => {
    if (autoSurgeTriggeredRef.current) return
    autoSurgeTriggeredRef.current = true
    isSurgingRef.current = true

    const startP = Math.max(0.68, currentProgressRef.current)
    const startTime = performance.now()
    const duration = 650 // Crisp, satisfying 650ms surge

    const surgeStep = (now) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 2)
      const next = startP + (1.0 - startP) * eased

      targetProgressRef.current = next
      currentProgressRef.current = next
      setDisplayProgress(next)

      const pathEl = pathRef.current
      if (pathEl) {
        try {
          const pt = pathEl.getPointAtLength(totalLengthRef.current * next)
          setCometPos({ x: pt.x, y: pt.y })
        } catch {
          // ignore
        }
      }

      if (t < 1) {
        requestAnimationFrame(surgeStep)
      } else {
        targetProgressRef.current = 1.0
        currentProgressRef.current = 1.0
        setDisplayProgress(1.0)
        isSurgingRef.current = false
      }
    }

    requestAnimationFrame(surgeStep)
  }, [])

  // High-Performance Passive Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (isSurgingRef.current) return

      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Smooth trigger range
      const enterTrigger = windowHeight * 0.75
      const span = el.offsetHeight * 0.75

      if (rect.top < enterTrigger && rect.bottom > 0) {
        const scrolledDistance = enterTrigger - rect.top
        const rawProgress = Math.min(1, Math.max(0, scrolledDistance / span))

        if (rawProgress >= 0.68) {
          if (!autoSurgeTriggeredRef.current) {
            triggerAutoSurge()
          }
        } else if (!autoSurgeTriggeredRef.current) {
          targetProgressRef.current = Math.max(targetProgressRef.current, rawProgress * 0.68)
        }
      }
    }

    // Run on initial mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [triggerAutoSurge])

  // Active milestone thresholds along the S-path
  const isStart = displayProgress >= 0.04
  const isM1 = displayProgress >= 0.16
  const isM2 = displayProgress >= 0.45
  const isM3 = displayProgress >= 0.68
  const isGoal = displayProgress >= 0.94 // Reached Final Goal
  const isAwards = displayProgress >= 0.96 // Graduation awards unlocked

  return (
    <section
      ref={containerRef}
      id="curriculum-roadmap"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#07070a] text-white border-y border-white/10 select-none"
    >
      {/* Atmospheric Ambient Lighting & Platinum Grid Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="wrap relative z-10">
        
        {/* Clean, Refined Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white/90 bg-white/10 border border-white/20 mb-4 shadow-sm backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            <span>Structured Student Roadmap</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            WHAT YOU WILL GET{' '}
            <span className="bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8] bg-clip-text text-transparent">
              FROM THIS COURSE
            </span>
          </h2>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP ROADMAP CANVAS (≥ 1024px)                              */}
        {/* Zero Overlaps: Mathematically Aligned Anchors & S-Path         */}
        {/* ============================================================== */}
        <div className="hidden lg:block relative max-w-[1100px] mx-auto rounded-3xl bg-[#090b12]/95 border border-white/15 p-8 xl:p-12 shadow-2xl backdrop-blur-md overflow-hidden min-h-[580px]">

          {/* SVG S-PATH CONNECTOR TRACK */}
          <svg
            className="absolute inset-0 size-full pointer-events-none"
            viewBox="0 0 1020 530"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="roadmapPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#F1F5F9" />
                <stop offset="65%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>

              {/* Hardware-Accelerated Radiant White Laser Glow */}
              <filter id="roadmapLaserGlow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFFFFF" floodOpacity="0.85" />
              </filter>
            </defs>

            {/* 1. Faint Blueprint S-Path Guide Track */}
            <path
              d={DESKTOP_S_PATH}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 2. Glowing Outer Radiant White S-Path (Liquid 60fps) */}
            <path
              ref={pathRef}
              d={DESKTOP_S_PATH}
              pathLength="1"
              stroke="url(#roadmapPathGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roadmapLaserGlow)"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: Math.max(0, 1 - displayProgress),
              }}
            />

            {/* 3. Razor-Sharp Solid White Core (Liquid 60fps) */}
            <path
              d={DESKTOP_S_PATH}
              pathLength="1"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: Math.max(0, 1 - displayProgress),
              }}
            />

            {/* Traveling Laser Comet Head */}
            {displayProgress > 0.02 && displayProgress < 0.99 && (
              <g transform={`translate(${cometPos.x}, ${cometPos.y})`}>
                <circle r="9" fill="#FFFFFF" opacity="0.35" className="animate-ping" />
                <circle r="4.5" fill="#FFFFFF" filter="url(#roadmapLaserGlow)" />
              </g>
            )}

            {/* START NODE: Anchored cleanly at x:245, y:80 (Right after Foundation text) */}
            <circle
              cx="245"
              cy="80"
              r={isStart ? 6 : 4}
              fill="#FFFFFF"
              stroke="#475569"
              strokeWidth={1.5}
              opacity={isStart ? 1 : 0.4}
              className="transition-all duration-300"
            />
            {isStart && (
              <circle cx="245" cy="80" r="11" stroke="#FFFFFF" strokeWidth="1" opacity="0.45" className="animate-pulse" />
            )}

            {/* MILESTONE 01 NODE (Top Runway, x:470, y:80) */}
            <circle
              cx="470"
              cy="80"
              r={isM1 ? 6.5 : 4}
              fill="#FFFFFF"
              stroke="#475569"
              strokeWidth={2}
              opacity={isM1 ? 1 : 0.3}
              className="transition-all duration-300"
            />
            {isM1 && (
              <circle cx="470" cy="80" r="12" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.45" className="animate-pulse" />
            )}

            {/* MILESTONE 02 NODE (Middle Runway, x:710, y:265) */}
            <circle
              cx="710"
              cy="265"
              r={isM2 ? 6.5 : 4}
              fill="#FFFFFF"
              stroke="#475569"
              strokeWidth={2}
              opacity={isM2 ? 1 : 0.3}
              className="transition-all duration-300"
            />
            {isM2 && (
              <circle cx="710" cy="265" r="12" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.45" className="animate-pulse" />
            )}

            {/* MILESTONE 03 NODE (Bottom Runway, x:140, y:450) */}
            <circle
              cx="140"
              cy="450"
              r={isM3 ? 6.5 : 4}
              fill="#FFFFFF"
              stroke="#475569"
              strokeWidth={2}
              opacity={isM3 ? 1 : 0.3}
              className="transition-all duration-300"
            />

            {/* FINAL GOAL DESTINATION NODE (Bottom Runway, x:430, y:450) */}
            <circle
              cx="430"
              cy="450"
              r={isGoal ? 7.5 : 4}
              fill="#FFFFFF"
              stroke="#475569"
              strokeWidth={2.5}
              opacity={isGoal ? 1 : 0.3}
              className="transition-all duration-300"
            />
          </svg>

          {/* ============================================================== */}
          {/* NON-OVERLAPPING CARDS & ANCHORS                                */}
          {/* Every element is aligned precisely to its row and runway       */}
          {/* ============================================================== */}
          <div className="relative z-10 w-full h-[530px]">
            
            {/* ROW 1: START POINT: FOUNDATION (Top Left: x in [30, 230], y: 80) */}
            <div
              className={`absolute left-[3%] top-[15.1%] -translate-y-1/2 flex items-center gap-3.5 select-none transition-all duration-500 ease-out ${
                isStart
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4 pointer-events-none'
              }`}
            >
              {/* Location Pin Icon: Springs up from down on scroll */}
              <div className="relative flex items-center justify-center shrink-0">
                <span
                  className={`absolute -inset-1.5 rounded-full bg-white/30 blur-md transition-all duration-700 ${
                    isStart ? 'opacity-100 scale-110 animate-pulse' : 'opacity-0 scale-50'
                  }`}
                />
                <div
                  className={`relative size-12 rounded-full bg-gradient-to-b from-white via-[#E2E8F0] to-[#64748B] p-[2px] shadow-lg shadow-white/30 flex items-center justify-center transition-all duration-500 hover:scale-105 ${
                    isStart
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-8 opacity-0 scale-75 pointer-events-none'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <div className="size-full rounded-full bg-[#090B10] flex items-center justify-center">
                    <svg
                      className="size-5.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Foundation Text */}
              <div>
                <div className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white leading-none">
                  FOUNDATION
                </div>
                <p className="text-[0.72rem] text-white/55 font-medium mt-1.5 leading-none">
                  Zero prior experience required
                </p>
              </div>
            </div>

            {/* CARD 1: CORE KNOWLEDGE (Top Runway: y=80, vertically centered) */}
            <div
              className={`absolute left-[47%] top-[15.1%] -translate-y-1/2 inline-flex items-center gap-3 px-4.5 py-3 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ease-out shadow-xl backdrop-blur-md hover:-translate-y-[calc(50%+4px)] hover:border-white/50 ${
                isM1
                  ? 'opacity-100 scale-100 border-white/35 shadow-[0_0_25px_rgba(255,255,255,0.14)]'
                  : 'opacity-0 scale-95 border-white/10 pointer-events-none'
              }`}
            >
              <CoreKnowledgeIcon isActive={isM1} />
              <span className="font-display text-sm sm:text-base font-bold text-white transition-colors whitespace-nowrap">
                Core Knowledge
              </span>
            </div>

            {/* ROW 2: CARD 2: HANDS-ON EXPERIENCE (Middle Runway: y=265, vertically centered) */}
            <div
              className={`absolute left-[36%] top-[50%] -translate-y-1/2 inline-flex items-center gap-3 px-4.5 py-3 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ease-out shadow-xl backdrop-blur-md hover:-translate-y-[calc(50%+4px)] hover:border-white/50 ${
                isM2
                  ? 'opacity-100 scale-100 border-white/35 shadow-[0_0_25px_rgba(255,255,255,0.14)]'
                  : 'opacity-0 scale-95 border-white/10 pointer-events-none'
              }`}
            >
              <HandsOnIcon isActive={isM2} />
              <span className="font-display text-sm sm:text-base font-bold text-white transition-colors whitespace-nowrap">
                Hands-on Experience
              </span>
            </div>

            {/* ROW 3: CARD 3: ADVANCED CHART READING (Bottom Runway: y=450, vertically centered) */}
            <div
              className={`absolute left-[3.5%] top-[84.9%] -translate-y-1/2 inline-flex items-center gap-3 px-4.5 py-3 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ease-out shadow-xl backdrop-blur-md hover:-translate-y-[calc(50%+4px)] hover:border-white/50 ${
                isM3
                  ? 'opacity-100 scale-100 border-white/35 shadow-[0_0_25px_rgba(255,255,255,0.14)]'
                  : 'opacity-0 scale-95 border-white/10 pointer-events-none'
              }`}
            >
              <ProblemSolvingIcon isActive={isM3} />
              <span className="font-display text-sm sm:text-base font-bold text-white transition-colors whitespace-nowrap">
                Advanced Chart Reading
              </span>
            </div>

            {/* ROW 3: FINAL GOAL (At terminal node of runway, x ≈ 430px, y: 450) */}
            <div
              className={`absolute left-[42%] top-[84.9%] -translate-y-1/2 flex items-center gap-3 select-none transition-all duration-500 ease-out ${
                isGoal
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4 pointer-events-none'
              }`}
            >
              {/* Location Pin Icon */}
              <div className="relative flex items-center justify-center shrink-0">
                <span
                  className={`absolute -inset-1 rounded-full bg-white/20 blur-md transition-all duration-700 ${
                    isGoal ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                />
                <div
                  className={`relative size-12 rounded-full bg-gradient-to-b from-white via-[#F1F5F9] to-[#475569] p-[2.5px] shadow-2xl shadow-white/40 flex items-center justify-center transition-all duration-500 hover:scale-105`}
                >
                  <div className="size-full rounded-full bg-[#090B10] flex items-center justify-center">
                    <svg
                      className="size-5.5 text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Final Goal Text: Perfectly adjacent to pin, zero collision/overlap */}
              <div className="shrink-0">
                <div className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white leading-none">
                  FINAL GOAL
                </div>
                <p className="text-[0.7rem] text-white/55 font-medium mt-1 leading-none">
                  The Destination
                </p>
              </div>
            </div>

            {/* ACHIEVEMENT PILLARS (Cleanly placed to the right of Final Goal, y=450 centered) */}
            <div
              className={`absolute left-[65%] top-[84.9%] -translate-y-1/2 flex items-center gap-3 xl:gap-3.5 transition-all duration-500 ease-out ${
                isAwards ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
              }`}
            >
              
              {/* SKILL MASTERY */}
              <div
                className={`p-3 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ease-out text-center space-y-1 w-28 xl:w-30 shadow-xl hover:border-white/40 hover:-translate-y-1 ${
                  isAwards
                    ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                    : 'border-white/10'
                }`}
              >
                <div className="flex justify-center">
                  <SkillMasteryIcon isActive={isAwards} />
                </div>
                <div className="text-[0.68rem] font-black uppercase tracking-wider text-white leading-tight">
                  SKILL MASTERY
                </div>
              </div>

              {/* CERTIFICATE OF COMPLETION */}
              <div
                className={`p-3 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ease-out text-center space-y-1 w-32 xl:w-34 shadow-xl hover:border-white/40 hover:-translate-y-1 ${
                  isAwards
                    ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                    : 'border-white/10'
                }`}
              >
                <div className="flex justify-center">
                  <CertificateIcon isActive={isAwards} />
                </div>
                <div className="text-[0.68rem] font-black uppercase tracking-wider text-white leading-tight">
                  CERTIFICATE OF COMPLETION
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE & TABLET RESPONSIVE ROADMAP (< 1024px)                  */}
        {/* ============================================================== */}
        <div className="lg:hidden relative space-y-8 max-w-xl mx-auto pt-4">
          
          {/* Vertical Glowing Connector Line */}
          <div className="absolute top-6 bottom-6 left-5 w-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-white via-[#E2E8F0] to-[#64748B] shadow-[0_0_12px_rgba(255,255,255,0.9)] rounded-full"
              style={{
                height: `${Math.min(100, Math.max(0, displayProgress * 100))}%`,
              }}
            />
          </div>

          {/* 1. START: FOUNDATION */}
          <div
            className={`relative pl-14 transition-all duration-500 ease-out ${
              isStart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Location Pin Icon: Springs up from down on scroll */}
            <div
              className={`absolute left-1 top-2 transition-all duration-500 ${
                isStart ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-75 pointer-events-none'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <div className="size-8 rounded-full bg-gradient-to-b from-white via-[#E2E8F0] to-[#64748B] p-0.5 flex items-center justify-center shadow-md shadow-white/30">
                <div className="size-full rounded-full bg-[#090B10] flex items-center justify-center">
                  <svg className="size-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e111a]/95 border border-white/15">
              <h3 className="font-display text-lg font-extrabold text-white uppercase">FOUNDATION</h3>
              <p className="text-[0.72rem] text-white/55 font-medium mt-1">Zero prior experience required</p>
            </div>
          </div>

          {/* 2. CORE KNOWLEDGE */}
          <div
            className={`relative pl-14 transition-all duration-500 ease-out ${
              isM1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div
              className={`absolute left-2.5 top-5 size-5 rounded-full border-4 border-[#090B10] transition-colors duration-300 ${
                isM1 ? 'bg-white shadow-md shadow-white/50' : 'bg-white/20'
              }`}
            />
            <div
              className={`p-3.5 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ${
                isM1 ? 'border-white/35 shadow-[0_0_20px_rgba(255,255,255,0.12)]' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <CoreKnowledgeIcon isActive={isM1} />
                <span className="font-display text-sm font-bold text-white">
                  Core Knowledge
                </span>
              </div>
            </div>
          </div>

          {/* 3. HANDS-ON EXPERIENCE */}
          <div
            className={`relative pl-14 transition-all duration-500 ease-out ${
              isM2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div
              className={`absolute left-2.5 top-5 size-5 rounded-full border-4 border-[#090B10] transition-colors duration-300 ${
                isM2 ? 'bg-white shadow-md shadow-white/50' : 'bg-white/20'
              }`}
            />
            <div
              className={`p-3.5 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ${
                isM2 ? 'border-white/35 shadow-[0_0_20px_rgba(255,255,255,0.12)]' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <HandsOnIcon isActive={isM2} />
                <span className="font-display text-sm font-bold text-white">
                  Hands-on Experience
                </span>
              </div>
            </div>
          </div>

          {/* 4. ADVANCED CHART READING */}
          <div
            className={`relative pl-14 transition-all duration-500 ease-out ${
              isM3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div
              className={`absolute left-2.5 top-5 size-5 rounded-full border-4 border-[#090B10] transition-colors duration-300 ${
                isM3 ? 'bg-white shadow-md shadow-white/50' : 'bg-white/20'
              }`}
            />
            <div
              className={`p-3.5 rounded-2xl bg-[#0e111a]/95 border transition-all duration-500 ${
                isM3 ? 'border-white/35 shadow-[0_0_20px_rgba(255,255,255,0.12)]' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <ProblemSolvingIcon isActive={isM3} />
                <span className="font-display text-sm font-bold text-white">
                  Advanced Chart Reading
                </span>
              </div>
            </div>
          </div>

          {/* 5. FINAL GOAL & GRADUATION */}
          <div
            className={`relative pl-14 transition-all duration-500 ease-out ${
              isGoal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Mobile Location Pin: Animated Down-to-Up on scroll */}
            <div
              className={`absolute left-0.5 top-3 transition-all duration-500 ${
                isGoal ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-75 pointer-events-none'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <div className="size-8 rounded-full bg-gradient-to-b from-white via-[#E2E8F0] to-[#475569] p-0.5 flex items-center justify-center shadow-lg shadow-white/40">
                <div className="size-full rounded-full bg-[#090B10] flex items-center justify-center">
                  <svg className="size-4.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className={`p-4.5 rounded-2xl bg-[#0c0d16] border transition-all duration-500 space-y-3.5 ${
                isGoal ? 'border-white/35 shadow-[0_0_25px_rgba(255,255,255,0.15)]' : 'border-white/10'
              }`}
            >
              <div>
                <h3 className="font-display text-lg font-extrabold text-white uppercase">Final Goal</h3>
                <p className="text-[0.72rem] text-white/55 font-medium mt-0.5">Independent, Disciplined Trader</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                  <div className="flex justify-center mb-1.5">
                    <SkillMasteryIcon isActive={isAwards} />
                  </div>
                  <div className="text-[0.68rem] font-black uppercase text-white">SKILL MASTERY</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                  <div className="flex justify-center mb-1.5">
                    <CertificateIcon isActive={isAwards} />
                  </div>
                  <div className="text-[0.68rem] font-black uppercase text-white">CERTIFICATE</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
