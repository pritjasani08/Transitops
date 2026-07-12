import * as React from "react"
import { motion } from "framer-motion"
import { Download, FileText, Calendar, Filter, Printer } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Input } from "../../../shared/components/ui/input"

const reportsList = [
  { id: 1, name: "Monthly Fleet Utilization", category: "Operations", date: "Oct 1, 2023", size: "245 KB" },
  { id: 2, name: "Q3 Maintenance Cost Analysis", category: "Maintenance", date: "Oct 5, 2023", size: "1.2 MB" },
  { id: 3, name: "Fuel Efficiency Exceptions", category: "Fuel", date: "Oct 10, 2023", size: "180 KB" },
  { id: 4, name: "Vehicle Health Summary", category: "Operations", date: "Oct 12, 2023", size: "320 KB" },
]

export function FleetReports() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Reports Generator</h1>
          <p className="text-text-muted mt-1">Generate, view, and export operational reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Generate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Report Type</label>
                <select className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background">
                  <option>Fleet Utilization</option>
                  <option>Maintenance Costs</option>
                  <option>Fuel Consumption</option>
                  <option>Asset Registry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Date Range</label>
                <select className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Quarter</option>
                  <option>Year to Date</option>
                  <option>Custom Range...</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Format</label>
                <select className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background">
                  <option>PDF Document</option>
                  <option>Excel Spreadsheet (CSV)</option>
                </select>
              </div>
              <Button className="w-full mt-2">Generate Report</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="Search reports..." className="h-9 w-48" />
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {reportsList.map((report) => (
                  <div key={report.id} className="py-4 flex items-center justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary text-sm">{report.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                          <span>{report.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
