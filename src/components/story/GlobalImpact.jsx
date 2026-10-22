'use client'

import { useState, useEffect, useRef } from 'react'
import { STATS_DATA, IMPACT_CREDENTIALS } from '@/data'

const statsData = STATS_DATA

const Counter = ({ target, suffix = '', duration = 1800, shouldStart = false }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime = null
    let animationFrameId

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic for a natural deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * target))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [target, duration, shouldStart])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const GlobalImpact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.25,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-[#FBF0EA] pt-[46px] md:pt-[58px] pb-[52px] md:pb-[64px]"
    >
      <div className="container mx-auto flex flex-col items-center">
        <span className="text-[14px] tracking-[0.08em] font-semibold text-[#F29A7E] uppercase leading-none">
          Small steps
        </span>
        <h2 className="mt-[18px] font-['Merriweather',Georgia,serif] font-black text-[#111] text-[clamp(28px,5.2vw,56px)] leading-[1.05] tracking-[-0.012em] text-center">
          Global Impact
        </h2>
        <p className="mt-[22px] font-bold text-[#8A6B66] text-center text-[14px] md:text-[15px] leading-[21px]">
          {IMPACT_CREDENTIALS}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 w-full mt-[34px] md:mt-[44px]">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              <div className="font-['Merriweather',Georgia,serif] text-[clamp(22px,6.6vw,46px)] font-black leading-[1.1] tracking-[-0.02em] text-[#111] tabular-nums">
                <Counter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={1800 + idx * 200}
                  shouldStart={isVisible}
                />
              </div>
              <div className="mt-3 text-[13px] md:text-[15px] leading-[18px] font-bold text-[#8A6B66]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GlobalImpact
