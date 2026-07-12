import * as React from "react"
import { motion } from "framer-motion"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Wrench, 
  Activity,
  FileText,
  Clock,
  MoreHorizontal
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"

export function VehicleDetails() {
  const { id } = useParams();

  // Mock data for this specific vehicle
  const vehicle = { 
    id: id || "1", 
    registration: "MH-12-AB-1234", 
    make: "Volvo", 
    model: "FH16", 
    year: 2022, 
    type: "Heavy Truck", 
    status: "Available", 
    odometer: 45000, 
    healthScore: 92, 
    lastService: "2023-10-15", 
    nextService: "2024-04-15",
    vin: "1VUHBAEX4KH123456",
    engineType: "D16K600",
    fuelCapacity: 800,
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back & Breadcrumb */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/fleet/registry">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="text-sm font-medium text-text-muted">
          <Link to="/fleet/registry" className="hover:text-text-primary transition-colors">Vehicle Registry</Link> 
          <span className="mx-2">/</span> 
          <span className="text-text-primary font-mono">{vehicle.registration}</span>
        </div>
      </div>

      {/* Hero Profile */}
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 h-64 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-6 border-r border-gray-100 dark:border-gray-800">
            <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-2xl shadow-sm mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
              {/* Placeholder for truck image */}
              <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-8.5 1.5l1.96 2.5H1.5V6h10v3.5zm-5.5 11c-.83 0-1.5-.67-1.5-1.5S5.17 17 6 17s1.5.67 1.5 1.5S6.83 20.5 6 20.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <div className="bg-white dark:bg-gray-950 border-2 border-gray-300 dark:border-gray-700 rounded-md px-4 py-1.5 font-mono font-bold text-lg shadow-sm">
              {vehicle.registration}
            </div>
          </div>
          <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">{vehicle.make} {vehicle.model}</h1>
                  <p className="text-text-muted">{vehicle.year} • {vehicle.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="text-sm px-3 py-1">{vehicle.status}</Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm font-mono text-text-muted mb-6">VIN: {vehicle.vin}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Odometer</p>
                  <p className="font-mono font-semibold">{vehicle.odometer.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Health Score</p>
                  <p className="font-mono font-semibold text-secondary-500">{vehicle.healthScore}/100</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Engine</p>
                  <p className="font-semibold">{vehicle.engineType}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Fuel Cap.</p>
                  <p className="font-semibold">{vehicle.fuelCapacity}L</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <Button className="flex-1 md:flex-none">Assign Trip</Button>
              <Button variant="outline" className="flex-1 md:flex-none">Schedule Maintenance</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
                {/* Timeline Item 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-surface-100 shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-semibold text-text-primary text-sm">Trip Completed</div>
                      <time className="font-mono text-xs text-text-muted">Today, 10:45 AM</time>
                    </div>
                    <div className="text-sm text-text-muted">Delivered cargo to Warehouse B, Chicago.</div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 text-text-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-surface-100 shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-semibold text-text-primary text-sm">Routine Maintenance</div>
                      <time className="font-mono text-xs text-text-muted">Oct 15, 2023</time>
                    </div>
                    <div className="text-sm text-text-muted">Oil change, brake inspection, tire rotation.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-sm">
                    <Wrench className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium">Last Service</p>
                    <p className="font-mono text-sm">{vehicle.lastService}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning-500/10 border border-warning-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-sm">
                    <Calendar className="h-4 w-4 text-warning-500" />
                  </div>
                  <div>
                    <p className="text-xs text-warning-600 dark:text-warning-500 font-medium">Next Service Due</p>
                    <p className="font-mono text-sm font-semibold text-warning-700 dark:text-warning-400">{vehicle.nextService}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documents</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-primary">View All</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Registration Certificate", expiry: "Valid", type: "success" },
                { name: "Insurance Policy", expiry: "Expiring soon", type: "warning" },
                { name: "Permit", expiry: "Valid", type: "success" }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">{doc.name}</span>
                  </div>
                  <Badge variant={doc.type as any}>{doc.expiry}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
