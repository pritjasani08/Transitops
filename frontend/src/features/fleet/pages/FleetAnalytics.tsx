import * as React from "react"
import { motion } from "framer-motion"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area
} from "recharts"
import { Download, Filter, Calendar } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"

const fuelData = [
  { month: 'Jan', cost: 4000, efficiency: 6.2 },
  { month: 'Feb', cost: 3000, efficiency: 6.5 },
  { month: 'Mar', cost: 2000, efficiency: 6.8 },
  { month: 'Apr', cost: 2780, efficiency: 6.4 },
  { month: 'May', cost: 1890, efficiency: 6.9 },
  { month: 'Jun', cost: 2390, efficiency: 7.1 },
  { month: 'Jul', cost: 3490, efficiency: 6.7 },
];

const maintenanceCostData = [
  { name: 'Week 1', Routine: 4000, Repair: 2400 },
  { name: 'Week 2', Routine: 3000, Repair: 1398 },
  { name: 'Week 3', Routine: 2000, Repair: 9800 },
  { name: 'Week 4', Routine: 2780, Repair: 3908 },
];

export function FleetAnalytics() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Fleet Analytics</h1>
          <p className="text-text-muted mt-1">Comprehensive performance and cost analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fuel Cost vs Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle>Fuel Consumption Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fuelData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-text-muted)" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--surface-100)', borderRadius: '12px', border: '1px solid var(--color-gray-200)' }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="cost" name="Cost ($)" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" name="MPG" stroke="var(--color-secondary-500)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Costs */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceCostData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-text-muted)" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <RechartsTooltip 
                    cursor={{ fill: 'var(--color-gray-100)', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: 'var(--surface-100)', borderRadius: '12px', border: '1px solid var(--color-gray-200)' }}
                  />
                  <Legend />
                  <Bar dataKey="Routine" stackId="a" fill="var(--color-primary)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Repair" stackId="a" fill="var(--color-danger-500)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
