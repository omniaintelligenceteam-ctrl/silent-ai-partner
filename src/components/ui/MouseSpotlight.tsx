'use client'

import { useEffect, useRef, useState } from 'react'

// A pre-painted radial layer moved with transform only — rewriting the
// background gradient per frame forced a full-viewport repaint.
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
          spotlightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={spotlightRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1600,
          height: 1600,
          marginLeft: -800,
          marginTop: -800,
          background:
            'radial-gradient(800px circle at center, rgba(249,115,22,0.04), transparent 60%)',
          willChange: 'transform',
          transform: 'translate(-1000px, -1000px)',
        }}
      />
    </div>
  )
}
