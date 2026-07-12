export type DriverStatus = 'Active' | 'Suspended' | 'On Leave' | 'Inactive';
export type LicenseStatus = 'Valid' | 'Expiring Soon' | 'Expired' | 'Suspended';
export type ComplianceStatus = 'Compliant' | 'Warning' | 'Non-Compliant';
export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface License {
  number: string;
  type: string;
  state: string;
  expiryDate: string;
  status: LicenseStatus;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  status: DriverStatus;
  license: License;
  safetyScore: number;
  joinedDate: string;
  trainingCompletion: number;
}

export interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  type: 'License' | 'Compliance' | 'Incident' | 'General';
  severity: 'Warning' | 'Critical' | 'Info';
  date: string;
  driverId?: string;
}

export interface SafetyKPIs {
  totalDrivers: number;
  availableDrivers: number;
  suspendedDrivers: number;
  expiredLicenses: number;
  expiringLicenses: number;
  complianceIssues: number;
  averageSafetyScore: number;
  trainingCompletion: number;
}

export interface Incident {
  id: string;
  date: string;
  driverId: string;
  driverName: string;
  type: string;
  severity: IncidentSeverity;
  status: 'Open' | 'Under Investigation' | 'Resolved';
  description: string;
}
