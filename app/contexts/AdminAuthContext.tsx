'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import CryptoJS from 'crypto-js'

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
  isAuthenticating: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const hashPassword = (password: string) => {
    return CryptoJS.SHA256(password).toString()
  }

  const login = async (password: string): Promise<boolean> => {
    setIsAuthenticating(true)
    
    try {
      const hashedPassword = hashPassword(password)
      const response = await fetch('/api/auth/quick-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: hashedPassword })
      })

      if (response.ok) {
        setIsAuthenticated(true)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Authentication error:', error)
      return false
    } finally {
      setIsAuthenticating(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      isAuthenticating
    }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
} 