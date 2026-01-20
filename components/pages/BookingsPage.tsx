'use client'

import { useState, useEffect } from 'react'
import { useDashboard } from '../DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'
import BookingModal from '../BookingModal'

interface Booking {
  id: string
  date: string
  service: string
  status: 'paid' | 'due' | 'pending' | 'cancelled' | 'completed' | 'ready'
  supplier?: string
  amount?: string
}

// TODO: Replace with actual API call
// const [allBookings, setAllBookings] = useState<Booking[]>([])
// useEffect(() => {
//   fetchBookings().then(setAllBookings)
// }, [])
const allBookings: Booking[] = []

const statusColors = {
  paid: 'bg-green-100 text-green-800 border-green-200',
  due: 'bg-red-100 text-red-800 border-red-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  ready: 'bg-indigo-100 text-indigo-800 border-indigo-200',
}

export default function BookingsPage() {
  const { searchQuery } = useDashboard()
  const { t } = useLanguage()
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [bookings, setBookings] = useState<Booking[]>(allBookings)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('crm_bookings') : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Array<{
          id: string
          service: string
          status: Booking['status']
          company: string
          createdAt?: string
        }>
        const mapped = parsed.map((booking) => ({
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
          supplier: booking.company,
        }))
        setBookings(mapped)
        return
      } catch {
        setBookings(allBookings)
      }
    } else {
      setBookings(allBookings)
    }
  }, [])

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.supplier?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'All' || booking.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleNewBooking = () => {
    // Show service selection modal first
    setShowBookingModal(true)
    setSelectedService(null)
  }

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName)
  }

  const services = [
    t('service.factoryAudit'),
    t('service.preShipment'),
    t('service.duringProduction'),
    t('service.containerLoading')
  ]

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.bookingsPage')}</h1>
          <button 
            onClick={handleNewBooking}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md font-medium"
          >
            {t('dashboard.newBooking')}
          </button>
        </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">{t('common.filter')}</span>
          {['All', 'paid', 'due', 'pending', 'cancelled', 'completed', 'ready'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'All' ? t('common.all') : 
               status === 'paid' ? t('status.paid') :
               status === 'due' ? t('status.due') :
               status === 'pending' ? t('status.pending') :
               status === 'cancelled' ? t('status.cancelled') :
               status === 'completed' ? t('status.completed') :
               t('status.ready')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.id')}</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.date')}</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.service')}</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.supplier')}</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.amount')}</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.status')}</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.service}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{booking.supplier}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{booking.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status]}`}>
                      {booking.status === 'paid' ? t('status.paid') :
                       booking.status === 'due' ? t('status.due') :
                       booking.status === 'pending' ? t('status.pending') :
                       booking.status === 'cancelled' ? t('status.cancelled') :
                       booking.status === 'completed' ? t('status.completed') :
                       t('status.ready')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline transition-colors">
                      {t('table.viewDetails')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('table.noResults')}</p>
        </div>
      )}
      </div>

      {/* Service Selection Modal */}
      {showBookingModal && !selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{t('booking.availableServices')}</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => handleServiceSelect(service)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">{service}</h4>
                  <p className="text-sm text-gray-600">{t('booking.bookNow')}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
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

