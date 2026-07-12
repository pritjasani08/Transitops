import * as React from "react"
import { Badge } from "../../../shared/components/ui/badge"
import { TripStatus } from "../types"

interface TripStatusBadgeProps {
  status: TripStatus;
  className?: string;
}

export function TripStatusBadge({ status, className }: TripStatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Cancelled': return 'danger';
      case 'Delayed': return 'danger';
      case 'On Route': return 'warning';
      case 'Dispatched': return 'default';
      case 'Ready': return 'secondary';
      case 'Draft': return 'outline';
      default: return 'default';
    }
  }

  return (
    <Badge variant={getVariant()} className={className}>
      {status}
    </Badge>
  )
}
