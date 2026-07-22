'use client'

import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RotatingText } from '@/components/ui/RotatingText'
import { Spotlight } from '@/components/ui/spotlight'
import { SplineScene } from '@/components/ui/splite'
import { Boxes } from '@/components/ui/background-boxes'
import { ArrowRight, Cpu } from 'lucide-react'

// ─── Spline robot scene ──────────────────────────────────────────────────────────────
// Public Spline demo robot (follows the cursor). Swap for the branded export when ready:
// app.spline.design → Export → copy the production .splinecode URL.
const HERO_SPLINE_SCENE: string = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

// ─── Hero 3D visual ──────────────────────────────────────────────────────────────────
// Lazy-loads the Spline robot only when it nears the viewport, and skips the heavy 3D
// runtime entirely for reduced-motion users. While it loads, SplineScene shows its own
// spinner.
function HeroSplineVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    // Respect reduced-motion — never mount the heavy 3D runtime.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    // Lazy-load via IntersectionObserver — only mount Spline near the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScene(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0">
      {showScene && <SplineScene scene={HERO_SPLINE_SCENE} className="h-full w-full" />}
    </div>
  )
}

// ─── Hero Section ──────────────────────────────────────────────────────────────────
export function Hero() {
  const reduceMotion = useReducedMotion()
  const animate = !reduceMotion

  return (
    <section className="relative min-h-screen bg-bg-primary flex flex-col">
      {/* ── Background: animated boxes grid (aceternity) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Boxes />

        {/* bottom fade so the hero bleeds cleanly into the next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
        />
      </div>

      {/* ── Foreground content (copy + 3D robot, stacked) ── */}
      <div
        className="relative z-10 flex-1 w-full max-w-6xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-32 pb-16"
      >
        {/* Copy + CTAs */}
        <div className="flex flex-col items-center text-center">
          {/* Badge pill */}
          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/20 mb-7"
          >
            <Cpu className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-slate-200">
              Month-to-month. You own everything we build.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={animate ? { opacity: 0, y: 24 } : false}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <span className="gradient-text-hero">Your AI Operating System.</span>
            <span className="mt-2 block">
              <RotatingText
                phrases={['Installed.', 'Running.', 'Shipping monthly.', 'On retainer.']}
                className="gradient-text-warm"
              />
            </span>
          </motion.h1>

          {/* Sub-paragraph */}
          <motion.p
            initial={animate ? { opacity: 0, y: 24 } : false}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-7 max-w-xl text-base sm:text-lg text-gray-300/80 leading-relaxed"
          >
            We build the software you need, run the operations you can&apos;t afford to hire for, and
            ship something new every 30 days. Phones, scheduling, sales, marketing, ops, finance &mdash;
            running 24/7.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={animate ? { opacity: 0, y: 24 } : false}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-col sm:flex-row items-center gap-3"
          >
            <Link href="/form">
              <button className="bg-white text-black font-semibold py-3.5 px-8 rounded-2xl transition duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto">
                Start Month 1
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* 3D robot — right under the hero, lit by a soft backlight so it reads
            against the boxes (not the orb — just enough glow to keep it visible) */}
        <motion.div
          initial={animate ? { opacity: 0, y: 40 } : false}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 sm:mt-8 w-full"
        >
          <div className="relative h-[420px] sm:h-[520px] w-full overflow-hidden">
            {/* soft teal backlight behind the robot */}
            <div
              className="absolute left-1/2 top-1/2 h-72 w-72 sm:h-96 sm:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(45,212,191,0.20) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#2DD4BF" />
            <HeroSplineVisual />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
