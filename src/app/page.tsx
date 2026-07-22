import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { WhoItsFor } from '@/components/sections/WhoItsFor'
import { CapabilityBreakdown } from '@/components/sections/CapabilityBreakdown'
import { LiveProof } from '@/components/sections/LiveProof'
import { DepartmentTicker } from '@/components/ui/DepartmentTicker'

import { FAQ } from '@/components/sections/FAQ'
import { DiscoveryForm } from '@/components/sections/DiscoveryForm'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Footer } from '@/components/sections/Footer'
import { CinematicEntrance } from '@/components/ui/CinematicEntrance'
import { SectionTransition } from '@/components/ui/SectionTransition'

export default function Home() {
  return (
    <CinematicEntrance>
      <div className="bg-bg-primary text-white min-h-screen">
        <Header />
        <Hero />
        <DepartmentTicker />
        <SectionTransition />
        <WhoItsFor />
        <SectionTransition />
        <CapabilityBreakdown />
        <SectionTransition />
        <LiveProof />
        <SectionTransition />
        <FAQ />
        <SectionTransition />
        <DiscoveryForm />
        <SectionTransition />
        <FinalCTA />
        <SectionTransition />
        <Footer />
      </div>
    </CinematicEntrance>
  )
}
