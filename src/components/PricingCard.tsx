import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Clock, Sparkles } from "lucide-react";
import { WorkshopPlan } from "@/lib/constants";

interface PricingCardProps {
  plan: WorkshopPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`card-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
        plan.highlight
          ? "bg-white border-2 border-[#1E63D6] shadow-xl shadow-[#1E63D6]/10"
          : "bg-white border border-[#E2E8F0] shadow-sm"
      }`}
    >
      {/* Flagship / Highlight Banner */}
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-[#1E63D6] to-[#0B1E3D] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-300" />
          <span>Recommended / Flagship</span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE]">
            <Clock className="w-3 h-3" />
            {plan.duration}
          </span>
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            {plan.audience}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-[#0B1E3D] mb-1 font-heading">
          {plan.title}
        </h3>
        <p className="text-xs font-semibold text-[#1E63D6] italic mb-4">
          &ldquo;{plan.tagline}&rdquo;
        </p>

        {/* Pricing Block */}
        <div className="flex items-baseline gap-1.5 pb-5 mb-5 border-b border-slate-100">
          <span className="text-4xl sm:text-5xl font-extrabold text-[#0B1E3D] tracking-tight font-heading">
            {plan.price}
          </span>
          <span className="text-xs sm:text-sm font-medium text-[#64748B]">
            / {plan.priceUnit}
          </span>
        </div>

        <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
          {plan.description}
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          <p className="text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
            What Students Get:
          </p>
          <ul className="space-y-2.5">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3C4658]">
                <span className="w-4 h-4 rounded-full bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <Link
          href={`/our-company?inquiry=${encodeURIComponent(plan.title)}#contact`}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 group ${
            plan.highlight
              ? "bg-[#1E63D6] text-white hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 hover:shadow-lg hover:shadow-[#1E63D6]/35"
              : "bg-[#F0F4FA] text-[#0B1E3D] hover:bg-[#1E63D6] hover:text-white border border-slate-200"
          }`}
        >
          <span>Enquire Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
