import * as React from "react"
import { Download, Printer, FileText, Calendar, Filter, Users, ShieldAlert, FileWarning } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card"

export function SafetyReports() {
  const reports = [
    {
      id: 'rep-1',
      title: 'Monthly Safety Performance',
      description: 'Comprehensive overview of driver safety scores, incident rates, and training compliance.',
      icon: Users,
      lastGenerated: 'Oct 1, 2023',
      color: 'blue'
    },
    {
      id: 'rep-2',
      title: 'License & Compliance Audit',
      description: 'Detailed log of all active, expiring, and expired CDLs and medical cards.',
      icon: FileWarning,
      lastGenerated: 'Oct 5, 2023',
      color: 'warning'
    },
    {
      id: 'rep-3',
      title: 'Incident Summary Report',
      description: 'Breakdown of all recorded incidents by severity, type, and resolution status.',
      icon: ShieldAlert,
      lastGenerated: 'Sep 30, 2023',
      color: 'danger'
    }
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Safety Reports</h1>
          <p className="text-text-muted mt-1">Generate and export official compliance documentation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map(report => (
           <Card key={report.id} className="flex flex-col h-full hover:border-primary/30 transition-colors">
              <CardHeader>
                 <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      report.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                      report.color === 'warning' ? 'bg-warning-100 text-warning-600 dark:bg-warning-900/30' :
                      'bg-danger-100 text-danger-600 dark:bg-danger-900/30'
                    }`}>
                      <report.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                 </div>
                 <CardDescription className="line-clamp-2">{report.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end gap-4 mt-auto">
                 <div className="text-xs text-text-muted">
                    Last generated: {report.lastGenerated}
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full gap-2 text-xs h-9">
                       <FileText className="h-3 w-3" /> View PDF
                    </Button>
                    <Button variant="outline" className="w-full gap-2 text-xs h-9">
                       <Download className="h-3 w-3" /> Export CSV
                    </Button>
                 </div>
                 <Button className="w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900">
                    Generate New Report
                 </Button>
              </CardContent>
           </Card>
        ))}
      </div>
      
      <Card>
         <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
            <CardDescription>Select specific parameters to generate a tailored compliance report.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
               <div className="space-y-2 flex-1 min-w-[200px]">
                  <label className="text-sm font-medium">Date Range</label>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                     <Calendar className="mr-2 h-4 w-4 text-text-muted" />
                     <span>Select Dates</span>
                  </Button>
               </div>
               <div className="space-y-2 flex-1 min-w-[200px]">
                  <label className="text-sm font-medium">Data Points</label>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                     <Filter className="mr-2 h-4 w-4 text-text-muted" />
                     <span>All Data Selected</span>
                  </Button>
               </div>
               <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]">
                  Generate Custom
               </Button>
            </div>
         </CardContent>
      </Card>
    </div>
  )
}
