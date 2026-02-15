'use client'

import { useRef, useState, useEffect } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function CostComparison() {
  const barsRef = useRef<HTMLDivElement>(null)
  const [barsVisible, setBarsVisible] = useState(false)

  useEffect(() => {
    const el = barsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Human vs AI Cost
            </h2>
            <p className="text-lg text-slate-400">
              The math is simple. The savings are massive.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <div className="glass-card p-8 lg:p-10" ref={barsRef}>
              <div className="space-y-10">
                {/* Office Manager Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Office Manager</h3>
                      <p className="text-sm text-slate-500">Salary + benefits + overhead + sick days</p>
                    </div>
                    <div className="text-2xl font-bold text-red-400 tracking-tight">
                      <AnimatedCounter end={4500} prefix="$" /><span className="text-sm text-slate-500 font-normal">/mo</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500/80 to-red-400/80 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: barsVisible ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Sarah AI Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sarah AI</h3>
                      <p className="text-sm text-slate-500">24/7 availability + no sick days + no vacation</p>
                    </div>
                    <div className="text-2xl font-bold text-orange-400 tracking-tight">
                      <AnimatedCounter end={297} prefix="$" /><span className="text-sm text-slate-500 font-normal">/mo</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000 ease-out delay-500"
                      style={{ width: barsVisible ? '6.6%' : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Savings */}
                <div className="border-t border-slate-800/50 pt-8">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-emerald-400 tracking-tight">
                        <AnimatedCounter end={4203} prefix="$" />
                      </div>
                      <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">Monthly Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-emerald-400 tracking-tight">
                        <AnimatedCounter end={50436} prefix="$" />
                      </div>
                      <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">Annual Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-emerald-400 tracking-tight">
                        <AnimatedCounter end={93} suffix="%" />
                      </div>
                      <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">Cost Reduction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Testimonial Quote */}
          {/* Testimonials coming soon — real customers only */}

          {/* ROI Calculator */}
          <FadeIn delay={300}>
            <div className="mt-12 glass-card p-8">
              <h3 className="text-lg font-bold text-white mb-6 text-center tracking-tight">Quick ROI</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                {[
                  { value: '1 Week', label: 'Average payback period', color: 'text-orange-400' },
                  { value: '1,700%', label: 'Annual ROI', color: 'gradient-text-warm' },
                  { value: '$142', label: 'Daily savings vs human', color: 'text-emerald-400' },
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-slate-800/30 rounded-xl">
                    <div className={`text-xl font-bold ${item.color} mb-1`}>{item.value}</div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
