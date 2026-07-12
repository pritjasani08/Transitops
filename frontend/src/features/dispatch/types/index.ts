export type TripStatus = 'Draft' | 'Ready' | 'Dispatched' | 'On Route' | 'Completed' | 'Cancelled' | 'Delayed';
export type TripPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Location {
  address: string;
  lat?: number;
  lng?: number;
}

export interface CargoDetails {
  weight: number; // in kg or lbs
  category: string;
  hazmat: boolean;
  notes?: string;
}

export interface Trip {
  id: string;
  referenceId: string;
  status: TripStatus;
  priority: TripPriority;
  source: Location;
  destination: Location;
  cargo: CargoDetails;
  scheduledTime?: string;
  expectedArrivalTime?: string;
  driverId?: string;
  driverName?: string;
  vehicleId?: string;
  vehicleReg?: string;
  distance?: number;
  estimatedDuration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DispatchKPIs {
  pendingTrips: number;
  dispatchedTrips: number;
  completedTrips: number;
  cancelledTrips: number;
  availableDrivers: number;
  availableVehicles: number;
  tripsInProgress: number;
  averageDispatchTime: string;
  dispatchHealthScore: number;
}
