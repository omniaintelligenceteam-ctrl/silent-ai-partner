'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

const plans = [
  {
    name: 'Starter',
    role: 'Your AI Receptionist',
    price: 197,
    setup: 200,
    payLink: 'https://buy.stripe.com/fZu9AV7Ug1Ji8Jd7E04wM0a',
    savings: '93% less than a $37K receptionist',
    features: [
      'Answers every call 24/7/365',
      'Books appointments on the spot',
      'Emergency call prioritization',
      'SMS confirmations to customers',
      'Call recordings & transcripts',
      'Bilingual — English & Spanish',
      'Never calls in sick, never late',
      'Overflow & after-hours modes',
    ],
    sarahSays: "I booked 3 jobs today while you were on site. Mrs. Henderson's water heater is scheduled for Thursday at 2pm. Want me to text you the summary?",
    popular: false,
  },
  {
    name: 'Professional',
    role: 'Your Smart Receptionist',
    price: 297,
    setup: 500,
    payLink: 'https://buy.stripe.com/4gM4gBcaw0Fe7F9gaw4wM0b',
    savings: '92% less than a $37K receptionist — and she sells',
    features: [
      'Everything in Starter',
      'Smart upselling on every call',
      'Calendar sync (Google, ServiceTitan, Jobber)',
      'Trade-specific knowledge (plumbing, HVAC, electrical, lighting)',
      'Objection handling & closing',
      'Confirmation & reminder texts',
      'Remembers returning callers',
      'Customer history & preferences',
    ],
    sarahSays: "That's 6 jobs booked this week — plus I upsold 2 maintenance plans and a water heater inspection. Thursday has a gap at 2pm, want me to call the Henderson lead?",
    popular: true,
  },
  {
    name: 'Business',
    role: 'Your Office Manager',
    price: 397,
    setup: 1000,
    payLink: 'https://buy.stripe.com/9B600ldeAgEcgbF5vS4wM0c',
    savings: '90% less than a $62K office manager',
    features: [
      'Everything in Professional',
      'Invoice follow-ups & payment reminders',
      'Post-job follow-up calls',
      'Review request automation (Google, Yelp)',
      'Seasonal service campaigns',
      'Lead scoring & priority flagging',
      'Auto-dispatch to right technician',
      'Custom voice & personality',
      'Weekly performance reports',
    ],
    sarahSays: "Revenue's up this month. I sent 12 review requests, chased 3 overdue invoices, and booked 8 maintenance plans from last month's customers. What should I hit next?",
    popular: false,
    highlight: 'She doesn\'t just answer phones — she runs your office. Pays for herself in the first week.',
  },
  {
    name: 'Enterprise',
    role: 'Your AI COO',
    price: 497,
    setup: 1500,
    payLink: 'https://buy.stripe.com/bJe3cx7UgbjS0cH2jG4wM0d',
    savings: '90% less than a $62K office manager — and she never stops',
    features: [
      'Everything in Business',
      'Morning briefing + end-of-day report',
      'Revenue tracking & forecasting',
      'Automated marketing to past customers',
      'Competitor monitoring',
      'Crew performance tracking',
      'Multi-location support',
      'Predictive scheduling',
      'Cash flow alerts',
      'Custom workflows & integrations',
      'Priority support + dedicated onboarding',
    ],
    sarahSays: "Morning. 8 jobs today, $14K in pending quotes, and that commercial lead called back — I booked him for 11am. I also noticed your Tuesday is light, want me to run a reactivation campaign?",
    popular: false,
    highlight: null,
    morningBriefing: "Morning boss. The Rodriguez quote I sent last night? They replied at 6am — they want to move forward. I chased 3 overdue invoices — Mrs. Chen paid, the other two said Friday. Today: 6 jobs, Crew A starts 7:30 in Mesa, and that $15K commercial lead is confirmed for 11am. What do you want me to hit first?",
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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
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
                  <div className="text-xs text-slate-500 mt-1 font-mono">${(plan as any).setup} setup</div>
                  <div className="text-[10px] text-emerald-400 mt-2 font-medium">{(plan as any).savings}</div>
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
                  className={`block w-full py-3 rounded-lg font-semibold text-center text-sm transition-all duration-200 mb-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white btn-glow hover:from-orange-600 hover:to-amber-600'
                      : (plan as any).elite
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-bold hover:from-amber-300 hover:to-yellow-200'
                        : 'border-2 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10'
                  }`}
                >
                  Try Sarah Free
                </Link>
                <a
                  href={(plan as any).payLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 rounded-lg font-medium text-center text-xs border border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
                >
                  Get Started →
                </a>
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
              <div className="text-orange-400 font-semibold mb-1">One-Time Setup</div>
              <div className="text-slate-400 text-sm">Custom configuration for your business</div>
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
