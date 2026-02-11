import {
  Phone,
  CalendarCheck,
  AlertTriangle,
  Target,
  MessageSquare,
  Mic,
  FileText,
  Link2,
} from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const features = [
  {
    icon: Phone,
    title: '24/7 Call Answering',
    desc: 'Never miss a call, day or night. Your AI receptionist answers instantly.',
    span: 2,
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Booking',
    desc: 'Books directly into your calendar with real-time confirmations.',
    span: 2,
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Routing',
    desc: 'Urgent calls routed to you immediately based on tone and keywords.',
    span: 1,
  },
  {
    icon: Target,
    title: 'Lead Capture & Follow-up',
    desc: 'Captures every lead and follows up automatically.',
    span: 1,
  },
  {
    icon: MessageSquare,
    title: 'SMS Notifications to You',
    desc: 'Get instant text alerts with call details and next steps.',
    span: 1,
  },
  {
    icon: Mic,
    title: 'Custom Voice & Personality',
    desc: 'Sounds like your brand. Tailored to your business.',
    span: 1,
  },
  {
    icon: FileText,
    title: 'Call Recordings & Transcripts',
    desc: 'Full history of every interaction, searchable and organized.',
    span: 2,
  },
  {
    icon: Link2,
    title: 'Works With Your Existing Number',
    desc: 'No new number needed. Simple call forwarding setup in minutes.',
    span: 2,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-16 tracking-tight">
            What She <span className="gradient-text">Does For You</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <FadeIn key={i} delay={i * 75} className={feature.span === 2 ? 'lg:col-span-2' : ''}>
                <div className="glass-card p-8 h-full group">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
