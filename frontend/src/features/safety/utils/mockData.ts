import { Driver, SafetyKPIs, SafetyAlert, Incident } from "../types";

export const MOCK_SAFETY_KPIS: SafetyKPIs = {
  totalDrivers: 145,
  availableDrivers: 132,
  suspendedDrivers: 3,
  expiredLicenses: 2,
  expiringLicenses: 8,
  complianceIssues: 5,
  averageSafetyScore: 92,
  trainingCompletion: 88,
};

export const MOCK_DRIVERS: Driver[] = [
  {
    id: "DRV-101",
    name: "John Smith",
    email: "john.smith@transithub.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    license: {
      number: "DL-123456",
      type: "Class A CDL",
      state: "CA",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(),
      status: "Valid"
    },
    safetyScore: 98,
    joinedDate: "2020-03-15T00:00:00.000Z",
    trainingCompletion: 100,
  },
  {
    id: "DRV-102",
    name: "Sarah Connor",
    email: "sarah.connor@transithub.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    license: {
      number: "DL-987654",
      type: "Class A CDL",
      state: "FL",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
      status: "Expiring Soon"
    },
    safetyScore: 85,
    joinedDate: "2021-06-22T00:00:00.000Z",
    trainingCompletion: 80,
  },
  {
    id: "DRV-103",
    name: "Marcus Wright",
    email: "marcus.wright@transithub.com",
    phone: "+1 (555) 456-7890",
    status: "Suspended",
    license: {
      number: "DL-456789",
      type: "Class A CDL",
      state: "WA",
      expiryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      status: "Expired"
    },
    safetyScore: 65,
    joinedDate: "2019-11-05T00:00:00.000Z",
    trainingCompletion: 45,
  }
];

export const MOCK_ALERTS: SafetyAlert[] = [
  {
    id: "ALT-001",
    title: "License Expired",
    description: "Marcus Wright's CDL expired 5 days ago.",
    type: "License",
    severity: "Critical",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    driverId: "DRV-103"
  },
  {
    id: "ALT-002",
    title: "License Expiring Soon",
    description: "Sarah Connor's CDL expires in 15 days.",
    type: "License",
    severity: "Warning",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    driverId: "DRV-102"
  },
  {
    id: "ALT-003",
    title: "Speeding Violation",
    description: "Speeding incident reported for DRV-105.",
    type: "Incident",
    severity: "Warning",
    date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  }
];
