import * as React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { 
  Wrench, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  X
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Input } from "../../../shared/components/ui/input"
import { axiosInstance } from "../../../services/api/axios"
import toast from "react-hot-toast"

export function MaintenanceCenter() {
  const navigate = useNavigate()
  const [tasks, setTasks] = React.useState<any[]>([])
  const [vehicles, setVehicles] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)

  const [formData, setFormData] = React.useState({
    vehicle_id: '',
    service_type: '',
    description: '',
    cost: 0,
    status: 'Scheduled',
    scheduled_date: ''
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const [maintenanceRes, vehiclesRes] = await Promise.all([
        axiosInstance.get('/maintenance'),
        axiosInstance.get('/vehicles')
      ])
      setTasks(maintenanceRes.data.data)
      setVehicles(vehiclesRes.data.data)
    } catch (err) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/maintenance', formData)
      toast.success('Maintenance scheduled successfully')
      setIsAddModalOpen(false)
      fetchData()
      setFormData({
        vehicle_id: '', service_type: '', description: '', cost: 0, status: 'Scheduled', scheduled_date: ''
      })
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to schedule maintenance')
    }
  }

  const getVehicleReg = (id: string) => {
    const v = vehicles.find(v => v.id === id)
    return v ? v.registration_number : 'Unknown'
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Maintenance Center</h1>
          <p className="text-text-muted mt-1">Track and schedule fleet maintenance activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => navigate('/fleet/maintenance/calendar')}>
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
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
                <h3 className="text-2xl font-bold mt-1">{tasks.filter(t => t.status === 'In Progress').length}</h3>
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
                <h3 className="text-2xl font-bold mt-1">{tasks.filter(t => t.status === 'Scheduled').length}</h3>
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
                <p className="text-sm font-medium text-text-muted">Completed (Total)</p>
                <h3 className="text-2xl font-bold mt-1">{tasks.filter(t => t.status === 'Completed').length}</h3>
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
                <p className="text-sm font-medium text-text-muted">Cancelled</p>
                <h3 className="text-2xl font-bold mt-1">{tasks.filter(t => t.status === 'Cancelled').length}</h3>
              </div>
              <div className="h-10 w-10 bg-danger-500/10 rounded-xl flex items-center justify-center text-danger-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>Work Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <div className="p-6 text-center text-text-muted">Loading maintenance logs...</div>
            ) : tasks.length === 0 ? (
              <div className="p-6 text-center text-text-muted">No maintenance scheduled.</div>
            ) : tasks.map((task, index) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    task.status === 'Completed' ? 'bg-secondary-500/10 text-secondary-500' :
                    task.status === 'In Progress' ? 'bg-danger-500/10 text-danger-500' :
                    'bg-primary/10 text-primary'
                  }`}>
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-text-primary">
                        {getVehicleReg(task.vehicle_id)}
                      </span>
                      <Badge variant={
                        task.status === 'Completed' ? 'success' :
                        task.status === 'In Progress' ? 'warning' : 
                        task.status === 'Cancelled' ? 'danger' : 'default'
                      }>{task.status}</Badge>
                    </div>
                    <h4 className="font-medium text-text-primary">{task.service_type} - {task.description}</h4>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {new Date(task.scheduled_date).toLocaleDateString()}</span>
                      <span className="font-semibold text-danger-500">Cost: ${task.cost}</span>
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-bg-base rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Schedule Maintenance</h2>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Vehicle</label>
                  <select 
                    required
                    className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background"
                    value={formData.vehicle_id}
                    onChange={e => setFormData({...formData, vehicle_id: e.target.value})}
                  >
                    <option value="">Select a vehicle...</option>
                    {vehicles.map(v => <option key={v.id} value={v.id}>{v.registration_number} - {v.make} {v.model}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Service Type</label>
                  <Input required value={formData.service_type} onChange={e => setFormData({...formData, service_type: e.target.value})} placeholder="e.g. Oil Change" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Cost ($)</label>
                  <Input required type="number" value={formData.cost} onChange={e => setFormData({...formData, cost: parseFloat(e.target.value)})} />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Detailed description..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Scheduled Date</label>
                  <Input required type="date" value={formData.scheduled_date} onChange={e => setFormData({...formData, scheduled_date: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <select 
                    className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background"
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full mt-4">Schedule</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
