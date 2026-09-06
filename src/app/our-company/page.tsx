import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  Target,
  Users,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Search,
  ClipboardList,
  Wrench,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FounderCard from "@/components/FounderCard";
import ContactForm from "@/components/ContactForm";
import { SITE_CONFIG, FOUNDERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Company | Vision, Mission & Founders",
  description:
    "Learn about AVP FutureTech's mission to bridge the rural-metro education divide through hands-on AI, IoT, Robotics, and STEM learning.",
};

const COLLABORATION_STEPS = [
  {
    step: "01",
    title: "Understand Requirements",
    description:
      "We begin by understanding your school's unique academic goals, student strength, existing infrastructure, and timetable preferences.",
    icon: Search,
  },
  {
    step: "02",
    title: "School Survey & Analysis",
    description:
      "Our technical team conducts a detailed assessment of lab space, electrical points, seating, and readiness to tailor an optimal setup.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Design Customized Plan",
    description:
      "We build a personalized curriculum schedule, hardware kit inventory, mentor allocation, and timeline matching your specific grades.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Implement & Achieve Excellence",
    description:
      "We deliver high-energy student workshops, train school teachers, provide continuous mentoring, and showcase student inventions.",
    icon: Award,
  },
];

const STUDENT_BENEFITS = [
  "Early hands-on exposure to futuristic technologies (Grades 1–10)",
  "Develops computational thinking, algorithmic logic, and grit",
  "Confidence to compete equally with top tier metro peers",
  "Build functional tangible hardware projects from scratch",
  "Certified participation and merit awards for school portfolios",
];

const SCHOOL_BENEFITS = [
  "100% compliance with NEP 2020 experiential learning guidelines",
  "Complete turnkey smart lab setup with minimal administrative load",
  "Teacher empowerment through hands-on faculty development workshops",
  "Support in qualifying and applying for Atal Tinkering Lab (ATL) grants",
  "Elevates school reputation as a modern technology and innovation pioneer",
];

