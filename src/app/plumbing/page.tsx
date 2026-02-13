'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Wrench, Droplets, Flame, Shield } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { Pricing } from '@/components/sections/Pricing';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { RetellWebClient } from 'retell-client-js-sdk';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { TiltCard } from '@/components/ui/TiltCard';
import { MagneticButton } from '@/components/ui/MagneticButton';

type CallState = 'idle' | 'connecting' | 'connected' | 'error';

export default function PlumbingPage() {
  const [callState, setCallState] = useState<CallState>('idle');
  const [retellWebClient, setRetellWebClient] = useState<RetellWebClient | null>(null);
  const [error, setError] = useState<string>('');
  const barsRef = useRef<HTMLDivElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retellWebClient) {
        retellWebClient.stopCall();
      }
    };
  }, [retellWebClient]);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const startCall = async () => {
    try {
      setCallState('connecting');
      setError('');

      // Get access token from our API
      const response = await fetch("/api/retell", {
        method: 'POST',
        body: JSON.stringify({ agent_id: "agent_5c7497a9685bfbf3fe546f07e7" }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get access token');
      }

      const { access_token } = await response.json();

      // Initialize Retell WebClient
      const webClient = new RetellWebClient();

      webClient.on('call_started', () => {
        console.log('Call started');
        setCallState('connected');
      });

      webClient.on('call_ended', () => {
        console.log('Call ended');
        setCallState('idle');
        setRetellWebClient(null);
      });

      webClient.on('error', (error: any) => {
        console.error('Call error:', error);
        setError('Call failed. Please try again.');
        setCallState('error');
        setRetellWebClient(null);
      });

      setRetellWebClient(webClient);

      // Start the call
      await webClient.startCall({
        accessToken: access_token,
      });

    } catch (error: any) {
      console.error('Error starting call:', error);
      setError(error.message || 'Failed to start call. Please try again.');
      setCallState('error');
      setRetellWebClient(null);
    }
  };

  const endCall = () => {
    if (retellWebClient) {
      retellWebClient.stopCall();
      setRetellWebClient(null);
    }
    setCallState('idle');
    setError('');
  };

  
  const startInterview = async () => {
    try {
      setCallState('connecting');
      setError('');
      const response = await fetch("/api/retell", {
        method: 'POST',
        body: JSON.stringify({ agent_id: "agent_d4388c25d4ce0732b4882f18ad" }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get access token');
      }
      const { access_token } = await response.json();
      const webClient = new RetellWebClient();
      webClient.on('call_started', () => { setCallState('connected'); });
      webClient.on('call_ended', () => { setCallState('idle'); setRetellWebClient(null); });
      webClient.on('error', (error: any) => { setError('Call failed.'); setCallState('error'); setRetellWebClient(null); });
      setRetellWebClient(webClient);
      await webClient.startCall({ accessToken: access_token });
    } catch (error: any) {
      setError(error.message || 'Failed to start call.');
      setCallState('error');
      setRetellWebClient(null);
    }
  };

  const resetError = () => {
    setCallState('idle');
    setError('');
  };

  const stats = [
    {
      number: '62%',
      label: 'of small business calls go unanswered — during AND after hours'
    },
    {
      number: '85%',
      label: 'of homeowners DON\'T leave voicemails — they call the next plumber'
    },
    {
      number: '$450+',
      label: 'average emergency plumbing call value'
    },
    {
      number: '24/7',
      label: 'burst pipes and water heaters don\'t wait for business hours'
    }
  ];

  const services = [
    { icon: Droplets, name: 'Drain Cleaning', desc: 'Clogs, backups, hydro jetting' },
    { icon: Flame, name: 'Water Heater', desc: 'Repair, replacement, tankless install' },
    { icon: Wrench, name: 'Leak Detection', desc: 'Slab leaks, pipe leaks, hidden issues' },
    { icon: Shield, name: 'Pipe Repair', desc: 'Burst pipes, repiping, emergencies' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col">
      {/* Header */}
      <Header />
      <div className="pt-16 lg:pt-20"></div>

      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-mesh"></div>
          <div className="hero-grid absolute inset-0"></div>
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="page-enter page-enter-1">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/30 border border-slate-700/30 mb-8">
                <span className="text-xs font-mono uppercase tracking-wide text-slate-400">
                  AI RECEPTIONIST FOR PLUMBERS
                </span>
              </div>
            </div>

            <div className="page-enter page-enter-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                <span className="text-white">Never Miss</span>
                <br />
                <span className="gradient-text-shimmer">Another Plumbing Call</span>
              </h1>
            </div>

            <div className="page-enter page-enter-3">
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Customers with burst pipes don't leave voicemails — they call the next plumber.
                Sarah answers every call 24/7, books your jobs, and keeps your schedule full.
              </p>
            </div>

            <div className="page-enter page-enter-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <MagneticButton>
                  <a
                    href="#demo"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200 text-center"
                  >
                    Try the Demo
                  </a>
                </MagneticButton>
                <a href="https://calendly.com/silentaipartner" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-2"><span>Schedule a Call</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></a>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <TiltCard key={index}>
                  <div className="glass-card p-5 rounded-xl text-center h-full">
                    <service.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white text-sm">{service.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">{service.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* Pain Points Section */}
      <section className="py-24 lg:py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                <span className="text-white">The Cost of </span>
                <span className="gradient-text">Missed Calls</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Every unanswered call is a customer hiring your competitor.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="glass-card p-8 text-center">
                  <div className={`text-4xl lg:text-5xl font-bold mb-3 ${
                    stat.number === '62%' ? 'text-red-400' :
                    stat.number === '85%' ? 'text-red-400' :
                    stat.number === '$850+' ? 'text-orange-400' :
                    'text-blue-400'
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Live Demo Section */}
      <section id="demo" className="py-24 lg:py-32 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Talk to Sarah — Your AI Plumbing Receptionist
              </h2>
              <p className="text-lg text-slate-400">
                Experience how Sarah handles plumbing calls with natural voice interaction.
                <span className="block mt-2 text-orange-400">Mike's Plumbing • (480) 725-0700</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="glass-card p-8 lg:p-10">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                  <Wrench className="w-12 h-12 text-white" />
                </div>

                {callState === 'idle' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Sarah - AI Receptionist</h3>
                      <p className="text-slate-400">Mike's Plumbing</p>
                    </div>
                    <p className="text-slate-300 mb-6">
                      Click below to start a live voice demo. Ask about services, pricing, or schedule an appointment.
                    </p>
                    <MagneticButton>
                      <button
                        onClick={startCall}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all btn-glow flex items-center gap-3 mx-auto"
                      >
                        <Phone className="w-6 h-6" />
                        Live Demo
                      </button>
                    </MagneticButton>
                    <button
                      onClick={startInterview}
                      className="border-2 border-orange-500/30 text-orange-400 px-8 py-4 rounded-full text-lg font-medium transition-all hover:border-orange-400 hover:bg-orange-500/10 flex items-center gap-3 mx-auto"
                    >
                      🎙️ Interview Sarah
                    </button>
                    <div className="text-sm text-slate-500 mt-6">
                      <p className="mb-3">Try asking Sarah about:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                        <p>&bull; "I have a burst pipe, water everywhere!"</p>
                        <p>&bull; "How much for water heater replacement?"</p>
                        <p>&bull; "Schedule drain cleaning next Tuesday"</p>
                        <p>&bull; "Do you do sewer line repairs?"</p>
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
                            className="bg-gradient-to-t from-orange-500 to-amber-500 rounded-full animate-pulse"
                            style={{
                              width: '4px',
                              height: `${Math.random() * 60 + 10}px`,
                              animationDelay: `${i * 100}ms`,
                              animationDuration: '1s'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-emerald-400 font-medium text-lg">🟢 Connected • Speaking with Sarah</p>
                    <p className="text-slate-400">Sarah can hear you. Speak naturally!</p>
                    <p className="text-slate-500 text-sm">Ask about plumbing services, pricing, or schedule an appointment</p>

                    <button
                      onClick={endCall}
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
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-6 py-3 rounded-xl font-medium transition-all"
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

      <div className="section-divider" />

      {/* Cost Comparison Section */}
      <section className="py-24 lg:py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
                Receptionist vs Sarah AI
              </h2>
              <p className="text-lg text-slate-400">
                The math is simple. The savings are massive.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div ref={barsRef} className="glass-card p-8 max-w-3xl mx-auto">
              <div className="space-y-8">
                {/* Office Manager Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Plumbing Dispatcher (Monthly)</h3>
                      <p className="text-sm text-slate-400">Salary + benefits + missed calls</p>
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-red-400"><AnimatedCounter end={4200} prefix="$" /></div>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: barsVisible ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Sarah AI Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sarah AI (Monthly)</h3>
                      <p className="text-sm text-slate-400">24/7 availability + no missed calls</p>
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-orange-400"><AnimatedCounter end={297} prefix="$" /></div>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-out delay-500"
                      style={{ width: barsVisible ? '7.1%' : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Savings */}
                <div className="border-t border-slate-800/50 pt-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold tracking-tight text-emerald-400"><AnimatedCounter end={3903} prefix="$" /></div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Monthly Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold tracking-tight text-emerald-400"><AnimatedCounter end={46836} prefix="$" /></div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Annual Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold tracking-tight text-emerald-400"><AnimatedCounter end={93} suffix="%" /></div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Cost Reduction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* Pricing Section */}
      <Pricing />

      {/* Footer */}
      <Footer />
    </div>
  );
}
