import { FadeIn } from '@/components/ui/FadeIn'

const steps = [
  {
    num: 1,
    title: 'She Answers',
    desc: 'Every call. First ring. 2am on a Sunday? She\'s there. Holiday weekend? She\'s there.',
  },
  {
    num: 2,
    title: 'She Handles It',
    desc: 'Knows your services, your prices, your schedule. Books the job. Texts your crew. Confirms with the customer.',
  },
  {
    num: 3,
    title: 'You Get Paid',
    desc: "You get a text: \"New job booked.\" That's it. She did everything else.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-20 tracking-tight">
            Meet Your New <span className="gradient-text">Office Manager</span>
          </h2>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 opacity-30" />

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="text-center relative">
                  <div className="relative inline-flex mb-8">
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 w-16 h-16 rounded-full bg-blue-500/20"
                      style={{
                        animation: 'pulse-ring 3s ease-in-out infinite',
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
