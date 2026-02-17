'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

const plans = [
  {
    name: 'Essential',
    role: 'Phone + Scheduling',
    price: '$297-$497',
    accent: 'slate',
    highlight: 'Never miss a call. Direct booking.',
    features: [
      '24/7 call answering',
      'Direct booking & scheduling',
      'Emergency triage',
      'CRM sync',
      'SMS confirmations',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    role: 'Essential + Content + Reporting',
    price: '$697-$1,297',
    accent: 'orange',
    highlight: 'Everything in Essential, plus marketing automation.',
    features: [
      'Everything in Essential',
      'Quote follow-ups',
      'Review requests',
      'Social media content',
      'Weekly performance reports',
      'Win-back campaigns',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    role: 'Full Custom Workflows',
    price: '$1,497-$2,997',
    accent: 'blue',
    highlight: 'Fully custom workflows built around your operation.',
    features: [
      'Everything in Growth',
      'Custom workflow design',
      'Multi-location support',
      'Advanced integrations',
      'Morning briefings',
      'Dedicated account manager',
    ],
    popular: false,
  },
]

function accentColor(accent: string) {
  switch (accent) {
    case 'orange': return { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-t-orange-500/40', price: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300' }
    case 'blue': return { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-t-blue-500/40', price: 'text-blue-400' }
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
              Simple Pricing{' '}
              <span className="gradient-text">by What You Need</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Setup, training, support included. No contract.
            </p>
          </div>
        </FadeIn>

        {/* 3 Tiers */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => {
            const colors = accentColor(plan.accent)
            return (
              <FadeIn key={index} delay={index * 100}>
                <div className={`relative glass-card p-8 lg:p-10 h-full flex flex-col transition-all duration-300 ${
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
                      <span className={`text-3xl font-bold tracking-tight ${colors.price}`}>{plan.price}</span>
                      <span className="text-slate-500 text-sm ml-1">/mo</span>
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className={`rounded-lg p-3 mb-5 text-center ${
                    plan.popular
                      ? 'bg-orange-500/10 border border-orange-500/20'
                      : plan.accent === 'blue'
                        ? 'bg-blue-500/10 border border-blue-500/20'
                        : 'bg-slate-700/30 border border-slate-600/20'
                  }`}>
                    <p className={`text-xs font-semibold ${
                      plan.popular ? 'text-orange-300' : plan.accent === 'blue' ? 'text-blue-300' : 'text-slate-300'
                    }`}>{plan.highlight}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-grow">
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
                  <Link
                    href="#audit-form"
                    className={`block w-full py-3 rounded-xl font-semibold text-center text-sm transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white btn-glow hover:from-orange-600 hover:to-orange-500'
                        : plan.accent === 'blue'
                          ? 'border border-blue-500/30 text-blue-400 hover:border-blue-400 hover:bg-blue-500/10'
                          : 'border border-slate-700/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50'
                    }`}
                  >
                    Get Started →
                  </Link>
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Compare to Hiring */}
        <FadeIn delay={400}>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 text-center">
              <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Compare to Hiring</h3>
              <div className="text-slate-400 text-sm space-y-2">
                <p>Office manager: <span className="text-white font-semibold">$35K/year</span></p>
                <p>Marketing hire: <span className="text-white font-semibold">$50K/year</span></p>
                <p>Receptionist: <span className="text-white font-semibold">$30K/year</span></p>
                <div className="border-t border-slate-700/50 my-4"></div>
                <p className="text-lg"><span className="text-orange-400 font-bold">Total: $100K+/year</span></p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
