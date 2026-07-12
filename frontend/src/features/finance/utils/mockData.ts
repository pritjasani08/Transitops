import { Expense, FuelLog, VehicleROI, FinancialKPIs } from "../types";

export const MOCK_FINANCE_KPIS: FinancialKPIs = {
  totalExpenses: 0,
  fuelCost: 0,
  maintenanceCost: 0,
  operationalCost: 0,
  averageCostPerTrip: 0,
  averageFuelEfficiency: 0,
  highestROIVehicle: "N/A",
  lowestROIVehicle: "N/A",
  profitIndicator: 0,
  financialHealthScore: 0
};

export const MOCK_EXPENSES: Expense[] = [];

export const MOCK_FUEL_LOGS: FuelLog[] = [];

export const MOCK_VEHICLE_ROI: VehicleROI[] = [];
