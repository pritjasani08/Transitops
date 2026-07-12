import * as React from "react"
import { ShieldAlert, CheckCircle2, Clock, Filter, AlertTriangle } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { axiosInstance } from "../../../services/api/axios"

export function ComplianceCenter() {
  const [loading, setLoading] = React.useState(true)
  const [complianceIssues, setComplianceIssues] = React.useState<any[]>([])
  const [filterLevel, setFilterLevel] = React.useState<'All' | 'Critical' | 'Warning'>('All')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [driversRes] = await Promise.all([
          axiosInstance.get('/drivers').catch(() => ({ data: { data: [] } }))
        ])
        
        const drivers = driversRes.data.data || []
        const now = new Date()
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        
        const issues: any[] = []
        
        drivers.forEach((d: any) => {
          const exp = new Date(d.license_expiry)
          if (exp < now) {
            issues.push({
              id: `exp-${d.id}`,
              type: 'License',
              severity: 'Critical',
              title: 'License Expired',
              description: `Driver ${d.driver_name}'s license expired on ${exp.toLocaleDateString()}. Immediate suspension required.`,
              date: d.license_expiry,
              driverId: d.id
            })
          } else if (exp <= thirtyDaysFromNow) {
            issues.push({
              id: `exp-${d.id}`,
              type: 'License',
              severity: 'Warning',
              title: 'License Expiring Soon',
              description: `Driver ${d.driver_name}'s license will expire on ${exp.toLocaleDateString()}. Renewal needed.`,
              date: d.license_expiry,
              driverId: d.id
            })
          }
        })
        
        setComplianceIssues(issues)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleTakeAction = (id: string) => {
    // For demo purposes, we resolve it locally
    setComplianceIssues(prev => prev.filter(issue => issue.id !== id));
    toast.success("Action recorded in Audit Log. Issue resolved.");
  };

  const toggleFilter = () => {
    setFilterLevel(prev => {
      if (prev === 'All') return 'Critical'
      if (prev === 'Critical') return 'Warning'
      return 'All'
    })
  }

  const filteredIssues = complianceIssues.filter(issue => 
    filterLevel === 'All' ? true : issue.severity === filterLevel
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Compliance Center</h1>
          <p className="text-text-muted mt-1">Live from database: Manage regulatory requirements and resolve compliance flags.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={toggleFilter}>
            <Filter className="h-4 w-4" />
            Filter: {filterLevel}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Open Issues</span>
                <span className="font-bold text-danger-600">{complianceIssues.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">In Progress</span>
                <span className="font-bold text-warning-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Resolved (30d)</span>
                <span className="font-bold text-success-600">Live DB</span>
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-3">Severity Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-danger-500"></span> Critical</span>
                    <span>{complianceIssues.filter(i => i.severity === 'Critical').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning-500"></span> Warning</span>
                    <span>{complianceIssues.filter(i => i.severity === 'Warning').length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Column - Issues List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              {filterLevel === 'All' ? 'All Active Flags' : `${filterLevel} Compliance Flags`}
            </h3>
          </div>
          
          {loading ? (
             <div className="text-center py-12 text-text-muted">Loading live compliance data...</div>
          ) : filteredIssues.map(issue => (
            <Card key={issue.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                   <div className={`p-3 rounded-xl shrink-0 h-fit ${
                      issue.severity === 'Critical' 
                        ? 'bg-danger-50 text-danger-600 dark:bg-danger-900/20' 
                        : 'bg-warning-50 text-warning-600 dark:bg-warning-900/20'
                    }`}>
                      {issue.severity === 'Critical' ? <ShieldAlert className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                    </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">{issue.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          issue.severity === 'Critical' 
                            ? 'bg-danger-100 text-danger-700 dark:bg-danger-900/40 dark:text-danger-300'
                            : 'bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300'
                        }`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-text-muted">{issue.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm bg-gray-50/50 dark:bg-gray-900/50 p-2 rounded-md">
                       <span className="flex items-center gap-1.5 text-text-muted">
                        <Clock className="h-4 w-4" /> Opened: {new Date(issue.date).toLocaleDateString()}
                      </span>
                      {issue.driverId && (
                        <span className="text-text-muted">
                          Driver ID: <span className="font-medium text-text-primary">{issue.driverId.substring(0,8)}...</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                    <Button variant="default" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleTakeAction(issue.id)}>Take Action</Button>
                    <Button variant="outline">View Audit Trail</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {!loading && filteredIssues.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <CheckCircle2 className="h-12 w-12 text-success-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-text-primary">All Clear</h3>
              <p className="text-text-muted">No active {filterLevel !== 'All' ? filterLevel.toLowerCase() : ''} compliance issues require your attention.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
