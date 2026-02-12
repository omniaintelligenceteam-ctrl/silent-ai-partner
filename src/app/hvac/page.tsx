'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, PhoneOff, Calendar, Wind, Thermometer, Snowflake, Zap, Flame } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { Pricing } from '@/components/sections/Pricing';
import { RetellWebClient } from 'retell-client-js-sdk';

type CallState = 'idle' | 'connecting' | 'connected' | 'error';

export default function HVACPage() {
  const [callState, setCallState] = useState<CallState>('idle');
  const [retellWebClient, setRetellWebClient] = useState<RetellWebClient | null>(null);
  const [error, setError] = useState<string>('');

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retellWebClient) {
        retellWebClient.stopCall();
      }
    };
  }, [retellWebClient]);

  const startCall = async () => {
    try {
      setCallState('connecting');
      setError('');
      
      // Get access token from our API
      const response = await fetch('/api/retell', {
        method: 'POST',
        body: JSON.stringify({ agent_id: "agent_61fc1cc265e6885ac41dcfb527" }),
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

  const resetError = () => {
    setCallState('idle');
    setError('');
  };

  const stats = [
    {
      number: '58%',
      label: 'of HVAC emergency calls go to the first company that answers'
    },
    {
      number: 'July',
      label: 'peak season: customers call every company until someone picks up'
    },
    {
      number: '$1,200+',
      label: 'average AC repair job value — lost when you miss the call'
    },
    {
      number: '24/7',
      label: 'HVAC emergencies don\'t wait — neither should your customers'
    }
  ];

  const services = [
    { icon: Snowflake, name: 'AC Repair', desc: 'Cooling, refrigerant, compressor' },
    { icon: Flame, name: 'Furnace Repair', desc: 'Heating, ignition, blower motor' },
    { icon: Wind, name: 'Duct Cleaning', desc: 'Air quality, maintenance, cleaning' },
    { icon: Zap, name: 'Thermostat Install', desc: 'Smart thermostats, programming' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-white/10 bg-bg-secondary/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <a 
            href="/" 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold text-sm">
              S
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm sm:text-base">Silent AI Partner for HVAC</h1>
            </div>
          </div>
        </div>
        
        <a 
          href="https://calendly.com/silentaipartner"
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all btn-glow hidden sm:inline-flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Get Sarah
        </a>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-grid absolute inset-0"></div>
          <div className="orb orb-1"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto mb-12">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-orange-500/20 mb-8">
                <span className="text-xs font-mono uppercase tracking-wide text-orange-400">
                  AI RECEPTIONIST FOR HVAC
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-white">Never Miss</span>
                <br />
                <span className="gradient-text">Another HVAC Call</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                When their AC dies in July, they're calling every company until someone picks up. 
                Sarah answers every call 24/7, books emergency repairs, and keeps your techs busy year-round.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#demo" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200 text-center"
                >
                  Try the Demo
                </a>
                <a 
                  href="https://calendly.com/silentaipartner"
                  className="border-2 border-orange-500/30 text-orange-400 px-8 py-4 rounded-lg font-semibold text-lg hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-200 text-center"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Services Grid */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="glass-card p-4 text-center">
                  <service.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white text-sm">{service.name}</h3>
                  <p className="text-slate-400 text-xs mt-1">{service.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-white">Peak Season = </span>
                <span className="gradient-text">Peak Competition</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Every unanswered call is an AC unit someone else gets to fix.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-orange-400 mb-3">
                    {stat.number}
                  </div>
                  <div className="text-slate-300 text-sm leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-16 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Talk to Sarah — Your AI HVAC Receptionist
              </h2>
              <p className="text-lg text-slate-400">
                Experience how Sarah handles HVAC calls with natural voice interaction.
                <span className="block mt-2 text-orange-400">Cool Air HVAC • DEMO_PHONE</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="glass-card p-8 sm:p-12">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                  <Wind className="w-12 h-12 text-white" />
                </div>
                
                {callState === 'idle' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Sarah - AI Receptionist</h3>
                      <p className="text-slate-400">Cool Air HVAC</p>
                    </div>
                    <p className="text-slate-300 mb-6">
                      Click below to start a live voice demo. Ask about services, maintenance plans, or schedule an appointment.
                    </p>
                    <button
                      onClick={startCall}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-8 py-4 rounded-full text-lg font-medium transition-all btn-glow flex items-center gap-3 mx-auto transform hover:scale-105"
                    >
                      <Phone className="w-6 h-6" />
                      Start Voice Call
                    </button>
                    <div className="text-sm text-slate-500 mt-6">
                      <p className="mb-3">Try asking Sarah about:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                        <p>&bull; "My AC is blowing hot air, I need help now!"</p>
                        <p>&bull; "How much for a new furnace installation?"</p>
                        <p>&bull; "Schedule my seasonal maintenance"</p>
                        <p>&bull; "Do you offer maintenance plans?"</p>
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
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-3 rounded-full font-medium transition-all"
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
                    <p className="text-slate-500 text-sm">Ask about HVAC services, pricing, or schedule an appointment</p>
                    
                    <button
                      onClick={endCall}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center gap-3 mx-auto transform hover:scale-105"
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
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-6 py-3 rounded-full font-medium transition-all"
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

      {/* Cost Comparison Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Dispatcher vs Sarah AI
              </h2>
              <p className="text-lg text-slate-300">
                The math is simple. The savings are massive.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="glass-card p-8 max-w-3xl mx-auto">
              <div className="space-y-8">
                {/* Office Manager Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">HVAC Dispatcher (Monthly)</h3>
                      <p className="text-sm text-slate-400">Salary + benefits + overtime during peaks</p>
                    </div>
                    <div className="text-2xl font-bold text-red-400">$4,500</div>
                  </div>
                  <div className="w-full h-8 bg-slate-800 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg animate-pulse"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>

                {/* Sarah AI Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sarah AI (Monthly)</h3>
                      <p className="text-sm text-slate-400">24/7 availability + handles peak season surge</p>
                    </div>
                    <div className="text-2xl font-bold text-orange-400">$297</div>
                  </div>
                  <div className="w-full h-8 bg-slate-800 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg"
                      style={{ width: '6.6%' }}
                    ></div>
                  </div>
                </div>

                {/* Savings */}
                <div className="border-t border-slate-700 pt-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">$4,203</div>
                      <div className="text-sm text-slate-400">Monthly Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">$50,436</div>
                      <div className="text-sm text-slate-400">Annual Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">93%</div>
                      <div className="text-sm text-slate-400">Cost Reduction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-slate-800/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <a href="/" className="inline-block mb-4">
                <div className="text-xl font-bold text-white">
                  Silent AI Partner
                </div>
              </a>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                The AI office manager built for HVAC contractors. Never miss another emergency AC call.
              </p>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-mono">System Operational</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-slate-400">AC Repair</li>
                <li className="text-slate-400">Furnace Repair</li>
                <li className="text-slate-400">Duct Cleaning</li>
                <li className="text-slate-400">Thermostat Install</li>
                <li className="text-slate-400">Maintenance Plans</li>
                <li className="text-slate-400">Emergency HVAC</li>
              </ul>
            </div>

            {/* Links & Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-slate-400 hover:text-white transition-colors">
                    Back to Main Site
                  </a>
                </li>
                <li>
                  <a href="/demo" className="text-slate-400 hover:text-white transition-colors">
                    General Demo
                  </a>
                </li>
                <li>
                  <a href="https://calendly.com/silentaipartner" className="text-slate-400 hover:text-white transition-colors">
                    Schedule a Call
                  </a>
                </li>
              </ul>
              
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-2 text-sm">Contact</h4>
                <a href="tel:DEMO_PHONE" className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
                  DEMO_PHONE
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/50 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2026 Silent AI Partner. Built for HVAC contractors.
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>&lt;1s Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        
        .animate-bounce {
          animation: bounce 1.4s ease-in-out infinite;
        }

        .btn-glow {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }

        .btn-glow:hover {
          box-shadow: 0 0 25px rgba(249, 115, 22, 0.4);
        }
      `}</style>
    </div>
  );
}
