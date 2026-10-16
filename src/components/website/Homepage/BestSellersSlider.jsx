"use client";

import Link from "next/link";
import ProductCard from "@/components/website/UI/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BestSellersSlider({ products = [] }) {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={12}
        navigation={{
          nextEl: ".best-sellers-next",
          prevEl: ".best-sellers-prev",
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 28,
          },

          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="best-sellers-swiper !pb-10"
      >
        {/* Products */}
        {products.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}

        {/* View All Card */}
        <SwiperSlide>
          <Link
            href="/store"
            className="group block overflow-hidden rounded-[11px] border border-[#e2d9d0] bg-white transition-all duration-300 scale-100 hover:scale-[0.98] hover:shadow-md"
          >
            <div className="flex h-full min-h-[290px] rounded-[11px] w-full flex-col items-center justify-center border border-[#e5ddd6] bg-[#f8f5f1] px-6 text-center transition-all duration-300 hover:border-[#9a6c4c] hover:bg-[#f3eee8]">
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c7b8] bg-white text-[#9a6c4c] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#9a6c4c] group-hover:text-white">
                <FiArrowUpRight size={23} />
              </div>

              <p className="text-[9px] font-medium tracking-[0.28em] text-[#9a6c4c]">
                EXPLORE MORE
              </p>

              <h3 className="mt-3 text-[20px] font-normal text-[#171717]">
                View All Products
              </h3>

              <p className="mt-2 max-w-[200px] text-[11px] leading-5 text-[#77706a]">
                Discover our complete collection of furniture and décor.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 border-b border-[#9a6c4c] pb-1 text-[11px] text-[#9a6c4c]">
                Explore Store
                <FiArrowRight size={13} />
              </span>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>

      {/* Previous Button */}
      <button
        type="button"
        className="best-sellers-prev absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4d9d0] bg-white/95 text-[#4d433c] shadow-[0_4px_15px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1/2 hover:border-[#9a6c4c] hover:bg-[#9a6c4c] hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:left-3"
        aria-label="Previous products"
      >
        <FiArrowLeft size={18} strokeWidth={1.5} />
      </button>

      {/* Next Button */}
      <button
        type="button"
        className="best-sellers-next absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4d9d0] bg-white/95 text-[#4d433c] shadow-[0_4px_15px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1/2 hover:border-[#9a6c4c] hover:bg-[#9a6c4c] hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:right-3"
        aria-label="Next products"
      >
        <FiArrowRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}