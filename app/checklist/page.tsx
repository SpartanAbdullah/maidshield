import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "End-of-Service Checklist";
const pageDescription = "Enhanced domestic worker end-of-service checklist for UAE household employers preparing final settlement.";

type ChecklistSection = {
  title: string;
  items: ReactNode[];
};

const checklistSections: ChecklistSection[] = [
  {
    title: "1) Before the final month (documents & verification)",
    items: [
      <>
        <strong>Service period:</strong> Confirm employment start date, contract terms,
        and any amendments in one file.
      </>,
      <>
        <strong>Documentation:</strong> Collect passport copy, Emirates ID copy, visa
        details, and labor-related records.
      </>,
      <>
        <strong>Leave records:</strong> Check attendance logs and written leave approvals
        to avoid last-minute disputes.
      </>,
      <>
        <strong>Salary records:</strong> Align household records with payroll history
        before final calculations begin.
      </>,
    ],
  },
  {
    title: "2) Salary & leave reconciliation",
    items: [
      <>
        <strong>Salary records:</strong> Reconcile monthly salary paid versus contractual
        basic salary.
      </>,
      <>
        <strong>Final payment:</strong> Calculate pending salary days up to the final
        working date.
      </>,
      <>
        <strong>Leave records:</strong> Review annual leave balance and agree on leave
        encashment approach.
      </>,
      <>
        <strong>Signature:</strong> Document any agreed deductions with signed
        acknowledgement where required.
      </>,
    ],
  },
  {
    title: "3) Gratuity / EOS settlement preparation (what inputs matter)",
    items: [
      <>
        <strong>Service period:</strong> Confirm it using exact start and end dates.
      </>,
      <>
        <strong>Salary records:</strong> Use the correct basic salary value for gratuity
        assumptions.
      </>,
      <>
        <strong>Leave records:</strong> Account for unpaid leave periods where policy or
        law affects service calculation.
      </>,
      <>
        <strong>Settlement confirmation:</strong> Prepare a line-item estimate so both
        sides can review the same numbers.
      </>,
    ],
  },
  {
    title: "4) Visa / cancellation / PRO coordination (high level)",
    items: [
      <>
        <strong>Visa cancellation:</strong> Coordinate the cancellation timeline with your
        PRO and relevant portals.
      </>,
      <>
        <strong>Documentation:</strong> Confirm medical, ID, and residency status actions
        needed for closure.
      </>,
      <>
        <strong>Government fees:</strong> Track each fee and who is responsible for the
        payment.
      </>,
      <>
        <strong>Clearance:</strong> Keep a dated checklist of each cancellation step and
        completion proof.
      </>,
    ],
  },
  {
    title: "5) Final day handover (keys, accommodation, receipts)",
    items: [
      <>
        <strong>Clearance:</strong> Collect keys, access cards, and household items
        against a signed list.
      </>,
      <>
        <strong>Documentation:</strong> Settle accommodation and utility arrangements
        where applicable.
      </>,
      <>
        <strong>Final payment:</strong> Issue a final payment receipt with clear amount
        breakdown.
      </>,
      <>
        <strong>Signature:</strong> Capture signatures from both parties on final handover
        confirmation.
      </>,
    ],
  },
  {
    title: "6) After completion (retain receipts, bank transfer proof)",
    items: [
      <>
        <strong>Settlement confirmation:</strong> Archive bank transfer confirmations,
        signed receipts, and settlement summary.
      </>,
      <>
        <strong>Visa cancellation:</strong> Retain cancellation evidence and any official
        transaction references.
      </>,
      <>
        <strong>Documentation:</strong> Store records in a single folder for audit and
        future reference.
      </>,
      <>
        <strong>Clearance review:</strong> Set an internal reminder to improve the process
        for the next case.
      </>,
    ],
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: makeCanonical("/checklist", "www"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/checklist",
    base: "www",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

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
              <Card key={section.title}>
                <CardContent>
                  <h3 className="text-base font-semibold text-slate-900">
                    {section.title}
                  </h3>
                  <Divider className="my-4" />
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                    {section.items.map((item, index) => (
                      <li key={`${section.title}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
