'use client'

import { FadeIn } from '@/components/ui/FadeIn'

const canDo = [
  'Answer calls 24/7, book appointments, qualify leads',
  'Follow up on quotes automatically (text, call, email)',
  'Schedule directly into ServiceTitan, QuickBooks, Google Calendar',
  'Detect urgency in a caller\'s voice and escalate to you',
  'Send review requests and win-back campaigns',
  'Optimize workflows monthly based on your data',
]

const cannotDo = [
  'Physically show up to job sites',
  'Make final pricing decisions that require judgment',
  'Handle complex disputes that need the owner\'s touch',
  'Replace decades of trade expertise',
  'Run your business while you sip margaritas',
]

export function PainPoints() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              <span className="text-white">Before We Talk,</span>{' '}
              <span className="gradient-text">Here&apos;s What&apos;s Real</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* AI CAN Do */}
          <FadeIn delay={100}>
            <div className="glass-card p-8 lg:p-10 h-full border-t-2 border-t-emerald-500/40">
              <h3 className="text-xl font-bold text-emerald-400 mb-6 tracking-tight">
                AI CAN do this today:
              </h3>
              <ul className="space-y-4">
                {canDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* AI CANNOT Do */}
          <FadeIn delay={200}>
            <div className="glass-card p-8 lg:p-10 h-full border-t-2 border-t-slate-600/40">
              <h3 className="text-xl font-bold text-slate-400 mb-6 tracking-tight">
                AI CANNOT do this (yet):
              </h3>
              <ul className="space-y-4">
                {cannotDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Bottom text */}
        <FadeIn delay={300}>
          <div className="text-center mt-14">
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              <span className="text-white font-semibold">The goal:</span> AI optimizes 80% of back office grind so you
              can focus on the 20% that actually grows your business.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
