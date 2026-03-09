import type { GratuityEstimateOutput } from "@/types/calculator";

export type EstimateBreakdownRow = {
  label: string;
  value: string;
  helper: string;
  tone?: "neutral" | "info" | "success";
  emphasis?: boolean;
};

export type EstimateBreakdownSection = {
  title: string;
  description: string;
  rows: EstimateBreakdownRow[];
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AED",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const decimalFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function formatDecimal(value: number) {
  return decimalFormatter.format(value);
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

export function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function buildEstimateBreakdownSections(
  estimate: GratuityEstimateOutput,
): EstimateBreakdownSection[] {
  const dailyBasicWage = estimate.inputsUsed.basicMonthlySalary / 30;
  const eligibleServiceYears = estimate.adjustedServiceDays / 365;
  const firstBandYears = Math.min(eligibleServiceYears, 5);
  const secondBandYears = Math.max(eligibleServiceYears - 5, 0);
  const firstBandAccrualDays = firstBandYears * 21;
  const secondBandAccrualDays = secondBandYears * 30;

  return [
    {
      title: "Service & adjustments",
      description:
        "The estimate starts with the contract period you entered and adjusts it only if unpaid leave days were supplied.",
      rows: [
        {
          label: "Contract period entered",
          value: `${formatDate(estimate.inputsUsed.startDate)} to ${formatDate(estimate.inputsUsed.endDate)}`,
          helper: "These dates drive the full service duration shown in the estimate.",
        },
        {
          label: "Service days from dates",
          value: `${estimate.serviceDuration.totalDays} days`,
          helper: "Calculated from the start and end dates before any adjustment.",
        },
        {
          label: "Unpaid leave adjustment",
          value:
            estimate.inputsUsed.unpaidLeaveDays > 0
              ? `${estimate.inputsUsed.unpaidLeaveDays} days removed`
              : "Not applied",
          helper:
            estimate.inputsUsed.unpaidLeaveDays > 0
              ? "Only the unpaid leave days you entered are deducted from counted service."
              : "No unpaid leave was entered, so the service period stays unchanged.",
          tone: estimate.inputsUsed.unpaidLeaveDays > 0 ? "info" : "neutral",
        },
        {
          label: "Eligible service used in estimate",
          value: `${estimate.adjustedServiceDays} days`,
          helper: "This adjusted service period is the time used to prorate the estimate.",
          tone: "success",
        },
      ],
    },
    {
      title: "Salary basis",
      description:
        "MaidShield converts the basic monthly salary you entered into a daily wage for planning purposes.",
      rows: [
        {
          label: "Basic monthly salary",
          value: formatCurrency(estimate.inputsUsed.basicMonthlySalary),
          helper: "This should match the salary basis you want to test in the estimate.",
        },
        {
          label: "Daily wage used",
          value: formatCurrency(dailyBasicWage),
          helper: "Calculated as basic monthly salary divided by 30 under the current estimate assumptions.",
          tone: "info",
        },
      ],
    },
    {
      title: "Estimate formula",
      description:
        "The final figure below reflects the current MaidShield planning assumptions and should still be checked against your records.",
      rows: [
        {
          label: "Eligible service years",
          value: `${formatDecimal(eligibleServiceYears)} years`,
          helper: "Adjusted service days are converted into prorated service years for the estimate formula.",
        },
        {
          label: "Accrual within first 5 years",
          value: `${formatDecimal(firstBandAccrualDays)} wage days`,
          helper: `${formatDecimal(firstBandYears)} eligible years x 21 wage days per year under the current assumptions.`,
        },
        {
          label: "Accrual after year 5",
          value:
            secondBandYears > 0
              ? `${formatDecimal(secondBandAccrualDays)} wage days`
              : "Not reached",
          helper:
            secondBandYears > 0
              ? `${formatDecimal(secondBandYears)} eligible years x 30 wage days per year after year 5.`
              : "Your adjusted service period does not extend beyond five years in this estimate.",
        },
        {
          label: "Estimated gratuity",
          value: formatCurrency(estimate.gratuityAmount),
          helper:
            "This estimate covers gratuity only. It does not automatically add pending salary, leave encashment, fees, or disputed items.",
          tone: "success",
          emphasis: true,
        },
      ],
    },
  ];
}

export function getEstimateStructureNotes(estimate: GratuityEstimateOutput) {
  return [
    "This is a planning estimate based on the information you provide, not a final settlement instruction.",
    estimate.inputsUsed.unpaidLeaveDays > 0
      ? "Unpaid leave has been deducted because you entered it in this scenario."
      : "No unpaid leave deduction is included in this scenario.",
    "Final settlement may still require you to review pending salary, leave balance, receipts, approvals, and cancellation steps separately.",
  ];
}
