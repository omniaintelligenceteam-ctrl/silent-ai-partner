import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  title: "Silent AI Partner - AI Receptionist for Contractors",
  description: "AI that answers your phones, books your jobs, and runs 90% of your business. 24/7 call answering, appointment booking, and lead capture for plumbers, HVAC, electricians, and more service businesses.",
  keywords: "AI receptionist, contractor phone service, automated appointment booking, missed call solution, plumber answering service, HVAC phone service, electrician call service",
  openGraph: {
    title: "Silent AI Partner — The AI Office Manager Built for Contractors",
    description: "AI Receptionist & Office Manager for Contractors. Answers every call 24/7, books jobs, upsells services, and runs your office. Starting at $197/mo.",
    type: "website",
    url: "https://silentaipartner.com",
    images: [
      {
        url: "https://silentaipartner.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Silent AI Partner - AI Receptionist for Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silent AI Partner — The AI Office Manager Built for Contractors",
    description: "AI Receptionist & Office Manager for Contractors. Starting at $197/mo. Try the demo now.",
    images: ["https://silentaipartner.com/og-image.png"],
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
        {children}
      </body>
    </html>
  );
}
