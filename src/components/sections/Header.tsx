import { Phone } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white flex items-center gap-2.5">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="12" width="3" height="8" rx="1.5" fill="url(#logoGrad)" opacity="0.7" />
            <rect x="8" y="8" width="3" height="16" rx="1.5" fill="url(#logoGrad)" opacity="0.85" />
            <rect x="14" y="4" width="3" height="24" rx="1.5" fill="url(#logoGrad)" />
            <rect x="20" y="8" width="3" height="16" rx="1.5" fill="url(#logoGrad)" opacity="0.85" />
            <rect x="26" y="12" width="3" height="8" rx="1.5" fill="url(#logoGrad)" opacity="0.7" />
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          Silent <span className="gradient-text">AI</span> Partner
        </div>
        <a
          href="tel:+18667821303"
          className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-6 py-2.5 rounded-full font-semibold transition-all btn-glow text-sm inline-flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call Demo Line
        </a>
      </div>
    </header>
  )
}
