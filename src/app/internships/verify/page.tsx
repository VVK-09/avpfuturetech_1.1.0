"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InternshipRoot from "@/internship-portal/InternshipRoot";

function VerifyPageWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return <InternshipRoot initialView="verify" initialId={id} />;
}

export default function InternshipVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#07152B]">
          <div className="text-center text-white">
            <div className="w-10 h-10 border-3 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-300">Loading Certificate Verification...</p>
          </div>
        </div>
      }
    >
      <VerifyPageWrapper />
    </Suspense>
  );
}
