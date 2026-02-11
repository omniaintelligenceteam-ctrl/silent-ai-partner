'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-white">
              Silent AI Partner
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#how-it-works" 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link 
              href="#pricing" 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link 
              href="/demo" 
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Demo
            </Link>
          </nav>

          {/* Status Badge & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400">System Online</span>
            </div>
            
            <Link
              href="/demo"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
            >
              Try Sarah Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/50">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#how-it-works" 
                className="text-slate-300 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                className="text-slate-300 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/demo" 
                className="text-slate-300 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </Link>
              
              <div className="flex items-center space-x-2 text-xs font-mono pt-2 border-t border-slate-800/50">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400">System Online</span>
              </div>
              
              <Link
                href="/demo"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Try Sarah Free
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}