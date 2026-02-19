'use client'

import { useEffect } from 'react'

export function PointerGlow() {
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handler = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--glow-x', e.clientX.toFixed(2))
      document.documentElement.style.setProperty('--glow-y', e.clientY.toFixed(2))
      document.documentElement.style.setProperty('--glow-xp', (e.clientX / window.innerWidth).toFixed(2))
    }
    document.addEventListener('pointermove', handler, { passive: true })
    return () => document.removeEventListener('pointermove', handler)
  }, [])

  return null
}
