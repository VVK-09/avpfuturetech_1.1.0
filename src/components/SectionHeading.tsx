import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className ? className : "mb-8 sm:mb-10"}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#DCEBFF] text-[#1E63D6] border border-[#BFDBFE] mb-4 shadow-xs`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E63D6] animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#0B1E3D] tracking-tight leading-tight font-heading">
        {title}{" "}
        {titleHighlight && (
          <span className="text-[#1E63D6] relative inline-block">
            {titleHighlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
