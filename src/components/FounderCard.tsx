"use client";

import React from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  CheckCircle2,
  Award,
  Briefcase,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  GraduationCap,
  Layers,
  ChevronRight
} from "lucide-react";
import { Founder } from "@/lib/constants";

interface FounderCardProps {
  founder: Founder;
}

export default function FounderCard({ founder }: FounderCardProps) {
  const cleanPhone = founder.phone ? founder.phone.replace(/\D/g, "") : "";
  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
    `Hi ${founder.name}, I am reaching out through the AVP FutureTech website regarding institutional programs & collaboration.`
  )}`;

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden card-hover hover:border-[#1E63D6]/40">
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#1E63D6] via-[#38BDF8] to-[#2563EB] opacity-90 group-hover:opacity-100 transition-opacity" />

      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
        <div>
          {/* Executive Photo & Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100">
            {/* Portrait Image Container */}
            <div className="relative w-28 h-32 sm:w-32 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg shrink-0 bg-slate-50 group-hover:border-[#1E63D6] transition-all duration-300 group-hover:shadow-[#1E63D6]/15">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 112px, 128px"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 h-10 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5 text-[#38BDF8]" />
                <span>Verified</span>
              </div>
            </div>

            {/* Founder Identity & Role */}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1E3D] font-heading tracking-tight group-hover:text-[#1E63D6] transition-colors">
                  {founder.name}
                </h3>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE]">
                <Sparkles className="w-3 h-3 text-[#1E63D6]" />
                <span>{founder.role}</span>
              </div>

              <div className="flex items-start justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl p-2 border border-slate-200/80">
                <GraduationCap className="w-4 h-4 text-[#1E63D6] shrink-0 mt-0.5" />
                <span className="leading-snug">{founder.credentials}</span>
              </div>
            </div>
          </div>

          {/* Executive Bio */}
          <div className="py-4">
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {founder.bio}
            </p>
          </div>

          {/* Core Responsibilities */}
          <div className="pt-2 pb-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>Leadership & Executive Portfolio</span>
            </div>
            <ul className="space-y-1.5">
              {founder.responsibilities.map((resp, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[#334155] leading-snug"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations Badges */}
          <div className="pt-2 pb-2 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>Domain Expertise</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {founder.specializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#0B1E3D] border border-slate-200 group-hover:border-blue-200 transition-colors"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Contact Actions */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            {cleanPhone && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white font-bold text-xs transition-all duration-200 inline-flex items-center gap-1.5 shadow-xs"
                title={`Chat with ${founder.name} on WhatsApp`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}

            <a
              href={`tel:${cleanPhone}`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#1E63D6] text-[#0B1E3D] hover:text-white font-bold text-xs transition-all duration-200 inline-flex items-center gap-1.5 shadow-xs"
              title={`Call ${founder.name}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>

          <a
            href={`mailto:${founder.email}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E63D6] hover:text-[#1551B5] hover:underline"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{founder.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

