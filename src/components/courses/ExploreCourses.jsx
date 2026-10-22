'use client'

import { useState, useRef } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { COURSES_DATA, CURRENCIES } from '@/data'
import { formatCurrencyPrice } from '@/utils'
import { IMAGES } from '@/constants'

const coursesData = COURSES_DATA
const currencies = CURRENCIES

const ExploreCourses = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [courseFormats, setCourseFormats] = useState({
    1: 'f',
    2: 'o',
    3: 'f',
    4: 'f',
    5: 'f',
    6: 'f',
  })
  const [activeCategory, setActiveCategory] = useState('all')
  const swiperRef = useRef(null)

  const toggleFormat = (id, format) => {
    setCourseFormats((prev) => ({
      ...prev,
      [id]: format,
    }))
  }

  const formatPrice = (usdAmount) => formatCurrencyPrice(usdAmount, selectedCurrency)

  const filteredCourses = coursesData.filter(
    (c) => activeCategory === 'all' || c.aud === activeCategory
  )

  const slidesToRender =
    filteredCourses.length > 0 && filteredCourses.length < 6
      ? [...filteredCourses, ...filteredCourses]
      : filteredCourses

  return (
    <section id="courses" className="bg-[#FCF0EB] pt-11 pb-[60px] overflow-x-clip">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center">
          <img
            src={IMAGES.testimonials.avatarStack}
            alt="Learners who have taken Ashika's courses"
            className="w-[120px] h-auto block"
          />
          <h2 className="mt-2 font-['Merriweather',Georgia,serif] font-black text-black text-[clamp(28px,5.2vw,56px)] leading-[1.15] text-center">
            Explore Resources
          </h2>
          <p className="mt-[18px] text-[15px] leading-[22px] font-bold tracking-[-0.01em] text-[#8A6B66] text-center">
            Self paced{' '}
            <a href="#courses" className="text-[#8A6B66] underline underline-offset-[3px] hover:text-black">
              programmes
            </a>
            ,{' '}
            <a href="#talks" className="text-[#8A6B66] underline underline-offset-[3px] hover:text-black">
              workshops
            </a>{' '}
            and{' '}
            <a href="#begin" className="text-[#8A6B66] underline underline-offset-[3px] hover:text-black">
              in-person therapy
            </a>
            .
          </p>
        </div>

        {/* Currency Switcher & Category Filter */}
        <div className="w-full mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="hidden lg:flex gap-2">
            {['all', 'motherhood', 'relationships'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat)
                  if (swiperRef.current) swiperRef.current.slideTo(0)
                }}
                className={`h-7 px-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#141010] text-white shadow-xs'
                    : 'bg-white/70 text-[#8A6B66] hover:bg-white'
                }`}
              >
                {cat === 'all' ? 'All Courses' : cat}
              </button>
            ))}
          </div>

          {/* Controls: Currency Switcher & Prev/Next Arrows */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Currency Switcher */}
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span className="text-xs font-bold text-[#8A6B66]">Currency</span>
              <div className="flex gap-0.5 p-[3px] rounded-full bg-white/55 border border-[#E6CFC6]">
                {currencies.map((curr) => {
                  const isSelected = selectedCurrency === curr.code
                  return (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => setSelectedCurrency(curr.code)}
                      className={`h-[26px] px-[9px] rounded-full border-0 text-[11px] font-bold cursor-pointer whitespace-nowrap transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#141010] text-white shadow-xs'
                          : 'bg-transparent text-[#8A6B66] hover:text-[#141010]'
                      }`}
                    >
                      {curr.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous courses"
                className="w-8 h-8 rounded-full bg-white border border-[#E6CFC6] text-[#141010] hover:bg-[#141010] hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next courses"
                className="w-8 h-8 rounded-full bg-white border border-[#E6CFC6] text-[#141010] hover:bg-[#141010] hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="w-full mt-[22px] overflow-hidden">
          <Swiper
            key={activeCategory}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            loopAdditionalSlides={2}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={24}
            slidesPerView={1}
            grabCursor={true}
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
              1080: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            className="w-full pb-2"
          >
            {slidesToRender.map((course, idx) => {
              const currentFormat = courseFormats[course.id] || 'f'
              const pricePair = course.prices[currentFormat]

              return (
                <SwiperSlide key={`${course.id}-${idx}`} className="h-auto">
                  <div
                    style={{ backgroundColor: course.bg }}
                    className="relative rounded-[24px] overflow-hidden flex flex-col shadow-[0_5px_16px_rgba(80,40,30,0.18),0_1px_3px_rgba(80,40,30,0.1)] h-[520px] transition-transform duration-200 hover:-translate-y-1 select-none"
                  >
                    {/* Ashika Cutout Image */}
                    <img
                      src={IMAGES.hero.ashikaCutout}
                      alt=""
                      aria-hidden="true"
                      className="absolute right-1.5 bottom-0 w-[112px] md:w-[124px] h-auto pointer-events-none z-0"
                    />

                    <div className="relative z-10 p-6 flex flex-col flex-1">
                      <span className="text-[11px] tracking-[0.06em] uppercase font-medium text-[#F29A7E] leading-tight">
                        {course.eyebrow}
                      </span>
                      <h3 className="mt-2 font-['Merriweather',Georgia,serif] text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] text-[#141010] font-bold tracking-[-0.01em]">
                        {course.title}
                      </h3>

                      {/* Format Segmented Control */}
                      <div className="mt-2.5 w-full h-[34px] md:h-[32px] flex rounded-full bg-[#B83A2A] border border-[#141010] overflow-hidden p-0.5">
                        <button
                          type="button"
                          onClick={() => toggleFormat(course.id, 'f')}
                          className={`flex-1 rounded-full text-[11.5px] font-bold tracking-[0.02em] transition-all duration-200 cursor-pointer ${
                            currentFormat === 'f'
                              ? 'bg-white text-[#B83A2A] shadow-xs'
                              : 'bg-transparent text-white'
                          }`}
                        >
                          Facilitated Course
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFormat(course.id, 'o')}
                          className={`flex-1 rounded-full text-[11.5px] font-bold tracking-[0.02em] transition-all duration-200 cursor-pointer ${
                            currentFormat === 'o'
                              ? 'bg-white text-[#B83A2A] shadow-xs'
                              : 'bg-transparent text-white'
                          }`}
                        >
                          Course Only
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="mt-3 flex items-baseline gap-3 h-10">
                        <span className="font-['Merriweather',Georgia,serif] text-[24px] md:text-[25px] leading-[38px] text-[#141010] line-through decoration-[2.5px]">
                          {formatPrice(pricePair[0])}
                        </span>
                        <span className="font-['Merriweather',Georgia,serif] text-[24px] md:text-[25px] leading-[38px] text-[#F29A7E] font-bold">
                          {formatPrice(pricePair[1])}
                        </span>
                      </div>

                      {/* Subtitle */}
                      <p className="mt-1.5 text-[13px] leading-[17px] font-bold text-[#8A6B66]">
                        {course.sub}
                      </p>

                      {/* Bullet points */}
                      <div className="mt-3.5 flex flex-col gap-[11px]">
                        {course.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2.5 items-start text-[13px] leading-[17.5px] text-[#141010]">
                            <Check className="w-4 h-4 text-[#141010] flex-none mt-0.5 stroke-[2.5]" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA button */}
                      <div className="mt-auto pt-6">
                        <a
                          href={course.href}
                          className="inline-flex items-center justify-center w-[150px] md:w-[168px] h-[40px] md:h-[37px] rounded-full bg-[#141010] hover:bg-[#B83A2A] text-white text-[15px] md:text-[16px] tracking-[-0.01em] transition-colors duration-200 no-underline shadow-sm font-medium"
                        >
                          {course.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default ExploreCourses
