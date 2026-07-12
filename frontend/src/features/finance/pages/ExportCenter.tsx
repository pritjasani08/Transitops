import * as React from "react"
import { Download, FileText, FileSpreadsheet, HardDriveDownload, Printer, Clock } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card"

export function ExportCenter() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Data Export Center</h1>
          <p className="text-text-muted mt-1">Bulk export tools and scheduled automated report deliveries.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Export Options */}
         <div className="lg:col-span-2 space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle>Export Formats</CardTitle>
                  <CardDescription>Select the desired format for downloading the complete financial ledger.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900/30 rounded-lg">
                           <FileText className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-text-primary">PDF Document</h4>
                           <p className="text-sm text-text-muted">Best for printing and official sharing. Read-only.</p>
                        </div>
                     </div>
                     <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export
                     </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900/30 rounded-lg">
                           <FileSpreadsheet className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-text-primary">Microsoft Excel (.xlsx)</h4>
                           <p className="text-sm text-text-muted">Preserves formatting and basic formulas.</p>
                        </div>
                     </div>
                     <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export
                     </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-lg">
                           <HardDriveDownload className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-text-primary">CSV Data Dump</h4>
                           <p className="text-sm text-text-muted">Raw data format. Best for importing into other systems (SAP, Oracle).</p>
                        </div>
                     </div>
                     <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Scheduled Exports */}
         <div className="space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle>Scheduled Exports</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                     <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <h4 className="font-semibold text-text-primary">Monthly P&L</h4>
                     </div>
                     <p className="text-sm text-text-muted mb-3">Runs on the 1st of every month. Delivered via Email (PDF).</p>
                     <Button variant="outline" size="sm" className="w-full">Manage Schedule</Button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                     <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <h4 className="font-semibold text-text-primary">Weekly Fuel Log</h4>
                     </div>
                     <p className="text-sm text-text-muted mb-3">Runs every Monday 08:00 AM. Export to S3 (CSV).</p>
                     <Button variant="outline" size="sm" className="w-full">Manage Schedule</Button>
                  </div>

                  <Button className="w-full gap-2 border border-dashed border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-text-primary">
                     <Clock className="h-4 w-4" /> Create New Schedule
                  </Button>
               </CardContent>
            </Card>

            <Card>
               <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                     <Printer className="h-6 w-6 text-text-muted" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-1">Quick Print</h4>
                  <p className="text-sm text-text-muted mb-3">Send current dashboard view directly to connected enterprise printer.</p>
                  <Button variant="secondary" className="w-full">Print Current View</Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  )
}
