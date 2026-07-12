import * as React from "react"
import { useNavigate } from "react-router-dom"
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader } from "../../../shared/components/ui/card"
import { MOCK_TRIPS } from "../utils/mockData"
import { TripStatusBadge } from "../components/TripStatusBadge"
import { PriorityBadge } from "../components/PriorityBadge"
import { Trip } from "../types"

export function TripManagement() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = React.useState("")
  
  const filteredTrips = MOCK_TRIPS.filter(trip => 
    trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.source.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.destination.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRowClick = (id: string) => {
    navigate(`/dispatch/trips/${id}`)
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Trip Management</h1>
          <p className="text-text-muted mt-1">Manage, filter, and track all active and scheduled trips.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/dispatch/trips/new')}>
            Create Trip
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                <Input 
                  placeholder="Search trips..." 
                  className="pl-9 bg-white dark:bg-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted mr-2">View:</span>
              <Button variant="outline" size="sm" className="gap-1">
                All Active <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-text-primary">
                    Trip ID <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Priority</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Source &rarr; Destination</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Assigned To</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTrips.map((trip: Trip) => (
                <tr 
                  key={trip.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(trip.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-text-primary">{trip.id}</div>
                    <div className="text-xs text-text-muted">{trip.referenceId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TripStatusBadge status={trip.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={trip.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[200px] truncate">
                    <div className="text-text-primary truncate">{trip.source.address.split(',')[0]}</div>
                    <div className="text-xs text-text-muted truncate">to {trip.destination.address.split(',')[0]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-text-primary">{trip.driverName || <span className="text-gray-400 italic">Unassigned</span>}</div>
                    <div className="text-xs text-text-muted">{trip.vehicleReg || ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredTrips.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                    No trips found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-text-muted">
          <div>Showing 1 to {filteredTrips.length} of {filteredTrips.length} entries</div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-gray-100 dark:bg-gray-800">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
