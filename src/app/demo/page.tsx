'use client';

import { useState, useRef, useEffect } from 'react';
import { Phone, PhoneCall, Calendar, Clock, DollarSign, Check, Mic, MicOff } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

declare global {
  interface Window {
    RetellWebClient: any;
  }
}

type CallState = 'idle' | 'connecting' | 'connected' | 'disconnected';

const features = [
  {
    icon: Clock,
    text: "Answers every call in under 1 second"
  },
  {
    icon: Calendar,
    text: "Books appointments automatically"
  },
  {
    icon: PhoneCall,
    text: "Never calls in sick"
  },
  {
    icon: DollarSign,
    text: "Costs less than $10/day"
  }
];

const tiers = [
  {
    name: 'Answering Service',
    price: '$197',
    features: [
      '300 minutes included',
      '24/7 call answering',
      'Message taking & SMS alerts',
      'Basic FAQ handling',
      'Call recordings',
    ],
  },
  {
    name: 'Receptionist',
    price: '$297',
    features: [
      '600 minutes included',
      'Everything in Answering Service',
      'Appointment booking & confirmations',
      'Emergency routing & dispatch',
      'Full transcripts & recordings',
      'Customer follow-up texts',
    ],
    featured: true,
  },
  {
    name: 'Office Manager',
    price: '$497',
    features: [
      '1,200 minutes included',
      'Everything in Receptionist',
      'Auto-dispatch to right technician',
      'Knows your services, pricing & schedule',
      'Custom voice & personality',
      'Spanish language support',
    ],
  },
];

