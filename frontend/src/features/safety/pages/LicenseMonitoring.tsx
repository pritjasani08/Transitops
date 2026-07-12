import * as React from "react"
import { Calendar, Search, Filter, AlertTriangle, CheckCircle2, FileWarning } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { MOCK_DRIVERS, MOCK_SAFETY_KPIS } from "../utils/mockData"
import { LicenseStatusBadge } from "../components/StatusBadges"

export function LicenseMonitoring() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const licenseData = MOCK_DRIVERS.map(driver => ({
    driverId: driver.id,
    driverName: driver.name,
    license: driver.license
  })).filter(item => 
    item.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.license.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">License Monitoring</h1>
          <p className="text-text-muted mt-1">Track CDL expirations, renewals, and endorsements.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Expiry Calendar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-success-50 dark:bg-success-900/10 border-success-100 dark:border-success-800/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success-100 text-success-700 dark:bg-success-800 dark:text-success-300">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-700 dark:text-success-400">Valid Licenses</p>
                <h3 className="text-2xl font-bold text-success-900 dark:text-success-100">
                  {MOCK_SAFETY_KPIS.availableDrivers}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-warning-50 dark:bg-warning-900/10 border-warning-100 dark:border-warning-800/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning-100 text-warning-700 dark:bg-warning-800 dark:text-warning-300">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-warning-700 dark:text-warning-400">Expiring &lt; 30 Days</p>
                <h3 className="text-2xl font-bold text-warning-900 dark:text-warning-100">
                  {MOCK_SAFETY_KPIS.expiringLicenses}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-danger-50 dark:bg-danger-900/10 border-danger-100 dark:border-danger-800/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-danger-100 text-danger-700 dark:bg-danger-800 dark:text-danger-300">
                <FileWarning className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-danger-700 dark:text-danger-400">Expired / Suspended</p>
                <h3 className="text-2xl font-bold text-danger-900 dark:text-danger-100">
                  {MOCK_SAFETY_KPIS.expiredLicenses + MOCK_SAFETY_KPIS.suspendedDrivers}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>License Registry</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search by driver or license..."
                  className="pl-9 bg-gray-50 dark:bg-gray-900 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-gray-50/50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Driver</th>
                  <th className="px-6 py-4 font-medium">License #</th>
                  <th className="px-6 py-4 font-medium">Class/Type</th>
                  <th className="px-6 py-4 font-medium">State</th>
                  <th className="px-6 py-4 font-medium">Expiry Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {licenseData.map(item => (
                  <tr key={item.driverId} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">{item.driverName}</td>
                    <td className="px-6 py-4 font-mono text-text-muted">{item.license.number}</td>
                    <td className="px-6 py-4">{item.license.type}</td>
                    <td className="px-6 py-4">{item.license.state}</td>
                    <td className="px-6 py-4">{new Date(item.license.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <LicenseStatusBadge status={item.license.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="sm" className="text-blue-600">Review</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {licenseData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-muted">No licenses found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
