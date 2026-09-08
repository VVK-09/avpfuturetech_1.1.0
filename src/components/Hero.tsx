"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import InteractiveHeroBackground from "./InteractiveHeroBackground";
import HeroTechFactsWidget from "./HeroTechFactsWidget";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-18">
      {/* Precision Blueprint Grid & Interactive Canvas */}
      <div className="absolute inset-0 pattern-tech-grid opacity-50 pointer-events-none" />
      <InteractiveHeroBackground />

      {/* Decorative ambient background glows (Matches Internship Portal) */}
      <div
        className="pointer-events-none absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(30, 99, 214, 0.07) 0%, rgba(247, 249, 252, 0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, rgba(247, 249, 252, 0) 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Copy and CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEBFF] border border-[#BFDBFE] text-[#1E63D6] text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>{SITE_CONFIG.tagline}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D6]" />
              <span className="text-[#0B1E3D] font-semibold hidden sm:inline">
                Grades 1–10 & Beyond
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl font-extrabold text-[#0B1E3D] tracking-tight leading-[1.16] font-heading">
              Bringing World-Class{" "}
              <span className="text-[#1E63D6] relative inline-block">
                AI, IoT & Robotics
              </span>{" "}
              to Rural India&apos;s Students.
            </h1>

            {/* Mission Subheadline */}
            <p className="text-sm sm:text-base lg:text-lg text-[#64748B] leading-relaxed max-w-2xl font-normal">
              Bridging the opportunity gap through hands-on, real-world learning. We empower school students (Grades 1–10) with the futuristic skills and confidence to compete shoulder-to-shoulder with their metro peers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/workshops"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold !text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-lg shadow-[#1E63D6]/25 hover:shadow-xl hover:shadow-[#1E63D6]/35 transition-all duration-200 group"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>


            {/* Key Trust Signals / Features Pill Row */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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

          {/* Right Column: Visual Showcase with Balanced Proportions */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group space-y-2.5">
              {/* Outer Decorative Glow Border reacting on hover */}
              <div className="absolute -inset-2 rounded-3xl bg-linear-to-r from-[#1E63D6]/20 via-[#38bdf8]/15 to-[#0B1E3D]/10 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-80 group-hover:opacity-100 pointer-events-none" />

              {/* 1. Fully Visible Realistic Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="relative h-56 sm:h-68 lg:h-[280px] w-full">
                  <Image
                    src="/images/hero_robotics_ai_realistic.jpg"
                    alt="Indian school students wearing black AVP polo shirts collaborating on hands-on robotics and coding in STEM lab"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                </div>

                {/* Floating Badge (Top-Right) */}
                <div className="absolute top-2.5 right-2.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-xs border border-slate-100 flex items-center gap-1.5 hover:scale-105 transition-transform z-20">
                  <span className="flex h-2 w-2 rounded-full bg-[#1E63D6] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#0B1E3D]">Sindhudurg & Beyond</span>
                </div>
              </div>

              {/* 2. Dynamic Tech Facts Interactive Card */}
              <HeroTechFactsWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