export default function OurCompanyPage() {
  return (
    <div className="bg-white">
      {/* Hero / Who We Are Header */}
      <section className="relative py-16 sm:py-24 bg-linear-to-b from-[#F7F9FC] to-white border-b border-[#E2E8F0] overflow-hidden">
        {/* Decorative ambient background glows */}
        <div
          className="pointer-events-none absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.08) 0%, rgba(247, 249, 252, 0) 70%)",
          }}
        />
        <div className="absolute inset-0 bg-circuit-lines opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE]">
              <Users className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>About AVP FutureTech</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1E3D] tracking-tight font-heading">
              Empowering Rural India Through{" "}
              <span className="text-[#1E63D6]">Futuristic Education</span>
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              AVP FutureTech is an EdTech startup committed to empowering school students from rural India with world-class exposure in AI, IoT, Robotics, Automation, and STEM — working closely with Grades 1–10 to bridge the opportunity gap and help them compete confidently with metro peers.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 max-w-5xl mx-auto">
            {/* Vision Card */}
            <div className="rounded-2xl p-8 bg-white border-2 border-[#1E63D6]/30 shadow-lg shadow-[#1E63D6]/5 relative overflow-hidden group hover:border-[#1E63D6] transition-all card-hover">
              <div className="w-12 h-12 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center mb-5 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E63D6] block mb-1">
                Our Long-Term Aspiration
              </span>
              <h2 className="text-2xl font-extrabold text-[#0B1E3D] mb-3 font-heading">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                {SITE_CONFIG.vision}
              </p>
            </div>

            {/* Mission Card */}
            <div className="rounded-2xl p-8 bg-[#F0F4FA] border-2 border-[#0B1E3D]/20 shadow-lg shadow-[#0B1E3D]/5 relative overflow-hidden group hover:border-[#0B1E3D] transition-all card-hover">
              <div className="w-12 h-12 rounded-xl bg-[#0B1E3D] text-white flex items-center justify-center mb-5 shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B1E3D] block mb-1">
                Our Daily Commitment
              </span>
              <h2 className="text-2xl font-extrabold text-[#0B1E3D] mb-3 font-heading">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                {SITE_CONFIG.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum & Teaching Approach Strip */}
      <section className="py-12 bg-[#0B1E3D] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pedagogical Standard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              Our Curriculum & Teaching Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[#38BDF8] font-bold text-sm mb-1 font-heading">NEP 2020 & ATL Aligned</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complies with national skill policies, CBSE mandates, and Atal Tinkering Lab objectives.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[#38BDF8] font-bold text-sm mb-1 font-heading">100% Practical Activities</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                No dry theory. Every student constructs, solders, codes, and debugs working hardware.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[#38BDF8] font-bold text-sm mb-1 font-heading">Real-Life Problem Solving</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Projects target local challenges like smart agricultural sensors, water monitors, and solar automation.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[#38BDF8] font-bold text-sm mb-1 font-heading">Research & Innovation</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Encourages curiosity, scientific enquiry, patent thinking, and presentation skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need AVP FutureTech / Benefits Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Measurable Impact"
            title="Why Schools & Students Choose"
            titleHighlight="AVP FutureTech"
            subtitle="Designed to maximize student growth while offering turnkey simplicity to schools and teachers."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Student Benefits Card */}
            <div className="p-8 rounded-2xl bg-[#F7F9FC] border border-[#E2E8F0] shadow-xs card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1E3D] font-heading">
                  Benefits for Students
                </h3>
              </div>
              <ul className="space-y-3">
                {STUDENT_BENEFITS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#3C4658]">
                    <CheckCircle2 className="w-4 h-4 text-[#1E63D6] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* School Benefits Card */}
            <div className="p-8 rounded-2xl bg-[#F7F9FC] border border-[#E2E8F0] shadow-xs card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1E3D] font-heading">
                  Benefits for Schools & Institutions
                </h3>
              </div>
              <ul className="space-y-3">
                {SCHOOL_BENEFITS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#3C4658]">
                    <CheckCircle2 className="w-4 h-4 text-[#1E63D6] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collaboration Approach (4-Step Process) */}
      <section className="py-16 sm:py-24 bg-[#F7F9FC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Proven Methodology"
            title="Our 4-Step School"
            titleHighlight="Collaboration Approach"
            subtitle="From initial discovery to continuous lab excellence, we handle every phase with structured precision."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLABORATION_STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-[#E2E8F0] shadow-sm relative overflow-hidden group hover:border-[#1E63D6]/40 transition-all flex flex-col justify-between card-hover"
                >
                  <div className="absolute top-4 right-4 text-3xl font-extrabold text-slate-100 group-hover:text-[#DCEBFF] transition-colors font-heading">
                    {item.step}
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center mb-5 group-hover:bg-[#1E63D6] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1E3D] mb-2 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-1 text-xs font-bold text-[#1E63D6]">
                    <span>Step {item.step}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Founders */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Leadership & Vision"
            title="Meet the Minds Behind"
            titleHighlight="AVP FutureTech"
            subtitle="Founded by young engineers passionate about democratizing frontier technology education in rural communities."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FOUNDERS.map((founder, idx) => (
              <FounderCard key={idx} founder={founder} />
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Block + Contact Form */}
      <section id="contact" className="py-16 sm:py-24 bg-[#F7F9FC] border-t border-[#E2E8F0] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Reach Out"
            title="Get In Touch With Our"
            titleHighlight="Founders & Team"
            subtitle="Whether you're a school principal, college coordinator, student, or partner — we'd love to connect."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
            {/* Left Contact Information Card */}
            <div className="lg:col-span-5 bg-[#0B1E3D] text-white rounded-2xl p-8 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E63D6]/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                  Head Office
                </span>
                <h3 className="text-2xl font-extrabold mt-1 font-heading">
                  AVP FutureTech HQ
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Located in Kudal, Sindhudurg — at the heart of our mission to transform rural STEM education.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span className="text-slate-200 leading-snug">
                    {SITE_CONFIG.contact.address}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#38BDF8] shrink-0" />
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <a
                      href="tel:7517238914"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      +91 7517238914
                    </a>
                    <span className="hidden sm:inline text-slate-500">/</span>
                    <a
                      href="tel:7744001079"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      +91 7744001079
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#38BDF8] shrink-0" />
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#38BDF8] shrink-0" />
                  <a
                    href={`https://${SITE_CONFIG.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.contact.website}
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400">
                  Prefer a live demo at your institution? Call our team to schedule an on-campus visit and live robotics display.
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
