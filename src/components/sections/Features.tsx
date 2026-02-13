'use client'

import { FadeIn } from '@/components/ui/FadeIn'

export function Features() {
  const features = [
    {
      title: 'Full-Spectrum Defense',
      description: 'Instantly capture every missed call. No more losing $10k leads because you were in a crawl space.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      borderColor: 'border-t-orange-500/40',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
    },
    {
      title: 'Industrial Precision',
      description: 'Auto-schedules directly into ServiceTitan, Housecall Pro, or Google Calendar with job notes and customer priority levels.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      borderColor: 'border-t-blue-500/40',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Emergency Triage',
      description: 'Sarah detects urgency in a caller\'s voice. Burst pipes and power outages get escalated to your phone instantly.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      borderColor: 'border-t-cyan-500/40',
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-400',
    }
  ]

  return (
    <section className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Built for the Trades
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Industrial-grade AI that handles real contractor scenarios. No generic solutions here.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 150}>
              <div className={`glass-card p-8 lg:p-10 border-t-2 ${feature.borderColor} group`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.iconBg} rounded-2xl ${feature.iconColor} mb-8 group-hover:scale-105 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Stats */}
        <FadeIn delay={500}>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { value: '99.8%', label: 'Uptime Guarantee', color: 'text-emerald-400' },
              { value: '<1sec', label: 'Average Response', color: 'gradient-text-cool' },
              { value: '24/7', label: 'Never Sleeps', color: 'text-orange-400' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2 tracking-tight`}>{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
