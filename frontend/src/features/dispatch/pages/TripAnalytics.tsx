import * as React from "react"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts"
import { Calendar, Download, Filter } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"

const TRIPS_PER_DAY = [
  { name: 'Mon', completed: 45, delayed: 4 },
  { name: 'Tue', completed: 52, delayed: 2 },
  { name: 'Wed', completed: 49, delayed: 5 },
  { name: 'Thu', completed: 63, delayed: 1 },
  { name: 'Fri', completed: 58, delayed: 6 },
  { name: 'Sat', completed: 34, delayed: 2 },
  { name: 'Sun', completed: 25, delayed: 1 },
]

const DISPATCH_PERFORMANCE = [
  { time: '08:00', avgDispatchTime: 15, target: 20 },
  { time: '10:00', avgDispatchTime: 18, target: 20 },
  { time: '12:00', avgDispatchTime: 22, target: 20 },
  { time: '14:00', avgDispatchTime: 25, target: 20 },
  { time: '16:00', avgDispatchTime: 19, target: 20 },
  { time: '18:00', avgDispatchTime: 14, target: 20 },
]

const COMPLETION_RATE = [
  { name: 'On Time', value: 85 },
  { name: 'Delayed', value: 12 },
  { name: 'Cancelled', value: 3 },
]

const COLORS = ['#22c55e', '#f59e0b', '#ef4444']

export function TripAnalytics() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Dispatch Analytics</h1>
          <p className="text-text-muted mt-1">Key performance metrics and historical trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 Days
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Trips Volume (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TRIPS_PER_DAY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="delayed" name="Delayed" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={COMPLETION_RATE}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {COMPLETION_RATE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 mt-2">
                {COMPLETION_RATE.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      <span className="text-text-muted">{item.name}</span>
                    </div>
                    <span className="font-semibold text-text-primary">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Average Dispatch Time (Minutes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DISPATCH_PERFORMANCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="avgDispatchTime" name="Actual Time" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAvg)" />
                  <Line type="step" dataKey="target" name="Target (< 20m)" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
