'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react'

function ComingSoonContent() {
  const searchParams = useSearchParams()
  const pageTitle = searchParams.get('page') || searchParams.get('title') || 'Content'

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-5 py-20 md:py-28">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5DDD3] border border-[#E9C8BB] text-[#B83A2A] text-xs font-semibold tracking-wider uppercase mb-7 shadow-xs">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Mind Realigned • In The Works</span>
      </div>

      {/* Main Heading */}
      <h1 className="font-['Merriweather',Georgia,serif] text-[34px] sm:text-[48px] md:text-[58px] font-black text-[#141010] leading-[1.12] tracking-[-0.01em] max-w-2xl">
        {pageTitle} is Coming Soon
      </h1>

      {/* Subtitle / Description */}
      <p className="mt-5 text-[17px] md:text-[19px] text-[#5A4B46] max-w-xl leading-[1.6]">
        We are crafting this space with care and thoughtful intention. Full resources, guided essays, and conversations will be available shortly.
      </p>

      {/* Call to Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#B83A2A] hover:bg-[#8F2C1F] text-white font-medium text-[15px] transition-colors shadow-sm w-full sm:w-auto no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <Link
          href="/#glimpse"
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white hover:bg-[#F9EDE7] text-[#141010] border border-[#D9A99A] font-medium text-[15px] transition-colors shadow-xs w-full sm:w-auto no-underline"
        >
          <BookOpen className="w-4 h-4 text-[#B83A2A]" />
          <span>Get Free Lesson</span>
        </Link>
      </div>

      {/* Reassurance note */}
      <p className="mt-12 text-xs md:text-sm text-[#8A6B66] leading-relaxed max-w-md">
        Have a question or looking to connect? You can reach Ashika directly via the inquiry form on our homepage.
      </p>
    </div>
  )
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2A211E] flex flex-col justify-between font-['DM_Sans',system-ui,sans-serif]">
      {/* Site Header */}
      <Header />

      {/* Main Coming Soon Area */}
      <main className="flex-1 flex items-center justify-center [background:radial-gradient(ellipse_90%_70%_at_40%_30%,#F8E7E0_0%,#F5DDD3_55%,#F1D2C6_100%)]">
        <Suspense fallback={<div className="py-24 text-center text-[#8A6B66]">Loading...</div>}>
          <ComingSoonContent />
        </Suspense>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  )
}
