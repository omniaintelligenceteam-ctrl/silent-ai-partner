'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import Link from 'next/link'

// ─── Types ──────────────────────────────────────────────────────────────────
interface SolutionCard {
  icon: string
  title: string
  description: string
  impact: string
  problem: string
  bullets: string[]
  impactMetrics: string[]
}

// ─── Card Data ──────────────────────────────────────────────────────────────
const solutions: SolutionCard[] = [
  {
    icon: '📞',
    title: 'Phones & First Contact',
    description: 'Every call answered. Every lead captured.',
    impact: 'Every call answered, 24/7',
    problem: "Phone rings while you're with a customer. Lead's gone by noon.",
    bullets: [
      'AI answers every call in under 1 second',
      'Qualifies leads with custom questions',
      'Books appointments directly on your calendar',
      'Sends instant text-back on missed calls',
    ],
    impactMetrics: [
      'Missed calls turned into booked jobs',
      'Zero missed calls, 24/7 coverage',
      'Every caller logged, tagged, and followed up',
    ],
  },
  {
    icon: '🎯',
    title: 'Lead Capture & Follow-Up',
    description: 'Every lead source monitored. Instant response.',
    impact: 'No lead waits, no lead forgotten',
    problem: "Leads come from 5 places. I write them on paper or forget.",
    bullets: [
      'Every lead source monitored in real time',
      'Instant response within 60 seconds',
      'Automated qualification scoring',
      'Nurture sequences that run on autopilot',
    ],
    impactMetrics: [
      'Every lead answered in seconds, not hours',
      'One pipeline across every lead source',
      'Zero leads lost between channels',
    ],
  },
  {
    icon: '📅',
    title: 'Scheduling & Booking',
    description: 'Real-time sync. Automated reminders. No no-shows.',
    impact: 'Booked, confirmed, reminded',
    problem: "Phone tag. Double bookings. No-shows.",
    bullets: [
      'Real-time calendar sync across platforms',
      'Conversational booking via text message',
      'Automated reminders at 24hr, 2hr, and on-the-way',
      'No-show follow-up and rescheduling',
    ],
    impactMetrics: [
      'Scheduling off your plate entirely',
      'Every booking confirmed and reminded',
      'Zero double bookings',
    ],
  },
  {
    icon: '📄',
    title: 'Estimates & Proposals',
    description: 'Voice-note the scope. Estimate sent in 30 seconds.',
    impact: 'Same-day estimates, every time',
    problem: "I type up estimates at 9pm after a long day. Then never follow up.",
    bullets: [
      'Voice-note the scope \u2192 estimate generated in 30 sec',
      'Professional proposal emailed to customer instantly',
      'Automated follow-up at Day 2, 5, and 10',
      'One-click approval for customers',
    ],
    impactMetrics: [
      'Same-day estimates, every time',
      'Every proposal followed up on schedule',
      'Zero forgotten follow-ups',
    ],
  },
  {
    icon: '💰',
    title: 'Invoicing & Getting Paid',
    description: 'Auto-invoice on completion. Payment link attached.',
    impact: 'Invoiced the moment the job closes',
    problem: "I forget to invoice for 3 days. Then they don't pay for 30 more.",
    bullets: [
      'Auto-invoice triggered on job completion',
      'Payment link attached to every invoice',
      'Friendly escalating payment reminders',
      'Weekly accounts receivable summary',
    ],
    impactMetrics: [
      'Reminders keep every invoice moving',
      'Zero forgotten invoices',
      'Consistent cash flow',
    ],
  },
  {
    icon: '📧',
    title: 'Email & Daily Admin',
    description: 'Inbox triaged. Replies drafted. Briefing sent.',
    impact: 'Inbox handled before coffee',
    problem: "50 emails a day. I read 10 and close the inbox.",
    bullets: [
      'Inbox triaged every 30 minutes automatically',
      'Categorized by urgency and type',
      'Routine replies drafted and ready for approval',
      'Morning briefing with action items sent daily',
    ],
    impactMetrics: [
      'Every email triaged, replies drafted',
      'Zero missed critical emails',
      'Inbox always under control',
    ],
  },
  {
    icon: '⭐',
    title: 'Reviews & Reputation',
    description: 'Review requests at peak satisfaction. Auto-responses.',
    impact: 'A review request after every job',
    problem: "Competitor has 200 reviews and does worse work than me.",
    bullets: [
      'Review request sent 2 hours post-job (peak satisfaction)',
      'Monitors Google, Yelp, and Facebook continuously',
      'Drafts responses to all reviews for your approval',
      'Negative review alerts sent immediately',
    ],
    impactMetrics: [
      'Requests land at peak satisfaction',
      'Faster response to negative reviews',
      'Higher overall rating over time',
    ],
  },
  {
    icon: '📱',
    title: 'Marketing & Content',
    description: 'Job photos become posts. Newsletters on autopilot.',
    impact: 'Consistent presence, zero effort',
    problem: "I know I should post on social media. When?",
    bullets: [
      'Before/after job photos auto-generate social posts',
      'Monthly newsletter sent to past customers',
      'Seasonal promos triggered automatically',
      'Content calendar managed without your input',
    ],
    impactMetrics: [
      'Consistent online presence',
      'Zero owner time on content',
      'Automated seasonal campaigns',
    ],
  },
  {
    icon: '👥',
    title: 'Team & Hiring',
    description: 'Applications screened. Interviews scheduled. Crew dispatched.',
    impact: 'Screening and scheduling handled',
    problem: "I hired whoever answered. No onboarding. Chaos.",
    bullets: [
      'Application screening and candidate ranking',
      'Automated interview scheduling',
      'Onboarding sequence with checklists',
      'Daily team dispatch via text message',
    ],
    impactMetrics: [
      'Every applicant screened and ranked',
      'Consistent onboarding experience',
      'Reliable daily crew communication',
    ],
  },
  {
    icon: '📊',
    title: 'Numbers & Reporting',
    description: 'Weekly KPI report. Real-time pipeline. Cash flow alerts.',
    impact: 'Your numbers, every Monday',
    problem: "Am I making money? I think so. My bank account looks okay.",
    bullets: [
      'Weekly Monday morning KPI report delivered',
      'Revenue, jobs, close rate, and AR at a glance',
      'Real-time pipeline visibility',
      'Cash flow alerts before problems hit',
    ],
    impactMetrics: [
      'Data-driven decisions, not gut feelings',
      'Tax-ready records all year',
      'Proactive cash flow management',
    ],
  },
  {
    icon: '🔄',
    title: 'Customer Retention',
    description: 'Satisfaction checks. Seasonal reminders. Referral programs.',
    impact: 'No customer forgotten after the job',
    problem: "Job done. Invoice paid. Customer forgotten.",
    bullets: [
      'Satisfaction check at 1 week post-job',
      'Seasonal service reminders on autopilot',
      'Referral program automation',
      'VIP tagging for repeat customers',
    ],
    impactMetrics: [
      'Seasonal reminders bring them back',
      'Higher customer lifetime value',
      'Automated referral generation',
    ],
  },
  {
    icon: '📋',
    title: 'Compliance & Documentation',
    description: 'Renewal alerts. Contracts auto-sent. Docs auto-filed.',
    impact: 'Zero missed renewals',
    problem: "My license expired last month. I just found out.",
    bullets: [
      'Renewal alerts at 30, 60, and 90 days out',
      'Contract templates auto-sent before jobs',
      'Job docs auto-filed in Google Drive',
      'Weekly compliance check summary',
    ],
    impactMetrics: [
      'Zero missed renewals or expirations',
      'Full legal protection on every job',
      'Organized document archive',
    ],
  },
  {
    icon: '⚙️',
    title: 'Operations & Systems',
    description: 'SOPs documented. Checklists enforced. Business runs without you.',
    impact: 'Business runs without owner',
    problem: "If I get hit by a bus, the business stops.",
    bullets: [
      'SOPs auto-documented as you describe processes',
      'Job completion checklists enforced',
      'Inventory alerts and reorder triggers',
      'Equipment maintenance reminders',
    ],
    impactMetrics: [
      'Business runs without owner present',
      'Ready to scale or sell',
      'Consistent service quality',
    ],
  },
]

