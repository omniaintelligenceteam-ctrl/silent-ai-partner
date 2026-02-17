'use client'

import Link from 'next/link'

export function Footer() {
  const productLinks = [
    { name: 'What We Do', href: '#workflows' },
    { name: 'The Audit', href: '#audit-form' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300 font-bold">AI</span>{' '}
                <span className="text-white">PARTNER</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              AI consulting for contractors. Not everyone needs AI — but everyone should know what&apos;s possible.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/silent-ai-partner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-5">Navigate</h3>
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
          </div>
        </div>
      </div>
    </footer>
  )
}
