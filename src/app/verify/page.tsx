"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectToInternshipsVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    const target = id ? `/internships/verify?id=${encodeURIComponent(id)}` : "/internships/verify";
    router.replace(target);
  }, [router, searchParams]);

  return null;
}

export default function VerifyRedirectPage() {
  return (
    <Suspense fallback={null}>
      <RedirectToInternshipsVerify />
    </Suspense>
  );
}
