'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { GlowingEffect } from '@/components/ui/glowing-effect'

const workflows = [
  {
    title: 'The Communication Hub',
    emoji: '\uD83D\uDCAC',
    description: 'Phone, text, email, social DMs, website chat. Smart escalation.',
    example: 'Missed call \u2192 auto-text \u2192 appointment booked in 2 min',
    iconBg: 'bg-orange-500/10',
    borderColor: 'border-t-orange-500/40',
  },
  {
    title: 'The Scheduling Engine',
    emoji: '\uD83D\uDCC5',
    description: 'Direct booking, smart dispatch, calendar sync. Cuts phone tag 15+ hrs/week.',
    example: 'Customer picks a time online \u2192 crew gets notified \u2192 no phone tag',
    iconBg: 'bg-blue-500/10',
    borderColor: 'border-t-blue-500/40',
  },
  {
    title: 'The Follow-Up Machine',
    emoji: '\uD83D\uDD25',
    description: 'Quote follow-ups, win-backs, reminders. Close rates 30% \u2192 50%.',
    example: 'Quote sent Monday \u2192 auto follow-up Wednesday \u2192 job closed Friday',
    iconBg: 'bg-red-500/10',
    borderColor: 'border-t-red-500/40',
  },
  {
    title: 'The Content Generator',
    emoji: '\u2B50',
    description: 'Social posts, reviews, campaigns. No marketing hire needed.',
    example: 'Finished a job \u2192 review request sent \u2192 5-star posted same day',
    iconBg: 'bg-emerald-500/10',
    borderColor: 'border-t-emerald-500/40',
  },
  {
    title: 'The Cash Flow Manager',
    emoji: '\uD83D\uDCB0',
    description: 'Invoicing, reminders, collections. No more chasing money.',
    example: 'Invoice sent \u2192 reminder at 7 days \u2192 payment collected automatically',
    iconBg: 'bg-violet-500/10',
    borderColor: 'border-t-violet-500/40',
  },
  {
    title: 'The Intelligence Dashboard',
    emoji: '\uD83D\uDCCA',
    description: 'Morning briefings, weekly reports, insights. Visibility without meetings.',
    example: 'Monday 7am \u2192 briefing in your inbox \u2192 know your week before coffee',
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
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className={`relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-border bg-bg-secondary p-8 lg:p-10 shadow-sm`}>
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className={`inline-flex items-center justify-center w-14 h-14 ${workflow.iconBg} rounded-2xl border-[0.75px] border-border`}>
                      <span className="text-2xl">{workflow.emoji}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="pt-0.5 text-lg font-bold text-white tracking-tight md:text-xl leading-tight">
                        {workflow.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed md:text-base">
                        {workflow.description}
                      </p>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-orange-400/90 mt-3 leading-relaxed">
                        <span className="text-orange-500/60 mr-1">e.g.</span>{workflow.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
