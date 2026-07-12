import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader } from "../../../shared/components/ui/card"
import { axiosInstance } from "../../../services/api/axios"

export function MaintenanceCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [loading, setLoading] = React.useState(true)
  const [events, setEvents] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        setLoading(true)
        const [mRes, vRes] = await Promise.all([
          axiosInstance.get('/maintenance'),
          axiosInstance.get('/vehicles')
        ])
        
        const maintenance = mRes.data.data || []
        const vehicles = vRes.data.data || []

        const enrichedEvents = maintenance.map((m: any) => {
          const vehicle = vehicles.find((v: any) => v.id === m.vehicle_id)
          return {
            ...m,
            vehicleReg: vehicle ? vehicle.registration_number : 'Unknown Vehicle',
            dateObj: new Date(m.scheduled_date || m.created_at)
          }
        })
        
        setEvents(enrichedEvents)
      } catch (err) {
        console.error("Failed to fetch maintenance", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMaintenance()
  }, [])

  // Calendar logic
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() // 0-11
  
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay() // 0-6 (Sun-Sat)
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' })

  // Build the grid array (padding previous month days if needed)
  const dates = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevMonthDays = new Date(year, month, 0).getDate()
    dates.push({
      dateNum: prevMonthDays - firstDayOfMonth + i + 1,
      isCurrentMonth: false,
      dateObj: new Date(year, month - 1, prevMonthDays - firstDayOfMonth + i + 1)
    })
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      dateNum: i,
      isCurrentMonth: true,
      dateObj: new Date(year, month, i)
    })
  }

  // Pad the rest to fill out the last row (up to 35 or 42 cells)
  const remainingCells = dates.length % 7 === 0 ? 0 : 7 - (dates.length % 7)
  for (let i = 1; i <= remainingCells; i++) {
    dates.push({
      dateNum: i,
      isCurrentMonth: false,
      dateObj: new Date(year, month + 1, i)
    })
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Maintenance Calendar</h1>
          <p className="text-text-muted mt-1">Live schedule and upcoming service tasks from Database.</p>
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
            <h2 className="text-lg font-semibold">{monthName} {year}</h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
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
            {daysOfWeek.map(day => (
              <div key={day} className="py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-text-muted">Loading live calendar events...</div>
          ) : (
            <div className="grid grid-cols-7 auto-rows-[120px] divide-y divide-x divide-gray-100 dark:divide-gray-800">
              {dates.map((dInfo, i) => {
                const isToday = dInfo.isCurrentMonth && dInfo.dateNum === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                
                // Find events for this specific date
                const dayEvents = events.filter(e => 
                  e.dateObj.getDate() === dInfo.dateObj.getDate() &&
                  e.dateObj.getMonth() === dInfo.dateObj.getMonth() &&
                  e.dateObj.getFullYear() === dInfo.dateObj.getFullYear()
                )

                return (
                  <div key={i} className={`p-2 relative overflow-y-auto ${!dInfo.isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900/20' : ''}`}>
                    <span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${isToday ? 'bg-primary text-white font-bold' : dInfo.isCurrentMonth ? 'text-text-primary font-medium' : 'text-gray-400'}`}>
                      {dInfo.dateNum}
                    </span>
                    
                    <div className="mt-1 flex flex-col gap-1">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id} 
                          title={event.description || event.service_type}
                          className={`px-2 py-1 text-xs rounded border truncate cursor-pointer transition-colors ${
                            event.status === 'Completed' 
                              ? 'border-success-200 bg-success-50 text-success-700 hover:bg-success-100'
                              : event.status === 'Cancelled'
                              ? 'border-danger-200 bg-danger-50 text-danger-700 hover:bg-danger-100'
                              : 'border-warning-200 bg-warning-50 text-warning-700 hover:bg-warning-100'
                          }`}
                        >
                          {event.vehicleReg}: {event.service_type}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
