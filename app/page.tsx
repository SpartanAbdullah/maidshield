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
                Calculate Domestic Worker Gratuity in UAE — The Right Way
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Get a clear, printable end-of-service estimate in minutes.
                Avoid mistakes and close your case with confidence.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="https://app.maidshield.com"
                  className={buttonClassName("primary", "md", "shadow-sm")}
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
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img
                src="/images/calculator-preview.png"
                alt="MaidShield calculator interface preview"
                className="h-auto w-full object-cover"
              />
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

        <section aria-labelledby="social-proof-heading">
          <h2
            id="social-proof-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Social Proof
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-3">
                <p className="text-sm leading-6 text-slate-600">
                  "MaidShield made our final settlement review faster and much
                  clearer."
                </p>
                <p className="text-sm font-medium text-slate-900">
                  Jane D., Household Manager
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <p className="text-sm leading-6 text-slate-600">
                  "The breakdown gave us confidence before discussing final
                  amounts."
                </p>
                <p className="text-sm font-medium text-slate-900">
                  Omar K., Employer
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <p className="text-sm leading-6 text-slate-600">
                  "Simple enough for quick checks, structured enough for team
                  handover."
                </p>
                <p className="text-sm font-medium text-slate-900">
                  Sara M., Operations Lead
                </p>
              </CardContent>
            </Card>
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
