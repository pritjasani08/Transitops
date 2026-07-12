import * as React from "react"
import { MapPin, Navigation, Clock, AlertTriangle, Route } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { Input } from "../../../shared/components/ui/input"

export function RoutePlanner() {
  return (
    <div className="h-full flex flex-col md:flex-row gap-6 pb-8">
      {/* Sidebar - Route Config */}
      <div className="w-full md:w-96 flex flex-col gap-6 shrink-0 h-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Route Planner</h1>
          <p className="text-text-muted mt-1">Plan, optimize, and preview dispatch routes.</p>
        </div>

        <Card className="flex-1 overflow-y-auto">
          <CardContent className="p-4 space-y-6">
            <div className="space-y-4 relative">
              <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              <div className="relative pl-10 space-y-2">
                <div className="absolute left-[-1px] top-3 w-4 h-4 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
                <label className="text-xs font-semibold text-text-muted uppercase">Origin</label>
                <Input defaultValue="Warehouse B, Chicago, IL" />
              </div>

              <div className="relative pl-10 space-y-2">
                <div className="absolute left-[-1px] top-3 w-4 h-4 rounded-full border-2 border-success-500 bg-white dark:bg-gray-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-success-500"></div>
                </div>
                <label className="text-xs font-semibold text-text-muted uppercase">Destination</label>
                <Input defaultValue="Retail Hub, Detroit, MI" />
              </div>
              
              <div className="pl-10 pt-2">
                <Button variant="outline" size="sm" className="w-full gap-2 border-dashed">
                  <MapPin className="h-4 w-4" /> Add Stop
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <h3 className="font-medium text-text-primary">Route Suggestions</h3>
              
              {/* Route Option 1 */}
              <div className="p-3 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/10 cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">FASTEST</div>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-blue-900 dark:text-blue-100">Via I-94 E</div>
                  <div className="text-blue-900 dark:text-blue-100 font-bold">4h 15m</div>
                </div>
                <div className="flex items-center gap-4 text-sm text-blue-700 dark:text-blue-300">
                  <span className="flex items-center gap-1"><Route className="h-3 w-3" /> 283 mi</span>
                  <span className="flex items-center gap-1 text-warning-600"><AlertTriangle className="h-3 w-3" /> Light Traffic</span>
                </div>
              </div>

              {/* Route Option 2 */}
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-text-primary">Via US-12 E & I-94 E</div>
                  <div className="font-medium text-text-primary">4h 45m</div>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1"><Route className="h-3 w-3" /> 290 mi</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> No Tolls</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Navigation className="h-4 w-4" /> Start Navigation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Map Area */}
      <div className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-blue-50/30 dark:bg-slate-900/30 relative overflow-hidden flex items-center justify-center min-h-[400px]">
        {/* Placeholder for actual map */}
        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=42.3,-83.5&zoom=7&size=800x800&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0xcbe7f3&style=feature:landscape|element:geometry|color:0xfafbfc&style=feature:road|element:geometry|color:0xffffff&style=feature:road|element:geometry.stroke|color:0xe5e7eb&client=gme-google&signature=placeholder')] bg-cover bg-center opacity-40 mix-blend-multiply dark:mix-blend-screen grayscale dark:grayscale-0 dark:opacity-20 pointer-events-none"></div>
        
        {/* Simulated Route Path SVG */}
        <svg className="absolute inset-0 w-full h-full drop-shadow-md pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 20 80 Q 40 40 80 20" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" className="animate-[dash_20s_linear_infinite]" />
            <circle cx="20" cy="80" r="1.5" fill="#3b82f6" />
            <circle cx="80" cy="20" r="1.5" fill="#22c55e" />
        </svg>

        <div className="relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-lg max-w-sm mx-4">
          <MapPin className="h-10 w-10 text-blue-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-text-primary mb-1">Live Map Integration</h3>
          <p className="text-sm text-text-muted">
            In production, this area will render the interactive Google Maps Platform or Mapbox GL JS instance with real-time routing, traffic overlays, and vehicle telemetry.
          </p>
        </div>
      </div>
    </div>
  )
}
