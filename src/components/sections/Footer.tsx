'use client'

import Link from 'next/link'

export function Footer() {
  const productLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Demo', href: '/demo' },
  ]

  const industryLinks = [
    { name: 'Plumbing', href: '/plumbing' },
    { name: 'HVAC', href: '/hvac' },
    { name: 'Electrical', href: '/electrical' },
    { name: 'Landscape Lighting', href: '/landscape-lighting' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]

  return (
    <footer className="bg-bg-secondary border-t border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <span className="text-lg tracking-[0.15em] font-semibold">
                <span className="text-white">SILENT</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 font-bold">AI</span>{' '}
                <span className="text-white">PARTNER</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              The AI office manager built for contractors. Never miss another lead.
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400/70 font-mono">Operational</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-5">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative text-slate-400 hover:text-white transition-colors duration-200 text-sm link-animate"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-5">Industries</h3>
            <ul className="space-y-3">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative text-slate-400 hover:text-white transition-colors duration-200 text-sm link-animate"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-5">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative text-slate-400 hover:text-white transition-colors duration-200 text-sm link-animate"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-3">Contact</h4>
              <a
                href="mailto:team@silentaipartner.com"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-200 text-sm font-medium"
              >
                team@silentaipartner.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs">
              &copy; 2026 Silent AI Partner. Built for the trades.
            </p>

            {/* Performance Stats */}
            <div className="flex items-center space-x-6 text-[10px] font-mono text-slate-600">
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full"></div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-orange-400/60 rounded-full"></div>
                <span>&lt;1s Response</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-blue-400/60 rounded-full"></div>
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
