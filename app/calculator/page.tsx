"use client";

import { useMemo, useState } from "react";

import { calculateGratuityEstimate } from "@/lib/rules/uae_domestic_worker";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { Input } from "@/components/ui/Input";

type FormState = {
  startDate: string;
  endDate: string;
  basicMonthlySalary: string;
  unpaidLeaveDays: string;
  notes: string;
};

type FormErrors = {
  startDate?: string;
  endDate?: string;
  basicMonthlySalary?: string;
  unpaidLeaveDays?: string;
};

const initialFormState: FormState = {
  startDate: "",
  endDate: "",
  basicMonthlySalary: "",
  unpaidLeaveDays: "",
  notes: "",
};

function buildPrintUrl(form: FormState): string {
  const params = new URLSearchParams();

  if (form.startDate) params.set("startDate", form.startDate);
  if (form.endDate) params.set("endDate", form.endDate);
  if (form.basicMonthlySalary) params.set("basicMonthlySalary", form.basicMonthlySalary);
  if (form.unpaidLeaveDays) params.set("unpaidLeaveDays", form.unpaidLeaveDays);

  const query = params.toString();
  return query ? `/calculator/print?${query}` : "/calculator/print";
}

export default function Calculator() {
  const [form, setForm] = useState<FormState>(initialFormState);

  const errors = useMemo<FormErrors>(() => {
    const nextErrors: FormErrors = {};

    if (!form.startDate) {
      nextErrors.startDate = "Start date is required.";
    }
    if (!form.endDate) {
      nextErrors.endDate = "End date is required.";
    }
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      nextErrors.endDate = "End date cannot be before start date.";
    }

    const salary = Number(form.basicMonthlySalary);
    if (!form.basicMonthlySalary) {
      nextErrors.basicMonthlySalary = "Basic monthly salary is required.";
    } else if (!Number.isFinite(salary) || salary <= 0) {
      nextErrors.basicMonthlySalary = "Salary must be greater than 0.";
    }

    if (form.unpaidLeaveDays) {
      const leave = Number(form.unpaidLeaveDays);
      if (!Number.isFinite(leave)) {
        nextErrors.unpaidLeaveDays = "Unpaid leave days must be a number.";
      } else if (leave < 0) {
        nextErrors.unpaidLeaveDays = "Unpaid leave days cannot be negative.";
      }
    }

    return nextErrors;
  }, [form]);

  const hasBlockingErrors =
    Boolean(errors.startDate) || Boolean(errors.endDate) || Boolean(errors.basicMonthlySalary);
  const printHref = buildPrintUrl(form);

  const estimate = useMemo(() => {
    const salary = Number(form.basicMonthlySalary);
    const parsedUnpaidLeave =
      form.unpaidLeaveDays.trim().length > 0 ? Number(form.unpaidLeaveDays) : undefined;

    return calculateGratuityEstimate({
      startDate: form.startDate,
      endDate: form.endDate,
      basicMonthlySalary: Number.isFinite(salary) ? salary : 0,
      unpaidLeaveDays:
        parsedUnpaidLeave !== undefined && Number.isFinite(parsedUnpaidLeave)
          ? parsedUnpaidLeave
          : undefined,
      notes: form.notes.trim() || undefined,
    });
  }, [form]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <PageHeader
          title="EOS / Gratuity Calculator"
          subtitle="Use this estimate tool for planning scenarios. Final legal and payroll outcomes should be reviewed separately."
        />

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-base font-semibold text-slate-900">
                Employment Inputs
              </h2>
              <p className="text-sm text-slate-600">
                Update values to refresh the estimate instantly.
              </p>

              <Input
                type="date"
                label="Start Date"
                value={form.startDate}
                onChange={(event) => updateField("startDate", event.target.value)}
                error={errors.startDate}
              />
              <Input
                type="date"
                label="End Date"
                value={form.endDate}
                onChange={(event) => updateField("endDate", event.target.value)}
                error={errors.endDate}
              />
              <Input
                type="number"
                min="0"
                step="0.01"
                label="Basic Monthly Salary"
                value={form.basicMonthlySalary}
                onChange={(event) =>
                  updateField("basicMonthlySalary", event.target.value)
                }
                error={errors.basicMonthlySalary}
                hint="Enter base monthly wage used for gratuity estimation."
              />
              <Input
                type="number"
                min="0"
                step="1"
                label="Unpaid Leave Days (Optional)"
                value={form.unpaidLeaveDays}
                onChange={(event) => updateField("unpaidLeaveDays", event.target.value)}
                error={errors.unpaidLeaveDays}
              />
              <div className="space-y-1.5">
                <label
                  htmlFor="calculator-notes"
                  className="block text-sm font-medium text-slate-700"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="calculator-notes"
                  rows={3}
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Add internal context for this estimate..."
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-900">Live Summary</h2>
                <a
                  href={printHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Opens print-friendly summary in a new tab"
                  aria-disabled={hasBlockingErrors}
                  className={buttonClassName(
                    "secondary",
                    hasBlockingErrors ? "pointer-events-none opacity-50" : "",
                  )}
                >
                  Download/Print PDF
                </a>
              </div>

              <Divider className="my-5" />

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Service Duration
                  </p>
                  <p className="mt-1 text-sm text-slate-800">
                    {estimate.serviceDuration.years}y {estimate.serviceDuration.months}m{" "}
                    {estimate.serviceDuration.days}d
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Estimated Gratuity
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    AED {estimate.gratuityAmount.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Warnings
                  </p>
                  {estimate.warnings.length === 0 ? (
                    <p className="mt-1 text-sm text-slate-600">No warnings.</p>
                  ) : (
                    <ul className="mt-2 space-y-2 text-sm text-amber-700">
                      {estimate.warnings.map((warning) => (
                        <li key={warning} className="rounded-md bg-amber-50 px-3 py-2">
                          {warning}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <details className="mt-6 rounded-lg border border-slate-200 bg-slate-50">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-700">
                  Assumptions &amp; Notes
                </summary>
                <div className="space-y-3 px-4 pb-4 text-sm text-slate-600">
                  <ul className="space-y-2">
                    {estimate.assumptionsUsed.map((assumption) => (
                      <li key={assumption} className="leading-6">
                        {assumption}
                      </li>
                    ))}
                  </ul>
                  {form.notes.trim() ? (
                    <>
                      <Divider />
                      <p className="text-slate-700">
                        <span className="font-medium">User note:</span> {form.notes}
                      </p>
                    </>
                  ) : null}
                </div>
              </details>
              <p className="mt-3 text-xs text-slate-500">
                PDF export uses your browser print dialog and does not store files on the server.
              </p>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
