import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonClassName } from "@/components/ui/Button";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Common Gratuity Calculation Mistakes";
const pageDescription = "Common avoidable mistakes in UAE domestic worker gratuity planning, with practical checks for household employers.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/gratuity-mistakes", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/gratuity-mistakes", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

const mistakes = [
  "Using the wrong service dates or forgetting contract amendments.",
  "Mixing basic salary with allowances without checking case requirements.",
  "Ignoring unpaid leave periods that affect counted service days.",
  "Relying on one number without keeping a visible breakdown.",
  "Finalizing payment before checking records and cancellation steps.",
];

export default function GratuityMistakesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <Container className="max-w-4xl space-y-8">
        <PageHeader title="Common gratuity calculation mistakes" subtitle="Simple checks that prevent avoidable settlement errors." />
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Most common mistakes</h2><ul className="list-disc space-y-1 pl-5">{mistakes.map((item) => <li key={item}>{item}</li>)}</ul></CardContent></Card>
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Safer workflow</h2><ol className="list-decimal space-y-1 pl-5"><li>Run the estimate.</li><li>Compare every input with your records.</li><li>Review checklist items before final transfer.</li><li>Keep signed documents and payment proof together.</li></ol></CardContent></Card>
        <div className="flex flex-wrap gap-3"><Link href="https://app.maidshield.com/calculator" className={buttonClassName()}>Run calculator</Link><Link href="/checklist" className={buttonClassName("secondary")}>Use checklist</Link><Link href="/how-gratuity-estimates-work" className={buttonClassName("secondary")}>How calculations work</Link></div>
      </Container>
    </main>
  );
}
