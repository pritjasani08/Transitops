import * as React from "react"
import { Search, Filter, Download, MoreVertical, Plus } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { ExpenseStatusBadge } from "../components/StatusBadges"
import { axiosInstance } from "../../../services/api/axios"

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function ExpenseManagement() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [expenses, setExpenses] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get('/expenses')
        setExpenses(res.data.data || [])
      } catch (e) {
        console.error("Failed to load expenses")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredExpenses = expenses.filter(exp =>
    exp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.expense_type?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Expense Management</h1>
          <p className="text-text-muted mt-1">Live from database: Track and approve all fleet-related operational expenses.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            Record Expense
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Live Expense Ledger</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search expenses..."
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
                  <th className="px-6 py-4 font-medium">Expense ID</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">Loading live expenses...</td>
                  </tr>
                ) : filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">No expenses found in database.</td>
                  </tr>
                ) : filteredExpenses.map(expense => (
                  <tr key={expense.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">{expense.id.substring(0,8)}</td>
                    <td className="px-6 py-4">{new Date(expense.date_incurred).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {expense.expense_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-muted truncate max-w-[200px]">{expense.description}</td>
                    <td className="px-6 py-4 font-semibold text-text-primary">{formatCurrency(parseFloat(expense.amount))}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
