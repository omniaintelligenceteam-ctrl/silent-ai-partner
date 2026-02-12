'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, PhoneOff, Calendar } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { RetellWebClient } from 'retell-client-js-sdk';

type CallState = 'idle' | 'connecting' | 'connected' | 'error';

export default function DemoPage() {
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
                Voice Demo
              </div>
            </div>
          </div>
        </div>
        
        <a 
          href="https://calendly.com/silentaipartner"
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-all btn-glow hidden sm:inline-flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Get Sarah
        </a>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <FadeIn>
          <div className="text-center max-w-md">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
              <div className="text-4xl font-bold text-white">S</div>
            </div>
            
            <h2 className="text-3xl font-semibold mb-2">Sarah - AI Receptionist</h2>
            <p className="text-slate-400 mb-8">Mike's Plumbing • Scottsdale, AZ</p>
            
            {callState === 'idle' && (
              <div className="space-y-6">
                <p className="text-slate-300 mb-6 text-lg">
                  Experience Sarah's natural voice interaction. Click the button below to start talking!
                </p>
                <button
                  onClick={startCall}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-8 py-4 rounded-full text-lg font-medium transition-all btn-glow flex items-center gap-3 mx-auto transform hover:scale-105"
                >
                  <Phone className="w-6 h-6" />
                  Start Voice Call
                </button>
                <div className="text-sm text-slate-500 mt-4">
                  <p>Try asking Sarah about:</p>
                  <div className="grid grid-cols-1 gap-2 mt-3 text-slate-400">
                    <p>• "I have a leaky faucet"</p>
                    <p>• "How much for water heater replacement?"</p>
                    <p>• "Schedule drain cleaning"</p>
                    <p>• "My pipe burst, water everywhere"</p>
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
                
                <p className="text-emerald-400 font-medium text-lg">🟢 Connected • Speaking with Sarah</p>
                <p className="text-slate-400">Sarah can hear you. Speak naturally!</p>
                <p className="text-slate-500 text-sm">Ask about plumbing services, pricing, or schedule an appointment</p>
                
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
        </FadeIn>
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-white/10 bg-bg-secondary/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-2">
            This is a live demo of Sarah, an AI receptionist powered by Retell AI
          </p>
          <p className="text-slate-500 text-xs">
            Ready to get Sarah for your business? 
            <a href="https://calendly.com/silentaipartner" className="text-orange-400 hover:text-orange-300 ml-1">
              Schedule a call →
            </a>
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