'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { IMAGES, SOCIAL_LINKS } from '@/constants'
import { subscribeNewsletter } from '@/services'

const InstagramIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r=".6" fill="currentColor" />
  </svg>
)

const SubstackIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6h16M4 11h16M5 16h14v4l-7-3.2L5 20z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10 8.6v6.8l5.6-3.4z" fill="currentColor" />
  </svg>
)

const socialCards = [
  {
    name: 'Instagram',
    desc: 'Reels, tips and daily reminders',
    insta_1: 'momrenew',
    insta_2: 'ashikamehta.relationships',
    href_1: SOCIAL_LINKS.instagram_1,
    href_2: SOCIAL_LINKS.instagram_2,
    icon: InstagramIcon,
    img: IMAGES.social.instaProfilePic,
  },
  {
    name: 'Substack',
    desc: 'Weekly essays, in your inbox',
    href: SOCIAL_LINKS.substack,
    icon: SubstackIcon,
    img: IMAGES.social.instaProfilePic,
  },
  {
    name: 'YouTube',
    desc: 'Full conversations and talks',
    href: SOCIAL_LINKS.youtube,
    icon: YouTubeIcon,
    img: IMAGES.social.youtubeProfilePic,
  },
]

const StayInTheLoop_1 = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await subscribeNewsletter(email)
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      console.error(err)
      setErrorMessage(err.message || 'Something went wrong while subscribing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="begin" className="bg-[#F3EBE3] py-12 md:py-16 lg:py-[72px] overflow-hidden">
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-4 md:gap-5 text-center">
          <h2 className="font-['Merriweather',Georgia,serif] font-black text-[#111] text-[clamp(28px,7vw,76px)] leading-[1.05] tracking-[-0.01em]">
            Stay in the loop
          </h2>
          <p className="m-0 text-[15px] md:text-[16px] leading-[1.55] text-[#5A4B46]">
            Start with one free lesson. Everything else can wait.
          </p>

          <a
            href="#glimpse"
            className="inline-flex items-center justify-center w-full md:w-1/2 lg:w-[30%] h-11 px-[26px] rounded-full bg-[#B83A2A] hover:bg-[#8F2C1F] text-white font-bold text-[16px] no-underline transition-colors duration-200 shadow-sm"
          >
            Watch the free glimpse
          </a>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full mt-2 items-stretch">
            {socialCards.map((soc) => {
              if (soc.href_1 && soc.href_2) {
                return (
                  <div
                    key={soc.name}
                    className="flex items-center gap-3.5 p-3.5 md:p-[14px_18px] rounded-[18px] bg-white border-[1.5px] border-[#E6D3C8] text-[#2A211E] text-left transition-all duration-200 hover:-translate-y-0.5 shadow-xs h-full"
                  >
                    <span className="flex-none w-[60px] h-[60px] rounded-full bg-[#F6DDD3] text-[#B83A2A] flex items-center justify-center overflow-hidden">
                      <img className="rounded-full w-full h-full object-cover" src={soc.img} alt={soc.name} />
                    </span>
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                      <b className="text-[16px] leading-5 text-[#2A211E]">{soc.name}</b>
                      <div className="flex flex-col xl:flex-row gap-1 overflow-hidden">
                        <a
                          href={soc.href_2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#FAF4F0] hover:bg-[#141010] text-[#2A211E] hover:text-white text-[12px] font-medium transition-all no-underline"
                        >
                          <span className="truncate">@{soc.insta_2}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0" />
                        </a>
                        <a
                          href={soc.href_1}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#FAF4F0] hover:bg-[#141010] text-[#2A211E] hover:text-white text-[12px] font-medium transition-all no-underline"
                        >
                          <span className="truncate">@{soc.insta_1}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 p-3.5 md:p-[14px_18px] rounded-[18px] bg-white border-[1.5px] border-[#E6D3C8] text-[#2A211E] text-left no-underline transition-all duration-200 hover:bg-black hover:text-white hover:border-black hover:-translate-y-0.5 shadow-xs h-full"
                >
                  <span className="flex-none w-[60px] h-[60px] rounded-full bg-[#F6DDD3] text-[#B83A2A] flex items-center justify-center transition-colors group-hover:bg-white overflow-hidden">
                    <img className="rounded-full w-full h-full object-cover" src={soc.img} alt={soc.name} />
                  </span>
                  <span className="flex flex-col gap-0.5 min-w-0">
                    <b className="text-[16px] leading-5">{soc.name}</b>
                    <span className="text-[13px] leading-[17px] text-[#8A6B66] transition-colors group-hover:text-[#E6D3C8] truncate">
                      {soc.desc}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto flex-none w-[18px] h-[18px] stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )
            })}
          </div>

          {/* Newsletter Box */}
          <form
            onSubmit={handleSubscribe}
            className="mt-4 w-full p-[24px_18px_20px] md:p-[30px_36px_26px] rounded-[26px] [background:linear-gradient(180deg,#F8EAE5_0%,#EFD0C3_100%)] shadow-[0_14px_34px_-14px_rgba(120,60,45,0.32),0_2px_6px_rgba(120,60,45,0.08)] flex flex-col items-center gap-1.5 text-center border border-[#E6CFC6]"
          >
            <span className="text-xs tracking-[0.08em] uppercase font-medium text-[#E9866A] leading-4">
              Weekly newsletter
            </span>
            <label htmlFor="n-email" className="font-['Merriweather',Georgia,serif] text-[20px] md:text-[30px] leading-7 md:leading-[38px] text-[#141010] mt-0.5 font-bold cursor-pointer">
              Or get Ashika’s Substack by email
            </label>
            <span className="text-[14px] leading-5 font-medium text-[#8A6B66]">
              One thoughtful article a week. Unsubscribe any time.
            </span>

            <div className="mt-3.5 w-full md:w-1/2 flex flex-col sm:flex-row gap-2.5">
              <input
                id="n-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full sm:flex-[1_1_260px] h-[50px] border border-[#D9A99A] rounded-full px-[22px] text-[15px] bg-white text-[#2A211E] focus:outline-none focus:ring-2 focus:ring-[#B83A2A]/40"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[50px] w-full sm:w-auto border-0 rounded-full bg-[#B83A2A] hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed text-white text-[15px] font-medium cursor-pointer px-[30px] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {errorMessage && (
              <span className="mt-3 text-[13px] leading-[18px] font-medium text-red-600">
                {errorMessage}
              </span>
            )}

            {subscribed && (
              <span className="mt-3 text-[13px] leading-[18px] font-bold text-[#B83A2A]">
                ✓ Thanks for subscribing! You&apos;ll receive the next essay directly in your inbox.
              </span>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default StayInTheLoop_1
