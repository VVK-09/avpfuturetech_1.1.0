"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageSquare, PhoneCall } from "lucide-react";
import { FaqItem, SITE_CONFIG } from "@/lib/constants";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Accordion Container */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-white border-[#1E63D6]/40 shadow-md shadow-[#1E63D6]/5"
                  : "bg-white border-[#E2E8F0] hover:border-slate-300 shadow-xs"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1E63D6]"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                      isOpen
                        ? "bg-[#1E63D6] text-white"
                        : "bg-[#DCEBFF] text-[#1E63D6]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#0B1E3D] font-heading">
                    {item.question}
                  </span>
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "bg-[#DCEBFF] text-[#1E63D6] rotate-180"
                      : "bg-slate-50 text-slate-400"
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-[#64748B] text-sm sm:text-base leading-relaxed border-t border-slate-50">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions prompt */}
      <div className="mt-12 p-8 rounded-2xl bg-[#F0F4FA] border border-[#1E63D6]/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center shrink-0 shadow-xs">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#0B1E3D] font-heading">
              Still have questions?
            </h4>
            <p className="text-sm text-[#64748B]">
              Can’t find the answer you’re looking for? Our team is happy to assist.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/our-company#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneNumbers[0].replace(/[^0-9]/g, "")}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#0B1E3D] bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <PhoneCall className="w-4 h-4 text-[#1E63D6]" />
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
