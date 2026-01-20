'use client'

import { useState, useContext } from 'react'
import { useDashboard } from './DashboardLayout'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAdminSettings } from '@/contexts/AdminSettingsContext'

export default function DashboardSidebar() {
  const { activePage, setActivePage } = useDashboard()
  const { t } = useLanguage()

  const navItems = [
    {
      name: 'Overview',
      label: t('dashboard.overview'),
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      name: 'Bookings',
      label: t('dashboard.bookingsPage'),
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      name: 'Reports',
      label: t('dashboard.reports'),
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'Invoices',
      label: t('dashboard.invoicesPage'),
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shadow-sm">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = activePage === item.name
          return (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                {item.icon}
              </span>
              <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Help Section */}
      <div className="p-4 m-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900 mb-1">{t('support.needHelp')}</div>
            <p className="text-xs text-gray-600 mb-3">{t('support.available')}</p>
            <HelpButton />
          </div>
        </div>
      </div>
    </aside>
  )
}

function HelpButton() {
  const [showHelp, setShowHelp] = useState(false)
  const { t } = useLanguage()
  
  return (
    <>
      <button 
        onClick={() => setShowHelp(true)}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] font-medium"
      >
        {t('support.contact')}
      </button>
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)} />
      )}
    </>
  )
}

function HelpModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  const { settings } = useAdminSettings()
  const whatsappLink = `https://wa.me/${settings.whatsappNumber}`
  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(whatsappLink)}`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('support.contact')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">{t('support.available')}</p>
            <div className="space-y-2">
              <a 
                href={`mailto:${settings.supportEmail}`} 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2"
              >
                <span>📧</span>
                <span>{t('support.email')}</span>
              </a>
              <div className="hidden md:block">
                <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-center">
                  <img src={whatsappQr} alt={t('support.whatsappQrAlt')} className="w-40 h-40" />
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center dark:text-gray-200">{t('support.scanToChat')}</p>
              </div>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center space-x-2 md:hidden"
              >
                <span>💬</span>
                <span>{t('support.whatsappChat')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
