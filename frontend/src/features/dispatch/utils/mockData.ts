import { Trip, DispatchKPIs } from "../types";

export const MOCK_KPIS: DispatchKPIs = {
  pendingTrips: 12,
  dispatchedTrips: 8,
  completedTrips: 45,
  cancelledTrips: 2,
  availableDrivers: 15,
  availableVehicles: 18,
  tripsInProgress: 24,
  averageDispatchTime: "18m",
  dispatchHealthScore: 94
};

export const MOCK_TRIPS: Trip[] = [
  {
    id: "TRP-001",
    referenceId: "ORD-9981",
    status: "Draft",
    priority: "Low",
    source: { address: "100 Logistics Way, NY" },
    destination: { address: "550 Delivery Ave, NJ" },
    cargo: { weight: 5000, category: "Electronics", hazmat: false },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "TRP-002",
    referenceId: "ORD-9982",
    status: "Ready",
    priority: "High",
    source: { address: "Warehouse B, Chicago" },
    destination: { address: "Retail Hub, Detroit" },
    cargo: { weight: 12000, category: "Auto Parts", hazmat: false },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "TRP-003",
    referenceId: "ORD-9983",
    status: "Dispatched",
    priority: "Critical",
    source: { address: "Port Authority, Miami" },
    destination: { address: "Med Center, Orlando" },
    cargo: { weight: 2000, category: "Medical Supplies", hazmat: false },
    driverId: "DRV-110",
    driverName: "Sarah Connor",
    vehicleId: "VHC-405",
    vehicleReg: "FL-MDC-01",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
  },
  {
    id: "TRP-004",
    referenceId: "ORD-9984",
    status: "On Route",
    priority: "Medium",
    source: { address: "Fulfillment Center, Seattle" },
    destination: { address: "Distribution Node, Portland" },
    cargo: { weight: 8500, category: "Consumer Goods", hazmat: false },
    driverId: "DRV-089",
    driverName: "Marcus Wright",
    vehicleId: "VHC-221",
    vehicleReg: "WA-LOG-99",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  }
];
