"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStandaloneRoute =
    pathname.startsWith("/internship") ||
    pathname.startsWith("/internships") ||
    pathname.startsWith("/admin");

  if (isStandaloneRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
