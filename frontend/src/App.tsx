import * as React from "react"
import { AppProvider } from "./app/providers/AppProvider"
import { AppRoutes } from "./app/routes"

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
