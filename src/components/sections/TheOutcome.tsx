'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'

const outcomes = [
  {
    title: 'The Owner Gets To',
    items: [
      'Think strategically',
      'Close bigger deals',
      'Train the crew',
      'Take time off',
    ],
    borderColor: 'border-t-orange-500/40',
    iconColor: 'text-orange-400',
  },
  {
    title: 'The Team Gets To',
    items: [
      'Focus on high-value work',
      'Stop drowning in admin',
      'Grow their skills',
      'Go home on time',
    ],
    borderColor: 'border-t-blue-500/40',
    iconColor: 'text-blue-400',
  },
  {
    title: 'The Business Gets To',
    items: [
      'Scale without hiring',
      'Capture more revenue',
      'Compete with bigger companies',
      'Build real equity',
    ],
    borderColor: 'border-t-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
]

export function TheOutcome() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              What Happens When the{' '}
              <span className="gradient-text">Repetitive Work Is Handled</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {outcomes.map((outcome, index) => (
            <FadeIn key={index} delay={index * 150}>
              <TiltCard>
                <div className={`glass-card p-8 lg:p-10 h-full border-t-2 ${outcome.borderColor}`}>
                  <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{outcome.title}</h3>
                  <ul className="space-y-3">
                    {outcome.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 ${outcome.iconColor} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
