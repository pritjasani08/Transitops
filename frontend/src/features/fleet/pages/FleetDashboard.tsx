import * as React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { 
  Truck, 
  Wrench, 
  Droplet, 
  TrendingUp, 
  Plus,
  Calendar as CalendarIcon,
  FileText,
  Download,
  AlertTriangle
} from "lucide-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { FleetKPICard } from "../components/FleetKPICard"
import { FleetHealthRing } from "../components/FleetHealthRing"
import { AIRecommendationCard } from "../components/AIRecommendationCard"
import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { AIRecommendation } from "../types"

// Mock Data
const utilizationData = [
  { name: 'Mon', active: 82 },
  { name: 'Tue', active: 85 },
  { name: 'Wed', active: 81 },
  { name: 'Thu', active: 88 },
  { name: 'Fri', active: 92 },
  { name: 'Sat', active: 75 },
  { name: 'Sun', active: 70 },
]

const recentActivity = [
  { id: 1, type: 'Maintenance', text: 'Vehicle MH-12 completed routine inspection.', time: '2h ago' },
  { id: 2, type: 'Alert', text: 'Low fuel efficiency detected on Vehicle NY-05.', time: '4h ago' },
  { id: 3, type: 'Document', text: 'Insurance renewed for 5 vehicles.', time: '1d ago' },
]

const aiInsights: AIRecommendation[] = [
  {
    id: "1",
    title: "Predictive Maintenance",
    description: "Tire replacement recommended for 4 vehicles based on mileage and historical wear patterns.",
    type: "Maintenance",
    priority: "High",
    actionLabel: "Schedule Replacement",
    actionLink: "/fleet/maintenance/new"
  },
  {
    id: "2",
    title: "Fuel Optimization",
    description: "Vehicle MH-12 is consuming 15% more fuel than average in its class over the last 30 days.",
    type: "Fuel",
    priority: "Medium",
    actionLabel: "View Analytics",
    actionLink: "/fleet/analytics/mh-12"
  }
]

export function FleetDashboard() {
  const navigate = useNavigate();
  const currentDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  }).format(new Date());

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Fleet Overview</h1>
          <p className="text-text-muted mt-1">{currentDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2" onClick={() => navigate('/fleet/registry')}>
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* AI Insights & Health Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-surface-100 to-gray-50/50 dark:from-surface-100 dark:to-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-primary" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map(insight => (
              <AIRecommendationCard key={insight.id} recommendation={insight} />
            ))}
          </CardContent>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6">
          <h3 className="text-sm font-medium text-text-muted mb-4 self-start">Overall Fleet Health</h3>
          <FleetHealthRing score={88} size={180} />
          <p className="text-sm text-text-muted mt-4 text-center">
            Based on maintenance records, telemetry, and compliance status.
          </p>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FleetKPICard 
          title="Total Vehicles" 
          value={142} 
          icon={Truck}
          trend={2.4}
          trendLabel="vs last month"
        />
        <FleetKPICard 
          title="Active on Trip" 
          value={84} 
          icon={TrendingUp}
          trend={12.5}
          trendLabel="vs yesterday"
        />
        <FleetKPICard 
          title="In Maintenance" 
          value={12} 
          icon={Wrench}
          trend={-15}
          trendLabel="vs last week"
        />
        <FleetKPICard 
          title="Fuel Cost (MTD)" 
          value="$24.5k" 
          icon={Droplet}
          trend={4.2}
          trendLabel="vs last month"
        />
      </div>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fleet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-text-muted)" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface-100)', borderRadius: '12px', border: '1px solid var(--color-gray-200)' }}
                    itemStyle={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                  />
                  <Area type="monotone" dataKey="active" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#1F2937] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${
                    activity.type === 'Maintenance' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                    activity.type === 'Alert' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' :
                    'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {activity.type === 'Maintenance' ? <Wrench className="w-4 h-4" /> : activity.type === 'Alert' ? <AlertTriangle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-surface-100 shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-semibold text-text-primary text-sm">{activity.type}</div>
                      <time className="font-mono text-xs text-text-muted">{activity.time}</time>
                    </div>
                    <div className="text-sm text-text-muted">{activity.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="ghost" size="sm" className="w-full">View All Activity</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
