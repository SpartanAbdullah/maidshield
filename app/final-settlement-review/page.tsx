import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonClassName } from "@/components/ui/Button";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Before Final Settlement";
const pageDescription = "What household employers should review before domestic worker final settlement in the UAE.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/final-settlement-review", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/final-settlement-review", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

export default function FinalSettlementReviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <Container className="max-w-4xl space-y-8">
        <PageHeader title="What to review before final settlement" subtitle="A compact review checklist before you make the final payment." />
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Core records</h2><ul className="list-disc space-y-1 pl-5"><li>Employment contract, start date, end date, and amendments.</li><li>Salary records and any pending days due.</li><li>Leave balance records and any encashment approach.</li><li>Unpaid leave evidence where relevant.</li></ul></CardContent></Card>
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Settlement documents</h2><ul className="list-disc space-y-1 pl-5"><li>Visa or cancellation process status with your PRO.</li><li>Final amount breakdown reviewed by both parties.</li><li>Payment receipt and transfer proof.</li><li>Signed acknowledgements for handover and final settlement.</li></ul></CardContent></Card>
        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Planning note</h2><p>MaidShield helps you organize a draft estimate and assumptions quickly. Final responsibility stays with the employer and should be confirmed against official records.</p></CardContent></Card>
        <div className="flex flex-wrap gap-3"><Link href="/checklist" className={buttonClassName("secondary")}>Full end-of-service checklist</Link><Link href="https://app.maidshield.com/calculator" className={buttonClassName()}>Run estimate</Link><Link href="/faq" className={buttonClassName("secondary")}>Help & FAQ</Link></div>
      </Container>
    </main>
  );
}
