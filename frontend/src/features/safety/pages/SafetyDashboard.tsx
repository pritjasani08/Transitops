import * as React from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  ShieldAlert, 
  FileWarning, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck,
  Award,
  Activity
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { SafetyKPICard } from "../components/SafetyKPICard"
import { MOCK_SAFETY_KPIS, MOCK_ALERTS } from "../utils/mockData"

export function SafetyDashboard() {
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
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Compliance Center</h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Monitoring Active
            </span>
          </div>
          <p className="text-text-muted">Welcome back, Safety Officer. Local time: <span className="font-medium text-text-primary">{currentTime}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            Safety Score: {MOCK_SAFETY_KPIS.averageSafetyScore}
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <FileWarning className="h-4 w-4" />
            Report Incident
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
          <SafetyKPICard 
            title="Total Drivers" 
            value={MOCK_SAFETY_KPIS.totalDrivers} 
            icon={Users}
            trend="2%"
            trendUp={true}
            colorClass="text-blue-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SafetyKPICard 
            title="Expiring Licenses" 
            value={MOCK_SAFETY_KPIS.expiringLicenses} 
            icon={FileWarning}
            colorClass="text-warning-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SafetyKPICard 
            title="Compliance Issues" 
            value={MOCK_SAFETY_KPIS.complianceIssues} 
            icon={ShieldAlert}
            trend="1"
            trendUp={false}
            colorClass="text-danger-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SafetyKPICard 
            title="Training Completion" 
            value={`${MOCK_SAFETY_KPIS.trainingCompletion}%`} 
            icon={Award}
            trend="5%"
            trendUp={true}
            colorClass="text-success-600"
          />
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attention Required</CardTitle>
                <p className="text-sm text-text-muted mt-1">High-priority compliance alerts and incidents.</p>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_ALERTS.map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg shadow-sm border ${
                        alert.severity === 'Critical' 
                          ? 'bg-danger-50 border-danger-100 text-danger-600 dark:bg-danger-900/20 dark:border-danger-800' 
                          : 'bg-warning-50 border-warning-100 text-warning-600 dark:bg-warning-900/20 dark:border-warning-800'
                      }`}>
                        {alert.severity === 'Critical' ? <ShieldAlert className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-text-primary">{alert.title}</span>
                          <span className="text-xs text-text-muted">{new Date(alert.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-text-muted">{alert.description}</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Resolve</Button>
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
              <CardTitle>Today's Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success-500" />
                  <span className="font-medium">Active Drivers</span>
                </div>
                <span className="text-xl font-bold">{MOCK_SAFETY_KPIS.availableDrivers}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning-500" />
                  <span className="font-medium">Suspended</span>
                </div>
                <span className="text-xl font-bold">{MOCK_SAFETY_KPIS.suspendedDrivers}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-5 w-5 text-danger-500" />
                  <span className="font-medium">Expired Licenses</span>
                </div>
                <span className="text-xl font-bold">{MOCK_SAFETY_KPIS.expiredLicenses}</span>
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
                <span>Add Driver</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileCheck className="h-5 w-5" />
                <span>Audits</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileWarning className="h-5 w-5" />
                <span>Incidents</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Activity className="h-5 w-5" />
                <span>Reports</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
