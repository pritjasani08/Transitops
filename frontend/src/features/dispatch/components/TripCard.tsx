import * as React from "react"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { Trip } from "../types"
import { TripStatusBadge } from "./TripStatusBadge"
import { PriorityBadge } from "./PriorityBadge"
import { MapPin, User, Truck, Clock } from "lucide-react"

interface TripCardProps {
  trip: Trip;
  onClick?: (trip: Trip) => void;
}

export function TripCard({ trip, onClick }: TripCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all active:scale-[0.98]"
      onClick={() => onClick?.(trip)}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-text-primary text-sm">{trip.id}</span>
          <PriorityBadge priority={trip.priority} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm text-text-muted">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-1 w-full">
              <span className="truncate">{trip.source.address.split(',')[0]}</span>
              <span className="text-xs text-gray-400">↓</span>
              <span className="truncate">{trip.destination.address.split(',')[0]}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-text-muted pt-2 border-t border-gray-100 dark:border-gray-800">
            {trip.driverName ? (
              <div className="flex items-center gap-1" title="Assigned Driver">
                <User className="h-3 w-3" />
                <span className="truncate max-w-[80px]">{trip.driverName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-warning-600" title="Unassigned Driver">
                <User className="h-3 w-3" />
                <span>Unassigned</span>
              </div>
            )}
            
            {trip.vehicleReg ? (
              <div className="flex items-center gap-1" title="Assigned Vehicle">
                <Truck className="h-3 w-3" />
                <span>{trip.vehicleReg}</span>
              </div>
            ) : (
               <div className="flex items-center gap-1 text-warning-600" title="Unassigned Vehicle">
                <Truck className="h-3 w-3" />
                <span>Unassigned</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
