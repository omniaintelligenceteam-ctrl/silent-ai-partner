'use client';

import { useState, useRef, useEffect } from 'react';
import { Phone, PhoneCall, Calendar, Clock, DollarSign, Check, Mic, MicOff, MessageSquare, Send, Wrench, AlertTriangle, HelpCircle } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { RetellWebClient } from 'retell-client-js-sdk';

type CallState = 'idle' | 'connecting' | 'connected' | 'disconnected';
type DemoMode = 'voice' | 'text';
type Message = { role: 'user' | 'assistant'; content: string };

const scriptPrompts = [
  {
    icon: Wrench,
    label: "Leaky Faucet",
    text: "Hi, I have a leaky faucet in my kitchen that won't stop dripping."
  },
  {
    icon: AlertTriangle,
    label: "Emergency",
    text: "My pipe burst and there's water everywhere! I need someone now!"
  },
  {
    icon: DollarSign,
    label: "Pricing",
    text: "How much does a water heater replacement cost?"
  },
  {
    icon: Calendar,
    label: "Schedule",
    text: "I need to schedule a drain cleaning for sometime this week."
  },
];

const features = [
  { icon: Clock, text: "Answers every call in under 1 second" },
  { icon: Calendar, text: "Books appointments automatically" },
  { icon: PhoneCall, text: "Never calls in sick" },
  { icon: DollarSign, text: "Costs less than $10/day" },
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
  const [demoMode, setDemoMode] = useState<DemoMode>('text');
  const [callState, setCallState] = useState<CallState>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Mike's Plumbing, this is Sarah. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const retellClient = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (retellClient.current) {
        retellClient.current.stopCall();
      }
    };
  }, []);

  // --- TEXT CHAT ---
  const sendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isSending) return;

    const userMsg: Message = { role: 'user', content: messageText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble right now. Can you try again?" }]);
    } finally {
      setIsSending(false);
    }
  };

  // --- VOICE CALL ---
  const startCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/retell', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to get access token');
      const { access_token } = await response.json();

      retellClient.current = new RetellWebClient();

      retellClient.current.on('call_started', () => {
        setCallState('connected');
        setIsLoading(false);
      });
      retellClient.current.on('call_ended', () => {
        setCallState('disconnected');
        setIsSpeaking(false);
      });
      retellClient.current.on('agent_start_talking', () => setIsSpeaking(true));
      retellClient.current.on('agent_stop_talking', () => setIsSpeaking(false));
      retellClient.current.on('error', () => {
        setCallState('idle');
        setIsLoading(false);
      });

      setCallState('connecting');
      await retellClient.current.startCall({ accessToken: access_token });
    } catch {
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
          <a href="/" className="text-slate-300 hover:text-white transition-colors">Back to Home</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
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
              Talk to Sarah right now — by voice or text. She handles calls like a real office manager:
              booking appointments, taking messages, and answering questions.
            </p>
          </FadeIn>

          {/* Mode Toggle */}
          <FadeIn delay={250}>
            <div className="flex items-center justify-center gap-2 mb-8">
              <button
                onClick={() => setDemoMode('text')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all inline-flex items-center gap-2 ${
                  demoMode === 'text'
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Text Chat
              </button>
              <button
                onClick={() => setDemoMode('voice')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all inline-flex items-center gap-2 ${
                  demoMode === 'voice'
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                Voice Call
              </button>
            </div>
          </FadeIn>

          {/* Demo Widget */}
          <FadeIn delay={300}>
            <div className="gradient-border-animated max-w-2xl mx-auto mb-8">
              <div className="bg-bg-secondary rounded-2xl p-8 md:p-12">

                {demoMode === 'voice' ? (
                  /* VOICE MODE */
                  <>
                    {renderWaveform()}
                    <div className="mb-8">
                      <div className="text-2xl font-semibold mb-2">
                        {callState === 'connected' ? "You're talking to Sarah!" : 'Ready to chat with Sarah?'}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        {callState === 'connected' ? (
                          <Mic className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <MicOff className="w-4 h-4 text-slate-500" />
                        )}
                        <span className={`text-sm font-medium ${callState === 'connected' ? 'text-emerald-400' : 'text-slate-500'}`}>
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
                      } ${isLoading || callState === 'connecting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {callState === 'connected' ? <PhoneCall className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
                      {callState === 'connecting' ? 'Connecting...' : callState === 'connected' ? 'End Call' : callState === 'disconnected' ? 'Call Again' : 'Try Sarah Now'}
                    </button>
                    {callState === 'connecting' && (
                      <p className="text-slate-400 text-sm mt-4">Connecting to Sarah... Make sure to allow microphone access.</p>
                    )}
                  </>
                ) : (
                  /* TEXT CHAT MODE */
                  <>
                    {/* Chat Messages */}
                    <div className="bg-black/30 rounded-xl p-4 mb-4 h-80 overflow-y-auto text-left space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
                              : 'bg-white/10 text-slate-200'
                          }`}>
                            {msg.role === 'assistant' && (
                              <span className="text-xs text-emerald-400 font-medium block mb-1">Sarah</span>
                            )}
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isSending && (
                        <div className="flex justify-start">
                          <div className="bg-white/10 rounded-2xl px-4 py-2.5 text-sm">
                            <span className="text-xs text-emerald-400 font-medium block mb-1">Sarah</span>
                            <span className="text-slate-400 animate-pulse">typing...</span>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <form
                      onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message to Sarah..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                        disabled={isSending}
                      />
                      <button
                        type="submit"
                        disabled={!inputText.trim() || isSending}
                        className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white p-3 rounded-full transition-all disabled:opacity-30"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Script Prompts */}
          <FadeIn delay={350}>
            <div className="max-w-2xl mx-auto mb-16">
              <p className="text-slate-500 text-sm mb-3">Not sure what to say? Try one of these:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {scriptPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (demoMode === 'text') {
                        sendMessage(prompt.text);
                      } else {
                        setInputText(prompt.text);
                        setDemoMode('text');
                        setTimeout(() => sendMessage(prompt.text), 100);
                      }
                    }}
                    className="glass hover:bg-white/10 border border-white/5 hover:border-blue-500/30 rounded-xl p-3 text-left transition-all group"
                  >
                    <prompt.icon className="w-5 h-5 text-blue-400 mb-2 group-hover:text-blue-300" />
                    <span className="text-xs text-slate-300 group-hover:text-white font-medium">{prompt.label}</span>
                  </button>
                ))}
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

function TierContent({ tier, featured = false }: { tier: (typeof tiers)[number]; featured?: boolean }) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
      <div className="text-4xl font-bold gradient-text mb-6">
        {tier.price}<span className="text-lg text-slate-500">/mo</span>
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
