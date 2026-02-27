import type {
  GratuityEstimateInput,
  GratuityEstimateOutput,
  ServiceDuration,
} from "@/types/calculator";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const EXTREMELY_LONG_DURATION_DAYS = 40 * 365;

function parseDateInput(value: string): Date | null {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Date(
    Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate()),
  );
}

function addYearsUTC(date: Date, years: number): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear() + years,
      date.getUTCMonth(),
      date.getUTCDate(),
    ),
  );
}

function addMonthsUTC(date: Date, months: number): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth() + months,
      date.getUTCDate(),
    ),
  );
}

export function normalizeMoney(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function buildBreakdownLines(params: {
  serviceDays: number;
  unpaidLeaveDeducted: number;
  adjustedServiceDays: number;
  basicMonthlySalary: number;
}): string[] {
  const lines = [`Service days: ${params.serviceDays}`];

  if (params.unpaidLeaveDeducted > 0) {
    lines.push(`Unpaid leave deducted: ${params.unpaidLeaveDeducted} days`);
  }

  lines.push(`Adjusted service days: ${params.adjustedServiceDays}`);
  lines.push(`Monthly basic salary: AED ${normalizeMoney(params.basicMonthlySalary).toFixed(2)}`);
  lines.push(
    "Gratuity estimate computed using MaidShield assumptions. This is an estimate, not legal advice.",
  );

  return lines;
}

export function calculateServiceDuration(
  startDate: string,
  endDate: string,
): ServiceDuration {
  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);

  if (!start || !end || end < start) {
    return { years: 0, months: 0, days: 0, totalDays: 0 };
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY);
  let cursor = new Date(start);
  let years = 0;
  let months = 0;

  while (addYearsUTC(cursor, 1) <= end) {
    cursor = addYearsUTC(cursor, 1);
    years += 1;
  }

  while (addMonthsUTC(cursor, 1) <= end) {
    cursor = addMonthsUTC(cursor, 1);
    months += 1;
  }

  const days = Math.floor((end.getTime() - cursor.getTime()) / MS_PER_DAY);

  return { years, months, days, totalDays };
}

export function calculateGratuityEstimate(
  input: GratuityEstimateInput,
): GratuityEstimateOutput {
  const warnings: string[] = [];
  const assumptionsUsed: string[] = [
    "Estimate model only; this is not legal advice or an official settlement determination.",
    "Base daily wage is assumed as basicMonthlySalary / 30.",
    "Service years are prorated from eligible service days / 365.",
    "Assumed accrual: 21 wage-days per service year for first 5 years, then 30 wage-days per year afterward.",
  ];

  const basicMonthlySalary = Number.isFinite(input.basicMonthlySalary)
    ? input.basicMonthlySalary
    : 0;
  const rawUnpaidLeave = input.unpaidLeaveDays ?? 0;
  let unpaidLeaveDays = rawUnpaidLeave;

  if (!Number.isFinite(rawUnpaidLeave)) {
    warnings.push("unpaidLeaveDays must be a finite number. Treated as 0.");
    unpaidLeaveDays = 0;
  } else if (rawUnpaidLeave < 0) {
    warnings.push("unpaidLeaveDays cannot be negative. Treated as 0.");
    unpaidLeaveDays = 0;
  }

  const inputsUsed = {
    startDate: input.startDate,
    endDate: input.endDate,
    basicMonthlySalary: normalizeMoney(basicMonthlySalary),
    unpaidLeaveDays,
  };

  const start = parseDateInput(input.startDate);
  const end = parseDateInput(input.endDate);

  if (!start || !end) {
    warnings.push("Invalid startDate or endDate. Use an ISO-like valid date string.");
    const breakdownLines = buildBreakdownLines({
      serviceDays: 0,
      unpaidLeaveDeducted: 0,
      adjustedServiceDays: 0,
      basicMonthlySalary,
    });

    return {
      gratuityAmount: 0,
      serviceDuration: { years: 0, months: 0, days: 0, totalDays: 0 },
      adjustedServiceDays: 0,
      inputsUsed,
      breakdownLines,
      assumptionsUsed,
      warnings,
    };
  }

  if (end < start) {
    warnings.push("endDate is before startDate. Gratuity estimate set to 0.");
    const breakdownLines = buildBreakdownLines({
      serviceDays: 0,
      unpaidLeaveDeducted: 0,
      adjustedServiceDays: 0,
      basicMonthlySalary,
    });

    return {
      gratuityAmount: 0,
      serviceDuration: { years: 0, months: 0, days: 0, totalDays: 0 },
      adjustedServiceDays: 0,
      inputsUsed,
      breakdownLines,
      assumptionsUsed,
      warnings,
    };
  }

  if (basicMonthlySalary <= 0) {
    warnings.push("basicMonthlySalary must be greater than 0.");
  }

  const serviceDuration = calculateServiceDuration(input.startDate, input.endDate);

  if (serviceDuration.totalDays > EXTREMELY_LONG_DURATION_DAYS) {
    warnings.push("Service duration is unusually long; verify dates and assumptions.");
  }

  const cappedUnpaidLeaveDays = Math.min(unpaidLeaveDays, serviceDuration.totalDays);

  if (unpaidLeaveDays > serviceDuration.totalDays) {
    warnings.push("unpaidLeaveDays exceeds service duration and has been capped.");
  }

  const adjustedServiceDays = Math.max(serviceDuration.totalDays - cappedUnpaidLeaveDays, 0);
  const breakdownLines = buildBreakdownLines({
    serviceDays: serviceDuration.totalDays,
    unpaidLeaveDeducted: cappedUnpaidLeaveDays,
    adjustedServiceDays,
    basicMonthlySalary,
  });
  const sanitizedInputsUsed = {
    ...inputsUsed,
    unpaidLeaveDays: cappedUnpaidLeaveDays,
  };

  if (warnings.some((warning) => warning.includes("basicMonthlySalary"))) {
    return {
      gratuityAmount: 0,
      serviceDuration,
      adjustedServiceDays,
      inputsUsed: sanitizedInputsUsed,
      breakdownLines,
      assumptionsUsed,
      warnings,
    };
  }

  const serviceYears = adjustedServiceDays / 365;
  const firstBandYears = Math.min(serviceYears, 5);
  const secondBandYears = Math.max(serviceYears - 5, 0);
  const accrualDays = firstBandYears * 21 + secondBandYears * 30;
  const dailyBasicWage = basicMonthlySalary / 30;
  const gratuityAmount = normalizeMoney(dailyBasicWage * accrualDays);

  return {
    gratuityAmount,
    serviceDuration,
    adjustedServiceDays,
    inputsUsed: sanitizedInputsUsed,
    breakdownLines,
    assumptionsUsed,
    warnings,
  };
}

