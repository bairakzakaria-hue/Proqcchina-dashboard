'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type PaymentMethods = {
  paypal: boolean
  skrill: boolean
}

export type AdminSettings = {
  supportEmail: string
  whatsappNumber: string
  paymentMethods: PaymentMethods
}

type AdminSettingsContextType = {
  settings: AdminSettings
  updateSettings: (next: Partial<AdminSettings>) => void
  updatePaymentMethods: (next: Partial<PaymentMethods>) => void
}

const defaultSettings: AdminSettings = {
  supportEmail: 'Contact@proqcchina.com',
  whatsappNumber: '8618588554463',
  paymentMethods: {
    paypal: true,
    skrill: true,
  },
}

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined)

export function AdminSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('adminSettings') : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<AdminSettings>
        setSettings({
          ...defaultSettings,
          ...parsed,
          paymentMethods: {
            ...defaultSettings.paymentMethods,
            ...(parsed.paymentMethods || {}),
          },
        })
      } catch {
        setSettings(defaultSettings)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('adminSettings', JSON.stringify(settings))
  }, [settings])

  const value = useMemo<AdminSettingsContextType>(
    () => ({
      settings,
      updateSettings: (next) => {
        setSettings((current) => ({
          ...current,
          ...next,
        }))
      },
      updatePaymentMethods: (next) => {
        setSettings((current) => ({
          ...current,
          paymentMethods: {
            ...current.paymentMethods,
            ...next,
          },
        }))
      },
    }),
    [settings]
  )

  return <AdminSettingsContext.Provider value={value}>{children}</AdminSettingsContext.Provider>
}

export function useAdminSettings() {
  const context = useContext(AdminSettingsContext)
  if (!context) {
    throw new Error('useAdminSettings must be used within AdminSettingsProvider')
  }
  return context
}
