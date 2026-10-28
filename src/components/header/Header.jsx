'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/constants'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navLinks = NAV_LINKS

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8EAE5]/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(110,50,35,0.12)] border-b border-[#E8CEBF] py-3 md:py-3.5'
          : 'bg-[#F8EAE5] py-4 md:py-5 lg:py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto relative flex items-center justify-between gap-2.5">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col leading-none gap-[3px] no-underline group">
          <b className="font-['Merriweather',Georgia,serif] text-[18px] md:text-[24px] lg:text-[28px] leading-none text-[#141010] tracking-[-0.01em] font-semibold whitespace-nowrap transition-colors">
            Ashika Mehta’s
          </b>
          <i className="font-['Quicksand','DM_Sans',sans-serif] font-semibold text-[13px] md:text-[18px] lg:text-[19px] leading-none text-[#E04A33] not-italic tracking-[-0.01em]">
            mind realigned
          </i>
        </Link>

        {/* Desktop Navigation */}
        <nav 
          aria-label="Main" 
          className="hidden lg:flex items-center gap-[clamp(18px,2.7vw,40px)] text-[clamp(15px,1.36vw,18.5px)] whitespace-nowrap h-9 ml-[clamp(16px,4vw,64px)] mr-auto"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#141010] hover:text-[#B83A2A] transition-colors duration-150 font-medium no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <Link
            href="/#glimpse"
            className="inline-flex items-center justify-center h-9 px-4 lg:w-[101px] lg:px-0 rounded-full bg-[#B83A2A] hover:bg-[#8F2C1F] text-white text-[14px] lg:text-[16px] font-medium lg:font-normal whitespace-nowrap transition-all duration-200 shadow-sm"
          >
            Reach Out
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-7 h-7 border-0 bg-transparent text-[#141010] flex items-center justify-center p-0 cursor-pointer focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-[20px] py-2 px-5 shadow-[0_18px_40px_-12px_rgba(110,50,35,0.35)] flex flex-col z-50 border border-[#F1E4DD] animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="py-3.5 border-b border-[#F1E4DD] text-[#141010] hover:text-[#B83A2A] text-[17px] font-medium no-underline transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/coming-soon?page=Engagements"
              onClick={closeMenu}
              className="py-3.5 text-[#141010] hover:text-[#B83A2A] text-[17px] font-medium no-underline transition-colors"
            >
              Engagements
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
