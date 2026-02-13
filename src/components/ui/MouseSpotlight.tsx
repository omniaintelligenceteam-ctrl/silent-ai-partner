'use client'

import { useEffect, useRef, useState } from 'react'

export function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let rafId: number
    function onMouseMove(e: MouseEvent) {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background =
            `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(249,115,22,0.04), transparent 60%)`
        }
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
