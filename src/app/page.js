import { Suspense } from "react";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import LogoBand from "@/components/band/LogoBand";
import SoundDoors from "@/components/sound/SoundDoors";
import GlobalImpact from "@/components/story/GlobalImpact";
import FeaturedConversations from "@/components/talks/FeaturedConversations";
import Testimonials from "@/components/voices/Testimonials";
import ExploreCourses from "@/components/courses/ExploreCourses";
import LeadCapture from "@/components/glimpse/LeadCapture";
import FAQ from "@/components/faq/FAQ";
import StayInTheLoop_1 from "@/components/begin/StayInTheLoop_1";
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import WorkShop from "@/components/workshop/WorkShop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2A211E] font-['DM_Sans',system-ui,sans-serif]">
      {/* Sticky Header */}
      <Header />

      {/* Top Hero with peach gradient background */}
      <div className="bg-[linear-gradient(180deg,#F8EAE5_0%,#EAC8BA_100%)] relative">
        <Hero />
      </div>

      {/* Marquee Logo Band */}
      <LogoBand />

      {/* "Is this you?" - Sound Doors */}
      <SoundDoors />

      {/* "Small steps" - Global Impact */}
      <GlobalImpact />

      {/* Featured Podcast Conversations */}
      <FeaturedConversations />

      {/* Community Testimonials */}
      <Suspense fallback={<div className="h-96" />}>
        <Testimonials />
      </Suspense>

      {/* Explore Resources / Courses */}
      {/* <Suspense fallback={<div className="h-96" />}>
        <ExploreCourses />
      </Suspense> */}

      {/* Lead Capture Free Gift Form */}
      <LeadCapture />

      {/* Join our next workshop */}
      <WorkShop />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Stay in the Loop Socials & Substack */}
      <StayInTheLoop_1 />

      {/* Footer */}
      <Footer />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
