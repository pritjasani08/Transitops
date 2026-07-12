import * as React from "react"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { LucideIcon } from "lucide-react"

interface DispatchKPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
}

export function DispatchKPICard({ title, value, icon: Icon, trend, trendUp, colorClass = "text-primary" }: DispatchKPICardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-800 ${colorClass}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className={trendUp ? 'text-success-600' : 'text-danger-600'}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
            <span className="text-text-muted">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
