import { Check } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const tiers = [
  {
    name: 'Starter',
    price: '$197',
    features: [
      '300 minutes included',
      '24/7 call answering',
      'Message taking & SMS alerts',
      'Basic FAQ handling',
    ],
    featured: false,
  },
  {
    name: 'Professional',
    price: '$297',
    features: [
      '600 minutes included',
      'Everything in Starter',
      'Appointment booking',
      'Emergency routing',
      'Call recordings & transcripts',
    ],
    featured: true,
  },
  {
    name: 'Business',
    price: '$497',
    features: [
      '1,200 minutes included',
      'Everything in Professional',
      'Follow-up texts to missed calls',
      'Custom voice & personality',
      'Priority support',
      'Spanish language support',
    ],
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-bg-secondary relative">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-tight">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-center text-slate-400 mb-16">No contracts. Cancel anytime.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          {tiers.map((tier, i) => (
            <FadeIn key={i} delay={i * 100}>
              {tier.featured ? (
                <div className="gradient-border-animated lg:-translate-y-4">
                  <div className="bg-bg-secondary rounded-2xl p-8 relative">
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                        Most Popular
                      </span>
                    </div>
                    <TierContent tier={tier} featured />
                  </div>
                </div>
              ) : (
                <div className="glass-card p-8">
                  <TierContent tier={tier} />
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function TierContent({
  tier,
  featured = false,
}: {
  tier: (typeof tiers)[number]
  featured?: boolean
}) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
      <div className="text-4xl font-bold gradient-text mb-6">
        {tier.price}
        <span className="text-lg text-slate-500">/mo</span>
      </div>
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, j) => (
          <li key={j} className="flex items-center gap-3">
            <Check className="w-5 h-5 flex-shrink-0 text-blue-400" />
            <span className="text-slate-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      {featured ? (
        <button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white py-3 rounded-full font-semibold transition-all btn-glow">
          Get Started
        </button>
      ) : (
        <button className="w-full border border-white/20 hover:border-blue-500/50 text-white py-3 rounded-full font-semibold transition-all">
          Get Started
        </button>
      )}
    </>
  )
}
