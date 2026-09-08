import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Award,
} from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, SERVICES_LIST } from "@/lib/constants";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#0B1E3D] text-white relative overflow-hidden">
      {/* Decorative top circuit line accent */}
      <div className="h-1.5 w-full bg-linear-to-r from-[#1E63D6] via-[#38BDF8] to-[#1E63D6]" />

      {/* Background patterns and ambient lighting */}
      <div className="absolute inset-0 pattern-circuit-dark opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#1E63D6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info (2 Columns on large screens) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-16 w-36 sm:h-20 sm:w-44 flex items-center">
                <Image
                  src={SITE_CONFIG.logos.white}
                  alt="AVP FutureTech Logo"
                  fill
                  className="object-contain object-left brightness-105"
                />
              </div>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Bridging the opportunity gap by bringing world-class AI, IoT, Robotics, and STEM education to rural schools and colleges across India.
            </p>

            {/* Verified Credential Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>MCA Recognized</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
                <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>ISO 9001:2015</span>
              </span>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="block text-xs font-medium text-slate-400 mb-3 tracking-wider uppercase">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {/* LinkedIn SVG */}
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1E63D6] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1E63D6] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook SVG */}
                <a
                  href={SITE_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1E63D6] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* YouTube SVG */}
                <a
                  href={SITE_CONFIG.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1E63D6] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://internship.avpfuturetech.com/domains"
                  className="text-slate-300 hover:text-[#38BDF8] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Internship Domains</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://internship.avpfuturetech.com/verify"
                  className="text-slate-300 hover:text-[#38BDF8] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Verify Certificate</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/our-company#contact"
                  className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Contact Form</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions / Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Our Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#38BDF8] opacity-70" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Get In Touch
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-1" />
                <span className="leading-snug">{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0 mt-1" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap text-sm">
                    <a
                      href="tel:9307076962"
                      className="text-slate-100 font-medium hover:text-[#38BDF8] transition-colors"
                    >
                      +91 9307076962
                    </a>
                    <span className="text-slate-500">•</span>
                    <a
                      href="tel:7744001079"
                      className="text-slate-100 font-medium hover:text-[#38BDF8] transition-colors"
                    >
                      +91 7744001079
                    </a>
                  </div>
                  <span className="text-xs text-slate-400">
                    Mon – Sat, 9:00 AM – 6:00 PM IST
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-slate-100 font-medium hover:text-[#38BDF8] transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>© {currentYear} AVP FutureTech LLP. All rights reserved.</p>
            <p className="text-slate-400 text-xs flex items-center gap-1 justify-center md:justify-start">
              <span>Made with ❤️ in Kokan</span> • <span>Empowering Future Innovators</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#38BDF8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#38BDF8] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
