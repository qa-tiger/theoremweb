/**
 * Free E-Books & Knowledge Resources Configuration
 * 
 * SUPABASE BUCKET INTEGRATION:
 * When your Supabase storage bucket is ready, set SUPABASE_EBOOKS_BUCKET_URL below.
 * Example:
 *   export const SUPABASE_EBOOKS_BUCKET_URL = 'https://xyzcompany.supabase.co/storage/v1/object/public/ebooks'
 * 
 * If left empty (''), clicking "Download" will open the download preview modal
 * with instant simulated access and clear guidance to configure the bucket.
 */

// Put your custom Supabase storage bucket public base URL here (optional):
// If empty, it will automatically use VITE_SUPABASE_URL + /storage/v1/object/public/ebooks
export const SUPABASE_EBOOKS_BUCKET_NAME = import.meta.env.VITE_SUPABASE_EBOOKS_BUCKET || 'ebooks'
export const SUPABASE_EBOOKS_BUCKET_URL = import.meta.env.VITE_SUPABASE_EBOOKS_BUCKET_URL || ''

/**
 * Returns the direct download URL for an e-book from the Supabase bucket.
 */
export function getEbookDownloadUrl(book) {
  if (book.directUrl) return book.directUrl
  if (SUPABASE_EBOOKS_BUCKET_URL && SUPABASE_EBOOKS_BUCKET_URL.trim().length > 0) {
    const base = SUPABASE_EBOOKS_BUCKET_URL.trim().replace(/\/+$/, '')
    return `${base}/${encodeURIComponent(book.fileName)}?download=`
  }
  const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL
  if (envSupabaseUrl && envSupabaseUrl.trim().length > 0 && !envSupabaseUrl.includes('YOUR_SUPABASE_URL')) {
    const base = envSupabaseUrl.trim().replace(/\/+$/, '')
    return `${base}/storage/v1/object/public/${SUPABASE_EBOOKS_BUCKET_NAME}/${encodeURIComponent(book.fileName)}?download=`
  }
  return null
}

export const EBOOK_CATEGORIES = [
  'All',
  'Forex',
  'Risk Management',
  'Crypto',
  'Price Action',
  'Trading Psychology',
  'Trade Journaling',
]

