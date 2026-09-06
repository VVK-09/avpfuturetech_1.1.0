"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Tag } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    title: string;
    category: string;
    description: string;
    image: string;
  } | null;
}

export default function Lightbox({ isOpen, onClose, item }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#092244]/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#092244] shadow-md flex items-center justify-center transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Full Image */}
        <div className="relative h-72 sm:h-[420px] md:h-[480px] w-full bg-slate-950">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </div>

        {/* Caption bar */}
        <div className="p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAF1FA] text-[#1275DB]">
                <Tag className="w-3 h-3" />
                {item.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#092244]">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
