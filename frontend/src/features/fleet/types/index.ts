export type VehicleStatus = "Available" | "On Trip" | "In Shop" | "Out of Service";

export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  type: string;
  status: VehicleStatus;
  odometer: number;
  healthScore: number;
  lastService: string;
  nextService: string;
}

export interface MaintenanceTask {
  id: string;
  vehicleId: string;
  vehicleRegistration: string;
  type: "Routine" | "Repair" | "Inspection";
  description: string;
  status: "Scheduled" | "In Progress" | "Completed";
  date: string;
  cost?: number;
  mechanic?: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  type: "Maintenance" | "Fuel" | "Efficiency" | "Safety";
  priority: "High" | "Medium" | "Low";
  actionLabel: string;
  actionLink: string;
}
