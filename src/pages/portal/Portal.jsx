import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Wordmark } from '../../components/Layout'
import { usePageTitle } from '../../components/sections'
import { programs } from '../../config/site'
import { getEnrollments, getProgress } from '../../lib/api'
import { useAuth } from '../../lib/auth'

// Loads the signed-in student's enrollments with progress for each.
export function useMyCourses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState(null)
  useEffect(() => {
    let live = true
    getEnrollments(user.id).then(async (list) => {
      let rawList = list || []
      if (rawList.length === 0 && user?.programId) {
        rawList = [{ id: 'auto-' + user.programId, userId: user.id, programId: user.programId, enrolledAt: Date.now() }]
      }
      const withProgress = await Promise.all(
        rawList.map(async (e) => ({
          ...e,
          program: programs.find((p) => p.id === e.programId) || {
            title: 'Enrolled Program',
            market: 'General',
            level: 'Basic',
            duration: '6 weeks',
          },
          progress: await getProgress(user.id, e.programId),
        })),
      )
      if (live) setCourses(withProgress)
    })
    return () => { live = false }
  }, [user.id, user?.programId])
  return courses
}

export function PortalLayout() {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className="wrap grid gap-8 py-8 sm:py-10 lg:grid-cols-[16rem_1fr] lg:gap-12 text-white">
      {/* Student Profile Sidebar */}
      <aside className="space-y-6">
        {/* Brand Header */}
        <div className="pb-2">
          <Wordmark />
        </div>

        {/* User Profile Card */}
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-4 sm:p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-signal/30 to-signal/10 text-signal font-extrabold text-lg border border-signal/40">
              {user.name ? user.name[0].toUpperCase() : 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-extrabold text-white leading-tight">
                {user.name}
              </p>
              <p className="truncate text-[0.7rem] text-white/50">{user.email}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[0.68rem]">
            <span className="text-white/60">Account Status</span>
            {user.country === 'India' ? (
              <span className="badge-signal text-[0.62rem] font-bold py-0.5 px-2">
                KYC: {user.kycStatus || 'Submitted'}
              </span>
            ) : (
              <span className="badge-outline text-[0.62rem] font-bold py-0.5 px-2 text-bull border-bull/40">
                Active Student
              </span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0" aria-label="Portal Navigation">
          <NavLink
            to="/portal"
            end={!pathname.startsWith('/portal/course')}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-signal text-black font-extrabold shadow-lg shadow-signal/10'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
              }`
            }
          >
            <span className="text-base">📚</span>
            <span>My courses</span>
          </NavLink>

          <NavLink
            to="/portal/fees"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-signal text-black font-extrabold shadow-lg shadow-signal/10'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
              }`
            }
          >
            <span className="text-base">💳</span>
            <span>Pay fees</span>
          </NavLink>


          <NavLink
            to="/portal/certificates"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-signal text-black font-extrabold shadow-lg shadow-signal/10'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
              }`
            }
          >
            <span className="text-base">🎓</span>
            <span>Certificates</span>
          </NavLink>

          <NavLink
            to="/portal/support"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-signal text-black font-extrabold shadow-lg shadow-signal/10'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
              }`
            }
          >
            <span className="text-base">💬</span>
            <span>Help and support</span>
          </NavLink>
        </nav>

        {/* Log out */}
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-bear transition-colors px-2 pt-2"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  )
}

// Progress Bar Component
export function ProgressBar({ percent }) {
  return (
    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
      <div className="h-full bg-signal transition-[width] duration-500 rounded-full" style={{ width: `${percent}%` }} />
    </div>
  )
}

