import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Cpu,
  CheckCircle2,
  Code2,
  Layers,
  Award,
  Terminal,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { WORKSHOPS_DATA } from "@/lib/constants";
import PricingCard from "@/components/PricingCard";

export const metadata: Metadata = {
  title: "College Solution | Advanced AI, IoT & Embedded Systems",
  description:
    "Industry-grade technology bootcamps, project guidance, and practical workshops for engineering, polytechnic, and degree college students.",
};

const TECH_AREAS = [
  {
    title: "Microcontrollers & Embedded C++/Python",
    desc: "Hands-on programming with ESP32, STM32, and Arduino architectures. Sensor interfacing, interrupt handling, and motor kinematics.",
    icon: Cpu,
  },
  {
    title: "Cloud IoT & Real-time Telemetry",
    desc: "Building end-to-end telemetry pipelines using MQTT, HTTP REST, WebSocket brokers, and live graphical dashboards.",
    icon: Terminal,
  },
  {
    title: "Applied Computer Vision & Edge AI",
    desc: "Deploying camera-based object recognition, face tracking, and edge neural classifiers directly onto embedded microprocessors.",
    icon: Code2,
  },
  {
    title: "Capstone & Hackathon Mentorship",
    desc: "Guidance for final year engineering capstone projects, competition prototypes, and technical research paper publication.",
    icon: Award,
  },
];

export default function CollegeSolutionPage() {
  return (
    <div className="bg-white">
      {/* Hero Header */}
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
                Advanced Hands-On Tech for{" "}
                <span className="text-[#1E63D6]">College Innovators</span>
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
                Close the industry-academia gap. We deliver intensive, code-driven workshops and project bootcamps that turn theoretical knowledge into real-world embedded hardware and AI deployments.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/our-company#contact"
                  className="px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 transition-all"
                >
                  Partner With Us
                </Link>
                <Link
                  href="https://internship.avpfuturetech.com/"
                  className="px-7 py-3.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white border border-[#E2E8F0] hover:bg-[#F0F4FA] transition-all"
                >
                  Explore Internships
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 aspect-4/3 card-hover">
                <Image
                  src="/images/smart_street_light_iot.jpg"
                  alt="College IoT & Embedded Project"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Domains */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        {/* Pattern 2: PCB Circuit Board Mesh */}
        <div className="absolute inset-0 pattern-circuit-board pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Core Technical Focus"
            titleHighlight="Domains"
            subtitle="Industry-aligned practical domains designed to make graduates stand out in tech recruitment."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_AREAS.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E2E8F0] space-y-3 card-hover shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center font-bold shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1E3D] font-heading">{area.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* College Pricing Tiers */}
      <section className="py-16 sm:py-20 bg-[#F7F9FC] border-y border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 3: 3D Isometric Lattice */}
        <div className="absolute inset-0 pattern-isometric-lattice pointer-events-none opacity-65" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="College Workshop"
            titleHighlight="Formats & Pricing"
            subtitle="Intensive 2-day and 3-day bootcamps with hardware kits provided for hands-on team builds."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {WORKSHOPS_DATA.college.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#07152B] text-white text-center relative overflow-hidden border-t border-white/10">
        {/* Pattern 4: Cyber Circuit Dark */}
        <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-40" />

        <div className="max-w-3xl mx-auto px-4 space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Host an AVP FutureTech Bootcamp on Your Campus
          </h2>
          <p className="text-slate-300 text-sm">
            Contact our R&D lead to customize technical content and schedule convenient workshop dates for your students.
          </p>
          <div className="pt-2">
            <Link
              href="/our-company#contact"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white hover:bg-slate-100 transition-colors inline-block shadow-md"
            >
              Contact Technical Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
