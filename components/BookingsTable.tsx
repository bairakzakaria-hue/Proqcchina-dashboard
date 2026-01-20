'use client'

import { useState, useEffect } from 'react'
import { useDashboard } from './DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'

interface Booking {
  id: string
  date: string
  service: string
  status: 'paid' | 'due' | 'pending' | 'cancelled' | 'completed' | 'ready'
}

// TODO: Replace with actual API call
// const [bookings, setBookings] = useState<Booking[]>([])
// useEffect(() => {
//   fetchBookings({ limit: 5 }).then(setBookings)
// }, [])
const bookings: Booking[] = []

const statusColors = {
  paid: 'bg-green-100 text-green-800 border-green-200',
  due: 'bg-red-100 text-red-800 border-red-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  ready: 'bg-indigo-100 text-indigo-800 border-indigo-200',
}

export default function BookingsTable() {
  const { searchQuery, setActivePage } = useDashboard()
  const { t } = useLanguage()
  const [latestBookings, setLatestBookings] = useState<Booking[]>(bookings)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('crm_bookings') : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Array<{
          id: string
          service: string
          status: Booking['status']
          createdAt?: string
        }>
        const mapped = parsed.slice(0, 5).map((booking) => ({
          id: booking.id,
          date: booking.createdAt
            ? new Date(booking.createdAt)
                .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                .replace(/\//g, '.')
            : new Date()
                .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                .replace(/\//g, '.'),
          service: booking.service,
          status: booking.status,
        }))
        setLatestBookings(mapped)
        return
      } catch {
        setLatestBookings(bookings)
      }
    } else {
      setLatestBookings(bookings)
    }
  }, [])

  const filteredBookings = latestBookings.filter(booking => 
    booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.service.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewAll = () => {
    setActivePage('Bookings')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{t('common.latestBookings')}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.id')}</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.date')}</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.service')}</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.status')}</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{booking.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{booking.service}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status]}`}>
                      {booking.status === 'paid' ? t('status.paid') :
                       booking.status === 'due' ? t('status.due') :
                       booking.status === 'pending' ? t('status.pending') :
                       booking.status === 'cancelled' ? t('status.cancelled') :
                       booking.status === 'completed' ? t('status.completed') :
                       t('status.ready')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => setActivePage('Bookings')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline transition-colors"
                    >
                      {t('common.viewBooking')}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 px-4 text-center text-gray-500">
                  {t('table.noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button 
          onClick={handleViewAll}
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center group"
        >
          {t('common.viewAll')} {t('dashboard.bookingsPage').toLowerCase()}
          <svg className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
