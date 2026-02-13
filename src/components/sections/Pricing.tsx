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
    features: [
      'Answers every call 24/7/365',
      'Books appointments on the spot',
      'Emergency call prioritization',
      'SMS confirmations to customers',
      'Call recordings & transcripts',
      'Bilingual — English & Spanish',
      'Overflow & after-hours modes',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    role: 'Your Smart Office Manager',
    price: 297,
    setup: 500,
    accent: 'orange',
    payLink: 'https://buy.stripe.com/4gM4gBcaw0Fe7F9gaw4wM0b',
    features: [
      'Everything in Starter',
      'Smart upselling on every call',
      'Calendar sync (Google, ServiceTitan, Jobber)',
      'Trade-specific knowledge',
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
    price: 497,
    setup: 1500,
    accent: 'blue',
    payLink: 'https://buy.stripe.com/bJe3cx7UgbjS0cH2jG4wM0d',
    features: [
      'Everything in Professional',
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
]

const comparisonRows = [
  { feature: '24/7 Call Answering', starter: true, pro: true, enterprise: true },
  { feature: 'Appointment Booking', starter: true, pro: true, enterprise: true },
  { feature: 'Emergency Triage', starter: true, pro: true, enterprise: true },
  { feature: 'Bilingual Support', starter: true, pro: true, enterprise: true },
  { feature: 'Smart Upselling', starter: false, pro: true, enterprise: true },
  { feature: 'CRM & Calendar Sync', starter: false, pro: true, enterprise: true },
  { feature: 'Invoice Follow-ups', starter: false, pro: true, enterprise: true },
  { feature: 'Review Automation', starter: false, pro: true, enterprise: true },
  { feature: 'Revenue Forecasting', starter: false, pro: false, enterprise: true },
  { feature: 'Multi-Location', starter: false, pro: false, enterprise: true },
  { feature: 'Custom Workflows', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated Onboarding', starter: false, pro: false, enterprise: true },
]

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

        {/* 3 Tiers */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className={`relative glass-card p-8 lg:p-10 h-full flex flex-col transition-all duration-300 ${
                plan.popular
                  ? 'ring-2 ring-orange-500/50 lg:scale-[1.04] gradient-border-animated'
                  : plan.accent === 'blue'
                    ? 'border-t-2 border-t-blue-500/40'
                    : 'border-t-2 border-t-slate-700/40'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap shadow-lg shadow-orange-500/25">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8 pt-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-2">{plan.role}</div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                  <div className="mt-4">
                    <span className={`text-4xl font-bold tracking-tight ${
                      plan.popular
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400'
                        : plan.accent === 'blue'
                          ? 'text-blue-400'
                          : 'text-white'
                    }`}>${plan.price}</span>
                    <span className="text-slate-500 text-sm ml-1">/mo</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1.5 font-mono">${plan.setup} one-time setup</div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular
                          ? 'bg-orange-500/15'
                          : plan.accent === 'blue'
                            ? 'bg-blue-500/15'
                            : 'bg-slate-700/50'
                      }`}>
                        <svg className={`w-2.5 h-2.5 ${
                          plan.popular
                            ? 'text-orange-400'
                            : plan.accent === 'blue'
                              ? 'text-blue-400'
                              : 'text-slate-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-400 text-sm leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/demo"
                  className={`block w-full py-3.5 rounded-xl font-semibold text-center text-sm transition-all duration-200 mb-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white btn-glow hover:from-orange-600 hover:to-amber-600'
                      : plan.accent === 'blue'
                        ? 'border border-blue-500/30 text-blue-400 hover:border-blue-400 hover:bg-blue-500/10'
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
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Comparison Table */}
        <FadeIn delay={400}>
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-lg font-bold text-white mb-8 text-center tracking-tight">Compare Plans</h3>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800/50">
                      <th className="text-left py-4 px-6 text-xs font-mono text-slate-500 uppercase tracking-wider">Feature</th>
                      <th className="text-center py-4 px-4 text-xs font-mono text-slate-500 uppercase tracking-wider">Starter</th>
                      <th className="text-center py-4 px-4 text-xs font-mono text-orange-400 uppercase tracking-wider">Professional</th>
                      <th className="text-center py-4 px-4 text-xs font-mono text-blue-400 uppercase tracking-wider">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={index} className="border-b border-slate-800/20 last:border-b-0">
                        <td className="py-3.5 px-6 text-slate-400 text-sm">{row.feature}</td>
                        <td className="py-3.5 px-4 text-center">
                          {row.starter ? (
                            <svg className="w-4 h-4 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center bg-orange-500/[0.02]">
                          {row.pro ? (
                            <svg className="w-4 h-4 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {row.enterprise ? (
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
