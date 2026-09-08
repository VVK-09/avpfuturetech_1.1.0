"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Award,
  Briefcase,
  Sparkles,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { Founder } from "@/lib/constants";

interface FounderCardProps {
  founder: Founder;
}

export default function FounderCard({ founder }: FounderCardProps) {
  const linkedinUrl =
    founder.linkedin || "https://www.linkedin.com/company/avp-futuretech/";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden card-hover hover:border-[#1E63D6]/40 hover:-translate-y-1">
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#1E63D6] via-[#38BDF8] to-[#2563EB] opacity-90 group-hover:opacity-100 transition-opacity" />

      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div className="space-y-5">
          {/* Executive Photo & Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 pb-5 border-b border-slate-100">
            {/* Portrait Image Container */}
            <div className="relative w-28 h-32 sm:w-32 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md shrink-0 bg-slate-50 group-hover:border-[#1E63D6] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#1E63D6]/10">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 112px, 128px"
                priority
              />
            </div>

            {/* Founder Identity & Role */}
            <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1E3D] font-heading tracking-tight group-hover:text-[#1E63D6] transition-colors leading-tight">
                {founder.name}
              </h3>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE]">
                <Sparkles className="w-3.5 h-3.5 text-[#1E63D6]" />
                <span>{founder.role}</span>
              </div>

              <div className="flex items-start justify-center sm:justify-start gap-2 text-xs font-medium text-slate-700 bg-slate-50 rounded-xl p-2.5 border border-slate-200/80">
                <GraduationCap className="w-4 h-4 text-[#1E63D6] shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-800 font-semibold">{founder.credentials}</span>
              </div>
            </div>
          </div>

          {/* Executive Bio */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100/90 text-xs sm:text-sm text-[#475569] leading-relaxed">
            <p className="line-clamp-4 hover:line-clamp-none transition-all duration-200">
              {founder.bio}
            </p>
          </div>

          {/* Core Responsibilities */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>Leadership & Core Focus</span>
            </div>
            <ul className="space-y-1.5">
              {founder.responsibilities.slice(0, 4).map((resp, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[#334155] leading-snug"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E63D6] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>Domain Expertise</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {founder.specializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white text-[#0B1E3D] border border-slate-200 shadow-2xs group-hover:border-blue-200 hover:border-[#1E63D6] hover:text-[#1E63D6] transition-colors"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer LinkedIn Action */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-[#0A66C2] to-[#0077B5] hover:from-[#005299] hover:to-[#0A66C2] text-white font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#0A66C2]/20 hover:shadow-lg hover:shadow-[#0A66C2]/30 group/btn"
            title={`Connect with ${founder.name} on LinkedIn`}
          >
            <svg
              className="w-4 h-4 fill-current shrink-0 transition-transform duration-200 group-hover/btn:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
            </svg>
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 opacity-80 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}



