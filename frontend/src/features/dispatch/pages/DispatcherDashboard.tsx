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
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">ESG Overview</h1>
            <span className="px-3 py-1 bg-success-500/10 text-success-500 text-xs font-semibold rounded-full border border-success-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
          <p className="text-text-muted">Welcome back. Sustainability data updated: <span className="font-medium text-text-primary">{currentTime}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            ESG Score: 92/100
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-700 text-white">
            <FileText className="h-4 w-4" />
            Generate Report
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
            title="Total Emissions (tCO2e)" 
            value="14,230" 
            icon={Wind}
            trend="12%"
            trendUp={false}
            colorClass="text-gray-500"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DispatchKPICard 
            title="Energy Usage (MWh)" 
            value="3,842" 
            icon={Zap}
            colorClass="text-warning-500"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DispatchKPICard 
            title="Water Consumption (kL)" 
            value="12,040" 
            icon={Droplets}
            colorClass="text-info-500"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DispatchKPICard 
            title="Active Initiatives" 
            value="24" 
            icon={Leaf}
            trend="4"
            trendUp={true}
            colorClass="text-primary"
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
                <CardTitle>Action Items & Anomalies</CardTitle>
                <p className="text-sm text-text-muted mt-1">Metrics requiring your attention.</p>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_TRIPS.filter(t => t.status === 'Ready' || t.status === 'Draft' || t.priority === 'Critical').map((trip, idx) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 rounded-lg border border-border-subtle bg-surface-100 hover:bg-surface-200 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-surface-100 rounded-lg shadow-sm border border-border-subtle">
                        {idx % 2 === 0 ? <Zap className="h-5 w-5 text-warning-500" /> : <Wind className="h-5 w-5 text-danger-500" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-text-primary">{idx % 2 === 0 ? 'Energy Spike Detected' : 'Emissions Threshold Exceeded'}</span>
                          <PriorityBadge priority={trip.priority} />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Facility {trip.source.address.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Investigate</Button>
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
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success-500" />
                  <span className="font-medium">Targets Met</span>
                </div>
                <span className="text-xl font-bold">8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-200">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-info-500" />
                  <span className="font-medium">In Progress</span>
                </div>
                <span className="text-xl font-bold">12</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-200">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-danger-500" />
                  <span className="font-medium">Missed</span>
                </div>
                <span className="text-xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Leaf className="h-5 w-5" />
                <span>New Initiative</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Zap className="h-5 w-5" />
                <span>Log Energy</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <MapPin className="h-5 w-5" />
                <span>Facilities</span>
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
