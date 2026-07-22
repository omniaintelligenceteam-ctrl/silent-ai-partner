'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import {
  Phone,
  FileText,
  BarChart3,
  Shield,
  Zap,
  Clock,
  ChevronDown,
  ArrowRight,
  Calculator,
  TrendingUp,
  Wallet,
  CalendarClock,
} from 'lucide-react'

/* ─── Tier Data ──────────────────────────────────────────────────────────────── */

const tiers = [
  {
    name: 'Foundation',
    tagline: 'Your AI OS, installed and running.',
    icon: Phone,
    accent: 'teal' as const,
    gradient: 'from-teal-500/20 via-teal-400/5 to-transparent',
    glowColor: 'rgba(45,212,191,0.15)',
    hexColor: '#2DD4BF',
    description:
      'The entry point. We install your AI Operating System, put an AI receptionist on your phones, and ship one custom build every month.',
    includes: [
      'AIOS install — first build live by Day 7',
      'AI call answering — 24/7, every ring',
      'One custom build per month',
      '24/7 monitoring on everything we ship',
      'Monthly business review with your partner',
    ],
    bestFor: 'Owners who want the phones and the admin handled first',
  },
  {
    name: 'Engine',
    tagline: 'The whole back office on autopilot.',
    icon: FileText,
    accent: 'amber' as const,
    gradient: 'from-amber-500/20 via-amber-400/5 to-transparent',
    glowColor: 'rgba(245,158,11,0.15)',
    hexColor: '#F59E0B',
    popular: true,
    description:
      'Everything in Foundation, moving faster. Two to three builds a month, and every system we ship gets tuned monthly so it keeps getting better.',
    includes: [
      'Everything in Foundation',
      'Two to three custom builds per month',
      'Monthly optimization on every shipped system',
      'Direct line to your partner — Slack or text',
      'Follow-ups, invoicing, CRM, and reporting automated',
    ],
    bestFor: 'Teams ready to automate the whole back office',
  },
  {
    name: 'Empire',
    tagline: 'Your entire business, orchestrated.',
    icon: BarChart3,
    accent: 'cyan' as const,
    gradient: 'from-cyan-500/20 via-cyan-400/5 to-transparent',
    glowColor: 'rgba(6,182,212,0.15)',
    hexColor: '#06B6D4',
    description:
      'The deep partnership. A queued build pipeline that never stops, weekly optimization, and a dedicated operations surface across the whole business.',
    includes: [
      'Everything in Engine',
      'Queued builds — the pipeline never sits idle',
      'Weekly optimization across every system',
      'Dedicated COO-level operations surface',
      'Shared 12-month roadmap, built with you',
    ],
    bestFor: 'Owners who want an AI-first operating layer across the business',
  },
]

const accentMap = {
  teal: {
    text: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/20',
    borderHover: 'hover:border-teal-400/40',
    ring: 'ring-teal-400/20',
    checkBg: 'bg-teal-400/10',
    checkBorder: 'border-teal-400/20',
    checkStroke: '#2DD4BF',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    borderHover: 'hover:border-amber-400/40',
    ring: 'ring-amber-400/20',
    checkBg: 'bg-amber-400/10',
    checkBorder: 'border-amber-400/20',
    checkStroke: '#FBBF24',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    borderHover: 'hover:border-cyan-400/40',
    ring: 'ring-cyan-400/20',
    checkBg: 'bg-cyan-400/10',
    checkBorder: 'border-cyan-400/20',
    checkStroke: '#22D3EE',
  },
}

/* ─── Process Steps ──────────────────────────────────────────────────────────── */

const steps = [
  {
    num: '01',
    title: 'Install Week',
    description:
      'Day 1–7: we set up your AI Operating System — workspace, integrations, your rules, prices, and tone — and ship your first custom build live. Working in your business, not a demo.',
    icon: Zap,
    accent: 'text-amber-400',
    glow: 'rgba(245,158,11,0.12)',
  },
  {
    num: '02',
    title: 'One Meeting a Month',
    description:
      'We review the last 30 days together, then decide what to build next. One big build — or two small ones. You direct the roadmap; we ship it.',
    icon: Clock,
    accent: 'text-teal-400',
    glow: 'rgba(45,212,191,0.12)',
  },
  {
    num: '03',
    title: 'The Stack Compounds',
    description:
      'Everything already built keeps running 24/7 while the next thing ships. By month six, six systems are working while the seventh goes live.',
    icon: Shield,
    accent: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.12)',
  },
]

/* ─── Animated Checkmark ─────────────────────────────────────────────────────── */

