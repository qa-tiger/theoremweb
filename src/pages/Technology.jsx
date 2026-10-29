import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FinalCta, PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import Modal from '../components/Modal'
import {
  EBOOKS,
  EBOOK_CATEGORIES,
  getEbookDownloadUrl,
} from '../config/ebooks'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getSessionUser } from '../lib/api'
import { recordLead } from '../lib/leads'

export default function Technology() {
  usePageTitle('Free Trading E-Books & Knowledge Resources')

  const sessionUser = useMemo(() => getSessionUser(), [])
  const savedLead = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('academy-ebook-lead')) || {}
    } catch {
      return {}
    }
  }, [])

  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [downloadModalBook, setDownloadModalBook] = useState(null)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [leadForm, setLeadForm] = useState({
    name: sessionUser?.name || savedLead.name || '',
    email: sessionUser?.email || savedLead.email || '',
    phone: sessionUser?.phone || savedLead.phone || '',
  })

  // Filter books based on active category and search query
  const filteredBooks = useMemo(() => {
    return EBOOKS.filter((book) => {
      const matchesCategory =
        activeCategory === 'All' || book.category === activeCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.subtitle.toLowerCase().includes(query) ||
        book.desc.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const featuredBook = EBOOKS.find((b) => b.featured) || EBOOKS[0]

  function handleDownloadClick(book) {
    setDownloadModalBook(book)
    setDownloadSuccess(false)
    setErrorMsg('')
  }

  function triggerMockDownload(book) {
    // Generates a mock downloaded text/PDF placeholder to verify the download action works immediately
    const sampleContent = `Theorem Academy - E-Book Library\n\nTitle: ${book.title}\nSubtitle: ${book.subtitle}\nCategory: ${book.category}\nLevel: ${book.level}\n\nNotice: This e-book will be served directly from your Supabase storage bucket once configured in src/config/ebooks.js.\nFile name: ${book.fileName}\n`
    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = book.fileName.replace('.pdf', '-preview.txt')
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)
  }

  async function executeDownload(book) {
    const directUrl = getEbookDownloadUrl(book)
    if (!directUrl) {
      triggerMockDownload(book)
      return
    }

    try {
      // Fetch binary blob to force browser to save directly without previewing
      const response = await fetch(directUrl)
      if (!response.ok) throw new Error('Fetch failed')
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = blobUrl
      anchor.download = book.fileName
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000)
    } catch (err) {
      console.warn('Direct blob download fallback to attachment URL:', err)
      const anchor = document.createElement('a')
      anchor.href = directUrl
      anchor.download = book.fileName
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    }
  }

  async function handleLeadSubmit(e) {
    e.preventDefault()
    if (!leadForm.name.trim() || !leadForm.email.trim() || !leadForm.phone.trim()) {
      setErrorMsg('Please enter your Name, Email, and Phone number.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')

    try {
      // 1. Record lead into public.leads table (with deduplication on email/phone)
      await recordLead({
        name: leadForm.name.trim(),
        email: leadForm.email.trim(),
        phone: leadForm.phone.trim(),
        source: 'Free eBook Download',
        stage: 'New Inquiry',
        campus: 'Online',
        programId: downloadModalBook.id,
        programName: downloadModalBook.title,
        noteText: `Downloaded free eBook: ${downloadModalBook.title} (${downloadModalBook.format || 'PDF'}${downloadModalBook.pages ? `, ${downloadModalBook.pages}` : ''})`,
      })

      // Persist lead details for user convenience on future downloads
      try {
        localStorage.setItem('academy-ebook-lead', JSON.stringify(leadForm))
      } catch {
        // ignore
      }

      // 2. Start direct download
      await executeDownload(downloadModalBook)
      setDownloadSuccess(true)
    } catch (err) {
      console.warn('Error recording lead, starting download:', err)
      await executeDownload(downloadModalBook)
      setDownloadSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        back={{ to: '/', label: 'Home' }}
        title="Free E-Books & Study Resources"
        intro="Download our comprehensive workbooks, risk frameworks, and study guides. 100% free — no credit card or subscription required."
      />

      {/* Featured E-Book Hero Spotlight */}
      <Section tight className="bg-[#09090c] border-b border-white/10">
        <div className="rounded-3xl border border-signal/30 bg-gradient-to-br from-signal/15 via-[#121218] to-[#161622] p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-signal/10 blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Book Graphic / Cover Preview */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group/cover w-full max-w-[260px] aspect-[1/1.4] rounded-2xl bg-gradient-to-br from-[#1e1e28] to-[#0c0c12] border-2 border-white/20 p-5 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.03]">
                {/* Spine effect */}
                <div className="absolute left-0 inset-y-0 w-3 rounded-l-2xl bg-gradient-to-r from-white/30 to-transparent" />
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="badge-signal text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-2">
                      {featuredBook.badge}
                    </span>
                    {featuredBook.pages && (
                      <span className="text-xs font-mono text-white/60">{featuredBook.pages}</span>
                    )}
                  </div>
                  <div className="mt-6 text-3xl">{featuredBook.icon}</div>
                  <h3 className="mt-3 font-display text-xl font-extrabold text-white leading-tight">
                    {featuredBook.title}
                  </h3>
                  <p className="mt-1 text-xs text-signal font-medium">
                    {featuredBook.subtitle}
                  </p>
                </div>

                <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[0.7rem] text-white/60">
                  <span>Format: {featuredBook.format}</span>
                  <span className="font-semibold text-white/90">Free E-Book</span>
                </div>
              </div>
            </div>

            {/* Featured Book Info */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block size-2 rounded-full bg-signal animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-wider text-signal">Featured E-Book</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {featuredBook.title}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                {featuredBook.desc}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleDownloadClick(featuredBook)}
                  className="btn-brand py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl shadow-signal/10"
                >
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Free PDF</span>
                </button>
                <Link
                  to="/programs"
                  className="btn-ghost py-3 px-5 text-xs sm:text-sm font-semibold"
                >
                  Explore Related Courses →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Complete Free E-Book Library section hidden per user request */}

      {/* Closing Call to Action: Focus on Academy / Courses, NOT Software */}
      <FinalCta
        title="Ready to go beyond reading?"
        body="Explore structured courses and interactive learning sessions with our faculty, available online and in person."
      />

      {/* Download Lead Capture Modal */}
      {downloadModalBook && (
        <Modal
          open={!!downloadModalBook}
          onClose={() => { setDownloadModalBook(null); setDownloadSuccess(false); setErrorMsg('') }}
        >
          <div className="p-5 sm:p-6 text-white space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                {downloadSuccess ? 'Download Ready' : 'Download Free E-Book'}
              </h3>
              <button
                type="button"
                onClick={() => { setDownloadModalBook(null); setDownloadSuccess(false); setErrorMsg('') }}
                className="text-white/50 hover:text-white text-lg font-bold p-1 leading-none transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Selected Book Mini Card */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl p-2 rounded-lg bg-black/40 border border-white/10 shrink-0">
                {downloadModalBook.icon}
              </span>
              <div className="min-w-0 flex-1">
                <span className="badge-signal text-[0.65rem] font-bold uppercase py-0.5 px-2 inline-block">
                  {downloadModalBook.category}
                </span>
                <h4 className="mt-1 font-display text-sm sm:text-base font-bold text-white leading-tight truncate">
                  {downloadModalBook.title}
                </h4>
                <p className="text-xs text-white/60 mt-0.5">
                  {downloadModalBook.pages ? `${downloadModalBook.pages} • ` : ''}{downloadModalBook.format} • Instant Access
                </p>
              </div>
            </div>

            {/* State A: Download Success Confirmation */}
            {downloadSuccess ? (
              <div className="space-y-4 py-2">
                <div className="p-4 bg-bull/15 border border-bull/30 rounded-xl text-center space-y-1.5">
                  <div className="size-10 rounded-full bg-bull/20 text-bull font-bold text-xl mx-auto flex items-center justify-center mb-1">
                    ✓
                  </div>
                  <p className="text-sm font-bold text-white">Thank you, {leadForm.name}!</p>
                  <p className="text-xs text-bull font-medium">Your download has started automatically.</p>
                  <p className="text-[0.7rem] text-white/60 pt-1">
                    Please check your device's downloads folder.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => executeDownload(downloadModalBook)}
                    className="btn-ghost flex-1 py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Click here if download didn't start</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDownloadModalBook(null); setDownloadSuccess(false); setErrorMsg('') }}
                    className="btn-brand py-2.5 px-5 text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* State B: Lead Capture Form (Name, Email, Phone) */
              <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                <p className="text-xs text-white/75 leading-relaxed">
                  Enter your details below to unlock and download your free PDF immediately:
                </p>

                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="label text-xs font-bold text-white/90" htmlFor="lead-name">
                    Full Name <span className="text-signal">*</span>
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="field py-2 text-xs sm:text-sm mt-1"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label text-xs font-bold text-white/90" htmlFor="lead-email">
                    Email Address <span className="text-signal">*</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    className="field py-2 text-xs sm:text-sm mt-1"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label text-xs font-bold text-white/90" htmlFor="lead-phone">
                    Phone Number <span className="text-signal">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="Phone number"
                    className="field py-2 text-xs sm:text-sm mt-1"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 text-[0.72rem] text-white/75 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      defaultChecked
                      className="mt-0.5 size-3.5 rounded border-white/20 bg-black/40 text-signal focus:ring-signal"
                    />
                    <span className="leading-snug">
                      I consent to Theorem Academy processing my contact details under our{' '}
                      <Link to="/privacy" target="_blank" className="text-signal underline hover:text-white">
                        DPDP Act Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link to="/terms" target="_blank" className="text-signal underline hover:text-white">
                        User Agreement
                      </Link>{' '}
                      to deliver this study material.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-brand w-full py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{isSubmitting ? 'Starting Download…' : 'Submit & Download PDF'}</span>
                  </button>
                  <p className="text-[0.68rem] text-center text-white/45 mt-2">
                    🔒 DPDP Act (2023) compliant. Instant direct download. No credit card required.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
