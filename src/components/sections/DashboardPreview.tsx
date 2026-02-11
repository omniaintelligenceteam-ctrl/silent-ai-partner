'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'

export function DashboardPreview() {
  const [activeToggle, setActiveToggle] = useState('voice')

  const toggles = [
    { id: 'voice', label: 'Voice Handling', status: 'ON' },
    { id: 'scheduling', label: 'Auto-Scheduling', status: 'ON' },
    { id: 'payments', label: 'Payment Links', status: 'ON' }
  ]

  const quickActions = [
    { id: 'silence', label: 'Silence Alerts', icon: '🔇' },
    { id: 'priority', label: 'High Priority Mode', icon: '🚨' },
    { id: 'sync', label: 'Crew Sync', icon: '👥' }
  ]

  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Your Command Center
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See everything Sarah's doing. Control everything from one screen.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="max-w-5xl mx-auto">
            {/* Mock Dashboard */}
            <div className="glass-card p-8 gradient-border-animated">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
                <div>
                  <h3 className="text-xl font-bold text-white">AI Mission Control</h3>
                  <p className="text-sm text-slate-400">Sarah OS v2.1.3 • Last update: 2 minutes ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 font-mono text-sm">SYSTEM OPERATIONAL</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* AI Mission Control */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-white mb-4">AI Mission Control</h4>
                  
                  <div className="space-y-4 mb-6">
                    {toggles.map((toggle) => (
                      <div key={toggle.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-300">{toggle.label}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-emerald-400 font-mono text-sm">{toggle.status}</span>
                          <button
                            onClick={() => setActiveToggle(toggle.id)}
                            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                              activeToggle === toggle.id 
                                ? 'bg-emerald-500' 
                                : 'bg-slate-600'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                              activeToggle === toggle.id ? 'translate-x-6' : 'translate-x-0.5'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Live Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-400 mb-1">87</div>
                      <div className="text-xs text-slate-400">Calls Today</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">$8,400</div>
                      <div className="text-xs text-slate-400">Revenue Protected</div>
                    </div>
                  </div>
                </div>

                {/* Quick Override */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Override</h4>
                  
                  <div className="space-y-3">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        className="w-full flex items-center space-x-3 p-4 bg-slate-800/50 hover:bg-orange-500/10 hover:border-orange-500/30 border border-slate-700 rounded-lg transition-colors duration-200"
                      >
                        <span className="text-xl">{action.icon}</span>
                        <span className="text-slate-300">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Emergency Contact */}
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h5 className="font-semibold text-red-400 mb-2">Emergency Override</h5>
                    <p className="text-sm text-slate-400 mb-3">
                      Direct all calls to your phone immediately
                    </p>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                      Activate Emergency Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Features List */}
        <FadeIn delay={200}>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}