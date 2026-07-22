'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Phone, ArrowUpRight } from 'lucide-react'

// ─── Live status dot ─────────────────────────────────────────────────────────
function LiveDot({ color = 'bg-emerald-400' }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-60 animate-ping`} style={{ animationDuration: '2s' }} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  )
}

// ─── Live Proof ──────────────────────────────────────────────────────────────
// The two proof assets nobody can fake: a demo line you can call right now,
// and the Agent OS dashboard where our own operators work in the open.
export function LiveProof() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 lg:py-32 bg-bg-primary relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 mb-6">
            <LiveDot />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
              Live right now
            </span>
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Don&apos;t take our word for it. <span className="gradient-text">Test it.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Most AI companies show you a video. We give you a phone number and a live dashboard.
          </p>
        </motion.div>

        {/* Two proof panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Panel 1 — the demo line */}
          <motion.a
            href="tel:+18667821303"
            data-cursor="cta"
            className="group glass-card p-8 lg:p-10 block relative overflow-hidden hover:border-teal-400/30 transition-colors duration-300"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(500px circle at 20% 0%, rgba(45,212,191,0.25), transparent 60%)' }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <LiveDot />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
                  Demo line — answers 24/7
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  (866) 782-1303
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                A real AI receptionist answers, handles the curveballs, books the appointment,
                and texts a summary. Try to stump her.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal-400">
                Call the demo line
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.a>

          {/* Panel 2 — Agent OS in the open */}
          <motion.a
            href="https://agentos.getoios.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="cta"
            className="group glass-card p-8 lg:p-10 block relative overflow-hidden hover:border-amber-400/30 transition-colors duration-300"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(500px circle at 80% 0%, rgba(245,158,11,0.22), transparent 60%)' }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <LiveDot color="bg-amber-400" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
                  Our agents, working in the open
                </span>
              </div>
              <div className="mb-4">
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors duration-300 break-all"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  agentos.getoios.com
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The dashboard where our own AI operators run OIOS. Real agent activity you can
                watch, not a mockup. This is what your business gets.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-amber-400">
                Watch them work
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.a>
        </div>

        {/* Under-line */}
        <motion.p
          className="text-center text-sm text-slate-500 mt-10 font-mono"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Everything we sell, we run on our own business first.
        </motion.p>
      </div>
    </section>
  )
}
