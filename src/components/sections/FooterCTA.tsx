'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

export function FooterCTA() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="hero-grid absolute inset-0 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            <span className="text-white">Let&apos;s See Where</span>
            <br />
            <span className="gradient-text">Your Time Is Going</span>
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            20 minutes. Where you&apos;re leaking time. What workflows would help. Whether this makes sense. No pitch. Just clarity.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex justify-center mb-10">
            <Link
              href="#audit-form"
              data-glow
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-10 py-4 rounded-xl font-semibold text-lg btn-glow hover:from-orange-600 hover:to-orange-500 transition-all duration-200"
            >
              Book My Free Audit →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex items-center justify-center">
            <span className="text-slate-500 text-sm">
              Questions?{' '}
              <a href="mailto:team@silentaipartner.com" className="text-orange-400 font-semibold hover:text-orange-300 transition-colors">
                team@silentaipartner.com
              </a>
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
