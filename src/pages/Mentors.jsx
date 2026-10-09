import { FinalCta, PageHeader, usePageTitle } from '../components/sections'
import { FacultyProfile } from '../components/ui'
import { teachers } from '../config/site'

export default function Mentors() {
  usePageTitle('Our Team')
  return (
    <>
      <PageHeader
        title="Our Team & Institutional Mentors"
        intro="Each program is led by one dedicated mentor from day one to graduation. You meet them in your first class, and they personally review your assignments until your last."
      />
      <section className="py-10 sm:py-14">
        <div className="wrap space-y-12 sm:space-y-16 lg:space-y-20">
          {teachers.map((t, i) => <FacultyProfile key={t.name} person={t} reverse={i % 2 === 1} />)}
        </div>
      </section>
      <FinalCta
        title="Speak directly with a mentor."
        body="Have specific questions about risk frameworks or technical modules? Book a 1-on-1 advisor call or chat on WhatsApp."
      />
    </>
  )
}
