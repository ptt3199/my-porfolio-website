'use client'

import { StagewiseToolbar } from '@stagewise/toolbar-next'
import { ReactPlugin } from '@stagewise-plugins/react'

export default function StagewiseInit() {
  const config = {
    plugins: [ReactPlugin]
  }

  return <StagewiseToolbar config={config} />
} 