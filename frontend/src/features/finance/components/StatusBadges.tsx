import * as React from "react"
import { Badge } from "../../../shared/components/ui/badge"
import { ExpenseStatus } from "../types"

interface ExpenseStatusBadgeProps {
  status: ExpenseStatus;
  className?: string;
}

export function ExpenseStatusBadge({ status, className }: ExpenseStatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Paid': return 'default'; // maybe a custom color for paid later, or use default (often blue)
      case 'Rejected': return 'danger';
      case 'Pending': return 'warning';
      default: return 'secondary';
    }
  }

  return (
    <Badge variant={getVariant()} className={className}>
      {status}
    </Badge>
  )
}
