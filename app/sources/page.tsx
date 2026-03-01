import type { Metadata } from "next";
import Link from "next/link";

import { FeedbackForm } from "@/components/forms/FeedbackForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Sources & Assumptions";
const pageDescription =
  "Review how MaidShield produces planning estimates, which assumptions it uses, and what to verify before final settlement.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: makeCanonical("/sources", "www"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/sources",
    base: "www",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

const keyAssumptions = [
  "Uses the start and end dates entered by the user.",
  "Uses the basic monthly salary entered by the user.",
  "Reduces counted service days when unpaid leave days are provided.",
  "Provides an estimate for planning that should be confirmed for the actual case.",
];

const verificationSteps = [
  "Confirm the dates match the contract period and visa timeline.",
  "Confirm which salary definition should be used for settlement.",
  "Keep payment proof, receipts, and signed acknowledgements together.",
  "If anything is unclear, confirm the final position with your PRO, HR advisor, or legal counsel.",
];

const privacyPoints = [
  "No account is required to use the calculator.",
  "No documents are uploaded as part of the estimate flow.",
  "Calculator inputs are not stored on the server for the calculation itself.",
];

const unsureSteps = [
  "Confirm dates and salary definition with your PRO or HR advisor.",
  "Keep receipts or bank transfer proof for payments.",
  "If your case includes allowances, disputes, or special clauses, get formal guidance before final settlement.",
];

export default function SourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <Container className="max-w-3xl space-y-8">
        <PageHeader
          title="Sources & assumptions"
          subtitle="How MaidShield produces estimates and what to verify before final settlement."
        />
        <p className="text-xs text-slate-500">Last reviewed: Feb 2026</p>

        <Card>
          <CardContent className="space-y-6">
            <section className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                What MaidShield does
              </h2>
              <p className="text-sm leading-6 text-slate-700">
                MaidShield gives household employers a structured estimate to
                help with planning before final settlement.
              </p>
              <p className="text-sm leading-6 text-slate-700">
                Each estimate shows the service duration, the inputs used, and
                the breakdown lines behind the result so the numbers can be
                reviewed before payment.
              </p>
            </section>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                What MaidShield does NOT do
              </h2>
              <p className="text-sm leading-6 text-slate-700">
                MaidShield is not a legal advice service and should not be used
                as the only basis for a final settlement decision.
              </p>
              <p className="text-sm leading-6 text-slate-700">
                It does not resolve edge cases, disputes, allowances,
                government fees, or special contract clauses that may affect
                the final amount.
              </p>
            </section>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                Key assumptions
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {keyAssumptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                What to verify before paying
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {verificationSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                Privacy note
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {privacyPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                If you are unsure
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {unsureSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              Send feedback
            </h2>
            <p className="text-sm leading-6 text-slate-700">
              If something looks off, tell us - we improve MaidShield based on
              real UAE household cases.
            </p>
            <p className="text-xs text-slate-500">
              No personal documents needed - describe your scenario generally.
            </p>
            <FeedbackForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              Next step
            </h2>
            <p className="text-sm leading-6 text-slate-700">
              Use the calculator for a planning estimate, then confirm the final
              figures against your records before making payment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://app.maidshield.com/calculator"
                className={buttonClassName()}
              >
                Open calculator
              </Link>
              <Link href="/checklist" className={buttonClassName("secondary")}>
                View checklist
              </Link>
            </div>
            <p className="text-sm text-slate-600">
              <Link
                href="/pro"
                className="font-medium text-slate-700 underline underline-offset-2"
              >
                Join Pro waitlist
              </Link>
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
