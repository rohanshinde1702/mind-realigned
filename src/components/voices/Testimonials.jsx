'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { TESTIMONIAL_DATA, FILTER_TABS } from '@/data'

const testimonialData = TESTIMONIAL_DATA
const filterTabs = FILTER_TABS

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const swiperRef = useRef(null)

  const filteredList = testimonialData.filter(
    (t) => activeFilter === 'all' || t.aud === activeFilter
  )

  return (
    <section id="voices" className="bg-white pt-12 pb-14 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="font-['Merriweather',Georgia,serif] font-black text-[#111] text-[clamp(28px,5.2vw,56px)] leading-[1.05] tracking-[-0.012em] text-center">
          Testimonials
        </h2>
        <p className="mt-[22px] font-bold text-[#8A6B66] text-center text-[15px] leading-[21px] tracking-[-0.01em]">
          Join a community of over 10,000 people living better.
        </p>

        {/* Filter Pills */}
        <div className="w-full mt-6 flex items-center justify-center">
          <div className="flex gap-1 md:gap-2 justify-center" role="tablist">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveFilter(tab.id)
                    if (swiperRef.current) swiperRef.current.slideTo(0)
                  }}
                  className={`py-1 md:py-2.5 px-2 md:px-4 rounded-full text-[13px] md:text-[11.5px] font-medium leading-none cursor-pointer transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#141010] text-white border-[#141010] shadow-xs'
                      : 'bg-transparent text-[#141010] border-[#141010] hover:bg-[#141010]/10'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Swiper Slider with Left and Right Nav Controls centered on cards */}
        <div className="relative w-full mt-6 md:mt-8">
          {/* Previous Button (Left) */}
          <button
            type="button"
            onClick={() => {
              if (!swiperRef.current || swiperRef.current.destroyed) return
              swiperRef.current.slidePrev()
            }}
            aria-label="Previous testimonials"
            disabled={filteredList.length <= 1}
            className="absolute left-0 sm:-left-4 lg:-left-6 top-[calc(50%-14px)] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xs border border-[#E0CBC2] text-[#141010] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:bg-[#141010] hover:text-white hover:border-[#141010] hover:scale-105 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#141010] disabled:hover:scale-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button (Right) */}
          <button
            type="button"
            onClick={() => {
              if (!swiperRef.current || swiperRef.current.destroyed) return
              swiperRef.current.slideNext()
            }}
            aria-label="Next testimonials"
            disabled={filteredList.length <= 1}
            className="absolute right-0 sm:-right-4 lg:-right-6 top-[calc(50%-14px)] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xs border border-[#E0CBC2] text-[#141010] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:bg-[#141010] hover:text-white hover:border-[#141010] hover:scale-105 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#141010] disabled:hover:scale-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {filteredList.length === 0 ? (
            <div className="py-12 text-center text-[#8A6B66] text-[15px]">
              No testimonials available in this category yet.
            </div>
          ) : (
            <Swiper
              key={activeFilter}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
              rewind={filteredList.length > 1}
              speed={450}
              watchSlidesProgress={true}
              autoplay={
                filteredList.length > 1
                  ? {
                      delay: 4500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              spaceBetween={24}
              slidesPerView={1}
              grabCursor={true}
              centerInsufficientSlides={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1100: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
              }}
              className="w-full pb-2"
            >
              {filteredList.map((item, index) => (
              <SwiperSlide key={`${item.who}-${index}`} className="!h-auto flex flex-col">
                <figure className="flex-1 w-full bg-white border border-[#F1DDD4] shadow-[0_10px_26px_-10px_rgba(120,60,45,0.2),0_2px_6px_rgba(120,60,45,0.06)] rounded-[20px] px-5 py-4 flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-1 select-none">
                  <blockquote className="m-0 font-['Merriweather',Georgia,serif] text-[13.5px] leading-[20px] text-[#2B2321] flex-1 flex flex-col justify-center">
                    <span>
                      <u className="underline underline-offset-2 decoration-[#F29A7E] decoration-1">{item.ul}</u>
                      {item.rest}
                    </span>
                  </blockquote>
                  <figcaption className="mt-2.5 text-[12.5px] leading-[16px] italic font-light text-[#8F8480]">
                    {item.who}
                  </figcaption>
                  {/* Avatar */}
                  {item.av ? (
                    <div
                      style={{ backgroundImage: `url(${item.av})` }}
                      className="mt-2.5 w-9 h-9 rounded-full bg-cover bg-center border border-[#F1DDD4] shadow-xs shrink-0"
                    />
                  ) : (
                    <div
                      style={{ backgroundColor: item.bg }}
                      className="mt-2.5 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-[#5A4B46] border border-[#F1DDD4] shadow-xs shrink-0"
                    >
                      {item.init}
                    </div>
                  )}
                  {/* Badge */}
                  <img
                    src={item.logo}
                    alt={item.alt}
                    className="mt-2 h-7 min-[1200px]:h-8 w-auto object-contain shrink-0"
                  />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
    </section>
  )
}

export default Testimonials
