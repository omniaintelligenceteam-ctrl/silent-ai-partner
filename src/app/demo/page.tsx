'use client';

import { useState } from 'react';
import { Header } from '@/components/sections/Header';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function DemoPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setError('');

    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, phone }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setFormState('success');
    } catch {
      setError('Something went wrong. Please try again.');
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col overflow-hidden">
      <Header />
      <div className="pt-16 lg:pt-20" />

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md w-full">

          {/* Avatar */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <div className="text-4xl font-bold text-white">S</div>
          </div>

          <h2 className="text-3xl font-semibold mb-2 tracking-tight">Meet Sarah</h2>
          <p className="text-slate-400 mb-2">Your AI Office Manager • Silent AI Partner</p>
          <p className="text-slate-300 mb-8 text-lg">
            See how Sarah handles your calls — 24/7, never misses a lead.
          </p>

          {(formState === 'idle' || formState === 'error') && (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5 ml-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  required
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5 ml-1">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Smith's HVAC"
                  required
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5 ml-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 867-5309"
                  required
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                />
              </div>

              {formState === 'error' && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 disabled:opacity-60 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all btn-glow mt-2"
              >
                Get My Free Demo →
              </button>

              <p className="text-slate-500 text-xs text-center pt-1">
                We&apos;ll call you within 24 hours. No spam, ever.
              </p>
            </form>
          )}

          {formState === 'success' && (
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-semibold text-emerald-400">You&apos;re on the list!</h3>
              <p className="text-slate-300">
                We&apos;ll call you within 24 hours to set up your free demo. Get ready to see Sarah in action.
              </p>
              <p className="text-slate-500 text-sm">
                Questions? Email us at{' '}
                <a href="mailto:wes@silentaipartner.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                  wes@silentaipartner.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800/30 bg-bg-secondary/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-2">
            Sarah answers calls 24/7 — so you never miss a lead again.
          </p>
          <p className="text-slate-500 text-xs">
            Already a customer?{' '}
            <a href="https://calendly.com/silentaipartner" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
              Schedule a call →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
