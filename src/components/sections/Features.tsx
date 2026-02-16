'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'

const steps = [
  {
    title: 'Analyze',
    description: 'I analyze your current back office — where you\'re leaking time, missing calls, or losing revenue.',
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
    title: 'Show',
    description: 'I show you where AI fits — which workflows can be optimized today vs. what\'s still hype.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    borderColor: 'border-t-blue-500/40',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Decide',
    description: 'You get clarity — whether that\'s working with us, someone else, or waiting until the tech matures.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              What the Free Audit Actually Is
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
            <p className="text-slate-400 text-sm leading-relaxed mb-2">
              If we&apos;re the right fit, great. If not, I&apos;ll point you toward who is.
            </p>
            <p className="text-orange-400 font-semibold text-sm">
              The audit is free because the information is valuable either way.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
