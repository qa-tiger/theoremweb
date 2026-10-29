import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroVisualBackground from '../components/HeroVisualBackground'
import CampusShowcase from '../components/CampusShowcase'
import {
  Approach,
  Faq,
  FinalCta,
  HybridExperience,
  Stories,
  usePageTitle,
} from '../components/sections'


const SCENE_ROTATION = ['offline', 'online']

function Hero() {
  const [activeScene, setActiveScene] = useState('offline')

  // Auto-rotate background scenes every 5 seconds (Offline -> Online -> Offline)
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setActiveScene((current) => {
        const nextIndex = (SCENE_ROTATION.indexOf(current) + 1) % SCENE_ROTATION.length
        return SCENE_ROTATION[nextIndex]
      })
    }, 5000)
    return () => clearInterval(rotationTimer)
  }, [])

  return (
    <section id="hero" className="relative min-h-[76vh] lg:min-h-[80vh] flex flex-col justify-start overflow-hidden bg-[#07070a] text-white border-b border-board-line">
      {/* 1. Atmospheric Ambient Background */}
      <HeroVisualBackground activeScene={activeScene} />

      <div className="wrap relative z-10 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-14 lg:pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Authoritative Value Proposition & Direct CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 self-start">
            
            {/* Main Headline */}
            <div className="hero-rise space-y-3 sm:space-y-3.5">
              <p className="text-sm font-medium text-white/55">In-person training floors and live interactive cohorts worldwide.</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.02]">
                <span className="text-white">Master </span>
                <span className="gold-bright-text">Institutional Trading.</span>
              </h1>

              {/* Concise Asset Focus */}
              <div className="space-y-0.5 pt-0.5">
                <span className="text-sm sm:text-base font-semibold text-white/80 block">Learn</span>
                <p className="font-display text-lg sm:text-xl lg:text-[1.5rem] font-extrabold tracking-wide text-signal">
                  Forex <span className="text-white/40 font-normal mx-1">|</span> Crypto <span className="text-white/40 font-normal mx-1">|</span> Equity <span className="text-white/40 font-normal mx-1">|</span> Indices <span className="text-white/40 font-normal mx-1">|</span> Commodities
                </p>
              </div>
            </div>

            {/* Direct Action CTAs */}
            <div className="hero-rise flex flex-wrap items-center gap-3.5 pt-1" style={{ animationDelay: '120ms' }}>
              <Link
                to="/programs"
                className="btn-brand shimmer-button px-7 py-3.5 text-xs sm:text-sm font-bold"
              >
                Explore Programs →
              </Link>
              <Link
                to="/contact"
                className="btn-outline-light px-6 py-3.5 text-xs sm:text-sm font-semibold backdrop-blur-md bg-white/5 hover:bg-white/10"
              >
                Book Advisor Call
              </Link>
            </div>

            {/* Clean Trust & Metric Strip */}
            <div className="hero-rise pt-4 border-t border-white/10" style={{ animationDelay: '240ms' }}>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text tabular-nums leading-none">
                    4.9 <span className="text-sm font-sans text-signal">★</span>
                  </div>
                  <div className="mt-1.5 text-xs text-white/70 font-medium leading-tight">
                    Rated on Google
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text tabular-nums leading-none">
                    500+
                  </div>
                  <div className="mt-1.5 text-xs text-white/70 font-medium leading-tight">
                    Students Enrolled
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text tabular-nums leading-none">
                    &lt;10
                  </div>
                  <div className="mt-1.5 text-xs text-white/70 font-medium leading-tight">
                    Traders / Cohort
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Campus Showcase Card */}
          <div className="hero-rise lg:col-span-5 relative self-start" style={{ animationDelay: '160ms' }}>
            <CampusShowcase activeId={activeScene} onSelect={setActiveScene} />
          </div>

        </div>
      </div>
    </section>
  )
}


export default function Home() {
  usePageTitle(null)
  return (
    <>
      {/* 1. Executive Hero with Campus Showcase */}
      <Hero />

      {/* 2. Why Theorem Academy: 3 Clear Pillars (Clean Fundfloat-style simplicity) */}
      <HybridExperience />

      {/* 4. The 4-Stage Teaching Method */}
      <Approach
        dark
        action={<Link to="/about" className="link-line text-white">Our teaching philosophy →</Link>}
      />


      {/* 7. Student Testimonials */}
      <Stories limit={3} />

      {/* 8. Frequently Asked Questions */}
      <Faq className="bg-card" />

      {/* 9. Closing Conversion Banner */}
      <FinalCta
        title="Start trading with a proven, reviewed plan."
        body="Tell us what you trade now, or start from scratch. Join our next cohort in person or live online."
      />
    </>
  )
}
