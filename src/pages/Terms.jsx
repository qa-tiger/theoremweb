import { Link } from 'react-router-dom'
import { PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import { site } from '../config/site'

export default function Terms() {
  usePageTitle('User Agreement & Terms of Service')

  return (
    <>
      <PageHeader
        back={{ to: '/', label: 'Home' }}
        title="User Agreement & Terms of Service"
        intro="The terms, student obligations, and educational policies governing your enrollment and use of Theorem Academy."
      />

      <Section tight className="bg-[#08080a] text-white">
        <div className="max-w-4xl mx-auto space-y-10 text-xs sm:text-sm text-white/80 leading-relaxed">
          
          {/* Regulatory & Educational Nature Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-signal/10 border border-signal/30 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <h2 className="font-display text-sm sm:text-base font-bold text-signal">
                Educational Program Disclaimer
              </h2>
            </div>
            <p className="text-xs text-white/75 leading-relaxed">
              Theorem Academy provides financial market educational courses and conceptual training only. We do not provide financial advice, investment advice, trade recommendations, portfolio management, or trade signals. Trading in financial markets carries substantial risk of capital loss. Past performance of any setup or mentor demonstration is not indicative of future results.
            </p>
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              1. Acceptance of Terms & Student Agreement
            </h3>
            <p>
              By accessing our website, registering an account, downloading study resources, or enrolling in any cohort program, you agree to be bound by this User Agreement and our{' '}
              <Link to="/privacy" className="text-signal underline hover:text-white">
                DPDP Act Privacy Policy
              </Link>.
              If you do not agree with any part of these terms, you must not register or use our services.
            </p>
          </section>

          {/* Section 2: Educational Scope & Non-Advisory Nature */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              2. Educational Scope & No Advisory Services
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Pure Education:</strong> All courses, mentor sessions, slide decks, workbooks, chart case studies, and portal exercises are strictly for academic and illustrative purposes.
              </li>
              <li>
                <strong className="text-white">No Trading Advice or Signals:</strong> Neither Theorem Academy nor its mentors provide buy/sell signals, tips, stock recommendations, or personal investment advice. Mentors guide students on how to read market structure, manage risk boundaries, and develop independent trading plans.
              </li>
              <li>
                <strong className="text-white">Simulated & Demo Lab Practice:</strong> Students are instructed to practice execution rules and sizing formulas strictly on demo accounts or simulation environments during the course.
              </li>
              <li>
                <strong className="text-white">Personal Responsibility:</strong> Any real-capital market participation conducted by a student is undertaken at their sole discretion and financial risk. Theorem Academy assumes no liability for trading losses incurred.
              </li>
            </ul>
          </section>

          {/* Section 3: Certificate of Course Completion */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              3. Certificate of Course Completion
            </h3>
            <p>
              Theorem Academy issues an official <strong>Certificate of Course Completion</strong> to students who successfully finish their enrolled program.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Nature of Certificate:</strong> The certificate recognizes completion of professional vocational training in financial market analysis. It is an academy Certificate of Course Completion, not an academic university degree or certificate of graduation.
              </li>
              <li>
                <strong>Completion Criteria:</strong> To be eligible for the certificate, the student must complete all syllabus modules, achieve passing marks on module quizzes, submit their assignment journal for mentor review, and document their personalized written trading plan.
              </li>
            </ul>
          </section>

          {/* Section 4: Intellectual Property & Portal Access */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              4. Intellectual Property & Code of Conduct
            </h3>
            <p>
              All curriculum content, video sessions, frameworks, trade journal templates, and software tools provided by Theorem Academy are proprietary intellectual property:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Course materials are licensed strictly for the individual student's personal educational use.</li>
              <li>Recording, broadcasting, redistributing, reselling, or commercially exploiting our lectures, mentor reviews, or study workbooks without prior written consent is strictly prohibited and subject to legal action.</li>
              <li>Students must maintain mutual respect and professional decorum in all community forums, classroom sessions, and mentor interactions.</li>
            </ul>
          </section>

          {/* Section 5: Verification & Indian KYC Compliance */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              5. Identity Verification (KYC) for Indian Students
            </h3>
            <p>
              In accordance with institutional guidelines and government regulations in India, students residing in India must provide valid identity verification (Aadhaar or PAN) prior to program commencement. Personal data provided during KYC is processed with end-to-end encryption in strict adherence to the Digital Personal Data Protection Act, 2023.
            </p>
          </section>

          {/* Section 6: Fees, Refunds & Batch Policies */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              6. Fees, Attendance & Refund Policies
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Program fees must be paid in full or under an authorized installment schedule prior to accessing live cohorts and mentor review desks.</li>
              <li>We offer a satisfaction guarantee window as specified at the time of enrollment (subject to active attendance and compliance with academy code of conduct).</li>
              <li>Batch deferrals or transfers between online and in-person formats are accommodated based on cohort capacity and require notice to the admissions desk.</li>
            </ul>
          </section>

          {/* Section 7: Governing Law & Jurisdiction */}
          <section className="space-y-3">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              7. Governing Law & Dispute Resolution
            </h3>
            <p>
              This User Agreement is governed by the laws of India and the Emirate of Dubai (UAE) applicable to institutional educational entities:
            </p>
            <div className="card-rich p-4 rounded-xl border border-white/10 space-y-1 text-xs">
              <p><strong className="text-white">India Operations Jurisdiction:</strong> Courts of Vasai-Virar / Thane / Mumbai, Maharashtra, India.</p>
              <p><strong className="text-white">UAE Operations Jurisdiction:</strong> Courts of Dubai, United Arab Emirates.</p>
              <p><strong className="text-white">Contact for Legal Notices:</strong> <a href={`mailto:${site.email}`} className="text-signal underline">{site.email}</a></p>
            </div>
            <p className="text-xs text-white/50 pt-2">
              Last updated: October 2026. Theorem Academy reserves the right to modify this agreement with notice posted on our website.
            </p>
          </section>

        </div>
      </Section>
    </>
  )
}

