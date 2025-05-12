'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, RefreshCw, Music2 } from 'lucide-react'
import quotes from '../data/quotes.json'

export function Footer() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<YT.Player | null>(null)

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        playerVars: {
          listType: 'playlist',
          list: process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
        },
        events: {
          onStateChange: event => {
            setIsPlaying(event.data === YT.PlayerState.PLAYING)
          },
        },
      })
      setPlayer(newPlayer)
    }

    return () => {
      player?.destroy()
    }
  }, [])

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
    }
  }

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

        {/* Music Player */}
        <div className="flex items-center space-x-4">
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

      {/* Hidden YouTube Player */}
      <div id="youtube-player" />
    </footer>
  )
}
