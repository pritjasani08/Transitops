import * as React from "react"
import { Search, Filter, Download, Activity, User, Truck, FileText, Settings, ShieldAlert, DollarSign } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"

export function ActivityCenter() {
  const activities = [
    { id: 1, type: 'fleet', user: "Sarah Connor", action: "Updated maintenance schedule", entity: "Volvo VNL 860 (V-101)", time: "10 mins ago", icon: Truck, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { id: 2, type: 'dispatch', user: "Mike Johnson", action: "Assigned new trip TRP-9002 to", entity: "Driver John Doe", time: "2 hours ago", icon: Activity, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
    { id: 3, type: 'finance', user: "Alice Smith", action: "Approved fuel expense $450.00 for", entity: "Trip TRP-8991", time: "4 hours ago", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { id: 4, type: 'safety', user: "System", action: "Generated safety compliance report for", entity: "Q3 2023", time: "1 day ago", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
    { id: 5, type: 'system', user: "Admin", action: "Updated global role permissions for", entity: "Dispatcher Role", time: "2 days ago", icon: Settings, color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800" },
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Activity Center</h1>
          <p className="text-text-muted mt-1">Enterprise-wide audit trail and recent actions timeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
             <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
         {/* Filters sidebar */}
         <div className="w-full md:w-64 space-y-6">
            <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
               <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Time Range</h3>
               <div className="space-y-2">
                  {["Today", "Yesterday", "This Week", "This Month", "All Time"].map((range, i) => (
                     <label key={range} className="flex items-center gap-2 cursor-pointer">
                       <input type="radio" name="timeRange" className="rounded-full border-gray-300" defaultChecked={i === 0} />
                       <span className="text-sm text-gray-700 dark:text-gray-300">{range}</span>
                     </label>
                  ))}
               </div>
            </div>
            
            <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
               <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Modules</h3>
               <div className="space-y-2">
                  {["Fleet", "Dispatch", "Safety", "Finance", "System"].map(mod => (
                     <label key={mod} className="flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                       <span className="text-sm text-gray-700 dark:text-gray-300">{mod}</span>
                     </label>
                  ))}
               </div>
            </div>
         </div>

         {/* Timeline */}
         <div className="flex-1 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
               <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input className="pl-9 h-9 bg-gray-50 dark:bg-gray-900 border-none" placeholder="Search activities, users, entities..." />
               </div>
               <Button variant="ghost" size="sm" className="gap-2 text-gray-500"><Filter className="h-4 w-4" /> Advanced Filter</Button>
            </div>

            <div className="relative border-l-2 border-gray-100 dark:border-gray-800 ml-4 space-y-8">
               {activities.map((activity, i) => (
                  <div key={activity.id} className="relative pl-8">
                     <div className={`absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white dark:border-gray-950 ${activity.bg} ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                     </div>
                     <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-start gap-4 mb-2">
                           <p className="text-sm text-gray-900 dark:text-gray-100">
                              <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold">{activity.entity}</span>
                           </p>
                           <span className="text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-medium uppercase tracking-wider text-gray-500 px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800">{activity.type}</span>
                        </div>
                     </div>
                  </div>
               ))}
               
               <div className="pl-8 pt-4">
                  <Button variant="outline" className="w-full text-gray-500 border-dashed">Load More Activity</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
