'use client'

import { useState } from 'react'
import { Lock, Unlock, Eye, EyeOff, Loader, X } from 'lucide-react'
import { useAdminAuth } from '../contexts/AdminAuthContext'

export function AdminLogin() {
  const { isAuthenticated, login, logout, isAuthenticating } = useAdminAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const success = await login(password)
    if (success) {
      setPassword('')
      setIsOpen(false)
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    logout()
    setPassword('')
    setError('')
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
        title="Logout Admin"
      >
        <Unlock className="h-6 w-6" />
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
        title="Admin Login"
      >
        <Lock className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Admin Login
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 pr-10"
                      placeholder="Enter admin password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  {isAuthenticating ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 