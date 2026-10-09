import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FinalCta, PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import TradingTerminalVisual from '../components/TradingTerminalVisual'
import { freeEbooks, site } from '../config/site'


const ANALYSIS_TOOLS = [
  {
    id: 'orderflow',
    title: 'Order Flow & DOM (Depth of Market) Heatmaps',
    tag: 'Institutional Liquidity',
    icon: '🔥',
    desc: 'Inspect where commercial banks and market makers position passive limit orders on the orderbook. Study institutional auction dynamics and liquidity depth rather than guessing from candlestick patterns alone.',
    capabilities: [
      'Live visual liquidity depth heatmaps',
      'Iceberg order and resting limit detection',
      'Book replenishment and spoofing identification',
      'Direct integration with CME & top liquidity providers',
    ],
  },
  {
    id: 'footprint',
    title: 'Footprint & Volume Delta Charting Software',
    tag: 'Aggression Analysis',
    icon: '📈',
    desc: 'Inspect trades executing inside each individual candle. Footprint charts reveal whether market buyers or sellers were aggressive, identifying exhausted rallies and high-probability reversal points.',
    capabilities: [
      'Cumulative Volume Delta (CVD) divergence alerts',
      'Bid/Ask diagonal volume imbalance highlighting',
      'Unfinished business & auction market theory tracking',
      'Point of Control (POC) migration indicators',
    ],
  },
  {
    id: 'market-profile',
    title: 'Market Profile & Session Volume Distribution',
    tag: 'Structural Value',
    icon: '🏛️',
    desc: 'Understand market value versus market price. Session Volume Profiles plot where highest volume traded, highlighting Value Area High (VAH), Value Area Low (VAL), and institutional acceptance zones.',
    capabilities: [
      'Dynamic session and multi-day Volume Profiles',
      'High-volume nodes (support) & low-volume voids (targets)',
      'Multi-timeframe Session VWAP with standard deviation bands',
      'Daily open auction type classification (drive, test, reject)',
    ],
  },
  {
    id: 'macro-matrix',
    title: 'Macro Correlation & Currency Strength Matrix',
    tag: 'Global Context',
    icon: '🌐',
    desc: 'Cross-asset analytical dashboard mapping relationships between US Dollar Index (DXY), US 10Y Treasury yields, Brent crude, and benchmark equity futures to establish high-conviction daily market directional bias.',
    capabilities: [
      'Real-time central bank interest rate differential tracker',
      'Yield curve inversion & spread momentum metrics',
      'Risk-on vs. Risk-off multi-asset sentiment radar',
      'Economic calendar impact weighting & release flags',
    ],
  },
]

