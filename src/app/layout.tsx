import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollRevealInit } from "@/components/ui/ScrollRevealInit";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://getoios.com'),
  verification: {
    google: 'opWpVmIdfuvdOo0-FtRN0Uad-wFNI7IKtx',
  },
  icons: {
    icon: '/LOGO OIOS.jpg',
    apple: '/apple-touch-icon.png',
  },
  title: {
    default: "OIOS — We install AI Operating Systems for small businesses | Omnia Intelligence AI",
    template: "%s | OIOS by Omnia Intelligence AI",
  },
  description: "We build the software you need, run the operations you can't afford to hire for, and ship something new every 30 days. Calls answered, admin handled, pipeline visible — 24/7.",
  keywords: "AI operations, AI for small businesses, AI receptionist, AI back office, business automation, OIOS, Omnia Intelligence AI, AI office manager, small business AI",
  openGraph: {
    title: "OIOS — We install AI Operating Systems for small businesses",
    description: "We install your AI Operating System, ship your first build live by Day 7, then keep shipping every month. Calls answered, admin handled, pipeline visible — 24/7.",
    type: "website",
    url: "https://getoios.com",
    siteName: "OIOS by Omnia Intelligence AI",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OIOS — AI Operating Systems for small businesses, installed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OIOS — We install AI Operating Systems for small businesses",
    description: "We install your AI Operating System, ship your first build live by Day 7, then keep shipping every month. Calls answered, admin handled, pipeline visible — 24/7.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://getoios.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://getoios.com/#organization",
    "name": "Omnia Intelligence AI",
    "alternateName": "OIOS",
    "url": "https://getoios.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://getoios.com/LOGO%20OIOS.jpg",
      "width": 512,
      "height": 512,
    },
    "description": "OIOS is an AI-powered operations platform for small businesses. It answers calls 24/7, automates back office workflows, and provides real-time visibility into leads, jobs, and revenue.",
    "email": "team@getoios.com",
    "telephone": "+1-480-305-0357",
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+1-480-305-0357",
      "email": "team@getoios.com",
      "contactType": "sales",
      "availableLanguage": "English",
    }],
    "areaServed": { "@type": "Country", "name": "United States" },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://getoios.com/#website",
    "name": "OIOS",
    "alternateName": "OIOS by Omnia Intelligence AI",
    "url": "https://getoios.com",
    "publisher": { "@id": "https://getoios.com/#organization" },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://getoios.com/#service",
    "name": "OIOS",
    "alternateName": "OIOS AI Operating System",
    "description": "AI-first operations partner for small businesses on a monthly retainer. OIOS installs a custom AI Operating System, runs phones, scheduling, follow-ups, invoicing, and reporting 24/7, and ships a new custom build every month.",
    "url": "https://getoios.com",
    "provider": { "@id": "https://getoios.com/#organization" },
    "areaServed": { "@type": "Country", "name": "United States" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "OIOS capabilities",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 AI call answering and lead capture" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Appointment scheduling and reminders" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Follow-up and pipeline automation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Invoicing and cash-flow reporting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom software builds shipped monthly" } },
      ],
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema, serviceSchema]),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        <ScrollProgress />
        <MouseSpotlight />
        <PointerGlow />
        <CustomCursor />
        <ScrollRevealInit />
        <SmoothScroll>
          <MotionProvider>
            {children}
          </MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
