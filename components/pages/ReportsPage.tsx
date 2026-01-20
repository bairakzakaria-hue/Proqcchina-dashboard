'use client'

import { useState, useEffect } from 'react'
import { useDashboard } from '../DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'
import { startWordPressPayment } from '@/lib/payments'
import { useAdminSettings } from '@/contexts/AdminSettingsContext'
import Logo from '../Logo'

interface Report {
  id: string
  reportName: string
  service: string
  factory: string
  location: string
  delivered: boolean
  paymentStatus: 'paid' | 'due' | 'pending' | 'cancelled' | 'completed'
}

// TODO: Replace with actual API call
// const [reports, setReports] = useState<Report[]>([])
// useEffect(() => {
//   fetchReports().then(setReports)
// }, [])
const reports: Report[] = []

const serviceColors: { [key: string]: string } = {
  'PSI': 'text-blue-700 font-bold',
  'DUPRO': 'text-purple-700 font-bold',
  'IPC': 'text-green-700 font-bold',
  'FA': 'text-orange-700 font-bold',
  'CLS': 'text-indigo-700 font-bold',
}

const paymentStatusColors = {
  paid: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30',
  due: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30',
  pending: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-500/30',
  cancelled: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-500/30',
  completed: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
}

export default function ReportsPage() {
  const { searchQuery } = useDashboard()
  const { t } = useLanguage()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const filteredReports = reports.filter(report => {
    return report.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           report.factory.toLowerCase().includes(searchQuery.toLowerCase()) ||
           report.location.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleDownload = async (report: Report) => {
    if (report.paymentStatus === 'paid' && report.delivered) {
      try {
        // TODO: Replace with actual download API call
        // Example:
        // const response = await fetch(`/api/reports/${report.id}/download`, {
        //   method: 'GET',
        //   headers: { 'Authorization': `Bearer ${token}` }
        // })
        // const blob = await response.blob()
        // const url = window.URL.createObjectURL(blob)
        // const link = document.createElement('a')
        // link.href = url
        // link.download = `${report.reportName}_${report.id}.pdf`
        // link.click()
        // window.URL.revokeObjectURL(url)
        
        // Placeholder - remove this and implement actual download
        alert(`📥 Download not yet implemented. Report: ${report.reportName}`)
      } catch (error) {
        console.error('Download error:', error)
        alert('An error occurred while downloading the report.')
      }
    }
  }

  const handlePayInvoice = (report: Report) => {
    setSelectedReport(report)
    setShowPaymentModal(true)
  }

  return (
    <>
      <div className="animate-fadeIn">
        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Logo size="md" className="shadow-2xl" />
            <div>
              <p className="text-gray-600 mt-1 text-lg">{t('report.manage')}</p>
            </div>
          </div>
          
        </div>

        {/* Enhanced Reports Table */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-2xl overflow-hidden">
          {/* Enhanced Table Header */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
            <div className="grid grid-cols-12 gap-4 px-8 py-5 font-bold text-sm uppercase tracking-wider">
              <div className="col-span-3 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('report.reportService')}
              </div>
              <div className="col-span-4 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t('report.factoryLocation')}
              </div>
              <div className="col-span-2 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('report.completed')}
              </div>
              <div className="col-span-2 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('report.paymentStatus')}
              </div>
              <div className="col-span-1 flex items-center justify-center">{t('common.action')}</div>
            </div>
          </div>

          {/* Enhanced Table Rows */}
          <div className="divide-y divide-gray-100">
            {filteredReports.map((report, index) => {
              const isHovered = hoveredRow === report.id
              const isEven = index % 2 === 0
              return (
                <div
                  key={report.id}
                  onMouseEnter={() => setHoveredRow(report.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`grid grid-cols-12 gap-4 px-8 py-6 transition-all duration-300 ${
                    isEven ? 'bg-white' : 'bg-gray-50/50'
                  } ${
                    isHovered ? 'bg-blue-50 shadow-inner' : ''
                  }`}
                >
                  {/* REPORT / SERVICE */}
                  <div className="col-span-3 flex items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        report.service === 'PSI' ? 'bg-blue-500' :
                        report.service === 'DUPRO' ? 'bg-purple-500' :
                        report.service === 'IPC' ? 'bg-green-500' :
                        report.service === 'FA' ? 'bg-orange-500' : 'bg-indigo-500'
                      } shadow-lg animate-pulse-slow`}></div>
                      <div className={`${serviceColors[report.service] || 'text-gray-900'} text-base leading-tight`}>
                        {report.reportName}
                      </div>
                    </div>
                  </div>

                  {/* FACTORY & LOCATION */}
                  <div className="col-span-4 flex items-center">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{report.factory}</div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {report.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DELIVERED */}
                  <div className="col-span-2 flex items-center">
                    {report.delivered ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-semibold">Yes</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-red-600">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="font-semibold">No</span>
                      </div>
                    )}
                  </div>

                  {/* PAYMENT STATUS */}
                  <div className="col-span-2 flex items-center">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold ${paymentStatusColors[report.paymentStatus]} transform transition-transform ${isHovered ? 'scale-110' : ''}`}>
                      {report.paymentStatus === 'paid' ? t('status.paid') :
                       report.paymentStatus === 'due' ? t('status.due') :
                       report.paymentStatus === 'pending' ? t('status.pending') :
                       report.paymentStatus === 'cancelled' ? t('status.cancelled') :
                       t('status.completed')}
                    </span>
                  </div>

                  {/* ACTION */}
                  <div className="col-span-1 flex items-center justify-center">
                    {report.paymentStatus === 'paid' && report.delivered ? (
                      <button
                        onClick={() => handleDownload(report)}
                        className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
                      >
                        <svg className="h-5 w-5 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="hidden lg:inline">{t('report.download')}</span>
                      </button>
                    ) : report.paymentStatus === 'pending' ? (
                      <button
                        disabled
                        className="bg-gray-200 text-gray-500 px-5 py-2.5 rounded-xl cursor-not-allowed text-sm font-semibold flex items-center space-x-2 shadow-sm"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="hidden lg:inline">{t('report.locked')}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePayInvoice(report)}
                        className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
                      >
                        <svg className="h-5 w-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="hidden lg:inline">{t('invoice.pay')}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg font-medium">{t('table.noResults')}</p>
          </div>
        )}
      </div>

      {showPaymentModal && selectedReport && (
        <PaymentModal
          report={selectedReport}
          onClose={() => {
            setShowPaymentModal(false)
            setSelectedReport(null)
          }}
          onSuccess={() => {
            alert(`✅ ${t('common.paymentSuccess')} ${selectedReport.reportName}. ${t('common.paymentNote')}`)
            setShowPaymentModal(false)
            setSelectedReport(null)
          }}
        />
      )}
    </>
  )
}

function PaymentModal({ report, onClose, onSuccess }: { report: Report, onClose: () => void, onSuccess: () => void }) {
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
        source: 'report',
        id: report.id,
        amount: '$500',
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl transform animate-slideIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t('invoice.pay')} {t('dashboard.invoicesPage')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
          <div className="text-sm font-semibold text-gray-600 mb-3">{t('report.reportService')}:</div>
          <div className="text-lg font-bold text-gray-900 mb-4">{report.reportName}</div>
          <div className="flex justify-between items-center pt-4 border-t border-blue-200">
            <span className="text-gray-700 font-semibold">{t('table.amount')}:</span>
            <span className="text-3xl font-bold text-blue-900">$500</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">{t('common.paymentMethod')}</label>
            <div className="space-y-2">
              {availableMethods.length === 0 && (
                <div className="text-sm text-gray-600">{t('invoice.noPaymentMethods')}</div>
              )}
              {availableMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as 'paypal' | 'skrill')}
                  className={`w-full text-left px-5 py-4 border-2 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                    paymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50 shadow-lg transform scale-[1.02]'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-semibold text-gray-900">{method.name}</span>
                  {paymentMethod === method.id && (
                    <svg className="h-6 w-6 text-blue-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            <div className="flex items-start space-x-2">
              <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p><strong>{t('common.close')}:</strong> {t('common.paymentNote')}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-all hover:border-gray-400"
            >
              {t('booking.cancel')}
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-semibold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
            >
              {isProcessing ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('common.loading')}</span>
                </span>
              ) : (
                t('invoice.pay')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