export default function Technology() {
  const { pathname } = useLocation()
  usePageTitle('Knowledge Toolkit & Trading Technology')

  const [downloadingBook, setDownloadingBook] = useState(null)
  const [downloadSuccess, setDownloadSuccess] = useState(null)
  const [emailInput, setEmailInput] = useState('')

  const handleDownloadSubmit = (e, book) => {
    e.preventDefault()
    if (!emailInput) return
    setDownloadSuccess(book.title)
    setDownloadingBook(null)
    setEmailInput('')
    setTimeout(() => setDownloadSuccess(null), 6000)
  }

  return (
    <>
      <PageHeader
        back={{ to: '/', label: 'Home' }}
        title="Knowledge Toolkit & Institutional Technology"
        intro="Explore institutional market analysis tools, order flow heatmaps, and downloadable trading e-books developed by Theorem Institute."
      />

      {/* Overview Highlights Strip */}
      <section className="border-b border-white/10 bg-[#0d0d12] py-8 text-white">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text">4 E-Books</div>
            <div className="mt-1 text-xs text-white/70">Free E-Books & Guides</div>
          </div>
          <div className="p-3">
            <div className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text">Tick-Level</div>
            <div className="mt-1 text-xs text-white/70">Order Flow & DOM Data</div>
          </div>
          <div className="p-3">
            <div className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text">1% Hard Stop</div>
            <div className="mt-1 text-xs text-white/70">Risk Control & Sizing Rules</div>
          </div>
          <div className="p-3">
            <div className="font-display text-2xl sm:text-3xl font-extrabold gold-foil-text">Multi-Screen</div>
            <div className="mt-1 text-xs text-white/70">Classroom Trading Desks</div>
          </div>
        </div>
      </section>

      {/* Free E-Books Section (Requirement 1) */}
      <Section
        id="ebooks"
        tight
        title="Free Institutional E-Books & Guides"
        intro="Download our comprehensive e-books on price action, order flow mechanics, crypto risk management, and global macro frameworks."
        className="bg-[#09090c] border-b border-white/10"
      >
        {downloadSuccess && (
          <div className="mb-8 rounded-2xl border border-signal/40 bg-signal/15 p-5 text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📥</span>
              <div>
                <h4 className="font-bold text-signal text-sm">Download link dispatched!</h4>
                <p className="text-xs text-white/80 mt-0.5">We sent <strong>{downloadSuccess}</strong> to your inbox. You can also view it instantly in your student resources.</p>
              </div>
            </div>
            <button
              onClick={() => setDownloadSuccess(null)}
              className="text-xs text-white/60 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {freeEbooks.map((book) => (
            <article
              key={book.id}
              className="card-hover-glow group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#14141c] text-white p-5 shadow-xl transition-all"
            >
              <div>
                {/* Book Header Thumbnail / Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/40">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141c] via-transparent to-transparent" />
                  <span className="badge-signal absolute top-2.5 left-2.5 text-[0.65rem] font-bold py-0.5 px-2">
                    {book.tag}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-black/70 px-2 py-0.5 text-[0.68rem] font-mono font-bold text-white/90 backdrop-blur-sm">
                    {book.pages}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-[0.7rem] font-semibold text-signal uppercase tracking-wider block">
                    {book.category}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-extrabold text-white group-hover:text-signal transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed line-clamp-3">
                    {book.summary}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3 text-[0.75rem] text-white/85">
                  {book.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-start gap-1.5">
                      <span className="text-signal font-bold shrink-0">✓</span>
                      <span className="truncate">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                {downloadingBook === book.id ? (
                  <form onSubmit={(e) => handleDownloadSubmit(e, book)} className="space-y-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="field w-full py-1.5 px-3 text-xs bg-black/60 border border-white/20 rounded-lg text-white"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="btn-brand flex-1 py-1.5 text-xs font-bold text-center"
                      >
                        Send PDF →
                      </button>
                      <button
                        type="button"
                        onClick={() => setDownloadingBook(null)}
                        className="btn-ghost py-1.5 px-2 text-xs text-white/60"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.7rem] text-white/50">
                      {book.downloads} downloads
                    </span>
                    <button
                      type="button"
                      onClick={() => setDownloadingBook(book.id)}
                      className="btn-brand py-2 px-3.5 text-xs font-bold shadow-sm inline-flex items-center gap-1.5"
                    >
                      <span>📥 Free Download</span>
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Interactive Pro Terminal Showcase */}
      <Section
        tight
        dark
        title="Interactive Trading Terminal"
        intro="Experience our live order block tracking, multi-asset execution brackets, and session telemetry."
      >
        <div className="max-w-4xl mx-auto">
          <TradingTerminalVisual />
        </div>
      </Section>

      {/* Market Analysis & Order Flow Software */}
      <Section
        id="analysis-software"
        tight
        title="Market Analysis & Order Flow Software"
        intro="Look beneath standard retail candlestick charts. Our analysis software exposes real-time institutional liquidity, volume delta aggression, and value areas."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {ANALYSIS_TOOLS.map((tool) => (
            <article
              key={tool.id}
              className="card-hover-glow p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#16161e] text-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="rounded bg-white/10 px-2.5 py-1 text-xs font-bold text-signal uppercase tracking-wider">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-white">
                  {tool.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                  {tool.desc}
                </p>

                <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">Analytical Features</h4>
                  <ul className="space-y-1.5 text-xs text-white/90">
                    {tool.capabilities.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <span className="text-signal font-bold">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Classroom Hardware Infrastructure */}
      <Section
        tight
        dark
        title="Classroom Hardware & Multi-Screen Labs"
        intro="How technology is deployed inside our Dubai Business Bay and India campus classrooms."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#121217] text-white">
            <span className="text-3xl block mb-3">🖥️</span>
            <h3 className="font-display text-xl font-bold text-white">Multi-Monitor Desks</h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
              Every student workstation features dedicated dual-panel high-refresh monitors configured for simultaneous macro oversight, DOM orderflow, and execution charts.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-[#121217] text-white">
            <span className="text-3xl block mb-3">⚡</span>
            <h3 className="font-display text-xl font-bold text-white">Low-Latency Feeds</h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
              Direct market data lines connected to major liquidity centers, ensuring orderbook depths update with zero lag during volatile London and New York session opens.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-[#121217] text-white">
            <span className="text-3xl block mb-3">🎙️</span>
            <h3 className="font-display text-xl font-bold text-white">Live Mentor Screen Broadcast</h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
              Lead mentors broadcast high-resolution live markups and executions to student monitors and interactive remote Zoom feeds simultaneously with crystal-clear audio.
            </p>
          </div>
        </div>
      </Section>

      {/* Closing Call to Action */}
      <FinalCta
        title="See our market analysis tools in action."
        body="Visit our Dubai campus in Business Bay, drop into our India lab, or book a live 1-on-1 Zoom walkthrough with an advisor."
      />
    </>
  )
}
