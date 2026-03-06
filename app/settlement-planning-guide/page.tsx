import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonClassName } from "@/components/ui/Button";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Printable Settlement Planning Guide";
const pageDescription = "A printable planning flow for UAE household employers preparing domestic worker end-of-service settlement.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/settlement-planning-guide", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/settlement-planning-guide", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

export default function SettlementPlanningGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <Container className="max-w-4xl space-y-8">
        <PageHeader title="Printable settlement planning guide" subtitle="Use this short flow as a practical one-page planning reference." />
        <Card>
          <CardContent className="space-y-4 text-sm leading-6 text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">Planning flow</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Gather records: contract dates, salary history, leave records, and cancellation status.</li>
              <li>Run a gratuity estimate and check assumptions line by line.</li>
              <li>Compare the estimate against your records and resolve gaps.</li>
              <li>Prepare final settlement sheet and payment proof format.</li>
              <li>Complete handover, signatures, and archive all documents.</li>
            </ol>
            <p className="text-xs text-slate-500">Planning use only. Confirm final settlement with your official records and advisors where needed.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">Linked resources</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li><Link href="/checklist" className="font-medium underline underline-offset-2">End-of-service checklist</Link></li>
              <li><Link href="/final-settlement-review" className="font-medium underline underline-offset-2">Before final settlement review page</Link></li>
              <li><Link href="/sources" className="font-medium underline underline-offset-2">Sources & assumptions</Link></li>
              <li><Link href="/faq" className="font-medium underline underline-offset-2">Help & FAQ</Link></li>
            </ul>
          </CardContent>
        </Card>
        <div className="flex flex-wrap gap-3"><Link href="https://app.maidshield.com/calculator" className={buttonClassName()}>Open calculator</Link><Link href="/pricing" className={buttonClassName("secondary")}>See free vs Pro</Link></div>
      </Container>
    </main>
  );
}
