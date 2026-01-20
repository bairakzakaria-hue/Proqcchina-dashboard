'use client'

import { useState } from 'react'
import { useDashboard } from './DashboardLayout'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useAdminSettings } from '@/contexts/AdminSettingsContext'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'

export default function DashboardHeader() {
  const { searchQuery, setSearchQuery } = useDashboard()
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showBookingGuidance, setShowBookingGuidance] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Logo size="sm" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ProQCChina
          </span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('dashboard.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowBookingGuidance(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
          >
            {t('dashboard.bookingGuidance')}
          </button>
          
          {/* Language Selector */}
          <LanguageSelector />

          <div className="relative">
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-gray-900">{user?.name || t('dashboard.welcome')}</div>
                <div className="text-xs text-gray-500">{user?.company || user?.email || ''}</div>
              </div>
              <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showProfileDropdown && (
              <ProfileDropdown
                onClose={() => setShowProfileDropdown(false)}
                onLogout={logout}
                user={user}
                onOpenProfileSettings={() => {
                  setShowProfileSettings(true)
                  setShowProfileDropdown(false)
                }}
              />
            )}
          </div>
        </div>
      </header>

      {showBookingGuidance && (
        <BookingGuidanceModal onClose={() => setShowBookingGuidance(false)} />
      )}

      {showProfileSettings && (
        <ProfileSettingsModal 
          user={user} 
          onClose={() => setShowProfileSettings(false)} 
        />
      )}
    </>
  )
}

function ProfileDropdown({ 
  onClose, 
  onLogout, 
  user,
  onOpenProfileSettings,
}: { 
  onClose: () => void
  onLogout: () => void
  user: { name: string; email: string; company: string; role: string } | null
  onOpenProfileSettings: () => void
}) {
  const { t } = useLanguage()
  
  const handleLogout = () => {
    onLogout()
    onClose()
  }

  return (
    <>
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-200 z-50 animate-slideIn">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <p className="text-sm font-bold text-gray-900">{user?.name || ''}</p>
          {user?.email && <p className="text-xs text-gray-500 mt-1">{user.email}</p>}
          {user?.company && <p className="text-xs text-gray-400 mt-0.5">{user.company}</p>}
      </div>
      <div className="p-2">
          <button 
            onClick={() => {
              onOpenProfileSettings()
            }}
            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all font-medium"
          >
          <div className="flex items-center space-x-3">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
              <span>{t('settings.profile')}</span>
          </div>
          </button>
        <div className="border-t border-gray-200 my-2"></div>
        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all font-semibold flex items-center space-x-3"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sign out</span>
        </button>
        </div>
      </div>
    </>
  )
}

function ProfileSettingsModal({ 
  user, 
  onClose 
}: { 
  user: { name: string; email: string; company: string; role: string } | null
  onClose: () => void 
}) {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    additionalEmail: '',
    phone: '',
    company: user?.company || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        alert(t('settings.currentPasswordRequired'))
        return
      }
      if (formData.newPassword !== formData.confirmPassword) {
        alert(t('settings.passwordMismatch'))
        return
      }
    }
    setIsSaving(true)
    // TODO: Replace with actual API call to update user profile
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    onClose()
    // TODO: Update user context with new data
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview)
    }
    setProfilePreview(URL.createObjectURL(file))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('settings.profile')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {profilePreview ? (
                <img src={profilePreview} alt={t('settings.profilePhoto')} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">IMG</span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.profilePhoto')}</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full text-sm text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-300">{t('settings.photoHint')}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.name')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.loginEmail')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.additionalEmail')}</label>
            <input
              type="email"
              value={formData.additionalEmail}
              onChange={(e) => setFormData({ ...formData, additionalEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.whatsappNumber')}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t('settings.whatsappNumberHint')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.company')}</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 dark:text-gray-100">{t('settings.changePassword')}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.currentPassword')}</label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.newPassword')}</label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">{t('settings.confirmPassword')}</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('settings.darkMode')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{t('settings.darkModeHint')}</div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={t('settings.darkMode')}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              {t('common.close')}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSaving ? t('settings.saving') : t('settings.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function BookingGuidanceModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  const { settings } = useAdminSettings()
  const whatsappLink = `https://wa.me/${settings.whatsappNumber}`
  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(whatsappLink)}`
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard.bookingGuidance')}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 dark:text-gray-100">{t('booking.howToBook')}</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-200">
              <li>{t('booking.step1')}</li>
              <li>{t('booking.step2')}</li>
              <li>{t('booking.step3')}</li>
              <li>{t('booking.step4')}</li>
              <li>{t('booking.step5')}</li>
              <li>{t('booking.step6')}</li>
              <li>{t('booking.step7')}</li>
              <li>{t('booking.step8')}</li>
            </ol>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 dark:text-gray-100">{t('booking.availableServices')}</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
              <li>• <strong>{t('service.factoryAudit')}:</strong> {t('service.factoryAuditDescription')}</li>
              <li>• <strong>{t('service.preShipment')}:</strong> {t('service.preShipmentDescription')}</li>
              <li>• <strong>{t('service.duringProduction')}:</strong> {t('service.duringProductionDescription')}</li>
              <li>• <strong>{t('service.containerLoading')}:</strong> {t('service.containerLoadingDescription')}</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 dark:text-gray-100">{t('support.needHelp')}</h4>
            <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">{t('support.available')}</p>
            <div className="space-y-2">
              <a
                href={`mailto:${settings.supportEmail}`}
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {t('support.email')}
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
                className="inline-flex items-center justify-center w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium md:hidden"
              >
                {t('support.whatsappChat')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
