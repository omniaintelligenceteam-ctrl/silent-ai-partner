import { Phone } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

export function Hero() {
  return (
    <section className="relative pt-24 pb-36 overflow-hidden bg-bg-primary">
      {/* Animated dot grid */}
      <div className="absolute inset-0 hero-grid" />
      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#06080F_70%)]" />

      <div className="relative container mx-auto px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-slate-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Your business. Always on.
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
            The Partner That
            <br />
            <span className="gradient-text">Never Sleeps</span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="text-lg md:text-xl text-slate-400 mb-4 max-w-3xl mx-auto leading-relaxed">
            AI that answers your phones, books your jobs, and runs 90% of your business —
            so you can focus on the work that pays.
          </p>
          <p className="text-base text-slate-500 mb-12">Built by a contractor. For contractors.</p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18667821303"
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all btn-glow inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Our Demo Line
            </a>
            <a
              href="#pricing"
              className="border border-white/20 text-white hover:border-blue-500/50 hover:text-blue-300 px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              See Pricing
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
