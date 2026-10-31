import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import SiteLayout from './components/Layout'
import { AuthProvider, RequireAuth } from './lib/auth'

// Route-based code splitting for lightning-fast initial load times
const Home = lazy(() => import('./pages/Home'))
const Programs = lazy(() => import('./pages/Programs').then((m) => ({ default: m.Programs })))
const ProgramDetail = lazy(() => import('./pages/Programs').then((m) => ({ default: m.ProgramDetail })))
const Technology = lazy(() => import('./pages/Technology'))
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
const Mentors = lazy(() => import('./pages/Mentors'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Login = lazy(() => import('./pages/Auth').then((m) => ({ default: m.Login })))
const Register = lazy(() => import('./pages/Auth').then((m) => ({ default: m.Register })))
const Checkout = lazy(() => import('./pages/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Private Student Portal (Code-Split)
const PortalLayout = lazy(() => import('./pages/portal/Portal').then((m) => ({ default: m.PortalLayout })))
const Dashboard = lazy(() => import('./pages/portal/Portal').then((m) => ({ default: m.Dashboard })))
const Course = lazy(() => import('./pages/portal/Course'))
const Certificates = lazy(() => import('./pages/portal/Certificates'))
const Support = lazy(() => import('./pages/portal/Support'))
const PayFees = lazy(() => import('./pages/portal/PayFees'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView())
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function PageFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#07070a] text-white select-none px-4">
      <div className="relative flex items-center justify-center mb-4">
        <div className="size-9 rounded-full border-2 border-white/10 border-t-white animate-spin" />
        <span className="absolute size-2 rounded-full bg-white animate-ping opacity-50" />
      </div>
      <p className="text-[0.68rem] font-bold uppercase tracking-widest text-white/50">
        Loading Theorem...
      </p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="programs" element={<Programs />} />
              <Route path="programs/:programId" element={<ProgramDetail />} />
              <Route path="technology" element={<Technology />} />
              <Route path="technology/tools" element={<Technology />} />
              <Route path="tools" element={<Technology />} />
              <Route path="ebooks" element={<Technology />} />
              <Route path="free-ebooks" element={<Technology />} />
              <Route path="about" element={<About />} />
              <Route path="careers" element={<Careers />} />
              <Route path="mentors" element={<Mentors />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="user-agreement" element={<Terms />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="checkout/:programId" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="portal" element={<RequireAuth><PortalLayout /></RequireAuth>}>
                <Route index element={<Dashboard />} />
                <Route path="course/:programId" element={<Course />} />
                <Route path="fees" element={<PayFees />} />
                <Route path="pay-fees" element={<PayFees />} />
                <Route path="certificates" element={<Certificates />} />
                <Route path="support" element={<Support />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
