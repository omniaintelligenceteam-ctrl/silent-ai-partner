'use client'

import { useEffect } from 'react'

export function PointerGlow() {
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Coalesce var writes to one per frame — root-level setProperty invalidates
    // computed styles for every [data-glow] consumer.
    let rafId = 0
    let lastX = 0
    let lastY = 0
    const handler = (e: PointerEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const s = document.documentElement.style
        s.setProperty('--glow-x', lastX.toFixed(2))
        s.setProperty('--glow-y', lastY.toFixed(2))
        s.setProperty('--glow-xp', (lastX / window.innerWidth).toFixed(2))
      })
    }
    document.addEventListener('pointermove', handler, { passive: true })
    return () => {
      document.removeEventListener('pointermove', handler)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
