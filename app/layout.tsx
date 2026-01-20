import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AdminSettingsProvider } from '@/contexts/AdminSettingsContext'

export const metadata: Metadata = {
  title: 'ProQCChina - Optimizing your China procurement operations',
  description: 'ProQCChina delivers quality inspection and supplier verification for China imports with certified inspectors and trusted legal partners.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <AdminSettingsProvider>
                {children}
              </AdminSettingsProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

