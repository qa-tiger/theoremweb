import { Link } from 'react-router-dom'
import { PageHeader, usePageTitle } from '../components/sections'
import { Section } from '../components/ui'
import { site } from '../config/site'

export default function Privacy() {
  usePageTitle('Privacy Policy & DPDP Act Notice')

  return (
    <>
      <PageHeader
        back={{ to: '/', label: 'Home' }}
        title="Privacy Policy & DPDP Act Notice"
        intro="How Theorem Academy collects, manages, and protects your personal data in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and international data privacy standards."
      />

      <Section tight className="bg-[#08080a] text-white">
        <div className="max-w-4xl mx-auto space-y-10 text-xs sm:text-sm text-white/80 leading-relaxed">
          
          {/* Key Compliance Badge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-signal/10 border border-signal/30 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <h2 className="font-display text-sm sm:text-base font-bold text-signal">
                Digital Personal Data Protection Act, 2023 (DPDP Act) Compliance
              </h2>
            </div>
            <p className="text-xs text-white/75">
              Theorem Academy is committed to respecting your privacy and protecting personal data. This policy serves as our statutory notice under Section 5 of the Digital Personal Data Protection Act, 2023 (India) and details how your personal data is collected, processed, and safeguarded.
            </p>
          </div>

          {/* Section 1: Data Fiduciary Identity */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              1. Identity and Contact of the Data Fiduciary
            </h3>
            <p>
              Under the DPDP Act 2023, <strong>Theorem Academy</strong> functions as the Data Fiduciary responsible for deciding the purpose and means of processing your personal data.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
              <p><strong className="text-white">Registered India Address:</strong> 3rd Floor, Ambika Niwas, behind Tungareshwar Sweets, Gurunanak nagar, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202</p>
              <p><strong className="text-white">Dubai Facility:</strong> Business Bay, Dubai, United Arab Emirates</p>
              <p><strong className="text-white">Official Communications:</strong> <a href={`mailto:${site.email}`} className="text-signal underline">{site.email}</a></p>
              <p><strong className="text-white">Data Grievance Officer Email:</strong> <a href="mailto:privacy@theoremacademy.com" className="text-signal underline">privacy@theoremacademy.com</a></p>
            </div>
          </section>

          {/* Section 2: Personal Data We Collect */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              2. Categories of Personal Data Collected
            </h3>
            <p>
              We collect only the minimum digital personal data necessary to provide our educational curriculum, study materials, and student portal access:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Contact & Identity Details:</strong> Full legal name, email address, WhatsApp / phone number, city, and country of residence.
              </li>
              <li>
                <strong className="text-white">Government ID for Indian KYC:</strong> Aadhaar number or Permanent Account Number (PAN) along with identity document uploads, collected strictly for regulatory identity verification for students residing in India.
              </li>
              <li>
                <strong className="text-white">Academic & Learning Records:</strong> Enrolled courses, quiz results, module completion progress, assignment case study journals, and official Certificates of Course Completion.
              </li>
              <li>
                <strong className="text-white">Account & Portal Authentication:</strong> Encrypted password hashes (salted with bcrypt), session authentication tokens, and portal usage activity logs.
              </li>
              <li>
                <strong className="text-white">Inquiry & Resource Requests:</strong> Records of free study e-book downloads, contact form messages, and counselor interaction notes.
              </li>
            </ul>
          </section>

          {/* Section 3: Purpose of Data Collection */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              3. Purpose and Legal Basis for Processing
            </h3>
            <p>
              In accordance with Section 4 and Section 6 of the DPDP Act 2023, your personal data is processed solely for lawful and specified educational purposes based on your explicit, informed consent:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Administering student onboarding, course enrollments, and batch scheduling.</li>
              <li>Delivering free study resources, workbooks, and curriculum materials.</li>
              <li>Facilitating 1-on-1 mentor reviews of assignments and case studies.</li>
              <li>Issuing official Certificates of Course Completion upon finishing all modules.</li>
              <li>Communicating critical cohort timings, portal updates, and administrative notices.</li>
              <li>Fulfilling legal and regulatory identity verification requirements (KYC).</li>
            </ul>
          </section>

          {/* Section 4: Student Consent Mechanism */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              4. Notice and Consent (Section 6, DPDP Act 2023)
            </h3>
            <p>
              By checking our consent checkboxes on enrollment, registration, or e-book download forms, you provide free, specific, informed, unconditional, and unambiguous consent for Theorem Academy to process your personal data for the specified purposes.
            </p>
            <p>
              <strong>Right to Withdraw Consent:</strong> You have the right to withdraw your consent at any time by emailing our Grievance Desk at <a href="mailto:privacy@theoremacademy.com" className="text-signal underline">privacy@theoremacademy.com</a>. Upon receiving your withdrawal notice, we will cease processing your personal data within 7 business days, unless retention is mandated by law or necessary for issuing verified course completion records.
            </p>
          </section>

          {/* Section 5: Rights of the Data Principal */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              5. Rights of the Data Principal (Sections 11–14, DPDP Act 2023)
            </h3>
            <p>
              As a Data Principal under Indian law, you are entitled to exercise the following statutory rights:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white mb-1">Right to Access</h4>
                <p className="text-white/70 text-xs">Obtain a summary of personal data held about you and processing activities undertaken.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white mb-1">Right to Correction & Updating</h4>
                <p className="text-white/70 text-xs">Request correction, completion, or updating of any inaccurate or outdated personal data.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white mb-1">Right to Erasure</h4>
                <p className="text-white/70 text-xs">Request deletion of personal data when the educational purpose is no longer served.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white mb-1">Right of Grievance Redressal</h4>
                <p className="text-white/70 text-xs">Register a grievance with our Data Grievance Officer, or appeal to the Data Protection Board of India.</p>
              </div>
            </div>
          </section>

          {/* Section 6: Data Security and Storage */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              6. Data Storage, Encryption, and Security Safeguards
            </h3>
            <p>
              We implement reasonable technical and organizational security safeguards to prevent personal data breaches:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All web traffic and API calls are encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS).</li>
              <li>User passwords are never stored in plaintext; they are securely hashed and salted using bcrypt in isolated authentication databases.</li>
              <li>Identity verification documents uploaded for KYC are stored in restricted access cloud buckets with strict access controls.</li>
              <li>We never sell, rent, monetize, or trade student personal information to third-party commercial marketing firms.</li>
            </ul>
          </section>

          {/* Section 7: Third-Party Service Processors */}
          <section className="space-y-3 border-b border-white/10 pb-8">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              7. Third-Party Infrastructure Processors
            </h3>
            <p>
              We utilize select cloud infrastructure providers strictly to execute our educational service:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Supabase:</strong> For secure database management, user authentication, and encrypted storage.</li>
              <li><strong>Transactional Email Services:</strong> For account verification and password reset emails.</li>
            </ul>
            <p className="text-white/70 text-xs">
              All infrastructure partners are bound by strict data processing and confidentiality agreements and process data solely on our written instructions.
            </p>
          </section>

          {/* Section 8: Grievance Officer */}
          <section className="space-y-3">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              8. Grievance Redressal Officer Contact
            </h3>
            <p>
              If you have any questions, wish to exercise your rights under the DPDP Act 2023, or wish to register a grievance, please contact our designated Grievance Officer:
            </p>
            <div className="card-rich p-5 rounded-2xl border border-white/15 space-y-1.5 text-xs sm:text-sm">
              <p><strong className="text-white">Attention:</strong> Data Protection & Grievance Redressal Officer</p>
              <p><strong className="text-white">Organization:</strong> Theorem Academy</p>
              <p><strong className="text-white">Registered Office:</strong> 3rd Floor, Ambika Niwas, behind Tungareshwar Sweets, Gurunanak nagar, Vishal Nagar, Vasai West, Vasai-Virar, Maharashtra 401202</p>
              <p><strong className="text-white">Direct Email:</strong> <a href="mailto:privacy@theoremacademy.com" className="text-signal underline font-bold">privacy@theoremacademy.com</a></p>
              <p><strong className="text-white">Response Timetable:</strong> All grievances are acknowledged within 48 hours and resolved within 7 business days.</p>
            </div>
            <p className="text-xs text-white/50 pt-2">
              Last updated: October 2026. This policy is periodically reviewed to maintain continuous alignment with amendments under the Digital Personal Data Protection Act, 2023 and associated rules.
            </p>
          </section>

        </div>
      </Section>
    </>
  )
}

