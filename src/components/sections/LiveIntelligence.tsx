'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'

export function LiveIntelligence() {
  const [activeLogIndex, setActiveLogIndex] = useState(0)

  const logs = [
    {
      time: '14:02:44',
      type: 'INCOMING CALL',
      message: 'Looking for a quote on a 2000sqft roof replacement in Mesa.',
      tags: ['LEAD CAPTURED', 'SCHEDULED'],
    },
    {
      time: '13:45:12',
      type: 'SCHEDULE CHANGE',
      message: 'Customer "Miller" moved from Thursday to Friday. SMS confirmation dispatched.',
      tags: ['UPDATED'],
    },
    {
      time: '13:18:09',
      type: 'AUTO INVOICE',
      message: 'Follow-up sent for Invoice #8892. Recipient: Anderson Logistics.',
      tags: ['PAYMENT REMINDER'],
    },
    {
      time: '12:01:30',
      type: 'CRM SYNC',
      message: '42 entries updated.',
      tags: ['COMPLETED'],
    }
  ]

  const stats = [
    { label: 'Calls Handled', value: '42', color: 'text-orange-400' },
    { label: 'Booked Today', value: '8', color: 'text-emerald-400' },
    { label: 'Revenue Saved', value: '$4,200', color: 'text-orange-400' },
    { label: 'AI Accuracy', value: '99.1%', color: 'gradient-text-cool' }
  ]

  return (
    <section className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 mb-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display), sans-serif' }}>Watch Sarah Work</h2>
              <div className="flex items-center space-x-2 ml-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-mono text-sm font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Log Display */}
          <div className="lg:col-span-3">
            <FadeIn delay={100}>
              <div className="glass-card p-8">
                <div className="font-mono text-xs text-slate-500 mb-6 pb-3 border-b border-slate-800/50 uppercase tracking-[0.1em]">
                  Operations Log
                </div>

                {/* Tab Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {logs.map((log, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveLogIndex(index)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                        index === activeLogIndex
                          ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400'
                          : 'bg-slate-800/30 border border-slate-700/30 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {log.type}
                    </button>
                  ))}
                </div>

                {/* Active Log Content */}
                <div key={activeLogIndex} className="tab-content-enter p-5 rounded-xl border border-orange-500/20 bg-orange-500/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-xs text-slate-500">[{logs[activeLogIndex].time}]</span>
                      <span className="font-mono text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
                        {logs[activeLogIndex].type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-0">
                      {logs[activeLogIndex].tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{logs[activeLogIndex].message}</p>
                </div>

                {/* Bottom Status Bar */}
                <div className="border-t border-slate-800/50 pt-5 mt-6">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-400">14 Calls Today</span>
                    </div>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">6 Appointments Booked</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <FadeIn delay={200}>
              <div className="glass-card p-8">
                <div className="font-mono text-xs text-slate-500 mb-6 pb-3 border-b border-slate-800/50 uppercase tracking-[0.1em]">
                  Stats
                </div>

                <div className="space-y-5">
                  {stats.map((stat, index) => (
                    <div key={index} className="border-b border-slate-800/30 pb-4 last:border-b-0 last:pb-0">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
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
