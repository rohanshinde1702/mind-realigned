'use client'

import { useState, useEffect } from 'react'
import { DOORS_DATA } from '@/data'

const doorsData = DOORS_DATA

const SoundDoors = () => {
  const [activeDoor, setActiveDoor] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDoor((prev) => (prev + 1) % doorsData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="sound" className="bg-white pt-10 pb-14">
      <div className="container mx-auto flex flex-col items-center">
        <span className="text-[14px] tracking-[0.08em] font-semibold text-[#F29A7E] uppercase leading-none">
          Is this you?
        </span>
        <h2 className="mt-[18px] font-['Merriweather',Georgia,serif] font-black text-[#111] text-[clamp(26px,7vw,56px)] leading-[1.1] text-center">
          I don’t think anyone gets it.
        </h2>
        <p className="mt-4 font-bold text-[#8A6B66] text-center text-[15px] leading-[21px]">
          Our work starts with the thoughts people rarely say out loud.
        </p>

        {/* Doors Grid Container */}
        <div className="grid w-full mt-6 relative min-h-[340px] md:min-h-[268px]">
          {doorsData.map((door, index) => {
            const isActive = activeDoor === index
            return (
              <div
                key={index}
                style={{ backgroundColor: door.bg }}
                className={`[grid-area:1/1] rounded-[34px] md:rounded-[46px] p-[30px_22px_28px] md:p-[42px_40px_30px] flex flex-col items-center justify-between gap-[18px] md:gap-[21px] text-center transition-opacity duration-500 ease-in-out ${
                  isActive
                    ? 'opacity-100 pointer-events-auto z-10'
                    : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <div className="flex flex-col gap-4 md:gap-[21px] flex-1 justify-center">
                  {(door.highlightedQuotes || door.quotes).map((quote, qIdx) => (
                    <p
                      key={qIdx}
                      className="m-0 text-[18px] md:text-[21px] leading-[25px] md:leading-[28px] italic tracking-[-0.01em] text-[#141010]"
                    >
                      {typeof quote === 'object' && quote.bold ? (
                        <>
                          {quote.before}
                          <b>{quote.bold}</b>
                          {quote.after}
                        </>
                      ) : (
                        quote
                      )}
                    </p>
                  ))}
                </div>
                <a
                  href={door.href}
                  style={{ backgroundColor: door.btnBg }}
                  className="flex items-center justify-center w-full md:w-1/2 h-[44px] rounded-full border border-[#C0392B] text-[#B83A2A] text-[16px] font-semibold transition-all duration-200 hover:!bg-black hover:!text-white hover:!border-black no-underline shadow-sm"
                >
                  {door.btnText}
                </a>
              </div>
            )
          })}
        </div>

        {/* Door Indicators */}
        <div className="flex gap-2 mt-4">
          {doorsData.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveDoor(index)}
              aria-label={`Show thought ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeDoor === index ? 'bg-[#B83A2A] w-6' : 'bg-[#EADFD6] hover:bg-[#B83A2A]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SoundDoors
