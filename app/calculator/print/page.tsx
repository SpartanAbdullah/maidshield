import Link from "next/link";
import type { Metadata } from "next";

import { calculateGratuityEstimate } from "@/lib/rules/uae_domestic_worker";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { MARKETING_BASE_URL, buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Print Summary",
  description: "Printable summary for MaidShield gratuity planning estimates.",
  alternates: {
    canonical: makeCanonical("/calculator", "app"),
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: buildOpenGraph({
    title: "Print Summary",
    description: "Printable summary for MaidShield gratuity planning estimates.",
    path: "/calculator",
    base: "app",
  }),
  twitter: buildTwitter({
    title: "Print Summary",
    description: "Printable summary for MaidShield gratuity planning estimates.",
  }),
};

type PrintPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string {
  const value = params[key];
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

function parseNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDate(value: string): string {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function CalculatorPrintPage({ searchParams }: PrintPageProps) {
  const params = await searchParams;
  const startDate = readParam(params, "startDate");
  const endDate = readParam(params, "endDate");
  const basicMonthlySalary = parseNumber(readParam(params, "basicMonthlySalary"));
  const unpaidLeaveDays = parseNumber(readParam(params, "unpaidLeaveDays"));
  const notes = readParam(params, "notes");

  const estimate = calculateGratuityEstimate({
    startDate,
    endDate,
    basicMonthlySalary,
    unpaidLeaveDays,
    notes: notes || undefined,
  });

  const generatedAt = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="py-8 print:py-0">
      <Container className="max-w-4xl print:max-w-none print:px-0">
        <Card className="print:rounded-none print:border-0 print:shadow-none">
          <CardContent className="space-y-6 p-8 print:p-4">
            <header>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                MaidShield Settlement Summary
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Date generated: {generatedAt}
              </p>
              <p className="mt-2 text-xs text-slate-500 print:hidden">
                Print / Save as PDF: use your browser print dialog (`Ctrl/Cmd + P`)
                and choose "Save as PDF".
              </p>
            </header>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Inputs
              </h2>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">Start Date</dt>
                  <dd className="text-slate-900">
                    {formatDate(estimate.inputsUsed.startDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">End Date</dt>
                  <dd className="text-slate-900">
                    {formatDate(estimate.inputsUsed.endDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Basic Monthly Salary</dt>
                  <dd className="text-slate-900">
                    AED {estimate.inputsUsed.basicMonthlySalary.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Unpaid Leave Days</dt>
                  <dd className="text-slate-900">{estimate.inputsUsed.unpaidLeaveDays}</dd>
                </div>
              </dl>
              {notes ? (
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Notes:</span> {notes}
                </p>
              ) : null}
            </section>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Results
              </h2>
              <p className="text-sm text-slate-800">
                Service Duration: {estimate.serviceDuration.years}y{" "}
                {estimate.serviceDuration.months}m {estimate.serviceDuration.days}d
              </p>
              <p className="text-xs text-slate-600">
                Total days: {estimate.serviceDuration.totalDays} | Adjusted
                service days: {estimate.adjustedServiceDays}
              </p>
              <p className="text-xl font-semibold tracking-tight text-slate-900">
                Estimated Gratuity: AED {estimate.gratuityAmount.toFixed(2)}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Calculation Breakdown
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {estimate.breakdownLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                What This Includes / Excludes
              </h2>
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Includes
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                    <li>Service duration</li>
                    <li>Salary-based estimate</li>
                    <li>Unpaid leave adjustment</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Excludes
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                    <li>Legal edge cases</li>
                    <li>Disputes</li>
                    <li>Allowances and government fees</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Warnings & Assumptions
              </h2>
              {estimate.warnings.length > 0 ? (
                <ul className="space-y-2 text-sm text-amber-700">
                  {estimate.warnings.map((warning) => (
                    <li key={warning} className="rounded border border-amber-200 bg-amber-50 px-3 py-2">
                      {warning}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600">No warnings.</p>
              )}

              <ul className="space-y-2 text-sm text-slate-600">
                {estimate.assumptionsUsed.map((assumption) => (
                  <li key={assumption}>{assumption}</li>
                ))}
              </ul>
            </section>

            <Divider />

            <section className="text-xs leading-6 text-slate-500">
              <p>
                Disclaimer: This summary is an estimate for planning only and is
                not legal, tax, payroll, or accounting advice.
              </p>
              <p>
                No professional advisory relationship is created by using this
                tool. Confirm final values with qualified professionals.
              </p>
              <p>
                <Link
                  href={`${MARKETING_BASE_URL}/sources`}
                  className="font-medium text-slate-600 underline underline-offset-2"
                >
                  Sources &amp; assumptions
                </Link>
              </p>
            </section>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

