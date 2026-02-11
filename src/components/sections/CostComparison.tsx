'use client'

import { FadeIn } from '@/components/ui/FadeIn'

export function CostComparison() {
  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Human vs AI Cost
            </h2>
            <p className="text-xl text-slate-300">
              The math is simple. The savings are massive.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <div className="glass-card p-8">
              <div className="space-y-8">
                {/* Office Manager Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Office Manager (Monthly)</h3>
                      <p className="text-sm text-slate-400">Salary + benefits + overhead + sick days + vacation</p>
                    </div>
                    <div className="text-2xl font-bold text-red-400">$4,500</div>
                  </div>
                  <div className="w-full h-8 bg-slate-800 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg animate-pulse"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>

                {/* Sarah AI Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sarah AI (Monthly)</h3>
                      <p className="text-sm text-slate-400">24/7 availability + no sick days + no vacation</p>
                    </div>
                    <div className="text-2xl font-bold text-orange-400">$297</div>
                  </div>
                  <div className="w-full h-8 bg-slate-800 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg"
                      style={{ width: '6.6%' }}
                    ></div>
                  </div>
                </div>

                {/* Savings */}
                <div className="border-t border-slate-700 pt-6">
                  <div className="flex items-center justify-between text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">$4,203</div>
                      <div className="text-sm text-slate-400">Monthly Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">$50,436</div>
                      <div className="text-sm text-slate-400">Annual Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">93%</div>
                      <div className="text-sm text-slate-400">Cost Reduction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Testimonial Quote */}
          <FadeIn delay={200}>
            <div className="mt-12 text-center">
              <blockquote className="glass-card p-8 max-w-3xl mx-auto">
                <p className="text-lg text-slate-300 italic mb-4">
                  "Sarah paid for herself within the first 48 hours by capturing a missed $12k roofing lead."
                </p>
                <footer className="text-orange-400 font-semibold">
                  — Mike Rodriguez, Rodriguez Roofing
                </footer>
              </blockquote>
            </div>
          </FadeIn>

          {/* ROI Calculator */}
          <FadeIn delay={300}>
            <div className="mt-12 glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Quick ROI Calculator</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-lg font-bold text-orange-400 mb-1">1 Week</div>
                  <div className="text-sm text-slate-400">Average payback period</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-lg font-bold text-orange-400 mb-1">1,700%</div>
                  <div className="text-sm text-slate-400">Annual ROI</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-lg font-bold text-orange-400 mb-1">$142</div>
                  <div className="text-sm text-slate-400">Daily savings vs human</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}