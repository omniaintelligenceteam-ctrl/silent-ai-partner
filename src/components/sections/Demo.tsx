import { Phone, Mic } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const industries = [
  { name: 'Plumbing', emoji: '🔧', href: '/plumbing', color: 'from-blue-500 to-cyan-500' },
  { name: 'HVAC', emoji: '❄️', href: '/hvac', color: 'from-sky-500 to-blue-500' },
  { name: 'Landscape Lighting', emoji: '💡', href: '/landscape-lighting', color: 'from-orange-400 to-yellow-500' },
  { name: 'Electrical', emoji: '⚡', href: '/electrical', color: 'from-violet-500 to-purple-500' },
]

const barHeights = [40, 60, 80, 100, 80, 60, 40]

export function Demo() {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 text-center relative">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Hear It Yourself. <span className="gradient-text">Right Now.</span>
          </h2>
          <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">
            Pick your industry and talk to Sarah — or interview her directly.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          {/* Industry demo cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {industries.map((ind) => (
              <a
                key={ind.name}
                href={ind.href}
                className="group bg-bg-secondary border border-slate-800/50 rounded-2xl p-6 transition-all hover:border-slate-700 hover:bg-slate-800/30"
              >
                <div className="text-4xl mb-3">{ind.emoji}</div>
                <div className="text-white font-semibold mb-2">{ind.name}</div>
                <div className={`text-sm font-medium bg-gradient-to-r ${ind.color} bg-clip-text text-transparent group-hover:opacity-100 opacity-70 transition-opacity`}>
                  Try Demo →
                </div>
              </a>
            ))}
          </div>

          {/* Interview Sarah - featured */}
          <div className="gradient-border-animated max-w-2xl mx-auto">
            <div className="bg-bg-secondary rounded-2xl p-10">
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-orange-500 to-orange-300"
                    style={{
                      height: `${h * 0.4}px`,
                      animation: 'waveform 1.5s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              <div className="text-2xl md:text-3xl font-bold text-white mb-3">
                Interview Sarah
              </div>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                Want to see if she&apos;s a good fit? Ask her anything — she&apos;ll tell you about her skills, your industry, and walk you through pricing.
              </p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400 font-medium">Sarah is live and ready</span>
              </div>

              <a
                href="/demo"
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all btn-glow inline-flex items-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Interview Sarah
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
