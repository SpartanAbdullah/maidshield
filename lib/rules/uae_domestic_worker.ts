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

  const start = parseDateInput(input.startDate);
  const end = parseDateInput(input.endDate);

  if (!start || !end) {
    warnings.push("Invalid startDate or endDate. Use an ISO-like valid date string.");
    return {
      gratuityAmount: 0,
      serviceDuration: { years: 0, months: 0, days: 0, totalDays: 0 },
      assumptionsUsed,
      warnings,
    };
  }

  if (end < start) {
    warnings.push("endDate is before startDate. Gratuity estimate set to 0.");
    return {
      gratuityAmount: 0,
      serviceDuration: { years: 0, months: 0, days: 0, totalDays: 0 },
      assumptionsUsed,
      warnings,
    };
  }

  if (!Number.isFinite(input.basicMonthlySalary) || input.basicMonthlySalary <= 0) {
    warnings.push("basicMonthlySalary must be greater than 0.");
  }

  const rawUnpaidLeave = input.unpaidLeaveDays ?? 0;
  let unpaidLeaveDays = rawUnpaidLeave;

  if (!Number.isFinite(rawUnpaidLeave)) {
    warnings.push("unpaidLeaveDays must be a finite number. Treated as 0.");
    unpaidLeaveDays = 0;
  } else if (rawUnpaidLeave < 0) {
    warnings.push("unpaidLeaveDays cannot be negative. Treated as 0.");
    unpaidLeaveDays = 0;
  }

  const serviceDuration = calculateServiceDuration(input.startDate, input.endDate);

  if (serviceDuration.totalDays > EXTREMELY_LONG_DURATION_DAYS) {
    warnings.push("Service duration is unusually long; verify dates and assumptions.");
  }

  if (unpaidLeaveDays > serviceDuration.totalDays) {
    warnings.push("unpaidLeaveDays exceeds service duration and has been capped.");
  }

  if (warnings.some((warning) => warning.includes("basicMonthlySalary"))) {
    return {
      gratuityAmount: 0,
      serviceDuration,
      assumptionsUsed,
      warnings,
    };
  }

  const eligibleServiceDays = Math.max(
    serviceDuration.totalDays - Math.min(unpaidLeaveDays, serviceDuration.totalDays),
    0,
  );
  const serviceYears = eligibleServiceDays / 365;
  const firstBandYears = Math.min(serviceYears, 5);
  const secondBandYears = Math.max(serviceYears - 5, 0);
  const accrualDays = firstBandYears * 21 + secondBandYears * 30;
  const dailyBasicWage = input.basicMonthlySalary / 30;
  const gratuityAmount = normalizeMoney(dailyBasicWage * accrualDays);

  return {
    gratuityAmount,
    serviceDuration,
    assumptionsUsed,
    warnings,
  };
}

