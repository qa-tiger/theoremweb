// All academy content lives here — edit this file to change names, addresses, programs and prices.
// Anything marked "placeholder" must be replaced with real information before launch.

export const site = {
  name: 'Theorem Academy',
  description: 'Premier financial education academy with in-person training floors and live interactive global cohorts.',
  email: 'admissions@theoreminstitute.com',
  phone: '+971 4 240 8899',
  whatsapp: '+971 58 500 8921',
  whatsappLink: 'https://wa.me/971585008921',
  social: [
    { label: 'Instagram', href: '#' }, // placeholder links
    { label: 'YouTube', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
}

export const locations = [
  {
    id: 'training-floor-1',
    label: 'Training Floor (UAE)',
    address: 'Sharjah Media city, Sharjah UAE',
    hours: 'Saturday to Thursday, 10:00 to 19:00 GST',
  },
  {
    id: 'training-floor-2',
    label: 'Training Floor (India)',
    address: '3rd Floor, Ambika Niwas, behind Tungareshwar Sweets, Gurunanak nagar, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202',
    hours: 'Monday to Saturday, 10:00 to 19:00',
  },
  {
    id: 'online',
    label: 'Online Campus',
    address: 'Live interactive classes on Zoom with dedicated mentors',
    hours: 'Weekday evening and weekend batches',
  },
]

// photo: path under /public, e.g. '/mentors/farhan.jpg'. Until then a captioned placeholder is shown.
export const teachers = [
  {
    id: 'farhan',
    name: 'Farhan',
    role: 'Lead Mentor, Forex',
    photo: null,
    teaches: ['Forex Basic', 'Forex Intermediate', 'Forex Advanced'],
    focus: 'Price action, market structure and risk management',
    bio: 'Farhan leads the forex programs. His classes start from a blank chart and end with a written plan, and he reviews the assignments every student logs during the course.',
    initials: 'F',
  },
  {
    id: 'sohail',
    name: 'Sohail Ahmed',
    role: 'Mentor at Theorem',
    photo: '/mentors/sohail.jpg',
    teaches: ['Crypto Basic', 'Crypto Intermediate', 'Crypto Advanced', 'Equity Basic', 'Equity Intermediate', 'Equity Advanced', 'Indices Basic', 'Indices Intermediate', 'Indices Advanced', 'Commodity Basic', 'Commodity Intermediate', 'Commodity Advanced'],
    focus: 'Cryptocurrency, blockchain technology, digital assets safety, equity & commodities markets',
    bio: 'Sohail brings over two decades of financial sector and banking training experience, including nearly a decade as a Training Specialist at Mashreq Bank alongside credentials from Princeton University and IG Academy. He mentors students across digital assets and equities with a focus on risk discipline, capital protection, and practical market understanding.',
    initials: 'SA',
  },
]

// price is in INR; priceAed is shown when a student pays in AED.
// Each market (Forex, Crypto, Equity, Indices, Commodities) runs as three tiers: Basic, Intermediate, Advanced.
// comingSoon programs have no published syllabus or price yet — their detail page shows a
// "curriculum being finalised" notice instead of a module list, and no fee is shown anywhere.
export const programs = [
  {
    id: 'forex-basic',
    audience: 'People who have never traded, or who want to understand the markets with a structured foundation. No prior knowledge needed.', // placeholder copy: confirm with the academy
    title: 'Forex Basic',
    market: 'Forex',
    level: 'Basic',
    duration: '6 weeks',
    format: 'In person or online',
    price: 24999,
    priceAed: 1099,
    featured: true,
    summary: 'Introduction to currency pairs, chart reading, candlestick anatomy, and disciplined risk management.',
    outcomes: ['Introduction to forex & how currency pairs work', 'Chart reading & candlestick anatomy (Open, High, Low, Close)', 'Identifying trends, support & resistance levels', 'Position sizing, stop losses & capital protection rules'],
  },
  {
    id: 'forex-intermediate',
    comingSoon: true,
    audience: 'Students who have finished Forex Basic, or who already place and size their own trades and want a more structured, reviewed process.', // placeholder copy: confirm with the academy
    title: 'Forex Intermediate',
    market: 'Forex',
    level: 'Intermediate',
    duration: '6 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'The bridge between a beginner and an advanced trader: reading higher-timeframe structure, trading with a plan, and reviewing every trade.',
    outcomes: ['Multi-timeframe chart reading', 'Building and following a trading plan', 'Common mistakes at this stage', 'Preparing for Forex Advanced'],
  },
  {
    id: 'forex-advanced',
    audience: 'Traders who already know the basics (or have finished Forex Basic) and want a repeatable, reviewed process. You should be able to place and size a trade on your own.', // placeholder copy: confirm with the academy
    title: 'Forex Advanced',
    market: 'Forex',
    level: 'Advanced',
    duration: '8 weeks',
    format: 'In person or online',
    price: 44999,
    priceAed: 1999,
    summary: 'Market structure, liquidity dynamics and multi-timeframe analysis, with a live assignment review every week.',
    outcomes: ['Market structure and liquidity', 'Multi-timeframe analysis', 'Assignment journaling and review', 'Prop-firm challenge preparation'],
  },
  {
    id: 'crypto-basic',
    audience: 'Anyone who holds or wants to trade crypto and wants to do it safely, from first-time buyers to people already trading futures without a plan.', // placeholder copy: confirm with the academy
    title: 'Crypto Basic',
    market: 'Crypto',
    level: 'Basic',
    duration: '6 weeks',
    format: 'In person or online',
    price: 29999,
    priceAed: 1299,
    summary: 'Introduction to digital assets, reading crypto charts, candlestick patterns, wallets and safe risk management.',
    outcomes: ['Introduction to cryptocurrency, Bitcoin & major altcoins', 'Reading crypto charts & candlestick formations', 'Understanding market trends, volume & support levels', 'Wallet security, order types & capital preservation'],
  },
  {
    id: 'crypto-intermediate',
    comingSoon: true,
    audience: 'Students who have finished Crypto Basic and want to trade spot and futures with a tested process rather than a feeling.', // placeholder copy: confirm with the academy
    title: 'Crypto Intermediate',
    market: 'Crypto',
    level: 'Intermediate',
    duration: '6 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Building a repeatable crypto strategy: position sizing across volatile markets, journaling trades, and reading on-chain and funding data.',
    outcomes: ['Position sizing for volatile markets', 'Reading funding and open interest', 'Journaling and reviewing crypto assignments', 'Preparing for Crypto Advanced'],
  },
  {
    id: 'crypto-advanced',
    comingSoon: true,
    audience: 'Experienced crypto traders who want institutional-style market structure and risk tools applied to digital assets.', // placeholder copy: confirm with the academy
    title: 'Crypto Advanced',
    market: 'Crypto',
    level: 'Advanced',
    duration: '8 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Market structure and liquidity concepts applied to Bitcoin, Ethereum and major altcoins, with a weekly live assignment review.',
    outcomes: ['Market structure across crypto pairs', 'Liquidity dynamics and multi-timeframe analysis', 'Managing a structured crypto portfolio', 'Weekly reviewed assignment journal'],
  },
  {
    id: 'equity-basic',
    audience: 'Working professionals and beginners who want to trade or invest in Indian and US stocks with a clear method rather than tips.', // placeholder copy: confirm with the academy
    title: 'Equity Basic',
    market: 'Equity',
    level: 'Basic',
    duration: '6 weeks',
    format: 'In person or online',
    price: 19999,
    priceAed: 899,
    summary: 'Introduction to stock markets, reading price charts, candlesticks, and disciplined equity trading basics.',
    outcomes: ['Introduction to stock exchanges (NSE/BSE & US markets)', 'Reading stock charts & candlestick price action', 'Understanding market trends, support & resistance', 'Placing orders, position sizing & risk discipline'],
  },
  {
    id: 'equity-intermediate',
    comingSoon: true,
    audience: 'Students who have finished Equity Basic and want to move from watching a watchlist to trading it with a plan.', // placeholder copy: confirm with the academy
    title: 'Equity Intermediate',
    market: 'Equity',
    level: 'Intermediate',
    duration: '6 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Sector and index context, position sizing for equities, and a reviewed assignment journal across Indian and US markets.',
    outcomes: ['Sector and index context', 'Position sizing for equities', 'Journaling swing trades', 'Preparing for Equity Advanced'],
  },
  {
    id: 'equity-advanced',
    comingSoon: true,
    audience: 'Experienced equity traders ready for a full portfolio approach across Indian and US markets.', // placeholder copy: confirm with the academy
    title: 'Equity Advanced',
    market: 'Equity',
    level: 'Advanced',
    duration: '8 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Building and managing a full equity portfolio, with sector rotation, risk budgeting and a weekly live assignment review.',
    outcomes: ['Portfolio construction and risk budgeting', 'Sector rotation', 'Advanced chart and fundamentals reading', 'Weekly reviewed assignment journal'],
  },
  {
    id: 'indices-basic',
    audience: 'Beginners who want to trade global benchmarks like the S&P 500, Nasdaq and Nifty 50 instead of picking individual stocks.',
    title: 'Indices Basic',
    market: 'Indices',
    level: 'Basic',
    duration: '6 weeks',
    format: 'In person or online',
    price: 24999,
    priceAed: 1099,
    summary: 'Introduction to global benchmark indices, reading charts, candlestick dynamics, and risk-controlled index trading.',
    outcomes: ['What are indices (S&P 500, Nasdaq, Nifty 50) & how they move', 'Reading index charts & candlestick signals', 'Identifying broad market trends & key price levels', 'Risk management and trade sizing for benchmark moves'],
  },
  {
    id: 'indices-intermediate',
    comingSoon: true,
    audience: 'Students who have finished Indices Basic and want a structured, reviewed process for trading benchmark moves.', // placeholder copy: confirm with the academy
    title: 'Indices Intermediate',
    market: 'Indices',
    level: 'Intermediate',
    duration: '6 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Multi-timeframe index structure, sector rotation signals, and a reviewed assignment journal across global benchmarks.',
    outcomes: ['Multi-timeframe index structure', 'Sector rotation and breadth signals', 'Journaling index trades', 'Preparing for Indices Advanced'],
  },
  {
    id: 'indices-advanced',
    comingSoon: true,
    audience: 'Experienced traders ready for institutional-style index strategies across global benchmarks.', // placeholder copy: confirm with the academy
    title: 'Indices Advanced',
    market: 'Indices',
    level: 'Advanced',
    duration: '8 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Institutional index strategies, cross-market correlation, and risk budgeting across a basket of global benchmarks.',
    outcomes: ['Cross-market and cross-asset correlation', 'Index liquidity and rollover dynamics', 'Portfolio-level risk budgeting', 'Weekly reviewed assignment journal'],
  },
  {
    id: 'commodities-basic',
    audience: 'Beginners who want to trade gold, silver, oil and other commodities with a structured, risk-managed approach.',
    title: 'Commodities Basic',
    market: 'Commodities',
    level: 'Basic',
    duration: '6 weeks',
    format: 'In person or online',
    price: 24999,
    priceAed: 1099,
    summary: 'Introduction to global commodities, reading gold and oil charts, candlestick basics, and capital protection.',
    outcomes: ['Introduction to commodities (Gold, Silver, Crude Oil)', 'Reading commodity charts & candlestick dynamics', 'Key support, resistance & market trend identification', 'Volatility control, position sizing & stop loss discipline'],
  },
  {
    id: 'commodities-intermediate',
    comingSoon: true,
    audience: 'Students who have finished Commodities Basic and want a structured, reviewed process for trading commodities.', // placeholder copy: confirm with the academy
    title: 'Commodities Intermediate',
    market: 'Commodities',
    level: 'Intermediate',
    duration: '6 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Multi-timeframe commodity structure, intermarket correlation with currencies and bonds, and a reviewed assignment journal.',
    outcomes: ['Multi-timeframe commodity structure', 'Intermarket correlation with currencies and bonds', 'Journaling commodity trades', 'Preparing for Commodities Advanced'],
  },
  {
    id: 'commodities-advanced',
    comingSoon: true,
    audience: 'Experienced traders ready for institutional-style commodity strategies across energy and metals.', // placeholder copy: confirm with the academy
    title: 'Commodities Advanced',
    market: 'Commodities',
    level: 'Advanced',
    duration: '8 weeks', // placeholder: confirm length
    format: 'In person or online',
    summary: 'Institutional commodity strategies, supply-chain and geopolitical risk reading, and portfolio-level risk budgeting.',
    outcomes: ['Supply-chain and geopolitical risk reading', 'Commodity curve and rollover dynamics', 'Portfolio-level risk budgeting', 'Weekly reviewed assignment journal'],
  },
]

// SAMPLE stories to show the layout. They are NOT real students and are hidden in production
// builds (see Testimonials). Replace with real, consented student stories before launch.
export const stories = [
  {
    name: 'Aftab Ansari',
    stars: 5,
    date: '2 months ago',
    source: 'Google Review',
    program: 'Forex & Risk Management',
    quote: 'I had zero knowledge before joining these classes but Farhan and Anas explained all the basics like candlesticks, risk management, and strategies in very simple language with the best examples and what I loved most is the live market practice sessions. Now I can place trades with confidence and actually understand charts. Highly recommend if you’re a beginner.',
    outcome: 'Charts & Live Sessions',
  },
  {
    name: 'Narayan Bohara',
    stars: 5,
    date: '2 months ago',
    source: 'Google Review',
    program: 'Trading Foundations',
    quote: 'This class was fantastic. The teacher explained hard ideas in a very simple way and made sure everyone understood before moving on. I learned a lot and feel much more confident now. I will suggest all my friends to join this class and learn more about trading.',
    outcome: 'Recommends to Friends',
  },
  {
    name: 'Aashu Yadav',
    stars: 5,
    date: '5 months ago',
    source: 'Google Review',
    program: 'Stock Market Trading',
    quote: 'I attended a demo lecture for stock market trading. The session was informative and well-structured. The trainer explained the basics of trading, candlestick patterns, and market concepts in a simple and easy-to-understand manner. The environment was professional, and the way of teaching was beginner-friendly. They focused on practical knowledge and real market examples, which made the session interesting and engaging. Overall, it was a good learning experience, especially for someone who is new to trading and wants proper guidance to start in the stock market.',
    outcome: 'Practical Guidance',
  },
]

// The offer: what every program fee includes, and the refund terms.
export const offer = {
  includes: [
    'Live classes with your mentor, in person or online',
    'Dedicated curriculum notes and study guides in your student portal',
    'Module notes to download',
    'A mentor review of the assignments you submit during the program',
    'Module quizzes and a certificate on completion',
    'Help and support on WhatsApp for the length of the program',
  ],
  refundDays: 7,
  refundTerms: 'Full refund if you cancel within 7 days of enrolling and before attending more than two classes.',
}

// Questions people ask before enrolling. Shown on the homepage.
// placeholder: confirm the answers with the academy.
export const faqs = [
  ['Do I need experience?', 'No. We have basic to advanced course modules. In basics we are going to teach everything from reading charts to understanding various markets.'],
  ['Will this make me money?', 'No course can promise that, and you should be wary of any that does. We teach a method, risk management and the habit of reviewing your own trades. Trading carries real risk of loss.'],
  ['Can I study online from anywhere?', 'Yes. Online batches are live, at weekday evening and weekend times, with the same mentors, notes and certificate as the classroom batches.'],
  ['What if the program is not right for me?', 'You get a full refund if you cancel within 7 days of enrolling and before attending more than two classes.'],
]

export const formatINR = (n) => '₹' + n.toLocaleString('en-IN')
export const formatAED = (n) => 'AED ' + n.toLocaleString('en-AE')
export const lowestPrice = () => Math.min(...programs.map((p) => p.price).filter(Boolean))

// The bundle of the 4 published programs (the 5 comingSoon tiers aren't priced yet, so
// they aren't part of it). Pricing isn't shown on the site right now (see Offer in
// sections.jsx) — these figures are kept correct for when it is, and for the mock checkout.
export const bundlePackage = {
  id: 'all-programs-bundle',
  title: 'All 4 Programs Bundle',
  subtitle: 'Forex, Crypto and Equity, together',
  discountPercent: 40,
  totalInr: 119996, // 24,999 + 44,999 + 29,999 + 19,999
  discountedInr: 71998, // 40% discount
  savingsInr: 47998,
  totalAed: 5296, // 1,099 + 1,999 + 1,299 + 899
  discountedAed: 3178, // 40% discount
  savingsAed: 2118,
  totalWeeks: '26 weeks of live guided mentorship',
  certificationsCount: 4,
  programsIncluded: ['Forex Basic', 'Forex Advanced', 'Crypto Basic', 'Equity Basic'],
  // so the (unlinked but still reachable) Register page can list it like a program
  outcomes: ['All 4 flagship programs, back to back', 'A written plan for each market', '4 reviewed assignment journals', '4 verified certificates'],
}
