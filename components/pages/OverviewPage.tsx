'use client'

import { useState, useEffect } from 'react'
import ServiceCardsCarousel from '../ServiceCardsCarousel'
import StatCard from '../StatCard'
import BookingsTable from '../BookingsTable'
import InvoicesTable from '../InvoicesTable'
import BookingModal from '../BookingModal'
import { useDashboard } from '../DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function OverviewPage() {
  const { setActivePage } = useDashboard()
  const { t } = useLanguage()
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [bookingsCount, setBookingsCount] = useState<number>(0)
  const [invoicesCount, setInvoicesCount] = useState<number>(0)

  // TODO: Replace with actual API call to fetch counts
  // useEffect(() => {
  //   fetchBookingsCount().then(setBookingsCount)
  //   fetchInvoicesCount().then(setInvoicesCount)
  // }, [])

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName)
    setShowBookingModal(true)
  }

  const handleBookingsClick = () => {
    setActivePage('Bookings')
  }

  const handleInvoicesClick = () => {
    setActivePage('Invoices')
  }

  const services = [
    {
      title: t('service.factoryAudit'),
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: t('service.preShipment'),
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t('service.duringProduction'),
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t('service.containerLoading'),
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard.welcome')}!</h1>
        <p className="text-gray-600 mb-6">{t('dashboard.startBooking')}</p>
        
        {/* Service Cards Carousel */}
        <div className="mb-12">
          <ServiceCardsCarousel services={services} onServiceClick={handleBookService} />
        </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title={t('dashboard.bookings')}
          value={bookingsCount.toString()}
                onClick={handleBookingsClick}
                icon={
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                }
              />
        <StatCard
          title={t('dashboard.invoices')}
          value={invoicesCount.toString()}
                onClick={handleInvoicesClick}
                icon={
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
            </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingsTable />
          <InvoicesTable />
        </div>
      </div>

      {showBookingModal && selectedService && (
        <BookingModal 
          service={selectedService}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedService(null)
          }}
        />
      )}
    </>
  )
}

