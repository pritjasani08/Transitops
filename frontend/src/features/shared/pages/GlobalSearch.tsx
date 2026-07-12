import * as React from "react"
import { Search, Filter, Clock, Save, History, Truck, User, FileText, Activity } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"

export function GlobalSearch() {
  const [query, setQuery] = React.useState("")
  
  const recentSearches = ["Maintenance Logs 2023", "Driver John Smith", "V-101 Expenses", "Trip TRP-4509"]
  const savedSearches = ["High ROI Vehicles", "Expiring Licenses", "Pending Expenses"]
  
  return (
    <div className="space-y-6 pb-8">
      {/* Search Header */}
      <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Global Search</h1>
        <div className="w-full max-w-2xl px-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <Input 
              autoFocus
              className="pl-12 h-12 text-lg rounded-xl shadow-sm border-gray-200 dark:border-gray-700"
              placeholder="Search across vehicles, drivers, trips, expenses, documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button size="lg" className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700">Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4 font-semibold text-gray-900 dark:text-gray-100">
              <Filter className="h-4 w-4" /> Filters
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4">Categories</h4>
              {['All', 'Vehicles', 'Drivers', 'Trips', 'Expenses', 'Documents'].map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked={cat === 'All'} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                </label>
              ))}
              
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">Date Range</h4>
              <select className="w-full text-sm rounded-md border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-900">
                <option>Any Time</option>
                <option>Past 24 Hours</option>
                <option>Past Week</option>
                <option>Past Month</option>
                <option>Custom Range...</option>
              </select>
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
             <div className="space-y-4">
                <div>
                   <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-900 dark:text-gray-100">
                     <History className="h-4 w-4 text-gray-500" /> Recent
                   </div>
                   <div className="space-y-1">
                      {recentSearches.map(s => (
                         <button key={s} className="w-full text-left text-sm text-gray-600 hover:text-blue-600 truncate py-1">{s}</button>
                      ))}
                   </div>
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-900 dark:text-gray-100">
                     <Save className="h-4 w-4 text-gray-500" /> Saved
                   </div>
                   <div className="space-y-1">
                      {savedSearches.map(s => (
                         <button key={s} className="w-full text-left text-sm text-gray-600 hover:text-blue-600 truncate py-1">{s}</button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-4">
          {!query ? (
             <div className="py-20 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                <p>Enter a search term to find records across the enterprise.</p>
             </div>
          ) : (
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <p className="text-sm text-gray-500">Showing top results for <span className="font-semibold text-gray-900 dark:text-white">"{query}"</span></p>
                 <Button variant="ghost" size="sm" className="gap-2"><Save className="h-4 w-4" /> Save Search</Button>
               </div>
               
               {/* Mock Results */}
               <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                     <div className="p-3 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-900/30">
                        <Truck className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Volvo VNL 860 (V-101)</h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">Heavy duty truck assigned to long-haul routes. Last maintained on Oct 15, 2023. Current location: Dallas, TX.</p>
                        <div className="flex gap-2 mt-2">
                           <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Vehicle Registry</span>
                           <span className="text-xs text-gray-400">Match in: Description, Tags</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                     <div className="p-3 bg-green-50 text-green-600 rounded-lg dark:bg-green-900/30">
                        <User className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">John Doe</h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">Senior Driver. Assigned to V-101. License expires in 15 days.</p>
                        <div className="flex gap-2 mt-2">
                           <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Driver Directory</span>
                           <span className="text-xs text-gray-400">Match in: Name, Assignment</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
