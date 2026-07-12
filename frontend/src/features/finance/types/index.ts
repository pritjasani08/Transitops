export type ExpenseCategory = 'Fuel' | 'Maintenance' | 'Insurance' | 'Parking' | 'Repairs' | 'Toll' | 'Miscellaneous';
export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Paid';

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  vehicleId?: string;
  department?: string;
  status: ExpenseStatus;
  submittedBy: string;
}

export interface FuelLog {
  id: string;
  date: string;
  vehicleId: string;
  driverId: string;
  gallons: number;
  costPerGallon: number;
  totalCost: number;
  odometerReading: number;
  mpg: number;
  location: string;
}

export interface VehicleROI {
  vehicleId: string;
  vehicleName: string;
  investment: number;
  revenue: number;
  maintenanceCost: number;
  fuelCost: number;
  totalCost: number;
  profit: number;
  roiPercentage: number;
  roiScore: number;
  trend: 'Up' | 'Down' | 'Stable';
}

export interface FinancialKPIs {
  totalExpenses: number;
  fuelCost: number;
  maintenanceCost: number;
  operationalCost: number;
  averageCostPerTrip: number;
  averageFuelEfficiency: number; // MPG
  highestROIVehicle: string;
  lowestROIVehicle: string;
  profitIndicator: number;
  financialHealthScore: number;
}
