import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TripStatus } from "../types"
import { MOCK_TRIPS } from "../utils/mockData"
import { TripCard } from "../components/TripCard"
import { Button } from "../../../shared/components/ui/button"
import { Filter, Plus } from "lucide-react"

const COLUMNS: TripStatus[] = ['Draft', 'Ready', 'Dispatched', 'On Route', 'Completed']

export function DispatchQueue() {
  // In a real app, this would use react-beautiful-dnd or dnd-kit
  // For visual representation, we're mapping state to columns directly
  
  return (
    <div className="h-full flex flex-col space-y-4 pb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Live Dispatch Board</h1>
          <p className="text-text-muted mt-1">Manage and track trips across all stages.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            New Trip
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {COLUMNS.map(column => {
            const columnTrips = MOCK_TRIPS.filter(t => t.status === column);
            
            return (
              <div key={column} className="w-80 flex flex-col h-full max-h-[calc(100vh-220px)] bg-gray-50/50 dark:bg-gray-900/20 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
                  <h3 className="font-semibold text-text-primary">{column}</h3>
                  <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                    {columnTrips.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <AnimatePresence>
                    {columnTrips.map(trip => (
                      <motion.div
                        key={trip.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <TripCard trip={trip} />
                      </motion.div>
                    ))}
                    {columnTrips.length === 0 && (
                      <div className="h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-sm text-text-muted">
                        Drop items here
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
