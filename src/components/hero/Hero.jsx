'use client'

import { useState, useEffect, useRef } from 'react'
import { HERO_SLIDES } from '@/data'

const slidesData = HERO_SLIDES

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length)
    }, 3000)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleChipClick = (index) => {
    setCurrentSlide(index)
    startTimer()
  }

  return (
    <section className="container mx-auto pt-[30px] pb-10 md:pb-[78px] flex flex-col lg:flex-row lg:items-start lg:gap-12">
      {/* Left Copy */}
      <div className="flex flex-col min-w-0 lg:flex-[9_0_440px]">
        <span className="text-[14px] tracking-[0.08em] font-semibold text-[#F29A7E] uppercase leading-none">
          20 years in therapy
        </span>
        <h1 className="mt-3.5 font-['Merriweather',Georgia,serif] text-[clamp(32px,8.6vw,56px)] leading-[1.25] tracking-[0.5px] font-black text-[#111]">
          Understand<br />your patterns.<br />Live Better.
        </h1>
        <p className="mt-[22px] text-[15px] leading-[22px] tracking-[-0.005em] text-[#8A736D]">
          <b className="text-[#7A625C] font-bold">Modern life can be overwhelming.</b> Learn from science-backed, self-paced video courses that teach real-life emotional skills to help you feel calmer, think clearer, and build real confidence.
        </p>
        <div className="flex flex-row items-center gap-[10px] mt-[26px] flex-nowrap">
          {/* <a
            href="#courses"
            className="inline-flex items-center justify-center text-center text-xs md:text-sm py-1 px-3 md:py-2 md:px-5 rounded-full bg-[#B83A2A] hover:bg-[#8F2C1F] text-white font-bold no-underline transition-colors duration-200 shadow-sm"
          >
            Explore Courses
          </a> */}
          <a
            href="#glimpse"
            className="text-[#241C1A] hover:text-[#B83A2A] font-bold text-xs md:text-sm py-1 px-3 md:py-2 md:px-5 underline underline-offset-[3px] py-2.5 transition-colors"
          >
            Book Consultation
          </a>
        </div>
      </div>

      {/* Right Slideshow Visual */}
      <div className="mt-8 lg:mt-[5px] min-w-0 lg:flex-[20_1_340px] w-full">
        {/* Slides Box */}
        <div className="relative aspect-[540/344] rounded-[28px] overflow-hidden isolate shadow-lg bg-[#F8EAE5]">
          {slidesData.map((slide, index) => (
            <div
              key={slide.label}
              role="img"
              aria-label={slide.alt}
              style={{ backgroundImage: `url(${slide.image})` }}
              className={`absolute inset-0 bg-cover bg-center rounded-[28px] transition-opacity duration-900 ease-in-out ${
                currentSlide === index
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          ))}
        </div>

        {/* Chips Pagination */}
        <div className="flex gap-1.5 mt-3.5 md:mt-[26px] md:ml-[7px]">
          {slidesData.map((slide, index) => {
            const isActive = currentSlide === index
            return (
              <button
                key={slide.label}
                type="button"
                onClick={() => handleChipClick(index)}
                aria-pressed={isActive}
                className={`flex-1 md:flex-none md:w-[74px] h-[30px] md:h-[26px] px-0.5 rounded-full text-[11px] leading-none whitespace-nowrap cursor-pointer transition-all duration-200 border font-medium ${
                  isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-[#141010] border-[#E9DCD6] hover:border-[#141010]'
                }`}
              >
                {slide.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Hero
