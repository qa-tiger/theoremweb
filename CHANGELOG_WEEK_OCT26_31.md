# Weekly Development Changelog
**Period:** October 26, 2026 – October 31, 2026  
**Project:** Theorem Academy ([github.com/qa-tiger/theoremweb](https://github.com/qa-tiger/theoremweb))

---

### 1. Visual Identity & Hero Section
- **Silver Coin 3D Intro Gate:** Scaled up the silver coin asset, enlarged the embossed THEOREM wordmark, added orbital Gold and SPX ticker symbols, and harmonized the rotation cadence.
- **Campus Showcase Card:** Added real images for in-person floor and online live cohorts with auto-rotating scenes, ambient halo lighting, and natural brightness tuning without top veil overlays.
- **Hero Grid Cleanup:** Removed distracting background grid lines for a cleaner, executive luxury aesthetic.
- **Social Proof:** Added real verified Google Student Reviews and an official Google Review rating badge.

---

### 2. Student Learning Roadmap ("What You Will Get From This Course")
- **Interactive S-Curve Animation:** Built a responsive S-path connector with radiant white laser glow and a traveling laser comet guided by smooth scroll damping.
- **Layout & Overlap Resolution:** Eliminated all collisions between milestone nodes, map pin icons, "Final Goal", and graduation achievement badges.
- **Card Simplification:** Removed numbering and dense subtext to spotlight three concise pillars: *Core Knowledge*, *Hands-on Experience*, and *Advanced Chart Reading*.
- **Background De-Cluttering:** Removed background stars and pulsating ring animations to maintain visual hierarchy.

---

### 3. Curriculum & Course Architecture
- **Market & Level Selector Matrix:** Replaced flat lists with an interactive 5-column curriculum matrix covering Forex, Crypto, Equities, Indices, and Commodities.
- **Forex Syllabus Modernization:** Moved market structure basics to Intermediate Forex, and restructured Advanced Forex around institutional order flow and liquidity concepts.
- **Macro Fundamentals Integration:** Added central bank interest rate bias, economic data releases, and news catalysts to Forex Intermediate.
- **Curriculum Cleanup:** Stripped out artificial question counters and random minute duration labels in favor of clear, milestone-driven lesson modules.

---

### 4. Student Portal & Payment Gateway
- **Institutional Fee Payment Flow:** Built a regional pay fees interface with automatic geo-detection (INR / AED / USD) and official banking coordinates.
- **UPI & QR Integration:** Embedded official brand SVGs for Google Pay, PhonePe, and BHIM UPI with an interactive 30-second security auto-hide QR code.
- **Geo-Location Detection Fix:** Prioritized IST timezone detection to eliminate false UAE fallbacks for domestic Indian students.
- **Sidebar & Portal Layout Polish:** Fixed sidebar wordmark tagline overlap and removed artificial percentage trackers in favor of clean active/enrolled status badges.
- **Certificates Section Refinement:** Removed duplicate enrolled program blocks from the certificates view.

---

### 5. Knowledge Toolkit & Institutional Pages
- **Free Trading E-Book Library:** Created a dedicated knowledge resource page with category filters, keyword search, and modal lead capture.
- **Careers Page:** Added a dedicated careers portal outlining teaching, research, operational, and student advisory opportunities.
- **Multi-Campus Campus Addresses:** Updated official verified address coordinates for Sharjah Media City (UAE) and Vasai West, Mumbai (India).

---

### 6. Code Optimization & Google SEO (October 31)
- **Route Code Splitting:** Implemented `React.lazy()` with luxury `<Suspense>` loaders, slashing entry JavaScript payload from ~780 kB to **35.2 kB** (9.9 kB gzipped).
- **Vite Bundler Optimization:** Configured Rolldown vendor chunk splitting isolating `vendor-react` and `vendor-supabase` for enhanced mobile caching and INP/LCP scores.
- **Dynamic SEO Component (`SEO.jsx`):** Automated per-route titles, meta descriptions, target keywords, canonical links, OpenGraph cards, and Twitter Cards across all pages.
- **Schema.org Structured Data:** Injected Google-compliant rich snippets for `EducationalOrganization` (both physical campuses), `Course`, and `FAQPage`.
- **Search Engine Directives:** Created `robots.txt` and a complete `sitemap.xml` covering all public programs and pages.
