import { Expense, FuelLog, VehicleROI, FinancialKPIs } from "../types";

export const MOCK_FINANCE_KPIS: FinancialKPIs = {
  totalExpenses: 125430.50,
  fuelCost: 45200.00,
  maintenanceCost: 32100.25,
  operationalCost: 88500.75,
  averageCostPerTrip: 145.20,
  averageFuelEfficiency: 8.5,
  highestROIVehicle: "V-104 (Volvo VNL)",
  lowestROIVehicle: "V-201 (Freightliner)",
  profitIndicator: 15.4, // percentage
  financialHealthScore: 92
};

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "EXP-1001",
    date: "2023-10-15T10:30:00Z",
    category: "Maintenance",
    amount: 1250.00,
    description: "Scheduled preventative maintenance and oil change",
    vehicleId: "V-101",
    department: "Fleet Operations",
    status: "Approved",
    submittedBy: "Mike Johnson"
  },
  {
    id: "EXP-1002",
    date: "2023-10-14T14:15:00Z",
    category: "Fuel",
    amount: 450.75,
    description: "Diesel refuel at Flying J",
    vehicleId: "V-102",
    department: "Logistics",
    status: "Paid",
    submittedBy: "Sarah Connor"
  },
  {
    id: "EXP-1003",
    date: "2023-10-13T09:00:00Z",
    category: "Insurance",
    amount: 5000.00,
    description: "Monthly fleet insurance premium",
    department: "Finance",
    status: "Pending",
    submittedBy: "Alice Smith"
  },
  {
    id: "EXP-1004",
    date: "2023-10-12T16:45:00Z",
    category: "Toll",
    amount: 45.50,
    description: "I-95 Toll charges",
    vehicleId: "V-105",
    department: "Logistics",
    status: "Approved",
    submittedBy: "John Doe"
  }
];

export const MOCK_FUEL_LOGS: FuelLog[] = [
  {
    id: "FL-5001",
    date: "2023-10-15T08:00:00Z",
    vehicleId: "V-101",
    driverId: "DRV-101",
    gallons: 120,
    costPerGallon: 4.15,
    totalCost: 498.00,
    odometerReading: 45020,
    mpg: 8.2,
    location: "Pilot Travel Center, Dallas TX"
  },
  {
    id: "FL-5002",
    date: "2023-10-14T12:30:00Z",
    vehicleId: "V-102",
    driverId: "DRV-102",
    gallons: 100,
    costPerGallon: 4.10,
    totalCost: 410.00,
    odometerReading: 32150,
    mpg: 7.9,
    location: "Love's Travel Stop, Houston TX"
  },
  {
    id: "FL-5003",
    date: "2023-10-13T15:45:00Z",
    vehicleId: "V-103",
    driverId: "DRV-103",
    gallons: 150,
    costPerGallon: 4.20,
    totalCost: 630.00,
    odometerReading: 89400,
    mpg: 7.5,
    location: "TA Travel Center, Austin TX"
  }
];

export const MOCK_VEHICLE_ROI: VehicleROI[] = [
  {
    vehicleId: "V-101",
    vehicleName: "Volvo VNL 860",
    investment: 150000,
    revenue: 45000,
    maintenanceCost: 2500,
    fuelCost: 12000,
    totalCost: 14500,
    profit: 30500,
    roiPercentage: 20.3,
    roiScore: 95,
    trend: "Up"
  },
  {
    vehicleId: "V-102",
    vehicleName: "Freightliner Cascadia",
    investment: 145000,
    revenue: 38000,
    maintenanceCost: 4000,
    fuelCost: 13500,
    totalCost: 17500,
    profit: 20500,
    roiPercentage: 14.1,
    roiScore: 82,
    trend: "Stable"
  },
  {
    vehicleId: "V-103",
    vehicleName: "Peterbilt 579",
    investment: 160000,
    revenue: 25000,
    maintenanceCost: 8000,
    fuelCost: 14000,
    totalCost: 22000,
    profit: 3000,
    roiPercentage: 1.8,
    roiScore: 45,
    trend: "Down"
  }
];
