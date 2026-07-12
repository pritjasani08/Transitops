import * as React from "react"
import { Badge } from "../../../shared/components/ui/badge"
import { DriverStatus, LicenseStatus } from "../types"

interface DriverStatusBadgeProps {
  status: DriverStatus;
  className?: string;
}

export function DriverStatusBadge({ status, className }: DriverStatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case 'Active': return 'success';
      case 'Suspended': return 'danger';
      case 'On Leave': return 'warning';
      case 'Inactive': return 'secondary';
      default: return 'default';
    }
  }

  return (
    <Badge variant={getVariant()} className={className}>
      {status}
    </Badge>
  )
}

interface LicenseStatusBadgeProps {
  status: LicenseStatus;
  className?: string;
}

export function LicenseStatusBadge({ status, className }: LicenseStatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case 'Valid': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Expired': return 'danger';
      case 'Suspended': return 'danger';
      default: return 'default';
    }
  }

  return (
    <Badge variant={getVariant()} className={className}>
      {status}
    </Badge>
  )
}
