'use client'

import { useAuth } from '@/contexts/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import PageContent from '@/components/PageContent'
import LoginPage from '@/components/LoginPage'
import { Suspense } from 'react'

function HomeContent() {
  const { isAuthenticated } = useAuth()
  
  // Get URL params for embed mode
  const isEmbed = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === 'true'
  const pageParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('page') || 'overview' : 'overview'

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className={isEmbed ? 'embed-mode' : ''}>
      <DashboardLayout>
        <PageContent initialPage={pageParam} />
      </DashboardLayout>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
