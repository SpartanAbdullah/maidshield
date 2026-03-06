import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Privacy Policy";
const pageDescription = "How MaidShield handles privacy, data minimization, and browser-based calculation flows.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/privacy", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/privacy", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

export default function PrivacyPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-4xl space-y-6">
        <PageHeader title="Privacy Policy" subtitle="Effective date: Feb 2026" />

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Overview</h2><p>MaidShield is designed as a planning tool for UAE household employers. We aim to keep data collection minimal.</p></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Calculator inputs</h2><p>The calculator runs in your browser. During normal use, employment dates, salary values, and unpaid leave inputs are used to produce your estimate on your device.</p><p>No document upload is required for the estimate flow.</p></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Saved scenarios</h2><p>If you choose to save scenarios, they are stored locally in your browser storage for your convenience. You can delete them at any time from the calculator.</p></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Contact and waitlist forms</h2><p>If you submit a form (for example, updates, feedback, or waitlist), you provide contact details voluntarily. We use these details to reply, send requested updates, and improve the product.</p></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Use limitations and responsibility</h2><p>MaidShield provides informational estimates for planning. You remain responsible for verifying final settlement values against your records and obtaining professional advice when needed.</p></CardContent></Card>
      </Container>
    </main>
  );
}
