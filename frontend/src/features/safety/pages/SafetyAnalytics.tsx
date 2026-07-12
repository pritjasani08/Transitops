import * as React from "react"
import { BarChart3, Download, Calendar, Filter } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

const safetyTrendData = [
  { month: 'Jan', score: 88, incidents: 4 },
  { month: 'Feb', score: 89, incidents: 3 },
  { month: 'Mar', score: 91, incidents: 2 },
  { month: 'Apr', score: 90, incidents: 3 },
  { month: 'May', score: 92, incidents: 1 },
  { month: 'Jun', score: 94, incidents: 1 },
]

export function SafetyAnalytics() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Safety Analytics</h1>
          <p className="text-text-muted mt-1">Data-driven insights into fleet safety and compliance.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 6 Months
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Trend Chart */}
         <Card>
           <CardHeader>
             <CardTitle>Average Safety Score Trend</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={safetyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                    <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
           </CardContent>
         </Card>

         {/* Incidents Chart */}
         <Card>
           <CardHeader>
             <CardTitle>Incidents Over Time</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={safetyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                    />
                    <Bar dataKey="incidents" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
           </CardContent>
         </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
           <CardHeader>
             <CardTitle>Top Safe Drivers (Score &gt; 95)</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">JS</div>
                     <div>
                       <p className="font-semibold">John Smith</p>
                       <p className="text-xs text-text-muted">DRV-101</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-success-600">98</p>
                    <p className="text-xs text-text-muted">Score</p>
                  </div>
                </div>
                {/* Additional drivers would list here */}
             </div>
           </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
             <CardTitle>Training Compliance</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col items-center justify-center h-[200px]">
              <div className="relative inline-flex items-center justify-center">
                 <svg className="transform -rotate-90 w-32 h-32">
                   <circle className="text-gray-100 dark:text-gray-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                   <circle className="text-success-500" strokeWidth="12" strokeDasharray="351.8" strokeDashoffset="42.2" strokeLinecap="round" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                   <span className="text-2xl font-bold">88%</span>
                   <span className="text-xs text-text-muted">Completed</span>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
