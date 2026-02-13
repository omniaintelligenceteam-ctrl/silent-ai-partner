'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-bg-primary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="hero-grid absolute inset-0"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-8">
            <FadeIn>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-orange-500/20 mb-8">
                <span className="text-xs font-mono uppercase tracking-wide text-orange-400">
                  AI RECEPTIONIST & OFFICE MANAGER FOR CONTRACTORS
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                <span className="text-white">PAY 93% LESS.</span>
                <br />
                <span className="gradient-text">SHE MAKES THE REST.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              {/* Subheadline */}
              <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                The average contractor receptionist costs $37,000/yr. Sarah costs $197/mo. 
                She doesn't just save you money — she books your jobs, upsells your services, 
                and grows your business while you're in the field.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200 text-center"
                >
                  Try Sarah Free
                </Link>
                <Link
                  href="#pricing"
                  className="border-2 border-orange-500/30 text-orange-400 px-8 py-4 rounded-lg font-semibold text-lg hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-200 text-center"
                >
                  See Pricing
                </Link>
                <Link
                  href="https://calendly.com/silentaipartner"
                  target="_blank"
                  className="border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-slate-400 hover:text-white transition-all duration-200 text-center"
                >
                  Book a Demo Call
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Stats - Right Side */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              <FadeIn delay={400}>
                <div className="glass-card p-6">
                  <div className="text-sm font-mono text-slate-400 mb-1">Revenue Protected</div>
                  <div className="text-2xl font-bold text-emerald-400">$42,850</div>
                </div>
              </FadeIn>
              
              <FadeIn delay={500}>
                <div className="glass-card p-6">
                  <div className="text-sm font-mono text-slate-400 mb-1">Response Time</div>
                  <div className="text-2xl font-bold text-orange-400">&lt;1 second</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-orange-500/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}