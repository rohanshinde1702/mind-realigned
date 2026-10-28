import React from 'react'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ArrowLeft, ShieldCheck, Lock, Mail, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Ashika Mehta • Mind Realigned',
  description:
    'Learn how Ashika Mehta and Mind Realigned collect, protect, and respect your personal and clinical data in accordance with medical ethics and privacy laws.',
}

export default function PrivacyPage() {
  const lastUpdated = 'October 28, 2026'
  const effectiveDate = 'January 1, 2025'

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2A211E] flex flex-col justify-between font-['DM_Sans',system-ui,sans-serif]">
      {/* Site Header */}
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E9C8BB]/60">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E5D57] hover:text-[#B83A2A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F5DDD3] text-[#B83A2A] border border-[#E9C8BB]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal & Privacy
            </span>
          </div>

          {/* Hero Header */}
          <header className="mb-12 text-center md:text-left">
            <h1 className="font-['Merriweather',Georgia,serif] text-3xl sm:text-4xl md:text-5xl font-black text-[#141010] leading-[1.18] tracking-[-0.01em] mb-4">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-[#6E5D57] leading-relaxed max-w-3xl mb-4">
              At <strong className="text-[#141010]">Mind Realigned</strong>, we believe that emotional well-being requires a foundation of unwavering trust, psychological safety, and respect. This Privacy Policy details how we collect, use, store, and safeguard your personal and sensitive clinical information.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs sm:text-sm text-[#8A7973] pt-2">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#B83A2A]" />
                Effective: {effectiveDate}
              </span>
              <span>•</span>
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </header>

          {/* Core Content Card */}
          <div className="bg-white rounded-3xl border border-[#E8D4CB] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(80,40,30,0.05)] space-y-10 sm:space-y-12 text-[16px] sm:text-[17px] leading-[1.8] text-[#2A211E]">

            {/* Introductory Callout */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF5F2] border border-[#EAD5CB] flex items-start gap-4">
              <Lock className="w-6 h-6 text-[#B83A2A] shrink-0 mt-1" />
              <div>
                <h3 className="font-['Merriweather',Georgia,serif] font-bold text-[#141010] text-lg mb-1">
                  Psychotherapeutic Confidentiality Commitment
                </h3>
                <p className="text-sm sm:text-base text-[#5A4B46] leading-relaxed">
                  As a medical doctor and psychotherapist, Dr. Ashika Mehta adheres to strict clinical and ethical confidentiality standards. What you disclose in consultations, therapy sessions, or intake assessments is held in the strictest medical confidence and will <strong>never</strong> be sold, rented, or exploited for marketing.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  1. Information We Collect
                </h2>
              </div>
              <p>
                We collect information necessary to provide safe, effective therapeutic guidance, mindset coaching, workshops, and educational resources. This data falls into the following categories:
              </p>
              <div className="space-y-4 pl-1 sm:pl-2">
                <div>
                  <h3 className="font-bold text-[#141010] text-[17px]">A. Personal Identification Data</h3>
                  <p className="text-[#4A3B36] text-[15px] sm:text-[16px]">
                    When you fill out inquiry forms on our website, subscribe to our newsletter, book a consultation, or register for a corporate workshop, we collect your name, email address, phone number, location, and billing address.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#141010] text-[17px]">B. Clinical & Sensitive Personal Information</h3>
                  <p className="text-[#4A3B36] text-[15px] sm:text-[16px]">
                    During therapy sessions, intake forms, or direct psychotherapeutic consultations, you may voluntarily share clinical history, mental health symptoms, emotional challenges, family dynamics, and wellness objectives. This information is classified as sensitive personal data and is handled under strict medical confidentiality protocols.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#141010] text-[17px]">C. Usage & Technical Telemetry</h3>
                  <p className="text-[#4A3B36] text-[15px] sm:text-[16px]">
                    When browsing our website, we automatically collect basic non-identifying telemetry including your browser type, device category, operating system, pages viewed, time spent on pages, and referral URLs to ensure website stability and optimize reader experience.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#141010] text-[17px]">D. Billing & Transaction Information</h3>
                  <p className="text-[#4A3B36] text-[15px] sm:text-[16px]">
                    All digital payments are processed through secure, certified third-party payment gateways compliant with PCI-DSS standards. We do not store or retain full credit card numbers, debit card numbers, or bank passwords on our servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  2. How We Use Your Information
                </h2>
              </div>
              <p>
                We use the information we collect strictly for legitimate clinical, administrative, and educational purposes, including:
              </p>
              <ul className="space-y-2.5 pl-2 list-none">
                {[
                  'Delivering individual psychotherapy, mindset coaching, and corporate emotional well-being workshops.',
                  'Facilitating session scheduling, intake reviews, appointment reminders, and follow-up communications.',
                  'Responding to questions submitted through contact forms, emails, or speaking engagement inquiries.',
                  'Sending educational newsletters, essays, and publication announcements (only when you have explicitly opted in; you may unsubscribe at any time).',
                  'Maintaining accurate administrative and accounting records required by tax and professional regulations.',
                  'Monitoring website performance, security, and protecting against fraudulent or unauthorized activities.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  3. Confidentiality & Ethical Standards
                </h2>
              </div>
              <p>
                Therapy thrives on safety. What is discussed between you and Dr. Ashika Mehta within the therapy room or digital consultation remains strictly confidential.
              </p>
              <p>
                <strong>Exceptions to Confidentiality:</strong> In accordance with medical ethics and Indian law, confidentiality is legally broken only under exceptional circumstances:
              </p>
              <div className="space-y-2.5 p-4 rounded-xl bg-[#FFF6F3] border border-[#F2C9BD] text-[15px] sm:text-[16px]">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-[#B83A2A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Imminent Harm:</strong> If there is a clear, imminent danger of serious physical harm or suicide to yourself or another person.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-[#B83A2A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Child or Vulnerable Adult Abuse:</strong> Mandatory legal reporting requirements involving suspected abuse or neglect of minors, elderly persons, or vulnerable dependents.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-[#B83A2A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Legal Mandate:</strong> In response to a formal court order or statutory legal requirement issued by a competent court of law.
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#7A6159] italic">
                In any such rare event, only the minimum information required by law is disclosed, and where legally permissible, we will make every effort to notify you beforehand.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  4. Sharing & Disclosure of Information
                </h2>
              </div>
              <p>
                We maintain a strict policy: <strong className="text-[#141010]">we never sell, rent, or trade your personal information</strong> with third-party marketers or advertisers.
              </p>
              <p>We share minimal necessary data only with:</p>
              <ul className="space-y-2 pl-2 list-disc list-inside text-[#4A3B36]">
                <li>
                  <strong className="text-[#141010]">Trusted Service Providers:</strong> Secure infrastructure partners who assist in email delivery, encrypted cloud backups, website hosting, and payment gateways. All providers are bound by strict confidentiality and data protection agreements.
                </li>
                <li>
                  <strong className="text-[#141010]">Legal & Regulatory Authorities:</strong> When required by statutory law, court subpoenas, or legal processes to protect rights, property, or public safety.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  5. Data Security & Storage Safeguards
                </h2>
              </div>
              <p>
                We employ comprehensive physical, technical, and administrative security measures to protect your personal and clinical records:
              </p>
              <ul className="space-y-2 pl-2 list-none">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>SSL/TLS Encryption:</strong> All data transmitted between your device and our website is secured with end-to-end HTTPS encryption.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Access Control:</strong> Therapeutic records and notes are kept in encrypted, password-protected systems accessible solely by Dr. Ashika Mehta.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Secure Telehealth:</strong> Virtual therapy sessions are conducted via encrypted, HIPAA/GDPR-compliant telehealth platforms.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  6. Data Retention
                </h2>
              </div>
              <p>
                We retain personal and clinical information only for as long as necessary to fulfill the purposes for which it was collected, provide ongoing clinical care, resolve potential disputes, and comply with medical record-keeping laws and statutory tax obligations.
              </p>
              <p>
                When records are no longer required, they are permanently destroyed using secure digital wiping and shredding protocols.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  7. Cookies & Tracking Technologies
                </h2>
              </div>
              <p>
                Our site uses essential and performance cookies. Essential cookies ensure the site functions properly (such as navigation and form security). Performance cookies help us understand aggregate visitor metrics without tracking personal identities across third-party websites.
              </p>
              <p>
                You can manage or disable cookies at any time through your browser settings. Note that disabling cookies may affect certain interactive features of our website.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  8. Your Privacy Rights & Choices
                </h2>
              </div>
              <p>Depending on your jurisdiction, you possess the following rights regarding your personal information:</p>
              <ul className="space-y-2 pl-2 list-none">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Access & Inspection:</strong> You may request a summary of the personal information we hold about you.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Rectification:</strong> You may ask us to correct incomplete or inaccurate data.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Deletion:</strong> You may request the erasure of your personal data, subject to statutory medical and tax retention rules.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Unsubscribe:</strong> You can opt out of newsletters or email communications anytime using the link at the bottom of our emails.</span>
                </li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  9. Third-Party Links & Media
                </h2>
              </div>
              <p>
                Our website links to external platforms, media publications (such as <em>The Times of India</em>, <em>Isprava Insider</em>), and social channels (Instagram, YouTube, Substack). We are not responsible for the privacy practices, content, or policies of external websites. We encourage you to review their privacy policies when visiting them.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  10. Children’s & Minors’ Privacy
                </h2>
              </div>
              <p>
                Our website and independent coaching offerings are intended for individuals 18 years of age and older. For adolescents or minors participating in therapy, verified parental or legal guardian consent and active involvement is required. We do not knowingly collect personal information directly from minors without verifiable guardian approval.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  11. Updates to This Policy
                </h2>
              </div>
              <p>
                We may update this Privacy Policy from time to time to reflect modifications in our clinical services, technological changes, or evolving legal frameworks. When revisions occur, the &ldquo;Last Updated&rdquo; date at the top of this page will be updated accordingly. Continued use of our website or services constitutes acknowledgement of the updated terms.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-4 pt-4 border-t border-[#E8D4CB]">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  12. Contact Us & Grievance Redressal
                </h2>
              </div>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please contact us directly:
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF5F2] border border-[#EAD5CB] space-y-2 text-[#4A3B36] text-[15px] sm:text-[16px]">
                <p>
                  <strong className="text-[#141010]">Practice:</strong> Ashika Mehta • Mind Realigned
                </p>
                <p>
                  <strong className="text-[#141010]">Lead Practitioner:</strong> Dr. Ashika Mehta (MBBS, Psychotherapist & Mindset Coach)
                </p>
                <p>
                  <strong className="text-[#141010]">Location:</strong> Mumbai, Maharashtra, India
                </p>
                <p className="flex items-center gap-2 pt-1">
                  <Mail className="w-4 h-4 text-[#B83A2A]" />
                  <span>
                    <strong className="text-[#141010]">Inquiries:</strong>{' '}
                    <a
                      href="mailto:connect@ashikamehta.com"
                      className="text-[#B83A2A] hover:underline font-semibold"
                    >
                      connect@ashikamehta.com
                    </a>
                  </span>
                </p>
              </div>
            </section>

          </div>

          {/* Bottom Back Button */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141010] text-white hover:bg-[#B83A2A] text-sm font-semibold transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>

        </div>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  )
}

