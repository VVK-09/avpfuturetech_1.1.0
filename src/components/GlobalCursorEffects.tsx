"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GlobalCursorEffects() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const spotlightPos = useRef({ x: -200, y: -200 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isActive) setIsActive(true);

      // Interactive element detection
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          "a, button, input, textarea, select, [role='button'], .card-hover, .interactive-hover, .nav-link, .group, .card"
        );
        setIsHovering(!!interactiveEl);

        // Dynamic Card Spotlight Tracker (Linear / Vercel style)
        const cardEl = target.closest(
          ".card-hover, .card, article, [data-spotlight], .service-card, .border"
        ) as HTMLElement | null;

        if (cardEl) {
          const rect = cardEl.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          cardEl.style.setProperty("--mouse-x", `${x}px`);
          cardEl.style.setProperty("--mouse-y", `${y}px`);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsActive(false);
    const handleMouseEnter = () => setIsActive(true);
    const handleTouchStart = () => setIsActive(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // High performance continuous 120fps RAF loop
    const loop = () => {
      // 1. Direct inner laser dot translation
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // 2. Smooth Lerp outer magnetic ring
      const lerpRing = 0.24;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpRing;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpRing;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // 3. Ambient atmospheric spotlight
      const lerpSpotlight = 0.08;
      spotlightPos.current.x += (mousePos.current.x - spotlightPos.current.x) * lerpSpotlight;
      spotlightPos.current.y += (mousePos.current.y - spotlightPos.current.y) * lerpSpotlight;
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightPos.current.x}px, ${spotlightPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("touchstart", handleTouchStart);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isActive]);

  return (
    <div aria-hidden="true" className="select-none pointer-events-none">
      {/* 1. Global Ambient Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 -ml-[250px] -mt-[250px] w-[500px] h-[500px] rounded-full z-[1] transition-opacity duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(30, 99, 214, 0.12) 0%, rgba(56, 189, 248, 0.06) 35%, rgba(30, 99, 214, 0.01) 60%, transparent 80%)",
          opacity: isActive ? 1 : 0,
          willChange: "transform",
        }}
      />

      {/* 2. Fluid Magnetic Follower Halo Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 rounded-full z-[999999] transition-[width,height,margin,border-color,background-color,box-shadow,opacity] duration-200 ease-out flex items-center justify-center"
        style={{
          width: isHovering ? "48px" : isClicking ? "22px" : "32px",
          height: isHovering ? "48px" : isClicking ? "22px" : "32px",
          marginLeft: isHovering ? "-24px" : isClicking ? "-11px" : "-16px",
          marginTop: isHovering ? "-24px" : isClicking ? "-11px" : "-16px",
          border: isHovering
            ? "2px solid rgba(30, 99, 214, 0.85)"
            : "1.5px solid rgba(30, 99, 214, 0.45)",
          backgroundColor: isHovering
            ? "rgba(30, 99, 214, 0.12)"
            : isClicking
            ? "rgba(30, 99, 214, 0.25)"
            : "rgba(30, 99, 214, 0.03)",
          backdropFilter: isHovering ? "blur(2px)" : "none",
          WebkitBackdropFilter: isHovering ? "blur(2px)" : "none",
          opacity: isActive ? 1 : 0,
          boxShadow: isHovering
            ? "0 0 20px rgba(30, 99, 214, 0.35), inset 0 0 10px rgba(56, 189, 248, 0.2)"
            : "0 0 8px rgba(30, 99, 214, 0.15)",
          willChange: "transform",
        }}
      />

      {/* 3. Laser Precision Center Micro-Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] rounded-full bg-[#1E63D6] z-[999999] transition-[opacity,transform] duration-75"
        style={{
          opacity: isActive ? (isHovering ? 0.85 : 1) : 0,
          boxShadow: "0 0 8px #1E63D6, 0 0 14px rgba(56, 189, 248, 0.9)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

