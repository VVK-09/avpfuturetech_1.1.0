import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  FileCheck,
  ShieldAlert,
  CreditCard,
  Award,
  BookOpen,
  Code2,
  AlertTriangle,
  Gavel,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Users
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | AVP FutureTech",
  description:
    "Terms of Service governing the use of AVP FutureTech LLP educational portals, online aptitude testing, internship tracks, and verifiable certification services.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "March 7, 2026";
  const effectiveDate = "January 1, 2026";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "eligibility-and-accounts", title: "2. Eligibility & Account Security" },
    { id: "internship-programs", title: "3. Internship Tracks & Capstone Delivery" },
    { id: "aptitude-and-anti-cheat", title: "4. Aptitude Test & Anti-Cheating Policy" },
    { id: "pricing-and-refunds", title: "5. Fees, Merit Subsidies & Refund Policy" },
    { id: "certificates-and-verification", title: "6. Certificate Issuance & Verification" },
    { id: "intellectual-property", title: "7. Intellectual Property Rights" },
    { id: "code-of-conduct", title: "8. User Conduct & Prohibited Acts" },
    { id: "disclaimers-and-liability", title: "9. Disclaimers & Limitation of Liability" },
    { id: "termination", title: "10. Suspension & Termination" },
    { id: "governing-law", title: "11. Governing Law & Dispute Resolution" },
    { id: "contact-information", title: "12. Contact & Notices" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Hero Section */}
      <section className="relative bg-gradient-to-br from-[#07152B] via-[#0B1E3D] to-[#173B7A] text-white py-16 lg:py-20 overflow-hidden">
        {/* Pattern & Ambient Glows */}
        <div className="absolute inset-0 pattern-circuit-dark opacity-35 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E63D6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-[#38BDF8] uppercase tracking-wider mb-5">
              <Scale className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Platform Terms & Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
              Terms of Service
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Please read these Terms of Service carefully before registering for our aptitude evaluations, enrolling in internship programs, or accessing AVP FutureTech digital learning platforms.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#38BDF8]" />
                <span>Last Updated: <strong className="text-white">{lastUpdated}</strong></span>
              </div>
              <span className="text-slate-500">•</span>
              <div>
                <span>Effective Date: <strong className="text-white">{effectiveDate}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Quick Navigation Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-[#0B1E3D] uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#1E63D6]" />
                <span>Table of Contents</span>
              </h3>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-xs sm:text-sm text-slate-600 hover:text-[#1E63D6] hover:bg-blue-50/60 rounded-lg px-3 py-2 transition-all font-medium"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <hr className="my-5 border-slate-100" />

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="flex items-center gap-2 text-[#1E63D6] font-bold text-xs uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Legal Enquiries</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Questions regarding student agreements, academic guidelines, or institutional partnerships?
                </p>
                <a
                  href="mailto:contact@avpfuturetech.com"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E63D6] hover:underline"
                >
                  <span>Contact Legal Support</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Full Terms Content */}
          <main className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10 text-slate-700 leading-relaxed">
            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                1. Acceptance of Terms
              </h2>
              <p>
                These Terms of Service (“Terms”, “Agreement”) constitute a legally binding agreement between you (“Student”, “Candidate”, “User”, or “You”) and <strong>AVP FutureTech LLP</strong> (“AVP FutureTech”, “we”, “our”, or “us”), a limited liability partnership registered under the Ministry of Corporate Affairs (MCA), Government of India, having its principal office at <strong>Nirmiti Lakshminarayan Tower, Kudal, Sindhudurg, Maharashtra – 416520</strong>.
              </p>
              <p>
                By registering on our website (<Link href="/" className="text-[#1E63D6] underline font-medium">avpfuturetech.com</Link>), participating in the Aptitude Examination, accessing student/intern workspaces, or purchasing training services, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our <Link href="/privacy-policy" className="text-[#1E63D6] underline font-medium">Privacy Policy</Link>.
              </p>
            </section>

            {/* Section 2 */}
            <section id="eligibility-and-accounts" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                2. Eligibility & Account Security
              </h2>
              <p>
                To register for our college-level internship programs and aptitude tests, you must be currently enrolled in or a graduate of a recognized diploma, undergraduate, or postgraduate technical program (such as B.Tech, B.E., BCA, MCA, B.Sc CS, or related engineering streams).
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm">
                  <strong>Account Credential Protection:</strong> You are responsible for maintaining the confidentiality of your login credentials (registered email and password). All actions performed under your authenticated account are deemed to be authorized by you.
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm">
                  <strong>Accurate Profile Information:</strong> You agree to provide accurate, truthful, and complete academic details (Full Name, Branch, College Name, and Year) upon registration. Providing fraudulent identity details may result in disqualification and immediate certificate revocation.
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="internship-programs" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                3. Internship Tracks & Capstone Delivery
              </h2>
              <p>
                AVP FutureTech offers structured, industry-oriented 12-week internship specializations across high-growth domains (including Artificial Intelligence, Data Science, Cybersecurity, Python Full Stack, Embedded Systems & IoT, and Business Analytics).
              </p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Hands-On Curriculum:</strong> Interns receive production-grade curriculum modules, guided mentor sessions, industry masterclasses, and project repositories.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Capstone Milestone Evaluation:</strong> To successfully complete the internship, students must submit original capstone project deliverables meeting technical criteria defined by industry mentors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Mentorship & Industry Reviews:</strong> Weekly syncs and review checkpoints are conducted to track student progress and resolve engineering blockers.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="aptitude-and-anti-cheat" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                4. Aptitude Test & Anti-Cheating Policy
              </h2>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-amber-950">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <strong>Strict Anti-Cheating Protocol:</strong> The AVP FutureTech Internship Aptitude Test is a proctored 60-minute qualifying examination (50 MCQs across Numerical, Logical, and Technical English sections). Candidates must strictly adhere to academic integrity standards.
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>No Multiple Browser Windows or Tab Switches:</strong> Our automated monitoring system logs whenever a user navigates away from the test interface. Reaching the maximum threshold (5 warnings) will trigger automated exam termination.</li>
                <li><strong>Single Candidate Policy:</strong> The examination must be taken solely by the registered candidate without third-party assistance or external generative AI tools during the active session.</li>
                <li><strong>One Attempt per Cohort Cycle:</strong> Candidates are allowed one verified examination attempt per active cohort intake.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="pricing-and-refunds" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                5. Fees, Merit Subsidies & Refund Policy
              </h2>
              <p>
                We believe high-quality engineering education should be accessible and merit-driven:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-[#0B1E3D] text-sm mb-1">A. Merit Scholarship Pricing</h4>
                  <p className="text-sm text-slate-600">
                    Candidates scoring <strong>80% or above</strong> on the qualifying Aptitude Test unlock our subsidized <strong>₹699 Merit Pricing</strong> (a substantial scholarship discount from standard corporate training rates).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-[#0B1E3D] text-sm mb-1">B. Transparent Payment Processing</h4>
                  <p className="text-sm text-slate-600">
                    All fees are processed in Indian Rupees (INR) via RBI-compliant payment gateways (e.g. Cashfree Payments) inclusive of applicable taxes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-[#0B1E3D] text-sm mb-1">C. Refund & Cancellation Terms</h4>
                  <p className="text-sm text-slate-600">
                    Aptitude test registration fees and subsidized internship onboarding charges are non-refundable once the test has been taken or course resources have been provisioned, as slots and cloud lab compute are allocated immediately upon enrollment.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="certificates-and-verification" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                6. Certificate Issuance & Verification
              </h2>
              <p>
                Upon verified completion of all 12-week milestones and submission of an approved capstone project, AVP FutureTech issues an official <strong>ISO 9001:2015 & MCA Recognized Certificate of Completion</strong> along with a performance-based Letter of Recommendation (LOR).
              </p>
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-sm leading-relaxed">
                <strong>Public Verification Portal:</strong> Each certificate contains a unique cryptographic identifier and verifiable QR code accessible at <Link href="https://internship.avpfuturetech.com/verify" className="text-[#1E63D6] underline font-bold">internship.avpfuturetech.com/verify</Link>. We reserve the right to immediately invalidate and revoke any credential found to have been obtained via plagiarized code or fraudulent credentials.
              </div>
            </section>

            {/* Section 7 */}
            <section id="intellectual-property" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                7. Intellectual Property Rights
              </h2>
              <p>
                All educational materials, lab designs, curriculum syllabi, problem sets, examination questions, software code, logos, trademarks, and multimedia on this platform are the exclusive intellectual property of <strong>AVP FutureTech LLP</strong>.
              </p>
              <p className="text-sm text-slate-600">
                You may not reproduce, redistribute, reverse-engineer, publish, or commercially exploit any proprietary course materials without prior written authorization. Students retain full intellectual property ownership of original code and applications created by them during their capstone projects.
              </p>
            </section>

            {/* Section 8 */}
            <section id="code-of-conduct" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                8. User Conduct & Prohibited Acts
              </h2>
              <p>When using our platform, you agree NOT to:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li>Share, sell, or transfer your student dashboard credentials to another person.</li>
                <li>Engage in automated scraping, scraping bots, denial-of-service attacks, or reverse engineering of our evaluation platform.</li>
                <li>Submit plagiarized capstone projects or use unauthorized generative scripts to falsely represent technical competency.</li>
                <li>Harass, abuse, or use inappropriate language toward mentors, fellow students, or support staff in communication channels.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="disclaimers-and-liability" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                9. Disclaimers & Limitation of Liability
              </h2>
              <p>
                Our internship tracks and skill-building programs are designed to provide industry-standard practical engineering experience. While our alumni have secured placements across top technology companies, AVP FutureTech does not guarantee direct employment or specific salary outcomes.
              </p>
              <p className="text-sm text-slate-600">
                To the maximum extent permitted by Indian law, AVP FutureTech LLP shall not be liable for any indirect, incidental, or consequential damages resulting from technical downtime, internet service provider disruptions, or loss of test progress caused by client device malfunctions.
              </p>
            </section>

            {/* Section 10 */}
            <section id="termination" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                10. Suspension & Termination
              </h2>
              <p>
                AVP FutureTech reserves the right to suspend or terminate student access to workspaces, evaluation tools, or certificate generation with immediate notice in cases of verified cheating, academic misconduct, code plagiarism, or material violation of these Terms.
              </p>
            </section>

            {/* Section 11 */}
            <section id="governing-law" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                11. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes, claims, or controversies arising out of or in connection with these Terms or platform services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Sindhudurg / Mumbai, Maharashtra, India</strong>.
              </p>
            </section>

            {/* Section 12 */}
            <section id="contact-information" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                12. Contact & Official Notices
              </h2>
              <p>
                For questions, clarifications, or official notices regarding these Terms of Service, please contact our legal and administrative office:
              </p>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 space-y-3">
                <div className="font-bold text-[#0B1E3D] text-base">AVP FutureTech LLP — Legal Administration</div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#1E63D6] shrink-0 mt-0.5" />
                    <span><strong>Registered Office:</strong> Nirmiti Lakshminarayan Tower, Kudal, Sindhudurg, Maharashtra – 416520, India</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#1E63D6] shrink-0" />
                    <span><strong>Email:</strong> <a href="mailto:contact@avpfuturetech.com" className="text-[#1E63D6] font-semibold underline">contact@avpfuturetech.com</a></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#1E63D6] shrink-0" />
                    <span><strong>Phone:</strong> +91 9307076962 / +91 7744001079</span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
