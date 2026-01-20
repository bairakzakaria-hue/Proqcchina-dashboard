'use client'

import DashboardLayout from '@/components/DashboardLayout'
import PageContent from '@/components/PageContent'
import { Suspense } from 'react'

function HomeContent() {
  // Get URL params for embed mode
  const isEmbed = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === 'true'
  const pageParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('page') || 'overview' : 'overview'

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
