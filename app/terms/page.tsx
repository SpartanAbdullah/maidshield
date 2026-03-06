import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Terms of Use";
const pageDescription = "Terms for using MaidShield as a planning-focused domestic worker settlement estimate tool.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/terms", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/terms", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

export default function TermsPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="max-w-4xl space-y-6">
        <PageHeader title="Terms of Use" subtitle="Effective date: Feb 2026" />

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Service purpose</h2><p>MaidShield is provided as an informational planning tool for UAE household employers preparing domestic worker end-of-service settlement.</p></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">No legal, payroll, or tax advice</h2><p>Outputs are estimates. MaidShield does not provide legal, tax, payroll, or accounting advice and does not create an advisor-client relationship.</p></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">User responsibility</h2><p>You are responsible for input accuracy, reviewing assumptions, and confirming final settlement figures against your records, contract terms, and any professional guidance required for your case.</p></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Acceptable use</h2><ul className="list-disc space-y-1 pl-5"><li>Use the tool for lawful planning and internal settlement preparation.</li><li>Do not misuse the service, attempt unauthorized access, or interfere with platform availability.</li><li>Do not rely on the estimate as the sole basis for disputed or complex legal outcomes.</li></ul></CardContent></Card>

        <Card><CardContent className="space-y-3 text-sm leading-6 text-slate-700"><h2 className="text-base font-semibold text-slate-900">Availability and updates</h2><p>We may update, improve, pause, or discontinue features at any time. Terms may be updated as the product matures.</p></CardContent></Card>
      </Container>
    </main>
  );
}