// ─── Single Card ────────────────────────────────────────────────────────────
function SolutionCardItem({ card, index }: { card: SolutionCard; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      className="group"
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="glass-card p-6 cursor-pointer transition-all duration-300 hover:border-teal-400/25"
      >
        {/* Collapsed content — always visible */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span className="text-2xl flex-shrink-0 mt-0.5">{card.icon}</span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white leading-snug mb-1">{card.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{card.description}</p>
            </div>
          </div>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-500 flex-shrink-0 mt-1"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </div>

        {/* Impact stat */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-400/8 border border-teal-400/15">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
          <span className="text-[11px] font-mono font-semibold text-teal-400 tracking-wide">{card.impact}</span>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-slate-700/30 space-y-5">
                {/* THE PROBLEM */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-red-400/70 mb-2">The Problem</div>
                  <p className="text-sm text-slate-400 italic leading-relaxed">
                    &ldquo;{card.problem}&rdquo;
                  </p>
                </div>

                {/* HOW OIOS SOLVES IT */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-teal-400/70 mb-2">How OIOS Solves It</div>
                  <ul className="space-y-2">
                    {card.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400/70 flex-shrink-0 mt-1.5" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* IMPACT */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-amber-400/70 mb-2">Impact</div>
                  <ul className="space-y-1.5">
                    {card.impactMetrics.map((metric, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 flex-shrink-0" />
                        <span className="text-white font-medium">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Stats Bar ──────────────────────────────────────────────────────────────
const stats = [
  { value: '13', label: 'Workflows' },
  { value: 'Day 7', label: 'first build live' },
  { value: '1+', label: 'builds shipped monthly' },
  { value: '24/7', label: 'coverage' },
]

// ─── Main Export ────────────────────────────────────────────────────────────
export function SolutionsContent() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {solutions.map((card, i) => (
            <SolutionCardItem key={i} card={card} index={i} />
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-20 glass-card p-6 lg:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-teal-400 font-mono mb-1">{stat.value}</div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-base mb-6 max-w-xl mx-auto">
            Every workflow above is built, configured, and managed for you. No DIY. No extra tools. Just results.
          </p>
          <Link
            href="/form"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-slate-950 font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all duration-300 hover:scale-[1.03]"
          >
            See how it works for your business
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
