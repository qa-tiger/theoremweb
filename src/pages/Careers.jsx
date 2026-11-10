import { useEffect, useMemo, useState } from 'react'
import SEO from '../components/SEO'
import { FinalCta, PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import { site } from '../config/site'
import { fetchJobsFromDb, submitJobApplication } from '../lib/api'

const PILLARS = [
  {
    title: 'Meaningful Mission',
    desc: 'Empower students to understand complex financial concepts with clarity, structured pedagogy, and genuine mentorship.',
    icon: '🎓',
  },
  {
    title: 'Collaborative Culture',
    desc: 'Join a positive, supportive team that champions continuous professional development, open ideas, and mutual respect.',
    icon: '🤝',
  },
  {
    title: 'Diverse Opportunities',
    desc: 'Grow across varied functions including academic instruction, student advisory, program operations, content, and technology.',
    icon: '✨',
  },
]

function formatSalary(job) {
  if (!job.isSalaryDisclosed || (!job.minSalary && !job.maxSalary)) {
    return 'Competitive'
  }
  const freq = job.salaryFrequency === 'yearly' ? 'yr' : 'mo'
  if (job.minSalary && job.maxSalary) {
    return `${job.currency} ${Number(job.minSalary).toLocaleString()} – ${Number(job.maxSalary).toLocaleString()} / ${freq}`
  }
  if (job.minSalary) {
    return `From ${job.currency} ${Number(job.minSalary).toLocaleString()} / ${freq}`
  }
  return `${job.currency} ${Number(job.maxSalary).toLocaleString()} / ${freq}`
}

export default function Careers() {
  usePageTitle('Careers')

  const careersMail = site.careersEmail || site.email || 'careers@theoreminstitute.com'

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedJob, setSelectedJob] = useState(null)

  // Candidate Application Modal Form State
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [applicantCv, setApplicantCv] = useState('')
  const [applicantMessage, setApplicantMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // 1. Fetch live active jobs from Supabase
  useEffect(() => {
    let isMounted = true
    async function loadJobs() {
      setLoading(true)
      try {
        const liveJobs = await fetchJobsFromDb()
        if (isMounted) {
          setJobs(liveJobs || [])
        }
      } catch (err) {
        console.warn('Error loading jobs:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadJobs()
    return () => {
      isMounted = false
    }
  }, [])

  // 2. Hash link support (e.g. /careers#job-123)
  useEffect(() => {
    if (!loading && jobs.length > 0) {
      const hash = window.location.hash.replace('#', '').trim()
      if (hash) {
        const matched = jobs.find((j) => String(j.id).toLowerCase() === hash.toLowerCase())
        if (matched) {
          setSelectedJob(matched)
        }
      }
    }
  }, [loading, jobs])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedJob])

  // Unique departments & locations for filter pills
  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [jobs])

  const locations = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [jobs])

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase()
    return jobs.filter((job) => {
      const matchSearch =
        !q ||
        job.title?.toLowerCase().includes(q) ||
        job.department?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.overview?.toLowerCase().includes(q) ||
        job.experienceLevel?.toLowerCase().includes(q)

      const matchDept = selectedDept === 'All' || job.department === selectedDept
      const matchLoc = selectedLocation === 'All' || job.location === selectedLocation

      return matchSearch && matchDept && matchLoc
    })
  }, [jobs, search, selectedDept, selectedLocation])

  const openJobModal = (job) => {
    setSelectedJob(job)
    setSubmitSuccess(false)
    setSubmitError('')
    setApplicantName('')
    setApplicantEmail('')
    setApplicantPhone('')
    setApplicantCv('')
    setApplicantMessage('')
  }

  const closeJobModal = () => {
    setSelectedJob(null)
    setSubmitSuccess(false)
    setSubmitError('')
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    if (!selectedJob) return
    setSubmitting(true)
    setSubmitError('')

    try {
      await submitJobApplication({
        job: selectedJob,
        name: applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        cvLink: applicantCv,
        message: applicantMessage,
      })
      setSubmitSuccess(true)
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit application. Please email your resume directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Careers & Teaching Opportunities"
        description="Join the team at Theorem Academy. Explore open opportunities across financial trading faculty, mentor roles, student operations, and technical infrastructure."
        keywords="trading academy careers, finance instructor jobs, forex mentor hiring, theorem academy jobs"
      />
      <PageHeader
        title="Careers at Theorem Academy."
        intro="We are an educational institution dedicated to high-standard learning and student success. Discover inspiring career pathways across our academic, operations, and support teams."
      />

      {/* Positive Environment & Culture */}
      <section className="border-b border-board-line bg-[#09090b] py-14 sm:py-16 text-white">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="badge-signal text-xs py-0.5 px-2.5 uppercase tracking-wider">Why Join Us</span>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold text-white">
              Shape the future of financial education.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              At Theorem Academy, we believe education is transformative. We foster an inclusive, forward-thinking environment where passionate educators, student advisors, creative minds, and operational leaders work together to build exceptional learning experiences.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((item) => (
              <div
                key={item.title}
                className="card-hover-glow panel p-6 rounded-2xl border border-white/10 bg-[#121218] transition-all"
              >
                <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
                <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <Section
        title="Open positions."
        intro="Opportunities across our learning centers in Dubai and Mumbai, plus remote operations."
      >
        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-white/10 bg-[#121218] p-6 sm:p-7 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 w-28 rounded bg-white/10" />
                  <div className="h-4 w-20 rounded bg-white/10" />
                </div>
                <div className="h-7 w-2/3 rounded bg-white/10" />
                <div className="flex gap-3">
                  <div className="h-5 w-24 rounded-full bg-white/5" />
                  <div className="h-5 w-24 rounded-full bg-white/5" />
                  <div className="h-5 w-28 rounded-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State (Default message when no jobs in DB) */}
        {!loading && jobs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-[#121218]/60 p-10 sm:p-14 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-2xl text-signal">
              📋
            </div>
            <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-white">
              Current openings will be posted here
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-white/60 leading-relaxed">
              Our active roles are updated periodically. If you are passionate about contributing to our academy, send your resume to our career email below.
            </p>
          </div>
        )}

        {/* Active Openings Board */}
        {!loading && jobs.length > 0 && (
          <div className="space-y-6">
            {/* Top Filter & Search Controls */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-white/10 bg-[#121218]/80 p-4 sm:p-5 backdrop-blur-md">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles by title, keyword, or skills..."
                  className="w-full rounded-xl border border-white/15 bg-black/40 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-white/40 outline-none transition focus:border-signal"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Department & Location Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Department Dropdown / Badges */}
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white/90 outline-none focus:border-signal"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-[#121218] text-white">
                      {dept === 'All' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>

                {/* Location Dropdown */}
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-white/90 outline-none focus:border-signal"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#121218] text-white">
                      {loc === 'All' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>

                {/* Counter Pill */}
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-[0.7rem] font-bold text-signal">
                  <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'Opening' : 'Openings'}
                </span>
              </div>
            </div>

            {/* No matching search results */}
            {filteredJobs.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#121218]/40 p-10 text-center">
                <p className="text-sm font-semibold text-white/70">No open positions matching your filters.</p>
                <button
                  onClick={() => {
                    setSearch('')
                    setSelectedDept('All')
                    setSelectedLocation('All')
                  }}
                  className="mt-3 text-xs font-bold text-signal underline hover:opacity-80"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Job Openings Grid */}
            <div className="grid gap-4 sm:gap-5">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  id={job.id}
                  className="group relative rounded-2xl border border-white/10 bg-[#121218] p-6 sm:p-7 transition-all duration-200 hover:border-signal/40 hover:bg-[#15151e] shadow-lg"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2 flex-1">
                      {/* Department & Featured Badge */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-white/80">
                          {job.department}
                        </span>
                        {job.isFeatured && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal/15 px-2.5 py-0.5 text-[0.68rem] font-extrabold uppercase tracking-wider text-signal shadow-xs">
                            ★ Featured Role
                          </span>
                        )}
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.68rem] font-medium text-white/50">
                          {job.workplaceType}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => openJobModal(job)}
                        className="cursor-pointer font-display text-xl sm:text-2xl font-extrabold text-white transition-colors group-hover:text-signal"
                      >
                        {job.title}
                      </h3>

                      {/* Meta Chips */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/65 pt-0.5">
                        <span className="flex items-center gap-1.5">
                          <span className="text-signal/90">📍</span>
                          <span>{job.location}</span>
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-1.5">
                          <span>⏱️</span>
                          <span>{job.employmentType}</span>
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-1.5">
                          <span>📈</span>
                          <span>{job.experienceLevel}</span>
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-1.5 font-semibold text-white/90">
                          <span>💰</span>
                          <span>{formatSalary(job)}</span>
                        </span>
                      </div>

                      {/* Brief Overview */}
                      {job.overview && (
                        <p className="mt-2 text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                          {job.overview}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => openJobModal(job)}
                        className="btn-brand shimmer-button flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink shadow-md transition-transform hover:scale-102"
                      >
                        <span>View & Apply</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General Application Banner */}
        <div className="mt-12 rounded-2xl border border-signal/40 bg-gradient-to-r from-signal/15 via-[#16161f] to-signal/10 p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                General Applications
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
                Don't see your specific role?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                Whether your expertise lies in financial trading instruction, quantitative analysis, student counseling, marketing, or platform engineering, we always welcome passionate talent. Send us your CV directly.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={`mailto:${careersMail}?subject=General%20Application%20-%20Theorem%20Academy`}
                className="btn-brand shimmer-button inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink shadow-lg"
              >
                <span>✉️</span>
                <span>Email Resume: {careersMail}</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================================= */}
      {/* JOB DETAIL & APPLICATION MODAL                                            */}
      {/* ========================================================================= */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={closeJobModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-3xl rounded-3xl border border-white/20 bg-[#101016] text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#14141d]">
              <div className="flex items-center gap-2">
                <span className="badge-signal text-[0.65rem] py-0.5 px-2 font-bold uppercase tracking-wider">
                  {selectedJob.department}
                </span>
                {selectedJob.isFeatured && (
                  <span className="text-xs text-signal font-bold">★ Featured</span>
                )}
              </div>
              <button
                onClick={closeJobModal}
                className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition"
                aria-label="Close modal"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7">
              {/* Job Title & Meta Strip */}
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedJob.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white/80">
                    📍 {selectedJob.location}
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white/80">
                    💼 {selectedJob.workplaceType}
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white/80">
                    ⏱️ {selectedJob.employmentType}
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white/80">
                    📈 {selectedJob.experienceLevel}
                  </span>
                  <span className="rounded-lg border border-signal/30 bg-signal/10 px-2.5 py-1 font-semibold text-signal">
                    💰 {formatSalary(selectedJob)}
                  </span>
                  {selectedJob.applicationDeadline && (
                    <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white/60">
                      📅 Deadline: {selectedJob.applicationDeadline}
                    </span>
                  )}
                </div>
              </div>

              {/* Role Overview */}
              {selectedJob.overview && (
                <div className="space-y-2">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-signal">
                    Role Overview
                  </h4>
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                    {selectedJob.overview}
                  </p>
                </div>
              )}

              {/* Key Responsibilities */}
              {selectedJob.responsibilities?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-signal">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-signal font-bold mt-0.5">✓</span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Candidate Requirements */}
              {selectedJob.requirements?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-signal">
                    Candidate Requirements & Qualifications
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-signal font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedJob.benefits?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-signal">
                    What We Offer & Benefits
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                    {selectedJob.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-signal font-bold mt-0.5">★</span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Application Form Box */}
              <div className="rounded-2xl border border-signal/40 bg-[#14141f] p-5 sm:p-6 shadow-xl">
                <h3 className="font-display text-lg font-bold text-white">
                  Apply for this position
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  Submit your application below. Our talent acquisition committee directly reviews every profile.
                </p>

                {submitSuccess ? (
                  <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-center">
                    <span className="text-2xl">✅</span>
                    <h4 className="mt-2 font-display text-base font-bold text-emerald-400">
                      Application Submitted Successfully
                    </h4>
                    <p className="mt-1 text-xs text-white/80">
                      Thank you for applying to Theorem Academy. We have received your credentials and will reach out if your profile matches our active requirements.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="mt-4 space-y-3.5">
                    {submitError && (
                      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                        {submitError}
                      </div>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-white/70 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Farhan Ahmed"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs sm:text-sm text-white outline-none focus:border-signal"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-white/70 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs sm:text-sm text-white outline-none focus:border-signal"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-white/70 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+971 50 123 4567"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs sm:text-sm text-white outline-none focus:border-signal"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-white/70 mb-1">
                          LinkedIn or Resume / Portfolio Link
                        </label>
                        <input
                          type="url"
                          value={applicantCv}
                          onChange={(e) => setApplicantCv(e.target.value)}
                          placeholder="https://linkedin.com/in/... or drive link"
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs sm:text-sm text-white outline-none focus:border-signal"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-white/70 mb-1">
                        Cover Note or Experience Summary (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={applicantMessage}
                        onChange={(e) => setApplicantMessage(e.target.value)}
                        placeholder="Briefly describe your relevant trading, teaching, or leadership experience..."
                        className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs sm:text-sm text-white outline-none focus:border-signal"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-brand shimmer-button rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-ink shadow-lg disabled:opacity-50"
                      >
                        {submitting ? 'Submitting Application...' : 'Submit Application'}
                      </button>

                      <a
                        href={`mailto:${selectedJob.hiringContactEmail || careersMail}?subject=Job%20Application%3A%20${encodeURIComponent(selectedJob.title)}%20-%20Theorem%20Academy`}
                        className="text-xs text-white/60 hover:text-signal text-center sm:text-right underline"
                      >
                        Or email your CV directly →
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <FinalCta
        title="Build your career with Theorem Academy."
        body="Join our campuses in India & the UAE, or collaborate with us remotely."
      />
    </>
  )
}
