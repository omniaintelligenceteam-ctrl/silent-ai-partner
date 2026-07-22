'use client'

import { motion } from 'motion/react'
import { Shield, Calendar, MapPin } from 'lucide-react'
import { LogoMarquee } from '@/components/ui/LogoMarquee'

// ─── Works-with integration badges ──────────────────────────────────────────
const techStack = ['Google Calendar', 'QuickBooks', 'ServiceTitan', 'Housecall Pro', 'Jobber', 'Stripe', 'Gmail', 'Slack']

// ─── Trust cards data ────────────────────────────────────────────────────────
const trustCards = [
  {
    icon: Shield,
    title: 'You Own Everything',
    description: 'Every tool, every integration, every piece of data we build is yours. If you ever leave, it all walks with you.',
    pulse: true,
  },
  {
    icon: Calendar,
    title: 'Month-to-Month',
    description: 'No contracts. Cancel anytime. We earn the retainer every 30 days or you stop paying it.',
    pulse: false,
  },
  {
    icon: MapPin,
    title: 'Founded in Scottsdale, AZ',
    description: 'Real people. Real company. A human partner who knows your business, not a ticket queue.',
    pulse: false,
  },
]

// ─── Trust Card component ────────────────────────────────────────────────────
function TrustCard({
  icon: Icon,
  title,
  description,
  pulse,
  index,
}: {
  icon: typeof Shield
  title: string
  description: string
  pulse: boolean
  index: number
}) {
  return (
    <motion.div
      className="glass-card p-6 lg:p-8 text-center relative"
      data-glow
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div className="relative inline-flex items-center justify-center mb-5">
        {/* Pulsing ring for shield icon */}
        {pulse && (
          <span className="absolute inset-0 rounded-full animate-ping bg-teal-400/20" style={{ animationDuration: '2.5s' }} />
        )}
        <div className="w-14 h-14 rounded-full bg-teal-400/10 border border-teal-400/20 flex items-center justify-center relative">
          <Icon className="w-6 h-6 text-teal-400" />
        </div>
      </div>
      <h3
        className="text-lg font-bold text-white mb-2"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function TrustSignals() {

  return (
    <section className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">The Partner Model</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <span className="text-white">No contracts. No lock-in.</span>
            <br />
            <span className="gradient-text">You own everything.</span>
          </h2>
        </motion.div>

        {/* Works-with row */}
        <div className="mb-16">
          <p className="text-center text-[10px] font-mono uppercase tracking-[0.15em] text-slate-500 mb-4">Works with</p>
          <LogoMarquee items={techStack} speed={25} />
        </div>

        {/* Trust cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {trustCards.map((card, i) => (
            <TrustCard key={card.title} {...card} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
