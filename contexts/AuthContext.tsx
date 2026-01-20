'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { firebaseSignIn, firebaseSignOut } from '@/lib/firebase'

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
    const authProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'mock'

    if (authProvider === 'firebase') {
      try {
        const userCredential = await firebaseSignIn(email, password)
        setIsAuthenticated(true)
        setUser({
          name: userCredential.displayName || email.split('@')[0] || 'User',
          email: userCredential.email || email,
          company: 'User Company',
          role: 'client',
        })
        return true
      } catch (error) {
        console.error('Firebase login error:', error)
        return false
      }
    }

    // Temporary: Allow login with any non-empty credentials for development/testing
    // TODO: Remove this and implement actual authentication before production
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
    const authProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'mock'
    if (authProvider === 'firebase') {
      firebaseSignOut().catch((error) => console.error('Firebase logout error:', error))
    }
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

