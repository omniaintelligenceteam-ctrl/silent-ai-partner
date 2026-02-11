import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-400">Silent AI Partner</div>
          <a 
            href="tel:+18667821303" 
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Call Now
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 gap-4 h-full">
            {Array.from({length: 64}).map((_, i) => (
              <div key={i} className="border border-gray-800"></div>
            ))}
          </div>
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4">Your business. Always on.</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Partner That<br />{' '}
            <span className="text-amber-400">Never Sleeps</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
            AI that answers your phones, books your jobs, and runs 90% of your business — 
            so you can focus on the work that pays.
          </p>
          <p className="text-lg text-gray-500 mb-12">Built by a contractor. For contractors.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="tel:+18667821303" 
              className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-full text-lg font-bold transition-colors inline-flex items-center justify-center"
            >
              📞 Call Our Demo Line
            </a>
            <a 
              href="#pricing" 
              className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              See Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-amber-400">
            Every Missed Call = Money Gone
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">While you&apos;re under a sink or on a roof, your phone is ringing. Here&apos;s what happens when nobody picks up:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-red-500 mb-4">62%</div>
              <p className="text-gray-300 text-lg">of calls to small businesses go unanswered</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-red-500 mb-4">85%</div>
              <p className="text-gray-300 text-lg">of callers who hit voicemail DON'T leave a message</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-red-500 mb-4">67%</div>
              <p className="text-gray-300 text-lg">call your competitor instead</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-amber-400 mb-4">$500+</div>
              <p className="text-gray-300 text-lg">lost revenue per missed call</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-amber-400">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-amber-500 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Customer Calls</h3>
              <p className="text-gray-300 text-lg">Your phone rings. AI picks up on the first ring. Every time.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Handles It</h3>
              <p className="text-gray-300 text-lg">Answers questions, gives quotes, books the job. Sounds human. Because it should.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">You Get Paid</h3>
              <p className="text-gray-300 text-lg">You get a text with the details. Job&apos;s booked. Customer&apos;s happy. You didn&apos;t lift a finger.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-amber-400">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              '24/7 Call Answering',
              'Appointment Booking', 
              'Emergency Routing',
              'Lead Capture & Follow-up',
              'SMS Notifications to You',
              'Custom Voice & Personality',
              'Call Recordings & Transcripts',
              'Works With Your Existing Number'
            ].map((feature, index) => (
              <div key={index} className="bg-black border border-gray-700 rounded-lg p-6 text-center hover:border-amber-500 transition-colors">
                <div className="text-amber-400 text-4xl mb-4">✓</div>
                <h3 className="text-lg font-semibold">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-amber-400">
            Hear It Yourself. Right Now.
          </h2>
          <div className="bg-gray-900 border-2 border-amber-500 rounded-2xl p-12 max-w-2xl mx-auto">
            <div className="text-6xl md:text-7xl font-bold text-amber-400 mb-6">
              (866) 782-1303
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Ask about drain cleaning, schedule a water heater install, or report an emergency. 
              Sarah will handle it.
            </p>
            <a 
              href="tel:+18667821303" 
              className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-full text-xl font-bold transition-colors"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-amber-400">
            Simple Pricing
          </h2>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-black border border-gray-700 rounded-2xl p-8 relative">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold text-amber-400 mb-6">$197<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> 300 minutes included</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> 24/7 call answering</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Message taking & SMS alerts</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Basic FAQ handling</li>
              </ul>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-full font-semibold transition-colors">
                Get Started
              </button>
            </div>

            {/* Professional */}
            <div className="bg-black border-2 border-amber-500 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-black px-6 py-2 rounded-full font-bold">POPULAR</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold text-amber-400 mb-6">$297<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> 600 minutes included</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Everything in Starter</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Appointment booking</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Emergency routing</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Call recordings & transcripts</li>
              </ul>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-full font-bold transition-colors">
                Get Started
              </button>
            </div>

            {/* Business */}
            <div className="bg-black border border-gray-700 rounded-2xl p-8 relative">
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <div className="text-4xl font-bold text-amber-400 mb-6">$497<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> 1,200 minutes included</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Everything in Professional</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Follow-up texts to missed calls</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Custom voice & personality</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Priority support</li>
                <li className="flex items-center"><span className="text-amber-400 mr-3">✓</span> Spanish language support</li>
              </ul>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-full font-semibold transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-amber-400">
            Built for Service Businesses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔧</div>
              <p className="text-lg">Plumbers</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🌡️</div>
              <p className="text-lg">HVAC</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <p className="text-lg">Electricians</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-lg">Landscapers</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🦷</div>
              <p className="text-lg">Dentists</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🚗</div>
              <p className="text-lg">Auto Shops</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-400">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-400 mb-16">Early customers are already seeing results</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-amber-400 text-6xl mb-4">"</div>
              <p className="text-gray-300 mb-6 italic">
                "Sarah has been a game-changer for our plumbing business. We don't miss calls anymore!"
              </p>
              <p className="font-semibold">Mike Johnson</p>
              <p className="text-gray-400">Johnson Plumbing</p>
            </div>
            <div className="bg-black border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-amber-400 text-6xl mb-4">"</div>
              <p className="text-gray-300 mb-6 italic">
                "Our booking rate increased by 40% since implementing Silent AI Partner."
              </p>
              <p className="font-semibold">Sarah Davis</p>
              <p className="text-gray-400">Davis HVAC</p>
            </div>
            <div className="bg-black border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-amber-400 text-6xl mb-4">"</div>
              <p className="text-gray-300 mb-6 italic">
                "It's like having a receptionist that never sleeps. Absolutely worth every penny."
              </p>
              <p className="font-semibold">Tom Rodriguez</p>
              <p className="text-gray-400">Rodriguez Electric</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-amber-400">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">How does it work with my existing number?</h3>
              <p className="text-gray-300">We can either forward your existing calls to our system or provide you with a new number that forwards to us. Setup takes less than 5 minutes.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">What happens during an emergency call?</h3>
              <p className="text-gray-300">Emergency calls are immediately routed to your designated emergency contact. Our AI can recognize urgency in tone and keywords.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Can the AI book real appointments?</h3>
              <p className="text-gray-300">Yes! The AI integrates with your calendar and can book appointments in real-time, sending you confirmations via text.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">How long does setup take?</h3>
              <p className="text-gray-300">Most customers are up and running within 24 hours. We handle all the technical setup for you.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Is there a contract?</h3>
              <p className="text-gray-300">No long-term contracts required. Pay month-to-month and cancel anytime.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">What if I go over my minutes?</h3>
              <p className="text-gray-300">Additional minutes are billed at $0.25 per minute. We'll notify you before you approach your limit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gradient-to-r from-amber-600 to-amber-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Stop Missing Calls. Start Tonight.
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto">
            One missed emergency call = one lost customer. Stop the bleeding. Setup takes 5 minutes.
          </p>
          <a 
            href="tel:+18667821303" 
            className="bg-black hover:bg-gray-800 text-white px-12 py-6 rounded-full text-xl font-bold transition-colors inline-flex items-center"
          >
            📞 Call Our Demo Line
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-4">Silent AI Partner</div>
            <p className="text-gray-400 mb-6">Your AI receptionist that never sleeps</p>
            <div className="space-y-2 text-gray-400">
              <p>📞 Demo Line: (866) 782-1303</p>
              <p>✉️ Email: hello@silentaipartner.com</p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
              <p>© 2026 Silent AI Partner. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}