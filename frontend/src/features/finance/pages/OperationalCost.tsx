import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Calendar, Download } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { MOCK_FINANCE_KPIS } from "../utils/mockData"

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const costBreakdownData = [
  { name: 'Fuel', value: MOCK_FINANCE_KPIS.fuelCost, color: '#3b82f6' },
  { name: 'Maintenance', value: MOCK_FINANCE_KPIS.maintenanceCost, color: '#ef4444' },
  { name: 'Insurance', value: 15000, color: '#8b5cf6' },
  { name: 'Tolls & Parking', value: 5500, color: '#f59e0b' },
  { name: 'Miscellaneous', value: MOCK_FINANCE_KPIS.operationalCost - MOCK_FINANCE_KPIS.fuelCost - MOCK_FINANCE_KPIS.maintenanceCost - 15000 - 5500, color: '#6b7280' },
]

export function OperationalCost() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Operational Costs</h1>
          <p className="text-text-muted mt-1">Detailed breakdown of all fleet operational expenditures.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            This Month
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breakdown Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="h-80 w-full md:w-1/2">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={costBreakdownData}
                         cx="50%"
                         cy="50%"
                         innerRadius={80}
                         outerRadius={120}
                         paddingAngle={2}
                         dataKey="value"
                       >
                         {costBreakdownData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip 
                         formatter={(value: number) => formatCurrency(value)}
                         contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                       />
                     </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                   {costBreakdownData.map(item => (
                     <div key={item.name} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                         <span className="text-sm font-medium text-text-muted">{item.name}</span>
                       </div>
                       <span className="font-bold text-text-primary">{formatCurrency(item.value)}</span>
                     </div>
                   ))}
                   <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-4">
                     <span className="font-bold text-text-primary">Total Operational Cost</span>
                     <span className="text-xl font-bold text-blue-600">{formatCurrency(MOCK_FINANCE_KPIS.operationalCost)}</span>
                   </div>
                </div>
             </div>
          </CardContent>
        </Card>
        
        {/* Department Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Department Comparison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div>
               <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-medium">Logistics & Freight</span>
                 <span className="font-bold">{formatCurrency(45000)}</span>
               </div>
               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-medium">Maintenance Div.</span>
                 <span className="font-bold">{formatCurrency(28000)}</span>
               </div>
               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                 <div className="bg-danger-500 h-2 rounded-full" style={{ width: '40%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-medium">HQ / General</span>
                 <span className="font-bold">{formatCurrency(15500.75)}</span>
               </div>
               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                 <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
