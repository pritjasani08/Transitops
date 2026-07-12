import * as React from "react"
import { Search, Filter, Download, MoreVertical, Plus } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { MOCK_DRIVERS } from "../utils/mockData"
import { DriverStatusBadge, LicenseStatusBadge } from "../components/StatusBadges"
import { SafetyScoreRing } from "../components/SafetyScoreRing"

export function DriverDirectory() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredDrivers = MOCK_DRIVERS.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Driver Directory</h1>
          <p className="text-text-muted mt-1">Manage and monitor all enterprise fleet drivers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Directory Table Card */}
      <Card>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>All Drivers</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search drivers..."
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
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">License Info</th>
                  <th className="px-6 py-4 font-medium">Safety Score</th>
                  <th className="px-6 py-4 font-medium">Training</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredDrivers.map(driver => (
                  <tr key={driver.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 font-bold">
                          {driver.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{driver.name}</p>
                          <p className="text-xs text-text-muted">{driver.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <DriverStatusBadge status={driver.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="font-medium text-text-primary">{driver.license.number}</p>
                        <LicenseStatusBadge status={driver.license.status} className="text-[10px] px-1.5 py-0" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                         <SafetyScoreRing score={driver.safetyScore} size={40} strokeWidth={4} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${driver.trainingCompletion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-muted mt-1 inline-block">{driver.trainingCompletion}% Completed</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredDrivers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-muted">No drivers found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
