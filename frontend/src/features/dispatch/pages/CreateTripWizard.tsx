import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Save, Navigation, Package, Truck, User, Search, AlertTriangle } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { axiosInstance } from "../../../services/api/axios"

const STEPS = [
  { id: 1, title: 'Trip Info', icon: Navigation },
  { id: 2, title: 'Locations', icon: Search },
  { id: 3, title: 'Cargo', icon: Package },
  { id: 4, title: 'Vehicle', icon: Truck },
  { id: 5, title: 'Driver', icon: User },
  { id: 6, title: 'Review', icon: Check }
]

export function CreateTripWizard() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = React.useState(1)

  const [vehicles, setVehicles] = React.useState<any[]>([])
  const [drivers, setDrivers] = React.useState<any[]>([])
  
  const [formData, setFormData] = React.useState({
    trip_number: `TRP-${Date.now().toString().slice(-6)}`,
    source: '',
    destination: '',
    cargo_weight: '',
    planned_distance: '100', // Default mock distance
    vehicle_id: '',
    driver_id: ''
  })

  React.useEffect(() => {
    const fetchResources = async () => {
      try {
        const [vRes, dRes] = await Promise.all([
          axiosInstance.get('/vehicles'),
          axiosInstance.get('/drivers')
        ])
        setVehicles(vRes.data.data || [])
        setDrivers(dRes.data.data || [])
      } catch (err) {
        console.error("Failed to load resources")
      }
    }
    fetchResources()
  }, [])

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const handleCreateTrip = async () => {
    try {
      if (!formData.source || !formData.destination || !formData.cargo_weight || !formData.vehicle_id || !formData.driver_id) {
        toast.error("Please fill all required fields before dispatching!")
        return;
      }
      
      const payload = {
        ...formData,
        cargo_weight: parseFloat(formData.cargo_weight),
        planned_distance: parseFloat(formData.planned_distance),
        trip_status: 'Dispatched'
      }

      await axiosInstance.post('/trips', payload)
      toast.success("Trip dispatched successfully!")
      navigate('/dispatch/trips')
    } catch (err) {
      toast.error("Failed to dispatch trip")
    }
  }

  const selectedVehicle = vehicles.find(v => v.id === formData.vehicle_id)
  const selectedDriver = drivers.find(d => d.id === formData.driver_id)

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Create New Trip</h1>
          <p className="text-text-muted mt-1">Configure and dispatch a new trip connected to live DB.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/dispatch/trips')} className="gap-2">
            Cancel
          </Button>
        </div>
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 -z-10 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-white dark:bg-gray-900 px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isActive ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 
                    isCompleted ? 'border-blue-500 bg-blue-500 text-white' : 
                    'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs font-medium hidden md:block ${isActive || isCompleted ? 'text-text-primary' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form Area */}
      <Card className="min-h-[400px]">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Trip Number (Auto-generated)</label>
                      <Input value={formData.trip_number} readOnly className="bg-gray-50" />
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Route Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Origin Address *</label>
                      <Input 
                        placeholder="e.g. New York, NY" 
                        value={formData.source}
                        onChange={(e) => setFormData({...formData, source: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Destination Address *</label>
                      <Input 
                        placeholder="e.g. Boston, MA" 
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Cargo Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Total Weight (lbs) *</label>
                      <Input 
                        type="number" 
                        placeholder="5000" 
                        value={formData.cargo_weight}
                        onChange={(e) => setFormData({...formData, cargo_weight: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Planned Distance (miles)</label>
                      <Input 
                        type="number" 
                        value={formData.planned_distance}
                        onChange={(e) => setFormData({...formData, planned_distance: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Vehicle Assignment</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Vehicle from Fleet *</label>
                    <select 
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.vehicle_id}
                      onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})}
                    >
                      <option value="">-- Select a Vehicle --</option>
                      {vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.registration_number} - {v.make} {v.model}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Driver Assignment</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Available Driver *</label>
                    <select 
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.driver_id}
                      onChange={(e) => setFormData({...formData, driver_id: e.target.value})}
                    >
                      <option value="">-- Select a Driver --</option>
                      {drivers.map(d => (
                        <option key={d.id} value={d.id}>{d.driver_name} (License: {d.license_number})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Review & Confirm</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-4">
                    <p className="text-sm text-text-muted">Review trip details before dispatching. This will save directly to the database.</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium text-text-muted">Trip Number:</span> <br/>{formData.trip_number}</div>
                      <div><span className="font-medium text-text-muted">Route:</span> <br/>{formData.source || 'N/A'} &rarr; {formData.destination || 'N/A'}</div>
                      <div><span className="font-medium text-text-muted">Cargo:</span> <br/>{formData.cargo_weight || '0'} lbs</div>
                      <div><span className="font-medium text-text-muted">Distance:</span> <br/>{formData.planned_distance || '0'} miles</div>
                      <div><span className="font-medium text-text-muted">Assigned Vehicle:</span> <br/>{selectedVehicle?.registration_number || 'None Selected'}</div>
                      <div><span className="font-medium text-text-muted">Assigned Driver:</span> <br/>{selectedDriver?.driver_name || 'None Selected'}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            {currentStep < STEPS.length ? (
              <Button onClick={handleNext} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="gap-2 bg-success-600 hover:bg-success-700 text-white" onClick={handleCreateTrip}>
                <Check className="h-4 w-4" /> Confirm & Dispatch
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
