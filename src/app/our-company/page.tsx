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
  ShieldCheck,
  Cpu,
  Zap,
  School,
  Lightbulb,
  Layers,
  HeartHandshake
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FounderCard from "@/components/FounderCard";
import ContactForm from "@/components/ContactForm";
import { SITE_CONFIG, FOUNDERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Company | Vision, Mission & Founders | AVP FutureTech",
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
    tag: "Discovery & Alignment"
  },
  {
    step: "02",
    title: "School Survey & Readiness",
    description:
      "Our technical team conducts a detailed assessment of lab space, electrical points, seating, and equipment readiness for optimal setup.",
    icon: ClipboardList,
    tag: "On-Site Evaluation"
  },
  {
    step: "03",
    title: "Design Customized Plan",
    description:
      "We build a personalized curriculum schedule, hardware kit inventory, mentor allocation, and timeline matching your specific grades.",
    icon: Wrench,
    tag: "Curriculum Blueprint"
  },
  {
    step: "04",
    title: "Implement & Achieve Excellence",
    description:
      "We deliver high-energy student workshops, train school teachers, provide continuous mentoring, and showcase student inventions.",
    icon: Award,
    tag: "Delivery & Showcase"
  },
];

const STUDENT_BENEFITS = [
  {
    title: "Early Futuristic Technology Exposure",
    desc: "Hands-on experience with real microcontrollers, sensors, AI models, and robotics hardware for Grades 1–10.",
    icon: Cpu
  },
  {
    title: "Computational Thinking & Logic",
    desc: "Develops algorithmic mindset, algorithmic problem solving, iterative debugging, and engineering grit.",
    icon: Zap
  },
  {
    title: "Metro-Level Competitive Confidence",
    desc: "Empowers rural and semi-urban students to compete equally with top-tier tier-1 metro peers in tech expos.",
    icon: Sparkles
  },
  {
    title: "Functional Capstone Hardware Builds",
    desc: "Students build tangible, working hardware products from scratch rather than just memorizing textbook theory.",
    icon: Wrench
  },
  {
    title: "Verified Credentials & Merit Awards",
    desc: "Certified participation and performance-rated certificates for prestigious student academic portfolios.",
    icon: Award
  }
];

const SCHOOL_BENEFITS = [
  {
    title: "100% NEP 2020 Compliance",
    desc: "Fully fulfills National Education Policy mandates for experiential STEM, vocational coding, and robotics labs.",
    icon: ShieldCheck
  },
  {
    title: "Turnkey Smart Lab Setup",
    desc: "Complete end-to-end laboratory installation, kit provisioning, and maintenance with zero administrative hassle.",
    icon: School
  },
  {
    title: "Teacher Empowerment & FDPs",
    desc: "Structured Faculty Development Programs that empower school teachers to guide STEM activities with confidence.",
    icon: GraduationCap
  },
  {
    title: "ATL Grant Advisory & Guidance",
    desc: "Complete documentation, paperwork, and strategic assistance to apply and qualify for Atal Tinkering Lab grants.",
    icon: Lightbulb
  },
  {
    title: "Elevated Institutional Reputation",
    desc: "Positions your institution as a modern technology pioneer attracting ambitious parents and students.",
    icon: Award
  }
];

const PEDAGOGY_CARDS = [
  {
    title: "NEP 2020 & ATL Framework",
    desc: "Strictly aligned with national experiential learning mandates, CBSE curriculum policies, and Atal Innovation Mission benchmarks.",
    badge: "Policy Aligned",
    icon: BookOpen,
    accent: "from-blue-500/20 to-blue-600/5"
  },
  {
    title: "100% Practical Activity-First",
    desc: "Zero dry lectures. Every student wires sensors, solders components, programs microcontrollers, and debugs real circuit boards.",
    badge: "Hardware-Driven",
    icon: Cpu,
    accent: "from-sky-500/20 to-sky-600/5"
  },
  {
    title: "Real-Life Problem Solving",
    desc: "Projects tackle local community needs like smart agricultural irrigation sensors, automated streetlights, and solar power monitors.",
    badge: "Societal Impact",
    icon: Zap,
    accent: "from-emerald-500/20 to-emerald-600/5"
  },
  {
    title: "Research & Innovation Culture",
    desc: "Instills scientific curiosity, hypothesis testing, patent-minded problem solving, and public exhibition presentation skills.",
    badge: "Patent Thinking",
    icon: Lightbulb,
    accent: "from-amber-500/20 to-amber-600/5"
  }
];

