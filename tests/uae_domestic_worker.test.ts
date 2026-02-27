import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateGratuityEstimate,
  calculateServiceDuration,
  normalizeMoney,
} from "../lib/rules/uae_domestic_worker.ts";

test("normalizeMoney rounds to 2 decimals", () => {
  assert.equal(normalizeMoney(123.456), 123.46);
  assert.equal(normalizeMoney(123.451), 123.45);
});

test("calculateServiceDuration returns calendar breakdown and total days", () => {
  const result = calculateServiceDuration("2020-01-01", "2021-03-04");
  assert.deepEqual(result, { years: 1, months: 2, days: 3, totalDays: 428 });
});

test("calculateGratuityEstimate returns a normal estimate", () => {
  const result = calculateGratuityEstimate({
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    basicMonthlySalary: 3000,
  });

  assert.equal(result.serviceDuration.totalDays, 366);
  assert.equal(result.gratuityAmount, 2105.75);
  assert.equal(result.warnings.length, 0);
  assert.ok(result.assumptionsUsed.length >= 3);
});

test("invalid dates return zero with warning", () => {
  const result = calculateGratuityEstimate({
    startDate: "not-a-date",
    endDate: "2021-01-01",
    basicMonthlySalary: 3000,
  });

  assert.equal(result.gratuityAmount, 0);
  assert.ok(
    result.warnings.some((warning) =>
      warning.includes("Please choose valid dates"),
    ),
  );
});

test("zero salary returns zero with warning", () => {
  const result = calculateGratuityEstimate({
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    basicMonthlySalary: 0,
  });

  assert.equal(result.gratuityAmount, 0);
  assert.ok(
    result.warnings.some((warning) =>
      warning.includes("basicMonthlySalary must be greater than 0"),
    ),
  );
});

test("unpaid leave reduces gratuity and negative unpaid leave warns", () => {
  const withLeave = calculateGratuityEstimate({
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    basicMonthlySalary: 3000,
    unpaidLeaveDays: 30,
  });

  const noLeave = calculateGratuityEstimate({
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    basicMonthlySalary: 3000,
  });

  const negativeLeave = calculateGratuityEstimate({
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    basicMonthlySalary: 3000,
    unpaidLeaveDays: -3,
  });

  assert.ok(withLeave.gratuityAmount < noLeave.gratuityAmount);
  assert.ok(
    negativeLeave.warnings.some((warning) =>
      warning.includes("unpaidLeaveDays cannot be negative"),
    ),
  );
});

test("long durations and end-before-start produce warnings", () => {
  const longService = calculateGratuityEstimate({
    startDate: "1970-01-01",
    endDate: "2021-01-01",
    basicMonthlySalary: 4000,
  });
  assert.ok(
    longService.warnings.some((warning) =>
      warning.includes("unusually long"),
    ),
  );

  const reversed = calculateGratuityEstimate({
    startDate: "2022-01-01",
    endDate: "2021-01-01",
    basicMonthlySalary: 4000,
  });
  assert.equal(reversed.gratuityAmount, 0);
  assert.ok(
    reversed.warnings.some((warning) => warning.includes("Please choose valid dates")),
  );
});

test("same-day service returns zero total days and zero gratuity", () => {
  const serviceDuration = calculateServiceDuration("2024-01-01", "2024-01-01");
  const result = calculateGratuityEstimate({
    startDate: "2024-01-01",
    endDate: "2024-01-01",
    basicMonthlySalary: 5000,
  });

  assert.deepEqual(serviceDuration, {
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
  });
  assert.equal(result.gratuityAmount, 0);
});