function AnimatedCheck({ delay, accent }: { delay: number; accent: 'teal' | 'amber' | 'cyan' }) {
  const a = accentMap[accent]
  return (
    <div className={`w-5 h-5 rounded-full ${a.checkBg} border ${a.checkBorder} flex items-center justify-center flex-shrink-0 mt-0.5`}>
      <svg viewBox="0 0 12 12" className="w-3 h-3">
        <motion.path
          d="M2.5 6.5l2 2 5-5"
          stroke={a.checkStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay }}
        />
      </svg>
    </div>
  )
}

/* ─── Tier Card ──────────────────────────────────────────────────────────────── */

function TierCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [expanded, setExpanded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const a = accentMap[tier.accent]
  const Icon = tier.icon

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={ref}
      className={`relative group ${tier.popular ? 'lg:-mt-6 lg:mb-6' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', stiffness: 80 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow for popular */}
      {tier.popular && (
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
          style={{ background: `linear-gradient(135deg, ${tier.hexColor}33, transparent 50%, ${tier.hexColor}22)` }}
        />
      )}

      {/* Card container */}
      <div className={`relative overflow-hidden rounded-2xl border ${
        tier.popular
          ? 'border-amber-400/30 bg-[rgba(15,23,42,0.6)]'
          : 'border-slate-700/40 bg-[rgba(15,23,42,0.4)]'
      } backdrop-blur-xl transition-all duration-500 ${
        tier.popular ? 'shadow-[0_0_40px_rgba(245,158,11,0.08)]' : ''
      } group-hover:border-opacity-60`}>

        {/* Spotlight follow cursor */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${tier.glowColor}, transparent 40%)`,
            }}
          />
        )}

        {/* Top gradient bleed */}
        <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${tier.gradient} pointer-events-none`} />

        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute -top-px left-0 right-0 z-20 flex justify-center">
            <motion.div
              className="relative"
              initial={{ y: -20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-400 text-white px-6 py-1.5 rounded-b-xl text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_4px_20px_rgba(245,158,11,0.3)] overflow-hidden">
                MOST POPULAR
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                />
              </div>
            </motion.div>
          </div>
        )}

        <div className={`relative z-10 p-8 lg:p-10 ${tier.popular ? 'pt-12' : ''}`}>

          {/* Icon + name */}
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              className={`w-12 h-12 rounded-2xl ${a.bg} border ${a.border} flex items-center justify-center flex-shrink-0`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Icon className={`w-6 h-6 ${a.text}`} />
            </motion.div>
            <div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {tier.name}
              </h3>
              <p className={`text-sm font-semibold ${a.text} mt-0.5`}>{tier.tagline}</p>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-7">
            {tier.description}
          </p>

          {/* Custom pricing — styled */}
          <div className="flex items-baseline gap-3 mb-7 pb-7 border-b border-slate-700/30">
            <span
              className={`text-3xl font-bold ${a.text}`}
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              Custom
            </span>
            <span className="text-slate-500 text-sm">scoped to your business</span>
          </div>

          {/* Includes */}
          <div className="mb-7">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-slate-500 mb-4 py-2 -my-2 md:pointer-events-none min-h-[44px]"
            >
              <span>What&apos;s included</span>
              <motion.span
                className="md:hidden"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            {/* Desktop — always visible */}
            <div className="hidden md:block space-y-3">
              {tier.includes.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                >
                  <AnimatedCheck delay={0.5 + i * 0.07} accent={tier.accent} />
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Mobile accordion */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  className="md:hidden overflow-hidden space-y-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tier.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <AnimatedCheck delay={0.08 + i * 0.05} accent={tier.accent} />
                      <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Best for */}
          <div className="text-[11px] font-mono text-slate-500 mb-7">
            Best for:{' '}
            <span className="text-slate-400">{tier.bestFor}</span>
          </div>

          {/* CTA */}
          <MagneticButton>
            <Link
              href="/form"
              data-cursor="cta"
              className={`block w-full py-[18px] rounded-xl font-bold text-center text-base tracking-wide transition-all duration-300 ${
                tier.popular
                  ? 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white shadow-[0_0_24px_rgba(245,158,11,0.3)] hover:shadow-[0_0_36px_rgba(245,158,11,0.5)]'
                  : `bg-slate-800/80 border-2 ${a.border} text-white hover:bg-slate-700/80 ${a.borderHover}`
              }`}
            >
              {tier.popular ? 'Start Month 1 →' : 'Book a Call →'}
            </Link>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ROI Calculator ──────────────────────────────────────────────────────────── */

function ROICalculator() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [jobsPerMonth, setJobsPerMonth] = useState(40)
  const [avgJobValue, setAvgJobValue] = useState(1500)
  const [adminHours, setAdminHours] = useState(20)
  const [teamSize, setTeamSize] = useState(5)

  const monthlyAdminCost = Math.round(adminHours * 4.33 * 25)
  const monthlyLeakRevenue = Math.round(jobsPerMonth * 0.15 * avgJobValue)
  const annualCost = (monthlyAdminCost + monthlyLeakRevenue) * 12

  const sliderClass = 'w-full h-2 bg-slate-700/50 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-400 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(45,212,191,0.5)] [&::-webkit-slider-thumb]:cursor-pointer'

  return (
    <section className="py-28 lg:py-36 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/[0.04] to-emerald-500/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/40 mb-8">
            <Calculator className="w-3.5 h-3.5 text-teal-400 mr-2" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">The Leak Calculator</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            <span className="text-white">What&apos;s the leak </span>
            <span className="gradient-text">costing you?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">Missed calls, unworked leads, and admin hours have a price. Put your numbers in.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <motion.div
            className="glass-card p-8 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: 'Jobs per month', value: jobsPerMonth, set: setJobsPerMonth, min: 10, max: 200, display: String(jobsPerMonth) },
              { label: 'Average job value', value: avgJobValue, set: setAvgJobValue, min: 100, max: 10000, display: `$${avgJobValue.toLocaleString()}` },
              { label: 'Admin hours per week', value: adminHours, set: setAdminHours, min: 5, max: 60, display: `${adminHours}hrs` },
              { label: 'Team size', value: teamSize, set: setTeamSize, min: 1, max: 50, display: String(teamSize) },
            ].map((slider) => (
              <div key={slider.label}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-slate-300 font-medium">{slider.label}</span>
                  <span className="text-sm font-bold text-teal-400 font-mono">{slider.display}</span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  value={slider.value}
                  onChange={(e) => slider.set(Number(e.target.value))}
                  className={sliderClass}
                />
              </div>
            ))}
          </motion.div>

          {/* Outputs */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: Wallet, label: 'Admin hours cost, per month', value: `$${monthlyAdminCost.toLocaleString()}`, color: 'text-emerald-400', border: 'border-emerald-400/20' },
              { icon: TrendingUp, label: 'Revenue leaking from lost leads', value: `$${monthlyLeakRevenue.toLocaleString()}`, color: 'text-amber-400', border: 'border-amber-400/20' },
              { icon: BarChart3, label: 'Annual cost of doing nothing', value: `$${annualCost.toLocaleString()}`, color: 'text-teal-400', border: 'border-teal-400/20' },
              { icon: CalendarClock, label: 'Hours back per week with OIOS', value: `~${adminHours}hrs`, color: 'text-cyan-400', border: 'border-cyan-400/20' },
            ].map((output) => {
              const Icon = output.icon
              return (
                <div key={output.label} className={`glass-card p-5 border ${output.border} flex items-center gap-4`}>
                  <div className={`w-10 h-10 rounded-xl bg-slate-800/80 border ${output.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${output.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">{output.label}</div>
                    <div className={`text-2xl font-bold ${output.color}`} style={{ fontFamily: 'var(--font-display), sans-serif' }}>{output.value}</div>
                  </div>
                </div>
              )
            })}

            <div className="mt-4">
              <MagneticButton className="w-full">
                <Link
                  href="/form"
                  data-cursor="cta"
                  className="block w-full bg-gradient-to-r from-amber-500 to-amber-400 text-white py-4 rounded-xl font-bold text-center text-lg btn-glow hover:from-amber-600 hover:to-amber-500 transition-colors"
                >
                  Get Your Custom Quote →
                </Link>
              </MagneticButton>
              <p className="text-center text-slate-500 text-xs mt-3">Based on industry averages. Your results may vary.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing FAQ ──────────────────────────────────────────────────────────── */

