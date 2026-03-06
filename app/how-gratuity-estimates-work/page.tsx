import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonClassName } from "@/components/ui/Button";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "How Gratuity Estimates Are Calculated";
const pageDescription = "Understand how MaidShield structures UAE domestic worker gratuity estimates and what to verify before final settlement.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/how-gratuity-estimates-work", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/how-gratuity-estimates-work", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

export default function HowGratuityEstimatesWorkPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <Container className="max-w-4xl space-y-8">
        <PageHeader title="How gratuity estimates are calculated" subtitle="A plain-English walkthrough for UAE household employers." />
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Inputs used</h2><p>MaidShield uses start date, end date, basic monthly salary, and optional unpaid leave days to build an estimate.</p><p>It does not auto-detect your contract terms, bank records, allowances, or dispute outcomes.</p></CardContent></Card>
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">How the estimate is structured</h2><ul className="list-disc space-y-1 pl-5"><li>Service duration is derived from the dates entered.</li><li>Unpaid leave days reduce adjusted service days when provided.</li><li>The estimate is calculated from salary and adjusted service period.</li><li>A visible breakdown and assumptions list is shown with the result.</li></ul></CardContent></Card>
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">What to verify before final settlement</h2><ul className="list-disc space-y-1 pl-5"><li>Contract dates and any amendments.</li><li>Which salary definition applies in your case.</li><li>Any unpaid leave evidence and approvals.</li><li>Records for pending salary, leave balance, and payment receipts.</li></ul><p>Use this estimate as planning support, then confirm final figures with your records and advisors.</p></CardContent></Card>
        <div className="flex flex-wrap gap-3"><Link href="https://app.maidshield.com/calculator" className={buttonClassName()}>Open calculator</Link><Link href="/sources" className={buttonClassName("secondary")}>Sources & assumptions</Link><Link href="/final-settlement-review" className={buttonClassName("secondary")}>Before final settlement</Link></div>
      </Container>
    </main>
  );
}
