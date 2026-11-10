import SEO from '../components/SEO'
import { FinalCta, PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import { site } from '../config/site'

const PILLARS = [
  {
    title: 'Meaningful Mission',
    desc: 'Empower students to understand complex financial concepts with clarity, structured pedagogy, and genuine mentorship.',
    icon: '🎓',
  },
  {
    title: 'Collaborative Culture',
    desc: 'Join a positive, supportive team that champions continuous professional development, open ideas, and mutual respect.',
    icon: '🤝',
  },
  {
    title: 'Diverse Opportunities',
    desc: 'Grow across varied functions including academic instruction, student advisory, program operations, content, and technology.',
    icon: '✨',
  },
]

export default function Careers() {
  usePageTitle('Careers')

  const careersMail = site.careersEmail || site.email || 'careers@theoreminstitute.com'

  return (
    <>
      <SEO
        title="Careers & Teaching Opportunities"
        description="Join the team at Theorem Academy. Explore open opportunities across financial trading faculty, mentor roles, student operations, and technical infrastructure."
        keywords="trading academy careers, finance instructor jobs, forex mentor hiring, theorem academy jobs"
      />
      <PageHeader
        title="Careers at Theorem Academy."
        intro="We are an educational institution dedicated to high-standard learning and student success. Discover inspiring career pathways across our academic, operations, and support teams."
      />

      {/* Positive Environment & Culture */}
      <section className="border-b border-board-line bg-[#09090b] py-14 sm:py-16 text-white">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="badge-signal text-xs py-0.5 px-2.5 uppercase tracking-wider">Why Join Us</span>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-white">
              Shape the future of financial education.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              At Theorem Academy, we believe education is transformative. We foster an inclusive, forward-thinking environment where passionate educators, student advisors, creative minds, and operational leaders work together to build exceptional learning experiences.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((item) => (
              <div
                key={item.title}
                className="card-hover-glow panel p-6 rounded-2xl border border-white/10 bg-[#121218] transition-all"
              >
                <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
                <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <Section
        title="Open positions."
        intro="Opportunities across our learning centers and remote operations."
      >
        {/* Placeholder ready for upcoming Admin configuration */}
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#121218]/60 p-10 sm:p-14 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-2xl text-signal">
            📋
          </div>
          <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-white">
            Current openings will be posted here
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-white/60 leading-relaxed">
            Our active roles are updated periodically. If you are passionate about contributing to our academy, send your resume to our career email below.
          </p>
        </div>

        {/* General Application Banner */}
        <div className="mt-10 rounded-2xl border border-signal/40 bg-gradient-to-r from-signal/15 via-[#16161f] to-signal/10 p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                General Applications
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
                Ready to make a positive impact?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                Whether your expertise lies in instruction, student counseling, administration, marketing, or technology, we welcome talented people who share our passion for quality education.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={`mailto:${careersMail}?subject=Career%20Application%20-%20Theorem%20Academy`}
                className="btn-brand shimmer-button inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink shadow-lg"
              >
                <span>✉️</span>
                <span>Send Resume: {careersMail}</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta
        title="Build your career with Theorem Academy."
        body="Join our campuses in India & the UAE, or collaborate with us remotely."
      />
    </>
  )
}
