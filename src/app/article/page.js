import React from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ArticleDirectory from '@/components/article/ArticleDirectory'

export const metadata = {
  title: 'Articles & Publications | Mind Realigned - Ashika Mehta',
  description:
    'Read articles, national media columns, and corporate workshop reflections on emotional intelligence, workplace well-being, and parenting by Ashika Mehta.',
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2A211E] flex flex-col justify-between font-['DM_Sans',system-ui,sans-serif]">
      {/* Site Header */}
      <Header />

      {/* Main Articles Listing */}
      <main className="flex-1">
        <ArticleDirectory />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  )
}
