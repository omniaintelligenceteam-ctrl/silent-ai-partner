'use client'

import { FadeIn } from '@/components/ui/FadeIn'

export function PainPoints() {
  const stats = [
    {
      number: '62%',
      label: 'of calls to small businesses go unanswered'
    },
    {
      number: '85%',
      label: 'of callers who hit voicemail DON\'T leave a message'
    },
    {
      number: '67%',
      label: 'call your competitor instead'
    },
    {
      number: '$500+',
      label: 'lost revenue per missed call'
    }
  ]

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Your Best Employee</span>{' '}
              <span className="gradient-text">Never Sleeps.</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              While you're on a job site, your phone is ringing. Your office manager called in sick. Again.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="glass-card p-8 text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-400 mb-3">
                  {stat.number}
                </div>
                <div className="text-slate-300 text-sm leading-relaxed">
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