const pricingFaqs = [
  { q: "Why don't you list prices publicly?", a: "Every stack is custom — your rules, your tools, your workflows. We quote against what you'd spend hiring for the same work (a receptionist, a bookkeeper, a dev shop), not against a menu. Book a call and we'll scope it with you." },
  { q: 'Is there a contract?', a: 'No. Month-to-month, cancel anytime, no fees. And you own everything we build — if you leave, every tool, integration, and piece of data walks with you.' },
  { q: 'What happens in Month 1?', a: "The install. We set up your AI Operating System, connect your tools, and ship your first custom build live by Day 7 — a real thing working in your business, not a demo. Then the monthly rhythm starts: one meeting, one big build, everything else keeps running." },
  { q: 'Can I change bands later?', a: 'Yes. The bands describe scope, not a cage. As your business grows, the build cadence and coverage grow with it — changes take effect the next month.' },
]

function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 lg:py-32 bg-bg-primary relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            Pricing Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {pricingFaqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-teal-400 flex-shrink-0 text-lg"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Process Step Card ──────────────────────────────────────────────────────── */

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Connecting line (not on last) */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-12 left-[calc(100%+1rem)] w-[calc(100%-2rem)] z-0">
          <motion.div
            className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            style={{ transformOrigin: 'left' }}
          />
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 + index * 0.2 }}
          >
            <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          </motion.div>
        </div>
      )}

      <div className="glass-card p-8 text-center relative overflow-hidden group hover:border-slate-600/40 transition-all duration-300">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 0%, ${step.glow}, transparent 70%)` }}
        />

        <div className="relative z-10">
          {/* Step number ring */}
          <div className="relative w-16 h-16 mx-auto mb-5">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(51,65,85,0.4)" strokeWidth="1.5" />
              <motion.circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={step.glow.replace('0.12', '0.6')}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={175.9}
                initial={{ strokeDashoffset: 175.9 }}
                animate={inView ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 1.5, delay: 0.3 + index * 0.2, ease: 'easeOut' }}
                transform="rotate(-90 32 32)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className={`w-6 h-6 ${step.accent}`} />
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em] mb-2 uppercase">
            Step {step.num}
          </div>
          <h3
            className="text-lg font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {step.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */

export function WhatToExpect() {
  const guaranteeRef = useRef(null)
  const guaranteeInView = useInView(guaranteeRef, { once: true, margin: '-60px' })
  const tiersRef = useRef(null)
  const tiersInView = useInView(tiersRef, { once: true, margin: '-80px' })

  return (
    <>
      {/* ═══ Tiers Section ═══ */}
      <section className="py-28 lg:py-36 bg-bg-secondary relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/[0.03] via-amber-500/[0.04] to-cyan-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            ref={tiersRef}
            className="text-center mb-20 lg:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={tiersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/40 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={tiersInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
            >
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2.5 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                Capability Bands
              </span>
            </motion.div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <motion.span
                className="text-white block"
                initial={{ opacity: 0, y: 20 }}
                animate={tiersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                Three bands.
              </motion.span>
              <motion.span
                className="gradient-text-warm"
                initial={{ opacity: 0, y: 20 }}
                animate={tiersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                One partner.
              </motion.span>
            </h2>

            <motion.p
              className="mt-6 text-slate-400 text-lg max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={tiersInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Bands describe scope, not price. Every engagement is quoted custom — against what you&apos;d spend hiring for the same work.
            </motion.p>
          </motion.div>

          {/* Tier Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>

          {/* No-contract strip */}
          <motion.div
            className="flex items-center justify-center gap-6 mt-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {['Month-to-month', 'No contracts', 'Cancel anytime'].map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-700 hidden sm:inline">·</span>}
                <span className="text-slate-500 text-sm font-mono">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ROI Calculator ═══ */}
      <ROICalculator />

      {/* ═══ Process Section ═══ */}
      <section className="py-28 lg:py-36 bg-bg-primary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/40 mb-8">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2.5 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                The Process
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <span className="text-white">From install to </span>
              <span className="gradient-text">autopilot.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Guarantee Section ═══ */}
      <section className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.06] to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            ref={guaranteeRef}
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={guaranteeInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          >
            {/* Animated gradient border */}
            <div className="absolute -inset-px rounded-2xl gradient-border-animated" />

            <div className="relative bg-[rgba(15,23,42,0.7)] backdrop-blur-xl p-10 lg:p-14 text-center rounded-2xl">
              {/* Spotlight sweep */}
              {guaranteeInView && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(52,211,153,0.1) 45%, rgba(52,211,153,0.15) 50%, rgba(45,212,191,0.1) 55%, transparent 60%)',
                  }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.8, delay: 0.4, ease: 'easeInOut' }}
                />
              )}

              {/* Shield icon with pulse ring */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400/10 border border-emerald-400/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 rounded-full bg-emerald-400/5 border border-emerald-400/15 flex items-center justify-center">
                  <motion.span
                    className="text-4xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🛡️
                  </motion.span>
                </div>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-bold text-white mb-3 relative"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                You Own Everything We Build
              </h3>
              <p className="text-emerald-400 font-bold text-lg mb-4 relative">
                Month-to-Month. No Contracts. No Lock-In.
              </p>
              <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto mb-10 relative">
                Every tool, every integration, every piece of data is yours. If you ever leave,
                it all walks with you and keeps working. We earn the retainer every 30 days —
                or you stop paying it.
              </p>

              <MagneticButton>
                <Link
                  href="/form"
                  data-cursor="cta"
                  className="inline-block bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white px-12 py-[18px] rounded-xl text-lg font-bold shadow-[0_0_24px_rgba(245,158,11,0.3)] hover:shadow-[0_0_36px_rgba(245,158,11,0.5)] transition-all duration-300 relative tracking-wide"
                >
                  Start Month 1 →
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Pricing FAQ ═══ */}
      <PricingFAQ />
    </>
  )
}
