"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { RefreshCw, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_FACTS, TechFact } from "@/app/api/tech-facts/route";

export default function HeroTechFactsWidget() {
  const [currentFact, setCurrentFact] = useState<TechFact>(TECH_FACTS[0]);
  const [factIndex, setFactIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch next fact from API (or cycle local facts)
  const fetchNextFact = useCallback(async () => {
    setIsLoading(true);
    setProgress(0);

    try {
      const res = await fetch("/api/tech-facts?random=true");
      if (res.ok) {
        const data = await res.json();
        if (data.fact) {
          setCurrentFact(data.fact);
        }
      }
    } catch {
      // Fallback: cycle local facts
      const nextIdx = (factIndex + 1) % TECH_FACTS.length;
      setFactIndex(nextIdx);
      setCurrentFact(TECH_FACTS[nextIdx] || TECH_FACTS[0]);
    } finally {
      setIsLoading(false);
    }
  }, [factIndex]);

  // Auto-progress timer (8 seconds) with pause-on-hover
  useEffect(() => {
    if (isPaused) return;

    const stepMs = 80;
    const totalMs = 8000;
    const increment = (stepMs / totalMs) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          fetchNextFact();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, fetchNextFact]);

  return (
    <div
      className="relative rounded-xl bg-white/95 backdrop-blur-md shadow-sm hover:shadow-md border border-slate-200/90 p-2.5 sm:p-3 transition-all duration-300 text-left overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Subtle Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[#1E63D6] to-sky-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Bar: Icon + Category Badge + Next Fact Button */}
      <div className="flex items-center justify-between gap-2 mb-1 pt-0.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-4.5 h-4.5 rounded-md bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center shrink-0">
            <Cpu className="w-2.5 h-2.5" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1E63D6] truncate">
            {currentFact.categoryLabel}
          </span>
          {currentFact.yearOrMetric && (
            <span className="text-[10px] font-medium text-slate-400 hidden sm:inline truncate">
              • {currentFact.yearOrMetric}
            </span>
          )}
        </div>

        {/* Compact Next Fact Action */}
        <button
          onClick={() => fetchNextFact()}
          disabled={isLoading}
          title="Get next tech fact"
          className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#DCEBFF] text-[#1E63D6] hover:bg-[#BFDBFE] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-2.5 h-2.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Next Fact</span>
        </button>
      </div>

      {/* Fact Content with Smooth Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFact.id + currentFact.title}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <h4 className="text-xs sm:text-[13px] font-bold text-[#0B1E3D] leading-tight truncate">
            {currentFact.title}
          </h4>
          <p className="text-[11px] text-slate-600 font-medium leading-snug line-clamp-2 mt-0.5">
            {currentFact.fact}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
