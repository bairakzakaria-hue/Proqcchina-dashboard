'use client'

import { useState, useEffect } from 'react'
import { useDashboard } from './DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'

interface Invoice {
  id: string
  date: string
  dueDate: string
  amount: string
  status: 'paid' | 'due' | 'pending' | 'cancelled' | 'completed'
}

// TODO: Replace with actual API call
// const [invoices, setInvoices] = useState<Invoice[]>([])
// useEffect(() => {
//   fetchInvoices({ limit: 5 }).then(setInvoices)
// }, [])
const invoices: Invoice[] = []

export default function InvoicesTable() {
  const { searchQuery, setActivePage } = useDashboard()
  const { t } = useLanguage()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePay = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setShowPaymentModal(true)
  }

  const handleViewAll = () => {
    setActivePage('Invoices')
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-lg font-bold text-gray-900 mb-6">{t('common.latestInvoices')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.id')}</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.date')}</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.dueDate')}</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.amount')}</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{invoice.date}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{invoice.dueDate}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{invoice.amount}</td>
                    <td className="py-4 px-4">
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
            {t('common.viewAll')} {t('dashboard.invoicesPage').toLowerCase()}
            <svg className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowPaymentModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Redirecting to Payment</h3>
              <p className="text-gray-600 mb-4">You'll be redirected to the payment page for invoice {selectedInvoice.id}</p>
              <button 
                onClick={() => {
                  setShowPaymentModal(false)
                  handleViewAll()
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Go to Invoices Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
