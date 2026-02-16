'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'

const workflows = [
  {
    title: 'Money Loop Optimization',
    emoji: '\uD83D\uDCB0',
    description: 'Invoice → Payment → Reminder → Collection (all automated)',
    accent: 'from-orange-500 to-orange-400',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    borderColor: 'border-t-orange-500/40',
  },
  {
    title: 'Scheduling Loop Optimization',
    emoji: '\uD83D\uDCC5',
    description: 'Inquiry → Qualify → Book → Confirm → Reminder (friction reduced 40%)',
    accent: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    borderColor: 'border-t-blue-500/40',
  },
  {
    title: 'Lead Recovery Optimization',
    emoji: '\uD83D\uDD25',
    description: 'Quote sent → Auto-follow-up → Close (close rate +25%)',
    accent: 'from-red-500 to-orange-500',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    borderColor: 'border-t-red-500/40',
  },
  {
    title: 'Review Engine Optimization',
    emoji: '\u2B50',
    description: 'Job completed → Happy? → Review request → Google ranking boost',
    accent: 'from-emerald-500 to-emerald-400',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    borderColor: 'border-t-emerald-500/40',
  },
  {
    title: 'Win-Back Optimization',
    emoji: '\uD83D\uDD04',
    description: '6 months no call → Re-engagement → Rebook (LTV recovered)',
    accent: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    borderColor: 'border-t-violet-500/40',
  },
]

export function HowItWorks() {
  return (
    <section id="workflows" className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Where AI Actually{' '}
              <span className="gradient-text">Moves the Needle</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every contractor has the same leaks. We build workflows that plug them:
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {workflows.map((workflow, index) => (
            <FadeIn key={index} delay={index * 100}>
              <TiltCard>
                <div className={`glass-card p-8 lg:p-10 border-t-2 ${workflow.borderColor} group h-full`}>
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${workflow.iconBg} rounded-2xl mb-8 group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-2xl">{workflow.emoji}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{workflow.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{workflow.description}</p>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={600}>
          <div className="text-center mt-16">
            <p className="text-slate-400 text-sm">
              Each workflow is custom-built for your trade, your software, your volume.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
