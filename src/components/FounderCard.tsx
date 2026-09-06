import React from "react";
import Image from "next/image";
import { Mail, Phone, CheckCircle2, Award, Briefcase } from "lucide-react";
import { Founder } from "@/lib/constants";

interface FounderCardProps {
  founder: Founder;
}

export default function FounderCard({ founder }: FounderCardProps) {
  return (
    <div className="card-hover bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-6 sm:p-8 flex flex-col justify-between group">
      <div>
        {/* Header: Photo + Name + Badge */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left mb-6 pb-6 border-b border-slate-100">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#1E63D6]/20 shadow-md shrink-0 bg-slate-50">
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="112px"
            />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] font-heading">
                {founder.name}
              </h3>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE]">
                {founder.role}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#1E63D6]">
              {founder.credentials}
            </p>
            <p className="text-xs text-[#64748B] leading-relaxed pt-1">
              {founder.bio}
            </p>
          </div>
        </div>

        {/* Responsibilities Section */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-[#1E63D6]" />
            <span>Our Responsibilities</span>
          </div>
          <ul className="space-y-1.5">
            {founder.responsibilities.map((resp, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-[#3C4658] leading-snug"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E63D6] shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specializations Section */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#1E63D6]" />
            <span>Our Specialization</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {founder.specializations.map((spec, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F0F4FA] text-[#0B1E3D] border border-slate-200"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <a
          href={`tel:${founder.phone.replace(/[^0-9]/g, "")}`}
          className="inline-flex items-center gap-1.5 font-medium text-[#64748B] hover:text-[#1E63D6] transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#1E63D6]" />
          <span>{founder.phone}</span>
        </a>
        <a
          href={`mailto:${founder.email}`}
          className="inline-flex items-center gap-1.5 font-medium text-[#64748B] hover:text-[#1E63D6] transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-[#1E63D6]" />
          <span>{founder.email}</span>
        </a>
      </div>
    </div>
  );
}
