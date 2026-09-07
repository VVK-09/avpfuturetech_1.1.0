"use client";

import React, { Suspense } from "react";
import InternshipRoot from "@/internship-portal/InternshipRoot";

export default function InternshipDomainsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#07152B]">
          <div className="text-center text-white">
            <div className="w-10 h-10 border-3 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-300">Loading All Internship Domains...</p>
          </div>
        </div>
      }
    >
      <InternshipRoot initialView="all-domains" />
    </Suspense>
  );
}
