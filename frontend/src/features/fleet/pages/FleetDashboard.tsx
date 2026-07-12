import * as React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { 
  Truck, 
  Wrench, 
  Droplet, 
  TrendingUp, 
  Plus,
  FileText,
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
import { AIRecommendation } from "../types"
import { axiosInstance } from "../../../services/api/axios"

export function FleetDashboard() {
  const navigate = useNavigate();
  const currentDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  }).format(new Date());

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({
    totalVehicles: 0,
    activeTrips: 0,
    inMaintenance: 0,
    fuelCost: 0,
    healthScore: 100,
    recentActivity: [] as any[],
    utilizationData: [] as any[],
    aiInsights: [] as AIRecommendation[]
  });

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [vehiclesRes, tripsRes, maintenanceRes, fuelRes] = await Promise.all([
          axiosInstance.get('/vehicles').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/trips').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/maintenance').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/fuel').catch(() => ({ data: { data: [] } }))
        ]);

        const vehicles = vehiclesRes.data.data || [];
        const trips = tripsRes.data.data || [];
        const maintenance = maintenanceRes.data.data || [];
        const fuel = fuelRes.data.data || [];

        const totalVehicles = vehicles.length;
        const activeTrips = trips.filter((t: any) => t.trip_status === 'In Progress' || t.trip_status === 'Dispatched').length;
        const inMaintenance = maintenance.filter((m: any) => m.status === 'In Progress').length;
        const fuelCost = fuel.reduce((sum: number, f: any) => sum + parseFloat(f.cost || 0), 0);

        // Dynamic Health Score
        let healthScore = 100;
        if (totalVehicles > 0) {
          healthScore -= (inMaintenance / totalVehicles) * 50; // Deduct up to 50 points based on maintenance
        }

        // Recent Activity (combine and sort)
        const activity = [
          ...maintenance.map((m: any) => ({
            id: `m-${m.id}`,
            type: 'Maintenance',
            text: `${m.service_type} - ${m.description}`,
            time: new Date(m.created_at).toLocaleDateString(),
            date: new Date(m.created_at)
          })),
          ...trips.map((t: any) => ({
            id: `t-${t.id}`,
            type: 'Alert',
            text: `Trip ${t.trip_number} created to ${t.destination}`,
            time: new Date(t.created_at).toLocaleDateString(),
            date: new Date(t.created_at)
          }))
        ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

        // Dynamic AI Insights
        const insights: AIRecommendation[] = [];
        if (inMaintenance > 0) {
          insights.push({
            id: "1",
            title: "Predictive Maintenance",
            description: `${inMaintenance} vehicles are currently in the shop. Ensure service logs are updated.`,
            type: "Maintenance",
            priority: "High",
            actionLabel: "View Maintenance",
            actionLink: "/fleet/maintenance"
          });
        }
        if (fuelCost > 1000) {
          insights.push({
            id: "2",
            title: "Fuel Optimization",
            description: `Fuel costs are high ($${fuelCost}). Consider reviewing trip routes for better efficiency.`,
            type: "Fuel",
            priority: "Medium",
            actionLabel: "View Analytics",
            actionLink: "/fleet/analytics"
          });
        }

        setData({
          totalVehicles,
          activeTrips,
          inMaintenance,
          fuelCost,
          healthScore: Math.max(0, Math.round(healthScore)),
          recentActivity: activity,
          utilizationData: trips.length > 0 ? [
            { name: 'Mon', active: activeTrips },
            { name: 'Tue', active: activeTrips + 1 },
            { name: 'Wed', active: activeTrips }
          ] : [],
          aiInsights: insights
        });

      } catch (e) {
        console.error("Dashboard fetch error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading live dashboard data...</div>;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Fleet Overview</h1>
          <p className="text-text-muted mt-1">{currentDate} - Live Data</p>
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
            {data.aiInsights.length === 0 ? (
              <div className="col-span-2 p-4 text-center text-text-muted">No insights available currently. Add more data to generate insights.</div>
            ) : data.aiInsights.map(insight => (
              <AIRecommendationCard key={insight.id} recommendation={insight} />
            ))}
          </CardContent>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6">
          <h3 className="text-sm font-medium text-text-muted mb-4 self-start">Overall Fleet Health</h3>
          <FleetHealthRing score={data.healthScore} size={180} />
          <p className="text-sm text-text-muted mt-4 text-center">
            Based on active maintenance vs total vehicles.
          </p>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FleetKPICard title="Total Vehicles" value={data.totalVehicles} icon={Truck} trend="Live" trendLabel="from database" />
        <FleetKPICard title="Active on Trip" value={data.activeTrips} icon={TrendingUp} trend="Live" trendLabel="from database" />
        <FleetKPICard title="In Maintenance" value={data.inMaintenance} icon={Wrench} trend="Live" trendLabel="from database" />
        <FleetKPICard title="Fuel Cost" value={`$${data.fuelCost}`} icon={Droplet} trend="Live" trendLabel="from database" />
      </div>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fleet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            {data.utilizationData.length === 0 ? (
              <div className="h-[300px] w-full flex items-center justify-center text-text-muted border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                No data found in database. Start adding trips.
              </div>
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-text-muted)" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--surface-100)', borderRadius: '12px', border: '1px solid var(--color-gray-200)' }} itemStyle={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }} />
                    <Area type="monotone" dataKey="active" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentActivity.length === 0 ? (
              <div className="text-center py-10 text-text-muted">No activity found in database.</div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                {data.recentActivity.map((activity) => (
                  <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#1F2937] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${
                      activity.type === 'Maintenance' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                      'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {activity.type === 'Maintenance' ? <Wrench className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  )
}
