import * as React from "react"
import { Search, Filter, Upload, Download, MoreVertical, FileText, File, FileSpreadsheet, Image as ImageIcon, Eye, Clock, Trash2, Folder } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"

export function DocumentCenter() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  
  const categories = ["All", "Vehicle Docs", "Driver Docs", "Insurance", "Permits", "Invoices", "Contracts", "Reports"]
  
  const documents = [
    { id: 1, name: "V-101 Registration.pdf", category: "Vehicle Docs", size: "2.4 MB", date: "Oct 15, 2023", expiry: "Oct 15, 2024", type: "pdf", status: "Valid" },
    { id: 2, name: "Driver_License_JDoe.jpg", category: "Driver Docs", size: "1.1 MB", date: "Sep 20, 2023", expiry: "Nov 01, 2023", type: "image", status: "Expiring Soon" },
    { id: 3, name: "Fleet_Insurance_2024.pdf", category: "Insurance", size: "5.2 MB", date: "Jan 01, 2023", expiry: "Dec 31, 2023", type: "pdf", status: "Valid" },
    { id: 4, name: "Q3_Financial_Report.xlsx", category: "Reports", size: "3.8 MB", date: "Oct 05, 2023", expiry: null, type: "spreadsheet", status: "Active" },
    { id: 5, name: "Vendor_Contract_Fuel.pdf", category: "Contracts", size: "1.5 MB", date: "Jun 12, 2022", expiry: "Jun 12, 2025", type: "pdf", status: "Valid" },
  ]

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />
      case 'spreadsheet': return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case 'image': return <ImageIcon className="h-8 w-8 text-blue-500" />
      default: return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Valid': return 'bg-success-100 text-success-700'
      case 'Expiring Soon': return 'bg-warning-100 text-warning-700'
      case 'Expired': return 'bg-danger-100 text-danger-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Document Center</h1>
          <p className="text-text-muted mt-1">Manage, securely store, and track expiries for all enterprise documents.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
             <Download className="h-4 w-4" /> Download Selected
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="h-4 w-4" /> Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-2">
           <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 px-2">Folders</h3>
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                 activeCategory === cat 
                   ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-300"
                   : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
               }`}
             >
               <Folder className={`h-4 w-4 ${activeCategory === cat ? "fill-blue-200 dark:fill-blue-900" : ""}`} />
               {cat}
             </button>
           ))}
           
           <div className="mt-8 px-2 space-y-4">
             <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800/30 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-warning-800 dark:text-warning-400 mb-1">Attention Needed</h4>
                <p className="text-xs text-warning-700 dark:text-warning-300 mb-3">3 documents are expiring within the next 30 days.</p>
                <Button variant="outline" size="sm" className="w-full border-warning-300 text-warning-700 hover:bg-warning-100 dark:border-warning-700 dark:text-warning-400">View Expiring</Button>
             </div>
           </div>
        </div>

        {/* Main Area */}
        <div className="lg:col-span-3 space-y-4">
           {/* Actions Bar */}
           <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                 <Input className="pl-9 h-9" placeholder="Search files by name, type, or tags..." />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                 <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
                 <Button variant="outline" size="sm" className="gap-2"><Clock className="h-4 w-4" /> Recent</Button>
              </div>
           </div>

           {/* Documents Grid / List */}
           <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-4 font-medium"><input type="checkbox" className="rounded border-gray-300" /></th>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Size</th>
                      <th className="px-6 py-4 font-medium">Added</th>
                      <th className="px-6 py-4 font-medium">Expiry / Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {documents.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 group">
                        <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              {getFileIcon(doc.type)}
                              <span className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{doc.category}</td>
                        <td className="px-6 py-4 text-gray-500">{doc.size}</td>
                        <td className="px-6 py-4 text-gray-500">{doc.date}</td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col items-start gap-1">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(doc.status)}`}>
                               {doc.status}
                             </span>
                             {doc.expiry && <span className="text-xs text-gray-400">{doc.expiry}</span>}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Download className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500"><MoreVertical className="h-4 w-4" /></Button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
