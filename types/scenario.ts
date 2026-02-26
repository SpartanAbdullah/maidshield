export type ScenarioData = {
  startDate: string;
  endDate: string;
  basicMonthlySalary: string;
  unpaidLeaveDays: string;
  notes: string;
};

export type Scenario = {
  id: string;
  title: string;
  createdAt: string;
  data: ScenarioData;
};
