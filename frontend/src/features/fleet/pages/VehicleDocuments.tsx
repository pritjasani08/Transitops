import * as React from "react"
import { motion } from "framer-motion"
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  MoreVertical,
  Download,
  AlertCircle
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"

const mockDocuments = [
  { id: 1, name: "Registration Certificate.pdf", type: "Registration", vehicle: "MH-12-AB-1234", uploadDate: "2023-10-15", expiryDate: "2024-10-14", status: "Valid", size: "2.4 MB" },
  { id: 2, name: "Insurance_Policy_2024.pdf", type: "Insurance", vehicle: "MH-12-AB-1234", uploadDate: "2023-11-01", expiryDate: "2024-02-01", status: "Expiring Soon", size: "1.8 MB" },
  { id: 3, name: "Emissions_Test_Q3.pdf", type: "Compliance", vehicle: "NY-05-XY-9876", uploadDate: "2023-09-20", expiryDate: "2024-09-19", status: "Valid", size: "3.1 MB" },
  { id: 4, name: "Heavy_Vehicle_Permit.pdf", type: "Permit", vehicle: "CA-01-ZZ-5555", uploadDate: "2022-12-10", expiryDate: "2023-12-09", status: "Expired", size: "1.2 MB" },
  { id: 5, name: "Driver_Manual_v2.pdf", type: "Manual", vehicle: "All", uploadDate: "2023-01-15", expiryDate: "N/A", status: "Valid", size: "15 MB" },
]

export function VehicleDocuments() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Fleet Documents</h1>
          <p className="text-text-muted mt-1">Manage registration, insurance, and compliance documents.</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input placeholder="Search documents..." className="pl-9 w-full" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select className="flex h-10 w-full rounded-xl border border-gray-300 bg-surface-100 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
            <option>All Types</option>
            <option>Registration</option>
            <option>Insurance</option>
            <option>Compliance</option>
            <option>Permit</option>
          </select>
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDocuments.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:border-primary/30 transition-colors group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary text-sm line-clamp-1" title={doc.name}>
                        {doc.name}
                      </h3>
                      <p className="text-xs text-text-muted mt-1">{doc.size} • {doc.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="-mt-1 -mr-2 text-text-muted">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-text-muted">Vehicle</span>
                    <span className="font-mono font-medium">{doc.vehicle}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Expiry</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{doc.expiryDate}</span>
                      {doc.status === 'Expiring Soon' && <AlertCircle className="h-3 w-3 text-warning-500" />}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge variant={
                    doc.status === 'Valid' ? 'success' :
                    doc.status === 'Expiring Soon' ? 'warning' : 'danger'
                  }>
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-text-muted hover:text-text-primary">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
