import * as React from "react"
import { Play, Square, Navigation, Fuel, FileText, CheckCircle2, X } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Input } from "../../../shared/components/ui/input"
import { axiosInstance } from "../../../services/api/axios"
import { useAuth } from "../../../shared/contexts/AuthContext"

export function DriverDashboard() {
  const { user } = useAuth()
  const [trips, setTrips] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showFuelModal, setShowFuelModal] = React.useState(false)
  const [activeTrip, setActiveTrip] = React.useState<any>(null)
  
  const [fuelData, setFuelData] = React.useState({
    liters: '',
    cost: '',
    station_name: '',
    odometer_reading: ''
  })

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get('/trips')
      // Wait, we need to filter by current driver!
      // In a real app we'd fetch driver by user ID, but we can just filter where driver_id has user_id
      const driverRes = await axiosInstance.get('/drivers')
      const myDriverRecord = driverRes.data.data.find((d: any) => d.user_id === user?.id)
      
      if(myDriverRecord) {
         const myTrips = res.data.data.filter((t: any) => t.driver_id === myDriverRecord.id)
         setTrips(myTrips)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchTrips()
  }, [])

  const updateTripStatus = async (tripId: string, status: string) => {
    try {
      await axiosInstance.put(`/trips/${tripId}/status`, { status })
      toast.success(`Trip status updated to ${status}`)
      fetchTrips()
    } catch (error) {
      toast.error('Failed to update trip status')
    }
  }

  const handleFuelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if(!activeTrip) return;
      await axiosInstance.post('/fuel', {
        vehicle_id: activeTrip.vehicle_id,
        driver_id: activeTrip.driver_id,
        liters: fuelData.liters,
        cost: fuelData.cost,
        station_name: fuelData.station_name,
        odometer_reading: fuelData.odometer_reading,
        filled_date: new Date()
      })
      toast.success('Fuel entry recorded successfully')
      setShowFuelModal(false)
      setFuelData({ liters: '', cost: '', station_name: '', odometer_reading: '' })
    } catch(err) {
      toast.error('Failed to record fuel entry')
    }
  }

  const currentTrips = trips.filter(t => t.status === 'Dispatched' || t.status === 'In Progress')
  const completedTrips = trips.filter(t => t.status === 'Completed')

  return (
    <div className="space-y-6 pb-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Driver Dashboard</h1>
          <p className="text-text-muted mt-1">Manage your active routes and log expenses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <p className="text-center py-8 text-text-muted">Loading your trips...</p>
                ) : currentTrips.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    <CheckCircle2 className="h-12 w-12 text-success-500 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-text-primary">You're all caught up!</h3>
                    <p className="text-text-muted">No active trips assigned to you.</p>
                  </div>
                ) : currentTrips.map(trip => (
                  <div key={trip.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{trip.route_name || trip.destination}</h4>
                        <p className="text-sm text-text-muted flex items-center gap-2 mt-1">
                          <Navigation className="w-4 h-4" /> 
                          {trip.origin} → {trip.destination}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        trip.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-warning-100 text-warning-700'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      {trip.status === 'Dispatched' ? (
                        <Button className="bg-success-600 hover:bg-success-700 text-white gap-2" onClick={() => updateTripStatus(trip.id, 'In Progress')}>
                          <Play className="w-4 h-4" /> Start Trip
                        </Button>
                      ) : (
                        <Button className="bg-danger-600 hover:bg-danger-700 text-white gap-2" onClick={() => updateTripStatus(trip.id, 'Completed')}>
                          <Square className="w-4 h-4" /> End Trip
                        </Button>
                      )}
                      
                      <Button variant="outline" className="gap-2" onClick={() => { setActiveTrip(trip); setShowFuelModal(true); }}>
                        <Fuel className="w-4 h-4" /> Log Fuel
                      </Button>
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
              <CardTitle>Trip History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedTrips.length === 0 ? (
                  <p className="text-sm text-text-muted text-center py-4">No completed trips yet.</p>
                ) : completedTrips.map(trip => (
                  <div key={trip.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-text-primary">{trip.destination}</p>
                      <p className="text-xs text-text-muted">{new Date(trip.updated_at || trip.created_at).toLocaleDateString()}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-success-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fuel Entry Modal */}
      {showFuelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-bg-base rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <button onClick={() => setShowFuelModal(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Log Fuel Expense</h2>
            <form onSubmit={handleFuelSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Station Name</label>
                <Input required value={fuelData.station_name} onChange={e => setFuelData({...fuelData, station_name: e.target.value})} placeholder="e.g., Shell, Pilot Travel" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Liters Filled</label>
                  <Input required type="number" step="0.01" value={fuelData.liters} onChange={e => setFuelData({...fuelData, liters: e.target.value})} placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Total Cost ($)</label>
                  <Input required type="number" step="0.01" value={fuelData.cost} onChange={e => setFuelData({...fuelData, cost: e.target.value})} placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Odometer Reading</label>
                <Input required type="number" value={fuelData.odometer_reading} onChange={e => setFuelData({...fuelData, odometer_reading: e.target.value})} placeholder="Current mileage" />
              </div>
              <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">Save Fuel Log</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
