'use client'

import { useState } from 'react'
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

export function AuditForm() {
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name + Business */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200"
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
                    className="w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Row 2: Website + Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Business Website *</label>
                  <input
                    type="url"
                    required
                    placeholder="yourcompany.com"
                    value={formData.businessWebsite}
                    onChange={(e) => handleChange('businessWebsite', e.target.value)}
                    className="w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(XXX) XXX-XXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    className="w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Row 3: Trade + Team Size */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">What trade are you in? *</label>
                  <select
                    required
                    value={formData.trade}
                    onChange={(e) => handleChange('trade', e.target.value)}
                    className="w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200"
                  >
                    <option value="" disabled className="bg-slate-800">Select your trade</option>
                    {tradeOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">How many people on your team? *</label>
                  <select
                    required
                    value={formData.teamSize}
                    onChange={(e) => handleChange('teamSize', e.target.value)}
                    className="w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200"
                  >
                    <option value="" disabled className="bg-slate-800">Select team size</option>
                    {teamSizeOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Missed Calls */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">On a busy day, how many calls do you miss? *</label>
                <select
                  required
                  value={formData.missedCalls}
                  onChange={(e) => handleChange('missedCalls', e.target.value)}
                  className="w-full h-[52px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200"
                >
                  <option value="" disabled className="bg-slate-800">Select range</option>
                  {missedCallsOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                  ))}
                </select>
              </div>

              {/* Row 5: Phone Handler (Radio) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Who handles your phones right now? *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {phoneHandlerOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-200 text-sm text-center ${
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

              {/* Row 6: Current Software */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">What software runs your business? *</label>
                <textarea
                  required
                  placeholder="QuickBooks, ServiceTitan, Housecall Pro, etc."
                  value={formData.currentSoftware}
                  onChange={(e) => handleChange('currentSoftware', e.target.value)}
                  rows={2}
                  className="w-full min-h-[100px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200 resize-y"
                />
              </div>

              {/* Row 7: Extra Hours */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">If you had an extra 10 hours a week, what would you do? *</label>
                <textarea
                  required
                  placeholder="Close more deals? Actually take weekends off?..."
                  value={formData.extraHours}
                  onChange={(e) => handleChange('extraHours', e.target.value)}
                  rows={2}
                  className="w-full min-h-[100px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200 resize-y"
                />
              </div>

              {/* Row 8: Biggest Frustration (Optional) */}
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
                  className="w-full min-h-[100px] bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all duration-200 resize-y"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 rounded-xl font-semibold text-lg btn-glow hover:from-orange-600 hover:to-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Book My Audit Call →'}
                </button>
              </div>

              {/* Microcopy */}
              <p className="text-center text-slate-500 text-sm">
                No spam. One follow-up call max. Usually within 24 hours.
              </p>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
