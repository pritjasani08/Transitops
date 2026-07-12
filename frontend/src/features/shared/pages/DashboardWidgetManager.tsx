import * as React from "react"
import { LayoutDashboard, Move, Maximize2, EyeOff, Pin, Save, RotateCcw, Plus, GripHorizontal } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"

export function DashboardWidgetManager() {
  const widgets = [
    { id: 1, name: "Fleet Status Overview", type: "Chart", size: "Large", isVisible: true, isPinned: true },
    { id: 2, name: "Recent Dispatches", type: "List", size: "Medium", isVisible: true, isPinned: false },
    { id: 3, name: "Financial KPIs", type: "Metric Cards", size: "Large", isVisible: true, isPinned: false },
    { id: 4, name: "Maintenance Alerts", type: "List", size: "Small", isVisible: true, isPinned: false },
    { id: 5, name: "Safety Incident Rate", type: "Chart", size: "Medium", isVisible: false, isPinned: false },
    { id: 6, name: "Driver Leaderboard", type: "List", size: "Small", isVisible: false, isPinned: false },
  ]

  return (
    <div className="space-y-6 pb-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Dashboard Layout Manager</h1>
          <p className="text-text-muted mt-1">Customize your workspace by rearranging, resizing, and pinning widgets.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
             <RotateCcw className="h-4 w-4" /> Reset Default
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="h-4 w-4" /> Save Layout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Live Preview Area Mockup */}
         <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Workspace Preview</h3>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 min-h-[500px] flex flex-col gap-4">
               
               {/* Large Widget Mock */}
               <div className="bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 h-48 p-4 relative group">
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"><Maximize2 className="h-3 w-3" /></button>
                     <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"><EyeOff className="h-3 w-3" /></button>
                  </div>
                  <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-lg">
                     <span className="text-gray-400 font-medium">Fleet Status Overview (Large)</span>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  {/* Medium Widget Mock */}
                  <div className="flex-1 bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 h-64 p-4 relative group">
                     <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"><Maximize2 className="h-3 w-3" /></button>
                        <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"><EyeOff className="h-3 w-3" /></button>
                     </div>
                     <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-lg">
                        <span className="text-gray-400 font-medium text-center">Recent Dispatches<br/>(Medium)</span>
                     </div>
                  </div>
                  
                  {/* Small Widget Mock */}
                  <div className="flex-1 bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 h-64 p-4 relative group">
                     <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"><Maximize2 className="h-3 w-3" /></button>
                        <button className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"><EyeOff className="h-3 w-3" /></button>
                     </div>
                     <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-lg">
                        <span className="text-gray-400 font-medium text-center">Maintenance Alerts<br/>(Small)</span>
                     </div>
                  </div>
               </div>

            </div>
         </div>

         {/* Available Widgets List */}
         <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Available Widgets</h3>
            <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
               <div className="p-4 bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-500">Drag and drop to rearrange. Toggle visibility to add/remove.</p>
               </div>
               <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[500px] overflow-y-auto">
                  {widgets.map(widget => (
                     <div key={widget.id} className="p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                        <div className="flex items-center gap-3">
                           <GripHorizontal className="h-4 w-4 text-gray-300 cursor-grab active:cursor-grabbing" />
                           <div>
                              <p className={`text-sm font-medium ${widget.isVisible ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{widget.name}</p>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{widget.type} • {widget.size}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-1">
                           {widget.isVisible ? (
                              <>
                                 <button className={`p-1.5 rounded-md ${widget.isPinned ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                    <Pin className="h-3.5 w-3.5" />
                                 </button>
                                 <button className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <EyeOff className="h-3.5 w-3.5" />
                                 </button>
                              </>
                           ) : (
                              <button className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-1 text-xs font-medium">
                                 <Plus className="h-3.5 w-3.5" /> Add
                              </button>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
