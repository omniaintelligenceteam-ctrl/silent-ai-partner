import { ChevronDown } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const faqs = [
  {
    q: 'How does it work with my existing number?',
    a: 'We can either forward your existing calls to our system or provide you with a new number that forwards to us. Setup takes less than 5 minutes.',
  },
  {
    q: 'What happens during an emergency call?',
    a: 'Emergency calls are immediately routed to your designated emergency contact. Our AI can recognize urgency in tone and keywords.',
  },
  {
    q: 'Can the AI book real appointments?',
    a: 'Yes! The AI integrates with your calendar and can book appointments in real-time, sending you confirmations via text.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most customers are up and running within 24 hours. We handle all the technical setup for you.',
  },
  {
    q: 'Is there a contract?',
    a: 'No long-term contracts required. Pay month-to-month and cancel anytime.',
  },
  {
    q: 'What if I go over my minutes?',
    a: "Additional minutes are billed at $0.25 per minute. We'll notify you before you approach your limit.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-16 tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </FadeIn>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 75}>
              <details className="group glass-card overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold pr-4">{faq.q}</h3>
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
