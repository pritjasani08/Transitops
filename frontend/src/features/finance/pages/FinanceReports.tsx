import * as React from "react"
import { Download, FileText, Calendar, Filter, PieChart, TrendingUp, Truck } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card"

export function FinanceReports() {
  const reports = [
    {
      id: 'rep-fin-1',
      title: 'Monthly P&L Statement',
      description: 'Comprehensive Profit and Loss statement including all operational costs and revenue.',
      icon: FileText,
      lastGenerated: 'Oct 1, 2023',
      color: 'blue'
    },
    {
      id: 'rep-fin-2',
      title: 'Fuel Consumption Analysis',
      description: 'Detailed breakdown of fuel costs, MPG efficiency, and regional pricing trends.',
      icon: PieChart,
      lastGenerated: 'Oct 5, 2023',
      color: 'warning'
    },
    {
      id: 'rep-fin-3',
      title: 'Vehicle ROI Summary',
      description: 'Asset profitability report comparing investment vs generated revenue per vehicle.',
      icon: TrendingUp,
      lastGenerated: 'Sep 30, 2023',
      color: 'success'
    },
    {
      id: 'rep-fin-4',
      title: 'Departmental Expense Log',
      description: 'Categorized expense reporting segmented by internal departments and cost centers.',
      icon: Truck,
      lastGenerated: 'Oct 12, 2023',
      color: 'purple'
    }
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Financial Reports</h1>
          <p className="text-text-muted mt-1">Generate, view, and export standardized financial statements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {reports.map(report => (
           <Card key={report.id} className="flex flex-col h-full hover:border-primary/30 transition-colors">
              <CardHeader>
                 <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      report.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                      report.color === 'warning' ? 'bg-warning-100 text-warning-600 dark:bg-warning-900/30' :
                      report.color === 'success' ? 'bg-success-100 text-success-600 dark:bg-success-900/30' :
                      'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
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
                       <FileText className="h-3 w-3" /> PDF
                    </Button>
                    <Button variant="outline" className="w-full gap-2 text-xs h-9">
                       <Download className="h-3 w-3" /> Excel
                    </Button>
                 </div>
                 <Button className="w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900">
                    Run Report
                 </Button>
              </CardContent>
           </Card>
        ))}
      </div>
      
      <Card>
         <CardHeader>
            <CardTitle>Custom Financial Query</CardTitle>
            <CardDescription>Select specific parameters to generate a tailored financial export.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
               <div className="space-y-2 flex-1 min-w-[200px]">
                  <label className="text-sm font-medium">Fiscal Period</label>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                     <Calendar className="mr-2 h-4 w-4 text-text-muted" />
                     <span>Q3 2023 (Jul - Sep)</span>
                  </Button>
               </div>
               <div className="space-y-2 flex-1 min-w-[200px]">
                  <label className="text-sm font-medium">Cost Centers</label>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                     <Filter className="mr-2 h-4 w-4 text-text-muted" />
                     <span>All Departments</span>
                  </Button>
               </div>
               <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]">
                  Generate Query
               </Button>
            </div>
         </CardContent>
      </Card>
    </div>
  )
}
