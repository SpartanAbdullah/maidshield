import type { Metadata } from "next";
import Link from "next/link";

import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "End-of-Service Checklist";
const pageDescription = "Enhanced domestic worker end-of-service checklist for UAE household employers preparing final settlement.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/checklist", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/checklist", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

const checklistSections = [
  { title: "1) Collect core records", items: ["Employment contract and any written amendments.", "Start date, final working date, and cancellation timeline.", "Basic salary records and proof of monthly payments.", "Leave records, approvals, and unpaid leave notes."] },
  { title: "2) Prepare gratuity estimate inputs", items: ["Confirm exact dates before calculation.", "Use the basic monthly salary used for your case records.", "Enter unpaid leave days only when supported by records.", "Save or print the estimate breakdown for discussion."] },
  { title: "3) Review final settlement components", items: ["Pending salary days (if any).", "Leave encashment approach and amount.", "Gratuity estimate compared against records.", "Any agreed deductions documented and acknowledged."] },
  { title: "4) Complete final-day documents", items: ["Final settlement sheet with line items.", "Bank transfer proof or signed receipt.", "Handover checklist (keys, access cards, household items).", "Signatures from both sides where needed."] },
  { title: "5) Post-closure record keeping", items: ["Store receipts, transfer proof, and settlement sheet together.", "Keep cancellation references and final status records.", "Archive documents in one folder for future review.", "Record any process issue to improve next closeout."] },
];

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-14">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <PageHeader title="Domestic Worker End-of-Service Checklist" />
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">Use this as a practical planning checklist before final settlement. It is informational guidance and not legal advice.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Checklist sections</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {checklistSections.map((section) => (
              <Card key={section.title}><CardContent><h3 className="text-base font-semibold text-slate-900">{section.title}</h3><Divider className="my-4" /><ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">{section.items.map((item) => <li key={item}>{item}</li>)}</ul></CardContent></Card>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Run estimate before final payment</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Use the calculator for a draft gratuity amount, then verify with your records before final settlement.</p>
          <form action="https://app.maidshield.com/calculator" className="mt-5"><Button type="submit">Use the calculator</Button></form>
        </section>

        <Card>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">Related planning pages</h2>
            <p><Link href="/final-settlement-review" className="font-medium underline underline-offset-2">What to review before final settlement</Link></p>
            <p><Link href="/settlement-planning-guide" className="font-medium underline underline-offset-2">Printable settlement planning guide</Link></p>
            <p><Link href="/sources" className="font-medium underline underline-offset-2">Sources & assumptions</Link></p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Get updates</h2>
          <p className="mt-2 text-sm text-slate-600">No spam. Unsubscribe anytime.</p>
          <LeadCapture source="checklist-page" className="mt-6 max-w-2xl" />
        </section>
      </Container>
    </main>
  );
}
