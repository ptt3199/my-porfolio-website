'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Home, Bug, Coffee } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [bugPosition, setBugPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    setMounted(true)
    // Random bug movement
    const interval = setInterval(() => {
      setBugPosition({
        x: Math.random() * 80 + 10, // Keep within 10-90% of container
        y: Math.random() * 80 + 10,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      {/* Moving bug */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          left: `${bugPosition.x}%`,
          top: `${bugPosition.y}%`,
          transform: 'translate(-50%, -50%) rotate(45deg)',
        }}
      >
        <Bug className="w-8 h-8 text-primary dark:text-secondary animate-bounce" />
      </div>

      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center relative">
        <div className="text-center space-y-8">
          {/* Coffee cup */}
          <div className="relative mx-auto w-24 h-24">
            <Coffee className="w-24 h-24 text-primary dark:text-secondary animate-pulse" />
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="animate-steam opacity-0 absolute -left-2">～</div>
                <div className="animate-steam animation-delay-300 opacity-0 absolute left-0">～</div>
                <div className="animate-steam animation-delay-600 opacity-0 absolute left-2">～</div>
              </div>
            </div>
          </div>

          {/* Error message */}
          <div className="space-y-4">
            <h1 className="text-8xl font-bold text-primary dark:text-secondary">404</h1>
            <h2 className="text-2xl font-semibold">Oops! Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Looks like this page took a coffee break! Our debugging bug is searching for it, but
              maybe you should head back home for now.
            </p>
          </div>

          {/* Home button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary dark:bg-secondary text-white hover:bg-accent hover:dark:bg-accent transition-colors duration-200 group"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 