// All academy content lives here — edit this file to change names, addresses, programs and details.

export const site = {
  name: 'Theorem Institute',
  description: 'Premier financial trading educational institute with campuses in Dubai (Business Bay) and India, plus live interactive global cohorts.',
  email: 'admissions@theoreminstitute.com',
  phone: '+971 4 240 8899',
  whatsapp: '+971 58 500 8921',
  whatsappLink: 'https://wa.me/971585008921',
  googleReviewUrl: 'https://www.google.com/search?q=theorem+institute+reviews', // Direct Google Reviews link
  social: [
    { label: 'Instagram', href: 'https://instagram.com', handle: '@theoreminstitute' },
    { label: 'YouTube', href: 'https://youtube.com', handle: 'Theorem Trading Institute' },
    { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'Theorem Institute' },
    { label: 'X (Twitter)', href: 'https://twitter.com', handle: '@theoreminst' },
    { label: 'WhatsApp', href: 'https://wa.me/971585008921', handle: '+971 58 500 8921' },
    { label: 'Telegram', href: 'https://t.me/theoreminstitute', handle: 'Theorem Official Hub' },
  ],
}

export const locations = [
  {
    city: 'India',
    country: 'India',
    flag: '🇮🇳',
    address: 'Financial Hub Trading Floor, Metro BKC',
    hours: 'Monday to Saturday, 10:00 to 19:00 IST',
    mode: 'Physical Trading Lab',
  },
  {
    city: 'Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    address: 'Executive Tower, Business Bay, Dubai',
    hours: 'Saturday to Thursday, 10:00 to 19:00 GST',
    mode: 'Physical Flagship Campus',
  },
  {
    city: 'Online',
    country: 'Global',
    flag: '🌐',
    address: 'Live interactive classrooms on Zoom + 24/7 Portal recordings',
    hours: 'Weekday evening and weekend cohorts (GST / IST)',
    mode: 'Interactive Live Classrooms',
  },
]

export const teachers = [
  {
    name: 'Farhan',
    role: 'Lead Mentor, Forex & Order Flow',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    teaches: ['Forex Basic', 'Forex Intermediate', 'Forex Advanced'],
    focus: 'Price action, institutional market structure, liquidity sweeps and risk rules',
    bio: 'Farhan leads the Forex division. With over 9 years on institutional trading desks, his classes start from a blank chart and end with a concrete, backtested playbook. He personally reviews every student assignment.',
    initials: 'F',
  },
  {
    name: 'Sohail',
    role: 'Lead Mentor, Crypto & Derivatives',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    teaches: ['Crypto Basic', 'Crypto Intermediate', 'Crypto Advanced'],
    focus: 'On-chain metrics, perpetual futures, funding rates, and self-custody risk management',
    bio: 'Sohail leads the crypto trading laboratory. He focuses heavily on capital preservation, exchange counterparty safety, and systematic cyclical entries during major market rotations.',
    initials: 'S',
  },
  {
    name: 'Vikram',
    role: 'Lead Mentor, Global & Indian Equities',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    teaches: ['Equity Basic', 'Equity Intermediate', 'Equity Advanced'],
    focus: 'NSE/BSE & US Equities, institutional order flow, swing breakout models, and sector rotation',
    bio: 'Vikram brings 12 years of proprietary equity desk experience. He coaches students in reading corporate fundamentals, executing precision swing setups, and navigating high-volatility earning cycles.',
    initials: 'V',
  },
]

