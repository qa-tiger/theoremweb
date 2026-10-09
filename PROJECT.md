# Theorem Institute — Project Context & Documentation

> **AI Context & Developer Guide**: This document provides the complete architecture, brand guidelines, content structure, component hierarchy, and design specifications for the **Theorem Institute** web platform. Use this file to understand the project instantly without inspecting all source files.

---

## 1. Executive Summary & Brand Identity

* **Institution Name**: Theorem Institute (also referred to as Theorem Academy)
* **Core Value Proposition**: A premier institutional trading academy providing structured, risk-first education across **Forex**, **Crypto**, and **Equity** markets.
* **Campus Presence**:
  * 🇦🇪 **Dubai**: Business Bay Trading Floor & Executive Labs
  * 🇮🇳 **India**: Institutional Classrooms & Tech Labs
  * 🌐 **Online**: Live Interactive Cohorts with 24/7 Portal Recordings
* **Strict Educational Compliance**:
  * **Purely Educational**: Theorem Institute is an academic training academy, NOT a broker, financial advisor, or signal service.
  * **Forbidden Concepts**: Never include trading signals, "% profit guarantees", "trade with us", prop-firm evaluation passes, or get-rich messaging.
  * **Allowed Frameworks**: Systematic risk rules (strict 1% risk allocation), order flow analysis, Depth of Market (DOM) heatmaps, Volume Profiles, trade journaling, top-down price action, and mentor-led **assignment reviews**.

---

## 2. Tech Stack & Architecture

* **Frontend Framework**: React 19 (SPA)
* **Bundler & Build Tool**: Vite 8 (`npm run dev`, `npm run build`)
* **Styling**: Tailwind CSS v4 (configured via `@theme` in `src/index.css`)
* **Routing**: React Router DOM v7 (Client-side browser routing with full catch-all Netlify support via `netlify.toml` and `public/_redirects`)
* **State & Authentication**: Context-based mock authentication (`src/lib/auth.jsx`) with browser `localStorage` persistence (`src/lib/api.js`) for seamless zero-backend frontend demoing.
* **Icons & Animation**: Custom inline SVGs, CSS keyframe animations (split-flap display board, gold shimmer ribbons, 3D CSS perspective coin rotations, radar pings).

---

## 3. Directory Structure & Key Files

```
theoremacademy-main/
├── index.html                   # HTML entry point with fonts & metadata
├── netlify.toml                 # Netlify deployment rules & SPA redirects
├── package.json                 # Project dependencies & scripts
├── public/
│   ├── _redirects               # Netlify SPA catch-all rule (/* /index.html 200)
│   └── favicon.svg              # Brand monogram favicon
├── src/
│   ├── App.jsx                  # Root router configuration & route definitions
│   ├── index.css                # Tailwind CSS v4 setup, color tokens, animations
│   ├── main.jsx                 # React root render
│   │
│   ├── components/              # Reusable UI & Complex Visual Elements
│   │   ├── Board.jsx            # Split-flap active global trading session board
│   │   ├── DubaiCampusShowcase.jsx # Interactive multi-campus viewer (Dubai/India/Online)
│   │   ├── HeroVisualBackground.jsx# Smooth rotating ambient backgrounds (Dubai skyline, etc.)
│   │   ├── Layout.jsx           # Main Navigation Bar, Knowledge Toolkit dropdown, Footer
│   │   ├── Modal.jsx            # Accessible dialog modal component
│   │   ├── TheoremIntroGate.jsx # Interactive 3D spinning coin welcome gate ($ / ₿)
│   │   ├── TradingTerminalVisual.jsx# Interactive institutional charting & orderbook mock terminal
│   │   ├── sections.jsx         # Section blocks (Hero, FactsStrip, HybridExperience, Offer, FAQ, etc.)
│   │   └── ui.jsx               # Atomic components (ProgramBoard, ProgramCards, Section, Ticket, etc.)
│   │
│   ├── config/                  # Single Source of Truth for Data & Content
│   │   ├── site.js              # Site metadata, 9 core courses, mentors, testimonials, free e-books
│   │   └── curriculum.js        # Detailed syllabus, module lessons, quiz questions & answers
│   │
│   ├── lib/                     # Mock Data & Client-side API
│   │   ├── api.js               # Mock backend database (localStorage-based courses, progress, quizzes)
│   │   └── auth.jsx             # AuthContext provider (login, logout, session state)
│   │
│   └── pages/                   # Application Pages & Route Views
│       ├── Home.jsx             # Homepage with Hero, Trust bar, Campus showcase, Team, Reviews
│       ├── Programs.jsx         # All programs catalog, 40% bundle promo, Program detail view
│       ├── Technology.jsx       # Knowledge Toolkit (Free E-Books, DOM Software, Hardware Labs)
│       ├── About.jsx            # Philosophy, Classroom photo gallery, Video tours, Reviews
│       ├── Mentors.jsx          # Our Team & Lead Instructor faculty profiles
│       ├── Contact.jsx          # Inquiry form, location details, WhatsApp links
│       ├── Auth.jsx             # Login & Student registration
│       ├── Checkout.jsx         # Enrollment & checkout simulation
│       ├── NotFound.jsx         # 404 handler
│       └── portal/              # Student Portal (Protected area)
│           ├── Portal.jsx       # Dashboard (enrolled courses, progress bars)
│           ├── Course.jsx       # Interactive LMS lesson player, video notes, quizzes
│           ├── Certificates.jsx # Verified Certificate of Graduation viewer & downloader
│           └── Support.jsx      # Help desk & ticket submission
```

