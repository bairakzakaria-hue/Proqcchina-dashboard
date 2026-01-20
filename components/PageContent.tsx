'use client'

import { useEffect } from 'react'
import { useDashboard } from './DashboardLayout'
import OverviewPage from './pages/OverviewPage'
import BookingsPage from './pages/BookingsPage'
import ReportsPage from './pages/ReportsPage'
import InvoicesPage from './pages/InvoicesPage'
import AdminCRMPage from './pages/AdminCRMPage'

interface PageContentProps {
  initialPage?: string
}

export default function PageContent({ initialPage }: PageContentProps) {
  const { activePage, setActivePage } = useDashboard()

  useEffect(() => {
    if (initialPage) {
      // Map URL page param to dashboard page names
      const pageMap: { [key: string]: string } = {
        'overview': 'Overview',
        'bookings': 'Bookings',
        'reports': 'Reports',
        'invoices': 'Invoices',
        'crm': 'CRM',
      }
      const mappedPage = pageMap[initialPage.toLowerCase()] || 'Overview'
      setActivePage(mappedPage)
    }
  }, [initialPage, setActivePage])

  switch (activePage) {
    case 'Overview':
      return <OverviewPage />
    case 'Bookings':
      return <BookingsPage />
    case 'Reports':
      return <ReportsPage />
    case 'Invoices':
      return <InvoicesPage />
    case 'CRM':
      return <AdminCRMPage />
    default:
      return <OverviewPage />
  }
}

