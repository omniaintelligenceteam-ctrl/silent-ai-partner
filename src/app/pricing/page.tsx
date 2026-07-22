import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { PageHero } from '@/components/sections/PageHero'
import { WhatToExpect } from '@/components/sections/WhatToExpect'
import { FAQ } from '@/components/sections/FAQ'
import { BookDiscoveryCall } from '@/components/sections/BookDiscoveryCall'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Footer } from '@/components/sections/Footer'
import { PageEntrance } from '@/components/ui/PageEntrance'
import { SectionTransition } from '@/components/ui/SectionTransition'

export const metadata: Metadata = {
  title: 'What to Expect — OIOS | AI Operations for Small Businesses',
  description:
    'Three capability bands, every engagement custom-quoted. Month 1 installs your AI Operating System with your first build live by Day 7 — then one big build every month.',
  openGraph: {
    title: 'What to Expect — OIOS | AI Operations for Small Businesses',
    description:
      'Three capability bands, every engagement custom-quoted. Month 1 installs your AI Operating System with your first build live by Day 7 — then one big build every month.',
    url: 'https://getoios.com/pricing',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Pricing — OIOS | AI Operations for Small Businesses — OIOS by Omnia Intelligence AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What to Expect — OIOS | AI Operations for Small Businesses',
    description:
      'Three capability bands, every engagement custom-quoted. Month 1 installs your AI Operating System with your first build live by Day 7 — then one big build every month.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://getoios.com/pricing',
  },
}

export default function PricingPage() {
  return (
    <PageEntrance>
      <div className="bg-bg-primary text-white min-h-screen">
        <Header />
        <PageHero
          title="Custom-Built for Your Business"
          subtitle="Scope that fits, quoted against the hires you'll never make."
          badge="What to Expect"
        />
        <WhatToExpect />
        <SectionTransition />
        <FAQ />
        <SectionTransition />
        <BookDiscoveryCall />
        <SectionTransition />
        <FinalCTA />
        <SectionTransition />
        <Footer />
      </div>
    </PageEntrance>
  )
}
