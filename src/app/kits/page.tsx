import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Boxes,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Package,
  BookOpen,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Robotics & IoT Kits Supply | Student-Friendly Hardware",
  description:
    "High-quality, durable Robotics & IoT kits supply tailored for school laboratories, student workshops, and hands-on STEM experimentation.",
};

const KIT_TYPES = [
  {
    title: "Starter Robotics Kit (Grades 1–5)",
    tag: "Elementary",
    desc: "Solderless, plug-and-play modular building kit introducing basic DC motors, buzzer circuits, LED arrays, and mechanical chassis.",
    highlights: ["Solder-free, safe connectors", "15+ Guided Build Projects", "Bilingual visual manual", "Rugged storage case"],
  },
  {
    title: "Smart IoT & Sensor Kit (Grades 6–10)",
    tag: "Middle & High School",
    desc: "Programmable microcontroller kit with ultrasonic, infrared, LDR, soil moisture, and temperature sensors for automated smart models.",
    highlights: ["Programmable via Scratch/C++", "25+ Sensor & Automation builds", "Bluetooth/Wi-Fi communication", "Chassis with gear motors"],
  },
  {
    title: "Advanced Engineering Capstone Kit (Colleges)",
    tag: "Higher Ed",
    desc: "ESP32 dual-core IoT dev system with industrial sensor modules, motor drivers (L298N), camera interface, and cloud telemetry code templates.",
    highlights: ["ESP32-WROOM with Wi-Fi/BLE", "Edge AI Camera compatibility", "MQTT / HTTP cloud dashboards", "Full schematic & code repos"],
  },
];

const ADVANTAGES = [
  {
    title: "Engineered for Durability",
    desc: "Robust components and shielded cables designed to withstand daily classroom use by curious young students.",
    icon: ShieldCheck,
  },
  {
    title: "Plug-and-Play Connectors",
    desc: "Fool-proof keyed wiring prevents reverse polarity and component burnouts during initial experimentation.",
    icon: Zap,
  },
  {
    title: "Complete Curriculum Manuals",
    desc: "Every kit includes step-by-step printed schematics and bilingual troubleshooting instructions.",
    icon: BookOpen,
  },
  {
    title: "Instant Replacement Parts",
    desc: "Fast restocking support for lost jumper wires, screws, sensors, and chassis parts directly from our hub.",
    icon: Package,
  },
];

export default function KitsPage() {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-[#F7F9FC] to-white border-b border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern & Decorative ambient background glows */}
        <div className="absolute inset-0 pattern-tech-grid opacity-60 pointer-events-none" />
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
                High-Quality Robotics &{" "}
                <span className="text-[#1E63D6]">IoT STEM Kits</span>
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
                Custom-engineered for school labs and students. Built to make robotics intuitive, exciting, and completely safe — transforming every classroom into an active tinkering workshop.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/our-company#contact"
                  className="px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 transition-all"
                >
                  Order Bulk Kits for School
                </Link>
                <Link
                  href="/workshops"
                  className="px-7 py-3.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white border border-[#E2E8F0] hover:bg-[#F0F4FA] transition-all"
                >
                  Workshops with Kits Included
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 aspect-4/3 card-hover">
                <Image
                  src="/images/ai_waste_classifier.jpg"
                  alt="Robotics and IoT hardware prototype"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kit Advantages */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dot-matrix opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Engineered for"
            titleHighlight="Classroom Success"
            subtitle="Why our kits are trusted by educators and loved by young student makers."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E2E8F0] space-y-3 card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1E3D] font-heading">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kit Tiers */}
      <section className="py-16 sm:py-20 bg-[#F7F9FC] border-y border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute inset-0 pattern-isometric-lattice opacity-55 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Explore Our"
            titleHighlight="Robotics Kits"
            subtitle="Available for individual student tinkering or bulk institutional lab supply."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {KIT_TYPES.map((kit, idx) => (
              <div
                key={idx}
                className="card-hover bg-white rounded-2xl p-7 sm:p-8 border border-[#E2E8F0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E63D6] block mb-1">
                    {kit.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#0B1E3D] mb-3 font-heading">
                    {kit.title}
                  </h3>
                  <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
                    {kit.desc}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {kit.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-[#3C4658]">
                        <CheckCircle2 className="w-4 h-4 text-[#1E63D6] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/our-company?inquiry=${encodeURIComponent(kit.title)}#contact`}
                  className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Inquire for Kit Supply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#0B1E3D] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pattern-circuit-dark opacity-30 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Equip Your School or College Lab Today
          </h2>
          <p className="text-slate-300 text-sm">
            We offer attractive institutional volume pricing and teacher training bundles for schools and colleges across India.
          </p>
          <div className="pt-2">
            <Link
              href="/our-company#contact"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white hover:bg-slate-100 transition-colors inline-block shadow-md"
            >
              Request Institutional Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
