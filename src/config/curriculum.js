// Course content per program: modules → lessons, plus one short quiz per module.
// Designed with structured beginner fundamentals: intro to the market, reading charts,
// candlestick anatomy, market mechanics, and disciplined risk management.

const lesson = (id, title) => ({ id, title })

export const curriculum = {
  // 1. FOREX BASIC
  'forex-basic': [
    {
      id: 'fb-1',
      title: 'Introduction to Financial Markets & Currency (Forex)',
      lessons: [
        lesson('fb-1-1', 'What is a Financial Market & How Exchange Works'),
        lesson('fb-1-2', 'What is Currency & How Currency Pairs Work (EUR/USD, GBP/USD)'),
        lesson('fb-1-3', 'Base vs. Quote Currency: Buying (Long) vs. Selling (Short)'),
        lesson('fb-1-4', 'Market Participants: Central Banks, Institutions & Retail Traders'),
      ],
      quiz: [
        { q: 'In the EUR/USD currency pair, which is the quote currency?', options: ['EUR', 'USD', 'Both', 'Neither'], answer: 1 },
        { q: 'Going "Long" on a currency pair means you expect the base currency to…', options: ['Rise in value', 'Fall in value', 'Stay unchanged', 'Close for the session'], answer: 0 },
        { q: 'Who are the primary drivers of large liquidity volume in global forex?', options: ['Retail mobile traders', 'Central banks & institutional liquidity providers', 'Social media groups', 'Cryptocurrency miners'], answer: 1 },
      ],
    },
    {
      id: 'fb-2',
      title: 'Chart Basics & Understanding Candlesticks',
      lessons: [
        lesson('fb-2-1', 'Introduction to Charting Platforms (TradingView & MT5)'),
        lesson('fb-2-2', 'What is a Candlestick? Anatomy of a Candle (Open, High, Low, Close)'),
        lesson('fb-2-3', 'Bullish vs. Bearish Candles & Interpreting Candle Wicks'),
        lesson('fb-2-4', 'Essential Candlestick Formations: Marubozu, Doji, Hammer & Engulfing'),
      ],
      quiz: [
        { q: 'What does a candlestick with a small body and long lower wick typically indicate?', options: ['Strong selling pressure', 'Price rejection of lower levels (buyers stepping in)', 'Market has closed', 'An invalid chart reading'], answer: 1 },
        { q: 'A candle that closes significantly above its opening price is called…', options: ['Bearish candle', 'Bullish candle', 'Doji candle', 'Gap candle'], answer: 1 },
        { q: 'The highest point of a candlestick shadow (wick) represents…', options: ['The opening price', 'The closing price', 'The highest price reached during that period', 'The average spread'], answer: 2 },
      ],
    },
    {
      id: 'fb-3',
      title: 'Reading Price Action & Market Trends',
      lessons: [
        lesson('fb-3-1', 'Timeframes Explained: Daily, 4-Hour, 1-Hour & 15-Minute Charts'),
        lesson('fb-3-2', 'Identifying Market Direction: Uptrends, Downtrends & Ranges'),
        lesson('fb-3-3', 'Support and Resistance: Identifying Floors and Ceilings'),
        lesson('fb-3-4', 'Forex Market Sessions: Tokyo, London & New York Liquidities'),
      ],
      quiz: [
        { q: 'A series of higher highs (HH) and higher lows (HL) defines an…', options: ['Uptrend', 'Downtrend', 'Sideways consolidation', 'Immediate reversal'], answer: 0 },
        { q: 'When price breaks cleanly above a resistance level, that level often acts as…', options: ['A permanent barrier', 'Future support', 'Zero liquidity', 'The spread limit'], answer: 1 },
        { q: 'Which session overlap historically witnesses the greatest market volume and liquidity?', options: ['Sydney–Tokyo', 'Tokyo–London', 'London–New York', 'New York–Sydney'], answer: 2 },
      ],
    },
    {
      id: 'fb-4',
      title: 'Essential Risk Management & Trade Placement',
      lessons: [
        lesson('fb-4-1', 'Pips, Lot Sizes & Understanding Leverage Safely'),
        lesson('fb-4-2', 'Order Types: Market Execution vs. Limit & Stop Orders'),
        lesson('fb-4-3', 'Stop Loss & Take Profit: Defining Invalidation Before Entry'),
        lesson('fb-4-4', 'The 1% Rule of Capital Preservation & Position Sizing Calculator'),
      ],
      quiz: [
        { q: 'Why is a Stop Loss mandatory on every live market trade?', options: ['Brokers require it to open accounts', 'To strictly cap maximum loss and protect capital from wipeout', 'To guarantee profits', 'It closes trades at breakeven only'], answer: 1 },
        { q: 'On a $10,000 trading account, applying the 1% risk rule means your maximum risk per trade is…', options: ['$10', '$100', '$1,000', '$500'], answer: 1 },
        { q: 'A Risk-to-Reward ratio of 1:2 means you are…', options: ['Risking $100 to potentially make $200', 'Risking $200 to potentially make $100', 'Using 2x leverage on your account', 'Aiming for 2 trades per week'], answer: 0 },
      ],
    },
  ],

  // 2. CRYPTO BASIC
  'crypto-basic': [
    {
      id: 'cr-1',
      title: 'Introduction to Cryptocurrency & Digital Assets',
      lessons: [
        lesson('cr-1-1', 'What is Cryptocurrency & How Blockchain Works in Simple Terms'),
        lesson('cr-1-2', 'What is Bitcoin (BTC) & Why It Acts as Digital Gold'),
        lesson('cr-1-3', 'Major Altcoins (Ethereum, Solana) & Smart Contract Ecosystems'),
        lesson('cr-1-4', 'Stablecoins (USDT, USDC): Safe Havens & Trading Denominators'),
      ],
      quiz: [
        { q: 'What primary problem does a decentralized blockchain ledger solve?', options: ['Eliminates the need for trust in a centralized counterparty', 'Guarantees prices always increase', 'Allows free anonymous spending anywhere', 'Replaces computer hardware'], answer: 0 },
        { q: 'What is the purpose of a stablecoin like USDT or USDC?', options: ['To generate 100x speculative returns', 'To maintain a stable 1:1 value pegged to the US Dollar', 'To mine new bitcoins', 'To replace cold storage hardware'], answer: 1 },
      ],
    },
    {
      id: 'cr-2',
      title: 'Chart Basics & Candlestick Reading for Crypto',
      lessons: [
        lesson('cr-2-1', 'Reading 24/7 Crypto Charts on TradingView & Major Exchanges'),
        lesson('cr-2-2', 'What is a Candlestick? Anatomy of Crypto Price Discovery'),
        lesson('cr-2-3', 'Bullish & Bearish Candles in 24/7 Volatile Markets'),
        lesson('cr-2-4', 'Understanding Volume & Spotting Aggressive Buying/Selling'),
      ],
      quiz: [
        { q: 'Unlike traditional stock exchanges, the cryptocurrency spot and futures market is open…', options: ['9:30 AM to 4:00 PM weekdays', '24 hours a day, 7 days a week, 365 days a year', 'Only during US market hours', 'Monday through Friday only'], answer: 1 },
        { q: 'A sudden surge in volume accompanying a large green candle typically suggests…', options: ['Strong institutional buying pressure', 'Lack of market interest', 'System outage on the exchange', 'Low liquidity'], answer: 0 },
      ],
    },
    {
      id: 'cr-3',
      title: 'Reading Crypto Price Trends & Support Levels',
      lessons: [
        lesson('cr-3-1', 'Identifying Crypto Market Cycles: Bull Runs, Bear Cycles & Accumulation'),
        lesson('cr-3-2', 'Key Support and Resistance Levels on Bitcoin and Altcoins'),
        lesson('cr-3-3', 'Understanding Bitcoin Dominance (BTC.D) & Altcoin Rotation'),
        lesson('cr-3-4', 'Spot Trading (Owning the Asset) vs. Derivatives / Futures Basics'),
      ],
      quiz: [
        { q: 'What is the key difference between Spot Trading and Futures Trading?', options: ['Spot means you own the underlying coin; Futures trades a price contract', 'Spot uses 100x leverage; Futures does not', 'Spot is only available for Bitcoin', 'There is no difference'], answer: 0 },
        { q: 'When Bitcoin Dominance (BTC.D) rises sharply, altcoins typically…', options: ['Outperform Bitcoin easily', 'Lose market share and bleed value relative to Bitcoin', 'Stay perfectly flat', 'Double in price'], answer: 1 },
      ],
    },
    {
      id: 'cr-4',
      title: 'Security, Order Types & Managing Crypto Volatility',
      lessons: [
        lesson('cr-4-1', 'Wallets Explained: Hot (Software) vs. Cold (Hardware) Storage'),
        lesson('cr-4-2', 'Securing Seed Phrases, 2FA & Protecting Against Scams'),
        lesson('cr-4-3', 'Order Types: Market, Limit, and Stop-Loss on Crypto Exchanges'),
        lesson('cr-4-4', 'Position Sizing Rules for High-Volatility Digital Assets'),
      ],
      quiz: [
        { q: 'Who should you share your 12- or 24-word wallet seed phrase with?', options: ['Customer support on Telegram', 'A Discord community manager', 'Absolute nobody; keep it offline and secret', 'Any verified exchange'], answer: 2 },
        { q: 'Why is strict position sizing critical in cryptocurrency trading?', options: ['Crypto assets can move 10-30% in hours, so oversized trades risk severe liquidation', 'Exchanges penalize traders who place small trades', 'To avoid blockchain gas fees', 'It guarantees 100% win rates'], answer: 0 },
      ],
    },
  ],

  // 3. EQUITY BASIC
  'equity-basic': [
    {
      id: 'eq-1',
      title: 'Introduction to Stock Markets & Equities',
      lessons: [
        lesson('eq-1-1', 'What is an Equity (Stock / Share) & What Does Ownership Mean?'),
        lesson('eq-1-2', 'How Stock Exchanges Work: NSE & BSE (India), NYSE & NASDAQ (US)'),
        lesson('eq-1-3', 'Demat Accounts vs. Trading Accounts Explained Simply'),
        lesson('eq-1-4', 'Market Capitalization: Large-Cap, Mid-Cap & Small-Cap Categories'),
      ],
      quiz: [
        { q: 'In India, where are your purchased shares held electronically?', options: ['In your bank savings account', 'In a Demat (Depository) account via NSDL/CDSL', 'On the trading floor physically', 'With your local broker directly'], answer: 1 },
        { q: 'What does purchasing 1 share of an equity represent?', options: ['A personal loan to the founder', 'Fractional ownership in that company', 'A guaranteed monthly dividend', 'An options contract'], answer: 1 },
      ],
    },
    {
      id: 'eq-2',
      title: 'Chart Basics & Candlestick Reading for Stocks',
      lessons: [
        lesson('eq-2-1', 'Setting Up Stock Charts & Building an Initial Watchlist'),
        lesson('eq-2-2', 'What is a Candlestick? Open, High, Low, Close (OHLC) Decoded'),
        lesson('eq-2-3', 'Green (Bullish) vs. Red (Bearish) Candles & Price Rejection'),
        lesson('eq-2-4', 'Core Candlestick Formations: Reversals, Continuations & Indecision'),
      ],
      quiz: [
        { q: 'On a daily candlestick chart, what does a single candle represent?', options: ['The price action across one full calendar month', 'The complete open, high, low, and close of that specific trading day', 'One trade executed by an institution', 'The current minute price'], answer: 1 },
        { q: 'A hammer candle appearing at the bottom of a prolonged downtrend often signals…', options: ['Potential buyer exhaustion', 'Potential bullish reversal as buyers reject lower prices', 'The company is reporting bankruptcy', 'A guaranteed market drop'], answer: 1 },
      ],
    },
    {
      id: 'eq-3',
      title: 'Trend Identification, Support & Resistance',
      lessons: [
        lesson('eq-3-1', 'Market Trends: Bull Markets, Bear Markets & Base Consolidations'),
        lesson('eq-3-2', 'Drawing Support & Resistance Levels on Key Equities'),
        lesson('eq-3-3', 'Stock Market Hours: Opening Bell, Lunch Quiet Period & Closing Volatility'),
        lesson('eq-3-4', 'Basic Fundamentals: Revenue, Net Profit & Earnings Announcements (QoQ/YoY)'),
      ],
      quiz: [
        { q: 'What constitutes a healthy uptrend on an equity chart?', options: ['Higher highs and higher lows formed systematically', 'Price dropping with low volume', 'A flat horizontal line for several months', 'Only red candles'], answer: 0 },
        { q: 'Why is it important to know when an equity reports quarterly earnings?', options: ['Earnings announcements often generate major price gaps and volatility', 'Stock exchanges close during earnings', 'Orders cannot be placed during earnings', 'Dividends are canceled'], answer: 0 },
      ],
    },
    {
      id: 'eq-4',
      title: 'Order Placement & Capital Preservation in Equities',
      lessons: [
        lesson('eq-4-1', 'Order Types: Cash Delivery (CNC) vs. Intraday (MIS) & Limit Orders'),
        lesson('eq-4-2', 'Setting Stop Losses & Calculating Risk-to-Reward on Equities'),
        lesson('eq-4-3', 'Position Sizing: How Many Shares to Buy Based on Your Account Size'),
        lesson('eq-4-4', 'Building a Disciplined Stock Watchlist & Trade Journal Routine'),
      ],
      quiz: [
        { q: 'If your risk limit is $100 and your Stop Loss is $2 away from entry, how many shares can you buy?', options: ['50 shares ($100 / $2)', '100 shares', '10 shares', 'As many as your leverage allows'], answer: 0 },
        { q: 'What is a Limit Order?', options: ['An order that fills immediately at any available market price', 'An order that fills only at your specified target price or better', 'An order that can only be used by institutional funds', 'An order that expires after 60 seconds'], answer: 1 },
      ],
    },
  ],

  // 4. INDICES BASIC
  'indices-basic': [
    {
      id: 'in-1',
      title: 'Introduction to Global Benchmark Indices',
      lessons: [
        lesson('in-1-1', 'What is an Index? (A Benchmark Basket of Top Companies)'),
        lesson('in-1-2', 'Global Benchmarks: S&P 500, Nasdaq 100, Dow Jones & Nifty 50'),
        lesson('in-1-3', 'Why Trade Indices Instead of Individual Stocks (Diversification & Clean Trends)'),
        lesson('in-1-4', 'Macro Drivers: How Interest Rates, Inflation & Tech Titans Move the Index'),
      ],
      quiz: [
        { q: 'What does the S&P 500 index represent?', options: ['The 500 largest publicly traded companies in the United States', '500 foreign currency exchange rates', 'A crypto index token', 'Government bonds'], answer: 0 },
        { q: 'What is a major advantage of trading benchmark indices over single stocks?', options: ['Indices eliminate company-specific bankruptcy risk and provide cleaner macro trends', 'Indices are 100% risk-free', 'Indices never experience pullbacks', 'Brokers do not charge spreads on indices'], answer: 0 },
      ],
    },
    {
      id: 'in-2',
      title: 'Chart Basics & Candlestick Dynamics on Indices',
      lessons: [
        lesson('in-2-1', 'Reading Index Charts & Tracking Benchmark Points'),
        lesson('in-2-2', 'What is a Candlestick? Interpreting Institutional Index Movement'),
        lesson('in-2-3', 'Bullish & Bearish Candles Across Daily and Hourly Charts'),
        lesson('in-2-4', 'Momentum Candles vs. Exhaustion Patterns on Major Indices'),
      ],
      quiz: [
        { q: 'What do wide-ranging green candles with minimal wicks indicate on an index chart?', options: ['Strong, decisive institutional buying momentum', 'Lack of interest from market participants', 'A bearish breakdown', 'Market is closed'], answer: 0 },
        { q: 'Why is timeframe alignment (e.g. Daily + 1-Hour) valuable when reading an index?', options: ['Higher timeframes give macro context, while lower timeframes offer precise entry timing', 'It guarantees zero losses', 'It prevents brokers from widening spreads', 'Lower timeframes are always random'], answer: 0 },
      ],
    },
    {
      id: 'in-3',
      title: 'Benchmark Trends, Key Levels & Opening Bell Dynamics',
      lessons: [
        lesson('in-3-1', 'Identifying Index Trends: Bull Markets, Corrections & Consolidations'),
        lesson('in-3-2', 'Major Support and Resistance Levels on Benchmark Charts'),
        lesson('in-3-3', 'Opening Bell Dynamics: Managing the US Market Open (9:30 AM EST)'),
        lesson('in-3-4', 'Index Gaps: What Happens When Benchmarks Open Above or Below Previous Closes'),
      ],
      quiz: [
        { q: 'Why does the opening 30 to 60 minutes of the US market often display elevated volatility?', options: ['Overnight orders and global institutional flow are matched at the opening bell', 'Exchanges turn off risk filters', 'Trading volume is at its lowest of the day', 'Brokers test their servers'], answer: 0 },
        { q: 'A gap up at the market open occurs when…', options: ['The opening price is higher than the previous session high/close due to overnight demand', 'Trading is suspended for the day', 'The index loses value overnight', 'Spreads widen to infinity'], answer: 0 },
      ],
    },
    {
      id: 'in-4',
      title: 'Index Risk Control & Execution Basics',
      lessons: [
        lesson('in-4-1', 'Point Values, Contracts & Sizing Index Positions Correctly'),
        lesson('in-4-2', 'Order Execution: Using Stop Losses to Defend Capital on Benchmark Moves'),
        lesson('in-4-3', 'Developing a Disciplined Daily Prep Routine & Tracking Key Economic Releases'),
        lesson('in-4-4', 'The 1-2% Account Risk Boundary for Systematic Index Trading'),
      ],
      quiz: [
        { q: 'Why is it critical to check the economic calendar (CPI, NFP, Fed interest rate decisions) before trading indices?', options: ['Major economic releases can cause sharp multi-hundred-point swings in seconds', 'It provides tips on which stocks to buy', 'Exchanges close during news releases', 'Economic reports have no impact on indices'], answer: 0 },
        { q: 'What should dictate your trade size when entering an index position?', options: ['Your predetermined dollar risk amount divided by the stop loss point distance', 'Account balance multiplied by maximum available leverage', 'A gut feeling on how strong the move looks', 'A fixed 10 lots every time'], answer: 0 },
      ],
    },
  ],

  // 5. COMMODITIES BASIC
  'commodities-basic': [
    {
      id: 'com-1',
      title: 'Introduction to Global Commodities & Physical Assets',
      lessons: [
        lesson('com-1-1', 'What is a Commodity? Precious Metals (Gold, Silver) & Energy (Crude Oil)'),
        lesson('com-1-2', 'The Unique Role of Gold (XAU) as a Store of Value & Safe Haven'),
        lesson('com-1-3', 'Global Supply and Demand Dynamics: How Geopolitics Moves Raw Materials'),
        lesson('com-1-4', 'Spot Commodities vs. Futures Contracts Explained Simply'),
      ],
      quiz: [
        { q: 'Why is Gold (XAU/USD) traditionally viewed as a "safe-haven" asset?', options: ['Investors historically flock to gold during geopolitical uncertainty and inflation', 'Gold price is guaranteed never to decline', 'Central banks do not hold gold', 'Gold can only be traded in person'], answer: 0 },
        { q: 'What is the primary factor that dictates crude oil prices over the medium and long term?', options: ['Global supply (OPEC, drilling output) vs. global industrial demand', 'Social media chatter', 'Mining difficulty', 'Retail stock traders'], answer: 0 },
      ],
    },
    {
      id: 'com-2',
      title: 'Chart Basics & Candlestick Reading for Commodities',
      lessons: [
        lesson('com-2-1', 'Setting Up Gold (XAU/USD) & Oil Charts on TradingView'),
        lesson('com-2-2', 'What is a Candlestick? Price Discovery in 23-Hour Global Commodity Markets'),
        lesson('com-2-3', 'Interpreting Buying and Selling Rejections via Long Candle Wicks'),
        lesson('com-2-4', 'Key Candlestick Reversal Signals at Major Psychological Numbers'),
      ],
      quiz: [
        { q: 'What does a long upper wick on a Gold daily candlestick indicate?', options: ['Price rallied, but sellers aggressively rejected higher prices by the close', 'Buyers are in complete control', 'Market had zero trading activity', 'A technical glitch'], answer: 0 },
        { q: 'Why are round psychological numbers (e.g. $2,000, $2,500 on Gold, $70, $80 on Oil) important on charts?', options: ['They attract heavy institutional orders, liquidity clusters, and retail attention', 'They are randomly chosen by software algorithms', 'Brokers prohibit orders at round numbers', 'They mark the end of the trading week'], answer: 0 },
      ],
    },
    {
      id: 'com-3',
      title: 'Commodity Price Action, Trends & Intermarket Correlation',
      lessons: [
        lesson('com-3-1', 'Identifying Commodity Trends: Bull Cycles vs. Bear Trends & Ranges'),
        lesson('com-3-2', 'Key Support and Resistance Levels on Gold and Crude Oil'),
        lesson('com-3-3', 'Intermarket Relationships: The US Dollar Index (DXY) vs. Gold Prices'),
        lesson('com-3-4', 'Global Trading Windows: London & New York Session Liquidities in Metals'),
      ],
      quiz: [
        { q: 'Historically, what is the typical inverse correlation between the US Dollar (DXY) and Gold (XAU/USD)?', options: ['A stronger US Dollar often puts downward pressure on Gold, while a weaker Dollar supports Gold', 'They always move in the exact same direction', 'The US Dollar has zero relationship with gold', 'Gold only moves on weekends'], answer: 0 },
        { q: 'When Gold breaks out above a major multi-month resistance zone on high volume, it typically indicates…', options: ['A high-probability continuation of the bullish trend', 'An immediate reason to short with maximum leverage', 'Trading is about to be halted permanently', 'A fake move with no significance'], answer: 0 },
      ],
    },
    {
      id: 'com-4',
      title: 'Position Sizing, Volatility Control & Risk Discipline',
      lessons: [
        lesson('com-4-1', 'Understanding Ounces, Barrels, Contract Sizes & Leverage Risks'),
        lesson('com-4-2', 'Managing High Volatility Around Geopolitical & Inventory Releases (EIA, OPEC)'),
        lesson('com-4-3', 'Setting Non-Negotiable Stop Losses Before Executing Commodity Trades'),
        lesson('com-4-4', 'The 1% Rule of Capital Preservation & Maintaining an Audited Journal'),
      ],
      quiz: [
        { q: 'Why does crude oil often exhibit sharp price jumps during weekly EIA inventory reports?', options: ['Surprises in inventory levels rapidly recalibrate short-term supply/demand expectations', 'Oil contracts expire weekly', 'Brokers artificially move the price', 'Inventory reports contain stock earnings'], answer: 0 },
        { q: 'What is the most effective way to protect your account when trading volatile commodities like Gold and Oil?', options: ['Size positions based strictly on risk amount, and always place a verified stop loss', 'Never place a stop loss and hope prices return', 'Use 100x leverage on every breakout', 'Trade exclusively during news spikes without a plan'], answer: 0 },
      ],
    },
  ],

  // 6. FOREX INTERMEDIATE
  'forex-intermediate': [
    {
      id: 'fi-1',
      title: 'Fundamental Analysis of the Market',
      lessons: [
        lesson('fi-1-1', 'Fundamental analysis of the market: Core Macro Drivers & Interest Rates'),
        lesson('fi-1-2', 'Central Bank Monetary Policies (Federal Reserve, ECB, BOE, BOJ)'),
        lesson('fi-1-3', 'Understanding Inflation, Sovereign Bond Yields & Currency Valuation'),
      ],
      quiz: [
        { q: 'What is the primary role of fundamental analysis in currency trading?', options: ['Understanding macroeconomic drivers and interest rate expectations moving currency values', 'Drawing trendlines on short timeframes', 'Predicting the exact closing price of tomorrow', 'Selecting broker leverage'], answer: 0 },
        { q: 'When a central bank raises its benchmark interest rate, its currency typically…', options: ['Strengthens as international capital seeks higher yield', 'Depreciates immediately to zero', 'Freezes trading volume', 'Moves completely at random'], answer: 0 },
      ],
    },
    {
      id: 'fi-2',
      title: 'Reading News and Figuring Out Bias',
      lessons: [
        lesson('fi-2-1', 'Reading news and figuring out bias: Economic Calendar Mastery'),
        lesson('fi-2-2', 'High-Impact News Releases: Non-Farm Payrolls (NFP), CPI & FOMC Decisions'),
        lesson('fi-2-3', 'Establishing Directional Daily & Weekly Market Bias from Global Headlines'),
      ],
      quiz: [
        { q: 'How does a professional trader establish directional market bias using news releases?', options: ['Comparing actual figures against forecast expectations to gauge real sentiment vs. priced-in consensus', 'Entering maximum lot size right at the release second', 'Ignoring news completely', 'Trading only when the market is asleep'], answer: 0 },
        { q: 'What often happens during high-impact news like US CPI or NFP?', options: ['High volatility, wide spreads, and liquidity sweeps before a true directional trend forms', 'Zero price movement', 'Trading is permanently closed for the day', 'All currencies become identical in value'], answer: 0 },
      ],
    },
    {
      id: 'fi-3',
      title: 'How to Read the Other Economic Data',
      lessons: [
        lesson('fi-3-1', 'How to read the other economic data: GDP, Retail Sales & Industrial Output'),
        lesson('fi-3-2', 'Labor Market Health: Jobless Claims, Unemployment Rate & Wage Growth'),
        lesson('fi-3-3', 'Intermarket Relationships: The US Dollar Index (DXY), Oil & Treasury Yields'),
      ],
      quiz: [
        { q: 'Why is GDP (Gross Domestic Product) and Manufacturing PMI critical to read as economic data?', options: ['They measure overall economic expansion or contraction, directly influencing central bank policy expectations', 'They provide stock ticker symbols', 'They tell you where to put a stop loss', 'They are only relevant for physical retail stores'], answer: 0 },
        { q: 'How does monitoring the US Dollar Index (DXY) assist your forex trading bias?', options: ['It reveals the broad strength or weakness of the world reserve currency across major pairs', 'It replaces chart analysis entirely', 'It is an unregulated crypto token', 'It guarantees 100% winning trades'], answer: 0 },
      ],
    },
    {
      id: 'fi-4',
      title: 'Market Structure Basics',
      lessons: [
        lesson('fi-4-1', 'Market Structure Basics: Swing Highs, Swing Lows & Trend Identification'),
        lesson('fi-4-2', 'Break of Structure (BOS): Validating Structural Continuations'),
        lesson('fi-4-3', 'Change of Character (CHoCH): Spotting Early Trend Shifts & Reversals'),
        lesson('fi-4-4', 'Premium vs. Discount Pricing Zones: Fibonacci Equilibrium for Entries'),
      ],
      quiz: [
        { q: 'What constitutes a valid Break of Structure (BOS) in an established uptrend?', options: ['A decisive candle body close above the previous swing high', 'A long wick touching an indicator', 'Price dropping to support', 'A weekend gap'], answer: 0 },
        { q: 'Why is identifying Premium vs. Discount pricing critical in market structure?', options: ['Institutions buy in Discount (below equilibrium) and sell in Premium (above equilibrium)', 'It only matters for stock dividends', 'It changes broker commissions', 'It determines leverage'], answer: 0 },
      ],
    },
  ],

  // 7. FOREX ADVANCED
  'forex-advanced': [
    {
      id: 'fa-0',
      title: 'Intermediate Foundation',
      lessons: [
        lesson('fa-0-1', 'Everything covered in intermediate level'),
      ],
    },
    {
      id: 'fa-1',
      title: 'Liquidity Concepts & Liquidity Pools Architecture',
      lessons: [
        lesson('fa-1-1', 'Understanding Market Liquidity: Why Price Moves Toward Unfilled Orders'),
        lesson('fa-1-2', 'Buy-Side Liquidity (BSL) & Sell-Side Liquidity (SSL) Pools'),
        lesson('fa-1-3', 'Equal Highs (EQH) & Equal Lows (EQL): Engineered Retail Traps'),
        lesson('fa-1-4', 'Internal Range Liquidity vs. External Range Liquidity (IRL & ERL)'),
        lesson('fa-1-5', 'Session Liquidity Sweeps: Asian Range Purges & London Open Judas Swings'),
      ],
      quiz: [
        { q: 'Where do the largest institutional Buy-Side Liquidity (BSL) pools typically rest on a chart?', options: ['Directly above prominent swing highs, equal highs, and key resistance levels', 'At the center of a consolidation range', 'Below the daily low', 'Only on 1-minute charts'], answer: 0 },
        { q: 'What is the primary purpose of an institutional liquidity sweep?', options: ['Engineered smart-money participants purge retail stop losses to accumulate opposite counterpart liquidity', 'A software error by retail brokers', 'Trading halts', 'Random noise without significance'], answer: 0 },
      ],
    },
    {
      id: 'fa-2',
      title: 'Institutional Orderflow, Fair Value Gaps & Imbalances',
      lessons: [
        lesson('fa-2-1', 'Fair Value Gaps (FVG), Inefficiencies & Balanced Price Ranges (BPR)'),
        lesson('fa-2-2', 'Liquidity Voids, Volume Imbalances & Mitigation Blocks'),
        lesson('fa-2-3', 'Institutional Order Blocks (OB) & Rejection Block Delivery'),
        lesson('fa-2-4', 'Liquidity Purge & Revert: The Turtle Soup Sweep into Displacement Model'),
      ],
      quiz: [
        { q: 'A Fair Value Gap (FVG) represents…', options: ['A three-candle price imbalance where one side of the market dominated, leaving unfilled institutional resting orders', 'A flat trading day with zero volume', 'A guaranteed market reversal pattern', 'An indicator lag'], answer: 0 },
        { q: 'What validates a high-probability Order Block after a liquidity sweep?', options: ['Aggressive displacement breaking market structure with an accompanying Fair Value Gap', 'A slow sideways drift', 'Touching a 200 EMA', 'Market closing for the weekend'], answer: 0 },
      ],
    },
    {
      id: 'fa-3',
      title: 'Multi-Timeframe Liquidity Execution & Draw on Liquidity',
      lessons: [
        lesson('fa-3-1', 'Identifying the Higher-Timeframe Draw on Liquidity (DOL on Daily / 4H)'),
        lesson('fa-3-2', 'Top-Down Execution: Daily Liquidity Bias → 1H Structure → 15M/5M/1M Entries'),
        lesson('fa-3-3', 'Inducement vs. True Liquidity Targets: Protecting Against Early Traps'),
      ],
      quiz: [
        { q: 'What is meant by the "Draw on Liquidity" (DOL)?', options: ['The higher-timeframe magnetic liquidity pool or imbalance that price is algorithmically seeking next', 'The amount of cash in your broker account', 'A technical drawdown', 'Bank withdrawal fees'], answer: 0 },
        { q: 'What is the key to executing high R:R trades using multi-timeframe liquidity?', options: ['Aligning lower timeframe entry displacement with the higher-timeframe Draw on Liquidity', 'Entering immediately without confirmation on the 1-minute chart', 'Never setting a stop loss', 'Trading every session regardless of liquidity'], answer: 0 },
      ],
    },
    {
      id: 'fa-4',
      title: 'Professional Execution, Prop-Firm Rules & Risk Budgeting',
      lessons: [
        lesson('fa-4-1', 'Comprehensive Trade Journaling: Tracking Execution, Psychology & Metrics'),
        lesson('fa-4-2', 'Prop-Firm Capital Rules: Navigating Daily Drawdowns & Profit Targets'),
        lesson('fa-4-3', 'Weekly Performance Reviews & Continuous Edge Refinement'),
      ],
      quiz: [
        { q: 'What is the primary reason most traders fail funded account / prop-firm challenges?', options: ['Breaching maximum daily drawdown limits due to oversized risk and emotional revenge trading', 'Slow computer speed', 'Exchange maintenance', 'Missing weekend trades'], answer: 0 },
        { q: 'What is the central purpose of maintaining an audited trade journal?', options: ['To identify statistical strengths and recurring behavioral mistakes in your execution', 'To show friends winning trades', 'To eliminate market risk entirely', 'To predict news headlines'], answer: 0 },
      ],
    },
  ],
}

export const allLessons = (programId) => (curriculum[programId] || []).flatMap((m) => m.lessons)
