'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Zap, Wrench, Shield, Lock, ServerCog, Eye, CheckCircle, Mail, Phone } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function AboutContent() {
  const storyRef = useRef(null)
  const storyInView = useInView(storyRef, { once: true, margin: '-60px' })
  const missionRef = useRef(null)
  const missionInView = useInView(missionRef, { once: true, margin: '-60px' })
  const diffRef = useRef(null)
  const diffInView = useInView(diffRef, { once: true, margin: '-60px' })
  const trustRef = useRef(null)
  const trustInView = useInView(trustRef, { once: true, margin: '-60px' })
  const contactRef = useRef(null)
  const contactInView = useInView(contactRef, { once: true, margin: '-60px' })

  return (
    <>
      {/* ═══ Origin Story ═══ */}
      <section className="py-24 lg:py-32 bg-bg-primary relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              Why OIOS Exists
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Wes Overstreet ran a small business across 8 cities for 10 years. He
                lived every problem OIOS solves — missed calls that cost thousands, leads that
                slipped through the cracks, and endless admin work that pulled him away from the
                work he actually loved. He built OIOS because he knew there had to be a better way.
              </p>
              <p>
                His story isn&apos;t unique. Every day, thousands of small business owners lose revenue — not
                because they do bad work, but because the business side falls apart. A missed call
                becomes a lost customer. A forgotten follow-up means a competitor wins the deal.
                Small business owners are incredible at what they do, but they&apos;re forced to
                also be the receptionist, the sales manager, the marketing team, and the CFO. All
                at once. While running everything else.
              </p>
              <p className="text-white font-medium">
                OIOS is the AI operations team they deserve but could never afford. Six AI
                departments that handle calls, qualify leads, send follow-ups, manage the CRM,
                track revenue, and deliver a morning briefing — every single day, 24/7, for a
                fraction of one hire.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Mission ═══ */}
      <section className="py-20 lg:py-28 bg-bg-secondary relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/40 border border-slate-700/30 mb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">Our Mission</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <span className="text-white">Make AI-powered operations </span>
              <span className="gradient-text">accessible to every small business</span>
              <span className="text-white"> — from solo operators to 50-person teams.</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ═══ The OIOS Difference ═══ */}
      <section className="py-24 lg:py-32 bg-bg-primary relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={diffRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={diffInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              The OIOS Difference
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Not Another Tool',
                description: 'Most software gives you features and expects you to figure them out. OIOS gives you results. Your AI team works autonomously — you check in when you want to, not when you have to.',
                color: 'text-amber-400',
                border: 'border-amber-400/20',
              },
              {
                icon: Wrench,
                title: 'Built for Your Business',
                description: "We don't build generic AI. Every workflow, every response, every follow-up is tuned for your specific business — whatever industry you are in.",
                color: 'text-teal-400',
                border: 'border-teal-400/20',
              },
              {
                icon: Shield,
                title: 'You Own Everything',
                description: "Month-to-month, no contracts. Every tool, integration, and piece of data we build is yours — if you ever leave, it all walks with you.",
                color: 'text-emerald-400',
                border: 'border-emerald-400/20',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className={`glass-card p-8 border ${item.border}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={diffInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-800/80 border ${item.border} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Security & Trust ═══ */}
      <section className="py-24 lg:py-32 bg-bg-secondary relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={trustRef}
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={trustInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              Your Data. Your Business. Our Priority.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Lock, title: 'End-to-End Encryption', description: 'All data encrypted in transit and at rest', color: 'text-teal-400', border: 'border-teal-400/20' },
              { icon: Shield, title: 'Enterprise-Grade Security', description: 'Built on trusted, audited infrastructure providers', color: 'text-emerald-400', border: 'border-emerald-400/20' },
              { icon: Eye, title: 'Private by Default', description: 'Your data is never shared or used for training', color: 'text-cyan-400', border: 'border-cyan-400/20' },
              { icon: ServerCog, title: 'Always On', description: 'Redundant infrastructure — your AI team never sleeps', color: 'text-amber-400', border: 'border-amber-400/20' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className={`glass-card p-5 text-center border ${item.border}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={trustInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-slate-800/80 border ${item.border} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Contact ═══ */}
      <section className="py-24 lg:py-32 bg-bg-primary relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={contactRef}
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-10"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              Let&apos;s Talk
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <a
                href="mailto:team@getoios.com"
                className="glass-card p-6 flex items-center gap-4 hover:border-teal-400/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Email</div>
                  <div className="text-sm text-white group-hover:text-teal-400 transition-colors">team@getoios.com</div>
                </div>
              </a>

              <a
                href="tel:+14803050357"
                className="glass-card p-6 flex items-center gap-4 hover:border-teal-400/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Phone</div>
                  <div className="text-sm text-white group-hover:text-teal-400 transition-colors">(480) 305-0357</div>
                </div>
              </a>
            </div>

            <MagneticButton>
              <Link
                href="/form"
                data-cursor="cta"
                className="inline-block bg-gradient-to-r from-amber-500 to-amber-400 text-white px-10 py-4 rounded-xl text-lg font-bold btn-glow hover:from-amber-600 hover:to-amber-500 transition-colors"
              >
                Start Month 1 →
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </>
  )
}
