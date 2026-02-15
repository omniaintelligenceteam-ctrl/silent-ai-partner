'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

const plans = [
  {
    name: 'Starter',
    role: 'Your AI Receptionist',
    price: 197,
    setup: 200,
    accent: 'slate',
    payLink: 'https://buy.stripe.com/fZu9AV7Ug1Ji8Jd7E04wM0a',
    highlight: 'Never miss another call. 93% cheaper than a human receptionist.',
    bestFeature: '24/7 call answering — every call, every time',
    features: [
      'Answers every call 24/7/365',
      'Books appointments on the spot',
      'Emergency call prioritization',
      'Trade-specific knowledge',
      'SMS confirmations to customers',
      'Call recordings & transcripts',
      'Bilingual — English & Spanish',
      'Overflow & after-hours modes',
    ],
    popular: false,
  },
  {
    name: 'Business',
    role: 'Your AI Office Manager',
    price: 397,
    setup: 1000,
    accent: 'orange',
    payLink: 'https://buy.stripe.com/dRm3cx4I4fA8f7B2jG4wM0f',
    highlight: 'She doesn\'t just answer — she sells, follows up, and runs your office.',
    bestFeature: 'Upselling + invoicing + reviews = she pays for herself',
    features: [
      'Everything in Starter',
      'Smart upselling on every call',
      'Calendar sync (Google, ServiceTitan, Jobber)',
      'Objection handling & closing',
      'Remembers returning callers',
      'Invoice follow-ups & payment reminders',
      'Review request automation',
      'Lead scoring & priority flagging',
      'Weekly performance reports',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    role: 'Your AI COO',
    price: 597,
    setup: 1500,
    accent: 'blue',
    payLink: 'https://buy.stripe.com/4gMfZj7UgfA82kP5vS4wM0e',
    highlight: 'Like hiring a COO for less than your truck payment.',
    bestFeature: 'Morning briefings + revenue tracking + growth on autopilot',
    features: [
      'Everything in Business',
      'Morning briefing + end-of-day report',
      'Revenue tracking & forecasting',
      'Automated marketing to past customers',
      'Multi-location support',
      'Predictive scheduling',
      'Cash flow alerts',
      'Custom workflows & integrations',
      'Dedicated onboarding & priority support',
    ],
    popular: false,
  },
  {
    name: 'Custom COO',
    role: 'Your Silent Business Partner',
    price: 0,
    setup: 0,
    accent: 'violet',
    payLink: 'https://calendly.com/silentaipartner',
    highlight: 'Built around your operation. Let\'s talk.',
    bestFeature: 'Everything custom — strategy, integrations, and a dedicated partner',
    features: [
      'Everything in Enterprise',
      'Quarterly AI strategy sessions',
      'Integrations & workflows built for you',
      'White-glove onboarding',
      'Dedicated account manager',
      'Priority support & SLA',
      'Revenue optimization playbook',
      'Competitor monitoring',
    ],
    popular: false,
    isCustom: true,
  },
]

const comparisonRows = [
  { feature: '24/7 Call Answering', starter: true, business: true, enterprise: true, coo: true },
  { feature: 'Appointment Booking', starter: true, business: true, enterprise: true, coo: true },
  { feature: 'Emergency Triage', starter: true, business: true, enterprise: true, coo: true },
  { feature: 'Trade-Specific Knowledge', starter: true, business: true, enterprise: true, coo: true },
  { feature: 'Bilingual Support', starter: true, business: true, enterprise: true, coo: true },
  { feature: 'Smart Upselling', starter: false, business: true, enterprise: true, coo: true },
  { feature: 'CRM & Calendar Sync', starter: false, business: true, enterprise: true, coo: true },
  { feature: 'Objection Handling', starter: false, business: true, enterprise: true, coo: true },
  { feature: 'Invoice Follow-ups', starter: false, business: true, enterprise: true, coo: true },
  { feature: 'Review Automation', starter: false, business: true, enterprise: true, coo: true },
  { feature: 'Lead Scoring', starter: false, business: true, enterprise: true, coo: true },
  { feature: 'Weekly Reports', starter: false, business: true, enterprise: true, coo: true },
  { feature: 'Morning Briefings', starter: false, business: false, enterprise: true, coo: true },
  { feature: 'Revenue Forecasting', starter: false, business: false, enterprise: true, coo: true },
  { feature: 'Automated Marketing', starter: false, business: false, enterprise: true, coo: true },
  { feature: 'Multi-Location', starter: false, business: false, enterprise: true, coo: true },
  { feature: 'Dedicated Onboarding', starter: false, business: false, enterprise: true, coo: true },
  { feature: 'Quarterly Strategy Sessions', starter: false, business: false, enterprise: false, coo: true },
  { feature: 'Dedicated Account Manager', starter: false, business: false, enterprise: false, coo: true },
  { feature: 'Priority Support & SLA', starter: false, business: false, enterprise: false, coo: true },
  { feature: 'Revenue Optimization', starter: false, business: false, enterprise: false, coo: true },
  { feature: 'Competitor Monitoring', starter: false, business: false, enterprise: false, coo: true },
]

function accentColor(accent: string) {
  switch (accent) {
    case 'orange': return { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-t-orange-500/40', price: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300' }
    case 'cyan': return { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-t-cyan-500/40', price: 'text-cyan-400' }
    case 'blue': return { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-t-blue-500/40', price: 'text-blue-400' }
    case 'violet': return { bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-t-violet-500/40', price: 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400' }
    default: return { bg: 'bg-slate-700/50', text: 'text-slate-400', border: 'border-t-slate-700/40', price: 'text-white' }
  }
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              No contracts. Cancel anytime. Every plan includes 24/7 coverage and a 14-day free trial.
            </p>
          </div>
        </FadeIn>

        {/* 4 Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => {
            const colors = accentColor(plan.accent)
            return (
              <FadeIn key={index} delay={index * 100}>
                <div className={`relative glass-card p-7 lg:p-8 h-full flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? 'ring-2 ring-orange-500/50 lg:scale-[1.04] gradient-border-animated'
                    : `border-t-2 ${colors.border}`
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap shadow-lg shadow-orange-500/25">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-6 pt-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-2">{plan.role}</div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                    <div className="mt-4">
                      {(plan as any).isCustom ? (
                        <span className={`text-3xl font-bold tracking-tight ${colors.price}`}>Custom Pricing</span>
                      ) : (
                        <>
                          <span className={`text-4xl font-bold tracking-tight ${
                            plan.popular ? colors.price : colors.price
                          }`}>${plan.price}</span>
                          <span className="text-slate-500 text-sm ml-1">/mo</span>
                        </>
                      )}
                    </div>
                    {!(plan as any).isCustom && (
                      <div className="text-xs text-slate-600 mt-1.5 font-mono">${plan.setup} one-time setup</div>
                    )}
                  </div>

                  {/* Best Feature Highlight */}
                  {(plan as any).bestFeature && (
                    <div className={`rounded-lg p-3 mb-3 text-center ${
                      plan.popular
                        ? 'bg-orange-500/10 border border-orange-500/20'
                        : plan.accent === 'blue'
                          ? 'bg-blue-500/10 border border-blue-500/20'
                          : 'bg-slate-700/30 border border-slate-600/20'
                    }`}>
                      <p className={`text-xs font-semibold ${
                        plan.popular ? 'text-orange-300' : plan.accent === 'blue' ? 'text-blue-300' : 'text-slate-300'
                      }`}>⚡ {(plan as any).bestFeature}</p>
                    </div>
                  )}

                  {/* Highlight Quote */}
                  {(plan as any).highlight && (
                    <p className="text-[11px] text-slate-400 italic text-center mb-3 px-2">
                      {(plan as any).highlight}
                    </p>
                  )}

                  {/* Features */}
                  <div className="space-y-2.5 mb-7 flex-grow">
                    {plan.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start space-x-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-orange-500/15' : colors.bg
                        }`}>
                          <svg className={`w-2.5 h-2.5 ${
                            plan.popular ? 'text-orange-400' : colors.text
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-400 text-sm leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {(plan as any).isCustom ? (
                    <>
                      <a
                        href="https://calendly.com/silentaipartner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-xl font-semibold text-center text-sm transition-all duration-200 mb-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white btn-glow hover:from-violet-600 hover:to-purple-600"
                      >
                        Let&apos;s Talk →
                      </a>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/demo"
                        className={`block w-full py-3 rounded-xl font-semibold text-center text-sm transition-all duration-200 mb-2 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white btn-glow hover:from-orange-600 hover:to-orange-500'
                            : plan.accent === 'blue'
                              ? 'border border-blue-500/30 text-blue-400 hover:border-blue-400 hover:bg-blue-500/10'
                              : plan.accent === 'cyan'
                                ? 'border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10'
                                : 'border border-slate-700/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50'
                        }`}
                      >
                        {plan.popular ? 'Start Free Trial' : 'Try Sarah Free'}
                      </Link>
                      <a
                        href={plan.payLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2.5 rounded-xl font-medium text-center text-xs border border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
                      >
                        Get Started →
                      </a>
                    </>
                  )}
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Schedule Consultation CTA */}
        <FadeIn delay={350}>
          <div className="text-center mb-16">
            <p className="text-slate-400 text-sm mb-4">Not sure which plan is right for you?</p>
            <a
              href="https://calendly.com/silentaipartner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-xl font-semibold text-center text-sm transition-all duration-200 bg-gradient-to-r from-violet-500 to-purple-500 text-white btn-glow hover:from-violet-600 hover:to-purple-600"
            >
              Schedule a Free Consultation
            </a>
          </div>
        </FadeIn>

        {/* Comparison Table */}
        <FadeIn delay={400}>
          <div className="max-w-5xl mx-auto mb-16">
            <h3 className="text-lg font-bold text-white mb-8 text-center tracking-tight">Compare Plans</h3>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800/50">
                      <th className="text-left py-4 px-5 text-xs font-mono text-slate-500 uppercase tracking-wider">Feature</th>
                      <th className="text-center py-4 px-3 text-xs font-mono text-slate-500 uppercase tracking-wider">Starter</th>
                      <th className="text-center py-4 px-3 text-xs font-mono text-orange-400 uppercase tracking-wider">Business</th>
                      <th className="text-center py-4 px-3 text-xs font-mono text-blue-400 uppercase tracking-wider">Enterprise</th>
                      <th className="text-center py-4 px-3 text-xs font-mono text-violet-400 uppercase tracking-wider">COO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={index} className="border-b border-slate-800/20 last:border-b-0">
                        <td className="py-3 px-5 text-slate-400 text-sm">{row.feature}</td>
                        <td className="py-3 px-3 text-center">
                          {row.starter ? (
                            <svg className="w-4 h-4 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center bg-orange-500/[0.02]">
                          {row.business ? (
                            <svg className="w-4 h-4 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {row.enterprise ? (
                            <svg className="w-4 h-4 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center bg-violet-500/[0.02]">
                          {(row as any).coo ? (
                            <svg className="w-4 h-4 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom Info */}
        <FadeIn delay={500}>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {[
              { label: 'One-Time Setup', desc: 'Custom configuration for your business', color: 'text-orange-400' },
              { label: 'Cancel Anytime', desc: 'No contracts, no penalties', color: 'text-emerald-400' },
              { label: 'Extra Minutes: $0.15', desc: 'Simple per-minute billing', color: 'text-blue-400' },
            ].map((item, index) => (
              <div key={index}>
                <div className={`${item.color} font-semibold text-sm mb-1`}>{item.label}</div>
                <div className="text-slate-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