// Structured Programs categorized by Market (Forex, Crypto, Equity) and Level (Basic, Intermediate, Advanced)
export const programs = [
  // --- FOREX TRACK ---
  {
    id: 'forex-basic',
    marketId: 'forex',
    market: 'Forex',
    level: 'Basic',
    title: 'Forex Basic',
    subtitle: 'Market Foundations & Execution Mechanics',
    audience: 'Beginners and learners seeking a structured, academic foundation in currency mechanics, order execution, and disciplined risk management.',
    duration: '4 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: true,
    summary: 'Currency pairs, pip calculations, lot sizing, and broker mechanics. Learn to read clean candlestick charts and analyze market structure with strict 1% risk limits.',
    outcomes: [
      'Currency pairs, spreads, leverage & sessions',
      'Candlestick structure, support & resistance',
      'Exact position sizing & stop loss calculation',
      'Building your first written personal trading checklist',
    ],
  },
  {
    id: 'forex-intermediate',
    marketId: 'forex',
    market: 'Forex',
    level: 'Intermediate',
    title: 'Forex Intermediate',
    subtitle: 'Price Action & Multi-Timeframe Strategy',
    audience: 'Traders who understand chart basics and want to build a repeatable, rule-based analytical framework using market structure, trend channels, and supply/demand zones.',
    duration: '6 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: false,
    summary: 'Master swing highs/lows, break of structure (BOS), change of character (CHoCH), and top-down multi-timeframe analysis from Daily to 15m/5m.',
    outcomes: [
      'Market structure identification & trend shifts',
      'Supply and demand zone validation',
      'Top-down timeframe alignment (Daily → 4H → 15m)',
      'Assignment submissions and weekly statistical reviews',
    ],
  },
  {
    id: 'forex-advanced',
    marketId: 'forex',
    market: 'Forex',
    level: 'Advanced',
    title: 'Forex Advanced',
    subtitle: 'Institutional Liquidity & Advanced Execution Analysis',
    audience: 'Experienced market students aiming to master institutional order flow analysis, liquidity structures, and disciplined risk management protocols.',
    duration: '8 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: true,
    summary: 'Deep-dive into institutional liquidity sweeps, fair value gaps (FVG), order blocks, session timing, and systematic drawdown management.',
    outcomes: [
      'Institutional order blocks & liquidity sweeps',
      'Fair value gaps & premium/discount pricing',
      'Strict portfolio drawdown limits & disciplined psychology',
      'Classroom lab case studies with senior mentor reviews',
    ],
  },

  // --- CRYPTO TRACK ---
  {
    id: 'crypto-basic',
    marketId: 'crypto',
    market: 'Crypto',
    level: 'Basic',
    title: 'Crypto Basic',
    subtitle: 'Blockchain Essentials & Spot Investing',
    audience: 'First-time crypto investors and beginners who want to buy, store, and trade Bitcoin and altcoins safely without falling for scams.',
    duration: '4 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: false,
    summary: 'Hardware wallets, private keys, exchange security, spot order types, and understanding Bitcoin market cycles and Bitcoin dominance.',
    outcomes: [
      'Hardware wallets, cold storage & seed phrase security',
      'Centralized vs decentralized exchange execution',
      'Bitcoin halving cycles & macroeconomic drivers',
      'Avoiding rug-pulls, phishing, and scam tokens',
    ],
  },
  {
    id: 'crypto-intermediate',
    marketId: 'crypto',
    market: 'Crypto',
    level: 'Intermediate',
    title: 'Crypto Intermediate',
    subtitle: 'Perpetual Futures & Technical Setups',
    audience: 'Traders looking to trade cryptocurrency derivatives, perpetual contracts, funding rates, and high-momentum breakouts with strict risk control.',
    duration: '6 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: true,
    summary: 'Perpetual swaps, long/short mechanics, cross vs isolated margin, funding rate arbitrage, and navigating high-volatility altcoin momentum.',
    outcomes: [
      'Perpetuals, leverage calculation & liquidation mechanics',
      'Funding rates, open interest & volume divergence',
      'Altcoin momentum breakout screening models',
      'DeFi liquidity protocols & decentralized derivatives',
    ],
  },
  {
    id: 'crypto-advanced',
    marketId: 'crypto',
    market: 'Crypto',
    level: 'Advanced',
    title: 'Crypto Advanced',
    subtitle: 'On-Chain Analytics & Institutional Order Flow',
    audience: 'Dedicated crypto traders seeking order flow tools, whale tracking, on-chain glassnode metrics, and institutional market maker positioning.',
    duration: '8 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: false,
    summary: 'Track smart money wallets, exchange net flows, miner reserves, liquidation heatmaps, and master volatility breakout strategies.',
    outcomes: [
      'Whale wallet tracking & exchange inflow/outflow alerts',
      'Liquidation heatmaps & aggressive delta imbalances',
      'Institutional crypto risk rules and position sizing models',
      'Portfolio hedging using options and inverse perpetuals',
    ],
  },

  // --- EQUITY TRACK ---
  {
    id: 'equity-basic',
    marketId: 'equity',
    market: 'Equity',
    level: 'Basic',
    title: 'Equity Basic',
    subtitle: 'Stock Market & Demat Foundations',
    audience: 'Beginners and working professionals wanting to trade or invest in Indian (NSE/BSE) and US markets with structured analysis.',
    duration: '4 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: false,
    summary: 'Stock exchanges, Demat accounts, reading financial statements, understanding P/E ratios, and building a disciplined long-term watchlist.',
    outcomes: [
      'NSE/BSE and US market structure & order routing',
      'Reading balance sheets, income statements & quarterly results',
      'Demat setup, index funds & blue-chip stock selection',
      'Portfolio risk allocation and diversification rules',
    ],
  },
  {
    id: 'equity-intermediate',
    marketId: 'equity',
    market: 'Equity',
    level: 'Intermediate',
    title: 'Equity Intermediate',
    subtitle: 'Swing Trading & Technical Breakouts',
    audience: 'Stock investors looking to capture multi-week price trends, chart patterns, moving average crossovers, and sector rotations.',
    duration: '6 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: true,
    summary: 'Stage analysis, volume-weighted average price (VWAP), institutional accumulation zones, sector momentum, and high-probability swing setups.',
    outcomes: [
      'Stan Weinstein stage analysis & base breakout models',
      'Volume Price Analysis (VPA) & institutional accumulation',
      'Scanning for top relative strength leaders across sectors',
      'Position sizing for overnight risk & stop-loss rules',
    ],
  },
  {
    id: 'equity-advanced',
    marketId: 'equity',
    market: 'Equity',
    level: 'Advanced',
    title: 'Equity Advanced',
    subtitle: 'Institutional Derivatives & Options Hedging',
    audience: 'Active traders looking to master Index Options (Nifty/Bank Nifty / SPX), institutional Greeks, hedging strategies, and order flow DOM.',
    duration: '8 weeks',
    format: 'In Person (Dubai / India) or Live Online',
    featured: false,
    summary: 'Options strategies (Straddles, Strangles, Iron Condors), open interest (OI) analysis, Option Greeks (Delta, Theta, Gamma), and institutional hedging.',
    outcomes: [
      'Option Greeks & implied volatility (IV) crush strategies',
      'Open Interest (OI) analysis & PCR market positioning',
      'Directional and non-directional options selling & buying',
      'Hedging equity portfolios against severe market corrections',
    ],
  },
]

