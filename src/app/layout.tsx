import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silent AI Partner - AI Receptionist for Contractors",
  description: "AI that answers your phones, books your jobs, and runs 90% of your business. 24/7 call answering, appointment booking, and lead capture for plumbers, HVAC, electricians, and more service businesses.",
  keywords: "AI receptionist, contractor phone service, automated appointment booking, missed call solution, plumber answering service, HVAC phone service, electrician call service",
  openGraph: {
    title: "Silent AI Partner - Your AI Receptionist That Never Sleeps",
    description: "AI that answers your phones, books your jobs, and runs 90% of your business. Demo line: (866) 782-1303",
    type: "website",
    url: "https://silentaipartner.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silent AI Partner - AI Receptionist for Contractors",
    description: "Never miss another call. AI that books jobs 24/7. Call our demo: (866) 782-1303",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
