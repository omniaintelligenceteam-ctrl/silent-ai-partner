import { Phone } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

export function FooterCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-bg-primary">
      {/* Large ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-cyan-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 text-center relative">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Stop Missing Calls.
            <br />
            <span className="gradient-text">Start Tonight.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            One missed emergency call = one lost customer. Stop the bleeding. Setup takes 5 minutes.
          </p>
          <a
            href="tel:+18667821303"
            className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-12 py-5 rounded-full text-xl font-semibold transition-all btn-glow inline-flex items-center gap-3"
          >
            <Phone className="w-6 h-6" />
            Call Our Demo Line
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
