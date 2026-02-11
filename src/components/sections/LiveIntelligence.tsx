'use client'

import { useEffect, useState } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'

export function LiveIntelligence() {
  const [activeLogIndex, setActiveLogIndex] = useState(0)

  const logs = [
    {
      time: '14:02:44',
      type: 'INCOMING CALL',
      message: 'Looking for a quote on a 2000sqft roof replacement in Mesa.',
      tags: ['LEAD CAPTURED', 'SCHEDULED'],
      color: 'emerald'
    },
    {
      time: '13:45:12',
      type: 'SCHEDULE CHANGE',
      message: 'Customer "Miller" moved from Thursday to Friday. SMS confirmation dispatched.',
      tags: ['UPDATED'],
      color: 'amber'
    },
    {
      time: '13:18:09',
      type: 'AUTO INVOICE',
      message: 'Follow-up sent for Invoice #8892. Recipient: Anderson Logistics.',
      tags: ['PAYMENT REMINDER'],
      color: 'orange'
    },
    {
      time: '12:01:30',
      type: 'CRM SYNC',
      message: '42 entries updated.',
      tags: ['COMPLETED'],
      color: 'blue'
    }
  ]

  const stats = [
    { label: 'Calls Handled', value: '42' },
    { label: 'Booked Today', value: '8' },
    { label: 'Revenue Saved', value: '$4,200' },
    { label: 'AI Accuracy', value: '99.1%' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % logs.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">Watch Sarah Work</h2>
              <div className="flex items-center space-x-2 ml-4">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-mono text-lg font-semibold">LIVE</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Log Display */}
          <div className="lg:col-span-3">
            <FadeIn delay={100}>
              <div className="glass-card p-6 min-h-[400px]">
                <div className="font-mono text-sm text-slate-400 mb-4 border-b border-slate-700 pb-2">
                  OPERATIONS LOG - REAL TIME MONITORING
                </div>
                
                <div className="space-y-3 mb-6">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        index === activeLogIndex 
                          ? 'border-orange-500/50 bg-orange-500/10 shadow-lg shadow-orange-500/10' 
                          : 'border-slate-700/50 bg-slate-800/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-mono text-xs text-slate-400">[{log.time}]</span>
                          <span className="font-mono text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
                            {log.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                          {log.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="font-mono text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{log.message}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom Status Bar */}
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-slate-300">14 Calls Today</span>
                      </div>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">6 Appointments Booked</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <FadeIn delay={200}>
              <div className="glass-card p-6">
                <div className="font-mono text-sm text-slate-400 mb-4 border-b border-slate-700 pb-2">
                  REAL-TIME STATS
                </div>
                
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="border-b border-slate-800/50 pb-3 last:border-b-0">
                      <div className="text-xs font-mono text-slate-400 mb-1">{stat.label}</div>
                      <div className="text-lg font-bold text-orange-400">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}