import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "School Solution | STEM & AI Ecosystem for Grades 1–10",
  description:
    "End-to-end STEM, IoT, and AI school lab setups, teacher training, and curriculum fully aligned with NEP 2020 and Atal Tinkering Labs.",
};

const PILLARS = [
  {
    title: "100% Practical Activity-Based",
    desc: "Every concept is backed by physical electronic circuits, sensors, and robotics builds that students assemble with their own hands.",
  },
  {
    title: "NEP 2020 & ATL AIM Aligned",
    desc: "Structured to fulfill the experiential learning and coding directives of the National Education Policy and Atal Tinkering Labs.",
  },
  {
    title: "Turnkey Smart Lab Setup",
    desc: "We design, install, ground, and equip dedicated robotics workstations with all safety and storage components included.",
  },
  {
    title: "Year-Round Teacher Mentorship",
    desc: "We train existing school faculty and provide bi-monthly refresher workshops to sustain teaching momentum.",
  },
];

const GRADE_TIERS = [
  {
    level: "Grades 1–4 (Foundational)",
    focus: "Curiosity & Logical Mechanics",
    details: "Simple circuits, conductivity, mechanical gears, motors, and block-based sequencing games.",
  },
  {
    level: "Grades 5–7 (Preparatory)",
    focus: "Sensors & Computational Thinking",
    details: "Light/sound sensors, buzzer systems, basic block robotics, and real-world automation thinking.",
  },
  {
    level: "Grades 8–10 (Secondary)",
    focus: "Microcontrollers, IoT & Real Builds",
    details: "Microcontroller wiring, obstacle-avoidance robots, environmental telemetry, and smart city models.",
  },
];

export default function SchoolSolutionPage() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-[#F7F9FC] to-white border-b border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 1: Tech Blueprint Grid */}
        <div className="absolute inset-0 pattern-tech-grid pointer-events-none opacity-60" />

        {/* Decorative ambient background glows */}
        <div
          className="pointer-events-none absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.08) 0%, rgba(247, 249, 252, 0) 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1E3D] tracking-tight font-heading">
                Turnkey STEM, AI &{" "}
                <span className="text-[#1E63D6]">Robotics School Solutions</span>
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
                Equip your school with world-class hands-on innovation labs, structured curricula for Grades 1–10, and high-energy student workshops that set your institution apart.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/our-company#contact"
                  className="px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 transition-all"
                >
                  Request School Consultation
                </Link>
                <Link
                  href="/workshops#schools"
                  className="px-7 py-3.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white border border-[#E2E8F0] hover:bg-[#F0F4FA] transition-all"
                >
                  View Workshop Tiers (₹299/₹399)
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 aspect-4/3 card-hover">
                <Image
                  src="/images/stem_lab_setup.jpg"
                  alt="Smart School STEM Lab Setup"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        {/* Pattern 2: Precision Dot Matrix */}
        <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Designed for Impact &"
            titleHighlight="Compliance"
            subtitle="Our school program is built from the ground up to minimize administration while maximizing student achievement."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E2E8F0] space-y-3 card-hover shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center font-bold text-xs font-heading">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0B1E3D] font-heading">{p.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Tiers */}
      <section className="py-16 sm:py-20 bg-[#F7F9FC] border-y border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 3: 3D Isometric Lattice */}
        <div className="absolute inset-0 pattern-isometric-lattice pointer-events-none opacity-65" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Age-Appropriate"
            titleHighlight="Learning Roadmap"
            subtitle="Tailored to meet students where they are, building logical confidence year by year."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {GRADE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className="card-hover bg-white rounded-2xl p-7 border border-[#E2E8F0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E63D6] block mb-1">
                    {tier.level}
                  </span>
                  <h3 className="text-xl font-bold text-[#0B1E3D] mb-3 font-heading">
                    {tier.focus}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                    {tier.details}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#1E63D6]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E63D6]" />
                  <span>Includes Student Kits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-14 bg-[#07152B] text-white text-center relative overflow-hidden border-t border-white/10">
        {/* Pattern 4: Cyber Circuit Dark Pattern */}
        <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-40" />

        <div className="max-w-3xl mx-auto px-4 space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Schedule an On-Campus Demo for Your School
          </h2>
          <p className="text-slate-300 text-sm">
            Experience our interactive teaching demo and explore lab setup proposals with our co-founders.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/our-company#contact"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white hover:bg-slate-100 transition-colors shadow-md"
            >
              Contact Us Today
            </Link>
            <a
              href="tel:9307076962"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-sky-400" />
              <span>Call +91 9307076962</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
