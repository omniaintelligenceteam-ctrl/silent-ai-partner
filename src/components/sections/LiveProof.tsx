'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Video } from '@/components/ui/Video'

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
// The proof asset nobody can fake: Agent OS — the dashboard where our own AI
// operators run OIOS. Public sanitized window at agentos.getoios.com/watch.
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
              Built in the open
            </span>
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Don&apos;t take our word for it. <span className="gradient-text">Watch it run.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Most AI companies show you a video. Fine — here&apos;s ours, in 60 seconds. The
            difference: our dashboard stays open, so you can watch the real thing run.
          </p>
        </motion.div>

        {/* The 60-second version */}
        <motion.div
          className="mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Video
            src="https://pub-a387aca030aa4df390425aa14606713c.r2.dev/oios-in-60-seconds.mp4"
            poster="https://pub-a387aca030aa4df390425aa14606713c.r2.dev/oios-in-60-seconds.jpg"
            posterAlt="Agent OS — the live dashboard where OIOS's AI operators run the business"
            aspectRatio="16/9"
            className="max-w-4xl mx-auto border border-white/10"
          />
        </motion.div>

        {/* Agent OS proof panel */}
        <motion.a
          href="https://agentos.getoios.com/watch"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="cta"
          className="group glass-card p-8 lg:p-10 block relative overflow-hidden hover:border-amber-400/30 transition-colors duration-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
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
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Agent OS
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The dashboard where our own AI operators run OIOS. Watch the live feed right
              now — real agents, real activity, not a mockup. This is what your business gets.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-amber-400">
              Watch them run
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </motion.a>

        {/* Under-line */}
        <motion.p
          className="text-center text-sm text-slate-500 mt-10 font-mono"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Everything we sell, we run on our own business first.
        </motion.p>
      </div>
    </section>
  )
}
