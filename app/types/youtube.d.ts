declare namespace YT {
  interface PlayerOptions {
    height?: string | number
    width?: string | number
    videoId?: string
    playerVars?: {
      listType?: string
      list?: string
      controls?: number
      showinfo?: number
      modestbranding?: number
      loop?: number
      autoplay?: number
    }
    events?: {
      onReady?: (event: { target: Player }) => void
      onStateChange?: (event: { data: number; target: Player }) => void
      onError?: (event: { data: number }) => void
    }
  }

  class Player {
    constructor(elementId: string, options: PlayerOptions)
    playVideo(): void
    pauseVideo(): void
    destroy(): void
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }
}

interface Window {
  YT: typeof YT
  onYouTubeIframeAPIReady: () => void
}
