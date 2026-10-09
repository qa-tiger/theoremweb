import { Link, Navigate, useParams } from 'react-router-dom'
import { FinalCta, Offer, PageHeader, usePageTitle } from '../components/sections'
import { ProgramBoard, ProgramCards, Section, Ticket } from '../components/ui'
import { curriculum } from '../config/curriculum'
import { programs, teachers, site } from '../config/site'

const mentorFor = (program) => teachers.find((t) => t.teaches.includes(program.title))

function PromotionalBanner() {
  return (
    <Section tight className="bg-gradient-to-b from-[#111116] to-[#07070a] border-t border-white/10">
      <div className="card-hover-glow relative overflow-hidden rounded-3xl border border-signal/40 bg-gradient-to-r from-[#1c1c24] via-[#16161e] to-[#0f0f14] p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-signal text-xs font-bold uppercase tracking-wider py-1 px-3">
                All-Track Master Pass
              </span>
              <span className="rounded-full bg-signal text-black px-2.5 py-0.5 text-xs font-extrabold">
                40% BUNDLE SAVINGS
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Learn all programs and <span className="gold-foil-text">save 40%.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
              Master the entire trading landscape. Gain unrestricted access across our Forex, Crypto, and Equity tracks with dedicated mentorship, private 1-on-1 chart reviews, and verified certifications.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Forex Track', 'Crypto Track', 'Equity Track', '1-on-1 Mentor Reviews', 'Physical Labs & Zoom'].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#22222a] px-3 py-1 text-xs font-semibold text-white/90">
                  <span className="text-signal font-bold">✓</span>
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-start lg:items-end">
            <Link
              to="/contact?package=all-programs-40-off"
              className="btn-brand shimmer-button w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold text-center shadow-[0_0_24px_rgba(242,177,52,0.4)]"
            >
              Claim 40% Pass (Contact Us) →
            </Link>
            <a
              href={site.whatsappLink}
              className="btn-outline-light w-full sm:w-auto px-7 py-3 text-xs sm:text-sm font-semibold text-center"
            >
              💬 Instant WhatsApp Inquiries
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Programs() {
  usePageTitle('Programs')
  return (
    <>
      <PageHeader
        title="Institutional Trading Programs across Forex, Crypto & Equity"
        intro="Each program runs in our Dubai & India classrooms and interactive live online, with seasoned mentors, weekly assignment reviews, and certificates on completion."
      />
      <Section tight className="pt-6 sm:pt-8 lg:pt-10">
        <ProgramCards />
      </Section>
      <PromotionalBanner />
      <Offer className="border-t border-white/10" />
      <FinalCta title="Not sure which program fits your schedule?" body="Tell us what you trade now, or that you have never traded. An advisor will recommend a program and a batch in Dubai, India or online." />
    </>
  )
}

export function ProgramDetail() {
  const { programId } = useParams()
  const program = programs.find((p) => p.id === programId)
  usePageTitle(program?.title)
  if (!program) return <Navigate to="/programs" replace />

  const modules = curriculum[program.id] || []
  const mentor = mentorFor(program)
  const others = programs.filter((p) => p.id !== program.id)
  const facts = [
    ['Market', program.market],
    ['Level', program.level],
    ['Duration', program.duration],
    ['Format', program.format],
    ['On completion', 'Certificate'],
  ]

  return (
    <>
      <PageHeader back={{ to: '/programs', label: 'All programs' }} title={program.title} intro={program.summary} />

      <div className="wrap grid-12 gap-8 lg:gap-10 py-8 sm:py-12 lg:py-14">
        <div className="col-span-4 space-y-10 sm:col-span-8 lg:col-span-7">
          <section className="rounded-xl border border-white/10 bg-[#1a1a20] text-white p-5 sm:p-6 shadow-sm">
            <span className="badge-signal text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">Target Audience</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">Who it is for</h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">{program.audience}</p>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#1a1a20] text-white p-5 sm:p-6 shadow-sm">
            <span className="badge-signal text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">Core Skills</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">What you will learn</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm">
              {program.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-2 rounded-lg bg-[#22222a] border border-white/5 p-2.5 font-medium text-white">
                  <span className="text-signal font-bold">✓</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          {modules.length > 0 && (
            <section className="rounded-xl border border-white/10 bg-[#1a1a20] text-white p-5 sm:p-6 shadow-sm">
              <span className="badge-signal text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">Structured Syllabus</span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">Curriculum</h2>
              <p className="mt-1 text-xs sm:text-sm text-white/70">Modules are taken in sequence. Each ends with a knowledge check to ensure understanding before moving to the next.</p>
              <ol className="mt-5 space-y-4">
                {modules.map((m, i) => (
                  <li key={m.id} className="rounded-lg border border-white/10 bg-[#22222a] p-4">
                    <div className="flex items-center gap-3">
                      <span className="flap flap-amber [--flap-w:1.35rem]" aria-hidden="true">{i + 1}</span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white">{m.title}</h3>
                    </div>
                    <ul className="mt-3 divide-y divide-white/10 text-xs">
                      {m.lessons.map((l) => (
                        <li key={l.id} className="flex justify-between gap-4 py-2 text-white/90">
                          <span>{l.title}</span>
                          <span className="whitespace-nowrap tabular-nums text-white/50">{l.minutes} min</span>
                        </li>
                      ))}
                      <li className="flex justify-between gap-4 py-2 font-bold text-signal">
                        <span>Module Knowledge Quiz & Journal Check</span>
                        <span className="whitespace-nowrap">{m.quiz.length} questions</span>
                      </li>
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="col-span-4 sm:col-span-8 lg:col-span-5">
          <Ticket className="lg:sticky lg:top-24 p-5 sm:p-6">
            <span className="badge-signal text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">Cohort Enrollment</span>
            <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-white">Admissions & Options</h2>
            <div className="mt-4 rounded-xl border border-signal/30 bg-[#1e1e26] p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-signal block">Cohort Status</span>
              <div className="mt-1 text-sm font-bold text-white">
                Enrolling for Next Batch (Dubai, India & Online)
              </div>
              <p className="mt-1 text-xs text-white/70 leading-relaxed">
                Reach our admissions desk for batch dates, cohort seat availability, and fee schedules.
              </p>
            </div>
            <dl className="divide-y divide-white/10 text-xs sm:text-sm py-2">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-white/60">{k}</dt>
                  <dd className="text-right font-bold text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to={`/contact?program=${program.id}`} className="btn-brand mt-4 w-full py-3 text-xs sm:text-sm font-bold text-center block shadow-md">Contact Us for Admissions</Link>
            <a href={site.whatsappLink} className="btn-outline-light mt-2.5 w-full py-2.5 text-xs sm:text-sm font-semibold text-center block">💬 Inquire on WhatsApp</a>
            {mentor && (
              <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/65">
                Cohort led by <Link to={`/mentors#${mentor.name.toLowerCase()}`} className="link-line text-white font-bold">{mentor.name}</Link>, {mentor.role}.
              </p>
            )}
          </Ticket>
        </aside>
      </div>

      {/* Sticky Mobile Inquire Bar for Program Details */}
      <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden border-t border-board-line bg-[#0d0d12]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-xs text-white/65 block">Admissions Status</span>
          <span className="font-display text-sm font-extrabold text-signal">India • Dubai • Online</span>
        </div>
        <Link to={`/contact?program=${program.id}`} className="btn-brand py-2 px-5 text-xs font-bold shadow-md">
          Contact Us →
        </Link>
      </div>

      <Section tight title="Other programs." intro="Explore other asset classes and skill levels." className="bg-[#09090b] border-t border-white/10">
        <ProgramBoard programs={others} />
      </Section>
    </>
  )
}
