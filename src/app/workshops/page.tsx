import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  GraduationCap,
  Building2,
  Sparkles,
  Layers,
  FileCheck,
  PackageCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PricingCard from "@/components/PricingCard";
import { WORKSHOPS_DATA, OTHER_SCHOOL_SOLUTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Workshops & Pricing | School & College STEM Series",
  description:
    "Explore transparent tiered pricing for AVP FutureTech 2-day and 3-day experiential workshops in AI, IoT, and Robotics for schools and colleges.",
};

export default function WorkshopsPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE] mb-4 shadow-xs">
            <Wrench className="w-3.5 h-3.5 text-[#1E63D6]" />
            <span>Hands-on Learning Series</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1E3D] tracking-tight font-heading">
            Workshop Series &{" "}
            <span className="text-[#1E63D6]">Transparent Pricing</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed">
            High-impact, hardware-backed practical workshops tailored separately for school students (Grades 1–10) and college engineers. No hidden fees.
          </p>
        </div>
      </section>

      {/* SECTION A: WORKSHOPS FOR SCHOOLS */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden" id="schools">
        {/* Pattern 2: Precision Dot Matrix */}
        <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E63D6]">
                Category A
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] font-heading">
                Workshops for Schools (Grades 1–10)
              </h2>
            </div>
          </div>
          <p className="text-[#64748B] text-sm sm:text-base max-w-3xl mb-10 leading-relaxed">
            Hands-on AI, IoT, Robotics, and STEM activities designed for young minds. We provide all hardware kits, student activity manuals, and completion certificates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {WORKSHOPS_DATA.school.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B: WORKSHOPS FOR COLLEGES */}
      <section className="py-16 sm:py-20 bg-[#F7F9FC] border-y border-[#E2E8F0] relative overflow-hidden" id="colleges">
        {/* Pattern 3: PCB Circuit Board Mesh */}
        <div className="absolute inset-0 pattern-circuit-board pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-white flex items-center justify-center font-bold shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1E3D]">
                Category B
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] font-heading">
                Workshops for Colleges & Universities
              </h2>
            </div>
          </div>
          <p className="text-[#64748B] text-sm sm:text-base max-w-3xl mb-10 leading-relaxed">
            Advanced technology bootcamps in microcontrollers, sensor telemetry, cloud IoT, and computer vision to prepare students for core technical careers and capstone projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {WORKSHOPS_DATA.college.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: OTHER SOLUTIONS FOR SCHOOLS */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden" id="other-solutions">
        {/* Pattern 4: 3D Isometric Lattice */}
        <div className="absolute inset-0 pattern-isometric-lattice pointer-events-none opacity-65" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Turnkey Ecosystem"
            title="Other Essential Solutions for"
            titleHighlight="Schools"
            subtitle="Beyond short-term workshops, we partner with educational institutions to set up permanent innovation labs and hardware supplies."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {OTHER_SCHOOL_SOLUTIONS.map((item, idx) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case "Layers":
                    return <Layers className="w-6 h-6 text-[#1E63D6]" />;
                  case "FileCheck":
                    return <FileCheck className="w-6 h-6 text-[#1E63D6]" />;
                  case "PackageCheck":
                    return <PackageCheck className="w-6 h-6 text-[#1E63D6]" />;
                  default:
                    return <Layers className="w-6 h-6 text-[#1E63D6]" />;
                }
              };

              return (
                <div
                  key={idx}
                  className="card-hover bg-[#F7F9FC] rounded-2xl p-7 border border-[#E2E8F0] shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white text-[#1E63D6] shadow-xs flex items-center justify-center mb-5 group-hover:bg-[#1E63D6] group-hover:text-white transition-colors">
                      {getIcon(item.icon)}
                    </div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1E63D6] mb-1">
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold text-[#0B1E3D] mb-3 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-200/60 mb-6">
                      {item.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-[#3C4658]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E63D6] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/our-company?solution=${encodeURIComponent(item.title)}#contact`}
                    className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold text-[#0B1E3D] bg-white border border-slate-200 hover:bg-[#1E63D6] hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Enquire About This Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="py-14 bg-linear-to-r from-[#0B1E3D] via-[#162C52] to-[#1E63D6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-5">
          <h2 className="text-3xl font-extrabold font-heading">
            Ready to Bring FutureTech to Your Students?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Call our founders directly or submit an institutional inquiry to book dates for your campus. We handle all equipment logistics, kits, and mentor delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/our-company#contact"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white hover:bg-slate-100 transition-colors shadow-lg"
            >
              Book Workshop Dates
            </Link>
            <a
              href="tel:9307076962"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white border-2 border-white hover:bg-white/10 transition-colors"
            >
              Call +91 9307076962
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
