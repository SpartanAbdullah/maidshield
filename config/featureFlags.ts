export type FeatureFlagKey =
  | "alternateCtaText"
  | "newUxFlowExperiment"
  | "proTipTimingExperiment"
  | "scenarioComparisonPlaceholder"
  | "exportSpreadsheet"
  | "languageSelector";

export type FeatureFlagConfig = {
  enabled: boolean;
  description: string;
};

export const featureFlags: Record<FeatureFlagKey, FeatureFlagConfig> = {
  alternateCtaText: {
    enabled: false,
    description: "Experiment: change top-nav calculator CTA wording.",
  },
  newUxFlowExperiment: {
    enabled: false,
    description: "Experiment: show a hint block for a revised calculator flow.",
  },
  proTipTimingExperiment: {
    enabled: false,
    description: "Experiment: show a pro-tip prompt after calculation submission.",
  },
  scenarioComparisonPlaceholder: {
    enabled: false,
    description: "Placeholder card for future side-by-side scenario comparison mode.",
  },
  exportSpreadsheet: {
    enabled: true,
    description: "Enable CSV export for estimate summaries.",
  },
  languageSelector: {
    enabled: false,
    description: "Show non-invasive language selector placeholder.",
  },
};
