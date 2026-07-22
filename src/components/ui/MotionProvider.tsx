'use client'

import { MotionConfig } from 'motion/react'

// Honors OS-level prefers-reduced-motion for every Framer Motion animation
// site-wide: transform/layout animations are dropped, opacity/color kept.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
