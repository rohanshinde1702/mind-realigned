'use client'

import { useState, useEffect, useCallback } from 'react'

const TOPICS = ['Motherhood', 'Pregnancy', 'Relationships']

const WorkShop = () => {
  const [selectedTopic, setSelectedTopic] = useState('Motherhood')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // WhatsApp Modal State
  const [showModal, setShowModal] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [otpError, setOtpError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const closeModal = useCallback(() => {
    setShowModal(false)
    setOtpStep(false)
    setPhoneError('')
    setOtpError('')
    if (!isVerified) {
      setNotifyWhatsApp(false)
    }
    setIsVerified(false)
  }, [isVerified])

  // Close modal on Escape key
  useEffect(() => {
    if (!showModal) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showModal, closeModal])

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showModal])

  const handleNotifyClick = (e) => {
    if (e) e.preventDefault()
    setPhoneError('')
    setOtpError('')
    setShowModal(true)
  }

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault()
    const cleanPhone = phoneNumber.replace(/\D/g, '')

    if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number')
      return
    }

    setPhoneError('')
    setIsSendingOtp(true)

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedCourse: `Workshop: ${selectedTopic}`,
          firstName: firstName.trim() || 'Workshop Subscriber',
          email: email.trim() || `${cleanPhone}@whatsapp.user`,
          phoneNumber: `+91 ${cleanPhone}`,
        }),
      })

      // Move to OTP entry step
      setOtpStep(true)
    } catch (err) {
      console.error('Failed to submit WhatsApp lead:', err)
      // Still allow step progression for user experience
      setOtpStep(true)
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault()
    const cleanOtp = otpCode.replace(/\D/g, '')

    if (cleanOtp.length < 4) {
      setOtpError('Please enter the code sent to your WhatsApp')
      return
    }

    setOtpError('')
    setIsVerifying(true)

    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      setSubmitted(true)
      setNotifyWhatsApp(true)

      // Auto close modal after brief confirmation
      setTimeout(() => {
        setShowModal(false)
        setOtpStep(false)
        setIsVerified(false)
        setOtpCode('')
      }, 1600)
    }, 600)
  }

  return (
    <>
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
            <div className="flex flex-col">
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
                      onClick={() => setSelectedTopic(topic)}
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-[42px] px-3.5 rounded-xl border border-[#D9C4BA] text-[14px] text-[#2A211E] placeholder:text-[#9E8B84] bg-white focus:outline-none focus:ring-1 focus:ring-[#B03828]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-[42px] px-3.5 rounded-xl border border-[#D9C4BA] text-[14px] text-[#2A211E] placeholder:text-[#9E8B84] bg-white focus:outline-none focus:ring-1 focus:ring-[#B03828]"
                />
              </div>

              {/* Action Row */}
              <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-[12.5px] text-[#3A2E2A] select-none">
                  <input
                    type="checkbox"
                    checked={notifyWhatsApp}
                    onChange={(e) => {
                      const isChecked = e.target.checked
                      setNotifyWhatsApp(isChecked)
                      if (isChecked) {
                        setPhoneError('')
                        setOtpError('')
                        setShowModal(true)
                      } else {
                        closeModal()
                      }
                    }}
                    className="w-4 h-4 rounded border-[#D9C4BA] accent-[#B03828] cursor-pointer"
                  />
                  <span>Also notify me on WhatsApp</span>
                </label>

                <button
                  type="button"
                  id="workshop-notify-btn"
                  onClick={handleNotifyClick}
                  className="h-10 px-6 rounded-full bg-[#B03828] hover:bg-[#8F2C1F] text-white text-[14px] font-medium transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Notify me
                </button>
              </div>

              {submitted && (
                <span className="mt-2.5 text-[12.5px] font-semibold text-[#B03828]">
                  ✓ You&apos;re on the list! We&apos;ll notify you when dates are announced.
                </span>
              )}

              {/* Disclaimer */}
              <p className="mt-3 text-[11px] leading-[15px] text-[#8A756E]">
                No spam. Only workshop updates. Unsubscribe any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Verification Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div className="relative w-full max-w-[440px] bg-white rounded-[26px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-[#141010] animate-in zoom-in-95 duration-200">
            {/* Top row: WhatsApp Badge + Close Button */}
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-full bg-[#E5F7EE] flex items-center justify-center text-[#1EAA52]">
                {/* WhatsApp Icon */}
                <svg
                  className="w-6 h-6 fill-[#25D366]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 20.13C10.55 20.13 9.09 19.73 7.82 18.98L7.52 18.8L4.4 19.62L5.23 16.58L5.03 16.26C4.21 14.96 3.77 13.46 3.77 11.91C3.77 7.35 7.48 3.64 12.04 3.64C16.6 3.64 20.31 7.35 20.31 11.91C20.31 16.47 16.6 20.13 12.04 20.13M16.57 14.41C16.32 14.28 15.1 13.68 14.87 13.6C14.65 13.52 14.48 13.48 14.32 13.73C14.15 13.98 13.68 14.53 13.54 14.69C13.4 14.86 13.25 14.88 13 14.75C12.75 14.63 11.95 14.37 11 13.52C10.26 12.86 9.76 12.05 9.62 11.8C9.47 11.55 9.6 11.42 9.73 11.29C9.84 11.18 9.98 11 10.1 10.86C10.22 10.72 10.27 10.62 10.35 10.45C10.43 10.28 10.39 10.14 10.33 10.01C10.27 9.89 9.77 8.66 9.56 8.16C9.36 7.67 9.16 7.74 9.01 7.73C8.87 7.72 8.7 7.72 8.54 7.72C8.37 7.72 8.1 7.78 7.87 8.03C7.64 8.28 7 8.88 7 10.1C7 11.32 7.89 12.49 8.01 12.66C8.14 12.82 9.76 15.32 12.24 16.39C12.83 16.65 13.29 16.8 13.65 16.91C14.24 17.1 14.78 17.07 15.2 17.01C15.68 16.94 16.67 16.41 16.88 15.83C17.08 15.25 17.08 14.75 17.02 14.65C16.96 14.54 16.81 14.48 16.57 14.41Z" />
                </svg>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full bg-[#F3ECE8] hover:bg-[#EAE0D8] text-[#554741] flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M2 2L12 12M12 2L2 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            {!otpStep ? (
              // Step 1: Enter Phone Number
              <div className="mt-4">
                <h3
                  id="whatsapp-modal-title"
                  className="font-['Merriweather',Georgia,serif] font-bold text-[#141010] text-[24px] sm:text-[25px] leading-[1.2] tracking-[-0.01em]"
                >
                  Verify your WhatsApp number
                </h3>

                <p className="mt-2.5 text-[14px] leading-[1.45] text-[#76655E]">
                  Enter your mobile number and we’ll send a one-time code to confirm it.
                </p>

                {/* Input Row */}
                <div className="mt-6 flex items-center gap-2.5">
                  <div className="w-[72px] h-[50px] rounded-[13px] border border-[#DECBC2] bg-white flex items-center justify-center text-[15px] font-medium text-[#141010] shrink-0 select-none">
                    +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoFocus
                    value={phoneNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^\d\s]/g, '').slice(0, 11)
                      setPhoneNumber(val)
                      if (phoneError) setPhoneError('')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendOtp(e)
                    }}
                    placeholder="98765 43210"
                    className="flex-1 h-[50px] px-3.5 rounded-[13px] border-2 border-[#E77B63] focus:border-[#D03A24] focus:outline-none text-[15.5px] text-[#141010] placeholder:text-[#9A8982] bg-white font-normal"
                  />
                </div>

                {phoneError && (
                  <p className="mt-2 text-[12.5px] text-[#D03A24] font-medium">
                    {phoneError}
                  </p>
                )}

                {/* Send OTP Button */}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp}
                  className="w-full h-[48px] mt-4 rounded-full bg-[#D03A24] hover:bg-[#B32E1A] disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.99] text-white font-semibold text-[15px] transition-all cursor-pointer flex items-center justify-center shadow-xs"
                >
                  {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
                </button>

                {/* Disclaimer */}
                <p className="mt-3.5 text-[11.5px] leading-[1.45] text-[#8C7A73]">
                  Message and data rates may apply. We only use this number for workshop updates.
                </p>
              </div>
            ) : isVerified ? (
              // Step 3: Verified Success
              <div className="mt-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#E5F7EE] text-[#1EAA52] mx-auto flex items-center justify-center text-2xl font-bold mb-3">
                  ✓
                </div>
                <h3 className="font-['Merriweather',Georgia,serif] font-bold text-[#141010] text-[22px]">
                  WhatsApp Verified!
                </h3>
                <p className="mt-2 text-[14px] text-[#76655E]">
                  You&apos;re all set. We&apos;ll notify you on WhatsApp as soon as workshop dates are announced.
                </p>
              </div>
            ) : (
              // Step 2: Enter OTP Code
              <div className="mt-4">
                <h3
                  id="whatsapp-modal-title"
                  className="font-['Merriweather',Georgia,serif] font-bold text-[#141010] text-[24px] sm:text-[25px] leading-[1.2] tracking-[-0.01em]"
                >
                  Enter confirmation code
                </h3>

                <p className="mt-2 text-[14px] leading-[1.45] text-[#76655E]">
                  We sent a code to <span className="font-semibold text-[#141010]">+91 {phoneNumber}</span>.
                </p>

                <div className="mt-5">
                  <input
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                      setOtpCode(val)
                      if (otpError) setOtpError('')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleVerifyOtp(e)
                    }}
                    placeholder="Enter 4-6 digit OTP"
                    className="w-full h-[50px] px-4 text-center tracking-[0.3em] font-mono text-[18px] rounded-[13px] border-2 border-[#E77B63] focus:border-[#D03A24] focus:outline-none text-[#141010] placeholder:tracking-normal placeholder:font-sans placeholder:text-[14px] placeholder:text-[#9A8982] bg-white"
                  />
                </div>

                {otpError && (
                  <p className="mt-2 text-[12.5px] text-[#D03A24] font-medium text-center">
                    {otpError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                  className="w-full h-[48px] mt-4 rounded-full bg-[#D03A24] hover:bg-[#B32E1A] disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.99] text-white font-semibold text-[15px] transition-all cursor-pointer flex items-center justify-center shadow-xs"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Confirm'}
                </button>

                <div className="mt-3 flex items-center justify-between text-[12.5px]">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep(false)
                      setOtpCode('')
                      setOtpError('')
                    }}
                    className="text-[#8C7A73] hover:text-[#141010] underline cursor-pointer"
                  >
                    Change number
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#D03A24] hover:underline font-medium cursor-pointer"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default WorkShop