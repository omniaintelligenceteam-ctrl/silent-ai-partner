'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

const plans = [
  {
    name: 'Answering Service',
    role: 'Your Front Desk',
    price: 197,
    minutes: '300 minutes',
    features: [
      'Answers every call 24/7',
      'Takes messages — name, number, issue',
      'SMS & email alerts',
      'Basic FAQ handling',
      'Call recordings',
      'Overflow / after hours modes',
    ],
    sarahSays: "I've got 3 messages from today. Want me to text you the details or should I just email the summary?",
    popular: false,
  },
  {
    name: 'Receptionist',
    role: 'Your Front Office',
    price: 297,
    minutes: '600 minutes',
    features: [
      'Everything in Answering Service',
      'Books appointments on the spot',
      'Calendar sync (Google, ServiceTitan, Jobber)',
      'Confirmation & reminder texts',
      'Emergency routing to your phone',
      'Remembers returning callers',
      'Full call transcripts',
    ],
    sarahSays: "That's 4 jobs booked this week. I noticed Thursday has a gap at 2pm — want me to call back the Henderson lead and fill it?",
    popular: true,
  },
  {
    name: 'Office Manager',
    role: 'Your Operations',
    price: 497,
    minutes: '1,200 minutes',
    features: [
      'Everything in Receptionist',
      'Smart upselling on every call',
      'CRM deep sync with full notes',
      'Invoice follow-ups & reminders',
      'Full customer history & preferences',
      'Custom voice & personality',
      'Spanish language support',
      'Auto-dispatch to right technician',
      'Weekly summary reports',
    ],
    sarahSays: "Revenue's up 12% this month. I've got two overdue invoices and a repeat customer asking about a maintenance plan. Want me to handle those or should we talk strategy first?",
    popular: false,
    highlight: 'Sarah gets two $75 upsells a week. That\'s $600/mo. She costs $497. She pays for herself and buys you lunch.',
  },
  {
    name: 'COO',
    role: 'Your Executive',
    price: 997,
    minutes: 'Unlimited minutes',
    features: [
      'Everything in Office Manager',
      'Knows every inch of your business',
      'Morning briefing + midday report + afternoon planning',
      'AI business advisor — weekly strategy',
      'Profit margin tracking per job',
      'Predictive scheduling & hiring alerts',
      'Cash flow alerts & revenue forecasting',
      'Automated marketing to past customers',
      'Lead scoring & priority flagging',
      'Crew performance tracking',
      'Competitor pricing & review monitoring',
      'Custom report builder',
      '100% customizable workflows',
      'Multi-location support',
      'Priority support + dedicated onboarding',
    ],
    sarahSays: "Morning. You've got 8 jobs today, $14K in pending quotes, and a crew opening next Tuesday. I drafted a growth plan for Q2 — want me to walk you through it or should I start on those quotes first?",
    popular: false,
    highlight: null,
    morningBriefing: "Morning boss. When you left the office yesterday I handled that Rodriguez kitchen remodel you asked me to — sent the quote over at 7:01pm, they already replied saying they want to move forward. I also chased the 3 overdue invoices you flagged — Mrs. Chen paid hers, the other two said they'd send by Friday. Your schedule today: 6 jobs, Crew A starts at 7:30 in Mesa, and that $15K commercial lead from yesterday called back — I booked him for a site visit at 11am. What do you want me to hit first today?",
    elite: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-orange-400 block mb-4">CHOOSE YOUR SARAH</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Four Levels. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">One Mission.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              No contracts. Cancel anytime. Every tier includes overflow, after hours, and full 24/7 modes.
            </p>
          </div>
        </FadeIn>

        {/* 4 Tiers Side by Side */}
        <div className="grid lg:grid-cols-4 gap-4 mb-16">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className={`relative glass-card p-6 h-full flex flex-col transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-orange-500/50 lg:scale-[1.02]' 
                  : (plan as any).elite
                    ? 'ring-2 ring-amber-400/30 bg-gradient-to-b from-amber-500/5 to-transparent'
                    : 'hover:border-orange-500/30'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                {(plan as any).elite && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                      ULTIMATE
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-5 pt-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{plan.role}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{plan.name}</h3>
                  <div className="mt-3">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">${plan.price}</span>
                    <span className="text-slate-500 ml-1">/mo</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">{plan.minutes}</div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start space-x-2">
                      <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-300 text-xs leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Highlight */}
                {(plan as any).highlight && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-4">
                    <p className="text-orange-300 text-xs font-medium italic">{(plan as any).highlight}</p>
                  </div>
                )}

                {/* Sarah Says */}
                <div className="bg-white/5 rounded-lg p-3 mb-5 border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Sarah says</span>
                  </div>
                  <p className="text-slate-400 text-xs italic leading-relaxed">"{plan.sarahSays}"</p>
                </div>

                {/* CTA */}
                <Link
                  href="/demo"
                  className={`block w-full py-3 rounded-lg font-semibold text-center text-sm transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white btn-glow hover:from-orange-600 hover:to-amber-600'
                      : (plan as any).elite
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-bold hover:from-amber-300 hover:to-yellow-200'
                        : 'border-2 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10'
                  }`}
                >
                  Try Sarah Free
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* COO Morning Briefing Showcase */}
        <FadeIn delay={500}>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-6">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400">COO TIER — MORNING BRIEFING</span>
              <h3 className="text-2xl font-bold text-white mt-2">This Is What $997/mo Feels Like</h3>
            </div>
            <div className="glass-card p-8 border-amber-400/20 bg-gradient-to-b from-amber-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">7:00 AM — Daily Briefing</span>
              </div>
              <p className="text-slate-300 leading-relaxed italic">
                "{(plans[3] as any).morningBriefing}"
              </p>
              <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <p className="text-slate-500 text-sm">She didn't just answer your phones. She ran your business while you slept.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom Info */}
        <FadeIn delay={600}>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-orange-400 font-semibold mb-1">No Setup Fees</div>
              <div className="text-slate-400 text-sm">Start immediately, zero upfront</div>
            </div>
            <div>
              <div className="text-orange-400 font-semibold mb-1">Cancel Anytime</div>
              <div className="text-slate-400 text-sm">No contracts, no penalties</div>
            </div>
            <div>
              <div className="text-orange-400 font-semibold mb-1">Extra Minutes: $0.15</div>
              <div className="text-slate-400 text-sm">Simple per-minute billing, no surprises</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
