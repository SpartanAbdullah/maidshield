import Link from "next/link";

import { BreakdownRow } from "@/components/calculator/BreakdownRow";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { HelperBlock } from "@/components/ui/HelperBlock";
import {
  buildEstimateBreakdownSections,
  formatCurrency,
  formatDate,
  getEstimateStructureNotes,
} from "@/lib/calculator/presentation";
import { calculateGratuityEstimate } from "@/lib/rules/uae_domestic_worker";
import { MARKETING_BASE_URL } from "@/app/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  const breakdownSections = buildEstimateBreakdownSections(estimate);
  const estimateStructureNotes = getEstimateStructureNotes(estimate);

  const generatedAt = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="py-8 print:py-0">
      <Container className="max-w-5xl print:max-w-none print:px-0">
        <Card className="print:rounded-none print:border-0 print:shadow-none">
          <CardContent className="space-y-6 p-8 print:p-4">
            <header>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                MaidShield Settlement Estimate Summary
              </h1>
              <p className="mt-1 text-sm text-slate-600">Date generated: {generatedAt}</p>
              <p className="mt-2 text-xs text-slate-500 print:hidden">
                Print or save as PDF using your browser print dialog (`Ctrl/Cmd + P`).
              </p>
            </header>

            <HelperBlock title="Planning reminder" icon="info" tone="neutral" className="print:hidden">
              This summary is an estimate based on the inputs provided. Review it against your records before final settlement.
            </HelperBlock>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Inputs used
              </h2>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">Start date</dt>
                  <dd className="mt-1 text-slate-900">{formatDate(estimate.inputsUsed.startDate)}</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">End date</dt>
                  <dd className="mt-1 text-slate-900">{formatDate(estimate.inputsUsed.endDate)}</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">Basic monthly salary</dt>
                  <dd className="mt-1 text-slate-900">{formatCurrency(estimate.inputsUsed.basicMonthlySalary)}</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">Unpaid leave days</dt>
                  <dd className="mt-1 text-slate-900">{estimate.inputsUsed.unpaidLeaveDays}</dd>
                </div>
              </dl>
              {notes ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Notes:</span> {notes}
                </div>
              ) : null}
            </section>

            <Divider />

            <section className="rounded-[28px] bg-slate-900 px-6 py-6 text-white">
              <p className="text-sm text-slate-300">Estimated gratuity</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">{formatCurrency(estimate.gratuityAmount)}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Service duration</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {estimate.serviceDuration.years}y {estimate.serviceDuration.months}m {estimate.serviceDuration.days}d
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Total service days</p>
                  <p className="mt-1 text-sm font-semibold text-white">{estimate.serviceDuration.totalDays}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Eligible service days</p>
                  <p className="mt-1 text-sm font-semibold text-white">{estimate.adjustedServiceDays}</p>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Calculation breakdown
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The rows below explain how the estimate is structured, based on the information supplied in this print view.
                </p>
              </div>
              <div className="space-y-5">
                {breakdownSections.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{section.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{section.description}</p>
                    </div>
                    <div className="grid gap-3">
                      {section.rows.map((row) => (
                        <BreakdownRow
                          key={row.label}
                          label={row.label}
                          value={row.value}
                          helper={row.helper}
                          tone={row.tone}
                          emphasis={row.emphasis}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                How to read this estimate
              </h2>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                {estimateStructureNotes.map((note) => (
                  <li key={note} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                What this includes / excludes
              </h2>
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Includes</p>
                  <ul className="mt-3 space-y-2 text-slate-700">
                    <li>Service duration from the dates entered</li>
                    <li>Basic-salary-based estimate structure</li>
                    <li>Unpaid leave adjustment if entered</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Excludes</p>
                  <ul className="mt-3 space-y-2 text-slate-700">
                    <li>Pending salary or leave encashment</li>
                    <li>Allowances, fees, or reimbursements</li>
                    <li>Disputes or edge-case legal questions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Warnings & assumptions
              </h2>
              {estimate.warnings.length > 0 ? (
                <ul className="space-y-2 text-sm text-amber-700">
                  {estimate.warnings.map((warning) => (
                    <li key={warning} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                      {warning}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600">No warnings were generated from the supplied inputs.</p>
              )}

              <ul className="space-y-2 text-sm text-slate-700">
                {estimate.assumptionsUsed.map((assumption) => (
                  <li key={assumption} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    {assumption}
                  </li>
                ))}
              </ul>
            </section>

            <Divider />

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Before final settlement</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>Recheck dates, salary basis, and unpaid leave inputs.</li>
                <li>Compare this estimate with your records and receipts.</li>
                <li>Use the end-of-service checklist before payment.</li>
              </ul>
              <p className="text-xs text-slate-500">
                <Link
                  href={`${MARKETING_BASE_URL}/checklist`}
                  className="font-medium text-slate-600 underline underline-offset-2"
                >
                  Checklist
                </Link>{" "}
                |{" "}
                <Link
                  href={`${MARKETING_BASE_URL}/faq`}
                  className="font-medium text-slate-600 underline underline-offset-2"
                >
                  Help & FAQ
                </Link>{" "}
                |{" "}
                <Link
                  href={`${MARKETING_BASE_URL}/sources`}
                  className="font-medium text-slate-600 underline underline-offset-2"
                >
                  Sources &amp; assumptions
                </Link>
              </p>
            </section>

            <Divider />
            <section className="text-xs leading-6 text-slate-500">
              <p>
                Disclaimer: This summary is an estimate for planning only and is not legal, tax, payroll, or accounting advice.
              </p>
              <p>
                No professional advisory relationship is created by using this tool. Confirm final values with qualified professionals where needed.
              </p>
            </section>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
