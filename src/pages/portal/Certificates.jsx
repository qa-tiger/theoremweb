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
      {issuedCertificates.map((c) => (
        <section key={c.id} className="space-y-4">
          <Certificate name={user.name} program={c.program} date={c.enrolledAt || Date.now()} id={c.id.toUpperCase()} />
          <button onClick={() => window.print()} className="btn-brand py-2 px-5 text-xs font-bold shadow-md print:hidden">
            Download Certificate as PDF
          </button>
        </section>
      ))}

      {/* Enrolled Active Programs Status */}
      {courses.length > 0 && (
        <section className="space-y-4 print:hidden">
          <h2 className="font-display text-lg sm:text-xl font-bold text-white">
            Enrolled Programs ({courses.length})
          </h2>
          <div className="grid gap-3 sm:gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-white/10 bg-[#121218] p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="badge-signal text-[0.65rem] font-bold uppercase py-0.5 px-2">
                      {c.program.market}
                    </span>
                    <span className="badge-outline text-[0.62rem] font-bold text-bull border-bull/40 py-0.5 px-2">
                      Active Enrollment
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-white">
                    {c.program.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {c.program.level} • {c.program.duration} • Certificate issued upon cohort conclusion.
                  </p>
                </div>

                <Link
                  to={`/portal/course/${c.programId}`}
                  className="btn-outline-light py-2 px-4 text-xs font-semibold shrink-0"
                >
                  View Curriculum →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {courses.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-8 text-center text-white/70 space-y-3">
          <p className="text-sm font-semibold text-white">No active course enrollments yet.</p>
          <p className="text-xs text-white/50 max-w-md mx-auto">
            Enroll in a Theorem Academy program to start your training and earn an accredited certificate of completion.
          </p>
          <Link to="/portal" className="btn-brand inline-block py-2 px-4 text-xs font-bold mt-2">
            Explore Programs
          </Link>
        </div>
      )}
    </div>
  )
}
