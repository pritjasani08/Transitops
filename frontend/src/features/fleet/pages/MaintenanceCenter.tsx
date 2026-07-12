import * as React from "react"
import { motion } from "framer-motion"
import { 
  Wrench, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Input } from "../../../shared/components/ui/input"

const maintenanceTasks = [
  { id: 1, vehicle: "MH-12-AB-1234", type: "Routine", desc: "45k Mile Inspection & Oil Change", status: "In Progress", date: "Today", priority: "Medium" },
  { id: 2, vehicle: "NY-05-XY-9876", type: "Repair", desc: "Brake Pad Replacement", status: "Scheduled", date: "Tomorrow", priority: "High" },
  { id: 3, vehicle: "CA-01-ZZ-5555", type: "Inspection", desc: "Annual DOT Inspection", status: "Completed", date: "Yesterday", priority: "Medium" },
  { id: 4, vehicle: "TX-99-BB-4444", type: "Repair", desc: "AC System Diagnosis", status: "Scheduled", date: "Oct 25", priority: "Low" },
]

export function MaintenanceCenter() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Maintenance Center</h1>
          <p className="text-text-muted mt-1">Track and schedule fleet maintenance activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Schedule Service
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">In Shop</p>
                <h3 className="text-2xl font-bold mt-1">4</h3>
              </div>
              <div className="h-10 w-10 bg-danger-500/10 rounded-xl flex items-center justify-center text-danger-500">
                <Wrench className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Scheduled</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="h-10 w-10 bg-warning-500/10 rounded-xl flex items-center justify-center text-warning-500">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Completed (MTD)</p>
                <h3 className="text-2xl font-bold mt-1">28</h3>
              </div>
              <div className="h-10 w-10 bg-success-500/10 rounded-xl flex items-center justify-center text-secondary-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Overdue</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="h-10 w-10 bg-danger-500/10 rounded-xl flex items-center justify-center text-danger-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input placeholder="Search work orders, vehicles..." className="pl-9" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="flex h-10 w-full sm:w-auto rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background">
            <option>All Statuses</option>
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>Work Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {maintenanceTasks.map((task, index) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    task.type === 'Routine' ? 'bg-primary/10 text-primary' :
                    task.type === 'Repair' ? 'bg-danger-500/10 text-danger-500' :
                    'bg-secondary-500/10 text-secondary-500'
                  }`}>
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-text-primary">
                        {task.vehicle}
                      </span>
                      <Badge variant={
                        task.status === 'Completed' ? 'success' :
                        task.status === 'In Progress' ? 'warning' : 'default'
                      }>{task.status}</Badge>
                      {task.priority === 'High' && (
                        <span className="flex items-center text-xs font-semibold text-danger-500 uppercase tracking-wider">
                          <AlertTriangle className="h-3 w-3 mr-1" /> High Priority
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-text-primary">{task.desc}</h4>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {task.date}</span>
                      <span>Type: {task.type}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button variant="secondary" size="sm">View Details</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
