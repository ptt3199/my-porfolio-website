'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

interface MusicContextType {
  isPlaying: boolean
  player: YT.Player | null
  togglePlay: () => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<YT.Player | null>(null)
  const playerElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create player element if it doesn't exist
    if (!document.getElementById('youtube-player')) {
      const playerElement = document.createElement('div')
      playerElement.id = 'youtube-player'
      document.body.appendChild(playerElement)
      playerElementRef.current = playerElement
    }

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    const initPlayer = () => {
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

    // Handle API ready event
    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
    }

    // Cleanup
    return () => {
      if (player) {
        player.destroy()
        setPlayer(null)
      }
      // Safely remove player element
      if (playerElementRef.current && playerElementRef.current.parentNode) {
        playerElementRef.current.parentNode.removeChild(playerElementRef.current)
      }
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

  return (
    <MusicContext.Provider value={{ isPlaying, player, togglePlay }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusicPlayer() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicProvider')
  }
  return context
} 