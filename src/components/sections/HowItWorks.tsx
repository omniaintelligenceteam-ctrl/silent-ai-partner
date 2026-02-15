'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'

export function HowItWorks() {
  const steps = [
    {
      title: 'Connect Your Phone',
      description: 'Forward your business line to Sarah. No equipment, no apps, no IT guy.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      accent: 'from-orange-500 to-orange-400',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
    },
    {
      title: 'She Learns Your Business',
      description: 'Services, pricing, schedule, service area — Sarah knows it all in minutes.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      accent: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      title: 'You Stay in the Field',
      description: 'Sarah answers calls, books jobs, sends texts, and follows up. You do the work.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      accent: 'from-emerald-500 to-emerald-400',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    }
  ]

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Live in 15 Minutes
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 150}>
              <TiltCard>
                <div className="glass-card p-8 lg:p-10 text-center relative group h-full">
                  <div className={`absolute -top-4 -left-4 w-9 h-9 bg-gradient-to-r ${step.accent} rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
                    {index + 1}
                  </div>
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${step.iconBg} rounded-2xl ${step.iconColor} mb-8 group-hover:scale-105 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={500}>
          <div className="text-center mt-16">
            <p className="text-slate-500 text-sm mb-6">
              No contracts. No setup fees. Start protecting your revenue today.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
