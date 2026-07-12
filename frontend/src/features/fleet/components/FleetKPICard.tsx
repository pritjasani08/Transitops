import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { cn } from "../../../shared/utils/cn"

interface FleetKPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: React.ElementType;
  className?: string;
}

export function FleetKPICard({ title, value, trend, trendLabel, icon: Icon, className }: FleetKPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-text-muted">{title}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-semibold text-text-primary">{value}</h3>
                {trend !== undefined && (
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      trend > 0
                        ? "text-secondary-500 bg-secondary-500/10"
                        : trend < 0
                        ? "text-danger-500 bg-danger-500/10"
                        : "text-text-muted bg-gray-100"
                    )}
                  >
                    {trend > 0 ? "+" : ""}
                    {trend}%
                  </span>
                )}
              </div>
              {trendLabel && <p className="text-xs text-text-muted">{trendLabel}</p>}
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
