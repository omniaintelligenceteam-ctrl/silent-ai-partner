import { Phone } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const barHeights = [40, 60, 80, 100, 80, 60, 40]

export function Demo() {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 text-center relative">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Hear It Yourself. <span className="gradient-text">Right Now.</span>
          </h2>
          <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">
            Call our live demo. Ask about drain cleaning, schedule a water heater install, or report an emergency. Sarah will handle it.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="gradient-border-animated max-w-2xl mx-auto">
            <div className="bg-bg-secondary rounded-2xl p-12">
              {/* Waveform visualization */}
              <div className="flex items-center justify-center gap-1.5 mb-8">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-violet-500"
                    style={{
                      height: `${h * 0.4}px`,
                      animation: 'waveform 1.5s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              <div className="text-3xl md:text-5xl font-bold gradient-text mb-6">
                Talk to Sarah Live
              </div>

              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400 font-medium">Sarah is live and ready — right in your browser</span>
              </div>

              <a
                href="/demo"
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all btn-glow inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Try Sarah Now
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
