import { Link } from 'react-router-dom'
import { PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import { site } from '../config/site'

const BENEFITS = [
  {
    icon: '🏷️',
    title: 'White-label training',
    desc: 'Offer the same Forex, Crypto, Equity, Indices and Commodities curriculum to your clients under your own brand — co-branded portal, certificates and communications.',
  },
  {
    icon: '🤝',
    title: 'Referral partnership',
    desc: "Prefer a lighter footprint? Refer your clients to Theorem directly and earn a commission on every enrollment, with no obligation to run the program yourself.",
  },
  {
    icon: '🎓',
    title: 'Client education, done for you',
    desc: 'Reduce churn and build trust by giving your clients real, structured education instead of generic PDFs — mentor-led, with weekly assignment reviews.',
  },
  {
    icon: '📊',
    title: 'Dedicated account management',
    desc: 'A single point of contact for onboarding, reporting on client progress, and adjusting the curriculum mix to match your client base.',
  },
]

const STEPS = [
  ['Tell us about your brokerage', 'Client base size, regions you operate in, and whether you want white-label or referral.'],
  ['We scope a partnership', 'Pricing, branding, and the markets (Forex, Crypto, Equity, Indices, Commodities) your clients care about most.'],
  ['Launch with your clients', 'Co-branded enrollment, live cohorts, and a dedicated reporting cadence.'],
]

export default function Partners() {
  usePageTitle('Partners')
  return (
    <>
      <PageHeader
        title="Bring institutional trading education to your clients."
        intro="A white-label and referral partnership for forex brokers who want to offer real, structured trader education — without building a training desk themselves."
      />

      <Section tight title="Why brokers partner with Theorem." intro="Built for brokerages that want educated, retained clients rather than one-off sign-ups.">
        <div className="grid gap-5 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="card-hover-glow panel p-5 sm:p-6 text-white">
              <span className="text-2xl">{b.icon}</span>
              <h3 className="mt-3 font-display text-lg sm:text-xl font-extrabold text-white">{b.title}</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tight title="How a partnership comes together." className="bg-[#09090b] border-t border-white/10">
        <ol className="grid gap-5 sm:grid-cols-3">
          {STEPS.map(([title, desc], i) => (
            <li key={title} className="rounded-xl border border-white/10 bg-[#14141c] p-5 sm:p-6 text-white">
              <span className="flap flap-amber [--flap-w:1.35rem]" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-3 font-display text-base sm:text-lg font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-xs text-white/65 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-board text-white border-t border-board-line">
        <div className="wrap grid-12 gap-y-6 py-10 sm:py-12 lg:py-14 items-center">
          <div className="col-span-4 sm:col-span-8 lg:col-span-7">
            <span className="badge-signal text-xs font-bold uppercase tracking-wider py-0.5 px-2.5">Broker Partnerships</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Talk to our partnerships team.
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80 max-w-xl">
              Tell us about your brokerage and client base, and we'll scope a white-label or referral partnership that fits.
            </p>
          </div>
          <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:justify-self-end">
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/contact?topic=partnership" className="btn-brand py-2.5 px-5 text-xs sm:text-sm font-bold shadow-md">
                Enquire about a partnership
              </Link>
              <a href={site.whatsappLink} className="btn-outline-light py-2.5 px-4 text-xs sm:text-sm font-semibold">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
