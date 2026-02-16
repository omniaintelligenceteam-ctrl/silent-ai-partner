'use client'

import { FadeIn } from '@/components/ui/FadeIn'

const steps = [
  {
    emoji: '\uD83D\uDCCB',
    text: 'I email you within 1 hour confirming I received your audit',
    color: 'text-blue-400',
    dotColor: 'bg-blue-400',
  },
  {
    emoji: '\uD83D\uDD0D',
    text: 'I research your business, competitors, and current setup',
    color: 'text-cyan-400',
    dotColor: 'bg-cyan-400',
  },
  {
    emoji: '\uD83D\uDCDE',
    text: 'I call you within 24 hours (usually sooner)',
    color: 'text-orange-400',
    dotColor: 'bg-orange-400',
  },
  {
    emoji: '\uD83D\uDCA1',
    text: 'You get a 20-minute conversation — no slides, just clarity',
    color: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
  },
  {
    emoji: '\uD83C\uDFAF',
    text: 'If we make sense, I send a custom proposal. If not, I tell you straight.',
    color: 'text-violet-400',
    dotColor: 'bg-violet-400',
  },
]

export function DashboardPreview() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              What Happens{' '}
              <span className="gradient-text">After You Submit</span>
            </h2>
          </div>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="flex gap-6">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 ${step.dotColor}/10 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-lg">{step.emoji}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px h-full min-h-[40px] bg-gradient-to-b from-slate-700 to-transparent my-1"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="glass-card p-6 mb-4 flex-1">
                    <p className="text-slate-300 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
