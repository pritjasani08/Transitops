import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Save, Navigation, Package, Truck, User, Search, AlertTriangle } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"

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

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Create New Trip</h1>
          <p className="text-text-muted mt-1">Configure and dispatch a new trip.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/dispatch/trips')} className="gap-2">
            Cancel
          </Button>
          <Button variant="secondary" className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
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
                      <label className="text-sm font-medium">Reference ID (e.g. Order Number)</label>
                      <Input placeholder="ORD-XXXXX" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Route Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Origin Address</label>
                      <Input placeholder="Enter pickup location" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Destination Address</label>
                      <Input placeholder="Enter delivery location" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Scheduled Pickup Time</label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expected Delivery Time</label>
                      <Input type="datetime-local" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Cargo Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Total Weight (lbs)</label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cargo Category</label>
                      <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>General Freight</option>
                        <option>Refrigerated</option>
                        <option>Electronics</option>
                        <option>Fragile</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-warning-50 border border-warning-200 rounded-lg text-warning-800">
                    <input type="checkbox" id="hazmat" className="rounded text-warning-600 focus:ring-warning-500" />
                    <label htmlFor="hazmat" className="text-sm font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> This cargo contains hazardous materials (HAZMAT)
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Vehicle Assignment</h3>
                  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center min-h-[150px] text-center">
                    <Truck className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-text-primary">No vehicle selected</p>
                    <p className="text-xs text-text-muted mt-1">Select from available vehicles matching cargo requirements.</p>
                    <Button variant="outline" size="sm" className="mt-4">Browse Vehicles</Button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Driver Assignment</h3>
                  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center min-h-[150px] text-center">
                    <User className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-text-primary">No driver assigned</p>
                    <p className="text-xs text-text-muted mt-1">Select an available driver with required endorsements.</p>
                    <Button variant="outline" size="sm" className="mt-4">Browse Drivers</Button>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Review & Confirm</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-3">
                    <p className="text-sm text-text-muted">Review trip details before dispatching. You can save as draft or dispatch immediately.</p>
                    {/* Summary fields would go here */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Priority:</span> High</div>
                      <div><span className="font-medium">Cargo:</span> Electronics (5000 lbs)</div>
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
              <Button className="gap-2 bg-success-600 hover:bg-success-700 text-white" onClick={() => navigate('/dispatch/trips')}>
                <Check className="h-4 w-4" /> Confirm & Dispatch
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
