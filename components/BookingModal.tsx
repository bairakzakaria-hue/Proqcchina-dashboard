'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface BookingModalProps {
  service: string
  onClose: () => void
}

export default function BookingModal({ service, onClose }: BookingModalProps) {
  const { t } = useLanguage()
  const [showThankYou, setShowThankYou] = useState(false)
  const [neverShowThankYou, setNeverShowThankYou] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    additionalNotes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const savedPreference = typeof window !== 'undefined' ? localStorage.getItem('bookingThankYouHidden') : null
    setNeverShowThankYou(savedPreference === 'true')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call to WordPress or your backend
      // Example:
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ service, ...formData })
      // })
      // const data = await response.json()
      // if (data.success) {
      //   setSubmitted(true)
      //   setTimeout(() => {
      //     onClose()
      //     setSubmitted(false)
      //     setFormData({
      //       companyName: '', contactName: '', email: '', phone: '', additionalNotes: ''
      //     })
      //   }, 2000)
      // } else {
      //   alert('Error: ' + data.message)
      //   setIsSubmitting(false)
      // }
      
      // Placeholder - remove this and implement actual booking submission
      setIsSubmitting(false)
      setSubmitted(true)
      if (!neverShowThankYou) {
        setShowThankYou(true)
        window.setTimeout(() => {
          setShowThankYou(false)
        }, 5000)
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      setIsSubmitting(false)
      alert('An error occurred. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-100">{t('booking.submitted')}</h3>
          <p className="text-gray-600 dark:text-gray-200">{t('booking.success', { service })}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('booking.bookService', { service })}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">{t('booking.companyName')} *</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">{t('booking.contactName')} *</label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">{t('auth.email')} *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">{t('booking.whatsappNumber')} *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">{t('booking.additionalNotes')}</label>
            <textarea
              rows={3}
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium dark:text-gray-200"
            >
              {t('booking.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('booking.submitting') : t('booking.submit')}
            </button>
          </div>
        </form>
      </div>

      {showThankYou && (
        <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 max-w-sm w-full animate-fadeIn">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t('booking.thankYouTitle')}</div>
              <p className="text-sm text-gray-700 mt-1 dark:text-gray-200">{t('booking.thankYouMessage', { service })}</p>
            </div>
            <button onClick={() => setShowThankYou(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <label className="flex items-center text-xs text-gray-600 mt-3 dark:text-gray-200">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={(e) => {
                const checked = e.target.checked
                setNeverShowThankYou(checked)
                if (checked) {
                  localStorage.setItem('bookingThankYouHidden', 'true')
                  setShowThankYou(false)
                } else {
                  localStorage.removeItem('bookingThankYouHidden')
                }
              }}
            />
            <span className="ml-2 rtl:ml-0 rtl:mr-2">{t('booking.neverShowAgain')}</span>
          </label>
        </div>
      )}
    </div>
  )
}

