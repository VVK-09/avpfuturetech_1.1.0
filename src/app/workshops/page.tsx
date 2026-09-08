import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
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
  Bot,
  Cpu,
  Zap,
  Award,
  ShieldCheck,
  Radio,
  CircuitBoard,
  Wifi,
  Check,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PricingCard from "@/components/PricingCard";
import { WORKSHOPS_DATA, OTHER_SCHOOL_SOLUTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Workshops & Pricing | School & College STEM Series",
  description:
    "Explore transparent tiered pricing for AVP FutureTech 2-day and 3-day experiential workshops in AI, IoT, and Robotics for schools and colleges.",
};

const HARDWARE_PILLARS = [
  {
    icon: <Bot className="w-6 h-6 text-[#1E63D6]" />,
    title: "Modular Robotic Chassis & Motors",
    tagline: "Mechanical & Kinematics Base",
    desc: "Laser-cut durable chassis, dual BO geared motors, high-grip rubber wheels, caster steering, and L293D / L298N high-current dual H-bridge motor drivers.",
    tags: ["BO Gear Motors", "L293D / L298N", "Solderless Chassis", "Omni Casters"],
    image: "/images/hero_robotics_ai.jpg",
  },
  {
    icon: <Radio className="w-6 h-6 text-[#1E63D6]" />,
    title: "Multi-Sensor Sensory Arrays",
    tagline: "Environmental & Proximity Telemetry",
    desc: "Ultrasonic rangefinder transceivers, infrared obstacle & line trackers, optical LDR light detectors, PIR motion sensing, and sound threshold modules.",
    tags: ["HC-SR04 Ultrasonic", "IR Array", "LDR Sensors", "PIR Motion"],
    image: "/images/smart_street_light_iot.jpg",
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#1E63D6]" />,
    title: "Microcontrollers & IoT Cloud",
    tagline: "Intelligent Brain & Network Gateway",
    desc: "Dual-core ESP32 Wi-Fi + BLE boards, Arduino compatible architectures, MQTT & HTTP live telemetry pipelines, and real-time smartphone dashboard triggers.",
    tags: ["ESP32 Dual-Core", "Wi-Fi / BLE", "MQTT Cloud", "MicroPython / C++"],
    image: "/images/stem_lab_setup.jpg",
  },
  {
    icon: <CircuitBoard className="w-6 h-6 text-[#1E63D6]" />,
    title: "Edge AI & Computer Vision",
    tagline: "Vision Intelligence on Hardware",
    desc: "Real-time edge camera sensors, color & shape detection classifiers, smart autonomous sorting logic, and intelligent waste / object classification models.",
    tags: ["Edge AI Camera", "OpenCV Classifiers", "Vision Tracking", "Auto Actuation"],
    image: "/images/ai_waste_classifier.jpg",
  },
];

export default function WorkshopsPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-[#F7F9FC] via-white to-[#F7F9FC] border-b border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 1: Tech Blueprint Grid */}
        <div className="absolute inset-0 pattern-tech-grid pointer-events-none opacity-60" />

        {/* Decorative ambient background glows */}
        <div
          className="pointer-events-none absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.1) 0%, rgba(247, 249, 252, 0) 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-36 -left-36 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(11, 30, 61, 0.08) 0%, rgba(247, 249, 252, 0) 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1E3D] tracking-tight font-heading leading-tight">
            Robotics, IoT & AI <br />
            <span className="text-[#1E63D6]">Workshop Series & Pricing</span>
          </h1>
          
          <p className="mt-5 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl mx-auto">
            100% practical, hardware-first bootcamps engineered separately for School Innovators (Grades 1–10) and College Engineering Minds. All kits, sensory hardware, and certificates included.
          </p>

          {/* Value Prop Badges */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#0B1E3D]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-xs border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Solderless & Safe for Schools
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-xs border border-slate-200">
              <Cpu className="w-4 h-4 text-[#1E63D6]" />
              ESP32 & Multi-Sensor Hardware
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-xs border border-slate-200">
              <Award className="w-4 h-4 text-amber-500" />
              Verified Participation & Merit Certificates
            </span>
          </div>
        </div>
      </section>

      {/* SECTION A: WORKSHOPS FOR SCHOOLS */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden" id="schools">
        {/* Pattern 2: Precision Dot Matrix */}
        <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E3D] font-heading">
                Workshops for Schools
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Foundational electronics, sensor triggers, autonomous micro-robotics, and logic thinking. We supply all hardware kits, project workbooks, and certified mentors.
              </p>
            </div>
            <div className="shrink-0">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                Tailored for NEP 2020 & ATL AIM
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {WORKSHOPS_DATA.school.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE HARDWARE & ROBOTICS LAB SHOWCASE */}
      <section className="py-16 sm:py-24 bg-[#0B1E3D] text-white relative overflow-hidden">
        {/* Dark PCB Circuit Pattern */}
        <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-40" />

        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.25) 0%, rgba(11, 30, 61, 0) 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              What Every Student Kit &amp; Bench <span className="text-[#1E63D6] text-sky-400">Includes</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              We bring complete mobile hardware labs directly to your campus. Every student gets hands-on access to modular components, real sensors, and dual-core processors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HARDWARE_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:bg-white/10 group"
              >
                <div>
                  <div className="relative h-36 w-full rounded-xl overflow-hidden mb-5 bg-slate-800">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                        {pillar.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:bg-sky-500 group-hover:text-white transition-colors border border-sky-400/20">
                    {pillar.icon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-heading">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1">
                    {pillar.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Highlight Strip */}
          <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-blue-600/30 via-sky-600/20 to-blue-600/30 border border-sky-400/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E63D6] text-white flex items-center justify-center shrink-0 shadow-md">
                <Zap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Zero Passive PPT Lectures &bull; 100% Tangible Building
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Students assemble, wire, code, and troubleshoot real physical prototypes from minute 15.
                </p>
              </div>
            </div>

            <Link
              href="/our-company#contact"
              className="shrink-0 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#0B1E3D] hover:bg-sky-50 transition-all shadow-md flex items-center gap-2"
            >
              <span>Request Campus Lab Demo</span>
              <ArrowRight className="w-4 h-4 text-[#1E63D6]" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION B: WORKSHOPS FOR COLLEGES */}
      <section className="py-16 sm:py-24 bg-[#F7F9FC] border-y border-[#E2E8F0] relative overflow-hidden" id="colleges">
        {/* Pattern 3: PCB Circuit Board Mesh */}
        <div className="absolute inset-0 pattern-circuit-board pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E3D] font-heading">
                Workshops for Colleges &amp; Universities
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Advanced industry-aligned bootcamps in microcontrollers, MQTT telemetry, sensor integration, edge computer vision, and capstone deployment.
              </p>
            </div>
            <div className="shrink-0">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                Direct Fast-Track to R&amp;D Internships
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
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
      <section className="py-16 bg-linear-to-r from-[#0B1E3D] via-[#162C52] to-[#1E63D6] text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-circuit-dark opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Ready to Bring FutureTech to Your Students?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Call our founders directly or submit an institutional inquiry to reserve dates for your campus. We manage all equipment logistics, kits, and mentor delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
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
