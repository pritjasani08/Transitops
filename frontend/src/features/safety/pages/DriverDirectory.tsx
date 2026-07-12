import * as React from "react"
import { Search, Filter, Download, MoreVertical, Plus, X, Copy, Check } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { DriverStatusBadge, LicenseStatusBadge } from "../components/StatusBadges"
import { SafetyScoreRing } from "../components/SafetyScoreRing"
import { axiosInstance } from "../../../services/api/axios"
import toast from "react-hot-toast"

export function DriverDirectory() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [drivers, setDrivers] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [credentials, setCredentials] = React.useState<{email: string, password: string} | null>(null)
  const [copied, setCopied] = React.useState(false)

  const [formData, setFormData] = React.useState({
    driver_name: '',
    license_number: '',
    license_type: 'CDL-A',
    license_expiry: '',
    status: 'Available',
    years_of_experience: 0
  })

  const fetchDrivers = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get('/drivers')
      setDrivers(res.data.data)
    } catch (err) {
      toast.error('Failed to load drivers')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchDrivers()
  }, [])

  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post('/drivers', formData)
      
      if(res.data?.data?.credentials) {
        setCredentials(res.data.data.credentials)
      } else {
        toast.success('Driver added successfully')
        setIsAddModalOpen(false)
      }
      
      fetchDrivers()
      setFormData({
        driver_name: '', license_number: '', license_type: 'CDL-A', license_expiry: '', status: 'Available', years_of_experience: 0
      })
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add driver')
    }
  }

  const handleCopyCredentials = () => {
    if (credentials) {
      navigator.clipboard.writeText(`Email: ${credentials.email}\nPassword: ${credentials.password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Credentials copied to clipboard");
    }
  }

  const filteredDrivers = drivers.filter(driver =>
    (driver.driver_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (driver.license_number || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Driver Directory</h1>
          <p className="text-text-muted mt-1">Manage and monitor all enterprise fleet drivers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Directory Table Card */}
      <Card>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>All Drivers</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search drivers..."
                  className="pl-9 bg-gray-50 dark:bg-gray-900 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-gray-50/50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Driver</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">License Info</th>
                  <th className="px-6 py-4 font-medium">Experience</th>
                  <th className="px-6 py-4 font-medium">Safety Score</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-muted">Loading drivers...</td>
                  </tr>
                ) : filteredDrivers.map(driver => (
                  <tr key={driver.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 font-bold uppercase">
                          {(driver.driver_name || 'U').charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{driver.driver_name}</p>
                          <p className="text-xs text-text-muted">ID: {driver.id.substring(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <DriverStatusBadge status={driver.status || 'Available'} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                         <p className="font-medium text-text-primary">{driver.license_number}</p>
                         <p className="text-xs text-text-muted">{driver.license_type} • Exp: {new Date(driver.license_expiry).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {driver.years_of_experience || 0} Years
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                         <SafetyScoreRing score={Math.round((driver.rating || 5) * 20)} size={40} strokeWidth={4} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {!loading && filteredDrivers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                      No drivers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-bg-base rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
            <button onClick={() => { setIsAddModalOpen(false); setCredentials(null); }} className="absolute top-4 right-4 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Driver</h2>
            
            {credentials ? (
              <div className="space-y-6">
                <div className="bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 p-4 rounded-xl border border-success-200 dark:border-success-800">
                  <h3 className="font-bold mb-2">Driver Created Successfully!</h3>
                  <p className="text-sm mb-4">Please share these login credentials securely with the driver. They will need this to access the Driver Dashboard.</p>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3 font-mono text-sm relative border border-gray-200 dark:border-gray-700">
                    <div><span className="text-text-muted">Email:</span> {credentials.email}</div>
                    <div><span className="text-text-muted">Password:</span> {credentials.password}</div>
                    <Button 
                      onClick={handleCopyCredentials} 
                      size="sm" 
                      variant="outline" 
                      className="absolute top-2 right-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-success-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={() => { setIsAddModalOpen(false); setCredentials(null); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Done</Button>
              </div>
            ) : (
              <form onSubmit={handleAddDriver} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <Input required value={formData.driver_name} onChange={e => setFormData({...formData, driver_name: e.target.value})} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">License Number</label>
                    <Input required value={formData.license_number} onChange={e => setFormData({...formData, license_number: e.target.value})} placeholder="DL-1234567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">License Type</label>
                    <Input required value={formData.license_type} onChange={e => setFormData({...formData, license_type: e.target.value})} placeholder="CDL-A" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">License Expiry</label>
                    <Input required type="date" value={formData.license_expiry} onChange={e => setFormData({...formData, license_expiry: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Experience (Years)</label>
                    <Input required type="number" value={formData.years_of_experience} onChange={e => setFormData({...formData, years_of_experience: parseInt(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Status</label>
                    <select 
                      className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
                      value={formData.status} 
                      onChange={e => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Available">Available</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">Save Driver & Generate Credentials</Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
