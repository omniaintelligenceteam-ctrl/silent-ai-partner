'use client'

import { FadeIn } from '@/components/ui/FadeIn'

const timelineSteps = [
  { time: '8am', text: 'Check voicemails. Three missed calls. One emergency.', dotColor: 'bg-orange-400' },
  { time: '9am', text: 'Return calls while juggling crew. Half go to voicemail.', dotColor: 'bg-red-400' },
  { time: '11am', text: 'Double-booked Thursday. Rescheduling nightmare.', dotColor: 'bg-amber-400' },
  { time: '1pm', text: 'Quotes from last week. Most went cold.', dotColor: 'bg-blue-400' },
  { time: '5pm', text: 'Should ask for review. (You won\'t.)', dotColor: 'bg-violet-400' },
]

export function PainPoints() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              <span className="text-white">Where Most Companies</span>{' '}
              <span className="gradient-text">Leak Time and Money</span>
            </h2>
          </div>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-0">
            {timelineSteps.map((step, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="flex gap-6">
                  {/* Timeline dot with time */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 ${step.dotColor}/10 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xs font-bold text-slate-300">{step.time}</span>
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className="w-px h-full min-h-[40px] bg-gradient-to-b from-slate-700 to-transparent my-1"></div>
                    )}
                  </div>

                  {/* Content card */}
                  <div className="glass-card p-6 mb-4 flex-1">
                    <p className="text-slate-300 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={600}>
          <div className="text-center mt-14">
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              <span className="text-white font-semibold">Repeat tomorrow.</span> This isn&apos;t a business. It&apos;s a treadmill.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
