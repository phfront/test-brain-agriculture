import { PieChartItem } from "./chart.type";

export type DashboardType = {
  totalFarm: number;
  totalHectare: number;
  statePieChart: PieChartItem[];
  culturePieChart: PieChartItem[];
  landUsePieChart: PieChartItem[];
};
