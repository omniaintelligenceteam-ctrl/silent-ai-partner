import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { WhoThisHelps } from '@/components/sections/WhoThisHelps'
import { TheOutcome } from '@/components/sections/TheOutcome'
import { Features } from '@/components/sections/Features'

import { VoiceDemo } from '@/components/sections/VoiceDemo'
import { AuditForm } from '@/components/sections/AuditForm'
import { DashboardPreview } from '@/components/sections/DashboardPreview'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { Footer } from '@/components/sections/Footer'
import { FloatingPaths } from '@/components/ui/background-paths'

export default function Home() {
  return (
    <div className="relative bg-bg-primary text-white min-h-screen">
      {/* Animated SVG path background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10">
      <Header />
      <Hero />
      <div className="section-divider" />
      <PainPoints />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <WhoThisHelps />
      <div className="section-divider" />
      <TheOutcome />
      <div className="section-divider" />
      <Features />
      <div className="section-divider" />
      <VoiceDemo />
      <div className="section-divider" />
      <AuditForm />
      <div className="section-divider" />
      <DashboardPreview />
      <div className="section-divider" />
      <FooterCTA />
      <Footer />
      </div>
    </div>
  )
}
