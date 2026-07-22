import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { PageHero } from '@/components/sections/PageHero'
import { HowItWorksNew } from '@/components/sections/HowItWorksNew'
import { TrustSignals } from '@/components/sections/TrustSignals'
import { LiveProof } from '@/components/sections/LiveProof'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Footer } from '@/components/sections/Footer'
import { PageEntrance } from '@/components/ui/PageEntrance'
import { SectionTransition } from '@/components/ui/SectionTransition'

export const metadata: Metadata = {
  title: 'How OIOS Works — Build, Run, Ship',
  description:
    'Month 1: we install your AI Operating System and ship your first build live by Day 7. Then one meeting a month, one big build, and everything running 24/7.',
  openGraph: {
    title: 'How OIOS Works — Build, Run, Ship',
    description:
      'Month 1: we install your AI Operating System and ship your first build live by Day 7. Then one meeting a month, one big build, and everything running 24/7.',
    url: 'https://getoios.com/how-it-works',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'How OIOS Works — Audit, Build, Run — OIOS by Omnia Intelligence AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How OIOS Works — Build, Run, Ship',
    description:
      'Month 1: we install your AI Operating System and ship your first build live by Day 7. Then one meeting a month, one big build, and everything running 24/7.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://getoios.com/how-it-works',
  },
}

export default function HowItWorksPage() {
  return (
    <PageEntrance>
      <div className="bg-bg-primary text-white min-h-screen">
        <Header />
        <PageHero
          title="How It Works"
          subtitle="Build. Run. Ship. One meeting a month, one big build, everything running 24/7."
          badge="Process"
        />
        <SectionTransition />
        <HowItWorksNew />
        <SectionTransition />
        <TrustSignals />
        <SectionTransition />
        <LiveProof />
        <SectionTransition />
        <FinalCTA />
        <SectionTransition />
        <Footer />
      </div>
    </PageEntrance>
  )
}
