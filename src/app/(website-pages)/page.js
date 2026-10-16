import BestSellers from "@/components/website/Homepage/BestSellers";
import CategorySection from "@/components/website/Homepage/CategorySection";
import Footer from "@/components/website/Footer";
import HeroScroller from "@/components/website/Homepage/HeroScroller";
import NewArrivals from "@/components/website/Homepage/NewArrivals";
import RoomSection from "@/components/website/Homepage/RoomSection";
import CraftSection from "@/components/website/Homepage/CraftSection";
import BenefitsSection from "@/components/website/Homepage/BenefitsSection";
import Testimonials from "@/components/website/Homepage/Testimonials";
import Newsletter from "@/components/website/Homepage/Newsletter";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden rounded-[18px]">
        <HeroScroller />
      </div>
      <CategorySection />
      <BestSellers />
      <NewArrivals />

      <RoomSection />

      <CraftSection />

      <BenefitsSection />

      <Testimonials />

      <Newsletter />
      <Footer />
    </>
  );
}
