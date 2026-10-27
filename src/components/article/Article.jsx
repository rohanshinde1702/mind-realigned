'use client'

import React, { useSyncExternalStore, useRef } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { ARTICLE_DATA } from '@/data/articleData'

const emptySubscribe = () => () => {}

const Article = () => {
  const swiperRef = useRef(null)
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const articleList = ARTICLE_DATA

  const renderCard = (data) => {
    const title = data.title || data.headings?.head1 || `Article ${data.id}`
    const cardContent = (
      <div className="group relative h-full flex flex-col bg-white rounded-2xl border border-[#E8D4CB] overflow-hidden shadow-[0_4px_18px_rgba(80,40,30,0.06)] hover:shadow-[0_16px_36px_rgba(80,40,30,0.12)] hover:-translate-y-1.5 transition-all duration-300">
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F6EDE8] cursor-pointer">
          <img
            src={data.thumbImg}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    )

    if (data.href) {
      return (
        <a
          href={data.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full no-underline"
          aria-label={title}
        >
          {cardContent}
        </a>
      )
    }

    return (
      <Link
        href={`/article/${data.id}`}
        className="block w-full h-full no-underline"
        aria-label={title}
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <section id="articles" className="bg-[#FBF7F2] py-14 md:py-20 overflow-hidden border-t border-[#EEDBD2]/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-center gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-center font-['Merriweather',Georgia,serif] font-black text-[#141010] text-[clamp(28px,4.5vw,44px)] leading-[1.15] tracking-[-0.01em]">
              Newsroom
            </h2>
            <p className="text-center mt-3 text-[15px] sm:text-[16px] text-[#6E5D57] leading-relaxed">
              Our work accross media.
            </p>
          </div>
        </div>
        {/* Swiper Slider with Left and Right Nav Controls centered on cards */}
        <div className="relative w-full">
          {/* Previous Button (Left) */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous articles"
            disabled={!isMounted || articleList.length <= 1}
            className="absolute left-0 sm:-left-4 lg:-left-6 top-[calc(50%-14px)] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xs border border-[#E0CBC2] text-[#141010] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:bg-[#141010] hover:text-white hover:border-[#141010] hover:scale-105 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#141010] disabled:hover:scale-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button (Right) */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next articles"
            disabled={!isMounted || articleList.length <= 1}
            className="absolute right-0 sm:-right-4 lg:-right-6 top-[calc(50%-14px)] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xs border border-[#E0CBC2] text-[#141010] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:bg-[#141010] hover:text-white hover:border-[#141010] hover:scale-105 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#141010] disabled:hover:scale-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {!isMounted ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articleList.slice(0, 3).map((data) => (
                <div key={data.id}>
                  {renderCard(data)}
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              key="article-swiper"
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
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
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="w-full pb-6"
            >
              {articleList.map((data) => (
                <SwiperSlide key={data.id} className="h-auto">
                  {renderCard(data)}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Bottom CTA for All Articles */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/article"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#141010] text-white hover:bg-[#B83A2A] text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
          >
            <span>View All Articles & Publications</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Article