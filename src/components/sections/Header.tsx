'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'

const industries = [
  { name: 'Plumbing', href: '/plumbing', emoji: '🔧' },
  { name: 'HVAC', href: '/hvac', emoji: '❄️' },
  { name: 'Landscape Lighting', href: '/landscape-lighting', emoji: '💡' },
  { name: 'Electrical', href: '/electrical', emoji: '⚡' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDemoDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'glass border-b border-slate-800/50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2),0_1px_0_0_rgba(249,115,22,0.1)]'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 lg:space-x-4 group">
            <Image
              src="/logo-bolt.png"
              alt="Silent AI Partner"
              width={300}
              height={470}
              className="w-auto h-10 lg:h-14 object-contain"
              priority
            />
            <span className="text-base lg:text-xl tracking-[0.2em] font-semibold whitespace-nowrap">
              <span className="text-white">SILENT</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 font-bold">AI</span>{' '}
              <span className="text-white">PARTNER</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#how-it-works"
              className="text-slate-400 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-slate-400 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              Pricing
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors duration-300 text-sm tracking-wide"
              >
                <span>Industries</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${demoDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {demoDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl glass border border-slate-700/30 shadow-2xl shadow-black/50 overflow-hidden">
                  <div className="py-2">
                    {industries.map((industry) => (
                      <Link
                        key={industry.href}
                        href={industry.href}
                        className="flex items-center space-x-3 px-5 py-3 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                        onClick={() => setDemoDropdownOpen(false)}
                      >
                        <span className="text-lg">{industry.emoji}</span>
                        <span className="text-sm font-medium">{industry.name}</span>
                      </Link>
                    ))}
                    <div className="border-t border-slate-700/30 mt-1 pt-1">
                      <Link
                        href="/demo"
                        className="flex items-center space-x-3 px-5 py-3 text-orange-400 hover:text-orange-300 hover:bg-orange-500/5 transition-all duration-200"
                        onClick={() => setDemoDropdownOpen(false)}
                      >
                        <span className="text-lg">🎙️</span>
                        <span className="text-sm font-medium">General Demo</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Status Badge & CTA */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400/80">Online</span>
            </div>

            <MagneticButton>
              <Link
                href="/demo"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 rounded-lg text-sm font-medium btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
              >
                Try Sarah Free
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-800/30">
            <nav className="flex flex-col space-y-4">
              <Link href="#how-it-works" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>

              <div className="border-t border-slate-800/30 pt-4">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.15em]">Industries</span>
                <div className="mt-3 space-y-2">
                  {industries.map((industry) => (
                    <Link
                      key={industry.href}
                      href={industry.href}
                      className="flex items-center space-x-3 py-2 text-slate-400 hover:text-white transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{industry.emoji}</span>
                      <span>{industry.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/demo" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm" onClick={() => setMobileMenuOpen(false)}>
                General Demo
              </Link>

              <div className="pt-4 border-t border-slate-800/30">
                <Link
                  href="/demo"
                  className="block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium btn-glow hover:from-orange-600 hover:to-amber-600 transition-all duration-200 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Try Sarah Free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
