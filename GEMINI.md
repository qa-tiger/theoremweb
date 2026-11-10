# GEMINI.md — Project Architecture, File Registry & Token Optimization Rules

> **Purpose:** This file provides the operating guidelines for Gemini/Antigravity to minimize token consumption per turn, avoid redundant file scans, and instantly locate components, routes, configs, and utilities across the Theorem Academy codebase.

---

## 1. Operating & Development Guidelines (Balanced Mode)

1. **Smart Navigation & Code Search:**
   - Use the **Codebase File Index** and lookup matrix below as the primary reference to quickly locate relevant files.
   - Targeted grep/string searches (`Select-String` or find) across `src/` are fully permitted whenever tracing symbols, hooks, routes, or dependencies.

2. **Context-Aware File Reads:**
   - Prefer bounded reads (e.g. 50–150 lines) when inspecting specific functions or sections.
   - Reading larger sections or complete files is permitted whenever necessary to understand full component architectures, cross-file imports, or complex bug investigations.

3. **Pragmatic Editing:**
   - Use surgical `edit_file` for targeted single-block replacements.
   - Use `write_file` freely when replacing entire components, restructuring files, or when line-ending/whitespace mismatches hinder precision edits.

4. **Clear & Helpful Communication:**
   - Provide clear, direct explanations with code links and concise summaries. Detailed context can be provided when diagnosing non-trivial bugs.

5. **Single Source of Truth & Git Repositories:**
   - **Primary Repository:** `c:\Users\ABC\Desktop\theoremweb-main-git` (`origin https://github.com/qa-tiger/theoremweb.git`, branch `main`).
   - **Active Development Rule:** All edits and active development are conducted exclusively in `theoremweb-main-git`. Do not make edits in other mirrors.

---

## 2. Quick Keyword-to-File Lookup Matrix

| Feature / Topic | File Location | Key Functions / Constants |
| :--- | :--- | :--- |
| **SEO Meta, OpenGraph & JSON-LD** | `src/components/SEO.jsx` | `<SEO />`, `setMetaTag`, `setCanonical` |
| **Google Schema & Site HTML** | `index.html` | Schema.org (`EducationalOrganization`, `Course`, `FAQPage`) |
| **Crawlers & Search Indexing** | `public/robots.txt`, `public/sitemap.xml` | Bot rules, page URLs & priorities |
| **Route Code Splitting & Layout** | `src/App.jsx` | `React.lazy()`, `<Suspense>`, `<Layout>` |
| **Bundle Chunking & Rollup Config** | `vite.config.js` | Rolldown `manualChunks` (`vendor-react`, `vendor-supabase`) |
| **Curriculum Roadmap (S-Curve)** | `src/components/LearningRoadmap.jsx` | SVG S-Path, 3 milestones, Final Goal, awards |
| **Intro Silver Coin 3D Gate** | `src/components/TheoremIntroGate.jsx` | 3D Coin animation, Gold/SPX orbital tokens |
| **Hero Background Scenes** | `src/components/HeroVisualBackground.jsx` | Offline/Online atmospheric canvas backdrop |
| **Campus Showcase Card** | `src/components/CampusShowcase.jsx` | Offline floor vs Online interactive card |
| **Curriculum Data by Market** | `src/config/curriculum.js` | `curriculum` (Forex, Crypto, Equities, Indices, Commodities) |
| **Global Site Config & Addresses** | `src/config/site.js` | `site`, `locations` (UAE & Mumbai), `teachers`, `programs` |
| **Free E-Books Catalogue** | `src/config/ebooks.js` | `EBOOKS`, `EBOOK_CATEGORIES`, download URLs |
| **Homepage** | `src/pages/Home.jsx` | `Hero`, `HybridExperience`, `LearningRoadmap`, `Stories`, `Faq` |
| **Course Listing & Course Detail** | `src/pages/Programs.jsx` | `Programs()` (matrix), `ProgramDetail()` (syllabus & outcomes) |
| **Student Registration & Global KYC** | `src/pages/Auth.jsx` | `Login`, `Register` (Aadhaar/PAN for IN, National ID for global) |
| **Student Pay Fees & UPI / QR** | `src/pages/portal/PayFees.jsx` | Geo-detection (INR/AED/USD), GPay/PhonePe SVGs, 30s auto-hide QR |
| **Careers Page** | `src/pages/Careers.jsx` | Open roles (Faculty, Operations, Platform Tech) |
| **Admissions Contact & Booking** | `src/pages/Contact.jsx` | `EnquiryForm`, location cards, WhatsApp links |
| **Free E-Books Download Page** | `src/pages/Technology.jsx` | Book search, category filters, lead modal |
| **Design System & Atoms** | `src/components/ui.jsx` | `ProgramCards`, `ProgramMatrix`, `FacultyProfile`, `Ticket` |
| **Modular Home Sections** | `src/components/sections.jsx` | `HybridExperience`, `Stories`, `Faq`, `FinalCta`, `Offer` |
| **Global Tailwind & Theme CSS** | `src/index.css` | `#07070a`, glowing badges, gold accents, buttons |

