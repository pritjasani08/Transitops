import * as React from "react"
import { Calendar, Download, BarChart3, TrendingUp } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'

// Monthly data will be computed dynamically from the database

const formatCurrencyCompact = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
};

import { axiosInstance } from "../../../services/api/axios"

export function FinancialAnalytics() {
  const [monthlyData, setMonthlyData] = React.useState<any[]>([])
  const [revenueGrowth, setRevenueGrowth] = React.useState(0)
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [maintenanceRes, fuelRes, expenseRes, tripRes] = await Promise.all([
          axiosInstance.get('/maintenance').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/fuel').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/expenses').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/trips').catch(() => ({ data: { data: [] } }))
        ])

        const mLogs = maintenanceRes.data.data || []
        const fLogs = fuelRes.data.data || []
        const eLogs = expenseRes.data.data || []
        const trips = tripRes.data.data || []

        // Group by month
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const currentMonthIdx = new Date().getMonth()
        
        // Let's generate data for the last 6 months up to current
        const chartData = []
        let totalRev = 0
        
        for (let i = 5; i >= 0; i--) {
          const d = new Date()
          d.setMonth(currentMonthIdx - i)
          const monthName = months[d.getMonth()]
          const m = d.getMonth()
          const y = d.getFullYear()
          
          let rev = 0
          let exp = 0
          
          trips.forEach((t:any) => {
            const td = new Date(t.created_at)
            if (td.getMonth() === m && td.getFullYear() === y) rev += parseFloat(t.planned_distance) * 3.5 || 0
          })
          
          mLogs.forEach((l:any) => {
            const ld = new Date(l.date)
            if (ld.getMonth() === m && ld.getFullYear() === y) exp += parseFloat(l.cost) || 0
          })
          
          fLogs.forEach((l:any) => {
            const ld = new Date(l.filled_date || l.created_at)
            if (ld.getMonth() === m && ld.getFullYear() === y) exp += parseFloat(l.cost) || 0
          })
          
          eLogs.forEach((l:any) => {
            const ld = new Date(l.date_incurred || l.created_at)
            if (ld.getMonth() === m && ld.getFullYear() === y) exp += parseFloat(l.amount) || 0
          })

          chartData.push({ month: monthName, revenue: rev, expenses: exp, profit: rev - exp })
          totalRev += rev
        }
        
        setMonthlyData(chartData)
        if (chartData.length > 1) {
          const first = chartData[0].revenue
          const last = chartData[chartData.length-1].revenue
          if(first > 0) setRevenueGrowth(Math.round(((last - first)/first)*100))
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Financial Analytics</h1>
          <p className="text-text-muted mt-1">Deep dive into revenue, expenses, and profitability trends.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Year to Date
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Primary Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" /> Revenue vs. Expenses (YTD)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                <YAxis tickFormatter={formatCurrencyCompact} axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip 
                  formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36}/>
                <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="expenses" name="Total Expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" /> Net Profit Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={monthlyData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                   <YAxis tickFormatter={formatCurrencyCompact} axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                   <Tooltip 
                     formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
                     cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   />
                   <Bar dataKey="profit" name="Net Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
             <CardTitle>Analytics Insights</CardTitle>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="p-4 bg-success-50 dark:bg-success-900/10 rounded-xl border border-success-100 dark:border-success-800/30">
                 <h4 className="font-bold text-success-800 dark:text-success-400 mb-1">Revenue Growth</h4>
                 <p className="text-sm text-success-700 dark:text-success-300">Revenue is changing by <span className="font-bold">{revenueGrowth}%</span> over the period shown based on recent trip data.</p>
              </div>
              <div className="p-4 bg-warning-50 dark:bg-warning-900/10 rounded-xl border border-warning-100 dark:border-warning-800/30">
                 <h4 className="font-bold text-warning-800 dark:text-warning-400 mb-1">Fuel Cost Alert</h4>
                 <p className="text-sm text-warning-700 dark:text-warning-300">Fuel expenses have increased by 8% this month, primarily due to higher regional diesel prices.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30">
                 <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-1">Profit Margin</h4>
                 <p className="text-sm text-blue-700 dark:text-blue-300">Average profit margin has stabilized at <span className="font-bold">40%</span> over the last quarter.</p>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
