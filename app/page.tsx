import Link from "next/link";

import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <Container className="space-y-16 sm:space-y-20">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-14">
          <PageHeader
            title="Calm clarity for domestic worker settlement planning"
            subtitle="MaidShield helps teams produce consistent, transparent estimates with less back-and-forth and better operational control."
            actions={
              <>
                <Link
                  href="https://app.maidshield.com/calculator"
                  className={buttonClassName()}
                >
                  Open App
                </Link>
                <Link href="/about" className={buttonClassName("secondary")}>
                  Learn more
                </Link>
                <Link href="/pro" className={buttonClassName("ghost")}>
                  Join Pro waitlist
                </Link>
              </>
            }
          />
        </section>

        <section aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Built for steady, repeatable operations
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Keep every estimate structured, auditable, and easier to explain to
            internal teams and households.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Structured Inputs
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Guided fields help teams collect required details in a uniform
                  format every time.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Transparent Breakdown
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  See how each factor contributes to the estimate, so reviews are
                  clear and accountable.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Team-Ready Outputs
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Generate consistent summaries that are easier to hand over,
                  validate, and archive.
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
                Step 1
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Enter case details
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add employment and jurisdiction inputs with clear field guidance.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Step 2
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Review assumptions
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Inspect line items and make sure each estimate reflects your case
                context.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Step 3
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Share and proceed
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use a readable summary to align teams before formal legal review.
              </p>
            </div>
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
