import { Wrench, Thermometer, Zap, Leaf, Smile, Car } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const industries = [
  { name: 'Plumbers', icon: Wrench },
  { name: 'HVAC', icon: Thermometer },
  { name: 'Electricians', icon: Zap },
  { name: 'Landscapers', icon: Leaf },
  { name: 'Dentists', icon: Smile },
  { name: 'Auto Shops', icon: Car },
]

export function Industries() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="container mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 tracking-tight">
            Built for <span className="gradient-text">Service Businesses</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, i) => {
            const Icon = industry.icon
            return (
              <FadeIn key={i} delay={i * 75}>
                <div className="glass-card p-6 text-center group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/20 group-hover:to-violet-500/20 transition-all">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">{industry.name}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
