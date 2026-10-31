import { Link, Navigate, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { FinalCta, Offer, PageHeader, usePageTitle } from '../components/sections'
import { ProgramCards, ProgramMatrix, Section, Ticket } from '../components/ui'
import { curriculum } from '../config/curriculum'
import { programs, teachers } from '../config/site'

const mentorFor = (program) => teachers.find((t) => t.teaches.includes(program.title))

// Replaces the old price-by-price comparison table: fees aren't published yet (see
// config/site.js), so the section that used to compare them now promotes the bundle instead.
function BundleBanner() {
  return (
    <Section tight className="bg-[#09090b] border-t border-white/10">
      <div className="card-rich flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <span className="badge-signal text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">All 4 programs</span>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Learn all programs and save 40%.
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl">
            Forex, Crypto, Equity, Indices and Commodities together, with the same mentors and one student portal.
          </p>
        </div>
        <Link to="/contact?package=all-programs-bundle" className="btn-brand py-2.5 px-5 text-xs sm:text-sm font-bold text-center shrink-0">
          Contact us about the bundle
        </Link>
      </div>
    </Section>
  )
}

export function Programs() {
  usePageTitle('Programs')
    return (
    <>
      <SEO
        title={`${program.title} Course`}
        description="Explore Theorem Academy's structured trading programs in Forex, Crypto, Equities, Indices, and Commodities. Master institutional order flow with physical trading floor access and live online batches."
        keywords="trading programs, forex curriculum, crypto trading course, stock market courses, prop firm trading training, institutional finance courses"
      />
      <SEO
        title={`${program.title} Course`}
        description={`${program.summary} Master ${program.market} with institutional mentor-led training, risk frameworks, and prop firm preparation.`}
        keywords={`${program.title}, ${program.market} course, institutional trading, learn ${program.market}, theorem academy`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${program.title} - Theorem Academy`,
          description: program.summary,
          provider: {
            '@type': 'Organization',
            name: 'Theorem Academy',
            sameAs: 'https://theoreminstitute.com',
          },
          educationalCredentialAwarded: 'Certificate of Completion',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: ['In-Person', 'Online'],
            duration: program.duration,
          },
        }}
      />
      <SEO
        title={`${program.title} Course`}
        description="Explore Theorem Academy's structured trading programs in Forex, Crypto, Equities, Indices, and Commodities. Master institutional order flow with physical trading floor access and live online batches."
        keywords="trading programs, forex curriculum, crypto trading course, stock market courses, prop firm trading training, institutional finance courses"
      />
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

          {modules.length > 0 ? (
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
                    <ul className="mt-3 divide-y divide-white/10 text-xs sm:text-sm">
                      {m.lessons.map((l) => (
                        <li key={l.id} className="flex items-center gap-2.5 py-2 text-white/90">
                          <span className="text-signal/80 text-[0.65rem]">•</span>
                          <span>{l.title}</span>
                        </li>
                      ))}
                      {m.quiz && m.quiz.length > 0 && (
                        <li className="flex items-center gap-2.5 py-2 font-bold text-signal">
                          <span className="text-signal text-[0.65rem]">✓</span>
                          <span>Module Knowledge Check & Practical Exercise</span>
                        </li>
                      )}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          ) : program.comingSoon ? (
            <section className="rounded-xl border border-white/10 bg-[#1a1a20] text-white p-5 sm:p-6 shadow-sm">
              <span className="badge-outline text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">Coming soon</span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">Curriculum</h2>
              <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">The module-by-module syllabus for this program is being finalised. Contact us and an advisor will tell you what's confirmed so far and when it opens for enrolment.</p>
            </section>
          ) : null}
        </div>

        <aside className="col-span-4 sm:col-span-8 lg:col-span-5">
          <Ticket className="lg:sticky lg:top-24 p-5 sm:p-6">
            <span className="badge-signal text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">{program.comingSoon ? 'Coming soon' : 'Cohort Enrollment'}</span>
            <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-white">{program.title}</h2>
            <dl className="divide-y divide-white/10 text-xs sm:text-sm py-2 border-t border-white/15 mt-3">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-white/60">{k}</dt>
                  <dd className="text-right font-bold text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-white/15 pt-4 text-xs sm:text-sm text-white/75 leading-relaxed">
              {program.comingSoon
                ? 'Dates and fees for this program are being confirmed. Contact admissions to be notified when it opens.'
                : 'Contact admissions for current fees, the next cohort dates, and to check your batch (in person or online).'}
            </p>
            <Link to={`/contact?program=${program.id}`} className="btn-brand mt-4 w-full py-2.5 text-xs sm:text-sm font-bold text-center block shadow-md">
              Contact us about {program.title}
            </Link>
            {mentor && (
              <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/65">
                Cohort led by <Link to={`/mentors#${mentor.name.toLowerCase()}`} className="link-line text-white font-bold">{mentor.name}</Link>, {mentor.role}.
              </p>
            )}
          </Ticket>
        </aside>
      </div>

      {/* Sticky Mobile Enrollment Bar for Program Details */}
      <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden border-t border-board-line bg-[#0d0d12]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-xs text-white/65 block">{program.comingSoon ? 'Coming soon' : program.title}</span>
          <span className="font-display text-base font-extrabold text-white">Contact us for fees & dates</span>
        </div>
        <Link to={`/contact?program=${program.id}`} className="btn-brand py-2 px-5 text-xs font-bold shadow-md">
          Contact us
        </Link>
      </div>

      <Section
        tight
        title="Explore all markets & levels."
        intro="Select across our 5 trading disciplines to view curriculum and cohort details for Basic, Intermediate, or Advanced tiers."
        className="bg-[#09090b] border-t border-white/10"
      >
        <ProgramMatrix currentProgramId={program.id} />
      </Section>
    </>
  )
}
