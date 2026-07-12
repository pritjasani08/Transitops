import * as React from "react"
import { BookOpen, Video, HelpCircle, MessageSquare, Headphones, FileText, Search } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"

export function HelpCenter() {
  return (
    <div className="space-y-8 pb-8 max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="flex flex-col items-center justify-center py-16 text-center bg-blue-50 dark:bg-blue-950/20 rounded-3xl border border-blue-100 dark:border-blue-900/30">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100 mb-4">How can we help you?</h1>
        <p className="text-blue-700/80 dark:text-blue-300/80 mb-8 max-w-lg">Search our knowledge base, read documentation, or contact our enterprise support team.</p>
        <div className="w-full max-w-2xl px-4 relative">
          <Search className="absolute left-8 top-3.5 h-5 w-5 text-gray-400" />
          <Input 
            className="pl-12 h-12 text-lg rounded-xl shadow-sm border-white dark:border-gray-800 bg-white dark:bg-gray-900 w-full"
            placeholder="Search for answers..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-12 w-12 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Documentation</h3>
            <p className="text-sm text-gray-500 mb-4">Detailed guides on configuring and using the TransitHub platform.</p>
            <span className="text-sm font-semibold text-blue-600 group-hover:underline">Browse Docs &rarr;</span>
         </div>
         
         <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Video className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-500 mb-4">Step-by-step visual guides for common workflows and features.</p>
            <span className="text-sm font-semibold text-blue-600 group-hover:underline">Watch Videos &rarr;</span>
         </div>

         <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Community FAQ</h3>
            <p className="text-sm text-gray-500 mb-4">Answers to the most frequently asked questions by fleet managers.</p>
            <span className="text-sm font-semibold text-blue-600 group-hover:underline">Read FAQs &rarr;</span>
         </div>
      </div>

      <div className="bg-gray-900 dark:bg-gray-950 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative border border-gray-800">
         <div className="absolute -right-20 -top-20 opacity-10">
            <Headphones className="h-96 w-96" />
         </div>
         <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Enterprise Support?</h2>
            <p className="text-gray-400 mb-8">Our dedicated success team is available 24/7 to help you resolve technical issues, configure advanced workflows, or provide training.</p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Button className="bg-white text-gray-900 hover:bg-gray-100 h-12 px-6 rounded-xl font-semibold">
                  Open Support Ticket
               </Button>
               <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6 rounded-xl">
                  Call Dedicated Line
               </Button>
            </div>
         </div>
      </div>
    </div>
  )
}
