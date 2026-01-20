'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
type UserRole = 'admin' | 'coadmin' | 'client'

interface AuthContextType {
  isAuthenticated: boolean
  user: { name: string; email: string; company: string; role: UserRole } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; company: string; role: UserRole } | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo-only auth: allow login with any non-empty credentials.
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay

    if (email && password) {
      const normalizedEmail = email.toLowerCase()
      const role: UserRole = normalizedEmail.includes('admin')
        ? 'admin'
        : normalizedEmail.includes('coadmin')
          ? 'coadmin'
          : 'client'
      setIsAuthenticated(true)
      setUser({
        name: email.split('@')[0] || 'User',
        email: email,
        company: 'User Company',
        role,
      })
      return true
    }

    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