// Course Navigation Grouping helper
export const courseCategories = [
  {
    id: 'forex',
    name: 'Forex',
    tagline: 'Global Currency Markets',
    icon: '💱',
    items: [
      { id: 'forex-basic', title: 'Forex Basic', level: 'Basic', duration: '4 Weeks', desc: 'Market mechanics, pip sizing & 1% risk rules' },
      { id: 'forex-intermediate', title: 'Forex Intermediate', level: 'Intermediate', duration: '6 Weeks', desc: 'Price action, market structure & multi-timeframe analysis' },
      { id: 'forex-advanced', title: 'Forex Advanced', level: 'Advanced', duration: '8 Weeks', desc: 'Institutional liquidity, order blocks & prop-firm prep' },
    ],
  },
  {
    id: 'crypto',
    name: 'Crypto',
    tagline: 'Digital Assets & Derivatives',
    icon: '⚡',
    items: [
      { id: 'crypto-basic', title: 'Crypto Basic', level: 'Basic', duration: '4 Weeks', desc: 'Cold storage, spot execution & Bitcoin cycles' },
      { id: 'crypto-intermediate', title: 'Crypto Intermediate', level: 'Intermediate', duration: '6 Weeks', desc: 'Perpetual futures, funding rates & leverage management' },
      { id: 'crypto-advanced', title: 'Crypto Advanced', level: 'Advanced', duration: '8 Weeks', desc: 'On-chain analytics, whale tracking & volatility models' },
    ],
  },
  {
    id: 'equity',
    name: 'Equity',
    tagline: 'Indian (NSE/BSE) & US Stocks',
    icon: '📈',
    items: [
      { id: 'equity-basic', title: 'Equity Basic', level: 'Basic', duration: '4 Weeks', desc: 'Stock market fundamentals, Demat setup & valuation' },
      { id: 'equity-intermediate', title: 'Equity Intermediate', level: 'Intermediate', duration: '6 Weeks', desc: 'Swing breakouts, volume price analysis & sector rotation' },
      { id: 'equity-advanced', title: 'Equity Advanced', level: 'Advanced', duration: '8 Weeks', desc: 'Options Greeks, hedging, open interest & institutional derivatives' },
    ],
  },
]

