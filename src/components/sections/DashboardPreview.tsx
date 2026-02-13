'use client'

import { FadeIn } from '@/components/ui/FadeIn'

export function DashboardPreview() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Your Command Center
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              See everything Sarah&apos;s doing. Control everything from one screen.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
            {/* Mock Dashboard with 3D depth */}
            <div className="glass-card p-8 lg:p-10 gradient-border-animated" style={{ transform: 'rotateX(2deg)' }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-800/50">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">AI Mission Control</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">Sarah OS v2.1.3</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 font-mono text-xs">OPERATIONAL</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-2">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Active Systems</div>

                  <div className="space-y-3 mb-8">
                    {[
                      { label: 'Voice Handling', status: true },
                      { label: 'Auto-Scheduling', status: true },
                      { label: 'Payment Links', status: true },
                    ].map((toggle) => (
                      <div key={toggle.label} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                        <span className="text-slate-300 text-sm">{toggle.label}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-emerald-400 font-mono text-xs">ON</span>
                          <div className="w-10 h-5 bg-emerald-500/30 rounded-full relative">
                            <div className="w-4 h-4 bg-emerald-400 rounded-full absolute top-0.5 right-0.5 shadow-sm shadow-emerald-400/50"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Live Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 rounded-xl p-5">
                      <div className="text-2xl font-bold text-orange-400 tracking-tight mb-1">87</div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Calls Today</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-xl p-5">
                      <div className="text-2xl font-bold text-emerald-400 tracking-tight mb-1">$8,400</div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Revenue Protected</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Quick Actions</div>

                  <div className="space-y-3">
                    {[
                      { label: 'Silence Alerts', icon: '🔇' },
                      { label: 'Priority Mode', icon: '🚨' },
                      { label: 'Crew Sync', icon: '👥' },
                    ].map((action) => (
                      <div
                        key={action.label}
                        className="flex items-center space-x-3 p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-xl transition-colors duration-200 cursor-default"
                      >
                        <span className="text-lg">{action.icon}</span>
                        <span className="text-slate-400 text-sm">{action.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Emergency Override */}
                  <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                    <h5 className="font-medium text-red-400 text-sm mb-2">Emergency Override</h5>
                    <p className="text-xs text-slate-500 mb-3">
                      Route all calls to your phone
                    </p>
                    <div className="w-full bg-red-500/20 text-red-400 py-2 px-4 rounded-lg text-xs font-medium text-center border border-red-500/20">
                      Activate Emergency Mode
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Features List */}
        <FadeIn delay={200}>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              'Real-time call monitoring',
              'Custom response templates',
              'Schedule integration sync',
              'Performance analytics',
              'Team notifications',
              'Backup phone routing',
              'Call recording access',
              'Revenue tracking'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2.5 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-400/60 rounded-full flex-shrink-0"></div>
                <span className="text-slate-500">{feature}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
