'use client'

import { useState, useEffect } from 'react'
import { Phone, PhoneOff } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { RetellWebClient } from 'retell-client-js-sdk'

type CallState = 'idle' | 'connecting' | 'connected' | 'error'

export function VoiceDemo() {
  const [callState, setCallState] = useState<CallState>('idle')
  const [retellWebClient, setRetellWebClient] = useState<RetellWebClient | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (retellWebClient) {
        retellWebClient.stopCall()
      }
    }
  }, [retellWebClient])

  const startCall = async () => {
    try {
      setCallState('connecting')
      setError('')

      const response = await fetch('/api/retell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get access token')
      }

      const { access_token } = await response.json()
      const webClient = new RetellWebClient()

      webClient.on('call_started', () => {
        setCallState('connected')
      })

      webClient.on('call_ended', () => {
        setCallState('idle')
        setRetellWebClient(null)
      })

      webClient.on('error', () => {
        setError('Call failed. Please try again.')
        setCallState('error')
        setRetellWebClient(null)
      })

      setRetellWebClient(webClient)
      await webClient.startCall({ accessToken: access_token })
    } catch (err: any) {
      setError(err.message || 'Failed to start call. Please try again.')
      setCallState('error')
      setRetellWebClient(null)
    }
  }

  const startInterview = async () => {
    try {
      setCallState('connecting')
      setError('')

      const response = await fetch('/api/retell', {
        method: 'POST',
        body: JSON.stringify({ agent_id: 'agent_d4388c25d4ce0732b4882f18ad' }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get access token')
      }

      const { access_token } = await response.json()
      const webClient = new RetellWebClient()

      webClient.on('call_started', () => {
        setCallState('connected')
      })

      webClient.on('call_ended', () => {
        setCallState('idle')
        setRetellWebClient(null)
      })

      webClient.on('error', () => {
        setError('Call failed. Please try again.')
        setCallState('error')
        setRetellWebClient(null)
      })

      setRetellWebClient(webClient)
      await webClient.startCall({ accessToken: access_token })
    } catch (err: any) {
      setError(err.message || 'Failed to start call.')
      setCallState('error')
      setRetellWebClient(null)
    }
  }

  const endCall = () => {
    if (retellWebClient) {
      retellWebClient.stopCall()
      setRetellWebClient(null)
    }
    setCallState('idle')
    setError('')
  }

  const resetError = () => {
    setCallState('idle')
    setError('')
  }

  return (
    <section id="demo" className="py-24 lg:py-32 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Don&apos;t Take Our Word For It —{' '}
              <span className="gradient-text">Talk to Sarah</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              This is our AI voice receptionist. She answers calls, books appointments, and qualifies leads 24/7. Try her live — right now.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="glass-card p-8 lg:p-10">
            <div className="text-center">
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-3xl font-bold text-white">S</span>
              </div>

              {callState === 'idle' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Sarah — AI Voice Receptionist</h3>
                    <p className="text-slate-400">Silent AI Partner</p>
                  </div>

                  <p className="text-slate-300">
                    Click below to start a live voice conversation. Ask her anything — services, scheduling, pricing.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <MagneticButton>
                      <button
                        onClick={startCall}
                        data-glow
                        className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white min-w-[220px] px-8 py-4 rounded-xl text-lg font-medium transition-all btn-glow flex items-center justify-center gap-3"
                      >
                        <Phone className="w-6 h-6" />
                        Live Demo
                      </button>
                    </MagneticButton>

                    <button
                      onClick={startInterview}
                      data-glow
                      className="border-2 border-orange-500/30 text-orange-400 min-w-[220px] px-8 py-4 rounded-xl text-lg font-medium transition-all hover:border-orange-400 hover:bg-orange-500/10 flex items-center justify-center gap-3"
                    >
                      🎙️ Interview Sarah
                    </button>
                  </div>

                  <div className="text-sm text-slate-500 pt-2">
                    <p className="mb-3">Try asking Sarah about:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400">
                      <p>&bull; &quot;What services do you offer?&quot;</p>
                      <p>&bull; &quot;I need someone out today&quot;</p>
                      <p>&bull; &quot;How much does it cost?&quot;</p>
                      <p>&bull; &quot;Can you schedule me for Tuesday?&quot;</p>
                    </div>
                  </div>
                </div>
              )}

              {callState === 'connecting' && (
                <div className="space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                  <p className="text-slate-300 text-lg">Connecting to Sarah...</p>
                  <p className="text-slate-400 text-sm">This may take a few seconds</p>
                  <button
                    onClick={endCall}
                    data-glow="red"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-3 rounded-xl font-medium transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {callState === 'connected' && (
                <div className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-end space-x-1 h-16">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-full animate-pulse"
                          style={{
                            width: '4px',
                            height: `${Math.random() * 60 + 10}px`,
                            animationDelay: `${i * 100}ms`,
                            animationDuration: '1s',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-emerald-400 font-medium text-lg">🟢 Connected &bull; Speaking with Sarah</p>
                  <p className="text-slate-400">Sarah can hear you. Speak naturally!</p>

                  <button
                    onClick={endCall}
                    data-glow="red"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all flex items-center gap-3 mx-auto"
                  >
                    <PhoneOff className="w-6 h-6" />
                    End Call
                  </button>
                </div>
              )}

              {callState === 'error' && (
                <div className="space-y-6">
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 font-medium mb-2">Call Failed</p>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                  <button
                    onClick={resetError}
                    data-glow
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white px-6 py-3 rounded-xl font-medium transition-all"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
