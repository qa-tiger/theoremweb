import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { usePageTitle } from '../../components/sections'
import { curriculum } from '../../config/curriculum'
import { programs, site } from '../../config/site'
import { getEnrollments } from '../../lib/api'
import { useAuth } from '../../lib/auth'

// Downloads module study notes as a text file for students
function downloadNotes(program, module) {
  const body = [
    `${site.name} — ${program.title}`,
    `Module: ${module.title}`,
    '',
    ...module.lessons.map((l, i) => `${i + 1}. ${l.title}\n   Key concepts and lecture points.\n`),
  ].join('\n')
  const url = URL.createObjectURL(new Blob([body], { type: 'text/plain' }))
  const a = Object.assign(document.createElement('a'), {
    href: url,
    download: `${module.id}-${module.title.replace(/\W+/g, '-').toLowerCase()}-notes.txt`,
  })
  a.click()
  URL.revokeObjectURL(url)
}

export default function Course() {
  const { programId } = useParams()
  const { user } = useAuth()
  const program = programs.find((p) => p.id === programId)
  usePageTitle(program?.title)
  const modules = curriculum[programId] || []
  const [enrolled, setEnrolled] = useState(null)

  useEffect(() => {
    getEnrollments(user.id).then((list) => {
      setEnrolled(list.some((e) => e.programId === programId) || Boolean(user?.programId === programId))
    })
  }, [user.id, user?.programId, programId])

  if (!program) return <Navigate to="/portal" replace />
  if (enrolled === null) {
    return (
      <div className="flex items-center justify-center py-20 text-white/60 text-sm">
        <span className="size-2 rounded-full bg-signal animate-ping mr-2" />
        Loading course curriculum…
      </div>
    )
  }

  if (!enrolled) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#121218] p-8 text-white space-y-4 max-w-xl">
        <span className="badge-signal text-[0.65rem] font-bold uppercase py-0.5 px-2">
          Course Locked
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          {program.title}
        </h1>
        <p className="text-xs sm:text-sm text-white/70">
          You are not currently enrolled in this program. Contact admissions or complete fee settlement to unlock full access.
        </p>
        <div className="pt-2 flex items-center gap-3">
          <Link to="/portal/fees" className="btn-brand py-2 px-4 text-xs font-bold">
            Pay Course Fees
          </Link>
          <Link to="/portal" className="btn-outline-light py-2 px-4 text-xs font-semibold">
            Back to Portal
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-5">
        <Link to="/portal" className="link-line text-xs font-semibold text-white/70 hover:text-white">
          ← Back to my courses
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="badge-signal text-[0.65rem] font-bold uppercase py-0.5 px-2">
            {program.market}
          </span>
          <span className="badge-outline text-[0.62rem] font-bold text-bull border-bull/40 py-0.5 px-2">
            Active Enrollment
          </span>
          <span className="text-xs text-white/60">
            {program.level} • {program.duration}
          </span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold font-display text-white">
          {program.title}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/70 max-w-2xl">
          Curriculum outline, module breakdown, and study resources for your enrolled cohort.
        </p>
      </div>

      <ol className="mt-6 space-y-5">
        {modules.map((m, mi) => (
          <li
            key={m.id}
            data-module
            className="rounded-2xl border border-white/10 bg-[#121218] p-5 sm:p-6 text-white space-y-4 shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-start gap-3.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-signal/15 text-signal font-extrabold text-sm border border-signal/30">
                  {mi + 1}
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                    {m.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-white/60">
                    {m.lessons.length} Lessons • Study Notes Included
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => downloadNotes(program, m)}
                className="btn-outline-light py-1.5 px-3.5 text-xs font-semibold text-white hover:border-signal transition-colors"
              >
                Download Study Notes
              </button>
            </div>

            <ul className="divide-y divide-white/5">
              {m.lessons.map((l, li) => (
                <li key={l.id} className="flex items-center gap-3 py-2.5 text-xs sm:text-sm">
                  <span className="font-mono text-xs text-white/40 shrink-0 w-6">
                    {(li + 1).toString().padStart(2, '0')}.
                  </span>
                  <span className="flex-1 text-white/85 font-medium">{l.title}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
