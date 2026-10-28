import Link from 'next/link'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/constants'

const Footer = () => {
  const currentYear = SITE_CONFIG.copyrightYear

  return (
    <footer id="contact" className="bg-[#131f34] text-[#F6E8E2] pt-12 md:pt-[72px] pb-7 md:pb-10">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16">
          {/* Brand Column */}
          <div className="flex-1">
            <b className="font-['Merriweather',Georgia,serif] text-[26px] md:text-[36px] font-normal block leading-tight text-white">
              Ashika Mehta
            </b>
            <i className="font-['Quicksand','DM_Sans',sans-serif] text-[15px] font-semibold text-[#F2B3A4] block mt-1.5 not-italic tracking-[-0.01em]">
              mind realigned
            </i>
            <p className="text-[15px] leading-[1.55] text-[#E3D5CA] mt-2.5">
              Honest conversations on motherhood, mental health and the relationships around them.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-7 md:gap-16 text-[15px]">
            {/* Explore */}
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-[0.14em] uppercase text-[#E3D5CA] font-semibold">
                Explore
              </span>
              <Link href="/coming-soon?page=Motherhood" className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                Motherhood
              </Link>
              <Link href="/coming-soon?page=Relationships" className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                Relationships
              </Link>
              <Link href="/coming-soon?page=Talks" className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                Talks
              </Link>
              <Link href="/coming-soon?page=About" className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                About
              </Link>
            </div>

            {/* Work with Ashika */}
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-[0.14em] uppercase text-[#E3D5CA] font-semibold">
                Work with Ashika
              </span>
              <Link href="/coming-soon?page=Book a Talk" className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                Book a talk
              </Link>
              <Link href="/coming-soon?page=Press" className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                Press
              </Link>
              <Link href="/coming-soon?page=Contact" className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                Contact
              </Link>
            </div>

            {/* Follow */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-xs tracking-[0.14em] uppercase text-[#E3D5CA] font-semibold">
                Follow
              </span>

              {/* Instagram with Sub Menus */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[#F6E8E2]">
                  Instagram
                </span>
                <div className="flex flex-col gap-1.5 pl-3 border-l border-[#5A4B46]">
                  <a
                    href={SOCIAL_LINKS.instagram_relationships}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] text-[#E3D5CA] hover:text-white transition-colors no-underline"
                  >
                    @ashikamehta.relationships
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram_momrenew}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] text-[#E3D5CA] hover:text-white transition-colors no-underline"
                  >
                    @momrenew
                  </a>
                </div>
              </div>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F6E8E2] hover:text-white transition-colors no-underline"
              >
                YouTube
              </a>
              <a href={SOCIAL_LINKS.substack} className="text-[#F6E8E2] hover:text-white transition-colors no-underline">
                Substack
              </a>
            </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="mt-9 pt-5 border-t border-[#5A4B46] flex flex-col md:flex-row justify-between gap-3 text-[13px] md:text-[14px] leading-relaxed text-[#E3D5CA]">
          <span>
            © {currentYear} Ashika Mehta. Educational content, not a substitute for professional care.
          </span>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <Link href="/coming-soon?page=Support Resources" className="underline hover:text-white transition-colors">
              Support resources
            </Link>
            <Link href="/privacy" className="underline hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="underline hover:text-white transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
