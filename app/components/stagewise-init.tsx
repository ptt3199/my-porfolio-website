'use client'

import { useEffect } from 'react'

const stagewiseConfig = {
  plugins: []
}

export default function StagewiseInit() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Use dynamic import to avoid SSR issues
      import('@stagewise/toolbar').then(({ initToolbar }) => {
        initToolbar(stagewiseConfig)
      }).catch(error => {
        console.log('Stagewise toolbar failed to load:', error)
      })
    }
  }, [])

  return null
} 