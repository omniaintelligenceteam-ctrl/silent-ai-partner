'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const hoveringCta = useRef(false)

  useEffect(() => {
    // Don't show on touch devices
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    // Hide default cursor
    document.documentElement.classList.add('custom-cursor-active')
    setVisible(true)

    function handleMouseMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      // wake the ring-follow loop if it went idle
      if (!raf) raf = requestAnimationFrame(animate)
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], [data-glow]'
      )
      const cta = target.closest('[data-cursor="cta"], .btn-glow')

      hovering.current = !!interactive
      hoveringCta.current = !!cta

      if (ringRef.current) {
        if (cta) {
          ringRef.current.classList.add('cursor-ring-cta')
          ringRef.current.classList.add('cursor-ring-hover')
        } else if (interactive) {
          ringRef.current.classList.remove('cursor-ring-cta')
          ringRef.current.classList.add('cursor-ring-hover')
        } else {
          ringRef.current.classList.remove('cursor-ring-hover')
          ringRef.current.classList.remove('cursor-ring-cta')
        }
      }
    }

    function handleMouseLeave() {
      setVisible(false)
    }

    function handleMouseEnter() {
      setVisible(true)
    }

    // Ring follows with lerp for smooth trailing.
    // The loop idles once the ring settles (< 0.1px delta) and is woken by mousemove.
    let raf = 0
    function animate() {
      const dx = pos.current.x - ringPos.current.x
      const dy = pos.current.y - ringPos.current.y
      ringPos.current.x += dx * 0.15
      ringPos.current.y += dy * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        raf = requestAnimationFrame(animate)
      } else {
        raf = 0
      }
    }
    raf = requestAnimationFrame(animate)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          backgroundColor: '#2DD4BF',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring — follows with spring delay */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: '1.5px solid rgba(45, 212, 191, 0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease, margin 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
        }}
      />
    </>
  )
}
