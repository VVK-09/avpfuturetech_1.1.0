"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
  isSubdomainServer = false,
}: {
  children: React.ReactNode;
  isSubdomainServer?: boolean;
}) {
  const pathname = usePathname();

  const isClientSubdomain =
    typeof window !== "undefined" &&
    (window.location.hostname.startsWith("internship.") ||
      window.location.hostname.startsWith("internships."));

  const isSubdomain = isSubdomainServer || isClientSubdomain;

  const isStandaloneRoute =
    isSubdomain ||
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
