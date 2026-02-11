import { Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-2 flex items-center gap-2.5">
              <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
                <rect x="2" y="12" width="3" height="8" rx="1.5" fill="url(#footerLogoGrad)" opacity="0.7" />
                <rect x="8" y="8" width="3" height="16" rx="1.5" fill="url(#footerLogoGrad)" opacity="0.85" />
                <rect x="14" y="4" width="3" height="24" rx="1.5" fill="url(#footerLogoGrad)" />
                <rect x="20" y="8" width="3" height="16" rx="1.5" fill="url(#footerLogoGrad)" opacity="0.85" />
                <rect x="26" y="12" width="3" height="8" rx="1.5" fill="url(#footerLogoGrad)" opacity="0.7" />
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              Silent <span className="gradient-text">AI</span> Partner
            </div>
            <p className="text-slate-500 text-sm">Your AI receptionist that never sleeps.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <a href="#pricing" className="hover:text-white transition-colors w-fit">Pricing</a>
            <a href="tel:+18667821303" className="hover:text-white transition-colors w-fit">Demo Line</a>
            <a href="mailto:hello@silentaipartner.com" className="hover:text-white transition-colors w-fit">Contact</a>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-sm text-slate-400">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              (866) 782-1303
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              hello@silentaipartner.com
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-slate-600 text-sm text-center">
          &copy; 2026 Silent AI Partner. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
