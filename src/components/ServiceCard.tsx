import React from "react";
import Link from "next/link";
import { GraduationCap, Cpu, Rocket, Boxes, ArrowRight, Check, Sparkles } from "lucide-react";
import { ServiceItem } from "@/lib/constants";

interface ServiceCardProps {
  service: ServiceItem;
}

interface ServiceTheme {
  gradient: string;
  badgeClass: string;
  iconBg: string;
  tag: string;
  bulletBg: string;
  buttonHoverBg: string;
}

const SERVICE_THEMES: Record<string, ServiceTheme> = {
  school: {
    gradient: "from-blue-600 via-sky-500 to-cyan-400",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80",
    iconBg: "bg-linear-to-br from-blue-600 to-sky-500 text-white shadow-blue-500/25",
    tag: "Grades 1–10",
    bulletBg: "bg-blue-50 text-blue-600",
    buttonHoverBg: "group-hover:bg-blue-600 group-hover:text-white",
  },
  college: {
    gradient: "from-indigo-600 via-violet-500 to-purple-400",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    iconBg: "bg-linear-to-br from-indigo-600 to-violet-500 text-white shadow-indigo-500/25",
    tag: "Higher Ed & Engg",
    bulletBg: "bg-indigo-50 text-indigo-600",
    buttonHoverBg: "group-hover:bg-indigo-600 group-hover:text-white",
  },
  internship: {
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-200/80",
    iconBg: "bg-linear-to-br from-teal-600 to-emerald-500 text-white shadow-teal-500/25",
    tag: "Live R&D Projects",
    bulletBg: "bg-teal-50 text-teal-600",
    buttonHoverBg: "group-hover:bg-teal-600 group-hover:text-white",
  },
  kits: {
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200/80",
    iconBg: "bg-linear-to-br from-orange-500 to-amber-500 text-white shadow-orange-500/25",
    tag: "Modular Hardware",
    bulletBg: "bg-amber-50 text-amber-700",
    buttonHoverBg: "group-hover:bg-orange-600 group-hover:text-white",
  },
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const theme = SERVICE_THEMES[service.id] || SERVICE_THEMES.school;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Rocket":
        return <Rocket className="w-5 h-5" />;
      case "Boxes":
        return <Boxes className="w-5 h-5" />;
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <Link
      href={service.href}
      className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-transparent p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Accent Gradient Bar on Hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${theme.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      {/* Subtle Background Glow on Hover */}
      <div
        className={`pointer-events-none absolute -top-16 -right-16 w-32 h-32 rounded-full bg-linear-to-br ${theme.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
      />

      <div>
        {/* Header: Icon & Category Tag */}
        <div className="flex items-center justify-between gap-2 mb-4.5">
          <div
            className={`w-11 h-11 rounded-xl ${theme.iconBg} flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105`}
          >
            {getIcon(service.iconName)}
          </div>
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${theme.badgeClass}`}
          >
            {theme.tag}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold text-[#0B1E3D] group-hover:text-[#1E63D6] transition-colors mb-1 font-heading">
          {service.title}
        </h3>
        <p className="text-xs font-semibold text-[#1E63D6] mb-3">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Key Feature Highlights */}
        <ul className="space-y-2 border-t border-slate-100 pt-4 mb-5">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-[#3C4658] font-medium leading-tight"
            >
              <span
                className={`w-4 h-4 rounded-full ${theme.bulletBg} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer / CTA Affordance */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E63D6] group-hover:text-[#0B1E3D] transition-colors">
        <span>Explore Solution</span>
        <div
          className={`w-7 h-7 rounded-full bg-slate-100 text-slate-700 ${theme.buttonHoverBg} flex items-center justify-center transition-all duration-200`}
        >
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
