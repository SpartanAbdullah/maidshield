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

export type GratuityInputsUsed = {
  startDate: string;
  endDate: string;
  basicMonthlySalary: number;
  unpaidLeaveDays: number;
};

export type GratuityEstimateOutput = {
  gratuityAmount: number;
  serviceDuration: ServiceDuration;
  adjustedServiceDays: number;
  inputsUsed: GratuityInputsUsed;
  breakdownLines: string[];
  assumptionsUsed: string[];
  warnings: string[];
};

