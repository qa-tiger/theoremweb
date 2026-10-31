import SEO from '../components/SEO'
import { FinalCta, PageHeader, Stories, usePageTitle } from '../components/sections'
import { FacultyProfile } from '../components/ui'
import { teachers } from '../config/site'

export default function Mentors() {
  usePageTitle('Our Team')
  return (
    <>
      <SEO
        title="Lead Mentors & Trading Faculty"
        description="Meet the seasoned institutional traders and mentors behind Theorem Academy. Decades of combined proprietary trading experience across FX, digital assets, and equities."
        keywords="trading mentors, institutional traders, forex mentors dubai, stock market faculty, theorem academy team"
      />
      <PageHeader
        title="The people behind Theorem."
        intro="Dedicated mentors guiding your cohort curriculum, supported by our technology and engineering team."
      />
      <section className="py-10 sm:py-14">
        <div className="wrap space-y-12 sm:space-y-16 lg:space-y-20">
          {teachers.map((t, i) => <FacultyProfile key={t.name} person={t} reverse={i % 2 === 1} />)}
        </div>
      </section>

      {/* Technology & Platform Team (Space reserved for Parth and Zaeem) */}
      <section className="border-t border-white/10 py-12 sm:py-16 bg-[#0a0a0f]">
        <div className="wrap">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
              Technology & Infrastructure
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
              IT Team
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-white/60">
              Supporting academy systems, student portal infrastructure, and platform security.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl">
            {/* Parth Card */}
            <div className="card-rich p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#121218] flex items-start gap-4">
              <div className="size-14 rounded-xl bg-signal/15 border border-signal/30 text-signal font-display font-extrabold text-xl flex items-center justify-center shrink-0">
                P
              </div>
              <div className="space-y-1">
                <span className="badge-signal text-[0.62rem] font-bold uppercase tracking-wider py-0.5 px-2 inline-block">
                  IT Team
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Parth
                </h3>
                <p className="text-xs text-white/50 pt-0.5">
                  Profile & details to be updated.
                </p>
              </div>
            </div>

            {/* Zaeem Card */}
            <div className="card-rich p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#121218] flex items-start gap-4">
              <div className="size-14 rounded-xl bg-signal/15 border border-signal/30 text-signal font-display font-extrabold text-xl flex items-center justify-center shrink-0">
                Z
              </div>
              <div className="space-y-1">
                <span className="badge-signal text-[0.62rem] font-bold uppercase tracking-wider py-0.5 px-2 inline-block">
                  IT Team
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Zaeem
                </h3>
                <p className="text-xs text-white/50 pt-0.5">
                  Profile & details to be updated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stories />
      <FinalCta />
    </>
  )
}
