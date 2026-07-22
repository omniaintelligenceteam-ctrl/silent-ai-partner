'use client'

import Link from 'next/link'

export function Footer() {
  const navLinks = [
    { name: 'What It Does', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'What to Expect', href: '/pricing' },
    { name: 'Start Month 1', href: '/form' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]

  return (
    <footer className="bg-bg-secondary border-t border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-2">
              <span className="text-xl tracking-[0.1em] font-bold gradient-text-warm">OIOS</span>
            </Link>
            <p className="text-slate-600 text-xs font-mono mb-5">by Omnia Intelligence AI</p>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              We install AI Operating Systems for small businesses. Calls answered, admin handled, pipeline visible — 24/7.
            </p>
            <a
              href="mailto:team@getoios.com"
              className="text-amber-400 hover:text-amber-300 transition-colors duration-200 text-sm font-medium"
            >
              team@getoios.com
            </a>
            <br />
            <a
              href="tel:+14803050357"
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm mt-2 inline-block"
            >
              Talk to us: (480) 305-0357
            </a>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] mb-5">Navigate</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
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

          {/* Legal */}
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs">
              &copy; 2026 Omnia Intelligence AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
