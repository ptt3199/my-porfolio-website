'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, RefreshCw } from 'lucide-react'
import quotes from '../data/quotes.json'

export function Footer() {
  const [quoteIndex, setQuoteIndex] = useState(0)

  const nextQuote = () => {
    setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.quotes.length)
  }

  useEffect(() => {
    const interval = setInterval(nextQuote, 10000)
    return () => clearInterval(interval)
  }, [])

  const currentQuote = quotes.quotes[quoteIndex]

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        {/* Quote */}
        <div className="flex items-center space-x-3">
          <div className="text-center">
            <p className="text-sm italic text-gray-600 dark:text-gray-400">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <p className="text-xs text-gray-500 mt-1">— {currentQuote.author}</p>
          </div>
          <button
            onClick={nextQuote}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Next quote"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* System Diagram */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-3 text-xs">
            <span className="font-medium text-primary dark:text-secondary">FastAPI</span>
            <ArrowRight className="h-3 w-3" />
            <span className="font-medium text-primary dark:text-secondary">Celery</span>
            <ArrowRight className="h-3 w-3" />
            <span className="font-medium text-primary dark:text-secondary">Redis</span>
            <ArrowRight className="h-3 w-3" />
            <span className="font-medium text-primary dark:text-secondary">PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