export function Dashboard() {
  usePageTitle('My courses')
  const { user } = useAuth()
  const courses = useMyCourses()

  // Selected course in the simple dropdown
  const [selectedCourseId, setSelectedCourseId] = useState(programs[0]?.id || 'forex-basic')

  if (!courses) {
    return (
      <div className="flex items-center justify-center py-20 text-white/60 text-sm">
        <span className="size-2 rounded-full bg-signal animate-ping mr-2" />
        Loading your courses…
      </div>
    )
  }

  const selectedProgram = programs.find((p) => p.id === selectedCourseId) || programs[0]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
          Student Portal
        </span>
        <h1 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Welcome back, {user.name.split(' ')[0]}.
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/70">
          Track your course progress and view enrolled programs.
        </p>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-4 text-white">
          <span className="text-white/50 text-xs font-medium block">Enrolled Courses</span>
          <span className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text mt-1 block">
            {courses.length}
          </span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-4 text-white">
          <span className="text-white/50 text-xs font-medium block">Certificates</span>
          <span className="font-display text-2xl sm:text-3xl font-extrabold text-signal mt-1 block">
            {courses.filter((c) => c.progress.finished).length}
          </span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-4 text-white">
          <span className="text-white/50 text-xs font-medium block">Attendance Mode</span>
          <span className="font-display text-sm sm:text-base font-bold text-white mt-2 block truncate">
            {user.mode || 'Online (Zoom)'}
          </span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-4 text-white">
          <span className="text-white/50 text-xs font-medium block">Student ID</span>
          <span className="font-mono text-xs font-bold text-white/80 mt-2 block truncate">
            TH-{user.id?.slice(0, 6).toUpperCase() || 'STD'}
          </span>
        </div>
      </div>

      {/* Active Enrolled Courses (if student has enrolled courses) */}
      {courses.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
            Your Active Courses ({courses.length})
          </h2>
          <div className="grid gap-4 sm:gap-5">
            {courses.map((c) => (
              <div
                key={c.id}
                className="card-hover-glow rounded-2xl border border-white/15 bg-gradient-to-br from-[#161620] to-[#0f0f14] p-5 sm:p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="badge-signal text-[0.65rem] font-bold uppercase py-0.5 px-2">
                      {c.program.market}
                    </span>
                    <span className="text-xs text-white/50">
                      {c.program.level} • {c.program.duration}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white truncate">
                    {c.program.title}
                  </h3>

                  <div className="mt-4 max-w-md">
                    <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
                      <span>Curriculum Progress</span>
                      <span className="font-bold text-signal tabular-nums">{c.progress.percent}%</span>
                    </div>
                    <ProgressBar percent={c.progress.percent} />
                  </div>

                  {c.progress.finished && (
                    <p className="mt-3 text-xs text-bull font-semibold flex items-center gap-1.5">
                      <span>✓</span> Course complete!{' '}
                      <Link to="/portal/certificates" className="link-line text-signal font-bold">
                        Download certificate
                      </Link>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to={`/portal/course/${c.programId}`}
                    className={`py-2.5 px-5 text-xs sm:text-sm font-bold shadow-md rounded-xl ${
                      c.progress.finished ? 'btn-ghost' : 'btn-brand'
                    }`}
                  >
                    {c.progress.percent === 0
                      ? 'Start Course →'
                      : c.progress.finished
                      ? 'Review Lessons'
                      : 'Continue Learning →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* When student is not enrolled yet: Simple Dropdown View */}
      {courses.length === 0 && (
        <section className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#121218] p-6 sm:p-7 text-white space-y-5 shadow-lg">
            <div>
              <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                Course Selection
              </span>
              <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-white">
                You are not enrolled in a course yet.
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/70">
                Choose a course from the dropdown below to explore its curriculum and enrollment details.
              </p>
            </div>

            {/* Simple Dropdown for Course Selection */}
            <div className="max-w-xl">
              <label htmlFor="course-dropdown" className="label text-xs font-bold text-white/90 mb-1.5 block">
                Select Program:
              </label>
              <select
                id="course-dropdown"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="field py-3 text-xs sm:text-sm font-semibold bg-[#181822] border-white/20"
              >
                <optgroup label="Forex Programs">
                  {programs.filter((p) => p.market === 'Forex').map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.duration} • {p.level})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Crypto Programs">
                  {programs.filter((p) => p.market === 'Crypto').map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.duration} • {p.level})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Equity Programs">
                  {programs.filter((p) => p.market === 'Equity').map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.duration} • {p.level})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Selected Course Compact Preview & Single Contact Action */}
            {selectedProgram && (
              <div className="rounded-xl border border-white/10 bg-[#0e0e14] p-4 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="badge-signal text-[0.65rem] font-bold uppercase py-0.5 px-2">
                        {selectedProgram.market}
                      </span>
                      <span className="text-xs text-white/60 font-medium">
                        {selectedProgram.level} • {selectedProgram.duration} • {selectedProgram.format}
                      </span>
                      {selectedProgram.comingSoon && (
                        <span className="badge-outline text-[0.62rem] py-0.5 px-1.5">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">
                      {selectedProgram.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <Link
                      to={`/programs/${selectedProgram.id}`}
                      className="btn-ghost py-2 px-3.5 text-xs font-semibold"
                    >
                      View Syllabus
                    </Link>
                    {/* The single, dedicated contact option inside the portal */}
                    <Link
                      to={`/contact?program=${selectedProgram.id}`}
                      className="btn-brand py-2 px-4 text-xs font-bold shadow-md"
                    >
                      Contact Admissions to Enroll
                    </Link>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {selectedProgram.summary}
                </p>

                <div className="pt-2 text-[0.72rem] text-white/50 flex flex-wrap gap-x-4 gap-y-1">
                  {selectedProgram.outcomes?.slice(0, 3).map((outcome, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="text-signal font-bold">✓</span>
                      <span>{outcome}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
