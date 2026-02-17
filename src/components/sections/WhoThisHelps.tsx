'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'

const beneficiaries = [
  {
    title: 'The Owner',
    description: 'Growth, strategy, big deals',
    emoji: '\uD83D\uDC54',
    borderColor: 'border-t-orange-500/40',
    iconBg: 'bg-orange-500/10',
  },
  {
    title: 'The Office Manager',
    description: 'Relationships, not drowning in tasks',
    emoji: '\uD83D\uDCCB',
    borderColor: 'border-t-blue-500/40',
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'The Crew',
    description: 'Clear schedules, automatic updates',
    emoji: '\uD83D\uDC77',
    borderColor: 'border-t-emerald-500/40',
    iconBg: 'bg-emerald-500/10',
  },
  {
    title: 'The Customers',
    description: 'Answered fast, treated like priority',
    emoji: '\u2B50',
    borderColor: 'border-t-violet-500/40',
    iconBg: 'bg-violet-500/10',
  },
]

export function WhoThisHelps() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Built for the Team,{' '}
              <span className="gradient-text">Not Just the Owner</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {beneficiaries.map((person, index) => (
            <FadeIn key={index} delay={index * 100}>
              <TiltCard>
                <div className={`glass-card p-8 lg:p-10 text-center group h-full border-t-2 ${person.borderColor}`}>
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${person.iconBg} rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-2xl">{person.emoji}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{person.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{person.description}</p>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
