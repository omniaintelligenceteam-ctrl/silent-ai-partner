'use client';

import { useState, useEffect } from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import { Header } from '@/components/sections/Header';
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
    <div className="min-h-screen bg-bg-primary text-white flex flex-col overflow-hidden">
      {/* Header */}
      <Header />
      <div className="pt-16 lg:pt-20"></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <FadeIn>
          <div className="text-center max-w-md">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <div className="text-4xl font-bold text-white">S</div>
            </div>

            <h2 className="text-3xl font-semibold mb-2 tracking-tight">Interview Sarah</h2>
            <p className="text-slate-400 mb-8">Your AI Office Manager • Silent AI Partner</p>

            {callState === 'idle' && (
              <div className="space-y-6">
                <p className="text-slate-300 mb-6 text-lg">
                  Experience Sarah's natural voice interaction. Click the button below to start talking!
                </p>
                <button
                  onClick={startCall}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all btn-glow flex items-center gap-3 mx-auto"
                >
                  <Phone className="w-6 h-6" />
                  🎙️ Interview Sarah
                </button>
                <div className="text-sm text-slate-500 mt-4">
                  <p>Try asking Sarah:</p>
                  <div className="grid grid-cols-1 gap-2 mt-3 text-slate-500">
                    <p>• "What can you do for my business?"</p>
                    <p>• "How do you handle emergencies?"</p>
                    <p>• "What makes you better than a real receptionist?"</p>
                    <p>• "Walk me through your pricing"</p>
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
        </FadeIn>
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-slate-800/30 bg-bg-secondary/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-2">
            This is a live demo of Sarah, an AI receptionist powered by Retell AI
          </p>
          <p className="text-slate-500 text-xs">
            Ready to get Sarah for your business?
            <a href="https://calendly.com/silentaipartner" className="text-orange-400 hover:text-orange-300 transition-colors duration-200 ml-1">
              Schedule a call →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
