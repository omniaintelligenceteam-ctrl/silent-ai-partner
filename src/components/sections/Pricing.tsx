'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

export function Pricing() {
  const plans = [
    {
      name: 'Answering Service',
      price: 197,
      description: 'Essential call handling for growing contractors',
      features: [
        '300 minutes included',
        '24/7 call answering',
        'Professional message taking',
        'Basic FAQ responses',
        'Call recordings & transcripts',
        'Email notifications'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Receptionist',
      price: 297,
      description: 'Complete virtual receptionist solution',
      features: [
        '600 minutes included',
        'Everything in Answering Service',
        'Appointment booking & scheduling',
        'Emergency call routing',
        'Detailed call transcripts',
        'Follow-up text messages',
        'CRM integration (basic)'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Office Manager',
      price: 497,
      description: 'Full AI office manager for serious contractors',
      features: [
        '1,200 minutes included',
        'Everything in Receptionist',
        'Auto-dispatch to field crews',
        'Knows your services & pricing',
        'Custom voice & personality',
        'Bilingual support (Spanish)',
        'Advanced CRM sync',
        'Priority support'
      ],
      cta: 'Start Free Trial',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-slate-300 mb-2">
              No contracts. Cancel anytime.
            </p>
            <p className="text-slate-400">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className={`relative glass-card p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-orange-500/50 scale-105' 
                  : 'hover:border-orange-500/30'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-orange-400">${plan.price}</span>
                    <span className="text-slate-400 ml-2">/month</span>
                  </div>
                  <p className="text-slate-300 text-sm">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/demo"
                  className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white btn-glow hover:from-orange-600 hover:to-amber-600'
                      : 'border-2 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Additional Info */}
        <FadeIn delay={400}>
          <div className="text-center space-y-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-orange-400 font-semibold mb-1">No Setup Fees</div>
                <div className="text-slate-400 text-sm">Start immediately with zero upfront costs</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-semibold mb-1">Cancel Anytime</div>
                <div className="text-slate-400 text-sm">No contracts or cancellation penalties</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-semibold mb-1">24/7 Support</div>
                <div className="text-slate-400 text-sm">Real human help when you need it</div>
              </div>
            </div>

            <div className="mt-8 p-6 glass-card max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-2">Need More Minutes?</h3>
              <p className="text-slate-300 text-sm mb-4">
                Additional minutes are just $0.15 each. No overage fees, just simple per-minute billing.
              </p>
              <div className="text-center">
                <a
                  href="/demo"
                  className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium text-sm"
                >
                  Calculate your usage
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}