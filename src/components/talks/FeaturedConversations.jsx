'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { PODCASTS_DATA } from '@/data'

const podcasts = PODCASTS_DATA

const ease = 'cubic-bezier(.3,1.2,.45,1)'

// Desktop slots mapping for 6 cards
const slotsD = {
  0: { left: 233, top: 0, w: 214, h: 380, r: 28, op: 1, z: 20, fs: 20, ft: 18, sh: '0 26px 50px -12px rgba(110,50,35,.38), 0 8px 18px rgba(110,50,35,.14)' },
  1: { left: 491, top: 22, w: 189, h: 335, r: 25, op: 1, z: 10, fs: 17, ft: 16, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  5: { left: 0, top: 22, w: 189, h: 335, r: 25, op: 1, z: 10, fs: 17, ft: 16, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  4: { left: -233, top: 22, w: 189, h: 335, r: 25, op: 0, z: 0, fs: 17, ft: 16, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  2: { left: 724, top: 22, w: 189, h: 335, r: 25, op: 0, z: 0, fs: 17, ft: 16, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  3: { left: 957, top: 22, w: 189, h: 335, r: 25, op: 0, z: 0, fs: 17, ft: 16, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
}

// Mobile slots mapping
const slotsM = {
  0: { left: 'calc(50% - 96px)', top: 0, w: 193, h: 342, r: 26, op: 1, z: 20, fs: 20, ft: 15, sh: '0 26px 50px -12px rgba(110,50,35,.38), 0 8px 18px rgba(110,50,35,.14)' },
  1: { left: 'calc(50% + 116px)', top: 20, w: 170, h: 301, r: 23, op: 1, z: 10, fs: 17, ft: 14, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  5: { left: 'calc(50% - 286px)', top: 20, w: 170, h: 301, r: 23, op: 1, z: 10, fs: 17, ft: 14, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  4: { left: 'calc(50% - 506px)', top: 20, w: 170, h: 301, r: 23, op: 0, z: 0, fs: 17, ft: 14, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  2: { left: 'calc(50% + 326px)', top: 20, w: 170, h: 301, r: 23, op: 0, z: 0, fs: 17, ft: 14, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
  3: { left: 'calc(50% + 536px)', top: 20, w: 170, h: 301, r: 23, op: 0, z: 0, fs: 17, ft: 14, sh: '0 12px 26px -8px rgba(110,50,35,.22)' },
}

const FeaturedConversations = () => {
  const [activeCenter, setActiveCenter] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(null)
  const timerRef = useRef(null)

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveCenter((prev) => (prev + 1) % podcasts.length)
    }, 5500)
  }

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleNext = () => {
    setActiveCenter((prev) => (prev + 1) % podcasts.length)
    resetTimer()
  }

  const handlePrev = () => {
    setActiveCenter((prev) => (prev - 1 + podcasts.length) % podcasts.length)
    resetTimer()
  }

  const handleCardClick = (k, e) => {
    const diff = ((k - activeCenter) % 6 + 6) % 6
    if (isDragging) {
      e.preventDefault()
      return
    }
    if (diff !== 0) {
      e.preventDefault()
      setActiveCenter(k)
      resetTimer()
    }
  }

  // Pointer drag for swipe
  const handlePointerDown = (e) => {
    startXRef.current = e.clientX
  }

  const handlePointerUp = (e) => {
    if (startXRef.current === null) return
    const dx = e.clientX - startXRef.current
    startXRef.current = null
    if (Math.abs(dx) > 35) {
      setIsDragging(true)
      setTimeout(() => setIsDragging(false), 300)
      if (dx < 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  return (
    <section
      id="talks"
      className="pt-[22px] min-[1200px]:pt-3.5 pb-0 min-[1200px]:pb-12 overflow-x-clip bg-white min-[1200px]:[background:linear-gradient(180deg,#fff_0,#fff_327px,#F5E4DE_327px,#EAC6B8_100%)]"
    >
      <div className="container mx-auto flex flex-col items-center">
        <span className="text-[14px] tracking-[0.08em] font-semibold text-[#F29A7E] uppercase leading-none">
          Featured
        </span>
        <h2 className="mt-3.5 font-['Merriweather',Georgia,serif] font-black text-[#111] text-[clamp(28px,5.2vw,56px)] min-[1200px]:text-[65px] leading-[1.05] tracking-[-0.012em] text-center">
          Conversations
        </h2>
        <p className="mt-5 font-bold text-[#8A6B66] text-center text-[14px] leading-[21px]">
          Clips from featured podcasts
        </p>

        {/* Desktop 3D Layered Carousel */}
        <div className="hidden min-[1200px]:block relative w-[680px] max-w-full h-[380px] mx-auto mt-[38px]">
        {podcasts.map((pod, k) => {
          const slotIdx = ((k - activeCenter) % 6 + 6) % 6
          const s = slotsD[slotIdx]
          const isCenter = slotIdx === 0

          return (
            <a
              key={k}
              href={pod.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={pod.label}
              onClick={(e) => handleCardClick(k, e)}
              style={{
                position: 'absolute',
                left: `${s.left}px`,
                top: `${s.top}px`,
                width: `${s.w}px`,
                height: `${s.h}px`,
                borderRadius: `${s.r}px`,
                opacity: s.op,
                boxShadow: s.sh,
                zIndex: s.z,
                pointerEvents: s.op ? 'auto' : 'none',
                backgroundImage: `url(${pod.img})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                transition: `left 1.5s ${ease}, top 1.5s ${ease}, width 1.5s ${ease}, height 1.5s ${ease}, border-radius 1.5s ${ease}, box-shadow 1.5s ${ease}, opacity 1s ease`,
              }}
              tabIndex={s.op ? 0 : -1}
              className="group block overflow-hidden relative"
            >
              {/* Play Badge Overlay */}
              {isCenter && (
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#B83A2A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              )}
              {pod.title && (
                <span
                  style={{
                    top: `${s.ft}px`,
                    fontSize: `${s.fs}px`,
                    transition: `top 1.5s ${ease}, font-size 1.5s ${ease}`,
                  }}
                  className="absolute left-2.5 right-2.5 text-center font-['Merriweather',Georgia,serif] font-bold leading-[1.04] text-[#FFF8C9] [text-shadow:0_0_10px_rgba(255,236,120,0.6),0_2px_4px_rgba(0,0,0,0.35)]"
                >
                  {pod.title}
                </span>
              )}
            </a>
          )
        })}
      </div>

      {/* Mobile/Tablet Touch Carousel */}
      <div
        className="min-[1200px]:hidden relative w-full h-[392px] mt-[26px] [background:linear-gradient(180deg,#fff_0,#fff_128px,#F5E4DE_128px,#EAC6B8_100%)] touch-pan-y select-none cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {podcasts.map((pod, k) => {
          const slotIdx = ((k - activeCenter) % 6 + 6) % 6
          const s = slotsM[slotIdx]
          const isCenter = slotIdx === 0

          return (
            <a
              key={k}
              href={pod.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={pod.label}
              onClick={(e) => handleCardClick(k, e)}
              style={{
                position: 'absolute',
                left: s.left,
                top: `${s.top}px`,
                width: `${s.w}px`,
                height: `${s.h}px`,
                borderRadius: `${s.r}px`,
                opacity: s.op,
                boxShadow: s.sh,
                zIndex: s.z,
                pointerEvents: s.op ? 'auto' : 'none',
                backgroundImage: `url(${pod.img})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                transition: `left 1.5s ${ease}, top 1.5s ${ease}, width 1.5s ${ease}, height 1.5s ${ease}, border-radius 1.5s ${ease}, box-shadow 1.5s ${ease}, opacity 1s ease`,
              }}
              tabIndex={s.op ? 0 : -1}
              className="block overflow-hidden relative group"
            >
              {isCenter && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#B83A2A] flex items-center justify-center shadow">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              )}
              {pod.title && (
                <span
                  style={{
                    top: `${s.ft}px`,
                    fontSize: `${s.fs}px`,
                    transition: `top 1.5s ${ease}, font-size 1.5s ${ease}`,
                  }}
                  className="absolute left-2.5 right-2.5 text-center font-['Merriweather',Georgia,serif] font-bold leading-[1.04] text-[#FFF8C9] [text-shadow:0_0_10px_rgba(255,236,120,0.6),0_2px_4px_rgba(0,0,0,0.35)]"
                >
                  {pod.title}
                </span>
              )}
            </a>
          )
        })}
      </div>

      {/* Prev / Next Carousel Controls */}
      <div className="flex items-center justify-center gap-4 mt-4 pb-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous podcast"
          className="w-9 h-9 rounded-full bg-white border border-[#E9DCD6] text-[#141010] hover:bg-[#141010] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold text-[#8A6B66]">
          {activeCenter + 1} / {podcasts.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next podcast"
          className="w-9 h-9 rounded-full bg-white border border-[#E9DCD6] text-[#141010] hover:bg-[#141010] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      </div>
    </section>
  )
}

export default FeaturedConversations
