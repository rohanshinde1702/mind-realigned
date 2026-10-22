'use client'

import { useState } from 'react'
import { COURSE_PILLS, ANIMATED_WORDS, ANIMATED_RAYS } from '@/data'
import { submitLead } from '@/services'

const coursePills = COURSE_PILLS
const words = ANIMATED_WORDS
const rays = ANIMATED_RAYS

const LeadCapture = () => {
  const [selectedCourse, setSelectedCourse] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [whatsapp, setWhatsapp] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await submitLead({
        firstName,
        email,
        phoneNumber,
        selectedCourse: coursePills[selectedCourse],
      })
      setSubmitted(true)
      setFirstName('')
      setEmail('')
      setPhoneNumber('')
    } catch (err) {
      console.error(err)
      setErrorMessage('Something went wrong while sending your lesson. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="glimpse"
      className="[background:radial-gradient(ellipse_90%_70%_at_40%_30%,#F8E7E0_0%,#F5DDD3_55%,#F1D2C6_100%)] pt-[52px] pb-[58px] lg:pt-[84px] lg:pb-[90px] overflow-x-clip"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
        {/* Left Copy */}
        <div className="w-full lg:flex-1">
          <span className="text-[14px] tracking-[0.08em] font-semibold text-[#F29A7E] uppercase leading-none block">
            Claim the better life
          </span>
          <h2 className="mt-3 font-['Merriweather',Georgia,serif] font-black text-black text-[clamp(28px,7.4vw,56px)] leading-[1.1] tracking-[-0.01em]">
            We’d be<br />delighted to<br />send you a gift.
          </h2>
          <p className="mt-4 text-[15px] leading-[22px] font-bold tracking-[-0.01em] text-[#8A6B66]">
            For the next time you’re in a spot,<br className="hidden sm:inline" />
            pick your free gift that can help you out.
          </p>
        </div>

        {/* Center Animated Word Graphic */}
        <div className="hidden lg:block relative w-[230px] h-[190px] flex-none" aria-hidden="true">
          {words.map((w, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${w.left}px`,
                top: `${w.top}px`,
                transform: `translate(-50%, -50%) rotate(${w.rot}deg)`,
                whiteSpace: 'nowrap',
              }}
            >
              <span
                className={`${w.cls} inline-block font-['Lobster_Two',Georgia,serif] italic font-bold text-[30px] leading-[1.3] px-1.5 text-[#CC3A22]`}
              >
                {w.text}
              </span>
            </div>
          ))}

          {rays.map((r, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${r.x}px`,
                top: `${r.y}px`,
                width: 0,
                height: 0,
                transform: `rotate(${r.ang}deg)`,
                transformOrigin: '0 0',
              }}
            >
              <div
                className={`${r.cls} absolute -left-1.5 -top-1.5 h-3`}
                style={{
                  width: `${r.w}px`,
                  transformOrigin: '6px 50%',
                }}
              >
                <svg
                  width={r.w}
                  height="12"
                  viewBox={`-6 -6 ${r.w} 12`}
                  fill="#CC3A22"
                  className="block overflow-visible"
                >
                  <path d={r.path} />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Right Form Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:flex-1 bg-white rounded-[22px] p-6 lg:p-[30px_32px] flex flex-col shadow-[0_12px_32px_-6px_rgba(120,60,45,0.28),0_2px_8px_rgba(120,60,45,0.12)] border border-[#F1E4DD]"
        >
          <span className="font-['Merriweather',Georgia,serif] text-[20px] lg:text-[22px] leading-7 text-[#141010] font-bold">
            Send me a free lesson
          </span>

          <span className="text-xs font-bold text-[#3A2E2A] mt-4 leading-4">
            Select a course
          </span>

          {/* Course Select Pills */}
          <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Select a course">
            {coursePills.map((courseName, idx) => {
              const isSelected = selectedCourse === idx
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCourse(idx)}
                  className={`h-[30px] px-3.5 rounded-full text-[12px] font-medium leading-none whitespace-nowrap cursor-pointer transition-colors border ${
                    isSelected
                      ? 'bg-[#141010] text-white border-[#141010]'
                      : 'bg-white text-[#141010] border-[#141010] hover:bg-[#141010]/10'
                  }`}
                >
                  {courseName}
                </button>
              )
            })}
          </div>

          <label htmlFor="g-name" className="mt-4 text-xs font-medium text-[#141010]">
            First name
          </label>
          <input
            id="g-name"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            className="mt-1.5 h-[46px] border border-[#D9A99A] rounded-xl px-3.5 text-[15px] text-[#2A211E] bg-white focus:outline-none focus:ring-2 focus:ring-[#D03A24]/30"
          />

          <label htmlFor="g-phone" className="mt-4 text-xs font-medium text-[#141010]">
            Phone Number <span className="text-[#8A6B66] font-normal">(optional)</span>
          </label>
          <input
            id="g-phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Your phone number"
            className="mt-1.5 h-[46px] border border-[#D9A99A] rounded-xl px-3.5 text-[15px] text-[#2A211E] bg-white focus:outline-none focus:ring-2 focus:ring-[#D03A24]/30"
          />

          <label htmlFor="g-email" className="mt-4 text-xs font-medium text-[#141010]">
            Email
          </label>
          <input
            id="g-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-1.5 h-[46px] border border-[#D9A99A] rounded-xl px-3.5 text-[15px] text-[#2A211E] bg-white focus:outline-none focus:ring-2 focus:ring-[#D03A24]/30"
          />

          {/* <div className="mt-3.5 flex items-center gap-2.5 text-[13px] text-[#3A2E2A]">
            <input
              id="g-wa"
              type="checkbox"
              checked={whatsapp}
              onChange={(e) => setWhatsapp(e.target.checked)}
              className="w-[18px] h-[18px] m-0 accent-[#D03A24] cursor-pointer"
            />
            <label htmlFor="g-wa" className="cursor-pointer">Also send it on WhatsApp</label>
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full h-12 rounded-full bg-[#D03A24] hover:bg-[#B02D1A] disabled:opacity-70 disabled:cursor-not-allowed text-white text-[15px] font-medium cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              'Send me the free lesson'
            )}
          </button>

          {errorMessage && (
            <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-center text-[13px] leading-[18px] text-red-600 font-medium">
              {errorMessage}
            </div>
          )}

          {submitted && (
            <div className="mt-3 p-2 bg-[#FEE8E0] rounded-lg text-center text-[13px] leading-[18px] font-bold text-[#B83A2A]">
              ✓ Check your inbox! Your free lesson on &ldquo;{coursePills[selectedCourse]}&rdquo; is on its way.
            </div>
          )}

          <span className="mt-3.5 text-[11.5px] leading-4 text-[#3A2E2A]">
            No spam. One email with your lesson, then a gentle note about the full programme. Unsubscribe any time.
          </span>
        </form>
      </div>
    </section>
  )
}

export default LeadCapture
