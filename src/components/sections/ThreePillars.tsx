'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

// ─── Types ──────────────────────────────────────────────────────────────────
interface FlowNode {
  icon: string
  label: string
  x: number
  y: number
}

interface FlowConnection {
  from: number
  to: number
  d: string
}

interface FlowConfig {
  nodes: FlowNode[]
  connections: FlowConnection[]
  color: string
  glowColor: string
  badge?: { text: string; nodeIndex: number }
  statusBar?: { label: string; value: string }
}

// ─── Animated Flow Diagram ──────────────────────────────────────────────────
function AnimatedFlow({ config }: { config: FlowConfig }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const { nodes, connections, color, glowColor, badge, statusBar } = config

  return (
    <div className="relative w-full" style={{ aspectRatio: '700/220' }}>
      <svg
        ref={ref}
        viewBox="0 0 700 220"
        fill="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`flow-glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feFlood floodColor={glowColor} floodOpacity="0.35" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`flow-line-glow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={glowColor} floodOpacity="0.25" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Arrow marker */}
          <marker
            id={`arrow-${color}`}
            viewBox="0 0 10 7"
            refX="9"
            refY="3.5"
            markerWidth="8"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 3.5 L 0 7 z" fill={glowColor} opacity="0.6" />
          </marker>
        </defs>

        {/* Connection lines with arrows */}
        {connections.map((conn, i) => (
          <motion.path
            key={`conn-${i}`}
            d={conn.d}
            stroke={glowColor}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity={0.4}
            filter={`url(#flow-line-glow-${color})`}
            markerEnd={`url(#arrow-${color})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: 'easeOut' }}
          />
        ))}

        {/* Energy pulses traveling along paths */}
        {inView && connections.map((conn, i) => (
          <circle key={`pulse-${i}`} r="4" fill={glowColor} opacity="0">
            <animateMotion
              dur={`${3.5 + i * 0.3}s`}
              repeatCount="indefinite"
              begin={`${1.5 + i * 0.5}s`}
              path={conn.d}
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0.7;0"
              dur={`${3.5 + i * 0.3}s`}
              repeatCount="indefinite"
              begin={`${1.5 + i * 0.5}s`}
            />
          </circle>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.2 + i * 0.15,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Node background */}
            <circle
              cx={node.x}
              cy={node.y}
              r="32"
              fill="#0F172A"
              stroke={glowColor}
              strokeWidth="1.5"
              filter={`url(#flow-glow-${color})`}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="24"
              fill={`${glowColor}10`}
            />
            {/* Icon */}
            <text
              x={node.x}
              y={node.y + 6}
              textAnchor="middle"
              fontSize="18"
            >
              {node.icon}
            </text>
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 52}
              textAnchor="middle"
              fill={glowColor}
              fontSize="9"
              fontWeight="bold"
              fontFamily="monospace"
              letterSpacing="0.12em"
              opacity="0.8"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Node pulse rings */}
        {inView && nodes.map((node, i) => (
          <circle
            key={`npulse-${i}`}
            cx={node.x}
            cy={node.y}
            r="32"
            fill="none"
            stroke={glowColor}
            strokeWidth="0.5"
            opacity="0"
          >
            <animate attributeName="r" values="32;50" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Badge */}
        {badge && (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <rect
              x={nodes[badge.nodeIndex].x - 28}
              y={nodes[badge.nodeIndex].y - 58}
              width="56"
              height="20"
              rx="10"
              fill={glowColor}
              opacity="0.15"
            />
            <rect
              x={nodes[badge.nodeIndex].x - 28}
              y={nodes[badge.nodeIndex].y - 58}
              width="56"
              height="20"
              rx="10"
              fill="none"
              stroke={glowColor}
              strokeWidth="1"
              opacity="0.4"
            />
            <text
              x={nodes[badge.nodeIndex].x}
              y={nodes[badge.nodeIndex].y - 44}
              textAnchor="middle"
              fill={glowColor}
              fontSize="9"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {badge.text}
            </text>
          </motion.g>
        )}

        {/* Status bar */}
        {statusBar && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <rect x="150" y="195" width="400" height="18" rx="9" fill="#0F172A" stroke={glowColor} strokeWidth="0.5" opacity="0.5" />
            <motion.rect
              x="151"
              y="196"
              height="16"
              rx="8"
              fill={glowColor}
              opacity="0.15"
              initial={{ width: 0 }}
              animate={inView ? { width: 388 } : {}}
              transition={{ duration: 2, delay: 1.8, ease: 'easeOut' }}
            />
            <text x="350" y="208" textAnchor="middle" fill={glowColor} fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="0.1em" opacity="0.7">
              {statusBar.label}: {statusBar.value}
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  )
}

// ─── Flow Configurations ────────────────────────────────────────────────────
const receptionistFlow: FlowConfig = {
  color: 'teal',
  glowColor: '#2DD4BF',
  nodes: [
    { icon: '📞', label: 'INCOMING CALL', x: 70, y: 100 },
    { icon: '⚡', label: 'AI ANSWERS', x: 220, y: 100 },
    { icon: '✅', label: 'LEAD CAPTURED', x: 370, y: 100 },
    { icon: '📅', label: 'BOOKED', x: 510, y: 100 },
    { icon: '📱', label: 'TEXT SENT', x: 640, y: 100 },
  ],
  connections: [
    { from: 0, to: 1, d: 'M 108 100 Q 164 80 185 100' },
    { from: 1, to: 2, d: 'M 256 100 Q 313 80 335 100' },
    { from: 2, to: 3, d: 'M 405 100 Q 458 80 475 100' },
    { from: 3, to: 4, d: 'M 545 100 Q 592 80 605 100' },
  ],
  badge: { text: '< 1 SEC', nodeIndex: 1 },
}

const backOfficeFlow: FlowConfig = {
  color: 'amber',
  glowColor: '#F59E0B',
  nodes: [
    { icon: '📥', label: 'NEW JOB', x: 70, y: 100 },
    { icon: '📄', label: 'PROPOSAL', x: 220, y: 100 },
    { icon: '✅', label: 'APPROVED', x: 370, y: 100 },
    { icon: '💰', label: 'INVOICE', x: 510, y: 100 },
    { icon: '⭐', label: 'REVIEW', x: 640, y: 100 },
  ],
  connections: [
    { from: 0, to: 1, d: 'M 108 100 Q 164 80 185 100' },
    { from: 1, to: 2, d: 'M 256 100 Q 313 80 335 100' },
    { from: 2, to: 3, d: 'M 405 100 Q 458 80 475 100' },
    { from: 3, to: 4, d: 'M 545 100 Q 592 80 605 100' },
  ],
  badge: { text: '30 SEC', nodeIndex: 1 },
  statusBar: { label: 'ACTIVE', value: 'EFFICIENCY 98%' },
}

const commandCenterFlow: FlowConfig = {
  color: 'cyan',
  glowColor: '#06B6D4',
  nodes: [
    { icon: '☀️', label: 'BRIEFING', x: 70, y: 100 },
    { icon: '📊', label: 'DASHBOARD', x: 220, y: 100 },
    { icon: '💬', label: 'ASK ANYTHING', x: 370, y: 100 },
    { icon: '🎯', label: 'ACTION PLAN', x: 540, y: 100 },
  ],
  connections: [
    { from: 0, to: 1, d: 'M 108 100 Q 164 80 185 100' },
    { from: 1, to: 2, d: 'M 256 100 Q 313 80 335 100' },
    { from: 2, to: 3, d: 'M 405 100 Q 472 80 505 100' },
  ],
  badge: { text: 'REAL-TIME', nodeIndex: 1 },
}

// ─── Before / After cards ────────────────────────────────────────────────────
function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      <div className="glass-card p-4 border-red-500/15">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-400/70 flex-shrink-0" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Before</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{before}</p>
      </div>
      <div className="glass-card p-4 border-teal-400/15">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-teal-400/70 flex-shrink-0" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">After</span>
        </div>
        <p className="text-xs text-white leading-relaxed">{after}</p>
      </div>
    </div>
  )
}

// ─── Single pillar block ─────────────────────────────────────────────────────
function Pillar({
  number, title, subtitle, description, bullets, flow, before, after, accent,
}: {
  number: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  flow: FlowConfig
  before: string
  after: string
  accent: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
    >
      {/* Left — text */}
      <div>
        <div className="flex items-baseline gap-3 mb-4">
          <span className={`text-5xl font-bold ${accent} opacity-30 font-mono`}>{number}</span>
          <div>
            <div className={`text-xs font-mono uppercase tracking-[0.2em] ${accent} mb-1`}>{subtitle}</div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>
        <ul className="space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
              <span className={`w-1.5 h-1.5 rounded-full ${accent.replace('text-', 'bg-')} opacity-70 flex-shrink-0`} />
              {b}
            </li>
          ))}
        </ul>
        <BeforeAfter before={before} after={after} />
      </div>

      {/* Right — animated flow diagram */}
      <div className="glass-card p-6 lg:p-8" data-glow>
        <div className={`text-[10px] font-mono uppercase tracking-[0.15em] ${accent} mb-6 opacity-70`}>Workflow</div>
        <AnimatedFlow config={flow} />
      </div>
    </motion.div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function ThreePillars() {
  return (
    <section id="pillars" className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">What OIOS Does</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            <span className="text-white">Three Systems.</span>{' '}
            <span className="gradient-text">One Partner.</span>
          </h2>
        </motion.div>

        {/* Pillars */}
        <div className="space-y-24 lg:space-y-32">
          <Pillar
            number="01"
            subtitle="Pillar One"
            title="AI Receptionist"
            description="Every call answered in under a second. Leads captured, qualified, and booked — automatically. Your phone never goes to voicemail again."
            bullets={[
              '24/7 call answering — no hold music, no voicemail',
              'Caller memory — recognizes returning customers by name',
              'Lead capture, qualification, and scoring',
              'Appointment booking with calendar sync + confirmation texts',
              'Spam and robocall filtering — junk calls never reach you',
              'Full English and Spanish support',
              'Call transcripts, recordings, and sentiment analysis',
            ]}
            flow={receptionistFlow}
            before="You're on a ladder and your phone rings. By the time you call back, they already booked your competitor."
            after="Every call answered. Every lead captured. Calendar booked and confirmation text sent — automatically."
            accent="text-teal-400"
          />

          <div className="section-divider" />

          <Pillar
            number="02"
            subtitle="Pillar Two"
            title="AI Back Office"
            description="Proposals in 30 seconds. Follow-ups sent automatically. CRM always current. The paperwork handles itself — you just approve."
            bullets={[
              'Proposals and estimates generated in 30 seconds',
              'Automated follow-up sequences after every quote',
              'Invoicing + payment links texted to customers',
              'Review requests auto-sent after job completion',
              'CRM updates without anyone touching it',
              'Customer status texts — "your tech is 20 minutes away"',
              'Client onboarding sequences for new accounts',
            ]}
            flow={backOfficeFlow}
            before="You're doing the actual work AND the paperwork. Something always slips."
            after="Job finishes at 3pm. By 3:05 — invoice sent, review requested, CRM updated, next follow-up scheduled. You didn't touch anything."
            accent="text-amber-400"
          />

          <div className="section-divider" />

          <Pillar
            number="03"
            subtitle="Pillar Three"
            title="AI Command Center"
            description="Morning briefing at 6:30 AM. Real-time pipeline visibility. Ask OIOS anything about your business in plain English — it answers."
            bullets={[
              'Daily morning briefing via text — overnight calls, today\'s schedule, priorities',
              'Revenue forecasting — "You\'re on pace for $47K this month"',
              'Cash flow alerts — overdue invoices flagged before they become a crisis',
              'Ask anything in plain English — "How\'s my pipeline this week?"',
              'Proactive alerts on stalled deals and missed follow-ups',
              'Team scorecards — who closes, who upsells, who gets the best reviews',
              'Weekly performance report delivered every Friday',
            ]}
            flow={commandCenterFlow}
            before="You find out you're behind on revenue when the bank account looks wrong."
            after="You know your numbers before your morning coffee. OIOS tells you what to focus on today."
            accent="text-cyan-400"
          />
        </div>

      </div>
    </section>
  )
}
