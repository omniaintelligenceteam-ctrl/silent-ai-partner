'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'

const steps = [
  {
    title: 'The Audit',
    description: 'We analyze your operation. Where are you leaking time and money?',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    borderColor: 'border-t-orange-500/40',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    accent: 'from-orange-500 to-orange-400',
  },
  {
    title: 'The Build',
    description: 'We configure tools for your business. Train your team.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    borderColor: 'border-t-blue-500/40',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'The Optimization',
    description: 'Systems run 24/7. Monthly reviews. Focus on growth.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    borderColor: 'border-t-emerald-500/40',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    accent: 'from-emerald-500 to-emerald-400',
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              How It Works
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 150}>
              <TiltCard>
                <div className={`glass-card p-8 lg:p-10 text-center relative group h-full border-t-2 ${step.borderColor}`}>
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
          <div className="text-center mt-16 max-w-2xl mx-auto">
            <p className="text-slate-400 text-sm leading-relaxed">
              Setup, training, and ongoing optimization — all included.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
