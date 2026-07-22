'use client'

import { useEffect, useRef } from 'react'

// Ref-driven, rAF-coalesced — no React re-render per scroll tick
// (Lenis emits scroll events at very high frequency).
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId = 0
    function onScroll() {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const p = docHeight > 0 ? window.scrollY / docHeight : 0
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 will-change-transform"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
      />
    </div>
  )
}
