'use client'

import { useState, useRef } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'

type FormData = {
  fullName: string
  businessName: string
  businessWebsite: string
  phoneNumber: string
  trade: string
  teamSize: string
  missedCalls: string
  phoneHandler: string
  currentSoftware: string
  extraHours: string
  biggestFrustration: string
}

const initialFormData: FormData = {
  fullName: '',
  businessName: '',
  businessWebsite: '',
  phoneNumber: '',
  trade: '',
  teamSize: '',
  missedCalls: '',
  phoneHandler: '',
  currentSoftware: '',
  extraHours: '',
  biggestFrustration: '',
}

const tradeOptions = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Landscaping',
  'Pest Control',
  'Locksmith',
  'General Contractor',
  'Other',
]

const teamSizeOptions = [
  'Just me',
  '2-5 employees',
  '6-15 employees',
  '16+ employees',
]

const missedCallsOptions = [
  '1-3',
  '4-8',
  '9-15',
  '15+',
  'I have no idea',
]

const phoneHandlerOptions = [
  'I do',
  'My helper/office person',
  'Nobody — voicemail',
  'Other',
]

const inputClass = 'w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-colors duration-200'
const selectClass = 'w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-colors duration-200'
const textareaClass = 'w-full min-h-[100px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-colors duration-200 resize-y'

export function AuditForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [step, setStep] = useState<1 | 2>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating] = useState(false)
  const step1Ref = useRef<HTMLFormElement>(null)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const goToStep2 = () => {
    if (!step1Ref.current?.reportValidity()) return
    setDirection('forward')
    setAnimating(true)
    setTimeout(() => {
      setStep(2)
      setTimeout(() => setAnimating(false), 20)
    }, 250)
  }

  const goToStep1 = () => {
    setDirection('back')
    setAnimating(true)
    setTimeout(() => {
      setStep(1)
      setTimeout(() => setAnimating(false), 20)
    }, 250)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="audit-form" className="py-24 lg:py-32 bg-bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="glass-card p-10 lg:p-14 text-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                Audit Request Received
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                I&apos;m reviewing your business now. Expect a call from me within 24 hours.
              </p>
              <p className="text-orange-400 font-semibold">
                — Wes, Silent AI Partner
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section id="audit-form" className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Get Your Free Workflow Audit
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Takes 2 minutes. I&apos;ll call you within 24 hours.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="glass-card p-8 lg:p-10">
            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  step === 1
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-orange-500/10 text-orange-400'
                }`}>
                  {step > 1 ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : '1'}
                </div>
                <div className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                  step > 1 ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 'bg-slate-700/50'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  step === 2
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-slate-800/50 text-slate-500 border border-slate-700/50'
                }`}>
                  2
                </div>
              </div>
              <span className="text-xs text-slate-500 ml-2">
                Step {step} of 2
              </span>
            </div>

            {/* Step Content */}
            <div className="relative overflow-hidden">
              {/* Step 1 */}
              <div
                style={{
                  transform: animating && direction === 'forward' && step === 1
                    ? 'translateX(-24px)'
                    : animating && direction === 'back' && step === 2
                    ? 'translateX(24px)'
                    : 'translateX(0)',
                  opacity: step === 1 && !animating ? 1 : step === 1 ? 0 : 0,
                  position: step === 1 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  transition: 'transform 250ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease',
                  pointerEvents: step === 1 ? 'auto' : 'none',
                  visibility: step === 1 ? 'visible' : 'hidden',
                }}
              >
                <form ref={step1Ref} onSubmit={(e) => { e.preventDefault(); goToStep2() }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
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
                      <label className="block text-sm font-medium text-slate-300 mb-2">Business Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="ABC Plumbing"
                        value={formData.businessName}
                        onChange={(e) => handleChange('businessName', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(XXX) XXX-XXXX"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">What trade are you in? *</label>
                      <select
                        required
                        value={formData.trade}
                        onChange={(e) => handleChange('trade', e.target.value)}
                        className={selectClass}
                      >
                        <option value="" disabled className="bg-slate-800">Select your trade</option>
                        {tradeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 rounded-xl font-semibold text-lg btn-glow hover:from-orange-600 hover:to-orange-500 transition-colors duration-200"
                    >
                      Next — Almost Done →
                    </button>
                  </div>

                  <p className="text-center text-slate-500 text-sm">
                    No spam. Just 4 quick questions to start.
                  </p>
                </form>
              </div>

              {/* Step 2 */}
              <div
                style={{
                  transform: animating && direction === 'forward' && step === 1
                    ? 'translateX(24px)'
                    : animating && direction === 'back' && step === 2
                    ? 'translateX(-24px)'
                    : 'translateX(0)',
                  opacity: step === 2 && !animating ? 1 : step === 2 ? 0 : 0,
                  position: step === 2 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  transition: 'transform 250ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease',
                  pointerEvents: step === 2 ? 'auto' : 'none',
                  visibility: step === 2 ? 'visible' : 'hidden',
                }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Business Website *</label>
                      <input
                        type="url"
                        required
                        placeholder="yourcompany.com"
                        value={formData.businessWebsite}
                        onChange={(e) => handleChange('businessWebsite', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">How many people on your team? *</label>
                      <select
                        required
                        value={formData.teamSize}
                        onChange={(e) => handleChange('teamSize', e.target.value)}
                        className={selectClass}
                      >
                        <option value="" disabled className="bg-slate-800">Select team size</option>
                        {teamSizeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">On a busy day, how many calls do you miss? *</label>
                    <select
                      required
                      value={formData.missedCalls}
                      onChange={(e) => handleChange('missedCalls', e.target.value)}
                      className={selectClass}
                    >
                      <option value="" disabled className="bg-slate-800">Select range</option>
                      {missedCallsOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Who handles your phones right now? *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {phoneHandlerOptions.map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors duration-200 text-sm text-center ${
                            formData.phoneHandler === opt
                              ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                              : 'border-slate-700/50 bg-slate-800/30 text-slate-400 hover:border-slate-600/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="phoneHandler"
                            value={opt}
                            checked={formData.phoneHandler === opt}
                            onChange={(e) => handleChange('phoneHandler', e.target.value)}
                            className="sr-only"
                            required
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">What software runs your business? *</label>
                    <textarea
                      required
                      placeholder="QuickBooks, ServiceTitan, Housecall Pro, etc."
                      value={formData.currentSoftware}
                      onChange={(e) => handleChange('currentSoftware', e.target.value)}
                      rows={2}
                      className={textareaClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">If you had an extra 10 hours a week, what would you do? *</label>
                    <textarea
                      required
                      placeholder="Close more deals? Actually take weekends off?..."
                      value={formData.extraHours}
                      onChange={(e) => handleChange('extraHours', e.target.value)}
                      rows={2}
                      className={textareaClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      What&apos;s your biggest frustration running the business?{' '}
                      <span className="text-slate-500 font-normal">(optional)</span>
                    </label>
                    <textarea
                      placeholder="The thing that keeps you up at night..."
                      value={formData.biggestFrustration}
                      onChange={(e) => handleChange('biggestFrustration', e.target.value)}
                      rows={2}
                      className={textareaClass}
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 rounded-xl font-semibold text-lg btn-glow hover:from-orange-600 hover:to-orange-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Book My Audit Call →'}
                    </button>
                    <button
                      type="button"
                      onClick={goToStep1}
                      className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors duration-200 py-2"
                    >
                      ← Back
                    </button>
                  </div>

                  <p className="text-center text-slate-500 text-sm">
                    No spam. One follow-up call max. Usually within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
