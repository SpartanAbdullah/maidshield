"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { BreakdownRow } from "@/components/calculator/BreakdownRow";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { HelperBlock } from "@/components/ui/HelperBlock";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { LinkCard } from "@/components/ui/LinkCard";
import {
  buildEstimateBreakdownSections,
  formatCurrency,
  getEstimateStructureNotes,
} from "@/lib/calculator/presentation";
import { track } from "@/lib/analytics";
import { useFeatureFlag } from "@/lib/featureFlags";
import { calculateGratuityEstimate } from "@/lib/rules/uae_domestic_worker";
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
  const breakdownSections = useMemo(
    () => buildEstimateBreakdownSections(estimate),
    [estimate],
  );
  const estimateStructureNotes = useMemo(
    () => getEstimateStructureNotes(estimate),
    [estimate],
  );

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
      setShareLinkMessage("Link copied. You can paste it into a message or email.");
      track("share_link_copied");
      return;
    }

    setShareLinkMessage("Could not copy the link. Please copy it from the browser address bar.");
  }

  function handlePrintClick() {
    if (hasBlockingErrors) return;

    const allowance = consumeFreePrintAllowance(FREE_DAILY_PRINT_LIMIT);
    if (!allowance.allowed) {
      track("print_blocked_limit");
      setPrintLimitMessage(
        "You have reached today's free print limit. Join the Pro waitlist for repeat-case workflow updates."
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
      <Container className="space-y-8">
        <section className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.10),transparent_34%),linear-gradient(180deg,#ffffff,rgba(248,250,252,0.98))] px-6 py-8 sm:px-10 sm:py-10">
          <PageHeader
            title="Domestic Worker Gratuity Calculator"
            subtitle="Use this estimate for planning. Review final settlement figures against your records before payment."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <HelperBlock title="Start with the essentials" icon="calculator" tone="neutral">
              Enter the contract start date, final working date, and basic monthly salary first. Add unpaid leave only if it applies to this estimate.
            </HelperBlock>
            <Card className="border-slate-200/90 bg-white/90">
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Before you calculate</p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900">Keep your source records nearby</h2>
                  </div>
                  <Badge variant="neutral">Planning only</Badge>
                </div>
                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    <p>Use the contract dates or the final working dates you want to test.</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Icon name="coins" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    <p>Enter the monthly basic salary only unless your own review requires a different basis.</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Icon name="clipboard" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    <p>The result is an estimate, so plan to compare it with leave records, receipts, and final settlement documents.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <p className="text-xs text-slate-500">
          Privacy note: calculations run in your browser. MaidShield does not store your inputs.
        </p>
        {newUxFlowExperimentEnabled ? (
          <HelperBlock icon="info" tone="info">
            Experiment: streamlined flow hint enabled. Share feedback if this reduces time to result.
          </HelperBlock>
        ) : null}
        {proTipTimingExperimentEnabled && hasSubmittedCalculation && !hasBlockingErrors ? (
          <HelperBlock icon="check" tone="success">
            Pro tip: save this scenario before printing so you can compare revisions later.
          </HelperBlock>
        ) : null}
        <p className="sr-only" aria-live="polite" role="status">
          {liveErrorMessage}
        </p>

        <section className="grid gap-5 lg:grid-cols-2 lg:items-start">
          <Card className="lg:col-start-1">
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-900">Employment inputs</h2>
                <p className="text-sm leading-6 text-slate-600">
                  Complete the core fields to unlock the estimate. Each field is written to help you enter the right information the first time.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Need a quick preview?</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Load a realistic example to see how the estimate and explanation are structured.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={handleTryExampleClick}>
                    Try example
                  </Button>
                  <Button type="button" size="sm" onClick={handleCalculateClick}>
                    Calculate estimate
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  type="date"
                  label="Contract start date"
                  hint="Select contract start date."
                  value={form.startDate}
                  onChange={(event) => updateField("startDate", event.target.value)}
                  onBlur={() => markTouched("startDate")}
                  error={displayErrors.startDate}
                  className={getFilledFieldClass(form.startDate, errors.startDate)}
                />

                <Input
                  type="date"
                  label="Final working date"
                  hint="Select final working date for this estimate."
                  value={form.endDate}
                  onChange={(event) => updateField("endDate", event.target.value)}
                  onBlur={() => markTouched("endDate")}
                  error={displayErrors.endDate}
                  className={getFilledFieldClass(form.endDate, errors.endDate)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  label="Basic monthly salary (AED)"
                  placeholder="Enter monthly salary"
                  value={form.basicMonthlySalary}
                  onChange={(event) => updateField("basicMonthlySalary", event.target.value)}
                  onBlur={() => markTouched("basicMonthlySalary")}
                  aria-label="Basic monthly salary"
                  error={displayErrors.basicMonthlySalary}
                  hint="Enter the monthly basic salary only, without allowances."
                  className={getFilledFieldClass(
                    form.basicMonthlySalary,
                    errors.basicMonthlySalary,
                  )}
                />

                <Input
                  type="number"
                  min="0"
                  step="1"
                  label="Unpaid leave days (optional)"
                  placeholder="Choose total unpaid leave days, if applicable"
                  value={form.unpaidLeaveDays}
                  onChange={(event) => updateField("unpaidLeaveDays", event.target.value)}
                  onBlur={() => markTouched("unpaidLeaveDays")}
                  error={displayErrors.unpaidLeaveDays}
                  hint="Leave blank if there was no unpaid leave to deduct in this estimate."
                  className={getFilledFieldClass(form.unpaidLeaveDays, errors.unpaidLeaveDays)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="calculator-notes" className="block text-sm font-semibold text-slate-800">
                  Notes (optional)
                </label>
                <textarea
                  id="calculator-notes"
                  rows={4}
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  aria-label="Notes"
                  placeholder="Add a private note for this estimate, such as a record reference or review reminder."
                  className={notesFieldClassName}
                />
                <p className="text-xs leading-5 text-slate-500">
                  Notes stay in this browser only when you save a scenario locally.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-start-2">
            <CardContent className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Estimate summary</h2>
                  <p className="mt-1 text-sm text-slate-600">Based on your current inputs.</p>
                </div>
                <Badge variant="info">Live</Badge>
              </div>

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
                <Button variant="ghost" disabled={hasBlockingErrors} onClick={handleCopyShareLinkClick}>
                  <Icon name="link" className="h-4 w-4" />
                  Copy share link
                </Button>
                <Button variant="ghost" disabled={hasBlockingErrors} onClick={handleExportCsv}>
                  <Icon name="file" className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              {shareLinkMessage ? (
                <HelperBlock icon="link" tone="success">
                  {shareLinkMessage}
                </HelperBlock>
              ) : null}

              <Input
                label="Scenario title (optional)"
                placeholder="Example: March family review"
                value={scenarioTitle}
                onChange={(event) => setScenarioTitle(event.target.value)}
                hint={`Saved in this browser only. If left empty, it will be saved as "Scenario - ${getTodayKey()}".`}
              />

              {missingRequiredInputs ? (
                <HelperBlock title="Estimate locked until the core fields are filled" icon="info" tone="neutral">
                  Enter the start date, final working date, and basic monthly salary to see the estimate. Unpaid leave and notes are optional.
                </HelperBlock>
              ) : null}

              {canShowEstimate ? (
                <div className="rounded-[28px] bg-slate-900 px-5 py-5 text-white shadow-[0_24px_45px_-30px_rgba(15,23,42,0.7)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-300">Estimated gratuity</p>
                      <p className="mt-2 text-4xl font-semibold tracking-tight">{formatCurrency(estimate.gratuityAmount)}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Based on the information you entered. Review the structure below before relying on the figure.
                      </p>
                    </div>
                    <Badge variant="neutral" className="border-white/15 bg-white/10 text-white">
                      Estimate
                    </Badge>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Contract period</p>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {formatInputDate(form.startDate)} to {formatInputDate(form.endDate)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Service duration</p>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {estimate.serviceDuration.years}y {estimate.serviceDuration.months}m {estimate.serviceDuration.days}d
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Eligible service days</p>
                      <p className="mt-2 text-sm font-semibold text-white">{estimate.adjustedServiceDays} days</p>
                    </div>
                  </div>
                </div>
              ) : null}

              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="warning" colorVariant="warning" className="h-4 w-4" />
                  <h3 className="text-sm font-semibold text-slate-900">Warnings</h3>
                </div>
                {!canShowEstimate ? (
                  <p className="text-sm text-slate-600">
                    Complete valid inputs to review warnings and estimate notes.
                  </p>
                ) : estimate.warnings.length === 0 ? (
                  <HelperBlock icon="check" tone="success">
                    No warnings are being surfaced from the current inputs.
                  </HelperBlock>
                ) : (
                  <ul className="space-y-2 text-sm text-[color:#b77900]">
                    {estimate.warnings.map((warning) => (
                      <li
                        key={warning}
                        className="flex items-start gap-2 rounded-2xl border border-[color:var(--g-yellow)]/30 bg-[var(--tint-yellow)] px-4 py-3"
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
              </section>

              <section className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Calculation breakdown</h3>
                    <p className="mt-1 text-sm text-slate-600">How this estimate is structured, line by line.</p>
                  </div>
                  <Link
                    href="/sources"
                    className="text-sm font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900"
                  >
                    Sources &amp; assumptions
                  </Link>
                </div>
                {canShowEstimate ? (
                  <div className="mt-5 space-y-5">
                    {breakdownSections.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">{section.title}</h4>
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
                ) : missingRequiredInputs ? (
                  <p className="mt-4 text-sm text-slate-600">
                    Enter the core fields to unlock the structured breakdown.
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">
                    {liveErrorMessage || "Complete valid inputs to see the structured breakdown."}
                  </p>
                )}
              </section>

              {canShowEstimate ? (
                <HelperBlock title="How this estimate is structured" icon="info" tone="neutral">
                  <ul className="space-y-2">
                    {estimateStructureNotes.map((note) => (
                      <li key={note} className="leading-6">
                        {note}
                      </li>
                    ))}
                  </ul>
                </HelperBlock>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50/80 lg:col-start-1">
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">What this estimate includes</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It is intentionally focused so you can see what is in scope before you move on to the rest of the settlement work.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Includes</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    <li>Service duration from the dates entered</li>
                    <li>Basic-salary-based estimate structure</li>
                    <li>Unpaid leave adjustment if entered</li>
                    <li>Warnings and estimate assumptions</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Still separate from this estimate</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    <li>Pending salary or leave encashment</li>
                    <li>Allowances, fees, or reimbursements</li>
                    <li>Disputes or edge-case legal questions</li>
                    <li>Final settlement sign-off or advice</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-start-2">
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-900">Saved scenarios</h3>
                  <p className="text-xs text-slate-500">
                    Stored locally in this browser only. Clearing browser storage removes them.
                  </p>
                </div>
                <Badge variant="neutral">Local only</Badge>
              </div>
              {savedScenarios.length === 0 ? (
                <HelperBlock title="No saved scenarios yet" icon="clipboard" tone="neutral">
                  Save one from the summary panel once the estimate looks right, and it will stay available in this browser for later comparison.
                </HelperBlock>
              ) : (
                <ul className="space-y-3">
                  {savedScenarios.map((scenario) => (
                    <li
                      key={scenario.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">{scenario.title}</p>
                        <p className="text-xs text-slate-500">Saved {formatScenarioDate(scenario.createdAt)}</p>
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

          <Card className="border-sky-200 bg-sky-50/70 lg:col-start-1">
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Assumptions &amp; notes</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review these before you print or share the result so everyone is looking at the same estimate boundaries.
                </p>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                {estimate.assumptionsUsed.map((assumption) => (
                  <li key={assumption} className="rounded-2xl border border-sky-200/80 bg-white/70 px-4 py-3">
                    {assumption}
                  </li>
                ))}
              </ul>
              {form.notes.trim() ? (
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Your note:</span> {form.notes}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Add an optional note if you want to save context with a scenario.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/60 lg:col-start-2">
            <CardContent className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">What to do after you get the estimate</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Treat the result as a guide, then move through the practical follow-on pages before final payment.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <LinkCard
                  href="/checklist"
                  title="Open checklist"
                  description="Compare dates, salary records, handover steps, and receipts before you finalize anything."
                  icon="clipboard"
                  tone="sky"
                />
                <LinkCard
                  href="/sources"
                  title="Sources & assumptions"
                  description="Recheck the estimate boundaries if the case includes anything unusual."
                  icon="shield"
                  tone="emerald"
                />
                <LinkCard
                  href="/faq"
                  title="Help & FAQ"
                  description="Read the most common questions people ask before they rely on the figure."
                  icon="info"
                  tone="amber"
                />
                <LinkCard
                  href="/pro"
                  title="Pro waitlist"
                  description="For repeated cases that may benefit from cleaner record packaging later on."
                  icon="file"
                  tone="slate"
                />
              </div>

              {postPrintUpsellVisible ? (
                <HelperBlock icon="check" tone="success">
                  Printed successfully. If you handle repeated cases, the Pro waitlist is where we share future workflow tools first.
                </HelperBlock>
              ) : null}

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <h4 className="text-sm font-semibold text-slate-900">MaidShield Pro waitlist</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Pro is planned for people who handle repeated cases and need cleaner records, not for access to the core calculator.
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>Side-by-side scenario comparison</li>
                  <li>Printable settlement pack for cleaner records</li>
                  <li>Advisor-friendly export format</li>
                </ul>
                <Button variant="secondary" size="sm" className="mt-4" onClick={handleJoinWaitlistClick}>
                  Join waitlist for Pro
                </Button>
                {printLimitMessage ? (
                  <p className="mt-3 text-sm text-slate-700">{printLimitMessage}</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}



