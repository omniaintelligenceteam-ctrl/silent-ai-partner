import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";
import { PointerGlow } from "@/components/ui/pointer-glow";
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
  metadataBase: new URL('https://silentaipartner.com'),
  icons: {
    icon: '/logo-bolt.png',
    apple: '/logo-bolt.png',
  },
  title: "Silent AI Partner",
  description: "Workflow automation for contractors. We build systems that handle your calls, scheduling, follow-ups, and content — so your team can focus on growth. Free workflow audit.",
  keywords: "workflow automation, contractor automation, AI for contractors, automated scheduling, call answering service, contractor office manager, plumber automation, HVAC automation, electrician automation",
  openGraph: {
    title: "Stop Drowning in Busywork",
    description: "Workflow automation for contractors — calls, scheduling, follow-ups, content. Free audit.",
    type: "website",
    url: "https://silentaipartner.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Drowning in Busywork",
    description: "Workflow automation for contractors — calls, scheduling, follow-ups, content. Free audit.",
  },
  robots: "index, follow",
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
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        <ScrollProgress />
        <MouseSpotlight />
        <PointerGlow />
        {children}
      </body>
    </html>
  );
}
