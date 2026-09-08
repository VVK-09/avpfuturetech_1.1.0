import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Clock, Sparkles, Bot, Cpu, Zap, Award } from "lucide-react";
import { WorkshopPlan } from "@/lib/constants";

interface PricingCardProps {
  plan: WorkshopPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const isSchool = plan.audience === "School";

  return (
    <div
      className={`card-hover rounded-3xl overflow-hidden flex flex-col justify-between relative transition-all duration-300 bg-white ${
        plan.highlight
          ? "border-2 border-[#1E63D6] shadow-xl shadow-[#1E63D6]/15 ring-4 ring-[#1E63D6]/10"
          : "border border-[#E2E8F0] shadow-md hover:border-[#1E63D6]/40"
      }`}
    >
      {/* Recommended / Flagship Floating Badge */}
      {plan.highlight && (
        <div className="absolute top-3 right-3 z-30 px-3.5 py-1 rounded-full bg-linear-to-r from-[#1E63D6] to-[#0B1E3D] text-white text-xs font-extrabold shadow-lg shadow-blue-900/30 flex items-center gap-1.5 border border-blue-400/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Recommended / Flagship</span>
        </div>
      )}

      <div>
        {/* Visual Media Header with Robotics / IoT Photo */}
        {plan.image && (
          <div className="relative h-48 sm:h-52 w-full overflow-hidden group bg-slate-900">
            <Image
              src={plan.image}
              alt={plan.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Tech Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-[#0B1E3D]/60 to-transparent" />
            <div className="absolute inset-0 pattern-circuit-dark opacity-35" />

            {/* Duration and Category Badges over Image */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#1E63D6]/90 backdrop-blur-md text-white border border-blue-400/30 shadow-xs">
                <Clock className="w-3 h-3 text-sky-200" />
                {plan.duration}
              </span>
              {plan.badgeTag && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {isSchool ? <Bot className="w-3 h-3 text-amber-300" /> : <Cpu className="w-3 h-3 text-cyan-300" />}
                  <span>{plan.badgeTag}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Card Body */}
        <div className="p-6 sm:p-7">
          {/* Audience Pill & Title */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1E63D6] px-2 py-0.5 rounded bg-blue-50 border border-blue-100">
              {plan.audience} Workshop
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-[#0B1E3D] mb-1 font-heading leading-tight">
            {plan.title}
          </h3>
          <p className="text-xs font-semibold text-[#1E63D6] italic mb-4">
            &ldquo;{plan.tagline}&rdquo;
          </p>

          {/* Pricing Box */}
          <div className="flex items-baseline justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#0B1E3D] tracking-tight font-heading">
                {plan.price}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#64748B]">
                / {plan.priceUnit}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Kits & Tools Included
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#64748B] mb-5 leading-relaxed">
            {plan.description}
          </p>

          {/* Project / Prototype Highlight Callout */}
          {plan.prototypesCount && (
            <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1E63D6] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Zap className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1E63D6]">
                  Build Highlight
                </p>
                <p className="text-xs font-bold text-[#0B1E3D]">
                  {plan.prototypesCount}
                </p>
              </div>
            </div>
          )}

          {/* Hardware Tech Stack Chips */}
          {plan.hardwareStack && plan.hardwareStack.length > 0 && (
            <div className="mb-6">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B1E3D] mb-2.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#1E63D6]" />
                <span>Hands-on Hardware Stack:</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {plan.hardwareStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-700 border border-slate-200/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features List */}
          <div className="space-y-2.5 mb-6">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B1E3D] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>What Students & Campus Receive:</span>
            </p>
            <ul className="space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#3C4658]">
                  <span className="w-4 h-4 rounded-full bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 sm:p-7 pt-0">
        <Link
          href={`/our-company?inquiry=${encodeURIComponent(plan.title)}#contact`}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 group ${
            plan.highlight
              ? "bg-[#1E63D6] text-white hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 hover:shadow-lg hover:shadow-[#1E63D6]/35"
              : "bg-[#0B1E3D] text-white hover:bg-[#1E63D6] shadow-sm"
          }`}
        >
          <span>Book This Workshop</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
