'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

const events = [
  {
    time: 'All Day',
    hour: 12,
    name: 'Phones',
    description: 'Every call answered in under 1 second. Caller details texted to you instantly. Returning callers remembered by name. You never miss a lead.',
    accent: 'bg-teal-400',
    textAccent: 'text-teal-400',
    glowColor: '#2DD4BF',
    icon: '📞',
    pulse: true,
  },
  {
    time: '8:00 AM',
    hour: 8,
    name: 'Scheduling',
    description: 'Appointments booked right on the call. Calendar synced. Confirmation texts sent. Reminder texts queued for tomorrow. No no-shows.',
    accent: 'bg-amber-400',
    textAccent: 'text-amber-400',
    glowColor: '#F59E0B',
    icon: '📅',
    pulse: false,
  },
  {
    time: '9:00 AM',
    hour: 9,
    name: 'Sales',
    description: 'Follow-ups sent to 4 open leads automatically. Stale deals flagged. Upsell suggestions ready for today\'s calls. Pipeline updated.',
    accent: 'bg-emerald-400',
    textAccent: 'text-emerald-400',
    glowColor: '#34D399',
    icon: '📈',
    pulse: false,
  },
  {
    time: '10:00 AM',
    hour: 10,
    name: 'Marketing',
    description: 'Review requests sent to yesterday\'s completed jobs. Re-engagement email going out to 12 past customers. New Google reviews monitored.',
    accent: 'bg-violet-400',
    textAccent: 'text-violet-400',
    glowColor: '#A78BFA',
    icon: '📣',
    pulse: false,
  },
  {
    time: '6:30 AM',
    hour: 6.5,
    name: 'Operations',
    description: 'Morning briefing delivered. Yesterday\'s calls, today\'s schedule, flagged items — all before your first coffee. CRM updated automatically.',
    accent: 'bg-cyan-400',
    textAccent: 'text-cyan-400',
    glowColor: '#06B6D4',
    icon: '⚙️',
    pulse: false,
  },
  {
    time: '5:00 PM',
    hour: 17,
    name: 'Finance',
    description: 'Invoice reminders sent for 3 overdue payments. Cash flow report ready. Profit margins tracked per job. Revenue summary for the day.',
    accent: 'bg-orange-400',
    textAccent: 'text-orange-400',
    glowColor: '#FB923C',
    icon: '💰',
    pulse: false,
  },
]

