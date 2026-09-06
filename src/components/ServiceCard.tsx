import React from "react";
import Link from "next/link";
import { GraduationCap, Cpu, Rocket, Boxes, ArrowRight, Check } from "lucide-react";
import { ServiceItem } from "@/lib/constants";

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-[#1E63D6]" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-[#1E63D6]" />;
      case "Rocket":
        return <Rocket className="w-6 h-6 text-[#1E63D6]" />;
      case "Boxes":
        return <Boxes className="w-6 h-6 text-[#1E63D6]" />;
      default:
        return <GraduationCap className="w-6 h-6 text-[#1E63D6]" />;
    }
  };

  return (
    <Link
      href={service.href}
      className="card-hover bg-white rounded-2xl p-7 border border-[#E2E8F0] shadow-sm hover:border-[#1E63D6]/40 flex flex-col justify-between group transition-all duration-300 block"
    >
      <div>
        {/* Icon & Subtitle Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 rounded-xl bg-[#DCEBFF] group-hover:bg-[#1E63D6] text-[#1E63D6] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
            <div className="transition-colors group-hover:text-white">
              {getIcon(service.iconName)}
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F0F4FA] text-[#0B1E3D] border border-slate-200">
            {service.subtitle}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-[#0B1E3D] group-hover:text-[#1E63D6] transition-colors mb-2.5 font-heading">
          {service.title}
        </h3>
        <p className="text-sm text-[#64748B] leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Highlights List */}
        <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-[#3C4658] font-medium">
              <span className="w-4 h-4 rounded-full bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer / CTA Affordance */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-[#1E63D6] group-hover:text-[#1551B5]">
        <span>Explore Solution</span>
        <div className="w-8 h-8 rounded-full bg-[#DCEBFF] group-hover:bg-[#1E63D6] text-[#1E63D6] group-hover:text-white flex items-center justify-center transition-all duration-200">
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
