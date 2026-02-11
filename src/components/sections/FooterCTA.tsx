'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

export function FooterCTA() {
  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="hero-grid absolute inset-0 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Stop Losing Money.</span>
            <br />
            <span className="gradient-text">Start Today.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            No setup fees. No contracts. Sarah starts answering your calls in 15 minutes.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/demo"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-xl"
            >
              Try Sarah Free
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-2">
              Or call our demo line to hear Sarah in action:
            </p>
            <a
              href="tel:+18667821303"
              className="text-orange-400 hover:text-orange-300 font-semibold text-lg transition-colors duration-200"
            >
              (866) 782-1303
            </a>
          </div>
        </FadeIn>

        {/* Trust Indicators */}
        <FadeIn delay={400}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">14-Day Free Trial</h3>
              <p className="text-slate-400 text-sm">No credit card required</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">Setup in 15 Minutes</h3>
              <p className="text-slate-400 text-sm">Start protecting revenue today</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">Cancel Anytime</h3>
              <p className="text-slate-400 text-sm">No contracts or commitments</p>
            </div>
          </div>
        </FadeIn>

        {/* Urgency */}
        <FadeIn delay={500}>
          <div className="mt-12 glass-card p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-mono text-sm uppercase tracking-wide">Limited Time</span>
            </div>
            <p className="text-slate-300 text-sm">
              Every day you wait, you're losing money to missed calls. 
              Join 2,000+ contractors who never miss a lead again.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}