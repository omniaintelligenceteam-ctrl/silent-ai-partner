"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

// ---------- Inline Button ----------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", className = "", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080F] disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
      default:
        "bg-white text-[#06080F] hover:bg-gray-100 active:scale-[0.97]",
      secondary:
        "bg-slate-800 text-white hover:bg-slate-700 active:scale-[0.97]",
      ghost:
        "hover:bg-slate-800/50 text-slate-300 hover:text-white active:scale-[0.97]",
      gradient:
        "bg-gradient-to-b from-orange-500 via-orange-500/95 to-orange-600 text-white hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(249,115,22,0.25)] hover:shadow-[0_0_32px_rgba(249,115,22,0.4)]",
    };

    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base font-semibold",
    };

    return (
      <button
        ref={ref}
        data-glow
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        style={{ transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease" }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "SaaSButton";

// ---------- Navigation links ----------
const industries = [
  { name: "Plumbing", href: "/plumbing" },
  { name: "HVAC", href: "/hvac" },
  { name: "Electrical", href: "/electrical" },
  { name: "Landscape Lighting", href: "/landscape-lighting" },
  { name: "Locksmith", href: "/locksmith" },
  { name: "Pest Control", href: "/pest-control" },
];

// ---------- Navigation ----------
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-[#06080F]/95 backdrop-blur-xl border-slate-700/40 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2),0_1px_0_0_rgba(249,115,22,0.1)]"
          : "bg-[#06080F] border-slate-800/30"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo-bolt.png"
              alt="Silent AI Partner"
              width={2048}
              height={1842}
              className="w-auto h-12 lg:h-14 object-contain"
              priority
            />
            <span className="text-base lg:text-lg tracking-[0.15em] font-semibold whitespace-nowrap">
              <span className="text-white">SILENT</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300 font-bold">
                AI
              </span>{" "}
              <span className="text-white">PARTNER</span>
            </span>
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="#workflows"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-300 tracking-wide"
            >
              What We Do
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-300 tracking-wide"
            >
              The Audit
            </Link>
            <Link
              href="#demo"
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors duration-300 tracking-wide font-medium"
            >
              Live Demo
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono mr-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400/80">Online</span>
            </div>
            <Button type="button" variant="ghost" size="sm">
              <a href="mailto:team@silentaipartner.com">Contact</a>
            </Button>
            <Link href="#audit-form">
              <Button type="button" variant="gradient" size="sm">
                Book My Free Audit
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            data-glow
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06080F]/95 backdrop-blur-xl border-t border-slate-800/30 animate-[slideDown_0.3s_ease-out]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              href="#workflows"
              className="text-sm text-slate-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              What We Do
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-slate-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              The Audit
            </Link>
            <Link
              href="#demo"
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live Demo
            </Link>

            <div className="border-t border-slate-800/30 pt-4">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.15em]">
                Industries
              </span>
              <div className="mt-3 space-y-2">
                {industries.map((ind) => (
                  <Link
                    key={ind.href}
                    href={ind.href}
                    className="block text-sm text-slate-400 hover:text-white transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-slate-800/30">
              <a
                href="mailto:team@silentaipartner.com"
                className="text-sm text-slate-400 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
              <Link href="#audit-form" onClick={() => setMobileMenuOpen(false)}>
                <Button type="button" variant="gradient" size="sm" className="w-full">
                  Book My Free Audit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// ---------- Hero ----------
const Hero = React.memo(() => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24"
      style={{ animation: "fadeIn 0.6s ease-out" }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(249,115,22,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Orbs */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: -250,
            right: -150,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: -200,
            left: -150,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Badge */}
      <aside className="relative z-10 mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-slate-700/40 bg-slate-800/30 backdrop-blur-sm max-w-full">
        <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400">
          Free AI Workflow Audit for Contractors
        </span>
        <Link
          href="#audit-form"
          className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.12em] text-orange-400 hover:text-orange-300 transition-colors active:scale-95"
          aria-label="Start your free audit"
        >
          Start now
          <ArrowRight size={12} />
        </Link>
      </aside>

      {/* Headline */}
      <h1
        className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl px-6 leading-[1.1] mb-6"
        style={{
          fontFamily: "var(--font-display), sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        <span
          style={{
            background:
              "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255,255,255,0.6))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Give Your Team the Tools to
        </span>
        <br />
        <span className="gradient-text">Optimize Your Company</span>
      </h1>

      {/* Subheadline */}
      <p className="relative z-10 text-sm md:text-base text-slate-400 text-center max-w-2xl px-6 mb-10 leading-relaxed">
        Every contractor has the same leaks: missed calls, slow follow-ups,
        forgotten reviews. We build automated workflows that handle the
        repetitive stuff — so your team can focus on growing the business.
      </p>

      {/* CTA */}
      <div className="relative z-10 flex items-center gap-4 mb-16">
        <Link href="#audit-form">
          <Button
            type="button"
            variant="gradient"
            size="lg"
            className="rounded-lg"
            aria-label="Book your free workflow audit"
          >
            Book My Free Audit
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {/* Dashboard Preview */}
      <div className="relative z-10 w-full max-w-5xl pb-20">
        {/* Glow behind image */}
        <div
          className="absolute left-1/2 w-[90%] pointer-events-none z-0"
          style={{ top: "-20%", transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          <div
            className="w-full aspect-[16/9]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(249,115,22,0.18) 0%, rgba(251,146,60,0.08) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Image */}
        <div className="relative z-10 overflow-hidden rounded-xl border border-slate-700/30 shadow-2xl shadow-black/60">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
            alt="Analytics dashboard showing workflow automation metrics"
            width={1200}
            height={675}
            className="w-full h-auto"
            priority
          />
          {/* Gradient overlay for depth */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#06080F]/60 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

// ---------- Main Export ----------
export default function SaaSTemplate() {
  return (
    <main className="min-h-screen bg-[#06080F] text-white">
      <Navigation />
      <Hero />
    </main>
  );
}
