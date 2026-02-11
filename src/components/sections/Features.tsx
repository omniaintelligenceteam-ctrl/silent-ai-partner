'use client'

import { FadeIn } from '@/components/ui/FadeIn'

export function Features() {
  const features = [
    {
      title: 'Full-Spectrum Defense',
      description: 'Instantly capture every missed call. No more losing $10k leads because you were in a crawl space.',
      tag: 'MAPPING_TO_REVENUE: HIGH',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Industrial Precision',
      description: 'Auto-schedules directly into ServiceTitan, Housecall Pro, or Google Calendar with job notes and customer priority levels.',
      tag: 'LATENCY_INDEX: < 10ms',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Emergency Triage',
      description: 'Sarah detects urgency in a caller\'s voice. Burst pipes and power outages get escalated to your phone instantly.',
      tag: 'STATUS: ALWAYS_ON',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Built for the Trades
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Industrial-grade AI that handles real contractor scenarios. No generic solutions here.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="glass-card p-8 hover:border-orange-500/30 transition-all duration-300 group">
                {/* Tag */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-orange-500/20 mb-6">
                  <span className="text-xs font-mono text-orange-400">
                    {feature.tag}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full text-orange-400 mb-6 group-hover:bg-orange-500/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                
                {/* Bottom Border Effect */}
                <div className="mt-6 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Stats */}
        <FadeIn delay={400}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">99.8%</div>
              <div className="text-slate-300 text-sm">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">&lt;1sec</div>
              <div className="text-slate-300 text-sm">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-slate-300 text-sm">Never Sleeps</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}