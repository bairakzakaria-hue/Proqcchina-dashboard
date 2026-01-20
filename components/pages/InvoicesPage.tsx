'use client'

import { useState, useEffect } from 'react'
import { useDashboard } from '../DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'
import { startWordPressPayment } from '@/lib/payments'
import { useAdminSettings } from '@/contexts/AdminSettingsContext'

interface Invoice {
  id: string
  date: string
  dueDate: string
  amount: string
  status: 'paid' | 'due' | 'pending' | 'cancelled' | 'completed'
  bookingId?: string
  description?: string
}

// TODO: Replace with actual API call
// const [allInvoices, setAllInvoices] = useState<Invoice[]>([])
// useEffect(() => {
//   fetchInvoices().then(setAllInvoices)
// }, [])
const allInvoices: Invoice[] = []

export default function InvoicesPage() {
  const { searchQuery } = useDashboard()
  const { t } = useLanguage()
  const [filterStatus, setFilterStatus] = useState<'All' | 'paid' | 'due' | 'pending' | 'cancelled' | 'completed'>('All')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filteredInvoices = allInvoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.bookingId?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'All' || invoice.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handlePay = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setShowPaymentModal(true)
  }

  const totalUnpaid = allInvoices.filter(inv => inv.status === 'due').reduce((sum, inv) => {
    return sum + parseInt(inv.amount.replace('$', ''))
  }, 0)

  const handleDownloadAll = () => {
    if (allInvoices.length === 0) {
      alert(t('table.noResults'))
      return
    }
    
    // Create a CSV content
    const csvHeaders = ['Invoice ID', 'Date', 'Due Date', 'Description', 'Amount', 'Status', 'Booking ID']
    const csvRows = allInvoices.map(inv => [
      inv.id,
      inv.date,
      inv.dueDate,
      inv.description || '',
      inv.amount,
      inv.status,
      inv.bookingId || ''
    ])
    
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `invoices_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Show success message
    alert(`✅ ${allInvoices.length} ${t('dashboard.invoicesPage').toLowerCase()} ${t('common.loading')}`)
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.invoicesPage')}</h1>
            <p className="text-gray-600 mt-1">{t('invoice.totalUnpaid')}: <span className="font-semibold text-red-600">${totalUnpaid}</span></p>
          </div>
          <button 
            onClick={handleDownloadAll}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md font-medium"
          >
            {t('invoice.downloadAll')}
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">{t('common.filter')}</span>
            {['All', 'paid', 'due', 'pending', 'cancelled', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as 'All' | 'paid' | 'due' | 'pending' | 'cancelled' | 'completed')}
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
                 t('status.completed')}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.id')}</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.date')}</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.dueDate')}</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.description')}</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.amount')}</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{invoice.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{invoice.date}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{invoice.dueDate}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{invoice.description}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">{invoice.amount}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {(invoice.status === 'due' || invoice.status === 'pending') && (
                          <button 
                            onClick={() => handlePay(invoice)}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            {t('invoice.pay')}
                          </button>
                        )}
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                          invoice.status === 'paid' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : invoice.status === 'due'
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : invoice.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : invoice.status === 'cancelled'
                            ? 'bg-gray-100 text-gray-800 border-gray-200'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {invoice.status === 'paid' ? t('status.paid') :
                           invoice.status === 'due' ? t('status.due') :
                           invoice.status === 'pending' ? t('status.pending') :
                           invoice.status === 'cancelled' ? t('status.cancelled') :
                           t('status.completed')}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('table.noResults')}</p>
          </div>
        )}
      </div>

      {showPaymentModal && selectedInvoice && (
        <PaymentModal 
          invoice={selectedInvoice}
          onClose={() => {
            setShowPaymentModal(false)
            setSelectedInvoice(null)
          }}
          onSuccess={() => {
            // Update invoice status (in real app, this would update the state)
            alert(`${t('common.paymentSuccess')} ${selectedInvoice.id}`)
            setShowPaymentModal(false)
            setSelectedInvoice(null)
          }}
        />
      )}
    </>
  )
}

function PaymentModal({ invoice, onClose, onSuccess }: { invoice: Invoice, onClose: () => void, onSuccess: () => void }) {
  const { t } = useLanguage()
  const { settings } = useAdminSettings()
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'skrill'>('paypal')
  const [isProcessing, setIsProcessing] = useState(false)
  const availableMethods = [
    settings.paymentMethods.paypal ? { id: 'paypal', name: 'PayPal', icon: '🔵' } : null,
    settings.paymentMethods.skrill ? { id: 'skrill', name: 'Skrill', icon: '🟣' } : null,
  ].filter(Boolean) as Array<{ id: 'paypal' | 'skrill'; name: string; icon: string }>

  useEffect(() => {
    if (availableMethods.length > 0 && !availableMethods.find((method) => method.id === paymentMethod)) {
      setPaymentMethod(availableMethods[0].id)
    }
  }, [availableMethods, paymentMethod])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (availableMethods.length === 0) {
      alert(t('invoice.noPaymentMethods'))
      return
    }

    setIsProcessing(true)
    
    try {
      const result = await startWordPressPayment({
        source: 'invoice',
        id: invoice.id,
        amount: invoice.amount,
        method: paymentMethod,
      })
      setIsProcessing(false)

      if (result.checkoutUrl) {
        window.open(result.checkoutUrl, '_blank', 'noopener,noreferrer')
        onSuccess()
        return
      }

      alert(result.error || 'Payment processing not yet implemented. Please connect to your payment gateway.')
    } catch (error) {
      console.error('Payment processing error:', error)
      setIsProcessing(false)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">{t('invoice.pay')} {t('dashboard.invoicesPage')} {invoice.id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{t('table.amount')}:</span>
            <span className="text-2xl font-bold text-gray-900">{invoice.amount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('table.dueDate')}:</span>
            <span className="text-gray-900">{invoice.dueDate}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.paymentMethod')}</label>
            <div className="space-y-2">
              {availableMethods.length === 0 && (
                <div className="text-sm text-gray-600">{t('invoice.noPaymentMethods')}</div>
              )}
              {availableMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as 'paypal' | 'skrill')}
                  className={`w-full text-left px-4 py-3 border-2 rounded-lg transition-all ${
                    paymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-medium ml-3">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              {t('booking.cancel')}
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? t('common.loading') : t('invoice.pay')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

