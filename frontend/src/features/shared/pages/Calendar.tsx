import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter, LayoutGrid, List } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"

export function Calendar() {
  const [view, setView] = React.useState<'month' | 'week' | 'agenda'>('month')

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  // Generating a simple mockup grid for current month
  const generateGrid = () => {
    const grid = []
    let dayCounter = 1
    for (let i = 0; i < 5; i++) {
       const week = []
       for (let j = 0; j < 7; j++) {
         // Mock events
         let events = []
         if (dayCounter === 5) events.push({ title: "V-101 Maintenance", type: "maintenance", color: "bg-red-500" })
         if (dayCounter === 12) events.push({ title: "JDoe License Expiry", type: "safety", color: "bg-orange-500" })
         if (dayCounter === 15) events.push({ title: "TRP-9002 Departure", type: "trip", color: "bg-blue-500" })
         if (dayCounter === 28) events.push({ title: "Fleet Ins. Renewal", type: "finance", color: "bg-purple-500" })

         week.push({ day: dayCounter > 31 ? null : dayCounter, events })
         dayCounter++
       }
       grid.push(week)
    }
    return grid
  }

  const grid = generateGrid()

  return (
    <div className="space-y-6 pb-8 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Enterprise Calendar</h1>
          <p className="text-text-muted mt-1">Unified view of trips, maintenance schedules, and expiring documents.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
             <Filter className="h-4 w-4" /> Filter Events
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" /> Add Event
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
         {/* Calendar Toolbar */}
         <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1">
                 <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                 <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
               </div>
               <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">October 2023</h2>
            </div>
            <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
               <button onClick={() => setView('month')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'month' ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Month</button>
               <button onClick={() => setView('week')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'week' ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Week</button>
               <button onClick={() => setView('agenda')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'agenda' ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Agenda</button>
            </div>
         </div>
         
         {/* Calendar Grid */}
         <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
               {days.map(day => (
                 <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">{day}</div>
               ))}
            </div>
            <div className="flex-1 grid grid-rows-5 bg-gray-200 dark:bg-gray-800 gap-px border-b border-gray-200 dark:border-gray-800">
               {grid.map((week, i) => (
                 <div key={i} className="grid grid-cols-7 gap-px">
                   {week.map((d, j) => (
                     <div key={j} className={`bg-white dark:bg-gray-950 p-2 min-h-[100px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${d.day === 15 ? "bg-blue-50/30 dark:bg-blue-900/10" : ""}`}>
                        <div className="flex items-center justify-between mb-1">
                           <span className={`text-sm font-medium ${d.day === 15 ? "text-blue-600 font-bold bg-blue-100 dark:bg-blue-900/50 h-6 w-6 flex items-center justify-center rounded-full" : "text-gray-700 dark:text-gray-300"}`}>
                             {d.day}
                           </span>
                        </div>
                        <div className="space-y-1 mt-2">
                           {d.events.map((evt, k) => (
                              <div key={k} className={`text-xs px-2 py-1 rounded-md text-white truncate cursor-pointer ${evt.color}`}>
                                 {evt.title}
                              </div>
                           ))}
                        </div>
                     </div>
                   ))}
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  )
}
