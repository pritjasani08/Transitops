import * as React from "react"
import { motion } from "framer-motion"
import {
  Leaf,
  Droplets,
  Wind,
  Zap,
  CheckCircle2, 
  MapPin,
  XCircle,
  Activity,
  FileText
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { DispatchKPICard } from "../components/DispatchKPICard"
import { TripStatusBadge } from "../components/TripStatusBadge"
import { PriorityBadge } from "../components/PriorityBadge"
import { axiosInstance } from "../../../services/api/axios"
import { useNavigate } from "react-router-dom"

export function DispatcherDashboard() {
  const navigate = useNavigate()
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const [trips, setTrips] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get('/trips')
        setTrips(res.data.data || [])
      } catch (e) {
        console.error("Failed to fetch trips", e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const activeTrips = trips.filter(t => t.trip_status === 'In Progress' || t.trip_status === 'Dispatched')
  const completedTrips = trips.filter(t => t.trip_status === 'Completed')
  const cancelledTrips = trips.filter(t => t.trip_status === 'Cancelled')

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Dispatch Overview</h1>
            <span className="px-3 py-1 bg-success-500/10 text-success-500 text-xs font-semibold rounded-full border border-success-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></span>
              Live Database Connected
            </span>
          </div>
          <p className="text-text-muted">Welcome back. Trip data updated: <span className="font-medium text-text-primary">{currentTime}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            System Health: Excellent
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-700 text-white" onClick={() => navigate('/dispatch/trips/new')}>
            <FileText className="h-4 w-4" />
            New Trip
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DispatchKPICard title="Total Trips" value={trips.length.toString()} icon={Wind} trend="Live" trendUp={true} colorClass="text-gray-500" />
        <DispatchKPICard title="Active Dispatches" value={activeTrips.length.toString()} icon={Zap} trend="Live" colorClass="text-warning-500" />
        <DispatchKPICard title="Completed Trips" value={completedTrips.length.toString()} icon={CheckCircle2} trend="Live" colorClass="text-success-500" />
        <DispatchKPICard title="Cancelled/Failed" value={cancelledTrips.length.toString()} icon={XCircle} trend="Live" trendUp={false} colorClass="text-danger-500" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Trips</CardTitle>
                <p className="text-sm text-text-muted mt-1">Real-time trips from database.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dispatch/trips')}>View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="p-8 text-center text-text-muted">Loading live trips...</div>
                ) : activeTrips.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-text-muted">No active trips found in the database.</div>
                ) : activeTrips.map((trip, idx) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 rounded-lg border border-border-subtle bg-surface-100 hover:bg-surface-200 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-surface-100 rounded-lg shadow-sm border border-border-subtle">
                        <Zap className="h-5 w-5 text-warning-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-text-primary">Trip {trip.trip_number || trip.id.substring(0,8)}</span>
                          <TripStatusBadge status={trip.trip_status} />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> To {trip.destination}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/dispatch/trips/${trip.id}`)}>Track</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success-500" />
                  <span className="font-medium">Completed</span>
                </div>
                <span className="text-xl font-bold">{completedTrips.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-200">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-info-500" />
                  <span className="font-medium">Active</span>
                </div>
                <span className="text-xl font-bold">{activeTrips.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-200">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-danger-500" />
                  <span className="font-medium">Cancelled</span>
                </div>
                <span className="text-xl font-bold">{cancelledTrips.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
