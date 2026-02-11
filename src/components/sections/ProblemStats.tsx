import { FadeIn } from '@/components/ui/FadeIn'

const stats = [
  { value: '62%', label: 'of calls to small businesses go unanswered' },
  { value: '85%', label: "of callers who hit voicemail DON'T leave a message" },
  { value: '67%', label: 'call your competitor instead' },
  { value: '$500+', label: 'lost revenue per missed call', accent: true },
]

export function ProblemStats() {
  return (
    <section className="py-24 bg-bg-secondary relative">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-tight">
            Every Missed Call = <span className="text-red-400">Money Gone</span>
          </h2>
          <p className="text-center text-slate-400 text-lg mb-16 max-w-2xl mx-auto">
            While you&apos;re under a sink or on a roof, your phone is ringing. Here&apos;s what happens when nobody picks up:
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="glass-card p-8 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${
                  stat.accent
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-r from-red-500 to-orange-500'
                }`} />
                <div className={`text-5xl md:text-6xl font-bold mb-3 ${
                  stat.accent ? 'gradient-text' : 'gradient-text-warm'
                }`}>
                  {stat.value}
                </div>
                <p className="text-slate-400 text-sm md:text-base">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
