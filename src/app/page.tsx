import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { ProblemStats } from '@/components/sections/ProblemStats'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { Demo } from '@/components/sections/Demo'
import { Pricing } from '@/components/sections/Pricing'
import { Industries } from '@/components/sections/Industries'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="bg-bg-primary text-white min-h-screen">
      <Header />
      <Hero />
      <ProblemStats />
      <HowItWorks />
      <Features />
      <Demo />
      <Pricing />
      <Industries />
      <Testimonials />
      <FAQ />
      <FooterCTA />
      <Footer />
    </div>
  )
}
