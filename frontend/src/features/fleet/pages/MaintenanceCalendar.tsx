import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"

export function MaintenanceCalendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // Mock 35 days for a calendar grid

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Maintenance Calendar</h1>
          <p className="text-text-muted mt-1">Schedule and view upcoming service tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Schedule Service
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">October 2023</h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-700 shadow-sm text-text-primary">Month</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-text-muted hover:text-text-primary">Week</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-text-muted hover:text-text-primary">Agenda</button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            {days.map(day => (
              <div key={day} className="py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-[120px] divide-y divide-x divide-gray-100 dark:divide-gray-800">
            {dates.map((date, i) => {
              const isCurrentMonth = date > 0 && date <= 31;
              const isToday = date === 15;
              return (
                <div key={i} className={`p-2 relative ${!isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900/20' : ''}`}>
                  <span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${isToday ? 'bg-primary text-white font-bold' : isCurrentMonth ? 'text-text-primary font-medium' : 'text-gray-400'}`}>
                    {date > 0 ? (date > 31 ? date - 31 : date) : 30 + date}
                  </span>
                  
                  {/* Mock Events */}
                  {date === 12 && (
                    <div className="mt-1 px-2 py-1 text-xs rounded border border-warning-200 bg-warning-50 text-warning-700 truncate cursor-pointer hover:bg-warning-100 transition-colors">
                      MH-12: Oil Change
                    </div>
                  )}
                  {date === 15 && (
                    <div className="mt-1 px-2 py-1 text-xs rounded border border-primary/20 bg-primary/10 text-primary truncate cursor-pointer hover:bg-primary/20 transition-colors">
                      NY-05: Inspection
                    </div>
                  )}
                  {date === 18 && (
                    <div className="mt-1 px-2 py-1 text-xs rounded border border-danger-200 bg-danger-50 text-danger-700 truncate cursor-pointer hover:bg-danger-100 transition-colors">
                      CA-01: Brake Repair
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
