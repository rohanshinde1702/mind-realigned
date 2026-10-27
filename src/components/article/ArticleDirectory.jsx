'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Building2,
  Calendar,
  Layers,
  HeartHandshake,
} from 'lucide-react'
import { ARTICLE_DATA } from '@/data/articleData'

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Articles' },
  { id: 'editorial', label: 'Editorial & Press' },
  { id: 'workplace', label: 'Workplace Well-Being' },
  { id: 'motherhood', label: 'Motherhood & Parenting' },
]

const ArticleDirectory = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredArticles = ARTICLE_DATA.filter((article) => {
    if (activeFilter === 'all') return true

    if (activeFilter === 'editorial') {
      return (
        article.id === 1 ||
        article.id === 2 ||
        article.id === 3 ||
        article.category?.toLowerCase().includes('editorial') ||
        article.category?.toLowerCase().includes('column') ||
        article.category?.toLowerCase().includes('lifestyle') ||
        article.category?.toLowerCase().includes('flipbook')
      )
    }

    if (activeFilter === 'workplace') {
      return (
        article.id === 3 ||
        article.id === 4 ||
        article.category?.toLowerCase().includes('employee') ||
        article.category?.toLowerCase().includes('workplace') ||
        article.organization !== undefined
      )
    }

    if (activeFilter === 'motherhood') {
      return (
        article.id === 3 ||
        article.id === 5 ||
        article.category?.toLowerCase().includes('motherhood') ||
        article.category?.toLowerCase().includes('parenting')
      )
    }

    return true
  })

  return (
    <div className="py-10 md:py-16">
      {/* Top Breadcrumb & Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E5D57] hover:text-[#B83A2A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9C8BB]/60 mb-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Article categories">
            {CATEGORY_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id
              const count =
                filter.id === 'all'
                  ? ARTICLE_DATA.length
                  : filter.id === 'editorial'
                  ? 3
                  : filter.id === 'workplace'
                  ? 2
                  : 2

              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`h-9 px-4 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#141010] text-white border-[#141010] shadow-xs'
                      : 'bg-white text-[#5A4943] border-[#E8D4CB] hover:bg-[#F8EEE9] hover:border-[#D8BEB3]'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F2DFD7] text-[#B83A2A]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="text-xs sm:text-sm text-[#8A7973] font-medium">
            Showing <strong className="text-[#141010]">{filteredArticles.length}</strong> of{' '}
            <strong>{ARTICLE_DATA.length}</strong> articles
          </div>
        </div>

        {/* Articles Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const title = article.title || article.headings?.head1 || `Article ${article.id}`
            const rawDesc =
              article.tagline ||
              (typeof article.desc === 'string'
                ? article.desc.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                : '')
            const snippet = rawDesc ? rawDesc.split('\n')[0] : ''
            const publicationInfo =
              article.publication?.name ||
              article.organization?.name ||
              (article.category?.toLowerCase().includes('column') ? 'Isprava Insider' : null)

            return (
              <article
                key={article.id}
                className="group bg-white rounded-2xl border border-[#E8D4CB] overflow-hidden shadow-[0_4px_20px_rgba(80,40,30,0.06)] hover:shadow-[0_16px_36px_rgba(80,40,30,0.14)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image Header */}
                  <div className="relative  w-full overflow-hidden bg-[#F6EDE8]">
                    <img
                      src={article.thumbImg}
                      alt={title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    {article.category && (
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#141010]/85 backdrop-blur-md text-white shadow-xs">
                          {article.category}
                        </span>
                      </div>
                    )}

                    {/* Link Indicator Badge */}
                    {article.href && (
                      <div className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 rounded-full bg-white/95 text-[#141010] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                        <span>Flipbook</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="p-6 pt-0 mt-2">
                  <div className="pt-4 border-t border-[#F2E5DF] flex items-center justify-between">
                    {article.href ? (
                      <a
                        href={article.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full h-11 px-5 rounded-full bg-[#141010] hover:bg-[#B83A2A] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs"
                      >
                        <span>Open Flipbook Edition</span>
                        <ArrowUpRight className="w-4 h-4 ml-1.5" />
                      </a>
                    ) : (
                      <Link
                        href={`/article/${article.id}`}
                        className="inline-flex items-center justify-between w-full h-11 px-5 rounded-full bg-[#141010] hover:bg-[#B83A2A] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs group/btn"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ArticleDirectory
