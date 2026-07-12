import * as React from "react"
import { Search, Filter, Calendar as CalendarIcon, Download, Clock, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { MOCK_TRIPS } from "../utils/mockData"
import { TripStatusBadge } from "../components/TripStatusBadge"

export function TripHistory() {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  // Only show completed/cancelled trips in history
  const historyTrips = MOCK_TRIPS.filter(trip => 
    (trip.status === 'Completed' || trip.status === 'Cancelled' || trip.status === 'Delayed') &&
    (trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     trip.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     trip.vehicleReg?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Trip History</h1>
          <p className="text-text-muted mt-1">Review past trips, driver logs, and vehicle dispatch records.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                  <Input 
                    placeholder="ID, Driver, Vehicle..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Last 30 Days</span>
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm">Completed</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm">Cancelled</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm">Delayed</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - History List */}
        <div className="lg:col-span-3 space-y-4">
          {historyTrips.map(trip => (
            <Card key={trip.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-lg">{trip.id}</h3>
                      <TripStatusBadge status={trip.status} />
                      <span className="text-sm text-text-muted flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {new Date(trip.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">Route: </span>
                        <span className="font-medium text-text-primary">
                          {trip.source.address.split(',')[0]} → {trip.destination.address.split(',')[0]}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-muted">Driver: </span>
                        <span className="font-medium text-text-primary">{trip.driverName || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">Vehicle: </span>
                        <span className="font-medium text-text-primary">{trip.vehicleReg || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">Cargo: </span>
                        <span className="font-medium text-text-primary">{trip.cargo.category} ({trip.cargo.weight} lbs)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="ghost" size="sm" className="text-blue-600">Download Log</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {historyTrips.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-text-primary">No history records found</h3>
              <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
