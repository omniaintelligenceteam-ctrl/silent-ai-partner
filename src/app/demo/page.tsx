'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Calendar, ArrowLeft, Volume2, VolumeX, Phone, MessageCircle, PhoneOff } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type CallState = 'idle' | 'connecting' | 'connected';
type Mode = 'voice' | 'text';

const scriptPrompts = [
  "I have a leaky faucet",
  "My pipe burst, water everywhere", 
  "How much for water heater replacement?",
  "Schedule drain cleaning"
];

const SARAH_GREETING = "Hi there! Mike's Plumbing, this is Sarah. How can I help you today?";

export default function DemoPage() {
  const [mode, setMode] = useState<Mode>('voice');
  
  // Text Chat State
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: SARAH_GREETING,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioQueue, setAudioQueue] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  
  // Voice Call State  
  const [callState, setCallState] = useState<CallState>('idle');
  const [retellWebClient, setRetellWebClient] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isProcessingAudioRef = useRef(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (mode === 'text') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mode]);

  // Auto-play Sarah's greeting on text mode
  useEffect(() => {
    if (mode === 'text') {
      const timer = setTimeout(() => {
        if (!isMuted) {
          playTTS(SARAH_GREETING);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mode, isMuted]);

  // Process audio queue for text mode
  useEffect(() => {
    audioQueueRef.current = audioQueue;
    if (audioQueue.length > 0 && !isProcessingAudioRef.current && !isMuted && mode === 'text') {
      processAudioQueue();
    }
  }, [audioQueue, isMuted, mode]);

  // Load Retell SDK when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !retellWebClient) {
      // Load Retell SDK
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2.3.0/dist/web/index.min.js';
      script.onload = () => {
        // SDK loaded, initialize when needed
        console.log('Retell SDK loaded');
      };
      document.head.appendChild(script);
    }
  }, [retellWebClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retellWebClient) {
        retellWebClient.stopCall();
      }
      stopAudio();
    };
  }, [retellWebClient]);

  const processAudioQueue = async () => {
    if (isProcessingAudioRef.current || audioQueueRef.current.length === 0 || isMuted || mode !== 'text') return;
    
    isProcessingAudioRef.current = true;
    setIsPlaying(true);
    
    const textToSpeak = audioQueueRef.current[0];
    
    try {
      const response = await fetch('/api/elevenlabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
          voice_id: 'EXAVITQu4vr4xnSDxMaL',
          model_id: 'eleven_turbo_v2_5'
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Stop any currently playing audio
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0;
        }
        
        const audio = new Audio(audioUrl);
        currentAudioRef.current = audio;
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setAudioQueue(prev => prev.slice(1));
          isProcessingAudioRef.current = false;
          setIsPlaying(false);
        };
        
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          setAudioQueue(prev => prev.slice(1));
          isProcessingAudioRef.current = false;
          setIsPlaying(false);
        };
        
        await audio.play();
      } else {
        throw new Error('TTS API failed');
      }
    } catch (error) {
      console.error('TTS Error:', error);
      setAudioQueue(prev => prev.slice(1));
      isProcessingAudioRef.current = false;
      setIsPlaying(false);
    }
  };

  const playTTS = (text: string) => {
    if (!isMuted && mode === 'text') {
      setAudioQueue(prev => [...prev, text]);
    }
  };

  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    setAudioQueue([]);
    isProcessingAudioRef.current = false;
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (!isMuted) {
      stopAudio();
    }
    setIsMuted(!isMuted);
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) throw new Error('Chat API failed');
      
      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Queue TTS for Sarah's response
      playTTS(data.message);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble right now. Can you try again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      playTTS(errorMessage.content);
    } finally {
      setIsTyping(false);
    }
  };

  const startCall = async () => {
    try {
      setCallState('connecting');
      
      // Get access token from our API
      const response = await fetch('/api/retell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to get access token');
      }
      
      const { access_token } = await response.json();
      
      // Initialize Retell WebClient
      const webClient = new (window as any).RetellWebClient();
      
      webClient.on('call_started', () => {
        console.log('Call started');
        setCallState('connected');
      });
      
      webClient.on('call_ended', () => {
        console.log('Call ended');
        setCallState('idle');
      });
      
      webClient.on('error', (error: any) => {
        console.error('Call error:', error);
        setCallState('idle');
      });
      
      setRetellWebClient(webClient);
      
      // Start the call
      await webClient.startCall({
        accessToken: access_token,
      });
      
    } catch (error) {
      console.error('Error starting call:', error);
      setCallState('idle');
    }
  };

  const endCall = () => {
    if (retellWebClient) {
      retellWebClient.stopCall();
      setRetellWebClient(null);
    }
    setCallState('idle');
  };

  const handlePromptClick = (prompt: string) => {
    if (mode === 'voice') {
      // For voice mode, we could potentially send this as a message to Sarah
      // But typically voice calls are purely audio, so we'll just show a message
      alert(`Say: "${prompt}"`);
    } else {
      // For text mode, send the message
      sendMessage(prompt);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-bg-primary text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-white/10 bg-bg-secondary/50 backdrop-blur-xl">
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
              <h1 className="font-semibold text-white">Talk to Sarah</h1>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {mode === 'text' && (
            <button
              onClick={toggleMute}
              className={`p-2 rounded-full transition-all ${
                isMuted 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : isPlaying 
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 animate-pulse' 
                    : 'bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white'
              }`}
              aria-label={isMuted ? 'Unmute Sarah' : 'Mute Sarah'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}
          
          <a 
            href="https://calendly.com/silentaipartner"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-all btn-glow hidden sm:inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Get Sarah
          </a>
        </div>
      </header>

      {/* Mode Toggle */}
      <div className="p-4 border-b border-white/10 bg-bg-secondary/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                if (callState !== 'idle') endCall();
                stopAudio();
                setMode('voice');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === 'voice'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              🎙️ Voice Call
            </button>
            <button
              onClick={() => {
                if (callState !== 'idle') endCall();
                setMode('text');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === 'text'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              💬 Text Chat
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {mode === 'voice' ? (
          // Voice Call Mode
          <div className="h-full flex flex-col items-center justify-center p-8">
            <FadeIn>
              <div className="text-center max-w-md">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white">S</div>
                </div>
                
                <h2 className="text-2xl font-semibold mb-2">Sarah - AI Receptionist</h2>
                <p className="text-slate-400 mb-8">Mike's Plumbing • Scottsdale, AZ</p>
                
                {callState === 'idle' && (
                  <div className="space-y-4">
                    <p className="text-slate-300 mb-6">Ready to talk to Sarah? Click the button below to start your voice call.</p>
                    <button
                      onClick={startCall}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-8 py-4 rounded-full text-lg font-medium transition-all btn-glow flex items-center gap-3 mx-auto"
                    >
                      <Phone className="w-6 h-6" />
                      Start Call
                    </button>
                  </div>
                )}
                
                {callState === 'connecting' && (
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                    <p className="text-slate-300">Connecting to Sarah...</p>
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
                    {/* Waveform Visualization */}
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
                    
                    <p className="text-emerald-400 font-medium">🟢 Connected • Speaking with Sarah</p>
                    <p className="text-slate-400 text-sm">Sarah can hear you. Speak naturally!</p>
                    
                    <button
                      onClick={endCall}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center gap-3 mx-auto"
                    >
                      <PhoneOff className="w-6 h-6" />
                      End Call
                    </button>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        ) : (
          // Text Chat Mode
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <FadeIn>
                <div className="max-w-4xl mx-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div className="flex items-start gap-3 max-w-[80%] sm:max-w-[70%]">
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center text-white font-semibold text-sm mt-1 flex-shrink-0">
                            S
                          </div>
                        )}
                        
                        <div className="flex flex-col">
                          <div
                            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-br-md'
                                : 'bg-slate-800/80 text-slate-200 rounded-bl-md border border-slate-700/50'
                            }`}
                          >
                            {message.role === 'assistant' && (
                              <div className="text-xs text-emerald-400 font-medium mb-1">Sarah</div>
                            )}
                            {message.content}
                          </div>
                          
                          <div className={`text-xs text-slate-500 mt-1 ${
                            message.role === 'user' ? 'text-right' : 'text-left'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="flex items-start gap-3 max-w-[80%] sm:max-w-[70%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center text-white font-semibold text-sm mt-1 flex-shrink-0">
                          S
                        </div>
                        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-bl-md px-4 py-3">
                          <div className="text-xs text-emerald-400 font-medium mb-1">Sarah</div>
                          <div className="flex items-center gap-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-slate-500 text-sm ml-2">typing...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </FadeIn>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="p-4 border-t border-white/10 bg-bg-secondary/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto mb-4">
          <p className="text-slate-500 text-sm mb-3 text-center">
            {mode === 'voice' ? 'Need help getting started? Try saying one of these:' : 'Need help getting started? Try one of these:'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scriptPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                disabled={mode === 'text' && isTyping}
                className="text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-xl transition-all text-sm text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Text Input (only shown in text mode) */}
      {mode === 'text' && (
        <div className="p-4 bg-bg-secondary border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message to Sarah..."
                  disabled={isTyping}
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 rounded-2xl px-6 py-4 text-white placeholder-slate-500 resize-none focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  maxLength={500}
                />
              </div>
              
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:from-orange-500/50 disabled:to-amber-500/50 text-white p-4 rounded-2xl transition-all btn-glow disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            
            <p className="text-center text-xs text-slate-500 mt-3">
              Sarah responds with voice automatically. {isMuted && "🔇 Voice is muted."}
            </p>
          </div>
        </div>
      )}

      {/* Custom Styles */}
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