// Promotional All-Access Pass Banner (Requirement 1: "Learn all programs and save 40%")
export const bundlePackage = {
  id: 'all-access-pass',
  title: 'All-Access 3-Market Institutional Pass',
  bannerHeadline: 'Learn All Programs and Save 40%',
  bannerSubtext: 'Enroll in complete multi-asset trading education covering Forex, Crypto, and Equities across Basic, Intermediate, and Advanced tracks with dedicated 1-on-1 mentorship.',
  discountPercent: 40,
  features: [
    'Complete access to all 9 Forex, Crypto & Equity curriculums',
    'Personal 1-on-1 weekly assignment reviews with senior mentors',
    'Classroom desk access in Dubai Business Bay & India labs',
    'Lifetime student portal access with all session recordings',
    'Institutional risk sizing model and volume DOM toolkit included',
    'Official Certificates of Graduation across all 3 disciplines',
  ],
}

// Free E-books for the Knowledge Toolkit
export const freeEbooks = [
  {
    id: 'price-action-guide',
    title: 'The Institutional Price Action Guide',
    category: 'Forex & Equities',
    tag: 'Institutional Guide',
    pages: '48 Pages',
    downloads: '14,200+',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    summary: 'A comprehensive visual guide to identifying institutional liquidity sweeps, breaks of structure (BOS), and premium/discount pricing on clean charts without lagging indicators.',
    highlights: [
      'Decoding bank liquidity pools & stop hunts',
      'The 3-stage Fair Value Gap (FVG) confirmation model',
      'Multi-timeframe top-down alignment blueprint',
    ],
  },
  {
    id: 'orderflow-secrets',
    title: 'Order Flow & DOM Footprint Secrets',
    category: 'Advanced Analysis',
    tag: 'Order Flow Manual',
    pages: '56 Pages',
    downloads: '9,800+',
    coverImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
    summary: 'Understand how market makers fill orders behind the scenes. Learn to read Cumulative Volume Delta (CVD), Depth of Market (DOM) heatmaps, and absorption patterns.',
    highlights: [
      'Reading iceberg orders and resting bids/asks',
      'Cumulative volume delta divergence trade setups',
      'Session Volume Profile (VAH/VAL) distribution tactics',
    ],
  },
  {
    id: 'crypto-risk-playbook',
    title: 'Crypto Market Cycles & Capital Protection Playbook',
    category: 'Crypto Trading',
    tag: 'Risk Strategy',
    pages: '42 Pages',
    downloads: '11,400+',
    coverImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
    summary: 'Navigate high-volatility crypto bull and bear cycles safely. Covers cold-storage security, funding rate mechanics, liquidation risk management, and on-chain metrics.',
    highlights: [
      'Surviving liquidation cascades on perpetual futures',
      'On-chain whale accumulation & exchange netflow indicators',
      'The strict 1% risk allocation rule for altcoins',
    ],
  },
  {
    id: 'equity-swing-blueprint',
    title: 'Indian & Global Equity Swing Trading Blueprint',
    category: 'Stock Markets',
    tag: 'Swing Strategy',
    pages: '52 Pages',
    downloads: '8,600+',
    coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    summary: 'A disciplined framework for identifying high-momentum stock breakouts in Indian (NSE/BSE) and US markets using Volume Price Analysis (VPA) and Stage Analysis.',
    highlights: [
      'Stan Weinstein Stage 2 breakout screener criteria',
      'Relative Strength (RS) versus index benchmarking',
      'Managing overnight gaps and earnings volatility',
    ],
  },
]

