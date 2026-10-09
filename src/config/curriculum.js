// Course content per program: modules → lessons, plus one short quiz per module.

const lesson = (id, title, minutes) => ({ id, title, minutes })

export const curriculum = {
  // --- FOREX ---
  'forex-basic': [
    {
      id: 'fb-1', title: 'How Forex Works & Market Architecture',
      lessons: [
        lesson('fb-1-1', 'Currency Pairs: Base vs Quote Mechanics', 15),
        lesson('fb-1-2', 'Forex Brokers, Spreads, Swaps & Session Times', 18),
        lesson('fb-1-3', 'Pips, Micro/Mini/Standard Lots & Leverage Control', 22),
      ],
      quiz: [
        { q: 'On EUR/USD, which currency is the quote currency?', options: ['EUR', 'USD', 'Both', 'Neither'], answer: 1 },
        { q: 'A standard lot is how many units of the base currency?', options: ['1,000', '10,000', '100,000', '1,000,000'], answer: 2 },
        { q: 'Which session overlap usually has the highest global liquidity?', options: ['Sydney–Tokyo', 'Tokyo–London', 'London–New York', 'New York–Sydney'], answer: 2 },
      ],
    },
    {
      id: 'fb-2', title: 'Reading Clean Price Action Charts',
      lessons: [
        lesson('fb-2-1', 'Candlestick Anatomy, Wicks & Rejection Price Action', 16),
        lesson('fb-2-2', 'Dynamic Support and Resistance Zones', 20),
        lesson('fb-2-3', 'Uptrends, Downtrends, and Horizontal Consolidation', 19),
      ],
      quiz: [
        { q: 'A candle that closes firmly above its open is called…', options: ['Bearish', 'Bullish', 'Doji', 'Engulfing'], answer: 1 },
        { q: 'When price breaks cleanly above resistance, that level often flips to…', options: ['Irrelevant', 'Support', 'A gap', 'The spread'], answer: 1 },
        { q: 'Consecutive higher highs and higher lows define…', options: ['A downtrend', 'A range', 'An uptrend', 'Chop'], answer: 2 },
      ],
    },
    {
      id: 'fb-3', title: 'The Strict 1% Risk Management Engine',
      lessons: [
        lesson('fb-3-1', 'The 1% Maximum Account Risk Rule', 14),
        lesson('fb-3-2', 'Strategic Stop Loss Placement based on Invalidation', 18),
        lesson('fb-3-3', 'Calculating Position Size before Every Execution', 20),
      ],
      quiz: [
        { q: 'On a $10,000 account adhering to 1% risk, maximum loss per trade is…', options: ['$10', '$100', '$1,000', '$500'], answer: 1 },
        { q: 'A stop loss should be placed…', options: ['Arbitrarily', 'Where your trade thesis is invalidated', 'At a round number always', 'Never'], answer: 1 },
      ],
    },
  ],

  'forex-intermediate': [
    {
      id: 'fi-1', title: 'Market Structure & Trend Dynamics',
      lessons: [
        lesson('fi-1-1', 'Swing Highs, Swing Lows & Structural Points', 22),
        lesson('fi-1-2', 'Break of Structure (BOS) vs Change of Character (CHoCH)', 25),
        lesson('fi-1-3', 'Premium and Discount Valuation Zones', 20),
      ],
      quiz: [
        { q: 'In an uptrend, a Break of Structure occurs when price…', options: ['Breaks the recent swing high', 'Touches an indicator', 'Gaps down', 'Enters consolidation'], answer: 0 },
        { q: 'In a bullish trend, optimal risk-to-reward buys occur in…', options: ['Premium Zone', 'Discount Zone', 'Any Zone', 'All-Time Highs'], answer: 1 },
      ],
    },
    {
      id: 'fi-2', title: 'Top-Down Multi-Timeframe Alignment',
      lessons: [
        lesson('fi-2-1', 'Establishing Macro Bias on Daily and 4-Hour Charts', 24),
        lesson('fi-2-2', 'Refining Structural Entries on 15m and 5m Charts', 26),
        lesson('fi-2-3', 'Supply & Demand Imbalances and Mitigation', 22),
      ],
      quiz: [
        { q: 'A sound top-down analysis sequence is…', options: ['1m → 1H → Daily', 'Daily → 4H → 15m → 5m', '5m only', 'Weekly only'], answer: 1 },
      ],
    },
  ],

  'forex-advanced': [
    {
      id: 'fa-1', title: 'Institutional Liquidity & Bank Order Flow',
      lessons: [
        lesson('fa-1-1', 'Where Retail Stop Losses Cluster (Buy/Sell-Side Liquidity)', 25),
        lesson('fa-1-2', 'Fair Value Gaps (FVG) and Liquidity Voids', 26),
        lesson('fa-1-3', 'Order Blocks & Smart Money Accumulation Cycles', 28),
      ],
      quiz: [
        { q: 'Equal highs on a major pair typically represent…', options: ['Buy-side liquidity / resting stops', 'Strong ceiling with no stops', 'Brokers manipulation target only', 'Zero volume'], answer: 0 },
        { q: 'A Fair Value Gap represents…', options: ['A three-candle price imbalance', 'A moving average cross', 'Broker spread widening', 'Market closing'], answer: 0 },
      ],
    },
    {
      id: 'fa-2', title: 'Systematic Risk Rules & Execution Psychology',
      lessons: [
        lesson('fa-2-1', 'Institutional Risk Parameters & Drawdown Control', 22),
        lesson('fa-2-2', 'Managing Maximum Trailing Drawdown Constraints', 20),
        lesson('fa-2-3', 'Journaling Every Metric & Weekly Mentor Audits', 24),
      ],
      quiz: [
        { q: 'The most common cause of account drawdown violation is…', options: ['Violating daily loss/drawdown limits', 'Low leverage', 'Platform lag', 'Weekend holding'], answer: 0 },
      ],
    },
  ],

  // --- CRYPTO ---
  'crypto-basic': [
    {
      id: 'cb-1', title: 'Blockchain Fundamentals & Self-Custody',
      lessons: [
        lesson('cb-1-1', 'Bitcoin, Ethereum & Layer-1 Ecosystems', 18),
        lesson('cb-1-2', 'Hardware Wallets, Seed Phrases & Cold Storage', 22),
        lesson('cb-1-3', 'Spot Buying & Avoiding Scams and Phishing', 18),
      ],
      quiz: [
        { q: 'Who owns the assets in a self-custodial hardware wallet?', options: ['The exchange', 'You, through your private seed phrase', 'The blockchain miners', 'The token founders'], answer: 1 },
        { q: 'You should share your recovery seed phrase with…', options: ['Support agents on Telegram', 'Nobody, ever', 'Your exchange', 'Online forms'], answer: 1 },
      ],
    },
    {
      id: 'cb-2', title: 'Bitcoin Market Cycles & Macro Drivers',
      lessons: [
        lesson('cb-2-1', 'Understanding the 4-Year Bitcoin Halving Cycle', 20),
        lesson('cb-2-2', 'Bitcoin Dominance (BTC.D) & Altcoin Rotation', 22),
        lesson('cb-2-3', 'Dollar-Cost Averaging (DCA) vs Timing Entries', 16),
      ],
      quiz: [
        { q: 'When Bitcoin dominance drops while market cap rises, it indicates…', options: ['Altcoin season / capital rotation', 'Bear market onset', 'Exchange insolvency', 'Zero liquidity'], answer: 0 },
      ],
    },
  ],

  'crypto-intermediate': [
    {
      id: 'ci-1', title: 'Cryptocurrency Perpetual Futures & Leverage',
      lessons: [
        lesson('ci-1-1', 'Perpetual Contracts vs Traditional Futures', 24),
        lesson('ci-1-2', 'Funding Rates, Open Interest & Squeeze Mechanics', 26),
        lesson('ci-1-3', 'Cross vs Isolated Margin & Liquidation Calculation', 22),
      ],
      quiz: [
        { q: 'Extremely positive funding rates indicate…', options: ['Longs pay shorts / market is over-leveraged long', 'Shorts pay longs', 'Market is neutral', 'Exchange fees are zero'], answer: 0 },
        { q: 'Liquidation on a perpetual position happens when…', options: ['Maintenance margin is exhausted by losses', 'You hit take-profit', 'Funding turns negative', 'Market closes'], answer: 0 },
      ],
    },
  ],

  'crypto-advanced': [
    {
      id: 'ca-1', title: 'On-Chain Analytics & Institutional Crypto Flow',
      lessons: [
        lesson('ca-1-1', 'Tracking Whale Wallets & Exchange Net Inflow/Outflow', 28),
        lesson('ca-1-2', 'Liquidation Heatmaps & High-Frequency Delta Imbalances', 26),
        lesson('ca-1-3', 'DeFi Derivatives, Liquidity Grids & Hedging', 24),
      ],
      quiz: [
        { q: 'Massive coin inflows from private wallets to exchanges often indicate…', options: ['Potential selling pressure / distribution', 'Strong long-term holding', 'Staking lockup', 'Network upgrade'], answer: 0 },
      ],
    },
  ],

  // --- EQUITY ---
  'equity-basic': [
    {
      id: 'eb-1', title: 'Stock Market Foundations & Demat Accounts',
      lessons: [
        lesson('eb-1-1', 'How Stock Exchanges (NSE, BSE, NYSE, NASDAQ) Work', 18),
        lesson('eb-1-2', 'Opening Demat Accounts & Order Types (Market, Limit, SL)', 16),
        lesson('eb-1-3', 'Reading Financial Statements & Key Ratios (P/E, ROE)', 22),
      ],
      quiz: [
        { q: 'In India, depository institutions that hold your shares in demat form are…', options: ['CDSL / NSDL', 'RBI', 'SEBI', 'Broker servers'], answer: 0 },
        { q: 'A limit order ensures execution at…', options: ['Any available market price', 'Your specified price or better', 'Always the opening price', 'Zero spread'], answer: 1 },
      ],
    },
  ],

  'equity-intermediate': [
    {
      id: 'ei-1', title: 'Stage Analysis & Swing Breakout Trading',
      lessons: [
        lesson('ei-1-1', 'Stan Weinstein’s 4-Stage Market Framework', 25),
        lesson('ei-1-2', 'Volume Price Analysis (VPA) & Accumulation Bases', 24),
        lesson('ei-1-3', 'Scanning for Relative Strength (RS) Market Leaders', 22),
      ],
      quiz: [
        { q: 'Stage 2 in stock lifecycle analysis represents…', options: ['The primary advancing / markup uptrend phase', 'The distribution top', 'The declining bear phase', 'The base'], answer: 0 },
      ],
    },
  ],

  'equity-advanced': [
    {
      id: 'ea-1', title: 'Options Greeks, Open Interest & Portfolio Hedging',
      lessons: [
        lesson('ea-1-1', 'Option Greeks: Delta, Gamma, Theta & Vega Dynamics', 28),
        lesson('ea-1-2', 'Open Interest (OI) Heatmaps & Put-Call Ratio (PCR)', 26),
        lesson('ea-1-3', 'Directional Spreads, Non-Directional Strangles & Hedging', 30),
      ],
      quiz: [
        { q: 'Theta in options trading measures…', options: ['Time decay / price decay per day passed', 'Sensitivity to underlying price change', 'Volatility impact', 'Interest rate shift'], answer: 0 },
      ],
    },
  ],

  // Backwards-compatible aliases
  'crypto': [
    {
      id: 'cr-1', title: 'Crypto Foundations & Derivatives',
      lessons: [
        lesson('cr-1-1', 'Bitcoin, Ethereum and Blockchain Security', 20),
        lesson('cr-1-2', 'Perpetual Futures, Margin & Liquidation Control', 24),
      ],
      quiz: [{ q: 'Who controls seed phrases in cold storage?', options: ['The owner', 'The exchange'], answer: 0 }],
    },
  ],
  'equity': [
    {
      id: 'eq-1', title: 'Equity Markets & Swing Execution',
      lessons: [
        lesson('eq-1-1', 'NSE, BSE & US Stock Fundamentals', 20),
        lesson('eq-1-2', 'Stage 2 Breakouts & Institutional Accumulation', 24),
      ],
      quiz: [{ q: 'A limit order fills at…', options: ['Specified price or better', 'Any price'], answer: 0 }],
    },
  ],
}

export const allLessons = (programId) => (curriculum[programId] || []).flatMap((m) => m.lessons)
