import * as React from "react"
import { Badge } from "../../../shared/components/ui/badge"
import { TripPriority } from "../types"
import { AlertCircle, ArrowDown, ArrowUp, Zap } from "lucide-react"

interface PriorityBadgeProps {
  priority: TripPriority;
  className?: string;
  showIcon?: boolean;
}

export function PriorityBadge({ priority, className, showIcon = true }: PriorityBadgeProps) {
  const getConfig = () => {
    switch (priority) {
      case 'Low': return { variant: 'outline' as const, icon: ArrowDown, color: 'text-gray-500' };
      case 'Medium': return { variant: 'secondary' as const, icon: ArrowUp, color: 'text-blue-500' };
      case 'High': return { variant: 'warning' as const, icon: Zap, color: 'text-warning-500' };
      case 'Critical': return { variant: 'danger' as const, icon: AlertCircle, color: 'text-danger-500' };
      default: return { variant: 'default' as const, icon: ArrowUp, color: 'text-gray-500' };
    }
  }

  const { variant, icon: Icon, color } = getConfig();

  return (
    <Badge variant={variant} className={`gap-1 ${className}`}>
      {showIcon && <Icon className={`h-3 w-3 ${color}`} />}
      {priority}
    </Badge>
  )
}
