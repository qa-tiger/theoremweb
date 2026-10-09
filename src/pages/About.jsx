import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Approach, FinalCta, Outcomes, PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import { stories, site } from '../config/site'

const CLASSROOM_PHOTOS = [
  {
    title: 'Dubai Trading Floor Desk',
    location: 'Business Bay, Dubai',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    caption: 'Multi-monitor trading terminal stations for live session analysis',
  },
  {
    title: '1-on-1 Chart Assignment Markup',
    location: 'Mentorship Suite',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    caption: 'Senior mentor analyzing execution logs and stop-loss placement',
  },
  {
    title: 'Institutional Lecture Hall',
    location: 'India Campus Lab',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Interactive workshop on liquidity zones and order block theory',
  },
  {
    title: 'Live Market Open Workshop',
    location: 'London & NY Session Room',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    caption: 'Real-time news volatility breakdown and position sizing rules',
  },
  {
    title: 'Small Cohort Collaboration',
    location: 'Dubai Floor',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Traders sharing pre-market bias and correlation charts',
  },
  {
    title: 'Simulated Demo Terminal Lab',
    location: 'Quantitative Lab',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    caption: 'Students executing structured micro-lot practice before live capital',
  },
]

const VIDEO_SHOWCASE = [
  {
    id: 'dubai-tour',
    title: 'Dubai Business Bay Trading Floor Tour',
    duration: '3:45',
    category: 'Campus Tour',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    desc: 'Take a visual walkthrough of our high-tech trading lab in Business Bay Dubai, equipped with Bloomberg feeds and multi-screen desks.',
    views: '18.4K views',
  },
  {
    id: 'mentorship-session',
    title: 'Live 1-on-1 Assignment Review Breakdown',
    duration: '5:12',
    category: 'Mentorship',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    desc: 'Watch senior mentor Alex Vance review a student’s GBP/USD execution journal, explaining invalidation levels and risk allocation rules.',
    views: '24.1K views',
  },
  {
    id: 'student-journey',
    title: 'From Zero Knowledge to Independent Analysis',
    duration: '4:20',
    category: 'Student Story',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    desc: 'Priya S. shares how strict 1% risk rules and mentor assignment reviews helped her develop disciplined execution and a complete written plan.',
    views: '31.8K views',
  },
]

export default function About() {
  usePageTitle('About Theorem Institute')
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <>
      <PageHeader
        title="An academy for people who want to trade properly."
        intro="We teach forex, crypto and equity in classrooms in Dubai and India, and live online. Batches are small (<15 students), one mentor stays with you from first class to final review, and every student leaves with a written plan."
      />

      {/* Classroom Photos Gallery (Requirement 3) */}
      <Section
        tight
        title="Classroom & Trading Floor Photo Gallery"
        intro="Inside our Dubai Business Bay and India campus trading floors. High-refresh multi-screen desks, live mentor terminals, and focused cohort tables."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSROOM_PHOTOS.map((photo) => (
            <figure
              key={photo.title}
              className="card-hover-glow group relative overflow-hidden rounded-2xl border border-white/10 bg-[#14141c] text-white shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14141c] via-transparent to-transparent opacity-80" />
                <span className="badge-signal absolute top-3 left-3 text-[0.65rem] font-bold py-0.5 px-2">
                  {photo.location}
                </span>
              </div>
              <figcaption className="p-4">
                <h3 className="font-display text-base font-bold text-white group-hover:text-signal transition-colors">
                  {photo.title}
                </h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  {photo.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Video Showcase Section (Requirement 3) */}
      <Section
        tight
        dark
        title="Video Showcase & Floor Walkthroughs"
        intro="Watch how our trading floors operate, how mentors dissect execution logs, and how students achieve consistency."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {VIDEO_SHOWCASE.map((vid) => (
            <article
              key={vid.id}
              className="card-hover-glow group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#161622] text-white shadow-xl"
            >
              <div>
                <div
                  onClick={() => setActiveVideo(vid)}
                  className="relative aspect-video overflow-hidden bg-black/60 cursor-pointer"
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="h-full w-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/20">
                    <div className="size-12 sm:size-14 rounded-full bg-signal text-black flex items-center justify-center font-bold text-lg sm:text-xl shadow-[0_0_20px_rgba(242,177,52,0.8)] transform group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-2 py-0.5 text-[0.65rem] font-mono font-bold text-white backdrop-blur-sm">
                    {vid.duration}
                  </span>
                  <span className="badge-signal absolute top-2.5 left-2.5 text-[0.65rem] font-bold py-0.5 px-2">
                    {vid.category}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[0.7rem] text-white/50">{vid.views}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-white group-hover:text-signal transition-colors leading-snug">
                    {vid.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed line-clamp-2">
                    {vid.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setActiveVideo(vid)}
                  className="link-line text-xs font-bold text-signal flex items-center gap-1"
                >
                  <span>Watch Walkthrough</span>
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl border border-white/20 bg-[#121218] p-4 sm:p-6 text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="badge-signal text-xs py-0.5 px-2">{activeVideo.category}</span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="rounded-full bg-white/10 p-1.5 text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="relative aspect-video w-full rounded-xl bg-black overflow-hidden mt-4 flex items-center justify-center">
                <img src={activeVideo.thumbnail} alt={activeVideo.title} className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="size-16 rounded-full bg-signal text-black flex items-center justify-center font-bold text-2xl shadow-[0_0_30px_rgba(242,177,52,0.8)] animate-pulse mb-3">
                    ▶
                  </div>
                  <p className="font-bold text-white text-base">{activeVideo.title}</p>
                  <p className="text-xs text-white/70 max-w-md mt-1">{activeVideo.desc}</p>
                  <a
                    href={site.whatsappLink}
                    className="btn-brand mt-4 py-2 px-5 text-xs font-bold shadow-md"
                  >
                    Request Full Video Tour on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Student Reviews Section (Requirement 3) */}
      <Section
        tight
        title="Student Reviews & Feedback"
        intro="Read verified reviews from students who completed our institutional trading programs in Dubai, India, and online."
        action={
          <a
            href={site.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-signal"
          >
            Google Reviews Rating: 4.9 ★ ↗
          </a>
        }
        className="bg-[#0b0b10]"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className="card-hover-glow flex flex-col justify-between rounded-2xl border border-white/10 bg-[#151520] p-6 text-white shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex text-signal text-sm">
                    {'★'.repeat(story.rating || 5)}
                  </div>
                  {story.outcome && (
                    <span className="badge-signal text-[0.65rem] font-bold py-0.5 px-2">
                      {story.outcome}
                    </span>
                  )}
                </div>
                <blockquote className="mt-4 text-xs sm:text-sm text-white/85 leading-relaxed italic">
                  “{story.quote}”
                </blockquote>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="size-9 rounded-full bg-signal/20 border border-signal/40 flex items-center justify-center font-bold text-signal text-xs">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">{story.name}</div>
                  <div className="text-[0.7rem] text-white/55">{story.program} • {story.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* The 4-Stage Teaching Method */}
      <Approach />

      {/* Core Deliverables */}
      <Outcomes />

      {/* Final Conversion CTA */}
      <FinalCta />
    </>
  )
}
