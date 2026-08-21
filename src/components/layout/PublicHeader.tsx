'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Glasses, Menu, X, ArrowRight, Phone, MapPin } from 'lucide-react'

type PublicHeaderProps = {
  navLabels: {
    home: string
    catalogue: string
    about: string
    contact: string
  }
}

export function PublicHeader({ navLabels }: PublicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-[#1c1917] text-stone-300 text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <span className="whitespace-nowrap">✨ <strong>Livraison offerte</strong> dès 800 DH au Maroc</span>
          <span className="hidden sm:inline text-stone-600">•</span>
          <span className="hidden sm:inline whitespace-nowrap">🛡️ Prise en charge AMO &amp; Mutuelles</span>
          <span className="hidden lg:inline text-stone-600">•</span>
          <span className="hidden lg:inline whitespace-nowrap">📞 05 22 20 40 60</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        aria-label="Navigation principale"
        className="w-full bg-[#fcfbf9]/95 backdrop-blur-md border-b border-stone-200/70 transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus:ring-2 focus:ring-stone-900 focus:outline-none rounded-lg p-1 shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-900 flex items-center justify-center text-stone-50 shadow-xs group-hover:bg-stone-800 transition-colors shrink-0">
                <Glasses className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg lg:text-xl text-stone-900 tracking-wider leading-none whitespace-nowrap">
                  MAISON D&apos;OPTIQUE
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#8c6b38] mt-0.5 whitespace-nowrap">
                  Casablanca • Haute Lunetterie
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Visible on lg: 1024px+) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-medium uppercase tracking-widest text-stone-600 shrink-0">
              <Link
                href="/"
                className="hover:text-stone-900 transition-colors duration-150 py-1 whitespace-nowrap"
              >
                {navLabels.home}
              </Link>
              <Link
                href="/catalogue"
                className="hover:text-stone-900 transition-colors duration-150 py-1 flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{navLabels.catalogue}</span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full bg-[#f5efe4] text-[#8c6b38] border border-[#e5dac6]">
                  500+
                </span>
              </Link>
              <Link
                href="/about"
                className="hover:text-stone-900 transition-colors duration-150 py-1 whitespace-nowrap"
              >
                {navLabels.about}
              </Link>
              <Link
                href="/contact"
                className="hover:text-stone-900 transition-colors duration-150 py-1 whitespace-nowrap"
              >
                {navLabels.contact}
              </Link>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-2xs transition-all duration-150 focus:ring-2 focus:ring-stone-900 focus:outline-none whitespace-nowrap cursor-pointer"
              >
                <span>Catalogue</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Link>

              {/* Tablet & Mobile menu button (Visible below lg: 1024px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-xl text-stone-700 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/80 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors cursor-pointer shrink-0"
                aria-label="Ouvrir le menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tablet & Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200/80 bg-[#fcfbf9] px-4 sm:px-6 pt-4 pb-6 space-y-3 shadow-xl transition-all animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-stone-900 hover:bg-stone-100 transition-colors"
              >
                {navLabels.home}
              </Link>
              <Link
                href="/catalogue"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <span>{navLabels.catalogue}</span>
                <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-[#f5efe4] text-[#8c6b38] border border-[#e5dac6]">
                  500+ modèles
                </span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-stone-900 hover:bg-stone-100 transition-colors"
              >
                {navLabels.about}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-stone-900 hover:bg-stone-100 transition-colors"
              >
                {navLabels.contact}
              </Link>
            </div>

            {/* Quick Contact Info inside Drawer */}
            <div className="pt-3 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 px-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8c6b38]" />
                <span>05 22 20 40 60</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8c6b38]" />
                <span>Bd d&apos;Anfa, Casablanca</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
