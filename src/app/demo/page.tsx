'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Calendar, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const scriptPrompts = [
  "I have a leaky faucet",
  "My pipe burst, water everywhere",
  "How much for water heater replacement?",
  "Schedule drain cleaning"
];

const SARAH_GREETING = "Hi there! Mike's Plumbing, this is Sarah. How can I help you today?";

export default function DemoPage() {
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isProcessingAudioRef = useRef(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-play Sarah's greeting on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMuted) {
        playTTS(SARAH_GREETING);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isMuted]);

  // Process audio queue
  useEffect(() => {
    audioQueueRef.current = audioQueue;
    if (audioQueue.length > 0 && !isProcessingAudioRef.current && !isMuted) {
      processAudioQueue();
    }
  }, [audioQueue, isMuted]);

  const processAudioQueue = async () => {
    if (isProcessingAudioRef.current || audioQueueRef.current.length === 0 || isMuted) return;
    
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
    if (!isMuted) {
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
          
          <a 
            href="https://calendly.com/silentaipartner"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-all btn-glow hidden sm:inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Get Sarah
          </a>
        </div>
      </header>

      {/* Messages */}
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

      {/* Quick Prompts */}
      <div className="p-4 border-t border-white/10 bg-bg-secondary/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto mb-4">
          <p className="text-slate-500 text-sm mb-3 text-center">Need help getting started? Try one of these:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scriptPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => sendMessage(prompt)}
                disabled={isTyping}
                className="text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-xl transition-all text-sm text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
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

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        
        .animate-bounce {
          animation: bounce 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}