---

## 4. Course Offerings & Curriculum Hierarchy

Programs are structured across **3 Core Asset Classes** with **3 Proficiency Levels** each (9 Total Programs):

| Asset Class | Levels Available | Focus & Key Deliverables |
| :--- | :--- | :--- |
| **Forex** | Basic, Intermediate, Advanced | Currency pairs, liquidity sweeps, Fair Value Gaps (FVG), London/NY overlaps, 1% risk rules |
| **Crypto** | Basic, Intermediate, Advanced | Spot/Perpetual futures, on-chain metrics, funding rates, cold-storage, liquidation heatmaps |
| **Equity** | Basic, Intermediate, Advanced | Indian (NSE/BSE) & US Equities, Stage Analysis, Volume Price Analysis (VPA), Options hedging |

* **Promotional Banner**: *"Learn all programs and save 40%"* (All-Track Master Pass combining Forex, Crypto, and Equity tracks).
* **Pricing Policy**: Public prices are withheld in favor of direct **"Contact Us"** and **WhatsApp** admission desk inquiries.

---

## 5. UI / UX Design System

### Color Palette (Dark Luxury Trading Floor Aesthetic)
* **Background Deep**: `#07070a`, `#0d0d12`, `#121218`
* **Card Panels**: `#14141c`, `#1a1a22` with subtle borders (`border-white/10`)
* **Signal Brand Accent**: `#f2b134` / Gold (`text-signal`, `bg-signal`, `gold-foil-text`)
* **Bullish Green**: `#10b981` (`text-bull`, `bg-bull`)
* **Bearish Red**: `#ef4444` (`text-bear`, `bg-bear`)

### Signature Interactive Components
1. **TheoremIntroGate**: Introductory overlay featuring an interactive 3D spinning coin with `$` on one side and `₿` on the reverse, surrounded by floating asset badges (`Learn Crypto`, `Learn Forex`, `Learn Equity`).
2. **TradingTerminalVisual**: Visual representation of an institutional order execution terminal with real-time price tickers, orderbook depth of market (DOM), and mentor assignment verification stamps.
3. **SessionBoard**: Realistic mechanical split-flap flight-board displaying active Forex sessions across London, New York, Tokyo, Sydney with real-time countdown clocks.
4. **DubaiCampusShowcase**: Interactive photo selector showcasing Dubai Business Bay desks, India trading labs, and Live Online Zoom masterclasses.

---

## 6. Key Business & Content Guidelines for Future Prompts

1. **Terminology Rules**:
   * Use **"Assignment Review"** instead of "Trade Review".
   * Use **"Free E-Books"** instead of "Handbooks".
   * Use **"Our Team"** instead of "Mentors" for the main faculty navigation.
   * Use **"Knowledge Toolkit"** instead of "Technology" in the top navigation.
2. **Locations**:
   * Always format campus presence as: `🇮🇳 India • 🇦🇪 Dubai • 🌐 Online`.
3. **Adding / Modifying Courses**:
   * Update metadata in `src/config/site.js` under `programs`.
   * Update module lessons and quizzes in `src/config/curriculum.js`.
4. **Building for Production**:
   * Run `npm run build` or `npx.cmd vite build`.
   * Compiled static assets are output to `dist/`.

