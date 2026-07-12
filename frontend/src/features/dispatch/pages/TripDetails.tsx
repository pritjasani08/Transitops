import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Truck, 
  Package, 
  Clock, 
  Calendar,
  Phone,
  FileText,
  Activity,
  MoreVertical,
  Check
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { TripStatusBadge } from "../components/TripStatusBadge"
import { PriorityBadge } from "../components/PriorityBadge"
import { MOCK_TRIPS } from "../utils/mockData"

export function TripDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // In real app, fetch trip by id
  const trip = MOCK_TRIPS.find(t => t.id === id) || MOCK_TRIPS[0]

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-text-primary">{trip.id}</h1>
              <TripStatusBadge status={trip.status} />
              <PriorityBadge priority={trip.priority} />
            </div>
            <p className="text-text-muted mt-1">Ref: {trip.referenceId} • Created {new Date(trip.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> Documents
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            Update Status
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Route Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex flex-col items-center gap-2 pt-1">
                  <div className="h-4 w-4 rounded-full border-2 border-blue-500 bg-white"></div>
                  <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-4 w-4 rounded-full border-2 border-success-500 bg-white"></div>
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Origin</p>
                    <p className="text-text-muted mt-1">{trip.source.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Destination</p>
                    <p className="text-text-muted mt-1">{trip.destination.address}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="flex items-center justify-end gap-1 text-text-muted mb-1">
                    <Clock className="h-4 w-4" /> 8 hrs 30 mins
                  </div>
                  <div className="flex items-center justify-end gap-1 text-text-muted">
                    <MapPin className="h-4 w-4" /> 450 miles
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cargo Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Cargo Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-text-muted">Category</span>
                  <span className="font-medium">{trip.cargo.category}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-text-muted">Weight</span>
                  <span className="font-medium">{trip.cargo.weight} lbs</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-text-muted">Hazmat</span>
                  <span className="font-medium">{trip.cargo.hazmat ? 'Yes' : 'No'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Assignments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{trip.driverName || 'Unassigned'}</p>
                    <p className="text-xs text-text-muted">Driver</p>
                  </div>
                  {trip.driverName && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted"><Phone className="h-4 w-4" /></Button>
                  )}
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{trip.vehicleReg || 'Unassigned'}</p>
                    <p className="text-xs text-text-muted">Vehicle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" /> Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                 {/* Timeline item */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Trip Created</div>
                            <time className="text-xs font-medium text-blue-500">2 hrs ago</time>
                        </div>
                        <div className="text-sm text-slate-500">Trip information entered into the system.</div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Dispatched</div>
                            <time className="text-xs font-medium text-blue-500">1 hr ago</time>
                        </div>
                        <div className="text-sm text-slate-500">Driver and vehicle assigned.</div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Clock className="h-4 w-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm opacity-60">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-500">In Transit</div>
                            <time className="text-xs font-medium text-slate-400">Pending</time>
                        </div>
                        <div className="text-sm text-slate-500">En route to destination.</div>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