export default function OurCompanyPage() {
  return (
    <div className="bg-white overflow-hidden selection:bg-[#1E63D6] selection:text-white">
      {/* Hero / Who We Are Header */}
      <section className="relative py-20 sm:py-28 bg-linear-to-b from-[#F7F9FC] via-white to-[#F7F9FC] border-b border-[#E2E8F0] overflow-hidden">
        {/* Pattern 1: Tech Blueprint Grid */}
        <div className="absolute inset-0 pattern-tech-grid pointer-events-none opacity-60" />

        {/* Decorative ambient background glows */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.12) 0%, rgba(247, 249, 252, 0) 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(247, 249, 252, 0) 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE] shadow-xs">
                <Users className="w-3.5 h-3.5 text-[#1E63D6]" />
                <span>About AVP FutureTech</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>MCA Registered & ISO 9001:2015</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1E3D] tracking-tight font-heading leading-tight">
              Empowering Rural India Through{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1E63D6] via-[#2563EB] to-[#38BDF8]">
                Futuristic Education
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              AVP FutureTech is a purpose-driven EdTech initiative committed to equipping school and college students across rural India with world-class, hands-on learning in AI, IoT, Robotics, Automation, and STEM.
            </p>

            {/* Quick Hero Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-lg shadow-[#1E63D6]/25 transition-all duration-200 inline-flex items-center gap-2"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/gallery"
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#0B1E3D] bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all duration-200 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#1E63D6]" />
                <span>View Student Innovations</span>
              </Link>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            {/* Vision Card */}
            <div className="rounded-3xl p-8 sm:p-10 bg-white border-2 border-[#1E63D6]/30 shadow-xl shadow-[#1E63D6]/5 relative overflow-hidden group hover:border-[#1E63D6] transition-all card-hover flex flex-col justify-between">
              <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-40" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#1E63D6]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1E63D6] block mb-1.5">
                  Our Long-Term Aspiration
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] mb-4 font-heading">
                  Our Vision
                </h2>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {SITE_CONFIG.vision}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F0F4FA] text-[#1E63D6]">
                  Democratize Tech
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F0F4FA] text-[#1E63D6]">
                  Rural Innovation
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F0F4FA] text-[#1E63D6]">
                  Global Competitiveness
                </span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="rounded-3xl p-8 sm:p-10 bg-[#07152B] text-white border-2 border-[#162C52] shadow-xl shadow-[#0B1E3D]/20 relative overflow-hidden group transition-all card-hover flex flex-col justify-between">
              <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-35" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#38BDF8] border border-white/15 flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] block mb-1.5">
                  Our Daily Commitment
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 font-heading">
                  Our Mission
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {SITE_CONFIG.mission}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#38BDF8] border border-white/15">
                  100% Practical Labs
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#38BDF8] border border-white/15">
                  Teacher Empowerment
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#38BDF8] border border-white/15">
                  Zero-Barrier Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Strip */}
      <section className="py-8 bg-[#07152B] border-y border-white/10 text-white relative overflow-hidden">
        {/* Pattern 2: Cyber Circuit Dark */}
        <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r border-white/10 last:border-none">
              <div className="text-2xl sm:text-4xl font-extrabold font-heading text-[#38BDF8]">
                100%
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Hands-On Practical Builds
              </div>
            </div>
            <div className="p-4 border-r border-white/10 last:border-none">
              <div className="text-2xl sm:text-4xl font-extrabold font-heading text-[#38BDF8]">
                30+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Experiential STEM Experiments
              </div>
            </div>
            <div className="p-4 border-r border-white/10 last:border-none">
              <div className="text-2xl sm:text-4xl font-extrabold font-heading text-[#38BDF8]">
                Grades 1–10
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Graded School Curricula
              </div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-4xl font-extrabold font-heading text-[#38BDF8]">
                Sindhudurg HQ
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Regional Innovation Core
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum & Teaching Approach Bento Grid */}
      <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
        {/* Pattern 3: Dot Matrix Pattern */}
        <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Pedagogical Standard"
            title="Our Curriculum &"
            titleHighlight="Teaching Methodology"
            subtitle="Engineered to turn young students from passive consumers of technology into active inventors and creators."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 sm:mt-10">
            {PEDAGOGY_CARDS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-3xl p-7 border border-[#E2E8F0] shadow-xs hover:shadow-xl hover:border-[#1E63D6]/40 transition-all duration-300 flex flex-col justify-between group card-hover"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center group-hover:bg-[#1E63D6] group-hover:text-white transition-colors shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-[#1E63D6] border border-blue-100 shadow-xs">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B1E3D] mb-2 font-heading group-hover:text-[#1E63D6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#1E63D6]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why You Need AVP FutureTech / Benefits Grid */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC] border-y border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 4: Isometric 3D Hexagonal Lattice */}
        <div className="absolute inset-0 pattern-isometric-lattice pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Measurable Impact"
            title="Why Schools & Students Choose"
            titleHighlight="AVP FutureTech"
            subtitle="Designed to maximize student growth while offering turnkey simplicity to schools and teachers."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8 sm:mt-10">
            {/* Student Benefits Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all space-y-6 card-hover relative overflow-hidden">
              <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-30" />
              <div className="relative z-10">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center font-bold shadow-xs">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E63D6] block">
                      For Young Innovators
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading">
                      Benefits for Students (Grades 1–10)
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {STUDENT_BENEFITS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3.5 group">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1E63D6] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1E63D6] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0B1E3D] leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* School Benefits Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#07152B] text-white border border-[#162C52] shadow-lg hover:shadow-2xl transition-all space-y-6 card-hover relative overflow-hidden">
              <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-30" />
              <div className="relative z-10">
                <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#38BDF8] border border-white/15 flex items-center justify-center font-bold shadow-xs">
                    <School className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] block">
                      For Educational Leaders
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                      Benefits for Schools & Institutions
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {SCHOOL_BENEFITS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3.5 group">
                        <div className="w-8 h-8 rounded-xl bg-white/10 text-[#38BDF8] border border-white/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#38BDF8] group-hover:text-[#0B1E3D] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collaboration Approach (4-Step Process) */}
      <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
        {/* Pattern 5: Blueprint Grid Texture */}
        <div className="absolute inset-0 pattern-blueprint pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Proven Methodology"
            title="Our 4-Step School"
            titleHighlight="Collaboration Approach"
            subtitle="From initial discovery to continuous lab excellence, we handle every phase with structured precision."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 sm:mt-10">
            {COLLABORATION_STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-3xl p-7 border border-[#E2E8F0] shadow-sm relative overflow-hidden group hover:border-[#1E63D6] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover"
                >
                  <div className="absolute top-4 right-4 text-4xl font-extrabold text-slate-200 group-hover:text-[#DCEBFF] transition-colors font-heading select-none">
                    {item.step}
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center mb-5 group-hover:bg-[#1E63D6] group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#1E63D6] uppercase tracking-wider block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-[#0B1E3D] mb-2 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#1E63D6]">
                    <span>Phase {item.step}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Founders */}
      <section className="py-12 sm:py-16 bg-linear-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 6: PCB Circuit Board Mesh */}
        <div className="absolute inset-0 pattern-circuit-board pointer-events-none opacity-60" />

        {/* Subtle decorative ambient lights */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full opacity-70"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.08) 0%, rgba(248, 250, 252, 0) 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Meet the Minds Behind"
            titleHighlight="AVP FutureTech"
            subtitle="Engineered and led by passionate technologists committed to delivering equal-footing STEM & AI opportunities to every student."
          />

          {/* Leadership Pillars / Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-xs hover:border-[#1E63D6]/40 hover:bg-white transition-all">
              <div className="w-5 h-5 rounded-lg bg-blue-50 text-[#1E63D6] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>Founder-Led Curriculum & Delivery</span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-xs hover:border-[#1E63D6]/40 hover:bg-white transition-all">
              <div className="w-5 h-5 rounded-lg bg-blue-50 text-[#1E63D6] flex items-center justify-center shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span>In-House R&D & Hardware Architecture</span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-xs hover:border-[#1E63D6]/40 hover:bg-white transition-all">
              <div className="w-5 h-5 rounded-lg bg-blue-50 text-[#1E63D6] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-3.5 h-3.5" />
              </div>
              <span>Direct Institutional Mentorship</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FOUNDERS.map((founder, idx) => (
              <FounderCard key={idx} founder={founder} />
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Block + Contact Form */}
      <section id="contact" className="py-12 sm:py-16 bg-white border-t border-[#E2E8F0] scroll-mt-20 relative overflow-hidden">
        {/* Pattern 7: Tech Grid Background */}
        <div className="absolute inset-0 pattern-tech-grid pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Reach Out"
            title="Get In Touch With Our"
            titleHighlight="Founders & Team"
            subtitle="Whether you're a school principal, college coordinator, student, or partner — we'd love to connect."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto mt-8 sm:mt-10">
            {/* Left Contact Information Card */}
            <div className="lg:col-span-5 bg-[#07152B] text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden border border-[#162C52]">
              <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-40" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E63D6]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                  Head Office & Innovation Hub
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 font-heading">
                  AVP FutureTech HQ
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  Located in Kudal, Sindhudurg — at the epicenter of our mission to transform rural STEM education across Maharashtra and India.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm relative z-10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-xs sm:text-sm leading-snug">
                    {SITE_CONFIG.contact.address}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#38BDF8] shrink-0" />
                  <div className="flex flex-col sm:flex-row sm:gap-2 text-xs sm:text-sm">
                    <a
                      href="tel:9307076962"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      +91 9307076962
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
                    className="text-slate-200 hover:text-white transition-colors text-xs sm:text-sm"
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
                    className="text-slate-200 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {SITE_CONFIG.contact.website}
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 relative z-10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5 mb-1">
                    <Sparkles size={13} /> Request an On-Campus Demo
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prefer a hands-on live demonstration at your school or college campus? Contact our team to schedule an on-site visit and live robotics display.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
