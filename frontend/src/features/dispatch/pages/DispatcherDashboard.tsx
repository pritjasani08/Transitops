import * as React from "react"
import { motion } from "framer-motion"
import { 
  Package, 
  Truck, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Navigation,
  MapPin,
  XCircle,
  Activity,
  FileText
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { DispatchKPICard } from "../components/DispatchKPICard"
import { MOCK_KPIS, MOCK_TRIPS } from "../utils/mockData"
import { TripStatusBadge } from "../components/TripStatusBadge"
import { PriorityBadge } from "../components/PriorityBadge"

export function DispatcherDashboard() {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Mission Control</h1>
            <span className="px-3 py-1 bg-success-50 text-success-700 text-xs font-semibold rounded-full border border-success-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></span>
              System Optimal
            </span>
          </div>
          <p className="text-text-muted">Welcome back, Dispatcher. Local time: <span className="font-medium text-text-primary">{currentTime}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            Health Score: {MOCK_KPIS.dispatchHealthScore}
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Package className="h-4 w-4" />
            Create Trip
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DispatchKPICard 
            title="Trips In Progress" 
            value={MOCK_KPIS.tripsInProgress} 
            icon={Navigation}
            trend="12%"
            trendUp={true}
            colorClass="text-blue-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DispatchKPICard 
            title="Available Drivers" 
            value={MOCK_KPIS.availableDrivers} 
            icon={Users}
            colorClass="text-success-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DispatchKPICard 
            title="Available Vehicles" 
            value={MOCK_KPIS.availableVehicles} 
            icon={Truck}
            colorClass="text-purple-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DispatchKPICard 
            title="Pending Dispatch" 
            value={MOCK_KPIS.pendingTrips} 
            icon={Clock}
            trend="4"
            trendUp={false}
            colorClass="text-warning-600"
          />
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Active / Critical Trips */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attention Required</CardTitle>
                <p className="text-sm text-text-muted mt-1">Trips needing immediate dispatch action.</p>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_TRIPS.filter(t => t.status === 'Ready' || t.status === 'Draft' || t.priority === 'Critical').map(trip => (
                  <div key={trip.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-text-primary">{trip.id}</span>
                          <PriorityBadge priority={trip.priority} />
                          <TripStatusBadge status={trip.status} />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {trip.source.address.split(',')[0]}</span>
                          <span>→</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {trip.destination.address.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Action</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Secondary KPIs & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success-500" />
                  <span className="font-medium">Completed</span>
                </div>
                <span className="text-xl font-bold">{MOCK_KPIS.completedTrips}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <Navigation className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Dispatched</span>
                </div>
                <span className="text-xl font-bold">{MOCK_KPIS.dispatchedTrips}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-danger-500" />
                  <span className="font-medium">Cancelled</span>
                </div>
                <span className="text-xl font-bold">{MOCK_KPIS.cancelledTrips}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Users className="h-5 w-5" />
                <span>Assign Driver</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Truck className="h-5 w-5" />
                <span>Assign Vehicle</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <MapPin className="h-5 w-5" />
                <span>View Route</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span>Reports</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
