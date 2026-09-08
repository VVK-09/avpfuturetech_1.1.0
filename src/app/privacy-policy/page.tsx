import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  Eye,
  Server,
  UserCheck,
  CreditCard,
  Scale,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle2
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | AVP FutureTech",
  description:
    "Official Privacy Policy of AVP FutureTech LLP. Learn how we collect, protect, and process student, candidate, and institutional data in compliance with India's DPDP Act 2023 and IT Act 2000.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 7, 2026";
  const effectiveDate = "January 1, 2026";

  const sections = [
    { id: "introduction", title: "1. Introduction & Overview" },
    { id: "information-we-collect", title: "2. Information We Collect" },
    { id: "how-we-use-information", title: "3. How We Use Your Data" },
    { id: "test-and-anti-cheat", title: "4. Aptitude Test & Anti-Cheating Data" },
    { id: "financial-data", title: "5. Financial Information & Secure Payments" },
    { id: "data-sharing", title: "6. Data Sharing & Third Parties" },
    { id: "data-security", title: "7. Data Protection & Security Protocols" },
    { id: "cookies-and-storage", title: "8. Cookies & Local Storage" },
    { id: "retention-and-deletion", title: "9. Data Retention & Deletion" },
    { id: "minors-privacy", title: "10. Minors & School Students" },
    { id: "user-rights", title: "11. Your Rights Under DPDP Act 2023" },
    { id: "grievance-officer", title: "12. Grievance Officer & Contact" }
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
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Legal & Transparency</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
              Privacy Policy
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              At AVP FutureTech LLP, your privacy and data security are our highest priorities. This policy outlines how we collect, handle, protect, and process personal data across our main website, educational programs, and the internship portal.
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
                <FileText className="w-4 h-4 text-[#1E63D6]" />
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
                  <span>Need Assistance?</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Have questions about our data practices or want to request data deletion?
                </p>
                <a
                  href="mailto:contact@avpfuturetech.com"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E63D6] hover:underline"
                >
                  <span>Email Privacy Team</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Full Policy Content */}
          <main className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10 text-slate-700 leading-relaxed">
            {/* Section 1 */}
            <section id="introduction" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                1. Introduction & Overview
              </h2>
              <p>
                <strong>AVP FutureTech LLP</strong> (“AVP FutureTech”, “we”, “our”, or “us”) is a premier EdTech and technology skill-development organization registered under the Ministry of Corporate Affairs (MCA), Government of India, holding ISO 9001:2015 certification. Our registered office is situated at <strong>Nirmiti Lakshminarayan Tower, Kudal, Sindhudurg, Maharashtra – 416520</strong>.
              </p>
              <p>
                This Privacy Policy describes our practices regarding the collection, storage, utilization, and disclosure of personal data gathered through our websites (<Link href="/" className="text-[#1E63D6] underline font-medium">avpfuturetech.com</Link> and associated subdomains), aptitude testing portals, internship management systems, certificate verification platforms, and on-site school/college workshops.
              </p>
              <p>
                We process your personal information in strict compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, the <strong>Information Technology Act, 2000</strong>, and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules)</strong>.
              </p>
            </section>

            {/* Section 2 */}
            <section id="information-we-collect" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                2. Information We Collect
              </h2>
              <p>
                We only collect data necessary to provide our educational services, administer merit evaluations, manage internship capstones, and issue verifiable credentials:
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-[#0B1E3D] text-sm mb-1">A. Candidate Registration Data</h4>
                  <p className="text-sm text-slate-600">
                    Full Name, Registered Email Address, Mobile Phone Number, Academic Branch/Discipline, Current College Year, Institution Name, and Account Password (stored as one-way cryptographic hashes).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-[#0B1E3D] text-sm mb-1">B. Academic & Evaluation Records</h4>
                  <p className="text-sm text-slate-600">
                    Aptitude test scores, section-wise marks breakdown, percentile rank, capstone project milestone submissions, mentor evaluations, Letter of Recommendation (LOR) metadata, and unique verified Certificate Identifiers.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-[#0B1E3D] text-sm mb-1">C. Technical & Diagnostic Logs</h4>
                  <p className="text-sm text-slate-600">
                    IP address, device operating system, browser user-agent, session timestamps, and automated proctoring telemetry logs generated during online aptitude tests.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="how-we-use-information" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                3. How We Use Your Data
              </h2>
              <p>We process personal data for legitimate educational and contractual purposes, including:</p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Evaluation & Merit Subsidies:</strong> Calculating qualifying aptitude test results and unlocking the ₹699 Merit Rate for eligible candidates scoring 80%+.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Internship Track Delivery:</strong> Provisioning individual student dashboards, weekly learning tasks, live mentor syncs, and capstone repository evaluations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Cryptographic Certificate Verification:</strong> Enabling corporate employers and universities to authenticate student credentials via public verification links.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Transactional Notifications:</strong> Sending 6-digit verification codes, scorecard links, enrollment receipts, and cohort schedule announcements.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="test-and-anti-cheat" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                4. Aptitude Test & Anti-Cheating Data
              </h2>
              <p>
                To uphold meritocratic rigor and prevent malpractice, our online aptitude examination system incorporates automated client-side proctoring checks during active test sessions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>Browser Tab-Switching Detection:</strong> Records when a candidate unfocuses or switches away from the active examination window (capped at 5 warnings before automatic submission).</li>
                <li><strong>Full-Screen Telemetry:</strong> Verifies that the candidate remains in full-screen mode throughout the 60-minute duration.</li>
                <li><strong>Anti-Copy / Clipboard Enforcement:</strong> Prevents unauthorized copying or pasting of evaluation questions.</li>
              </ul>
              <p className="text-sm text-slate-600">
                Proctoring telemetry is processed strictly for exam integrity validation and is automatically archived following final scorecard generation. We do not access external personal files on your machine.
              </p>
            </section>

            {/* Section 5 */}
            <section id="financial-data" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                5. Financial Information & Secure Payments
              </h2>
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-[#1E63D6] shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700 leading-relaxed">
                  <strong>Zero Card Data Storage:</strong> All payments on AVP FutureTech (including registration and internship enrollment) are processed directly through Reserve Bank of India (RBI) authorized payment aggregators such as <strong>Cashfree Payments</strong>.
                </div>
              </div>
              <p className="text-sm">
                We never store or handle your credit card numbers, debit card PINs, CVVs, or Net Banking passwords on our servers. Transactions are protected using end-to-end 256-bit SSL encryption and tokenization compliant with PCI-DSS standards. We retain only non-sensitive transaction identifiers (Order ID, Payment ID, Timestamp, Amount) for invoicing and audit purposes.
              </p>
            </section>

            {/* Section 6 */}
            <section id="data-sharing" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                6. Data Sharing & Third Parties
              </h2>
              <p>
                <strong>We do not sell, rent, or monetize your personal information to any third-party advertisers.</strong> We share data exclusively with trusted operational partners under strict data protection agreements:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>Payment Gateways:</strong> Cashfree Payments for processing fees securely.</li>
                <li><strong>Transactional Email Services:</strong> Enterprise email delivery providers (e.g. Resend / AWS SES) for dispatching 6-digit login OTPs and verification links.</li>
                <li><strong>Partner Educational Institutions:</strong> When an internship or robotics workshop is organized in direct institutional partnership with your college or school, aggregate participation reports may be shared with the institution’s coordinator.</li>
                <li><strong>Legal Authorities:</strong> If required by Indian law, court order, or governmental regulation.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="data-security" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                7. Data Protection & Security Protocols
              </h2>
              <p>
                We implement industry-standard technical and organizational security measures to protect your personal information against unauthorized access, loss, alteration, or disclosure:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-xs text-[#0B1E3D] mb-1">TLS 1.3 Encryption</div>
                  <div className="text-xs text-slate-600">All data in transit is encrypted using modern HTTPS and TLS 1.3 cryptographic protocols.</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-xs text-[#0B1E3D] mb-1">Role-Based Access Control</div>
                  <div className="text-xs text-slate-600">Administrative console access is strictly guarded with 2FA and least-privilege security.</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-xs text-[#0B1E3D] mb-1">Secure Password Hashing</div>
                  <div className="text-xs text-slate-600">User account passwords are salted and hashed with high-iteration cryptographic functions.</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-xs text-[#0B1E3D] mb-1">Regular Security Audits</div>
                  <div className="text-xs text-slate-600">Automated vulnerability scans and compliance reviews aligned with ISO 9001:2015 benchmarks.</div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="cookies-and-storage" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                8. Cookies & Local Storage
              </h2>
              <p>
                We use strictly necessary cookies and browser local storage to deliver our services effectively:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>Session & Authentication State:</strong> Storing authenticated student and admin session tokens securely.</li>
                <li><strong>Examination Auto-Save:</strong> Caching candidate MCQ answers in real time to prevent progress loss during transient internet disruptions.</li>
                <li><strong>UI Preferences:</strong> Preserving display preferences and notification states.</li>
              </ul>
              <p className="text-sm">We do not employ third-party advertising tracking cookies or cross-site tracking beacons.</p>
            </section>

            {/* Section 9 */}
            <section id="retention-and-deletion" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                9. Data Retention & Deletion
              </h2>
              <p>
                We retain student records only for as long as necessary to fulfill the educational purposes outlined in this policy or comply with regulatory audits:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>Verified Credentials:</strong> Certificate identifiers and verification records are maintained permanently to allow lifelong credential verification by employers.</li>
                <li><strong>Evaluation Logs:</strong> Transient test telemetry logs are retained for up to 90 days following cohort completion.</li>
                <li><strong>Right to Erasure:</strong> Candidates may request permanent deletion of non-essential profile data by contacting our Grievance Officer.</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section id="minors-privacy" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                10. Minors & School Students
              </h2>
              <p>
                Our school-level robotics, IoT, and AI curriculum (Grades 1 to 10) is delivered exclusively through institutional partnerships with recognized schools or with verifiable parental/guardian consent. We never solicit sensitive personal information directly from minor students without school administration or guardian authorization.
              </p>
            </section>

            {/* Section 11 */}
            <section id="user-rights" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                11. Your Rights Under DPDP Act 2023
              </h2>
              <p>As a data principal under Indian data protection laws, you possess the following rights:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
                  <div className="font-bold text-[#0B1E3D]">Right to Access</div>
                  <p className="text-xs text-slate-600 mt-1">Request a summary of personal data held about you and how it is processed.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
                  <div className="font-bold text-[#0B1E3D]">Right to Correction</div>
                  <p className="text-xs text-slate-600 mt-1">Update or correct inaccurate, outdated, or incomplete profile details.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
                  <div className="font-bold text-[#0B1E3D]">Right to Erasure</div>
                  <p className="text-xs text-slate-600 mt-1">Request deletion of your personal data when no longer needed for legal purposes.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
                  <div className="font-bold text-[#0B1E3D]">Right to Grievance Redressal</div>
                  <p className="text-xs text-slate-600 mt-1">Lodge complaints regarding data handling with our dedicated Grievance Officer.</p>
                </div>
              </div>
            </section>

            {/* Section 12 */}
            <section id="grievance-officer" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading border-b pb-3 border-slate-100">
                12. Grievance Officer & Official Contact
              </h2>
              <p>
                In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, the designated Grievance Redressal Officer of AVP FutureTech LLP is:
              </p>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 space-y-3">
                <div className="font-bold text-[#0B1E3D] text-base">Grievance Redressal Cell</div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#1E63D6] shrink-0 mt-0.5" />
                    <span><strong>Registered Office:</strong> Nirmiti Lakshminarayan Tower, Kudal, Sindhudurg, Maharashtra – 416520, India</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#1E63D6] shrink-0" />
                    <span><strong>Email:</strong> <a href="mailto:contact@avpfuturetech.com" className="text-[#1E63D6] font-semibold underline">contact@avpfuturetech.com</a> / <a href="mailto:grievance@avpfuturetech.com" className="text-[#1E63D6] font-semibold underline">grievance@avpfuturetech.com</a></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#1E63D6] shrink-0" />
                    <span><strong>Helpline:</strong> +91 9307076962 / +91 7744001079 (Mon – Sat, 9:00 AM – 6:00 PM IST)</span>
                  </div>
                </div>
                <div className="pt-2 text-xs text-slate-500 border-t border-slate-200">
                  We acknowledge grievances within 48 hours and resolve verified requests within 30 days as mandated by statutory guidelines.
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