export const EBOOKS = [
  {
    id: 'fundamental-of-financial-markets',
    title: 'Fundamental of Financial Markets',
    subtitle: 'Essential concepts, basic terms, and market mechanics',
    category: 'Financial Markets',
    level: 'Beginner',
    pages: '',
    fileSize: '',
    format: 'PDF',
    fileName: 'Theorem Academy - Fundamentals of Financial Markets.pdf',
    badge: 'Popular Guide',
    featured: true,
    coverGradient: 'from-blue-600/40 via-cyan-500/20 to-blue-900/40',
    coverBorder: 'border-cyan-500/30',
    accentColor: '#38bdf8',
    icon: '📘',
    downloads: '14,200+',
    rating: '4.9/5',
    desc: 'An e-book for students to navigate through various basic terms and concepts that sharpen their understanding about markets. It breaks down fundamentals, price mechanics, and risk guidelines into clear, simple language so you can build confidence at your own pace.',
    highlights: [
      'Basic terminology and currency pair structures explained clearly',
      'Straightforward risk calculation and sensible position sizing rules',
      'Market hours, session overlaps, and volume activity rhythms',
      'Step-by-step checklist to avoid common beginner oversights',
    ],
  },
  {
    id: 'risk-allocation-framework',
    title: 'Risk Allocation & Capital Preservation',
    subtitle: 'Foundations of Capital Protection & Sensible Sizing',
    category: 'Risk Management',
    level: 'All Levels',
    pages: '42 Pages',
    fileSize: '3.6 MB',
    format: 'PDF',
    fileName: 'risk-allocation-capital-preservation.pdf',
    badge: 'Essential',
    featured: true,
    coverGradient: 'from-amber-600/40 via-yellow-500/20 to-amber-950/40',
    coverBorder: 'border-amber-500/30',
    accentColor: '#fbbf24',
    icon: '🛡️',
    downloads: '18,500+',
    rating: '5.0/5',
    desc: 'A practical guide designed to help students understand risk management and capital preservation. Learn about drawdown dynamics, position sizing, and the simple habits that keep your portfolio safe over time.',
    highlights: [
      'Core principles behind balanced portfolio risk guidelines',
      'Drawdown dynamics and understanding recovery math',
      'Healthy loss limits and personal cooldown protocols',
      'Monitoring correlated pairs and managing portfolio exposure',
    ],
  },
  {
    id: 'institutional-trade-journal',
    title: 'The Market Journal & Review Template',
    subtitle: 'Data Tracking, Observations & Assignment Reviews',
    category: 'Trade Journaling',
    level: 'All Levels',
    pages: '34 Pages',
    fileSize: '3.1 MB',
    format: 'PDF',
    fileName: 'trade-journal-and-review-template.pdf',
    badge: 'Study Tool',
    featured: false,
    coverGradient: 'from-emerald-600/40 via-teal-500/20 to-emerald-950/40',
    coverBorder: 'border-emerald-500/30',
    accentColor: '#34d399',
    icon: '📊',
    downloads: '11,800+',
    rating: '4.9/5',
    desc: 'A structured workbook to help you journal market observations and review assignments. Helps you reflect on your decision-making objectively and track your learning progress week over week.',
    highlights: [
      'Clean spreadsheet layouts for logging observations and setups',
      'Categories to tag emotional triggers and execution errors',
      'Pre-market preparation checklist and post-market review sheets',
      'Weekly audit summaries to track conceptual understanding',
    ],
  },
  {
    id: 'price-action-market-structure',
    title: 'Price Action & Market Structure',
    subtitle: 'Understanding Structure, Trends & Key Price Levels',
    category: 'Price Action',
    level: 'Intermediate',
    pages: '64 Pages',
    fileSize: '7.4 MB',
    format: 'PDF',
    fileName: 'price-action-institutional-market-structure.pdf',
    badge: 'Foundations',
    featured: false,
    coverGradient: 'from-purple-600/40 via-indigo-500/20 to-purple-950/40',
    coverBorder: 'border-purple-500/30',
    accentColor: '#c084fc',
    icon: '📈',
    downloads: '16,900+',
    rating: '4.95/5',
    desc: 'A clear, concept-focused introduction to reading charts and understanding price behaviour across different timeframes without relying on confusing indicators.',
    highlights: [
      'Identifying major structural highs, lows, and shifts in direction',
      'Recognizing price imbalances and liquidity areas on clean charts',
      'Equilibrium concepts: understanding premium vs discount pricing',
      'Top-down timeframe alignment from Daily to lower intervals',
    ],
  },
  {
    id: 'crypto-safety-handbook',
    title: 'Crypto Security & Self-Custody Handbook',
    subtitle: 'Practical Steps to Keep Your Digital Assets Secure',
    category: 'Crypto',
    level: 'All Levels',
    pages: '38 Pages',
    fileSize: '3.9 MB',
    format: 'PDF',
    fileName: 'crypto-security-self-custody-handbook.pdf',
    badge: 'Security Guide',
    featured: false,
    coverGradient: 'from-rose-600/40 via-pink-500/20 to-rose-950/40',
    coverBorder: 'border-rose-500/30',
    accentColor: '#fb7185',
    icon: '🔐',
    downloads: '9,400+',
    rating: '4.85/5',
    desc: 'A straightforward safety reference covering wallet security, private key backups, and how to steer clear of common online risks and vulnerabilities.',
    highlights: [
      'Simple steps for setting up hardware wallets and cold storage',
      'Safe practices for recording and storing seed phrases',
      'Reviewing permissions and token approvals safely',
      'Recognizing prevalent phishing scams and social engineering traps',
    ],
  },
  {
    id: 'trader-psychology-handbook',
    title: 'Market Psychology & Discipline',
    subtitle: 'Patience, Focus & Developing a Clear Mindset',
    category: 'Trading Psychology',
    level: 'All Levels',
    pages: '52 Pages',
    fileSize: '4.5 MB',
    format: 'PDF',
    fileName: 'trading-psychology-and-floor-discipline.pdf',
    badge: 'Mindset',
    featured: false,
    coverGradient: 'from-sky-600/40 via-slate-500/20 to-slate-900/40',
    coverBorder: 'border-slate-500/30',
    accentColor: '#94a3b8',
    icon: '🧠',
    downloads: '13,100+',
    rating: '4.9/5',
    desc: 'Explores the psychological side of market participation. Covers how to maintain discipline, stay patient during fast market changes, and approach learning with a calm, methodical mindset.',
    highlights: [
      'Recognizing the impulses behind FOMO and reactive decisions',
      'Identifying cognitive biases that interfere with objective analysis',
      'Constructive routines to reset your focus after difficult sessions',
      'Cultivating a patient, process-focused approach to study',
    ],
  },
]

