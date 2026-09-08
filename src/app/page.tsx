import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import ServiceCard from "@/components/ServiceCard";
import FaqAccordion from "@/components/FaqAccordion";
import SectionHeading from "@/components/SectionHeading";
import { RECENT_NEWS, SERVICES_LIST, FAQ_ITEMS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. RECENT NEWS SECTION */}
      <section className="py-16 sm:py-24 bg-[#F7F9FC] border-y border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 1: Precision Cyber Dot Matrix */}
        <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE] mb-3 shadow-xs">
                <Newspaper className="w-3.5 h-3.5 text-[#1E63D6]" />
                <span>Latest Updates</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E3D] tracking-tight font-heading">
                Recent News & Announcements
              </h2>
              <p className="mt-2 text-[#64748B] text-sm sm:text-base max-w-xl">
                Stay informed with our latest school partnerships, district workshops, student achievements, and STEM releases.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1E63D6] hover:text-[#1551B5] transition-colors shrink-0 group"
            >
              <span>View Student Exhibition Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Horizontally-scrollable on mobile / Grid on desktop */}
          <div className="flex overflow-x-auto pb-4 pt-1 gap-6 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
            {RECENT_NEWS.map((news) => (
              <div
                key={news.id}
                className="min-w-[280px] sm:min-w-0 w-[85vw] sm:w-auto snap-center shrink-0 sm:shrink"
              >
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES SECTION */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-white via-[#F8FAFC] to-white relative overflow-hidden">
        {/* Pattern 2: Architectural Tech Grid */}
        <div className="absolute inset-0 pattern-tech-grid pointer-events-none opacity-60" />

        {/* Ambient background glows */}
        <div
          className="pointer-events-none absolute top-1/4 -left-48 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.08) 0%, rgba(248, 250, 252, 0) 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-1/4 -right-48 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(13, 148, 136, 0.06) 0%, rgba(248, 250, 252, 0) 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="What We Offer"
            title="Comprehensive Tech Education"
            titleHighlight="Solutions"
            subtitle="From foundational school labs to college engineering bootcamps and hands-on robotics kits — end-to-end EdTech solutions designed to bridge opportunity."
          />

          {/* 4 Clickable Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {SERVICES_LIST.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Bottom callout strip */}
          <div className="mt-14 relative overflow-hidden rounded-3xl bg-linear-to-r from-[#07152B] via-[#0B1E3D] to-[#173B7A] p-8 sm:p-10 text-white shadow-2xl shadow-[#0B1E3D]/30 border border-white/15">
            {/* Pattern 3: Cyber Circuit Dark Pattern */}
            <div className="absolute inset-0 pattern-circuit-dark pointer-events-none opacity-45" />

            {/* Ambient inner decorative glows */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(30, 99, 214, 0) 70%)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(30, 99, 214, 0.3) 0%, rgba(11, 30, 61, 0) 70%)",
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3.5 max-w-3xl text-left">
                {/* Visible High-Contrast Headline */}
                <h3 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug font-heading">
                  Looking for a customized STEM workshop for your institution?
                </h3>

                {/* Subtext */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  We configure grade-specific hardware and live teaching modules suited to your academic calendar. Empower your students with hands-on AI, IoT, and Robotics labs.
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center">
                <Link
                  href="/our-company#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-[#0B1E3D] bg-white hover:bg-sky-50 shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-[1.03] transition-all group shrink-0"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4 text-[#1E63D6] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS & SUPPORT */}
      <section className="py-16 sm:py-24 bg-[#F7F9FC] border-t border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 4: Isometric 3D Hexagonal Lattice */}
        <div className="absolute inset-0 pattern-isometric-lattice pointer-events-none opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Frequently Asked Questions &"
            titleHighlight="Support"
            subtitle="Everything you need to know about our school workshops, curriculum alignment, hardware kits, and partnership model."
          />

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>
    </div>
  );
}
