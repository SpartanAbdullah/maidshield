import type { Scenario } from "@/types/scenario";

const SCENARIO_STORAGE_KEY = "maidshield.scenarios.v1";
const MAX_SCENARIOS = 10;

type RawScenario = {
  id?: unknown;
  title?: unknown;
  createdAt?: unknown;
  data?: {
    startDate?: unknown;
    endDate?: unknown;
    basicMonthlySalary?: unknown;
    unpaidLeaveDays?: unknown;
    notes?: unknown;
  };
};

function parseScenario(value: unknown): Scenario | null {
  const raw = value as RawScenario;

  if (!raw || typeof raw !== "object") {
    return null;
  }

  if (
    typeof raw.id !== "string" ||
    typeof raw.title !== "string" ||
    typeof raw.createdAt !== "string" ||
    !raw.data ||
    typeof raw.data !== "object"
  ) {
    return null;
  }

  if (
    typeof raw.data.startDate !== "string" ||
    typeof raw.data.endDate !== "string" ||
    typeof raw.data.basicMonthlySalary !== "string" ||
    typeof raw.data.unpaidLeaveDays !== "string" ||
    typeof raw.data.notes !== "string"
  ) {
    return null;
  }

  return {
    id: raw.id,
    title: raw.title,
    createdAt: raw.createdAt,
    data: {
      startDate: raw.data.startDate,
      endDate: raw.data.endDate,
      basicMonthlySalary: raw.data.basicMonthlySalary,
      unpaidLeaveDays: raw.data.unpaidLeaveDays,
      notes: raw.data.notes,
    },
  };
}

function toTimestamp(dateString: string) {
  const timestamp = Date.parse(dateString);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function sortByMostRecent(scenarios: Scenario[]) {
  return [...scenarios].sort((a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt));
}

function trimToLimit(scenarios: Scenario[]) {
  return scenarios.slice(0, MAX_SCENARIOS);
}

export function loadScenarios(): Scenario[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SCENARIO_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    const scenarios = parsed
      .map((item) => parseScenario(item))
      .filter((item): item is Scenario => item !== null);

    return trimToLimit(sortByMostRecent(scenarios));
  } catch {
    return [];
  }
}

export function saveScenario(scenario: Scenario): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const existing = loadScenarios();
    const withoutSameId = existing.filter((item) => item.id !== scenario.id);
    const next = trimToLimit(sortByMostRecent([scenario, ...withoutSameId]));

    window.localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures in MVP mode.
  }
}

export function deleteScenario(id: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const existing = loadScenarios();
    const next = existing.filter((item) => item.id !== id);
    window.localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures in MVP mode.
  }
}
