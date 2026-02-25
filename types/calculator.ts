export type ServiceDuration = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
};

export type GratuityEstimateInput = {
  startDate: string;
  endDate: string;
  basicMonthlySalary: number;
  unpaidLeaveDays?: number;
  notes?: string;
};

export type GratuityEstimateOutput = {
  gratuityAmount: number;
  serviceDuration: ServiceDuration;
  assumptionsUsed: string[];
  warnings: string[];
};