// Authentic Student Testimonials
export const stories = [
  {
    name: 'Hamdan Al-Maktoum',
    location: 'Dubai, UAE',
    program: 'Forex Advanced, Business Bay Cohort',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    highlight: 'Mastered Institutional Liquidity & 1% Risk Rule',
    quote: 'Before Theorem, my approach lacked consistency and structure. Farhan sat down with me, audited my assignment journal, and taught me systematic risk management and market structure. The weekly chart assignment reviews transformed my execution discipline.',
    verified: 'Verified Alumni • Dubai Floor',
  },
  {
    name: 'Rahul Sharma',
    location: 'Mumbai, India',
    program: 'Equity Intermediate & Advanced, India Lab',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    highlight: 'Systematic 1:3 Risk-to-Reward Structure',
    quote: 'The classroom environment in India is unmatched. Having an experienced instructor review your technical analysis assignments and journal before market sessions gives you structured learning you cannot get from passive videos.',
    verified: 'Verified Alumni • India Campus',
  },
  {
    name: 'Sarah Jenkins',
    location: 'London / Live Online',
    program: 'Crypto Derivatives, Global Online Batch',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    highlight: 'Mastered Perpetual Futures Mechanics & Cold Storage',
    quote: 'The crypto risk and liquidation mechanics classes were essential. Sohail demonstrated how leverage imbalances impact market depth. The live interactive sessions and structured portal recordings made learning seamless.',
    verified: 'Verified Alumni • Online Global',
  },
  {
    name: 'Ananya Deshmukh',
    location: 'Bangalore, India',
    program: 'Forex Basic & Intermediate',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    highlight: 'Structured Learning to Independent Written Plan',
    quote: 'I had zero financial background. Theorem’s step-by-step curriculum started from basic mechanics all the way to multi-timeframe analysis. The mentor assignment reviews helped me stop guessing and build a methodical framework.',
    verified: 'Verified Alumni • India Campus',
  },
  {
    name: 'Zayd Al-Mansoor',
    location: 'Abu Dhabi, UAE',
    program: 'All-Access Multi-Asset Pass',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    highlight: 'Multi-Asset Analysis: Forex & Equities',
    quote: 'The 40% bundle pass allowed me to study both global FX mechanics and equity market structure. Having access to the Business Bay physical classroom lab and institutional order flow DOM demonstrations is invaluable.',
    verified: 'Verified Alumni • Dubai Floor',
  },
  {
    name: 'Vikramaditya Rao',
    location: 'Delhi NCR, India',
    program: 'Equity Advanced Options & Hedging',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    highlight: 'Options Greeks & Systematic Hedging Framework',
    quote: 'The options hedging and volatility modules completely structured how I evaluate market risk. The knowledge check after every module ensures you thoroughly grasp the academic concepts before practical exercises.',
    verified: 'Verified Alumni • India Lab',
  },
]

export const offer = {
  includes: [
    'Live classes with your mentor in Dubai, India, or interactive online',
    'Recordings of every class preserved in your private student portal',
    'Personal mentor review of every assignment you log in your journal',
    'Institutional risk calculator and market scanning tools access',
    'Module quizzes, practical exams, and official Certificate of Graduation',
    'Ongoing mentor trade support on WhatsApp for the duration of the program',
  ],
  refundDays: 7,
  refundTerms: 'Full refund guarantee if you cancel within 7 days of enrolling and before attending more than two classes.',
}

export const faqs = [
  ['Do I need any trading experience?', 'No. Our Basic programs in Forex, Crypto, and Equity start from complete zero: how markets function, order execution, and how to size positions safely. If you already have experience, our advisors will recommend an Intermediate or Advanced track.'],
  ['How do I get pricing details and cohort dates?', 'Click "Contact Us" or message our admissions desk on WhatsApp. We provide customized cohort schedules, fee structures, and scholarship options for Dubai, India, and live online batches.'],
  ['What is the "Learn all programs and save 40%" offer?', 'Our All-Access Institutional Pass combines all 3 asset classes (Forex, Crypto, Equity) into a unified curriculum at a 40% promotional fee waiver, including 1-on-1 private assignment review mentorship and physical trading floor access.'],
  ['What if I miss a live class?', 'Every session is recorded in high definition and automatically uploaded to your private student portal within 24 hours. You can review the material and ask questions during the next session or on WhatsApp.'],
  ['Are the certificates verified?', 'Yes. Upon passing all module quizzes and defending your personalized written trading plan before your lead mentor, you receive an official verified Certificate of Graduation.'],
  ['Can I visit the physical campus before enrolling?', 'Yes. You are welcome to visit our physical trading floors in Business Bay (Dubai) or our India campus to tour the multi-monitor workstations and meet the faculty.'],
]

export const formatINR = (n) => (typeof n === 'number' && !isNaN(n) ? '₹' + n.toLocaleString('en-IN') : (n ? '₹' + n : 'Admissions Open'))
export const formatAED = (n) => (typeof n === 'number' && !isNaN(n) ? 'AED ' + n.toLocaleString('en-AE') : (n ? 'AED ' + n : 'Admissions Open'))
