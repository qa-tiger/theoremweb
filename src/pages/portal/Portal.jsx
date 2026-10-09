import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { PortalNavLink } from '../../components/Layout'
import { usePageTitle } from '../../components/sections'
import { ProgramBoard } from '../../components/ui'
import { programs } from '../../config/site'
import { getEnrollments, getProgress } from '../../lib/api'
import { useAuth } from '../../lib/auth'

// Loads the signed-in student's enrollments with progress for each.
export function useMyCourses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState(null)
  useEffect(() => {
    let live = true
    if (!user?.id) {
      setCourses([])
      return
    }
    getEnrollments(user.id)
      .then(async (list) => {
        const withProgress = await Promise.all(
          list.map(async (e) => {
            const prog = programs.find((p) => p.id === e.programId) || { id: e.programId, title: 'Institutional Trading Course', market: 'Trading' }
            const progProgress = await getProgress(user.id, e.programId)
            return { ...e, program: prog, progress: progProgress }
          }),
        )
        if (live) setCourses(withProgress)
      })
      .catch(() => {
        if (live) setCourses([])
      })
    return () => {
      live = false
    }
  }, [user?.id])
  return courses
}

export function PortalLayout() {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()
  return (
    <div className="wrap grid gap-8 py-8 sm:py-12 lg:grid-cols-[14rem_1fr] lg:gap-12 text-white">
      <aside className="space-y-5">
        <div className="p-4 rounded-2xl border border-white/10 bg-[#121218] shadow-sm">
          <p className="text-[0.68rem] uppercase font-bold text-white/50 tracking-wider">Student Profile</p>
          <p className="mt-1 truncate font-display text-lg sm:text-xl font-extrabold text-white">{user?.name || 'Student'}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-signal animate-pulse" />
            <span className="text-[0.7rem] text-signal font-bold">Active Batch</span>
          </div>
        </div>

        <nav className="-mx-4 flex overflow-x-auto border-b border-white/10 px-4 lg:mx-0 lg:flex-col lg:border-b-0 lg:px-0 space-y-1.5" aria-label="Portal Navigation">
          <PortalNavLink to="/portal" end={!pathname.startsWith('/portal/course')}>📚 My Courses</PortalNavLink>
          <PortalNavLink to="/portal/certificates">🏆 Verified Certificates</PortalNavLink>
          <PortalNavLink to="/portal/support">💬 Student Help Desk</PortalNavLink>
        </nav>

        <div className="border-t border-white/10 pt-4 hidden lg:block">
          <button onClick={signOut} className="text-xs font-semibold text-white/60 hover:text-signal transition-colors flex items-center gap-1.5">
            <span>🚪</span>
            <span>Sign out of portal</span>
          </button>
        </div>
      </aside>
      <div className="min-w-0"><Outlet /></div>
    </div>
  )
}

// Progress: an amber bar on an ink hairline, with the percentage in board digits beside it.
export function ProgressBar({ percent = 0 }) {
  return (
    <div className="h-2 bg-line" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
      <div className="h-full bg-signal transition-[width] duration-500" style={{ width: `${percent}%` }} />
    </div>
  )
}

export function Dashboard() {
  usePageTitle('My courses')
  const { user } = useAuth()
  const courses = useMyCourses()
  if (!courses) return <p className="text-ink-soft">Loading your courses…</p>

  return (
    <div>
      <h1 className="text-[3.2rem] sm:text-5xl">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Trader'}.</h1>
      {courses.length === 0 ? (
        <div className="mt-10">
          <h2 className="text-[2.2rem] sm:text-3xl">You are not enrolled in a course yet.</h2>
          <p className="mt-3 max-w-[34rem] text-ink-soft">Pick a program to unlock its lessons, notes, quizzes and certificate.</p>
          <div className="mt-8"><ProgramBoard /></div>
        </div>
      ) : (
        <ul className="mt-10 border-t-2 border-ink">
          {courses.map((c) => (
            <li key={c.id} className="grid gap-5 border-b border-line py-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-sm font-semibold text-brand">{c.program?.market || 'Trading'}</p>
                <h2 className="mt-1 text-[2.6rem] sm:text-3xl">{c.program?.title || 'Course'}</h2>
                <div className="mt-5 flex max-w-[34rem] items-center gap-4">
                  <div className="flex-1"><ProgressBar percent={c.progress?.percent || 0} /></div>
                  <span className="text-sm font-semibold tabular-nums">{c.progress?.percent || 0}%</span>
                </div>
                {c.progress?.finished && (
                  <p className="mt-3 text-sm">Course complete. <Link to="/portal/certificates" className="link-line">View your certificate</Link></p>
                )}
              </div>
              <Link to={`/portal/course/${c.programId}`} className={c.progress?.finished ? 'btn-ghost' : 'btn-brand'}>
                {c.progress?.percent === 0 ? 'Start course' : c.progress?.finished ? 'Review course' : 'Continue course'}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
