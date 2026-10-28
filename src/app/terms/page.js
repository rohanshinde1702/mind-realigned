import React from 'react'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ArrowLeft, Scale, AlertTriangle, Shield, CheckCircle2, Clock, Mail, HeartPulse } from 'lucide-react'

export const metadata = {
  title: 'Terms & Conditions | Ashika Mehta • Mind Realigned',
  description:
    'Read the Terms and Conditions governing psychotherapeutic consultations, coaching, workshops, and website usage with Dr. Ashika Mehta and Mind Realigned.',
}

export default function TermsPage() {
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
              <Scale className="w-3.5 h-3.5" />
              Legal & Policies
            </span>
          </div>

          {/* Hero Header */}
          <header className="mb-12 text-center md:text-left">
            <h1 className="font-['Merriweather',Georgia,serif] text-3xl sm:text-4xl md:text-5xl font-black text-[#141010] leading-[1.18] tracking-[-0.01em] mb-4">
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg text-[#6E5D57] leading-relaxed max-w-3xl mb-4">
              Please read these Terms & Conditions carefully before using our website, participating in our therapy sessions or workshops, or engaging with our services.
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

            {/* Introductory Agreement */}
            <div className="space-y-4">
              <p>
                These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Client&rdquo;, &ldquo;User&rdquo;, or &ldquo;you&rdquo;) and <strong className="text-[#141010]">Dr. Ashika Mehta</strong> and <strong className="text-[#141010]">Mind Realigned</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), governing your access to and use of <a href="https://ashikamehta.com" className="text-[#B83A2A] underline hover:no-underline font-semibold">ashikamehta.com</a> (the &ldquo;Site&rdquo;) and all associated psychotherapeutic, counseling, mindset coaching, speaking, and workshop services.
              </p>
              <p>
                By visiting our Site, submitting an inquiry, scheduling an appointment, or enrolling in any program, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our <Link href="/privacy" className="text-[#B83A2A] underline hover:no-underline font-semibold">Privacy Policy</Link>. If you do not agree with any part of these Terms, you must discontinue use of the Site and our services.
              </p>
            </div>

            {/* Medical Crisis Callout */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF6F3] border border-[#F2C9BD] flex items-start gap-4">
              <HeartPulse className="w-6 h-6 text-[#B83A2A] shrink-0 mt-1" />
              <div>
                <h3 className="font-['Merriweather',Georgia,serif] font-bold text-[#141010] text-lg mb-1">
                  Important Medical & Crisis Notice
                </h3>
                <p className="text-sm sm:text-base text-[#5A4B46] leading-relaxed">
                  Our services and website do <strong>not</strong> provide emergency psychiatric crisis intervention. If you are experiencing an acute mental health emergency, severe psychological crisis, or thoughts of self-harm, please reach out immediately to your nearest emergency hospital or contact verified crisis helplines:
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#B83A2A]">
                  <span>Vandrevala Foundation: +91 9999 666 555</span>
                  <span>KIRAN Helpline: 1800-599-0019</span>
                  <span>Tele-MANAS: 14416</span>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  1. Medical & Psychotherapeutic Disclaimer
                </h2>
              </div>
              <div className="space-y-3 pl-1 sm:pl-2">
                <p>
                  <strong>A. Educational Content:</strong> All articles, column excerpts (including publications in <em>The Times of India</em>, <em>Isprava Insider</em>, and other media), podcast episodes, newsletters, and self-paced resources on this Site are created solely for informational, reflective, and educational purposes.
                </p>
                <p>
                  <strong>B. No Clinical Relationship by Browsing:</strong> Accessing or reading material on this Site does not establish a formal doctor-patient or therapist-client relationship. A clinical relationship is only established upon mutually executing a formal therapeutic intake agreement and attending a dedicated consultation.
                </p>
                <p>
                  <strong>C. Individual Variance:</strong> Psychological therapy and mindset coaching rely on individual readiness, personal commitment, and collaborative effort. While evidence-based clinical methodologies are applied, specific psychological outcomes cannot be legally promised or guaranteed.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  2. Eligibility & Age Requirements
                </h2>
              </div>
              <p>
                By accessing this Site and scheduling consultations, you affirm that you are at least 18 years of age and legally competent to enter into these binding Terms.
              </p>
              <p>
                <strong>Minors & Adolescents:</strong> Therapy or counseling for individuals under 18 years of age requires the explicit, written consent, formal authorization, and active engagement of a parent or legal guardian throughout the care process.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  3. Professional Services & Consultations
                </h2>
              </div>
              <p>
                Dr. Ashika Mehta provides specialized individual psychotherapy, emotional resilience coaching, parenthood & motherhood workshops, and corporate mental well-being sessions.
              </p>
              <ul className="space-y-2.5 pl-2 list-none">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Intake & Clinical Suitability:</strong> An initial consultation evaluates clinical compatibility and scope of care. Dr. Ashika Mehta reserves the professional right to recommend alternative medical facilities, specialized psychiatrists, or in-patient centers when a client&apos;s clinical needs exceed outpatient capabilities.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Client Autonomy:</strong> Clients retain full autonomy regarding their participation in therapy. You possess the right to pause, adjust, or discontinue therapy at any point, with open discussion encouraged to facilitate healthy therapeutic closure.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  4. Appointment Booking, Rescheduling & Cancellation Policy
                </h2>
              </div>
              <p>
                Therapy slots represent reserved professional time. To ensure fairness to all clients, the following scheduling guidelines apply:
              </p>
              <div className="space-y-3 p-5 rounded-2xl bg-[#FAF5F2] border border-[#EAD5CB] text-[15px] sm:text-[16px]">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B83A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong>Advance Cancellation Notice:</strong> A minimum of <strong className="text-[#141010]">24 to 48 hours</strong> advance written notice is required to cancel or reschedule a confirmed session.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#B83A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong>Late Cancellations & No-Shows:</strong> Sessions cancelled with less than 24 hours notice, or appointments missed without notice (&ldquo;no-shows&rdquo;), are subject to the <strong className="text-[#141010]">full session fee</strong>, barring unforeseen medical emergencies.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B83A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong>Punctuality:</strong> Sessions commence and conclude promptly at the scheduled time. Arriving late does not extend the session duration, ensuring that subsequent appointments begin on time.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  5. Fees, Billing & Payment Terms
                </h2>
              </div>
              <ul className="space-y-2.5 pl-2 list-none text-[#4A3B36]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Pricing Clarity:</strong> Professional session fees, workshop fees, and organizational retainers are communicated transparently prior to confirmation. Invoices are payable in advance or on the date specified.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Payment Channels:</strong> Payments are processed securely via approved digital payment processors, bank wire transfers, UPI, or major payment cards.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B83A2A] shrink-0 mt-1" />
                  <span><strong>Refund Policy:</strong> Fees for completed therapy sessions or consultations are non-refundable. For workshops and digital cohorts, refund eligibility is governed by the specific registration guidelines established for that event.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  6. Confidentiality & Telehealth Security
                </h2>
              </div>
              <p>
                Clinical confidentiality is protected in accordance with professional medical ethics and applicable statutory laws:
              </p>
              <ul className="space-y-2 pl-2 list-disc list-inside text-[#4A3B36]">
                <li>Information disclosed during therapy sessions is never commercialized, sold, or shared for promotional purposes.</li>
                <li>Confidentiality exceptions are restricted exclusively to mandatory legal safety standards (imminent bodily harm, child/elder abuse reporting, or binding judicial subpoenas), as outlined in our <Link href="/privacy" className="text-[#B83A2A] underline hover:no-underline font-semibold">Privacy Policy</Link>.</li>
                <li><strong>Telehealth Responsibilities:</strong> Virtual therapy sessions are conducted over encrypted, secure video platforms. Clients agree to join sessions from a quiet, secure, private room to protect their personal privacy and confidentiality.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  7. Intellectual Property & Proprietary Rights
                </h2>
              </div>
              <p>
                All intellectual property on this Site—including written articles, editorial essays, psychological frameworks, workshop curriculums, logos, audio materials, images, and layout designs—is the exclusive proprietary property of <strong className="text-[#141010]">Dr. Ashika Mehta</strong> and <strong className="text-[#141010]">Mind Realigned</strong>, protected under copyright, trademark, and intellectual property laws.
              </p>
              <p>
                <strong>Limited License:</strong> You are granted a limited, personal, non-exclusive, non-transferable license to view, read, and share links to our content for personal, non-commercial purposes. You may not copy, reproduce, republish, sell, license, modify, or commercially distribute workshop slides, guides, or course materials without prior written consent.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  8. Code of Conduct & Prohibited Activities
                </h2>
              </div>
              <p>When interacting with the Site, practitioners, or community spaces, you agree not to:</p>
              <ul className="space-y-2 pl-2 list-disc list-inside text-[#4A3B36]">
                <li>Record, capture audio/video, or distribute therapy sessions or group workshops without prior express written consent.</li>
                <li>Engage in abusive, harassing, defamatory, or threatening communication toward practitioners, staff, or fellow workshop participants.</li>
                <li>Attempt to compromise, disrupt, hack, or inject malicious code into the website infrastructure.</li>
                <li>Use automated bots, scrapers, or scripts to collect data from the Site without authorization.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  9. Limitation of Liability
                </h2>
              </div>
              <p>
                To the fullest extent permissible under applicable law, Dr. Ashika Mehta and Mind Realigned shall not be liable for any indirect, incidental, consequential, special, or punitive damages resulting from your access to or use of the Site, reliance on educational articles, or attendance at workshops.
              </p>
              <p>
                While professional diligence and high standards of clinical care are upheld, life decisions, emotional actions, and personal circumstances remain the ongoing responsibility of each individual client.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  10. Indemnification
                </h2>
              </div>
              <p>
                You agree to defend, indemnify, and hold harmless Dr. Ashika Mehta, Mind Realigned, contractors, and affiliates from and against any claims, liabilities, damages, losses, or legal expenses (including reasonable attorneys&apos; fees) arising out of your violation of these Terms, misuse of the Site, or infringement upon any third-party rights.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  11. Governing Law & Jurisdiction
                </h2>
              </div>
              <p>
                These Terms and Conditions shall be governed by, interpreted, and construed in accordance with the substantive laws of the <strong className="text-[#141010]">Republic of India</strong>, without regard to conflict of law principles.
              </p>
              <p>
                Any dispute, controversy, or claim arising out of or relating to these Terms or our services shall be subject to the exclusive jurisdiction of the competent courts situated in <strong className="text-[#141010]">Mumbai, Maharashtra, India</strong>.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  12. Modifications to Terms
                </h2>
              </div>
              <p>
                We reserve the right to revise or update these Terms periodically to reflect evolving clinical practices, technological standards, or statutory guidelines. When revisions occur, the &ldquo;Last Updated&rdquo; date at the top of this page will be refreshed. Continued engagement with our Site or services after updates are posted signifies agreement with the amended Terms.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-4 pt-4 border-t border-[#E8D4CB]">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F5EBE6] border border-[#E8D4CB]">
                <h2 className="font-['Merriweather',Georgia,serif] text-base sm:text-lg font-bold tracking-wide uppercase text-[#141010]">
                  13. Contact Information
                </h2>
              </div>
              <p>
                For questions, clarifications, or inquiries regarding these Terms and Conditions, please reach out to us:
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF5F2] border border-[#EAD5CB] space-y-2 text-[#4A3B36] text-[15px] sm:text-[16px]">
                <p>
                  <strong className="text-[#141010]">Practice:</strong> Ashika Mehta • Mind Realigned
                </p>
                <p>
                  <strong className="text-[#141010]">Practitioner:</strong> Dr. Ashika Mehta (MBBS, Psychotherapist & Mindset Coach)
                </p>
                <p>
                  <strong className="text-[#141010]">Location:</strong> Mumbai, Maharashtra, India
                </p>
                <p className="flex items-center gap-2 pt-1">
                  <Mail className="w-4 h-4 text-[#B83A2A]" />
                  <span>
                    <strong className="text-[#141010]">Direct Inquiries:</strong>{' '}
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

