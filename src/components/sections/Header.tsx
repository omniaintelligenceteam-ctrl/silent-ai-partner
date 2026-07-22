'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useCalPopup } from '@/components/ui/CalBooking'

const navLinks: { href: string; label: string; accent?: boolean }[] = [
  { href: '/features', label: 'What It Does' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'What to Expect' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showMobileCTA, setShowMobileCTA] = useState(false)
  const pathname = usePathname()
  const { openPopup: openCalPopup } = useCalPopup()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
      setShowMobileCTA(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-black/95 backdrop-blur-xl border-b border-slate-700/40 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2),0_1px_0_0_rgba(45,212,191,0.08)]'
        : 'bg-black border-b border-slate-800/30'
    }`}>
      <div className="max-w-7xl mx-auto pl-2 sm:pl-4 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 lg:space-x-4 group">
            <Image
              src="/LOGO OIOS.jpg"
              alt="OIOS — Omnia Intelligence"
              width={1024}
              height={1024}
              className="w-auto h-14 lg:h-[72px] object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-base lg:text-xl tracking-[0.25em] font-bold leading-none">
                <span className="text-teal-400 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.4)] transition-all duration-300">OIOS</span>
              </span>
              <span className="text-[10px] tracking-[0.15em] text-slate-500 font-medium mt-0.5">
                by Omnia Intelligence AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <MagneticButton key={link.href} strength={0.15}>
                  <Link
                    href={link.href}
                    className={`relative text-sm tracking-wide transition-colors duration-300 ${
                      link.accent
                        ? `${isActive ? 'text-teal-300' : 'text-teal-400 hover:text-teal-300'} font-medium`
                        : `${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`
                    }`}
                  >
                    {link.label}
                    {/* Animated underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-teal-400"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </MagneticButton>
              )
            })}
          </nav>

          {/* Status Badge & CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <MagneticButton>
              <button
                onClick={openCalPopup}
                data-cursor="cta"
                className="border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400/50 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book a Call
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/form"
                data-glow
                data-cursor="cta"
                className="bg-gradient-to-r from-amber-500 to-amber-400 text-white px-5 py-2 rounded-lg text-sm font-medium btn-glow hover:from-amber-600 hover:to-amber-500 transition-all duration-200 whitespace-nowrap shrink-0"
              >
                Start Month 1 →
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 -mr-1 text-slate-400 hover:text-white transition-colors"
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

        {/* Mobile Menu — Animated */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-6 border-t border-slate-800/30 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`transition-colors duration-200 text-sm ${
                        link.accent
                          ? 'text-teal-400 hover:text-teal-300 font-medium'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-4 border-t border-slate-800/30 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      openCalPopup()
                    }}
                    data-cursor="cta"
                    className="block w-full border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 px-4 py-3.5 rounded-lg text-sm font-bold transition-all duration-200 text-center cursor-pointer"
                  >
                    Book a Call
                  </button>
                  <Link
                    href="/form"
                    data-glow
                    data-cursor="cta"
                    className="block bg-gradient-to-r from-amber-500 to-amber-400 text-white px-4 py-3.5 rounded-lg text-sm font-bold btn-glow hover:from-amber-600 hover:to-amber-500 transition-all duration-200 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Month 1 →
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>

      {/* Sticky Mobile CTA Bar */}
      <AnimatePresence>
        {showMobileCTA && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-xl border-t border-slate-700/40"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <Link
                href="/form"
                data-glow
                data-cursor="cta"
                className="block w-full bg-gradient-to-r from-amber-500 to-amber-400 text-white px-5 py-3.5 rounded-lg text-sm font-bold btn-glow hover:from-amber-600 hover:to-amber-500 transition-all duration-200 text-center"
              >
                Start Month 1 →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
