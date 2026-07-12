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
import { TripStatusBadge } from "../components/TripStatusBadge"
import { PriorityBadge } from "../components/PriorityBadge"
import { axiosInstance } from "../../../services/api/axios"

export function TripManagement() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [trips, setTrips] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [tripsRes, driversRes, vehiclesRes] = await Promise.all([
          axiosInstance.get('/trips'),
          axiosInstance.get('/drivers'),
          axiosInstance.get('/vehicles')
        ]);
        
        const tripData = tripsRes.data.data || [];
        const drivers = driversRes.data.data || [];
        const vehicles = vehiclesRes.data.data || [];

        const enrichedTrips = tripData.map((t: any) => {
          const d = drivers.find((dr: any) => dr.id === t.driver_id);
          const v = vehicles.find((ve: any) => ve.id === t.vehicle_id);
          return {
            ...t,
            driverName: d ? d.driver_name : 'Unassigned',
            vehicleReg: v ? v.registration_number : 'Unknown'
          };
        });

        setTrips(enrichedTrips);
      } catch (e) {
        console.error('Failed to fetch trips', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])
  
  const filteredTrips = trips.filter(trip => 
    trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trip.trip_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trip.source || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trip.destination || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Trip Management</h1>
          <p className="text-text-muted mt-1">Live data from Database: Manage and track all active trips.</p>
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
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Trip ID</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Priority</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Source &rarr; Destination</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Assigned To</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">Loading live trips...</td>
                </tr>
              ) : filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted text-lg">No data found in database. Create a trip to see it here.</td>
                </tr>
              ) : filteredTrips.map((trip: any) => (
                <tr 
                  key={trip.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/dispatch/trips/${trip.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-text-primary">{trip.trip_number || trip.id.substring(0,8)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TripStatusBadge status={trip.trip_status || 'Draft'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority="Medium" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[200px] truncate">
                    <div className="text-text-primary truncate">{trip.source}</div>
                    <div className="text-xs text-text-muted truncate">to {trip.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-text-primary">{trip.driverName}</div>
                    <div className="text-xs text-text-muted">{trip.vehicleReg}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
