'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'

const workflows = [
  {
    title: 'The Communication Hub',
    emoji: '\uD83D\uDCAC',
    description: 'Phone, text, email, social DMs, website chat. Smart escalation.',
    iconBg: 'bg-orange-500/10',
    borderColor: 'border-t-orange-500/40',
  },
  {
    title: 'The Scheduling Engine',
    emoji: '\uD83D\uDCC5',
    description: 'Direct booking, smart dispatch, calendar sync. Cuts phone tag 15+ hrs/week.',
    iconBg: 'bg-blue-500/10',
    borderColor: 'border-t-blue-500/40',
  },
  {
    title: 'The Follow-Up Machine',
    emoji: '\uD83D\uDD25',
    description: 'Quote follow-ups, win-backs, reminders. Close rates 30% \u2192 50%.',
    iconBg: 'bg-red-500/10',
    borderColor: 'border-t-red-500/40',
  },
  {
    title: 'The Content Generator',
    emoji: '\u2B50',
    description: 'Social posts, reviews, campaigns. No marketing hire needed.',
    iconBg: 'bg-emerald-500/10',
    borderColor: 'border-t-emerald-500/40',
  },
  {
    title: 'The Cash Flow Manager',
    emoji: '\uD83D\uDCB0',
    description: 'Invoicing, reminders, collections. No more chasing money.',
    iconBg: 'bg-violet-500/10',
    borderColor: 'border-t-violet-500/40',
  },
  {
    title: 'The Intelligence Dashboard',
    emoji: '\uD83D\uDCCA',
    description: 'Morning briefings, weekly reports, insights. Visibility without meetings.',
    iconBg: 'bg-cyan-500/10',
    borderColor: 'border-t-cyan-500/40',
  },
]

export function HowItWorks() {
  return (
    <section id="workflows" className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Automated Workflows That{' '}
              <span className="gradient-text">Handle the Repetitive Work</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Six core tools that free up your team&apos;s time:
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

        <FadeIn delay={700}>
          <div className="text-center mt-16">
            <p className="text-slate-400 text-sm">
              Each workflow runs 24/7. Custom-configured for your business.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
