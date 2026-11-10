import { Link } from 'react-router-dom'
import { usePageTitle } from '../../components/sections'
import { site, teachers } from '../../config/site'
import { useAuth } from '../../lib/auth'
import { useMyCourses } from './Portal'

// Sized in container units (cqw) so it scales with its own width and prints identically.
function Certificate({ name, program, date, id }) {
  const mentor = teachers.find((t) => t.teaches.includes(program.title)) || teachers[0]
  return (
    <div className="certificate grid aspect-[1.414] w-full grid-cols-[27%_1fr] border border-white/20 bg-white text-black [container-type:inline-size] shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col justify-between bg-board p-[4cqw] text-white">
        <div className="flex items-center">
          <img src="/theorem-logo.png" alt={site.name} className="w-[18cqw] object-contain" />
        </div>
        <div>
          <p className="font-display text-[4.6cqw] leading-[0.95] font-extrabold text-white">Certificate of completion</p>
          <p className="mt-[2cqw] text-[1.3cqw] text-white/60">Certificate {id}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white p-[5cqw] text-black">
        <div>
          <p className="text-[1.6cqw] text-neutral-600 font-medium">This certifies that</p>
          <p className="mt-[1.5cqw] font-display text-[8.5cqw] leading-[0.9] font-extrabold text-black">{name}</p>
          <p className="mt-[3cqw] text-[1.6cqw] text-neutral-600 font-medium">has completed the professional trading curriculum of</p>
          <p className="mt-[0.8cqw] font-display text-[4.4cqw] leading-none font-extrabold text-black">{program.title}</p>
          <div className="mt-[1.6cqw] h-[0.5cqw] w-[10cqw] bg-signal" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-2 gap-[4cqw] text-[1.4cqw]">
          <div className="border-t-[0.2cqw] border-black/30 pt-[1cqw]">
            <p className="font-bold text-black">{mentor.name}</p>
            <p className="text-neutral-600">{mentor.role}</p>
          </div>
          <div className="border-t-[0.2cqw] border-black/30 pt-[1cqw]">
            <p className="font-bold text-black">{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-neutral-600">Date issued</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Certificates() {
  usePageTitle('Certificates')
  const { user } = useAuth()
  const courses = useMyCourses()

  if (!courses) {
    return (
      <div className="flex items-center justify-center py-20 text-white/60 text-sm">
        <span className="size-2 rounded-full bg-signal animate-ping mr-2" />
        Loading your certificates…
      </div>
    )
  }

  // Any issued certificates (from student profile or completed cohorts)
  const issuedCertificates = (courses || []).filter((c) => Boolean(c.certificateIssued || c.progress?.finished))

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-6 print:hidden">
        <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
          Certificates & Credentials
        </span>
        <h1 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Course Certificates
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
          Official certificates of completion are issued by Theorem Academy upon conclusion of your training cohort and mentor evaluation.
        </p>
      </div>

      {/* Render Any Issued Certificates */}
      {issuedCertificates.length > 0 ? (
        issuedCertificates.map((c) => (
          <section key={c.id} className="space-y-4">
            <Certificate name={user.name} program={c.program} date={c.enrolledAt || Date.now()} id={c.id.toUpperCase()} />
            <button onClick={() => window.print()} className="btn-brand py-2 px-5 text-xs font-bold shadow-md print:hidden">
              Download Certificate as PDF
            </button>
          </section>
        ))
      ) : (
        /* Empty State - Friendly Notice */
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-8 sm:p-10 text-center text-white/70 space-y-4 shadow-lg print:hidden max-w-xl mx-auto">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-signal/15 text-signal border border-signal/30 mx-auto shadow-md">
            <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              No Certificates Issued Yet
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-md mx-auto leading-relaxed">
              Your official certificate of completion will appear here once your enrolled cohort and faculty evaluation are complete.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/portal" className="btn-outline-light inline-block py-2 px-4 text-xs font-semibold text-white hover:border-signal">
              ← Back to My Courses
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
