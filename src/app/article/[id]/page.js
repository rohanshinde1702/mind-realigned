import React from 'react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ARTICLE_DATA } from '@/data/articleData'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'

export function generateStaticParams() {
  return ARTICLE_DATA.map((data) => ({
    id: data.id.toString(),
  }))
}

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r=".6" fill="currentColor" />
  </svg>
)

const renderFormattedText = (text) => {
  if (typeof text !== 'string') return text

  const tokenRegex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(@[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*)/g
  let lastIndex = 0
  let match
  const elements = []

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index))
    }

    if (match[1]) {
      const label = match[2]
      const url = match[3]
      const isInstagram = url.includes('instagram.com')
      elements.push(
        <a
          key={`link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#B83A2A] hover:text-[#8F2C1F] underline underline-offset-2 hover:no-underline transition-colors"
        >
          {isInstagram && <InstagramIcon className="w-3.5 h-3.5 inline-block shrink-0" />}
          <span>{label}</span>
        </a>
      )
    } else if (match[4]) {
      const handleWithAt = match[4]
      const cleanHandle = handleWithAt.replace(/^@/, '')
      const url = `https://www.instagram.com/${cleanHandle}/`
      elements.push(
        <a
          key={`handle-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#B83A2A] hover:text-[#8F2C1F] underline underline-offset-2 hover:no-underline transition-colors"
        >
          <InstagramIcon className="w-3.5 h-3.5 inline-block shrink-0" />
          <span>{handleWithAt}</span>
        </a>
      )
    }

    lastIndex = tokenRegex.lastIndex
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex))
  }

  return elements.length > 0 ? elements : text
}

export default async function Page(props) {
  const resolvedParams = await (props?.params ?? Promise.resolve({}))
  const id = resolvedParams?.id

  if (!id) {
    notFound()
  }

  const article = ARTICLE_DATA.find(
    (data) => String(data.id) === String(id)
  )

  if (!article) {
    notFound()
  }

  if (article.href && !article.desc && !article.headings) {
    redirect(article.href)
  }

  const imageList = article.images ? Object.values(article.images).filter(Boolean) : []

  const otherArticles = ARTICLE_DATA.filter(
    (data) => String(data.id) !== String(id)
  )

  // Split description into distinct paragraphs if present
  const descParagraphs = article.desc
    ? (article.desc.includes('\n\n')
        ? article.desc.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
        : (article.desc.includes('\n')
            ? article.desc.split(/\n+/).map((p) => p.trim()).filter(Boolean)
            : article.desc.split(/(?<=\.)\s+/).filter(Boolean)))
    : []

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2A211E] flex flex-col justify-between font-['DM_Sans',system-ui,sans-serif]">
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto">

          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E9C8BB]/60">
            <Link
              href="/article"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E5D57] hover:text-[#B83A2A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>

            {article.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F5DDD3] text-[#B83A2A] border border-[#E9C8BB]">
                <Sparkles className="w-3 h-3" />
                {article.category}
              </span>
            )}
          </div>

          {/* Main Layout: Article on Left + Other Articles on Right */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-12 xl:gap-16 items-start w-full">

            {/* Left Column: Article Content */}
            <article className="flex-1 w-full min-w-0 max-w-[800px] xl:max-w-[840px]">

              {/* Article Header */}
              <header className="mb-8">
                <h1 className="font-['Merriweather',Georgia,serif] text-3xl sm:text-4xl md:text-5xl font-black text-[#141010] leading-[1.18] tracking-[-0.01em] mb-4">
                  {article.title || article.headings?.head1 || `Article ${article.id}`}
                </h1>

                {article.subtitle && (
                  <p className="text-lg sm:text-xl text-[#B83A2A] font-['Merriweather',Georgia,serif] font-bold italic mb-3">
                    {article.subtitle}
                  </p>
                )}

                {/* Publication / Meta Info */}
                {(article.publication || article.organization) && (
                  <div className="flex flex-wrap items-center gap-2 text-sm text-[#7A6159] mt-3">
                    {article.publication && (
                      <>
                        <span className="font-semibold text-[#141010]">{article.publication.name}</span>
                        {article.publication.date && <span>• {article.publication.date}</span>}
                        {article.publication.readTime && <span>• {article.publication.readTime}</span>}
                      </>
                    )}
                    {article.organization && (
                      <>
                        <span className="font-semibold text-[#141010]">{article.organization.name}</span>
                        {article.organization.date && <span>• {article.organization.date}</span>}
                        {article.organization.facilitator && <span>• {article.organization.facilitator}</span>}
                      </>
                    )}
                  </div>
                )}
              </header>

              {/* Featured Hero Image (if present, except id: 4 where image comes after text) */}
              {article.thumbImg && article.id !== 4 && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <img
                    src={article.thumbImg}
                    alt={article.title || `Article ${article.id}`}
                    className="w-full h-auto max-h-[580px] object-contain rounded-2xl mx-auto"
                  />
                </div>
              )}

              {/* Narrative Paragraphs */}
              {descParagraphs.length > 0 && (
                <div className="space-y-5 text-[#2A211E] text-[17px] sm:text-[18px] leading-[1.8] mb-8">
                  {descParagraphs.map((para, index) => (
                    <p key={index}>
                      {renderFormattedText(para)}
                    </p>
                  ))}
                </div>
              )}

              {/* Headings and Paragraphs (e.g. Articles 1 and 3) */}
              {article.headings &&
                Object.keys(article.headings).map((key, index) => {
                  const heading = article.headings[key]
                  const paragraph = article.paras ? article.paras[`para${index + 1}`] : null

                  return (
                    <div key={key} className="my-8">
                      <h2 className="font-['Merriweather',Georgia,serif] text-xl sm:text-2xl font-bold mb-3 text-[#141010]">
                        {heading}
                      </h2>

                      {paragraph && (
                        <p className="text-[#2A211E] text-[17px] sm:text-[18px] leading-[1.8]">
                          {renderFormattedText(paragraph)}
                        </p>
                      )}
                    </div>
                  )
                })}

              {/* Image(s) */}
              {/* For Article 4: Single clean image right after text */}
              {article.id === 4 && (article.images?.img1 || article.thumbImg) && (
                <div className="my-8 overflow-hidden rounded-2xl">
                  <img
                    src={article.images?.img1 || article.thumbImg}
                    alt={article.title || 'Workshop'}
                    className="w-full h-auto max-h-[600px] object-contain rounded-2xl mx-auto"
                  />
                </div>
              )}

              {/* Gallery / Article Images (for other articles) */}
              {article.id !== 4 && imageList.length > 0 && (
                <div className={`my-8 grid grid-cols-1 ${imageList.length > 1 ? 'sm:grid-cols-2 md:grid-cols-3' : ''} gap-4`}>
                  {imageList.map((imgSrc, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl">
                      <img
                        src={imgSrc}
                        alt={`${article.title || 'Article visual'} ${index + 1}`}
                        className="w-full h-auto max-h-[500px] object-contain rounded-2xl mx-auto"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* External Publication Link (if applicable) */}
              {article.href && (
                <div className="my-8">
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#141010] hover:bg-[#B83A2A] text-white font-medium text-sm rounded-full transition-colors shadow-xs"
                  >
                    <span>Open Flipbook Edition</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="my-8 pt-6 border-t border-[#E9C8BB]/60 flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium text-[#7A6159] bg-[#F7EFE9]"
                    >
                      #{tag.replace(/^#/, '')}
                    </span>
                  ))}
                </div>
              )}

            </article>

            {/* Right Column: Other Articles Sidebar (List View) */}
            {otherArticles.length > 0 && (
              <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 lg:sticky lg:top-24">
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8D4CB] shadow-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E9C8BB]/60">
                    <h3 className="font-['Merriweather',Georgia,serif] text-lg font-bold text-[#141010]">
                      Other Articles
                    </h3>
                    <Link
                      href="/article"
                      className="text-xs font-semibold text-[#B83A2A] hover:underline"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3.5">
                    {otherArticles.map((item) => {
                      const itemTitle = item.title || item.headings?.head1 || `Article ${item.id}`
                      const listItem = (
                        <div className="p-3 sm:p-3.5 rounded-xl border border-[#E8D4CB] bg-[#FAF5F2]/50 hover:bg-[#FAF5F2] hover:border-[#B83A2A]/40 hover:shadow-xs transition-all flex items-start gap-3.5 group cursor-pointer min-h-[140px] sm:min-h-[155px]">
                          {/* Taller Portrait Thumbnail (matches 4:5 native image ratio) */}
                          <div className="w-[105px] h-[132px] sm:w-[118px] sm:h-[148px] shrink-0 rounded-lg overflow-hidden bg-[#F6EDE8] border border-[#EAD5CB]">
                            <img
                              src={item.thumbImg}
                              alt={itemTitle}
                              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                            <div>
                              {item.category && (
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#B83A2A] block mb-1">
                                  {item.category}
                                </span>
                              )}
                              <h4 className="font-['Merriweather',Georgia,serif] font-bold text-[#141010] text-[13.5px] sm:text-[14px] leading-snug group-hover:text-[#B83A2A] transition-colors line-clamp-3">
                                {itemTitle}
                              </h4>
                            </div>
                            <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#8A7973] group-hover:text-[#B83A2A] transition-colors inline-flex items-center gap-1">
                              {item.href ? 'Open Flipbook' : 'Read Article'} →
                            </span>
                          </div>
                        </div>
                      )

                      return (
                        <div key={item.id}>
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block no-underline"
                              aria-label={itemTitle}
                            >
                              {listItem}
                            </a>
                          ) : (
                            <Link
                              href={`/article/${item.id}`}
                              className="block no-underline"
                              aria-label={itemTitle}
                            >
                              {listItem}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </aside>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
