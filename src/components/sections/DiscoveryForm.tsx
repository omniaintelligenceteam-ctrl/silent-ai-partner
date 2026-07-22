'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type FormData = {
  fullName: string
  businessName: string
  businessDescription: string
  teamSize: string
  callsPerWeek: string
  callHandler: string
  biggestPainPoint: string
  currentSoftware: string
  phoneNumber: string
  bestTime: string
}

const initialFormData: FormData = {
  fullName: '',
  businessName: '',
  businessDescription: '',
  teamSize: '',
  callsPerWeek: '',
  callHandler: '',
  biggestPainPoint: '',
  currentSoftware: '',
  phoneNumber: '',
  bestTime: '',
}

const inputClass =
  'w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/25 focus:shadow-[0_0_15px_-3px_rgba(45,212,191,0.15)] transition-all duration-300'

const teamSizeOptions = ['Just me', '2-5', '6-15', '16+']
const callsPerWeekOptions = ['Under 20', '20-50', '50-100', '100+']
const callHandlerOptions = ['Me', 'Office person', 'Answering service', "It's chaos"]
const bestTimeOptions = ['Morning', 'Afternoon', 'Evening', 'Whenever']

// ─── Radio Group ────────────────────────────────────────────────────────────
function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
              value === opt
                ? 'bg-teal-400/15 text-teal-400 border-teal-400/40'
                : 'bg-slate-800/30 text-slate-400 border-slate-700/40 hover:border-slate-600/60 hover:text-slate-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Animated Success Checkmark ─────────────────────────────────────────────
function SuccessCheckmark() {
  return (
    <div className="w-20 h-20 mx-auto mb-8 relative">
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/20"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.6, times: [0, 0.6, 1] }}
      />
      <svg className="w-20 h-20 relative z-10" viewBox="0 0 80 80">
        <motion.circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="#34D399"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M25 42l10 10 20-22"
          fill="none"
          stroke="#34D399"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </svg>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 360
        const rad = (angle * Math.PI) / 180
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: i % 2 === 0 ? '#2DD4BF' : '#F59E0B',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(rad) * 50,
              y: Math.sin(rad) * 50,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

// ─── Discovery Form ─────────────────────────────────────────────────────────
export function DiscoveryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    // Client-side validation for radio groups
    if (!formData.teamSize || !formData.callsPerWeek || !formData.callHandler || !formData.bestTime) {
      setError('Please answer all questions before submitting.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const successView = (
      <motion.div
        key="success"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-lg w-full">
          <div className="rounded-2xl border border-slate-700/30 bg-slate-900/50 backdrop-blur-sm p-10 lg:p-14 text-center">
            <SuccessCheckmark />
            <h3
              className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              Got It!
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I&apos;ll review this and reach out to set up our call.
            </p>
            <p className="text-teal-400 font-semibold">— Wes, OIOS</p>
          </div>
        </div>
      </motion.div>
  )

  const formView = (
      <motion.div
        key="form"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-center justify-center px-4 py-16"
      >
        <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            What&apos;s eating your week?
          </h1>
          <p className="text-slate-400 text-base">
            Takes about 3 minutes. I&apos;ll use this to prep something specific for our call.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-700/30 bg-slate-900/50 backdrop-blur-sm p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Business */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your business"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* What does your business do? */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What does your business do?
              </label>
              <input
                type="text"
                required
                placeholder="e.g. dental practice, insurance agency, restaurant, real estate..."
                value={formData.businessDescription}
                onChange={(e) => handleChange('businessDescription', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Team Size */}
            <RadioGroup
              label="How many people on your team?"
              options={teamSizeOptions}
              value={formData.teamSize}
              onChange={(val) => handleChange('teamSize', val)}
            />

            {/* Calls Per Week */}
            <RadioGroup
              label="About how many calls per week?"
              options={callsPerWeekOptions}
              value={formData.callsPerWeek}
              onChange={(val) => handleChange('callsPerWeek', val)}
            />

            {/* Call Handler */}
            <RadioGroup
              label="Who handles your calls right now?"
              options={callHandlerOptions}
              value={formData.callHandler}
              onChange={(val) => handleChange('callHandler', val)}
            />

            {/* Biggest Pain Point */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What&apos;s your biggest pain point right now?
              </label>
              <textarea
                placeholder="The thing that keeps you up at night..."
                value={formData.biggestPainPoint}
                onChange={(e) => handleChange('biggestPainPoint', e.target.value)}
                rows={2}
                className="w-full min-h-[80px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/25 focus:shadow-[0_0_15px_-3px_rgba(45,212,191,0.15)] transition-all duration-300 resize-y"
              />
            </div>

            {/* Current Software */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What software do you use to run your business?{' '}
                <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Jobber, ServiceTitan, QuickBooks, spreadsheets..."
                value={formData.currentSoftware}
                onChange={(e) => handleChange('currentSoftware', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                required
                placeholder="(XXX) XXX-XXXX"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Best Time */}
            <RadioGroup
              label="Best time to talk?"
              options={bestTimeOptions}
              value={formData.bestTime}
              onChange={(val) => handleChange('bestTime', val)}
            />

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-white py-4 rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-teal-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Trust */}
          <div className="text-center mt-6 pt-6 border-t border-slate-700/30">
            <p className="text-sm text-slate-500">No commitment. No credit card. Just a conversation.</p>
          </div>
        </div>
        </div>
      </motion.div>
  )

  // mode="wait": form exits fully, then the success card enters — one moment, no overlap
  return <AnimatePresence mode="wait">{submitted ? successView : formView}</AnimatePresence>
}