// ─── Animated Clock Face ─────────────────────────────────────────────────────
function ClockFace({ activeIndex }: { activeIndex: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const cx = 150
  const cy = 150
  const r = 120

  // Hour markers positions (24hr clock mapped to 12 positions)
  const hourAngles = events.map((e) => {
    // Map 24hr to 360 degrees (0=top)
    return ((e.hour / 24) * 360) - 90
  })

  // Current hand angle
  const handAngle = hourAngles[activeIndex] || 0

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 300"
      fill="none"
      className="w-full h-full max-w-[300px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="clock-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feFlood floodColor="#2DD4BF" floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        stroke="#1E293B"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5 }}
      />

      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={r - 15} stroke="#1E293B" strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* "All Day" arc segment for call handling */}
      <motion.circle
        cx={cx} cy={cy} r={r - 7}
        stroke="#34D399"
        strokeWidth="4"
        fill="none"
        opacity={0.15}
        strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * (r - 7)}`}
        strokeDashoffset={`${2 * Math.PI * (r - 7) * 0.4}`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1, delay: 1 }}
      />

      {/* Hour tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360 - 90
        const rad = (angle * Math.PI) / 180
        // toFixed keeps server/client SVG output identical (avoids hydration mismatch)
        const x1 = (cx + (r - 2) * Math.cos(rad)).toFixed(3)
        const y1 = (cy + (r - 2) * Math.sin(rad)).toFixed(3)
        const x2 = (cx + (r - (i % 6 === 0 ? 12 : 6)) * Math.cos(rad)).toFixed(3)
        const y2 = (cy + (r - (i % 6 === 0 ? 12 : 6)) * Math.sin(rad)).toFixed(3)
        return (
          <line
            key={`tick-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i % 6 === 0 ? '#475569' : '#334155'}
            strokeWidth={i % 6 === 0 ? 1.5 : 0.5}
          />
        )
      })}

      {/* Event markers on the clock */}
      {events.map((event, i) => {
        const angle = hourAngles[i]
        const rad = (angle * Math.PI) / 180
        const markerR = r - 25
        // toFixed keeps server/client SVG output identical (avoids hydration mismatch)
        const mx = +(cx + markerR * Math.cos(rad)).toFixed(3)
        const my = +(cy + markerR * Math.sin(rad)).toFixed(3)
        const isActive = i === activeIndex

        return (
          <motion.g key={`marker-${i}`}>
            {/* Marker dot */}
            <motion.circle
              cx={mx} cy={my}
              r={isActive ? 10 : 6}
              fill={isActive ? event.glowColor : '#0F172A'}
              stroke={event.glowColor}
              strokeWidth={isActive ? 2 : 1}
              animate={{
                r: isActive ? 10 : 6,
                fill: isActive ? event.glowColor : '#0F172A',
                strokeWidth: isActive ? 2 : 1,
              }}
              transition={{ duration: 0.4 }}
              filter={isActive ? 'url(#clock-glow)' : undefined}
            />
            {/* Glow ring when active */}
            {isActive && inView && (
              <circle cx={mx} cy={my} r="10" fill="none" stroke={event.glowColor} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="10;22" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Icon */}
            <text x={mx} y={my + 4} textAnchor="middle" fontSize={isActive ? '10' : '8'}>
              {event.icon}
            </text>
          </motion.g>
        )
      })}

      {/* Clock hand */}
      {inView && (
        <motion.line
          x1={cx} y1={cy}
          x2={cx + 75 * Math.cos((handAngle * Math.PI) / 180)}
          y2={cy + 75 * Math.sin((handAngle * Math.PI) / 180)}
          stroke={events[activeIndex]?.glowColor || '#2DD4BF'}
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#clock-glow)"
          animate={{
            x2: cx + 75 * Math.cos((handAngle * Math.PI) / 180),
            y2: cy + 75 * Math.sin((handAngle * Math.PI) / 180),
            stroke: events[activeIndex]?.glowColor || '#2DD4BF',
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="6" fill="#0F172A" stroke="#2DD4BF" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="3" fill="#2DD4BF" opacity="0.5" />

      {/* Time labels */}
      {['6AM', '12PM', '6PM', '12AM'].map((label, i) => {
        const angle = (i * 90) - 90
        const rad = (angle * Math.PI) / 180
        const lx = cx + (r + 14) * Math.cos(rad)
        const ly = cy + (r + 14) * Math.sin(rad)
        return (
          <text key={label} x={lx} y={ly + 3} textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">
            {label}
          </text>
        )
      })}
    </svg>
  )
}

// ─── Event Detail Card ──────────────────────────────────────────────────────
function EventCard({ event }: { event: typeof events[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="glass-card p-6"
      data-glow
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{event.icon}</span>
        <div>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${event.textAccent} border-current/20`}>
            {event.time}
          </span>
        </div>
      </div>
      <h4 className="text-lg font-bold text-white mb-2">{event.name}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{event.description}</p>
      {event.pulse && (
        <div className="mt-3 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${event.accent} animate-pulse`} />
          <span className="text-[10px] font-mono text-emerald-400">ALWAYS ON</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Mobile Timeline Event ──────────────────────────────────────────────────
function MobileTimelineEvent({
  event,
  index,
  isLast,
}: {
  event: typeof events[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="flex gap-5"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="relative flex-shrink-0">
          <div className={`w-3 h-3 rounded-full ${event.accent} mt-1.5`} />
          {event.pulse && (
            <motion.div
              className={`absolute inset-0 rounded-full ${event.accent} opacity-40`}
              animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>
        {!isLast && (
          <motion.div
            className="w-px flex-1 min-h-[48px] bg-gradient-to-b from-slate-600/60 to-transparent mt-2"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
          />
        )}
      </div>
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg">{event.icon}</span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${event.textAccent} border-current/30`}>
            {event.time}
          </span>
          <span className="text-sm font-semibold text-white">{event.name}</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed max-w-lg">{event.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function DailySchedule() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true })

  // Auto-cycle through events on desktop
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [sectionInView])

  return (
    <section id="daily-schedule" className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">What OIOS Does Daily</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            <span className="text-white">A Day in the Life</span>
            <br />
            <span className="gradient-text">of Your AI Operations Partner</span>
          </h2>
          <p className="mt-5 text-slate-400 text-base max-w-xl mx-auto">
            While you're running the business, OIOS runs the back office. Here's what it does without you asking.
          </p>
        </motion.div>

        {/* Desktop: two-panel clock + event detail */}
        <div ref={sectionRef} className="hidden lg:grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Left — Clock */}
          <div className="flex flex-col items-center gap-8">
            <ClockFace activeIndex={activeIndex} />
            {/* Event selector dots */}
            <div className="flex items-center gap-2">
              {events.map((event, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? `${event.accent} scale-125`
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — Event detail card */}
          <div>
            <AnimatePresence mode="wait">
              <EventCard key={activeIndex} event={events[activeIndex]} />
            </AnimatePresence>

            {/* Event list summary */}
            <div className="mt-6 space-y-2">
              {events.map((event, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                    i === activeIndex
                      ? 'bg-slate-800/60 border border-slate-700/40'
                      : 'hover:bg-slate-800/30'
                  }`}
                >
                  <span className="text-sm">{event.icon}</span>
                  <span className={`text-[10px] font-mono ${i === activeIndex ? event.textAccent : 'text-slate-600'}`}>
                    {event.time}
                  </span>
                  <span className={`text-xs ${i === activeIndex ? 'text-white' : 'text-slate-500'}`}>
                    {event.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden max-w-2xl mx-auto">
          {events.map((event, i) => (
            <MobileTimelineEvent
              key={event.name}
              event={event}
              index={i}
              isLast={i === events.length - 1}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-500 text-sm font-mono">
            Every day. Automatically. Without a single reminder from you.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
