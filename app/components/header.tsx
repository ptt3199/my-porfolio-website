'use client'

import { Moon, Sun, Music2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMusicPlayer } from '../contexts/music-context'

const NAV_ITEMS = [
  { href: '/', text: 'Home' },
  { href: '/resume', text: 'Resume' },
  { href: '/projects', text: 'Projects' },
  { href: '/notes', text: 'Notes' },
  { href: '/contact', text: 'Ping Me' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isPlaying, togglePlay } = useMusicPlayer()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration errors by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <header className="fixed top-0 right-0 p-4 z-50">
        <div className="flex items-center gap-4 p-2 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          {!isHome && (
            <nav className="flex items-center gap-6 mr-4">
              {NAV_ITEMS.map(({ href, text }) => (
                <Link
                  key={text}
                  href={href}
                  className="relative text-lg font-medium hover:text-primary dark:hover:text-secondary transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary dark:after:bg-secondary after:transition-all hover:after:w-full"
                >
                  {text}
                </Link>
              ))}
            </nav>
          )}
          <div className="w-10 h-10" /> {/* Placeholder for theme toggle */}
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 right-0 p-4 z-50">
      <div className="flex items-center gap-4 p-2 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {!isHome && (
          <nav className="flex items-center gap-6 mr-4">
            {NAV_ITEMS.map(({ href, text }) => (
              <Link
                key={text}
                href={href}
                className="relative text-lg font-medium hover:text-primary dark:hover:text-secondary transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary dark:after:bg-secondary after:transition-all hover:after:w-full"
              >
                {text}
              </Link>
            ))}
          </nav>
        )}
        
        <button
          onClick={togglePlay}
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          <div className="relative">
            <Music2
              className={`h-6 w-6 ${isPlaying ? 'text-primary dark:text-secondary' : 'text-gray-600 dark:text-gray-400'}`}
            />
            {isPlaying && (
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex gap-[2px]">
                <div className="w-[2px] h-2 bg-primary dark:bg-secondary animate-music-bar1" />
                <div className="w-[2px] h-2 bg-primary dark:bg-secondary animate-music-bar2" />
                <div className="w-[2px] h-2 bg-primary dark:bg-secondary animate-music-bar3" />
              </div>
            )}
          </div>
        </button>

      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Toggle theme"
      >
          {theme === 'dark' ? (
            <Moon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          )}
      </button>
      </div>
    </header>
  )
}