export default function DemoPage() {
  const [callState, setCallState] = useState<CallState>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const retellClient = useRef<any>(null);

  useEffect(() => {
    // Load Retell SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk/dist/index.js';
    script.onload = () => {
      console.log('Retell SDK loaded');
    };
    document.head.appendChild(script);

    return () => {
      if (retellClient.current) {
        retellClient.current.stopCall();
      }
    };
  }, []);

  const startCall = async () => {
    setIsLoading(true);
    
    try {
      // Get access token from our API
      const response = await fetch('/api/retell', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to get access token');
      }
      
      const { access_token } = await response.json();
      
      // Initialize Retell client
      if (window.RetellWebClient) {
        retellClient.current = new window.RetellWebClient();
        
        // Set up event handlers
        retellClient.current.on('call_started', () => {
          setCallState('connected');
          setIsLoading(false);
        });
        
        retellClient.current.on('call_ended', () => {
          setCallState('disconnected');
          setIsSpeaking(false);
        });
        
        retellClient.current.on('agent_start_talking', () => {
          setIsSpeaking(true);
        });
        
        retellClient.current.on('agent_stop_talking', () => {
          setIsSpeaking(false);
        });
        
        retellClient.current.on('error', (error: any) => {
          console.error('Retell error:', error);
          setCallState('idle');
          setIsLoading(false);
        });
        
        // Start the call
        setCallState('connecting');
        await retellClient.current.startCall({ 
          accessToken: access_token,
        });
      }
    } catch (error) {
      console.error('Error starting call:', error);
      setCallState('idle');
      setIsLoading(false);
    }
  };

  const endCall = () => {
    if (retellClient.current) {
      retellClient.current.stopCall();
      setCallState('idle');
      setIsSpeaking(false);
    }
  };

  const getCallButtonText = () => {
    switch (callState) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'End Call';
      case 'disconnected':
        return 'Call Again';
      default:
        return 'Try Sarah Now';
    }
  };

  const renderWaveform = () => {
    const barHeights = [40, 60, 80, 100, 80, 60, 40, 55, 75, 95];
    
    return (
      <div className="flex items-center justify-center gap-1.5 mb-8">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className={`w-2 rounded-full transition-all duration-150 ${
              isSpeaking 
                ? 'bg-gradient-to-t from-emerald-500 to-blue-500 animate-pulse' 
                : 'bg-gradient-to-t from-blue-500/30 to-violet-500/30'
            }`}
            style={{
              height: `${h * (isSpeaking ? 0.8 : 0.4)}px`,
              animation: isSpeaking ? `waveform 0.8s ease-in-out infinite` : 'none',
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-bg-primary text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold gradient-text">Silent AI Partner</div>
          <a 
            href="/"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Back to Home
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#06080F_70%)]" />

        <div className="relative container mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-slate-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live AI Demo
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
              Meet Sarah.
              <br />
              <span className="gradient-text">Your AI Receptionist.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Talk to Sarah right now. She'll handle your call like a real office manager — 
              booking appointments, taking messages, and answering questions about Mike's Plumbing.
            </p>
          </FadeIn>

          {/* Call Widget */}
          <FadeIn delay={300}>
            <div className="gradient-border-animated max-w-2xl mx-auto mb-16">
              <div className="bg-bg-secondary rounded-2xl p-12">
                {renderWaveform()}

                <div className="mb-8">
                  <div className="text-2xl font-semibold mb-2">
                    {callState === 'connected' ? 'You\'re talking to Sarah!' : 'Ready to chat with Sarah?'}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {callState === 'connected' ? (
                      <Mic className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <MicOff className="w-4 h-4 text-slate-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      callState === 'connected' ? 'text-emerald-400' : 'text-slate-500'
                    }`}>
                      {callState === 'connected' ? 'Sarah is listening' : 'Click below to start'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={callState === 'connected' ? endCall : startCall}
                  disabled={isLoading || callState === 'connecting'}
                  className={`px-12 py-4 rounded-full text-xl font-semibold transition-all inline-flex items-center gap-3 ${
                    callState === 'connected'
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white btn-glow'
                  } ${
                    isLoading || callState === 'connecting' 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  {callState === 'connected' ? (
                    <PhoneCall className="w-6 h-6" />
                  ) : (
                    <Phone className="w-6 h-6" />
                  )}
                  {getCallButtonText()}
                </button>

                {callState === 'connecting' && (
                  <p className="text-slate-400 text-sm mt-4">
                    Connecting to Sarah... Make sure to allow microphone access.
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-bg-secondary relative">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">
              Why Contractors <span className="gradient-text">Love Sarah</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="glass-card p-6 text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <p className="text-slate-300 font-medium">{feature.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-bg-primary relative">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 tracking-tight">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-center text-slate-400 mb-16">No contracts. Cancel anytime.</p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
            {tiers.map((tier, i) => (
              <FadeIn key={i} delay={i * 100}>
                {tier.featured ? (
                  <div className="gradient-border-animated lg:-translate-y-4">
                    <div className="bg-bg-secondary rounded-2xl p-8 relative">
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                          Most Popular
                        </span>
                      </div>
                      <TierContent tier={tier} featured />
                    </div>
                  </div>
                ) : (
                  <div className="glass-card p-8">
                    <TierContent tier={tier} />
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bg-secondary relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 text-center relative">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to Get <span className="gradient-text">Sarah</span>?
            </h2>
            <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">
              Start your free trial today. No setup fees. No long-term contracts. 
              Just an AI that answers every call and books every job.
            </p>
            
            <a
              href="https://calendly.com/silentaipartner"
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all btn-glow inline-flex items-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              Start Your Free Trial
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function TierContent({
  tier,
  featured = false,
}: {
  tier: (typeof tiers)[number]
  featured?: boolean
}) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
      <div className="text-4xl font-bold gradient-text mb-6">
        {tier.price}
        <span className="text-lg text-slate-500">/mo</span>
      </div>
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, j) => (
          <li key={j} className="flex items-center gap-3">
            <Check className="w-5 h-5 flex-shrink-0 text-blue-400" />
            <span className="text-slate-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://calendly.com/silentaipartner"
        className={`w-full py-3 rounded-full font-semibold transition-all inline-block text-center ${
          featured
            ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white btn-glow'
            : 'border border-white/20 hover:border-blue-500/50 text-white hover:text-blue-300'
        }`}
      >
        Get Started
      </a>
    </>
  );
}