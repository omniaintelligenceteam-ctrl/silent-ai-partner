'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-bg-primary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="hero-mesh"></div>
        <div className="hero-grid absolute inset-0"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="page-enter page-enter-1">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/30 border border-slate-700/30 mb-10">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400">
                  THE AI OFFICE MANAGER FOR CONTRACTORS
                </span>
              </div>
            </div>

            <div className="page-enter page-enter-2">
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-8" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                <span className="text-white">Pay 93% less.</span>
                <br />
                <span className="gradient-text-shimmer">She makes the rest.</span>
              </h1>
            </div>

            <div className="page-enter page-enter-3">
              {/* Subheadline */}
              <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
                The average office manager costs $62,500/yr. Sarah costs $397/mo.
                She books your jobs, upsells your services, and grows your business while you&apos;re in the field.
              </p>
            </div>

            <div className="page-enter page-enter-4">
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <MagneticButton>
                  <Link
                    href="/demo"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
                  >
                    Try Sarah Free
                  </Link>
                </MagneticButton>
                <Link
                  href="#how-it-works"
                  className="flex items-center gap-2 text-slate-400 hover:text-white px-2 py-4 transition-colors duration-300 group"
                >
                  <span className="text-sm">See how it works</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats - Right Side */}
          <div className="lg:col-span-5">
            <div className="space-y-5">
              <FadeIn delay={400}>
                <div className="glass-card p-8">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-[0.1em] mb-2">Revenue Protected</div>
                  <div className="text-3xl font-bold text-emerald-400 tracking-tight">
                    <AnimatedCounter end={42850} prefix="$" />
                  </div>
                  <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={500}>
                <div className="glass-card p-8">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-[0.1em] mb-2">Response Time</div>
                  <div className="text-3xl font-bold gradient-text-cool tracking-tight">&lt;1 second</div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500 font-mono">Always listening</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
