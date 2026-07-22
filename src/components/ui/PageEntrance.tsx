'use client'

import { useEffect, useState, useRef } from 'react'

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  const [skipEntrance, setSkipEntrance] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only show entrance on first visit per session
    if (sessionStorage.getItem('oios-entered')) {
      setSkipEntrance(true)
      setShow(true)
      return
    }

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSkipEntrance(true)
      setShow(true)
      sessionStorage.setItem('oios-entered', '1')
      return
    }

    // Run entrance sequence
    const overlay = overlayRef.current
    const logo = logoRef.current
    if (!overlay || !logo) return

    // Phase 1: Logo scales in (0 → 600ms)
    setTimeout(() => {
      logo.style.opacity = '1'
      logo.style.transform = 'translate(-50%, -50%) scale(1)'
    }, 100)

    // Phase 2: Logo fades + overlay lifts (800ms → 1400ms)
    setTimeout(() => {
      logo.style.opacity = '0'
      logo.style.transform = 'translate(-50%, -50%) scale(1.1)'
    }, 900)

    // Phase 3: Reveal content (1200ms)
    setTimeout(() => {
      setShow(true)
    }, 1200)

    // Phase 4: Remove overlay (1600ms)
    setTimeout(() => {
      overlay.style.opacity = '0'
      sessionStorage.setItem('oios-entered', '1')
    }, 1400)

    // Phase 5: Unmount overlay (2000ms)
    setTimeout(() => {
      setSkipEntrance(true)
    }, 1800)
  }, [])

  return (
    <>
      {/* Entrance overlay */}
      {!skipEntrance && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99990,
            background: '#000',
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        >
          {/* OIOS logo text */}
          <div
            ref={logoRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(0.8)',
              opacity: 0,
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                letterSpacing: '0.3em',
                color: '#2DD4BF',
                fontFamily: 'var(--font-display), sans-serif',
              }}
            >
              OIOS
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.2em',
                color: '#94A3B8',
                marginTop: 8,
              }}
            >
              OMNIA INTELLIGENCE AI
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <div
        style={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out)',
        }}
      >
        {children}
      </div>
    </>
  )
}
