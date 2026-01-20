'use client'

import { useState, createContext, useContext } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'

interface DashboardContextType {
  activePage: string
  setActivePage: (page: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within DashboardLayout')
  }
  return context
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('Overview')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <DashboardContext.Provider value={{ activePage, setActivePage, searchQuery, setSearchQuery }}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  )
}

