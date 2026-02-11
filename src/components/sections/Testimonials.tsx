import { Star } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const testimonials = [
  {
    quote: "Sarah has been a game-changer for our plumbing business. We don't miss calls anymore!",
    name: 'Mike Johnson',
    company: 'Johnson Plumbing',
    initials: 'MJ',
  },
  {
    quote: 'Our booking rate increased by 40% since implementing Silent AI Partner.',
    name: 'Sarah Davis',
    company: 'Davis HVAC',
    initials: 'SD',
  },
  {
    quote: "It's like having a receptionist that never sleeps. Absolutely worth every penny.",
    name: 'Tom Rodriguez',
    company: 'Rodriguez Electric',
    initials: 'TR',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-tight">
            What Our Customers <span className="gradient-text">Say</span>
          </h2>
          <p className="text-center text-slate-400 mb-16">Early customers are already seeing results</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 100} className={i === 1 ? 'lg:-translate-y-4' : ''}>
              <div className="glass-card p-8 relative h-full">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 to-violet-500/50 rounded-t-2xl" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
