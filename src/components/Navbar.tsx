"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E2E8F0] py-3"
          : "bg-white/90 backdrop-blur-sm py-4 border-b border-[#E2E8F0]/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="relative h-11 w-36 sm:h-12 sm:w-44 flex items-center">
              <Image
                src={SITE_CONFIG.logos.color}
                alt="AVP FutureTech Logo"
                fill
                priority
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative flex items-center gap-1.5 ${
                    isActive
                      ? "!text-[#1E63D6] bg-[#DCEBFF]/80 font-bold"
                      : "!text-[#0B1E3D] hover:!text-[#1E63D6] hover:bg-[#F0F4FA]"
                  }`}
                >
                  {link.label === "Internships" && (
                    <span className="w-2 h-2 rounded-full bg-[#1E63D6] animate-pulse shrink-0" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="tel:9307076962"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold !text-slate-600 hover:!text-[#1E63D6] transition-colors"
              title="Call AVP FutureTech"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>+91 9307076962</span>
            </Link>
            <Link
              href="https://internship.avpfuturetech.com/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold !text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 hover:shadow-lg hover:shadow-[#1E63D6]/35 transition-all duration-200 group"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sky-200" />
              <span>Internship Portal</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden gap-2">
            <Link
              href="https://internship.avpfuturetech.com/"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] transition-colors shadow-xs"
            >
              Internships
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0B1E3D] hover:bg-[#F0F4FA] focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white border-b border-[#E2E8F0] shadow-xl py-6 px-6 z-50 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-[#1E63D6] bg-[#DCEBFF]/70 font-bold"
                      : "text-[#0B1E3D] hover:bg-[#F0F4FA] hover:text-[#1E63D6]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#1E63D6]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="https://internship.avpfuturetech.com/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/20"
            >
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>Explore Internships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/our-company#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center font-semibold text-[#0B1E3D] border border-slate-200 hover:bg-[#F0F4FA]"
            >
              Contact Us
            </Link>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#1E63D6]" />
              <span>+91 9307076962 / +91 7744001079</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
