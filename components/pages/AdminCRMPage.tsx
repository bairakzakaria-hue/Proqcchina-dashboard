'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { useAdminSettings } from '@/contexts/AdminSettingsContext'

type BookingStatus = 'paid' | 'due' | 'pending' | 'cancelled' | 'completed'

type CRMBooking = {
  id: string
  clientName: string
  service: string
  status: BookingStatus
  paymentStatus: BookingStatus
  email: string
  company: string
  phone: string
  createdAt: string
}

type CRMUserRole = 'admin' | 'coadmin' | 'client'

type CRMUser = {
  id: string
  name: string
  email: string
  company: string
  phone: string
  role: CRMUserRole
}

const defaultBookings: CRMBooking[] = []
const defaultUsers: CRMUser[] = []

export default function AdminCRMPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { settings, updateSettings, updatePaymentMethods } = useAdminSettings()
  const [bookings, setBookings] = useState<CRMBooking[]>(defaultBookings)
  const [users, setUsers] = useState<CRMUser[]>(defaultUsers)

  const isAdmin = user?.role === 'admin'
  const isCoAdmin = user?.role === 'coadmin'
  const canEditBookings = isAdmin || isCoAdmin
  const canEditUsers = isAdmin || isCoAdmin

  const [newBooking, setNewBooking] = useState({
    clientName: '',
    service: '',
    status: 'pending' as BookingStatus,
    paymentStatus: 'pending' as BookingStatus,
    email: '',
    company: '',
    phone: '',
  })

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    role: 'client' as CRMUserRole,
  })

  useEffect(() => {
    const storedBookings = localStorage.getItem('crm_bookings')
    if (storedBookings) {
      const parsed = JSON.parse(storedBookings) as CRMBooking[]
      setBookings(
        parsed.map((booking) => ({
          paymentStatus: booking.paymentStatus || 'pending',
          createdAt: booking.createdAt || new Date().toISOString(),
          ...booking,
        }))
      )
    }
    const storedUsers = localStorage.getItem('crm_users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('crm_bookings', JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    localStorage.setItem('crm_users', JSON.stringify(users))
  }, [users])

  const statusOptions = useMemo<BookingStatus[]>(
    () => ['paid', 'due', 'pending', 'cancelled', 'completed', 'ready'],
    []
  )

  if (!isAdmin && !isCoAdmin) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900">{t('crm.accessDenied')}</h2>
        <p className="text-sm text-gray-600 mt-2">{t('crm.accessDeniedHint')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('crm.title')}</h1>
        <p className="text-gray-600 mt-2">{t('crm.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{t('crm.bookings')}</h2>
          </div>

          {canEditBookings && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                value={newBooking.clientName}
                onChange={(e) => setNewBooking({ ...newBooking, clientName: e.target.value })}
                placeholder={t('crm.clientName')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={newBooking.service}
                onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                placeholder={t('crm.service')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                value={newBooking.email}
                onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                placeholder={t('crm.email')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={newBooking.company}
                onChange={(e) => setNewBooking({ ...newBooking, company: e.target.value })}
                placeholder={t('crm.company')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={newBooking.phone}
                onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                placeholder={t('crm.phone')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newBooking.status}
                onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value as BookingStatus })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {t(`status.${status}`)}
                  </option>
                ))}
              </select>
              <select
                value={newBooking.paymentStatus}
                onChange={(e) => setNewBooking({ ...newBooking, paymentStatus: e.target.value as BookingStatus })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {t(`status.${status}`)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  if (!newBooking.clientName || !newBooking.service) return
                  setBookings([
                    {
                      id: `BK-${Date.now()}`,
                      ...newBooking,
                      createdAt: new Date().toISOString(),
                    },
                    ...bookings,
                  ])
                  setNewBooking({
                    clientName: '',
                    service: '',
                    status: 'pending',
                    paymentStatus: 'pending',
                    email: '',
                    company: '',
                    phone: '',
                  })
                }}
                className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {t('crm.addBooking')}
              </button>
            </div>
          )}

          <div className="space-y-3">
            {bookings.length === 0 && (
              <p className="text-sm text-gray-500">{t('crm.noBookings')}</p>
            )}
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{booking.clientName}</div>
                    <div className="text-sm text-gray-600">{booking.service}</div>
                    <div className="text-xs text-gray-500">{booking.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                  <select
                    value={booking.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as BookingStatus
                      setBookings((prev) =>
                        prev.map((item) => (item.id === booking.id ? { ...item, status: nextStatus } : item))
                      )
                    }}
                    disabled={!canEditBookings}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {t(`status.${status}`)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={booking.paymentStatus}
                    onChange={(e) => {
                      const nextStatus = e.target.value as BookingStatus
                      setBookings((prev) =>
                        prev.map((item) =>
                          item.id === booking.id ? { ...item, paymentStatus: nextStatus } : item
                        )
                      )
                    }}
                    disabled={!canEditBookings}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {t(`status.${status}`)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (booking.paymentStatus !== 'paid') {
                        alert(t('crm.downloadLocked'))
                        return
                      }
                      const blob = new Blob([`Report for ${booking.service}`], { type: 'application/pdf' })
                      const url = URL.createObjectURL(blob)
                      const link = document.createElement('a')
                      link.href = url
                      link.download = `${booking.id}_report.pdf`
                      link.click()
                      URL.revokeObjectURL(url)

                      setBookings((prev) =>
                        prev.map((item) =>
                          item.id === booking.id ? { ...item, status: 'ready' } : item
                        )
                      )
                    }}
                    className="px-3 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    {t('crm.downloadReport')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{t('crm.users')}</h2>
          </div>

          {canEditUsers && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder={t('crm.fullName')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder={t('crm.email')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={newUser.company}
                onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                placeholder={t('crm.company')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder={t('crm.phone')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as CRMUserRole })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
                disabled={!isAdmin}
              >
                <option value="client">{t('crm.roleClient')}</option>
                <option value="coadmin">{t('crm.roleCoAdmin')}</option>
                <option value="admin">{t('crm.roleAdmin')}</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  if (!newUser.name || !newUser.email) return
                  setUsers([
                    {
                      id: `USR-${Date.now()}`,
                      ...newUser,
                    },
                    ...users,
                  ])
                  setNewUser({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    role: 'client',
                  })
                }}
                className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {t('crm.addUser')}
              </button>
            </div>
          )}

          <div className="space-y-3">
            {users.length === 0 && (
              <p className="text-sm text-gray-500">{t('crm.noUsers')}</p>
            )}
            {users.map((account) => (
              <div key={account.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{account.name}</div>
                    <div className="text-xs text-gray-500">{account.email}</div>
                  </div>
                  <div className="text-xs font-semibold text-gray-600 uppercase">{account.role}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  <input
                    type="text"
                    value={account.name}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((item) => (item.id === account.id ? { ...item, name: e.target.value } : item))
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled={!canEditUsers}
                  />
                  <input
                    type="email"
                    value={account.email}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((item) => (item.id === account.id ? { ...item, email: e.target.value } : item))
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled={!canEditUsers}
                  />
                  <input
                    type="text"
                    value={account.company}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((item) => (item.id === account.id ? { ...item, company: e.target.value } : item))
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled={!canEditUsers}
                  />
                  <input
                    type="text"
                    value={account.phone}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((item) => (item.id === account.id ? { ...item, phone: e.target.value } : item))
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled={!canEditUsers}
                  />
                  <select
                    value={account.role}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((item) =>
                          item.id === account.id ? { ...item, role: e.target.value as CRMUserRole } : item
                        )
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled={!isAdmin}
                  >
                    <option value="client">{t('crm.roleClient')}</option>
                    <option value="coadmin">{t('crm.roleCoAdmin')}</option>
                    <option value="admin">{t('crm.roleAdmin')}</option>
                  </select>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setUsers((prev) => prev.filter((item) => item.id !== account.id))}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm"
                    >
                      {t('crm.deleteUser')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {isAdmin && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('crm.settings')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">{t('crm.supportEmail')}</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => updateSettings({ supportEmail: e.target.value })}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">{t('crm.supportWhatsApp')}</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('crm.paymentMethods')}</h3>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.paymentMethods.paypal}
                  onChange={(e) => updatePaymentMethods({ paypal: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">PayPal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.paymentMethods.skrill}
                  onChange={(e) => updatePaymentMethods({ skrill: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Skrill</span>
              </label>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
