'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const btnRef = useRef<HTMLDivElement>(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisabled(true)
    }
  }, [])

  function handleMouseMove(e: React.MouseEvent) {
    if (disabled || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btnRef.current.style.transform =
      `translate(${x * strength}px, ${y * strength}px)`
  }

  function handleMouseLeave() {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0, 0)'
    }
  }

  return (
    <div
      ref={btnRef}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
