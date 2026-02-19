'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'
import { FloatingPaths } from '@/components/ui/background-paths'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-bg-primary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="hero-grid absolute inset-0"></div>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-20">
        <div className="flex items-center justify-center min-h-[75vh]">
          <div className="max-w-3xl text-center">
            <FadeIn>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/30 border border-slate-700/30 mb-10">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400">
                  FREE AI WORKFLOW AUDIT FOR CONTRACTORS
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-8" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                <span className="text-white">Give Your Team the Tools to</span>
                <br />
                <span className="gradient-text">Optimize Your Company</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              {/* Subheadline */}
              <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Every contractor has the same leaks: missed calls, slow follow-ups, forgotten reviews.
                We build automated workflows that handle the repetitive stuff — so your team can focus
                on growing the business, not just running it.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              {/* Audit Pitch */}
              <div className="glass-card p-6 mb-10 max-w-xl mx-auto">
                <h3 className="text-white font-semibold text-lg mb-2">Get Your Free Workflow Audit</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Answer a few quick questions. I&apos;ll analyze your operation and call you
                  within 24 hours — no pitch, just clarity. Usually takes 2 minutes.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              {/* CTA */}
              <div className="flex justify-center">
                <Link
                  href="#audit-form"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-10 py-4 rounded-lg font-semibold text-lg btn-glow hover:from-orange-600 hover:to-orange-500 transition-all duration-200"
                >
                  Book My Free Audit →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
