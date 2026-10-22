'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { FAQ_ITEMS } from '@/data'

const faqItems = FAQ_ITEMS

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section id="faq" className="bg-white py-12 md:py-[72px]">
      <div className="container mx-auto flex flex-col md:flex-row gap-5 items-start">
        {/* Left Heading */}
        <div className="w-full lg:w-[20%]">
          <span className="text-[14px] tracking-[0.08em] font-semibold text-[#F29A7E] uppercase leading-none">
            Questions
          </span>
          <h2 className="mt-3.5 font-['Merriweather',Georgia,serif] font-black text-[#111] text-[clamp(28px,5vw,52px)] leading-[1.08] text-left">
            FAQs
          </h2>
        </div>

        {/* Right Accordion List */}
        <div className="w-full lg:w-[80%] border-t border-[#EADFD6]">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={idx} className="border-b border-[#EADFD6] py-5 md:py-6">
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex justify-between items-center gap-4 cursor-pointer group focus:outline-none"
                >
                  <span className="font-['DM_Sans',sans-serif] text-[17px] md:text-[20px] leading-[23px] font-medium text-[#141010] group-hover:text-[#B83A2A] transition-colors">
                    {item.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#FBF7F2] group-hover:bg-[#F8EAE5] flex items-center justify-center flex-none transition-colors text-[#141010]">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-3 animate-in fade-in duration-200">
                    <p className="m-0 text-[15px] md:text-[17px] leading-[1.6] text-[#5A4B46]">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
