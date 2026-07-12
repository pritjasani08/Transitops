import * as React from "react"
import { FileWarning, Search, Filter, Plus, Activity, Clock, CheckCircle2 } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { MOCK_ALERTS } from "../utils/mockData"

export function IncidentCenter() {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  const incidents = MOCK_ALERTS.filter(a => a.type === 'Incident' && (
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Incident Center</h1>
          <p className="text-text-muted mt-1">Review, track, and resolve safety incidents and violations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2 bg-danger-600 hover:bg-danger-700 text-white">
            <Plus className="h-4 w-4" />
            Log New Incident
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle className="text-lg">Incident Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-center">
                 <span className="text-4xl font-bold text-text-primary mb-1">1</span>
                 <span className="text-sm font-medium text-text-muted">Open Incidents</span>
               </div>
               <div className="grid grid-cols-2 gap-2 text-center text-sm">
                 <div className="p-3 bg-danger-50 dark:bg-danger-900/10 rounded-lg text-danger-700 dark:text-danger-400">
                   <div className="font-bold text-xl">0</div>
                   <div className="text-xs">Critical</div>
                 </div>
                 <div className="p-3 bg-warning-50 dark:bg-warning-900/10 rounded-lg text-warning-700 dark:text-warning-400">
                   <div className="font-bold text-xl">1</div>
                   <div className="text-xs">Warning</div>
                 </div>
               </div>
            </CardContent>
           </Card>
        </div>
        
        <div className="md:col-span-3 space-y-4">
           {/* Search Bar */}
           <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-text-muted" />
              <Input
                placeholder="Search incidents by keyword or driver ID..."
                className="pl-10 py-6 text-lg shadow-sm border-gray-200 dark:border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           {/* Incidents List */}
           <div className="space-y-4">
              {incidents.map(incident => (
                 <Card key={incident.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                       <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex gap-4 items-start">
                             <div className="mt-1 p-2 bg-warning-100 text-warning-600 rounded-full dark:bg-warning-900/30">
                               <Activity className="h-6 w-6" />
                             </div>
                             <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-bold">{incident.title}</h3>
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300">Under Review</span>
                                </div>
                                <p className="text-text-muted mb-4">{incident.description}</p>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
                                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Reported: {new Date(incident.date).toLocaleString()}</span>
                                  <span>ID: <span className="font-mono text-text-primary">{incident.id}</span></span>
                                  {incident.driverId && <span>Driver: <span className="font-medium text-text-primary">{incident.driverId}</span></span>}
                                </div>
                             </div>
                          </div>
                          <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                            <Button>View Details</Button>
                            <Button variant="outline">Add Evidence</Button>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              ))}

              {incidents.length === 0 && (
                <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                  <CheckCircle2 className="h-16 w-16 text-success-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-text-primary mb-2">No Open Incidents</h3>
                  <p className="text-text-muted">There are no open safety incidents matching your criteria.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
