'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const industries = [
  { name: 'Plumbing', href: '/plumbing', emoji: '🔧' },
  { name: 'HVAC', href: '/hvac', emoji: '❄️' },
  { name: 'Landscape Lighting', href: '/landscape-lighting', emoji: '💡' },
  { name: 'Electrical', href: '/electrical', emoji: '⚡' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDemoDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 lg:space-x-4 group">
            <Image 
              src="/logo.png" 
              alt="Silent AI Partner" 
              width={160} 
              height={160} 
              className="w-10 h-10 lg:w-14 lg:h-14 object-contain"
              priority
            />
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

            {/* Industries Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors duration-200"
              >
                <span>Industries</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${demoDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {demoDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl glass border border-slate-700/50 shadow-2xl shadow-black/50 overflow-hidden">
                  <div className="py-2">
                    {industries.map((industry) => (
                      <Link
                        key={industry.href}
                        href={industry.href}
                        className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-orange-500/10 transition-all duration-150"
                        onClick={() => setDemoDropdownOpen(false)}
                      >
                        <span className="text-lg">{industry.emoji}</span>
                        <span className="font-medium">{industry.name}</span>
                      </Link>
                    ))}
                    <div className="border-t border-slate-700/50 mt-1 pt-1">
                      <Link
                        href="/demo"
                        className="flex items-center space-x-3 px-4 py-3 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all duration-150"
                        onClick={() => setDemoDropdownOpen(false)}
                      >
                        <span className="text-lg">🎙️</span>
                        <span className="font-medium">General Demo</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Status Badge & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400">System Online</span>
            </div>
            
            <Link
              href="/demo"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-lg font-medium btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
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
              
              {/* Mobile Industries */}
              <div className="border-t border-slate-800/50 pt-3">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Industries</span>
                <div className="mt-2 space-y-2">
                  {industries.map((industry) => (
                    <Link
                      key={industry.href}
                      href={industry.href}
                      className="flex items-center space-x-3 py-2 text-slate-300 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{industry.emoji}</span>
                      <span>{industry.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/demo" 
                className="text-slate-300 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                General Demo
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