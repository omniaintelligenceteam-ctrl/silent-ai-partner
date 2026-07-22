import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { PageHero } from '@/components/sections/PageHero'
import { ThreePillars } from '@/components/sections/ThreePillars'
import { DailySchedule } from '@/components/sections/DailySchedule'
import { NotGetting } from '@/components/sections/NotGetting'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Footer } from '@/components/sections/Footer'
import { PageEntrance } from '@/components/ui/PageEntrance'
import { SectionTransition } from '@/components/ui/SectionTransition'

export const metadata: Metadata = {
  title: 'What OIOS Does — AI Operations for Small Businesses',
  description:
    'Discover the three pillars of OIOS: AI-powered voice, scheduling, and follow-up systems that keep your small business running around the clock.',
  openGraph: {
    title: 'What OIOS Does — AI Operations for Small Businesses',
    description:
      'Discover the three pillars of OIOS: AI-powered voice, scheduling, and follow-up systems that keep your small business running around the clock.',
    url: 'https://getoios.com/features',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'What OIOS Does — AI Operations for Small Businesses — OIOS by Omnia Intelligence AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What OIOS Does — AI Operations for Small Businesses',
    description:
      'Discover the three pillars of OIOS: AI-powered voice, scheduling, and follow-up systems that keep your small business running around the clock.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://getoios.com/features',
  },
}

export default function FeaturesPage() {
  return (
    <PageEntrance>
      <div className="bg-bg-primary text-white min-h-screen">
        <Header />
        <PageHero
          title="What OIOS Does"
          subtitle="Three systems. One partner. Zero missed calls."
          badge="Features"
        />
        <SectionTransition />
        <ThreePillars />
        <SectionTransition />
        <DailySchedule />
        <SectionTransition />
        <NotGetting />
        <SectionTransition />
        <FinalCTA />
        <SectionTransition />
        <Footer />
      </div>
    </PageEntrance>
  )
}
