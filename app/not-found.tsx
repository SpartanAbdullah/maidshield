"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/layout/Container";
import { buttonClassName } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export default function NotFound() {
  useEffect(() => {
    track("broken_page_detected", { status: 404 });
  }, []);

  return (
    <main className="min-h-[60vh] py-16">
      <Container className="max-w-2xl space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="text-sm text-slate-600">
          This link may be outdated. Use one of the main flows below.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/" className={buttonClassName("secondary")}>
            Homepage
          </Link>
          <Link href="/calculator" className={buttonClassName()}>
            Calculator
          </Link>
        </div>
      </Container>
    </main>
  );
}
