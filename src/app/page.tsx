import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { LiveIntelligence } from '@/components/sections/LiveIntelligence'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { CostComparison } from '@/components/sections/CostComparison'
import { DashboardPreview } from '@/components/sections/DashboardPreview'
import { Pricing } from '@/components/sections/Pricing'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="bg-bg-primary text-white min-h-screen">
      <Header />
      <Hero />
      <PainPoints />
      <LiveIntelligence />
      <HowItWorks />
      <Features />
      <CostComparison />
      <DashboardPreview />
      <Pricing />
      <FooterCTA />
      <Footer />
    </div>
  )
}