'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function PainPoints() {
  const stats = [
    {
      end: 62,
      suffix: '%',
      label: 'of calls to small businesses go unanswered',
      color: 'text-red-400',
    },
    {
      end: 85,
      suffix: '%',
      label: 'of callers who hit voicemail DON\'T leave a message',
      color: 'text-orange-400',
    },
    {
      end: 67,
      suffix: '%',
      label: 'call your competitor instead',
      color: 'text-red-400',
    },
    {
      end: 500,
      prefix: '$',
      suffix: '+',
      label: 'lost revenue per missed call',
      color: 'text-orange-400',
    }
  ]

  return (
    <section className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              <span className="text-white">Your best employee</span>{' '}
              <span className="gradient-text">never sleeps.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              While you&apos;re on a job site, your phone is ringing. Your office manager called in sick. Again.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="glass-card p-8 lg:p-10 text-center">
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-4 tracking-tight`}>
                  <AnimatedCounter end={stat.end} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                </div>
                <div className="text-slate-400 text-sm leading-relaxed">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
