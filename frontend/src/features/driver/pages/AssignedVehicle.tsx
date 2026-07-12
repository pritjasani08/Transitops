import * as React from "react"
import { Car, Fuel, Wrench, ShieldCheck, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import { axiosInstance } from "../../../services/api/axios"
import { useAuth } from "../../../shared/contexts/AuthContext"

export function AssignedVehicle() {
  const { user } = useAuth()
  const [vehicle, setVehicle] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchAssignedVehicle = async () => {
      try {
        setLoading(true)
        // Find current driver's active trip
        const [driverRes, tripsRes] = await Promise.all([
          axiosInstance.get('/drivers'),
          axiosInstance.get('/trips')
        ])
        
        const myDriverRecord = driverRes.data.data.find((d: any) => d.user_id === user?.id)
        if (myDriverRecord) {
          const myActiveTrip = tripsRes.data.data.find((t: any) => t.driver_id === myDriverRecord.id && (t.status === 'Dispatched' || t.status === 'In Progress'))
          
          if (myActiveTrip && myActiveTrip.vehicle_id) {
            const vehicleRes = await axiosInstance.get(`/vehicles/${myActiveTrip.vehicle_id}`)
            setVehicle(vehicleRes.data.data)
          }
        }
      } catch (error) {
        console.error("Error fetching assigned vehicle", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAssignedVehicle()
  }, [user])

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading assigned vehicle details...</div>
  }

  if (!vehicle) {
    return (
      <div className="space-y-6 pb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Assigned Vehicle</h1>
          <p className="text-text-muted mt-1">Vehicle details for your current trip.</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Car className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-medium text-text-primary">No Active Assignment</h3>
            <p className="text-text-muted text-center mt-2 max-w-sm">
              You do not have a vehicle assigned right now because you are not on an active trip. Wait for dispatch to assign a new route.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Assigned Vehicle</h1>
        <p className="text-text-muted mt-1">Details and telematics for {vehicle.registration_number}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{vehicle.make} {vehicle.model} ({vehicle.year})</CardTitle>
                  <p className="text-text-muted">{vehicle.registration_number} • {vehicle.type}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-xs">
                  {vehicle.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-xs text-text-muted mb-1">Odometer</p>
                  <p className="font-semibold text-lg">{vehicle.odometer} km</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Fuel Type</p>
                  <p className="font-semibold text-lg capitalize">{vehicle.fuel_type}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Load Cap.</p>
                  <p className="font-semibold text-lg">{vehicle.maximum_load_capacity} kg</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Efficiency</p>
                  <p className="font-semibold text-lg">{vehicle.fuel_efficiency_standard} MPG</p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                 <Button variant="outline" className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-900/30 dark:hover:bg-blue-900/10">
                   <Wrench className="h-4 w-4" /> Report Issue
                 </Button>
                 <Button variant="outline" className="gap-2">
                   <ShieldCheck className="h-4 w-4" /> View Documents
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-warning-500" /> Fuel Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Estimated Fuel Level</span>
                    <span className="text-warning-600 font-bold">~65%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-warning-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-text-muted mt-2">
                  Please log fuel manually when refilling using the Log Fuel button on your active trip.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-danger-600">
                <AlertCircle className="h-5 w-5" /> Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.insurance_expiry && new Date(vehicle.insurance_expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
                 <div className="p-3 bg-danger-50 dark:bg-danger-900/20 text-danger-700 text-sm rounded-lg border border-danger-100 dark:border-danger-800/30">
                   <strong>Notice:</strong> Vehicle insurance expires on {new Date(vehicle.insurance_expiry).toLocaleDateString()}. Please notify Fleet Manager.
                 </div>
              ) : (
                <p className="text-sm text-text-muted">No active alerts for this vehicle. Good to go!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
