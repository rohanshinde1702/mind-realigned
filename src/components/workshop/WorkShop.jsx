'use client'

import { useState } from 'react'
import { submitWorkshopLead } from '@/services'

const TOPICS = ['Motherhood', 'Pregnancy', 'Relationships']

const WorkShop = () => {
  const [selectedTopic, setSelectedTopic] = useState('Motherhood')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')

    const cleanName = firstName.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (!cleanName) {
      setErrorMessage('Please enter your first name.')
      return
    }

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      await submitWorkshopLead({
        name: cleanName,
        firstName: cleanName,
        email: cleanEmail,
        topic: selectedTopic,
      })

      setSubmitted(true)
      setFirstName('')
      setEmail('')
    } catch (err) {
      console.error('Workshop registration error:', err)
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <section id="workshop" className="bg-[#B03828] py-14 lg:py-16 text-white overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Copy */}
        <div className="w-full lg:max-w-[480px]">
          <span className="text-[12px] md:text-[13px] tracking-[0.1em] font-semibold text-[#F7C6B8] uppercase block">
            FIND SUPPORT IN COMMUNITY
          </span>
          <h2 className="mt-2.5 font-['Merriweather',Georgia,serif] font-black text-white text-[clamp(30px,4.5vw,35px)] leading-[1.12] tracking-[-0.01em]">
            Join our next workshop
          </h2>
          <p className="mt-3.5 text-[15px] md:text-[16px] leading-[1.55] text-[#F9E8E2] font-medium">
            Stay notified about upcoming workshops: dates, topics and early seats, straight to your inbox.
          </p>
        </div>

        {/* Right Form Card */}
        <div className="w-full lg:w-[540px] xl:w-[580px] bg-white rounded-[22px] p-6 sm:p-7 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.22)] text-[#141010]">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col">
            <span className="text-[13px] font-bold text-[#141010] leading-none mb-2.5">
              Topic of interest
            </span>

            {/* Topic Pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Topic of interest">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(topic)
                      if (submitted) setSubmitted(false)
                    }}
                    className={`h-[29px] px-3.5 rounded-full text-[12px] font-medium leading-none cursor-pointer transition-colors border ${
                      isSelected
                        ? 'border-[#141010] text-[#fff] bg-[#141010]'
                        : 'border-[#E5BEB2] text-[#3A2E2A] bg-white hover:border-[#1410101a] hover:bg-[#1410101a]'
                    }`}
                  >
                    {topic}
                  </button>
                )
              })}
            </div>

            {/* Inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5">
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  if (errorMessage) setErrorMessage('')
                  if (submitted) setSubmitted(false)
                }}
                onKeyDown={handleKeyDown}
                placeholder="First name"
                className="h-[42px] px-3.5 rounded-xl border border-[#D9C4BA] text-[14px] text-[#2A211E] placeholder:text-[#9E8B84] bg-white focus:outline-none focus:ring-1 focus:ring-[#B03828]"
              />
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errorMessage) setErrorMessage('')
                  if (submitted) setSubmitted(false)
                }}
                onKeyDown={handleKeyDown}
                placeholder="you@email.com"
                className="h-[42px] px-3.5 rounded-xl border border-[#D9C4BA] text-[14px] text-[#2A211E] placeholder:text-[#9E8B84] bg-white focus:outline-none focus:ring-1 focus:ring-[#B03828]"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="mt-2.5 text-[12.5px] text-[#D03A24] font-medium">
                {errorMessage}
              </p>
            )}

            {/* Action Row */}
            <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[12px] text-[#8A756E]">
                We’ll send workshop date announcements directly to your email.
              </span>

              <button
                type="submit"
                id="workshop-notify-btn"
                disabled={isSubmitting}
                className="h-10 px-6 rounded-full bg-[#B03828] hover:bg-[#8F2C1F] disabled:opacity-75 disabled:cursor-not-allowed text-white text-[14px] font-medium transition-colors shadow-xs cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Joining...</span>
                  </>
                ) : (
                  'Notify me'
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mt-3 p-3 rounded-xl bg-[#EAF8F0] border border-[#B6E5CC] text-[#1E7E44] text-[13px] font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <svg className="w-4 h-4 shrink-0 text-[#1E7E44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>You&apos;re on the list! We&apos;ll notify you when dates are announced.</span>
              </div>
            )}

            {/* Disclaimer */}
            <p className="mt-3 text-[11px] leading-[15px] text-[#8A756E]">
              No spam. Only workshop updates. Unsubscribe any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default WorkShop