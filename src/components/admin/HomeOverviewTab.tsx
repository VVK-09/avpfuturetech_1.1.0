"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MessageSquare, 
  Camera, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Building2
} from "lucide-react";
import { db } from "@/lib/firebaseClient";
import { collection, onSnapshot } from "firebase/firestore";
import { initialInquiries } from "@/internship-portal/data/initialInquiries";
import { GALLERY_ITEMS } from "@/lib/constants";

interface HomeOverviewTabProps {
  adminUser: any;
  onNavigateTab: (tabId: string) => void;
}

export default function HomeOverviewTab({ adminUser, onNavigateTab }: HomeOverviewTabProps) {
  const [inquiries, setInquiries] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("avp_inquiries");
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return initialInquiries;
  });

  const [galleryItems, setGalleryItems] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("avp_gallery_items");
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return GALLERY_ITEMS;
  });

  // Real-time Firestore sync
  useEffect(() => {
    const firestore = db as any;
    if (!firestore) return;
    try {
      const unsubInq = onSnapshot(collection(firestore, "inquiries"), (snapshot) => {
        if (!snapshot.empty) {
          setInquiries(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      });
      const unsubGal = onSnapshot(collection(firestore, "gallery_items"), (snapshot) => {
        if (!snapshot.empty) {
          setGalleryItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      });
      return () => {
        unsubInq();
        unsubGal();
      };
    } catch {}
  }, []);

  const pendingCount = inquiries.filter((i) => i.status === "Pending").length;
  const recentInquiries = inquiries.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-[#0B1E3D] via-[#153466] to-[#1E63D6] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#38BDF8]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#38BDF8] border border-white/15 mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Console v2.0</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
            Welcome, {adminUser?.name || "Administrator"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
            Manage corporate inquiries, school workshop partnerships, Atal Tinkering Labs (ATL) requests, and live website photo gallery in one place.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("inquiries")}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#38BDF8] hover:bg-[#22aae8] text-[#0B1E3D] transition-all shadow-md shadow-black/10 cursor-pointer"
            >
              Review {pendingCount} Pending Inquiries
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab("gallery")}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-all cursor-pointer"
            >
              Manage Photo Gallery ({galleryItems.length})
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all inline-flex items-center gap-1.5"
            >
              <span>View Live Home Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Leads</span>
            <span className="w-9 h-9 rounded-xl bg-blue-50 text-[#1E63D6] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-[#0B1E3D]">{inquiries.length}</span>
            <span className="text-xs text-slate-400 block mt-0.5">Recorded in Firestore</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700">Action Required</span>
            <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-amber-600">{pendingCount}</span>
            <span className="text-xs text-amber-700/70 block mt-0.5">Awaiting counselor callback</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Live Gallery Photos</span>
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-[#0B1E3D]">{galleryItems.length}</span>
            <span className="text-xs text-slate-400 block mt-0.5">Live on /gallery page</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">System Status</span>
            <span className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-sm font-bold text-green-600 flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>100% Operational</span>
            </span>
            <span className="text-xs text-slate-400 block mt-1">Firestore & 2FA Active</span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B1E3D] font-heading">
              Recent Inquiries & Queries
            </h3>
            <p className="text-xs text-slate-500">
              Latest submissions received from schools and students
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("inquiries")}
            className="text-xs font-bold text-[#1E63D6] hover:underline inline-flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentInquiries.map((inq) => {
            const cleanPhone = inq.phone ? inq.phone.replace(/\D/g, "") : "";
            const waText = encodeURIComponent(
              `Hi ${inq.name}, greetings from AVP FutureTech regarding your inquiry (#${inq.id}).`
            );

            return (
              <div key={inq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0B1E3D] flex items-center justify-center font-bold text-sm shrink-0">
                    {(inq.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0B1E3D]">{inq.name}</span>
                      {inq.organization && inq.organization !== "Direct Inquiry" && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {inq.organization}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {inq.inquiryType || "General"} • {inq.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      inq.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : inq.status === "Contacted"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {inq.status}
                  </span>

                  {cleanPhone && (
                    <a
                      href={`https://wa.me/91${cleanPhone}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