---

## 3. Comprehensive Codebase File Index

### Root Configuration
- **`index.html`**
  - Primary document shell, mobile viewport meta, Google fonts preconnect, favicon references.
  - Hardcoded global Schema.org JSON-LD graph (`EducationalOrganization` with Sharjah Media City UAE & Vasai West Mumbai branches, `Course`, `FAQPage`).
- **`vite.config.js`**
  - Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`.
  - Rolldown `build.rollupOptions.output.manualChunks(id)` function splitting `vendor-react` and `vendor-supabase`.
- **`package.json`**
  - Dependencies: React 19, React Router DOM 7, Supabase JS, Tailwind CSS 4.
  - Scripts: `dev`, `build`, `preview`, `lint`.
- **`netlify.toml` / `public/_redirects`**
  - SPA routing fallback rules (`/* /index.html 200`).

---

### Configuration (`src/config/`)
- **`src/config/site.js`**
  - `site`: Brand name, domain (`https://theoreminstitute.com`), WhatsApp number, contact emails, student review statistics (4.9 rating, 120+ reviews).
  - `locations`: Physical training floors in Sharjah Media City (UAE) and Vasai West, Mumbai (India).
  - `programs`: Master definition of the 5 core market programs (Forex, Crypto, Equities, Indices, Commodities).
  - `teachers`: Lead mentors (Farhan Ahmed, Sohail Ahmed) and their taught markets.
  - `bundlePackage`: All-programs bundle definition with 40% discount flag.
- **`src/config/curriculum.js`**
  - Hierarchical syllabus data keyed by program ID (`forex`, `crypto`, `equities`, `indices`, `commodities`).
  - Structured into sequential modules containing module titles and lesson arrays.
- **`src/config/ebooks.js`**
  - Catalog of institutional trading e-books (titles, descriptions, cover badges, download endpoints).

---

### Core UI Components (`src/components/`)
- **`src/components/SEO.jsx`**
  - Dynamic head manager injecting `title`, `meta[name="description"]`, `meta[name="keywords"]`, canonical `<link>`, OpenGraph tags, Twitter Card tags, and optional custom JSON-LD `<script>`.
- **`src/components/Layout.jsx`**
  - Navigation header with desktop links, mobile hamburger drawer, and register CTA.
  - Comprehensive footer with market links, academy locations, student portal access, and copyright.
- **`src/components/LearningRoadmap.jsx`**
  - "What You Will Get From This Course" desktop SVG canvas and mobile vertical timeline.
  - 3 Milestones: *Core Knowledge* (top), *Hands-on Experience* (middle), *Advanced Chart Reading* (bottom).
  - *Final Goal* destination node + *Skill Mastery* & *Certificate of Completion* award cards.
- **`src/components/TheoremIntroGate.jsx`**
  - Interactive entry screen with embossed 3D silver coin, orbital trading tickers (Gold, SPX), and seamless dismiss animation.
- **`src/components/HeroVisualBackground.jsx`**
  - Dark luxury gradient backdrops with auto-rotating scenes representing offline floors and live online terminals.
- **`src/components/CampusShowcase.jsx`**
  - Interactive preview card allowing prospective students to toggle between physical floor images and virtual live cohorts.
- **`src/components/sections.jsx`**
  - Reusable page sections: `HybridExperience` (3 core academy pillars), `Stories` (Google student testimonials), `Faq` (accordion), `FinalCta` (conversion card), `Offer`, `PageHeader`.
- **`src/components/ui.jsx`**
  - Reusable presentation components: `ProgramCards`, `ProgramMatrix`, `FacultyProfile`, `Ticket`, `Section`, `Badge`.
- **`src/components/Modal.jsx`**
  - Accessible dialog overlay used for lead generation and e-book downloads.
- **`src/components/Board.jsx`**
  - Market ticker tape displaying live currency pairs and instrument quotes.

---

### Application Pages (`src/pages/`)
- **`src/pages/Home.jsx`**
  - Landing page aggregating Hero, HybridExperience, LearningRoadmap, Testimonials, FAQ, and FinalCTA.
- **`src/pages/Programs.jsx`**
  - `Programs`: All-programs catalog with 5-column market filter matrix, bundle banner, and curriculum highlights.
  - `ProgramDetail`: Individual market landing page with audience criteria, learning outcomes, module breakdown, and dynamic Course Schema.org JSON-LD.
- **`src/pages/About.jsx`**
  - Institutional philosophy, pedagogy standards, small cohort policy, and faculty background.
- **`src/pages/Careers.jsx`**
  - Open positions across Trading Instruction, Market Analysis, Student Advisory, and Technical Platform Infrastructure.
- **`src/pages/Contact.jsx`**
  - Admissions contact desk, consultation scheduling, campus addresses with interactive maps, and direct WhatsApp routing.
- **`src/pages/Technology.jsx`**
  - Free institutional knowledge toolkit featuring downloadable PDF trading guides and lead capture.
- **`src/pages/Mentors.jsx`**
  - Instructor profiles, professional trading backgrounds, and platform engineering support profiles.
- **`src/pages/Auth.jsx`**
  - Authentication portal: Student Login, Password Reset, and Register flow featuring international KYC (National ID / Passport) alongside India's Aadhaar/PAN flow.
- **`src/pages/Checkout.jsx`**
  - Student enrollment checkout, payment mode selection, and batch scheduling.
- **`src/pages/Privacy.jsx` & `src/pages/Terms.jsx`**
  - Official privacy policies, data protection practices, and student service terms.
- **`src/pages/NotFound.jsx`**
  - Clean 404 error template with return-to-home navigation.

---

### Student Portal (`src/pages/portal/`)
- **`src/pages/portal/Portal.jsx`**
  - Student dashboard showing active cohort, enrolled courses, syllabus progress, and live batch schedules.
- **`src/pages/portal/Course.jsx`**
  - LMS video classroom interface with sequential lesson navigation, lecture resources, and completion marking.
- **`src/pages/portal/PayFees.jsx`**
  - Fee payment screen with regional currency detection (INR / AED / USD), official banking details, official GPay / PhonePe / BHIM UPI SVGs, and a 30-second security auto-hide QR code.
- **`src/pages/portal/Certificates.jsx`**
  - Digital course completion certificates with verification hashes.
- **`src/pages/portal/Support.jsx`**
  - Student help desk, assignment review requests, and mentor 1-on-1 booking.

---

### Libraries & Backend Integration (`src/lib/`)
- **`src/lib/api.js`**
  - API client methods for enquiries, mock fallbacks, lead generation, and course data.
- **`src/lib/auth.jsx`**
  - `AuthProvider` and `useAuth` hook managing authenticated student sessions via Supabase and LocalStorage.
- **`src/lib/supabase.js`**
  - Supabase client initialization using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **`src/lib/pricing.js`**
  - Currency conversion utilities, regional pricing rules, and bundle discount calculations.
- **`src/lib/leads.js`**
  - Lead collection storage and analytics capture for e-book downloads.

---

### Public Assets (`public/`)
- **`public/robots.txt`**: Bot crawl directives protecting private routes (`/portal/*`, `/checkout`, `/login`).
- **`public/sitemap.xml`**: Complete search engine sitemap mapping all courses and institutional pages.
- **`public/campus/`**: Campus photography (Sharjah & Mumbai floors, lecture halls, trading stations).
- **`public/mentors/`**: Mentor profile images.
- **`public/favicon.svg`**, **`public/theorem-logo.png`**, **`public/theorem-icon.png`**: Official brand iconography.

---

## 4. Build & Deployment Quick Commands

- **Run Dev Server:** `npm run dev`
- **Build Production Bundle:** `npm run build` *(generates split chunks in `/dist`)*
- **Preview Production Build:** `npm run preview`
- **Lint Codebase:** `npm run lint`
- **Git Push Remote:** `origin https://github.com/qa-tiger/theoremweb.git` (branch `main`)
