'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

export function TiltCard({
  children,
  className = '',
  maxTilt = 5,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
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
    if (disabled || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
