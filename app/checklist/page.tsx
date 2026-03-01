import type { Metadata } from "next";

import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "End-of-Service Checklist";
const pageDescription =
  "Use this UAE domestic worker end-of-service checklist to prepare documents, verify payments, and close out settlements cleanly.";

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

const checklistSections = [
  {
    title: "1) Before the final month (documents & verification)",
    items: [
      "Confirm employment start date, contract terms, and any amendments in one file.",
      "Collect passport copy, Emirates ID copy, visa details, and labor-related records.",
      "Check attendance logs and written leave approvals to avoid last-minute disputes.",
      "Align household records with payroll history before final calculations begin.",
    ],
  },
  {
    title: "2) Salary & leave reconciliation",
    items: [
      "Reconcile monthly salary paid versus contractual basic salary.",
      "Calculate pending salary days up to the final working date.",
      "Review annual leave balance and agree on leave encashment approach.",
      "Document any agreed deductions with signed acknowledgement where required.",
    ],
  },
  {
    title: "3) Gratuity / EOS settlement preparation (what inputs matter)",
    items: [
      "Confirm exact service period using start and end dates.",
      "Use the correct basic salary value for gratuity assumptions.",
      "Account for unpaid leave periods where policy or law affects service calculation.",
      "Prepare a line-item estimate so both sides can review the same numbers.",
    ],
  },
  {
    title: "4) Visa / cancellation / PRO coordination (high level)",
    items: [
      "Coordinate cancellation timeline with your PRO and relevant portals.",
      "Confirm medical, ID, and residency status actions needed for closure.",
      "Track government fees and who is responsible for each payment.",
      "Keep a dated checklist of each cancellation step and completion proof.",
    ],
  },
  {
    title: "5) Final day handover (keys, accommodation, receipts)",
    items: [
      "Collect keys, access cards, and household items against a signed list.",
      "Settle accommodation and utility arrangements where applicable.",
      "Issue final payment receipt with clear amount breakdown.",
      "Capture signatures from both parties on final handover confirmation.",
    ],
  },
  {
    title: "6) After completion (retain receipts, bank transfer proof)",
    items: [
      "Archive bank transfer confirmations, signed receipts, and settlement summary.",
      "Retain cancellation evidence and any official transaction references.",
      "Store records in a single folder for audit and future reference.",
      "Set an internal review reminder to improve the process for the next case.",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-14">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <PageHeader title="End of Service Checklist (UAE Domestic Workers)" />
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            This checklist helps households and operations teams prepare a
            structured closeout process for domestic worker end-of-service
            cases. It is a practical planning guide only and does not
            constitute legal advice.
          </p>
        </section>

        <section aria-labelledby="checklist-sections-heading">
          <h2
            id="checklist-sections-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Checklist Sections
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {checklistSections.map((section) => (
              <Card key={section.title}>
                <CardContent>
                  <h3 className="text-base font-semibold text-slate-900">
                    {section.title}
                  </h3>
                  <Divider className="my-4" />
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Estimate Before You Finalize
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Use MaidShield to run a quick EOS estimate and review inputs before
            your final settlement discussion.
          </p>
          <form action="https://app.maidshield.com/calculator" className="mt-5">
            <Button type="submit">Use the calculator</Button>
          </form>
        </section>

        <section aria-labelledby="checklist-updates-heading">
          <h2
            id="checklist-updates-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Get updates
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            No spam. Unsubscribe anytime.
          </p>
          <LeadCapture source="checklist-page" className="mt-6 max-w-2xl" />
        </section>
      </Container>
    </main>
  );
}
