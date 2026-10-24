'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { PODCASTS_DATA } from '@/data'

const podcasts = PODCASTS_DATA

const ease = 'cubic-bezier(.3,1.2,.45,1)'

/**
 * Calculates the shortest cyclic offset from the active center
 */
const getOffset = (index, center, total) => {
  let diff = (index - center) % total
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

/**
 * Dynamic Desktop slot style for any card index given its offset
 */
const getSlotD = (offset) => {
  if (offset === 0) {
    return {
      left: 233,
      top: 0,
      w: 214,
      h: 380,
      r: 28,
      op: 1,
      z: 20,
      sh: '0 26px 50px -12px rgba(110,50,35,.38), 0 8px 18px rgba(110,50,35,.14)',
      pointerEvents: 'auto',
    }
  }
  if (offset === 1) {
    return {
      left: 491,
      top: 22,
      w: 189,
      h: 335,
      r: 25,
      op: 1,
      z: 10,
      sh: '0 12px 26px -8px rgba(110,50,35,.22)',
      pointerEvents: 'auto',
    }
  }
  if (offset === -1) {
    return {
      left: 0,
      top: 22,
      w: 189,
      h: 335,
      r: 25,
      op: 1,
      z: 10,
      sh: '0 12px 26px -8px rgba(110,50,35,.22)',
      pointerEvents: 'auto',
    }
  }
  if (offset > 1) {
    return {
      left: 491 + (offset - 1) * 233,
      top: 22,
      w: 189,
      h: 335,
      r: 25,
      op: 0,
      z: 0,
      sh: 'none',
      pointerEvents: 'none',
    }
  }
  return {
    left: 0 + (offset + 1) * 233,
    top: 22,
    w: 189,
    h: 335,
    r: 25,
    op: 0,
    z: 0,
    sh: 'none',
    pointerEvents: 'none',
  }
}

/**
 * Dynamic Mobile slot style for any card index given its offset
 */
const getSlotM = (offset) => {
  if (offset === 0) {
    return {
      left: 'calc(50% - 96.5px)',
      top: 0,
      w: 193,
      h: 342,
      r: 26,
      op: 1,
      z: 20,
      sh: '0 26px 50px -12px rgba(110,50,35,.38), 0 8px 18px rgba(110,50,35,.14)',
      pointerEvents: 'auto',
    }
  }
  if (offset === 1) {
    return {
      left: 'calc(50% + 116px)',
      top: 20,
      w: 170,
      h: 301,
      r: 23,
      op: 1,
      z: 10,
      sh: '0 12px 26px -8px rgba(110,50,35,.22)',
      pointerEvents: 'auto',
    }
  }
  if (offset === -1) {
    return {
      left: 'calc(50% - 286px)',
      top: 20,
      w: 170,
      h: 301,
      r: 23,
      op: 1,
      z: 10,
      sh: '0 12px 26px -8px rgba(110,50,35,.22)',
      pointerEvents: 'auto',
    }
  }
  if (offset > 1) {
    return {
      left: `calc(50% + ${116 + (offset - 1) * 210}px)`,
      top: 20,
      w: 170,
      h: 301,
      r: 23,
      op: 0,
      z: 0,
      sh: 'none',
      pointerEvents: 'none',
    }
  }
  return {
    left: `calc(50% - ${286 + (-offset - 1) * 220}px)`,
    top: 20,
    w: 170,
    h: 301,
    r: 23,
    op: 0,
    z: 0,
    sh: 'none',
    pointerEvents: 'none',
  }
}

const FeaturedConversations = () => {
  const [activeCenter, setActiveCenter] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [modalIndex, setModalIndex] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const startXRef = useRef(null)
  const timerRef = useRef(null)
  const videoRefsD = useRef({})
  const videoRefsM = useRef({})

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveCenter((prev) => (prev + 1) % podcasts.length)
    }, 5500)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  // Pause timer and previews when modal is open; lock body scroll
  useEffect(() => {
    if (modalIndex !== null) {
      if (timerRef.current) clearInterval(timerRef.current)
      Object.values(videoRefsD.current).forEach((v) => {
        if (v && !v.paused) v.pause()
      })
      Object.values(videoRefsM.current).forEach((v) => {
        if (v && !v.paused) v.pause()
      })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      resetTimer()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalIndex, resetTimer])

  // Keyboard shortcut navigation inside modal
  useEffect(() => {
    if (modalIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalIndex(null)
      } else if (e.key === 'ArrowRight') {
        setModalIndex((prev) => (prev + 1) % podcasts.length)
        setActiveCenter((prev) => (prev + 1) % podcasts.length)
      } else if (e.key === 'ArrowLeft') {
        setModalIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length)
        setActiveCenter((prev) => (prev - 1 + podcasts.length) % podcasts.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalIndex])

  const handleNext = () => {
    setActiveCenter((prev) => (prev + 1) % podcasts.length)
    resetTimer()
  }

  const handlePrev = () => {
    setActiveCenter((prev) => (prev - 1 + podcasts.length) % podcasts.length)
    resetTimer()
  }

  const handleCardClick = (k, e) => {
    if (isDragging) {
      e.preventDefault()
      return
    }
    const offset = getOffset(k, activeCenter, podcasts.length)
    if (offset !== 0) {
      e.preventDefault()
      setActiveCenter(k)
      resetTimer()
    } else {
      e.preventDefault()
      setModalIndex(k)
    }
  }

  // Hover on card: preview video silently & pause auto-rotation
  const handleCardMouseEnter = (k) => {
    setHoveredCard(k)
    if (timerRef.current) clearInterval(timerRef.current)
    const video = videoRefsD.current[k]
    if (video) {
      video.currentTime = 0
      const p = video.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {})
      }
    }
  }

  const handleCardMouseLeave = (k) => {
    if (hoveredCard === k) {
      setHoveredCard(null)
    }
    const video = videoRefsD.current[k]
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    if (modalIndex === null) {
      resetTimer()
    }
  }

  // Touch drag for mobile swipe
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
            const offset = getOffset(k, activeCenter, podcasts.length)
            const s = getSlotD(offset)
            const isCenter = offset === 0
            const isHovered = hoveredCard === k

            return (
              <div
                key={pod.id || k}
                role="button"
                tabIndex={s.op ? 0 : -1}
                aria-label={pod.label || pod.title}
                onClick={(e) => handleCardClick(k, e)}
                onMouseEnter={() => handleCardMouseEnter(k)}
                onMouseLeave={() => handleCardMouseLeave(k)}
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
                  pointerEvents: s.pointerEvents,
                  transition: `left 1.2s ${ease}, top 1.2s ${ease}, width 1.2s ${ease}, height 1.2s ${ease}, border-radius 1.2s ${ease}, box-shadow 1.2s ${ease}, opacity 0.8s ease`,
                }}
                className="group block overflow-hidden relative cursor-pointer select-none bg-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B83A2A]"
              >
                {/* Thumbnail Cover Image */}
                <Image
                  src={pod.img}
                  alt={pod.title || `Podcast ${k + 1}`}
                  fill
                  sizes="214px"
                  className="object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />

                {/* Hover Video Preview (Muted & Loop) */}
                <video
                  ref={(el) => {
                    if (el) videoRefsD.current[k] = el
                  }}
                  src={pod.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Center Card Play Button & Action Prompt */}
                {isCenter && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300">
                    <div
                      className={`w-13 h-13 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                        isHovered
                          ? 'bg-black/70 text-white backdrop-blur-md scale-95'
                          : 'bg-white/95 text-[#B83A2A] group-hover:scale-110'
                      }`}
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>

                    <span
                      className={`mt-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide shadow-md transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                    >
                      Click to watch
                    </span>
                  </div>
                )}

                {/* Side Card Subtle Play Cue on Hover */}
                {!isCenter && s.op > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-[#B83A2A] flex items-center justify-center shadow">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
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
            const offset = getOffset(k, activeCenter, podcasts.length)
            const s = getSlotM(offset)
            const isCenter = offset === 0

            return (
              <div
                key={pod.id || k}
                role="button"
                tabIndex={s.op ? 0 : -1}
                aria-label={pod.label || pod.title}
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
                  pointerEvents: s.pointerEvents,
                  transition: `left 1.2s ${ease}, top 1.2s ${ease}, width 1.2s ${ease}, height 1.2s ${ease}, border-radius 1.2s ${ease}, box-shadow 1.2s ${ease}, opacity 0.8s ease`,
                }}
                className="block overflow-hidden relative group bg-stone-900 focus:outline-none"
              >
                {/* Thumbnail Cover Image */}
                <Image
                  src={pod.img}
                  alt={pod.title || `Podcast ${k + 1}`}
                  fill
                  sizes="193px"
                  className="object-cover select-none pointer-events-none"
                  draggable={false}
                />

                {/* Subtle dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none opacity-40" />

                {/* Center Card Play Button */}
                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#B83A2A] flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-4 pb-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous podcast"
            className="w-9 h-9 rounded-full bg-white border border-[#E9DCD6] text-[#141010] hover:bg-[#141010] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-[#8A6B66] select-none">
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

      {/* Video Modal Player */}
      {modalIndex !== null && podcasts[modalIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={podcasts[modalIndex].title || 'Podcast Video'}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setModalIndex(null)}
        >
          {/* Top-Right Close Button */}
          <button
            type="button"
            onClick={() => setModalIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/10"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Desktop Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setModalIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length)
              setActiveCenter((prev) => (prev - 1 + podcasts.length) % podcasts.length)
            }}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/10 shadow-lg"
            aria-label="Previous podcast clip"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Desktop Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setModalIndex((prev) => (prev + 1) % podcasts.length)
              setActiveCenter((prev) => (prev + 1) % podcasts.length)
            }}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/10 shadow-lg"
            aria-label="Next podcast clip"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative w-full max-w-[390px] sm:max-w-[420px] max-h-[92vh] bg-stone-950 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/15 flex flex-col animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-stone-900/90 border-b border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="w-2 h-2 rounded-full bg-[#F29A7E] shrink-0" />
                <h3 className="text-sm font-semibold text-white truncate">
                  {podcasts[modalIndex].title || 'Podcast Clip'}
                </h3>
              </div>
              <span className="text-[11px] font-medium text-white/50 shrink-0">
                {modalIndex + 1} / {podcasts.length}
              </span>
            </div>

            {/* Video Player (9:16 portrait) */}
            <div className="relative w-full aspect-[9/16] bg-black flex items-center justify-center overflow-hidden">
              <video
                key={podcasts[modalIndex].video}
                src={podcasts[modalIndex].video}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="flex md:hidden items-center justify-between px-4 py-2.5 bg-stone-900/95 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setModalIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length)
                  setActiveCenter((prev) => (prev - 1 + podcasts.length) % podcasts.length)
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium flex items-center gap-1 active:bg-white/20 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <span className="text-xs text-white/60">
                {modalIndex + 1} of {podcasts.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setModalIndex((prev) => (prev + 1) % podcasts.length)
                  setActiveCenter((prev) => (prev + 1) % podcasts.length)
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium flex items-center gap-1 active:bg-white/20 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default FeaturedConversations
