'use client'

import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion, AnimatePresence } from 'motion/react'

// ─── Step 1 Visual: Animated checklist with SVG checkmark draw ──────────────
const auditItems = [
  'Workspace, integrations, and API keys set up',
  'AI trained on your rules, prices, and tone',
  'Phones and calendar connected',
  'First custom build scoped with you',
  'Build live and working by Day 7',
]

function AnimatedCheck({ visible }: { visible: boolean }) {
  return (
    <div className="w-5 h-5 flex-shrink-0">
      {visible ? (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <motion.circle
            cx="12" cy="12" r="10"
            stroke="#2DD4BF"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M8 12.5l2.5 2.5 5.5-5.5"
            stroke="#2DD4BF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" stroke="#334155" strokeWidth="2" fill="none" />
        </svg>
      )}
    </div>
  )
}

function AuditChecklist({ active }: { active: boolean }) {
  const [checked, setChecked] = useState<boolean[]>(auditItems.map(() => false))

  useEffect(() => {
    if (!active) {
      setChecked(auditItems.map(() => false))
      return
    }
    auditItems.forEach((_, i) => {
      setTimeout(() => {
        setChecked(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, i * 500 + 300)
    })
  }, [active])

  return (
    <div className="glass-card p-6 lg:p-8 space-y-4">
      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-6">Month 1 Install</div>
      {auditItems.map((item, i) => (
        <motion.div
          key={item}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -15 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
        >
          <AnimatedCheck visible={checked[i]} />
          <span className={`text-sm transition-colors duration-300 ${checked[i] ? 'text-white' : 'text-slate-500'}`}>
            {item}
          </span>
        </motion.div>
      ))}
      <div className="pt-4 border-t border-slate-700/30 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs text-slate-400 font-mono">Day 1–7 · live in your business</span>
        </div>
      </div>
    </div>
  )
}

// ─── Step 2 Visual: Config UI with slide-in stagger ──────────────────────────
const workflows = [
  { name: 'Call Answering', status: 'live', color: 'text-teal-400', dot: 'bg-teal-400' },
  { name: 'Lead Capture', status: 'live', color: 'text-teal-400', dot: 'bg-teal-400' },
  { name: 'Proposal Generator', status: 'live', color: 'text-teal-400', dot: 'bg-teal-400' },
  { name: 'Follow-Up Sequences', status: 'building', color: 'text-amber-400', dot: 'bg-amber-400' },
  { name: 'Morning Briefing', status: 'building', color: 'text-amber-400', dot: 'bg-amber-400' },
  { name: 'Weekly Report', status: 'queued', color: 'text-slate-500', dot: 'bg-slate-600' },
]

function ConfigMock({ active }: { active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!active) { setVisibleCount(0); return }
    workflows.forEach((_, i) => {
      setTimeout(() => setVisibleCount(i + 1), i * 400 + 200)
    })
  }, [active])

  return (
    <div className="glass-card p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em]">OIOS Configuration</div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Building…
        </div>
      </div>
      <div className="space-y-3">
        {workflows.slice(0, visibleCount).map((wf) => (
          <motion.div
            key={wf.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-800/40 border border-slate-700/30"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full ${wf.dot} ${wf.status === 'building' ? 'animate-pulse' : ''}`} />
              <span className="text-xs text-slate-300">{wf.name}</span>
            </div>
            <span className={`text-[10px] font-mono ${wf.color}`}>{wf.status}</span>
          </motion.div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="mt-5 pt-4 border-t border-slate-700/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-slate-600">Setup Progress</span>
          <span className="text-[10px] font-mono text-amber-400">
            {Math.min(visibleCount, workflows.length)}/{workflows.length}
          </span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 to-amber-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(visibleCount / workflows.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="text-[10px] font-mono text-slate-600 mt-2">
          Built with your data · your voice · your workflows
        </div>
      </div>
    </div>
  )
}

// ─── Typing indicator ────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-slate-700/60 px-3 py-2 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-slate-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Step 3 Visual: Chat with typing indicator ──────────────────────────────
const messages = [
  { from: 'oios', text: '☀ Good morning. Here\'s your 6:30 briefing:\n• 3 new leads overnight\n• 1 proposal stalled (Johnson HVAC — 5 days)\n• 2 jobs confirmed for today', delay: 0 },
  { from: 'owner', text: 'Follow up on that Johnson proposal', delay: 1800 },
  { from: 'oios', text: 'Done. Follow-up sent to Johnson HVAC. Want me to flag it again if no response by Friday?', delay: 3200 },
  { from: 'owner', text: 'Yes. Also send me the week\'s numbers', delay: 4400 },
  { from: 'oios', text: '📊 This week: $24,400 revenue · 8 jobs · 94% answer rate · 0 missed follow-ups', delay: 5800 },
]

function ChatMock({ active }: { active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    if (!active) { setVisibleCount(0); setShowTyping(false); return }
    const timers: ReturnType<typeof setTimeout>[] = []
    messages.forEach((msg, i) => {
      // Show typing indicator before OIOS messages
      if (msg.from === 'oios' && i > 0) {
        timers.push(setTimeout(() => setShowTyping(true), msg.delay - 600))
      }
      timers.push(setTimeout(() => {
        setShowTyping(false)
        setVisibleCount(i + 1)
      }, msg.delay + 400))
    })
    return () => timers.forEach(clearTimeout)
  }, [active])

  return (
    <div className="glass-card p-4 lg:p-6 flex flex-col" style={{ minHeight: '320px' }}>
      {/* Chat header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-700/30 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">O</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">OIOS</div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.from === 'owner' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
              msg.from === 'oios'
                ? 'bg-slate-700/60 text-slate-200 rounded-tl-sm'
                : 'bg-amber-500/20 border border-amber-500/30 text-amber-100 rounded-tr-sm'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {showTyping && <TypingIndicator />}
      </div>

      <div className="pt-3 border-t border-slate-700/30 mt-3">
        <div className="text-[10px] font-mono text-slate-600 text-center">
          Your interface · Approve before anything reaches a customer
        </div>
      </div>
    </div>
  )
}

// ─── Step data ────────────────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Build: Your AI OS, Installed',
    description: 'Month 1 is the install. We set up your workspace, connect your tools, train the AI on your rules, prices, and tone — and ship your first custom build live by Day 7. A real thing working in your business, not a demo.',
    visual: (active: boolean) => <AuditChecklist active={active} />,
    accent: 'text-teal-400',
    accentBg: 'bg-teal-400',
  },
  {
    number: '02',
    title: 'Run: OIOS Works 24/7. You Approve What Matters.',
    description: 'Phones, scheduling, follow-ups, invoicing — running around the clock. Nothing goes out to a customer without your say-so. You text OIOS like you\'d text an assistant, and it keeps you briefed.',
    visual: (active: boolean) => <ChatMock active={active} />,
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400',
  },
  {
    number: '03',
    title: 'Ship: Something New Every Month',
    description: 'One meeting a month. One big build — or two small ones. Everything already built keeps running while the next thing ships. The stack compounds; the retainer stays month-to-month.',
    visual: (active: boolean) => <ConfigMock active={active} />,
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400',
  },
]

// ─── Main export ──────────────────────────────────────────────────────────────
export function HowItWorksNew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const rawStep = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2])
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    return rawStep.on('change', (v) => {
      setActiveStep(Math.round(v))
    })
  }, [rawStep])

  return (
    <section id="how-it-works">
      {/* Mobile: vertical stacked layout */}
      <div className="lg:hidden py-24 bg-bg-secondary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">How It Works</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Build. Run. <span className="gradient-text">Ship.</span>
            </h2>
          </div>
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={i}>
                <div className={`text-4xl font-bold font-mono ${step.accent} opacity-30 mb-3`}>{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{step.description}</p>
                {step.visual(true)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: pinned scroll */}
      <div
        ref={containerRef}
        className="hidden lg:block relative"
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 h-screen bg-bg-secondary flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="grid grid-cols-2 gap-20 items-center">

              {/* Left panel — step info */}
              <div>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 mb-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">How It Works</span>
                </div>

                {/* Step progress bar */}
                <div className="flex items-center gap-3 mb-10">
                  {steps.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 rounded-full overflow-hidden"
                      style={{ width: activeStep === i ? 40 : 16 }}
                      animate={{
                        width: activeStep === i ? 40 : 16,
                        backgroundColor: i <= activeStep ? 'transparent' : '#334155',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: i <= activeStep
                            ? `linear-gradient(to right, ${
                                activeStep === 0 ? '#2DD4BF' :
                                activeStep === 1 ? '#F59E0B' :
                                '#06B6D4'
                              }, ${
                                activeStep === 0 ? '#2DD4BF' :
                                activeStep === 1 ? '#F59E0B' :
                                '#06B6D4'
                              })`
                            : '#334155',
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: i <= activeStep ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  ))}
                  <span className="text-[10px] font-mono text-slate-600 ml-2">
                    {activeStep + 1}/{steps.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`text-6xl font-bold font-mono ${steps[activeStep].accent} opacity-20 mb-4`}>
                      {steps[activeStep].number}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                      {steps[activeStep].title}
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-12 flex items-center gap-2 text-slate-600 text-xs font-mono">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                  Scroll to continue
                </div>
              </div>

              {/* Right panel — step visual */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 30, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                >
                  {steps[activeStep].visual(true)}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Bottom scroll progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-400 via-amber-400 to-cyan-400"
            style={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
            animate={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </section>
  )
}
