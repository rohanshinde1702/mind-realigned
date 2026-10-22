'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { scrollToTop } from '@/utils'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility()

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleScrollToTop = () => {
    scrollToTop('smooth')
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#141010] hover:bg-[#B83A2A] text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(110,50,35,0.4)] border border-white/20 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B83A2A] focus:ring-offset-2 hover:-translate-y-1 active:translate-y-0 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-75'
      }`}
    >
      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
    </button>
  )
}

export default ScrollToTop
