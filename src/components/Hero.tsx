"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Cpu, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import InteractiveHeroBackground from "./InteractiveHeroBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-28">
      {/* Interactive Minimal Canvas (Matches Internship Portal) */}
      <InteractiveHeroBackground />

      {/* Decorative ambient background glows (Matches Internship Portal) */}
      <div
        className="pointer-events-none absolute -top-36 -right-36 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(30, 99, 214, 0.08) 0%, rgba(247, 249, 252, 0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, rgba(247, 249, 252, 0) 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEBFF] border border-[#BFDBFE] text-[#1E63D6] text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#1E63D6]" />
              <span>{SITE_CONFIG.tagline}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D6]" />
              <span className="text-[#0B1E3D] font-semibold hidden sm:inline">
                Grades 1–10 & Beyond
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl/tight font-extrabold text-[#0B1E3D] tracking-tight font-heading">
              Bringing World-Class{" "}
              <span className="text-[#1E63D6] relative inline-block">
                AI, IoT & Robotics
              </span>{" "}
              to Rural India&apos;s Students.
            </h1>

            {/* Mission Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-2xl font-normal">
              Bridging the opportunity gap through hands-on, real-world learning. We empower school students (Grades 1–10) with the futuristic skills and confidence to compete shoulder-to-shoulder with their metro peers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/workshops"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold !text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-lg shadow-[#1E63D6]/25 hover:shadow-xl hover:shadow-[#1E63D6]/35 transition-all duration-200 group"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/internships"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold !text-[#0B1E3D] border-1.5 border-[#0B1E3D] hover:bg-[#F0F4FA] transition-all duration-200"
              >
                <span>Internship Portal</span>
              </Link>
            </div>

            {/* Key Trust Signals / Features Pill Row */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0B1E3D]">
                <CheckCircle2 className="w-4 h-4 text-[#1E63D6] shrink-0" />
                <span>100% Practical Activities</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0B1E3D]">
                <ShieldCheck className="w-4 h-4 text-[#1E63D6] shrink-0" />
                <span>NEP 2020 & ATL Aligned</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0B1E3D]">
                <Award className="w-4 h-4 text-[#1E63D6] shrink-0" />
                <span>Hardware Kits Provided</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase with Interactive Glow */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Outer Decorative Glow Border reacting on hover */}
              <div className="absolute -inset-2 rounded-3xl bg-linear-to-r from-[#1E63D6]/25 via-[#38bdf8]/20 to-[#0B1E3D]/15 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-80 group-hover:opacity-100" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white transition-transform duration-500 group-hover:scale-[1.015]">
                <div className="relative h-72 sm:h-96 w-full">
                  <Image
                    src="/images/hero_robotics_ai.jpg"
                    alt="Rural school students engaged in hands-on robotics and AI learning"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  {/* Subtle Gradient Shade for Contrast */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1E3D]/80 via-transparent to-transparent" />

                  {/* Floating Highlight Card on top of Image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#DCEBFF] flex items-center justify-center text-[#1E63D6] shrink-0 shadow-xs">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0B1E3D]">
                          Experiential Learning in Action
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Smart sensor wiring & autonomous robotics by young innovators
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge (Top-Right) */}
              <div className="absolute -top-4 -right-2 sm:-right-4 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-100 flex items-center gap-2 hover:scale-105 transition-transform">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#1E63D6] animate-pulse" />
                <span className="text-xs font-bold text-[#0B1E3D]">Sindhudurg & Beyond</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
