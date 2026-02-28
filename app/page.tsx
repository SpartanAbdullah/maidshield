import Link from "next/link";
import type { Metadata } from "next";

import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "MaidShield | UAE Domestic Worker Gratuity Calculator",
  description:
    "Get a clear, printable UAE domestic worker end-of-service estimate in minutes and avoid costly settlement mistakes.",
};

type IconProps = {
  className?: string;
};

function ClipboardCheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 3h6l1 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3z" />
      <path d="M9 3h6v4H9z" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3 5 6v6c0 5 3.4 8.7 7 9 3.6-.3 7-4 7-9V6z" />
      <path d="m9.5 12 2 2 3-3" />
    </svg>
  );
}

function UsersIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 19a4 4 0 0 0-8 0" />
      <circle cx="12" cy="11" r="3" />
      <path d="M22 19a4 4 0 0 0-3-3.9" />
      <path d="M5 15.1A4 4 0 0 0 2 19" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <Container className="space-y-16 sm:space-y-20">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Calculate Domestic Worker Gratuity in UAE \u2014 The Right Way
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Get a clear, printable end-of-service estimate in minutes.
                Avoid mistakes and close your case with confidence.
              </p>
              <p className="mt-3 max-w-xl text-sm text-slate-600">
                Mistakes in final settlement can lead to disputes or delays. Use
                a structured estimate before finalizing payment.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                No account required. No documents uploaded.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="https://app.maidshield.com"
                  className={buttonClassName(
                    "primary",
                    "md",
                    "h-12 px-7 text-base font-semibold shadow-sm"
                  )}
                >
                  Calculate Now
                </Link>
                <Link
                  href="/checklist"
                  className={buttonClassName("secondary")}
                >
                  View End-of-Service Checklist
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Service Duration</p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                2y 4m 10d
              </p>
              <div className="my-4 h-px bg-slate-200" />
              <p className="text-sm text-slate-500">Estimated Gratuity</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">
                AED 8,450.00
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="benefits-heading">
          <h2
            id="benefits-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Why household employers use MaidShield
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-3">
                <ClipboardCheckIcon className="h-6 w-6 text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">
                  Know the correct amount
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Avoid overpaying or underpaying by checking a clear estimate
                  before final settlement.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <ShieldIcon className="h-6 w-6 text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">
                  See the breakdown clearly
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Understand how the number was calculated, with service days,
                  unpaid leave, and salary shown in one view.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <UsersIcon className="h-6 w-6 text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">
                  Print and keep records
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Print a summary and share it with your worker or PRO for a
                  smoother closeout.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-labelledby="trust-heading">
          <h2
            id="trust-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Why trust MaidShield?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900">Privacy</h3>
                <p className="text-sm leading-6 text-slate-600">
                  No accounts required and no documents uploaded for core estimate
                  workflows.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900">Transparency</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Every estimate shows calculation breakdown lines and assumptions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900">Speed</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Instant estimate updates with a printable summary for handover.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          aria-labelledby="how-it-works-heading"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10"
        >
          <h2
            id="how-it-works-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            How it works
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                1
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Enter core inputs
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add start date, end date, salary, and optional unpaid leave.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                2
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Review the estimate
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Check service duration, breakdown lines, and assumptions in one
                summary.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                3
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Share and finalize
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Print or share the result before final legal or payroll review.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="structure-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="structure-heading"
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              How calculations are structured
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              MaidShield estimates are based on publicly available UAE domestic
              worker regulations and standard end-of-service principles.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Every estimate shows service duration, salary inputs, and
              calculation assumptions so you can review how the result was
              generated.
            </p>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              This tool provides structured estimates for planning purposes and
              does not replace formal legal advice.
            </p>
          </div>
        </section>

        <section aria-labelledby="trust-bar-heading">
          <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-slate-50 px-6 py-6">
            <h2
              id="trust-bar-heading"
              className="text-lg font-semibold text-slate-900"
            >
              Private by design
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• No accounts required</li>
              <li>• No documents uploaded</li>
              <li>• Estimates calculated instantly</li>
            </ul>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Estimates are for planning purposes and do not constitute legal
              advice.
            </p>
          </div>
        </section>

        <section aria-labelledby="updates-heading">
          <h2
            id="updates-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Get updates
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            No spam. Unsubscribe anytime.
          </p>
          <LeadCapture className="mt-6 max-w-2xl" />
        </section>

        <section>
          <p className="text-xs leading-5 text-slate-500">
            Estimates are for planning purposes only and do not constitute legal
            advice.
          </p>
        </section>
      </Container>
    </main>
  );
}

