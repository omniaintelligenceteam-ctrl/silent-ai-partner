'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'
import { MagneticButton } from '@/components/ui/MagneticButton'

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
            <span className="text-white">Stop Losing Money.</span>
            <br />
            <span className="gradient-text-shimmer">Start Today.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 2,000+ contractors who never miss a lead again. Sarah starts answering your calls in 15 minutes.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10">
            <MagneticButton>
              <Link
                href="/demo"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
              >
                Try Sarah Free
              </Link>
            </MagneticButton>
            <a
              href="tel:+18667821303"
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-2"
            >
              <span>Or call to hear Sarah:</span>
              <span className="text-orange-400 font-semibold">(866) 782-1303</span>
            </a>
          </div>
        </FadeIn>

        {/* Trust Indicators */}
        <FadeIn delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                label: '14-Day Free Trial',
                desc: 'No credit card required',
                color: 'bg-emerald-500/10',
                iconColor: 'text-emerald-400',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
              },
              {
                label: 'Setup in 15 Minutes',
                desc: 'Start protecting revenue today',
                color: 'bg-orange-500/10',
                iconColor: 'text-orange-400',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                label: 'Cancel Anytime',
                desc: 'No contracts or commitments',
                color: 'bg-blue-500/10',
                iconColor: 'text-blue-400',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <svg className={`w-6 h-6 ${item.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.label}</h3>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Social Proof */}
        <FadeIn delay={400}>
          <div className="mt-14 flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              {['bg-orange-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-cyan-500'].map((bg, i) => (
                <div key={i} className={`w-8 h-8 ${bg} rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center`}>
                  <span className="text-white text-[10px] font-bold">{['M', 'J', 'R', 'K', 'D'][i]}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm">
              <span className="text-white font-medium">2,000+</span> contractors protecting revenue
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
