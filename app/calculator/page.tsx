"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { calculateGratuityEstimate } from "@/lib/rules/uae_domestic_worker";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { track } from "@/lib/analytics";
import { useFeatureFlag } from "@/lib/featureFlags";
import {
  deleteScenario,
  loadScenarios,
  saveScenario,
} from "@/lib/storage/scenarios";
import type { Scenario, ScenarioData } from "@/types/scenario";

type FormState = ScenarioData;

type FormErrors = {
  startDate?: string;
  endDate?: string;
  basicMonthlySalary?: string;
  unpaidLeaveDays?: string;
};

type TouchedState = {
  startDate: boolean;
  endDate: boolean;
  basicMonthlySalary: boolean;
  unpaidLeaveDays: boolean;
};

const FREE_DAILY_PRINT_LIMIT = 2;
const PRINT_USAGE_STORAGE_KEY = "maidshield.print_usage.v1";
const EXAMPLE_FORM_VALUES: Pick<
  FormState,
  "startDate" | "endDate" | "basicMonthlySalary" | "unpaidLeaveDays"
> = {
  startDate: "2022-06-01",
  endDate: "2025-05-31",
  basicMonthlySalary: "2300",
  unpaidLeaveDays: "12",
};

const initialFormState: FormState = {
  startDate: "",
  endDate: "",
  basicMonthlySalary: "",
  unpaidLeaveDays: "",
  notes: "",
};

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function consumeFreePrintAllowance(limit: number) {
  if (typeof window === "undefined") {
    return { allowed: true };
  }

  try {
    const today = getTodayKey();
    const storedRaw = window.localStorage.getItem(PRINT_USAGE_STORAGE_KEY);

    let storedDate = today;
    let storedCount = 0;

    if (storedRaw) {
      const parsed = JSON.parse(storedRaw) as { date?: unknown; count?: unknown };
      if (typeof parsed?.date === "string") {
        storedDate = parsed.date;
      }
      if (typeof parsed?.count === "number" && Number.isFinite(parsed.count) && parsed.count >= 0) {
        storedCount = Math.floor(parsed.count);
      }
    }

    const currentCount = storedDate === today ? storedCount : 0;

    if (currentCount >= limit) {
      return { allowed: false };
    }

    window.localStorage.setItem(
      PRINT_USAGE_STORAGE_KEY,
      JSON.stringify({
        date: today,
        count: currentCount + 1,
      })
    );

    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

function createScenarioId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `scenario-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function formatScenarioDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatInputDate(value: string) {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}


function getSingleParam(params: URLSearchParams, key: string) {
  const value = params.get(key);
  return value ? value.trim() : "";
}

function getInitialFormState() {
  if (typeof window === "undefined") {
    return initialFormState;
  }

  const params = new URLSearchParams(window.location.search);
  const startDate = getSingleParam(params, "startDate");
  const endDate = getSingleParam(params, "endDate");
  const basicMonthlySalary = getSingleParam(params, "basicMonthlySalary");
  const unpaidLeaveDays = getSingleParam(params, "unpaidLeaveDays");

  return {
    ...initialFormState,
    startDate,
    endDate,
    basicMonthlySalary,
    unpaidLeaveDays,
  };
}

function buildPrintUrl(form: FormState): string {
  const params = new URLSearchParams();

  if (form.startDate) params.set("startDate", form.startDate);
  if (form.endDate) params.set("endDate", form.endDate);
  if (form.basicMonthlySalary) params.set("basicMonthlySalary", form.basicMonthlySalary);
  if (form.unpaidLeaveDays) params.set("unpaidLeaveDays", form.unpaidLeaveDays);

  const query = params.toString();
  return query ? `/calculator/print?${query}` : "/calculator/print";
}

function buildShareUrl(form: FormState): string {
  const params = new URLSearchParams();

  if (form.startDate) params.set("startDate", form.startDate);
  if (form.endDate) params.set("endDate", form.endDate);
  if (form.basicMonthlySalary) params.set("basicMonthlySalary", form.basicMonthlySalary);
  if (form.unpaidLeaveDays) params.set("unpaidLeaveDays", form.unpaidLeaveDays);

  const query = params.toString();
  const pathname = query ? `/calculator?${query}` : "/calculator";

  if (typeof window === "undefined") {
    return pathname;
  }

  return `${window.location.origin}${pathname}`;
}

async function copyToClipboard(value: string): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Continue to legacy fallback.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export default function Calculator() {
  const [form, setForm] = useState<FormState>(() => getInitialFormState());
  const [printLimitMessage, setPrintLimitMessage] = useState("");
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [savedScenarios, setSavedScenarios] = useState<Scenario[]>(() => loadScenarios());
  const [shareLinkMessage, setShareLinkMessage] = useState("");
  const [postPrintUpsellVisible, setPostPrintUpsellVisible] = useState(false);
  const [hasSubmittedCalculation, setHasSubmittedCalculation] = useState(false);
  const exportSpreadsheetEnabled = useFeatureFlag("exportSpreadsheet");
  const comparisonPlaceholderEnabled = useFeatureFlag("scenarioComparisonPlaceholder");
  const newUxFlowExperimentEnabled = useFeatureFlag("newUxFlowExperiment");
  const proTipTimingExperimentEnabled = useFeatureFlag("proTipTimingExperiment");
  const [touched, setTouched] = useState<TouchedState>({
    startDate: false,
    endDate: false,
    basicMonthlySalary: false,
    unpaidLeaveDays: false,
  });

  useEffect(() => {
    track("calc_started", { source: "calculator_page_view" });
  }, []);

  const errors = useMemo<FormErrors>(() => {
    const nextErrors: FormErrors = {};

    if (!form.startDate) {
      nextErrors.startDate = "Start date is required.";
    }
    if (!form.endDate) {
      nextErrors.endDate = "End date is required.";
    }
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      nextErrors.endDate =
        "Please choose valid dates; the end date must be after the start date.";
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
  const missingRequiredInputs =
    !form.startDate.trim() || !form.endDate.trim() || !form.basicMonthlySalary.trim();
  const canShowEstimate = !hasBlockingErrors;
  const shouldShowValidation = hasSubmittedCalculation;
  const displayErrors = useMemo<FormErrors>(
    () => ({
      startDate: shouldShowValidation || touched.startDate ? errors.startDate : undefined,
      endDate: shouldShowValidation || touched.endDate ? errors.endDate : undefined,
      basicMonthlySalary:
        shouldShowValidation || touched.basicMonthlySalary
          ? errors.basicMonthlySalary
          : undefined,
      unpaidLeaveDays:
        shouldShowValidation || touched.unpaidLeaveDays ? errors.unpaidLeaveDays : undefined,
    }),
    [errors, shouldShowValidation, touched],
  );
  const liveErrorMessage = useMemo(() => {
    if (displayErrors.startDate) {
      return displayErrors.startDate;
    }
    if (displayErrors.endDate) {
      return displayErrors.endDate;
    }
    if (displayErrors.basicMonthlySalary) {
      return displayErrors.basicMonthlySalary;
    }
    if (displayErrors.unpaidLeaveDays) {
      return displayErrors.unpaidLeaveDays;
    }
    return "";
  }, [displayErrors]);

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

  const notesFieldClassName = [
    "calculator-field block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-white",
    "hover:border-slate-400",
    form.notes.trim() ? "calculator-field--filled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched(key: keyof TouchedState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function handleCalculateClick() {
    setHasSubmittedCalculation(true);
    setTouched({
      startDate: true,
      endDate: true,
      basicMonthlySalary: true,
      unpaidLeaveDays: true,
    });

    if (!hasBlockingErrors) {
      track("calc_submitted", {
        has_unpaid_leave: Boolean(form.unpaidLeaveDays.trim()),
      });
    }
  }

  function getFilledFieldClass(value: string, error?: string) {
    return value.trim() && !error
      ? "calculator-field calculator-field--filled"
      : "calculator-field";
  }

  function handleTryExampleClick() {
    const hasAnyTypedValue = Boolean(
      form.startDate || form.endDate || form.basicMonthlySalary || form.unpaidLeaveDays,
    );

    if (
      hasAnyTypedValue &&
      !window.confirm("Replace current form values with an example scenario?")
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      ...EXAMPLE_FORM_VALUES,
    }));
    setPrintLimitMessage("");
    setShareLinkMessage("");
    setHasSubmittedCalculation(false);
    setTouched({
      startDate: false,
      endDate: false,
      basicMonthlySalary: false,
      unpaidLeaveDays: false,
    });
    track("example_used");
  }

  async function handleCopyShareLinkClick() {
    const shareUrl = buildShareUrl(form);
    const copied = await copyToClipboard(shareUrl);

    if (copied) {
      setShareLinkMessage("Share link copied.");
      track("share_link_copied");
      return;
    }

    setShareLinkMessage("Could not copy link. Copy from the browser address bar.");
  }

  function handlePrintClick() {
    if (hasBlockingErrors) return;

    const allowance = consumeFreePrintAllowance(FREE_DAILY_PRINT_LIMIT);
    if (!allowance.allowed) {
      track("print_blocked_limit");
      setPrintLimitMessage(
        "You have reached your 2 free prints for today. Join the Pro waitlist for unlimited prints."
      );
      return;
    }

    setPrintLimitMessage("");
    track("result_printed", { channel: "print_summary" });
    const printWindow = window.open(printHref, "_blank", "noopener,noreferrer");
    if (printWindow) {
      setPostPrintUpsellVisible(true);
      track("post_print_upsell_shown");
    }
  }




  function handleExportCsv() {
    if (hasBlockingErrors) return;

    const dailyRate = estimate.inputsUsed.basicMonthlySalary / 30;

    const rows = [
      ["metric", "value"],
      ["service_days_total", String(estimate.serviceDuration.totalDays)],
      ["service_days_adjusted", String(estimate.adjustedServiceDays)],
      ["unpaid_leave_days", String(estimate.inputsUsed.unpaidLeaveDays)],
      ["daily_rate", dailyRate.toFixed(2)],
      ["gratuity_amount", estimate.gratuityAmount.toFixed(2)],
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `maidshield-estimate-${getTodayKey()}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    track("result_downloaded", { format: "csv" });
  }

  function handleJoinWaitlistClick() {
    track("waitlist_signup", { source: "calculator_pro_panel" });
    window.location.assign("/pro");
  }

  function handleSaveScenario() {
    if (hasBlockingErrors) return;

    const trimmedTitle = scenarioTitle.trim();
    const title = trimmedTitle || `Scenario - ${getTodayKey()}`;

    const scenario: Scenario = {
      id: createScenarioId(),
      title,
      createdAt: new Date().toISOString(),
      data: { ...form },
    };

    saveScenario(scenario);
    setSavedScenarios(loadScenarios());
    setScenarioTitle("");
    track("scenario_saved");
  }

  function handleLoadScenario(scenario: Scenario) {
    setForm({ ...scenario.data });
    setScenarioTitle(scenario.title);
    setPrintLimitMessage("");
    track("scenario_loaded");
  }

  function handleDeleteScenario(id: string) {
    deleteScenario(id);
    setSavedScenarios(loadScenarios());
    track("scenario_deleted");
  }

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <PageHeader
          title="Domestic Worker Gratuity Calculator"
          subtitle="Use this estimate for planning. Review final settlement figures against your records before payment."
        />
        <p className="mt-3 border-l-2 border-slate-200 pl-3 text-xs text-slate-500">
          Privacy note: calculations run in your browser. MaidShield does not store your
          inputs.
        </p>
        {newUxFlowExperimentEnabled ? (
          <p className="mt-3 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
            Experiment: streamlined flow hint enabled. Share feedback if this reduces time-to-result.
          </p>
        ) : null}
        {proTipTimingExperimentEnabled && hasSubmittedCalculation && !hasBlockingErrors ? (
          <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            Pro tip: save this scenario before printing so you can compare revisions later.
          </p>
        ) : null}
        <p className="sr-only" aria-live="polite" role="status">
          {liveErrorMessage}
        </p>

        <section className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-start">
          <Card className="lg:col-start-1">
            <CardContent className="space-y-4">
              <h2 className="text-base font-semibold text-slate-900">Employment Inputs</h2>
              <p className="text-sm text-slate-600">
                Update values to refresh the estimate instantly.
              </p>
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={handleTryExampleClick}
                >
                  Try Example
                </Button>
                <Button type="button" size="sm" onClick={handleCalculateClick}>
                  Calculate
                </Button>
                <p className="text-xs text-slate-600">
                  Load a realistic sample case to see a meaningful estimate quickly.
                </p>
              </div>

              <Input
                type="date"
                label="Start Date"
                value={form.startDate}
                onChange={(event) => updateField("startDate", event.target.value)}
                onBlur={() => markTouched("startDate")}
                error={displayErrors.startDate}
                className={getFilledFieldClass(form.startDate, errors.startDate)}
              />

              <Input
                type="date"
                label="End Date"
                value={form.endDate}
                onChange={(event) => updateField("endDate", event.target.value)}
                onBlur={() => markTouched("endDate")}
                error={displayErrors.endDate}
                className={getFilledFieldClass(form.endDate, errors.endDate)}
              />

              <Input
                type="number"
                min="0"
                step="0.01"
                label="Basic Monthly Salary"
                value={form.basicMonthlySalary}
                onChange={(event) => updateField("basicMonthlySalary", event.target.value)}
                onBlur={() => markTouched("basicMonthlySalary")}
                aria-label="Basic Monthly Salary"
                error={displayErrors.basicMonthlySalary}
                hint="Enter base monthly wage used for gratuity estimation."
                className={getFilledFieldClass(
                  form.basicMonthlySalary,
                  errors.basicMonthlySalary,
                )}
              />

              <Input
                type="number"
                min="0"
                step="1"
                label="Unpaid Leave Days (Optional)"
                value={form.unpaidLeaveDays}
                onChange={(event) => updateField("unpaidLeaveDays", event.target.value)}
                onBlur={() => markTouched("unpaidLeaveDays")}
                error={displayErrors.unpaidLeaveDays}
                className={getFilledFieldClass(form.unpaidLeaveDays, errors.unpaidLeaveDays)}
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
                  aria-label="Notes"
                  placeholder="Add internal context for this estimate..."
                  className={notesFieldClassName}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-start-2">
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-900">Live Summary</h2>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    disabled={hasBlockingErrors}
                    onClick={handlePrintClick}
                    title={
                      hasBlockingErrors
                        ? "Complete required fields to enable print summary"
                        : "Opens print-friendly summary in a new tab"
                    }
                  >
                    <Icon name="file" className="h-4 w-4" />
                    Download/Print PDF
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={hasBlockingErrors}
                    onClick={handleSaveScenario}
                    title={
                      hasBlockingErrors
                        ? "Complete required fields to save a scenario"
                        : "Save this input set for later"
                    }
                  >
                    <Icon name="check" className="h-4 w-4" />
                    Save scenario
                  </Button>
                  <Button variant="ghost" onClick={handleCopyShareLinkClick}>
                    <Icon name="link" className="h-4 w-4" />
                    Copy Share Link
                  </Button>
                </div>
              </div>
              {shareLinkMessage ? (
                <p className="mt-3 text-xs text-slate-600">{shareLinkMessage}</p>
              ) : null}

              <Divider className="my-5" />

              <Input
                label="Scenario title (optional)"
                placeholder="Example: March review"
                value={scenarioTitle}
                onChange={(event) => setScenarioTitle(event.target.value)}
                hint={`If left empty, it will be saved as "Scenario - ${getTodayKey()}".`}
              />

              <div className="mt-5 space-y-4">
                {missingRequiredInputs ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-700">
                      Enter start date, end date, and basic salary to see estimate.
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-600">
                      <li>Use basic salary</li>
                      <li>Dates should match contract period</li>
                      <li>Unpaid leave is optional</li>
                    </ul>
                  </div>
                ) : null}
                {canShowEstimate ? (
                  <>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Service Duration
                      </p>
                      <p className="mt-1 text-sm text-slate-800">
                        {estimate.serviceDuration.years}y {estimate.serviceDuration.months}m{" "}
                        {estimate.serviceDuration.days}d
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Total days: {estimate.serviceDuration.totalDays} | Adjusted service
                        days: {estimate.adjustedServiceDays}
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
                  </>
                ) : null}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Warnings
                  </p>
                  {!canShowEstimate ? (
                    <p className="mt-1 text-sm text-slate-600">
                      Complete required inputs to review warnings and assumptions.
                    </p>
                  ) : estimate.warnings.length === 0 ? (
                    <p className="mt-1 text-sm text-slate-600">No warnings.</p>
                  ) : (
                    <ul className="mt-2 space-y-2 text-sm text-[color:#b77900]">
                      {estimate.warnings.map((warning) => (
                        <li
                          key={warning}
                          className="flex items-start gap-2 rounded-lg border border-[color:var(--g-yellow)]/25 bg-[var(--tint-yellow)] px-3 py-2"
                        >
                          <Icon
                            name="warning"
                            colorVariant="warning"
                            className="mt-0.5 h-4 w-4 shrink-0"
                          />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon name="info" colorVariant="info" className="h-4 w-4" />
                    <h3 className="text-sm font-semibold text-slate-900">
                      Calculation breakdown
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/sources"
                      className="text-xs font-medium text-slate-600 underline underline-offset-2 hover:text-slate-800"
                    >
                      Sources &amp; assumptions
                    </Link>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
                {canShowEstimate ? (
                  <>
                    <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 text-xs sm:grid-cols-2">
                      <div>
                        <dt className="text-slate-500">Start Date</dt>
                        <dd className="text-slate-800">
                          {formatInputDate(estimate.inputsUsed.startDate)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">End Date</dt>
                        <dd className="text-slate-800">
                          {formatInputDate(estimate.inputsUsed.endDate)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Basic Monthly Salary</dt>
                        <dd className="text-slate-800">
                          AED {estimate.inputsUsed.basicMonthlySalary.toFixed(2)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Unpaid Leave Days</dt>
                        <dd className="text-slate-800">
                          {estimate.inputsUsed.unpaidLeaveDays}
                        </dd>
                      </div>
                    </dl>
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-600">
                      {estimate.breakdownLines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </>
                ) : missingRequiredInputs ? (
                  <p className="mt-3 text-sm text-slate-600">
                    Enter start date, end date, and basic salary to see a full breakdown.
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-slate-600">
                    {liveErrorMessage || "Complete valid inputs to see a full breakdown."}
                  </p>
                )}
              </section>
            </CardContent>
          </Card>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-start-1">
            <h3 className="text-sm font-semibold text-slate-900">
              What this includes / excludes
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Includes
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-600">
                  <li>Service duration</li>
                  <li>Salary-based estimate</li>
                  <li>Unpaid leave adjustment</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Excludes
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-600">
                  <li>Legal edge cases</li>
                  <li>Disputes</li>
                  <li>Allowances and government fees</li>
                </ul>
              </div>
            </div>
          </section>

          <details className="rounded-xl border border-slate-200 border-l-2 border-l-[var(--g-blue)] bg-[var(--tint-blue)] lg:col-start-1">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-700">
              Assumptions &amp; Notes
            </summary>
            <div className="space-y-3 px-4 pb-4 text-sm text-slate-700">
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

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-start-1">
            <h3 className="text-sm font-semibold text-slate-900">After you get the estimate</h3>
            <p className="mt-2 text-sm text-slate-600">
              Print the summary, copy a share link, or save a scenario once the required
              fields are complete.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              PDF export uses your browser print dialog and does not store files on the server.
            </p>
            {postPrintUpsellVisible ? (
              <p className="mt-2 text-xs text-slate-600">
                Printed successfully. Want unlimited prints &amp; saved scenarios?{" "}
                <a
                  href="/pro"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-slate-800 underline underline-offset-2"
                >
                  Join Pro waitlist
                </a>
                .
              </p>
            ) : null}

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="text-sm font-semibold text-slate-900">MaidShield Pro</h4>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>Unlimited prints</li>
                <li>Save scenarios</li>
                <li>Employer checklist (coming soon)</li>
              </ul>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={handleJoinWaitlistClick}
              >
                Join waitlist for Pro
              </Button>
              {printLimitMessage ? (
                <p className="mt-3 text-sm text-slate-700">{printLimitMessage}</p>
              ) : null}
            </div>
          </section>

          <Card className="lg:col-start-2">
            <CardContent className="space-y-4">
              <h3 className="text-base font-semibold text-slate-900">Saved scenarios</h3>
              {savedScenarios.length === 0 ? (
                <p className="text-sm text-slate-600">
                  No saved scenarios yet. Save one from the summary panel.
                </p>
              ) : (
                <ul className="space-y-3">
                  {savedScenarios.map((scenario) => (
                    <li
                      key={scenario.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">{scenario.title}</p>
                        <p className="text-xs text-slate-500">
                          Saved {formatScenarioDate(scenario.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleLoadScenario(scenario)}
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteScenario(scenario.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
