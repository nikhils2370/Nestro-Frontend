"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProductCard from "@/components/website/UI/ProductCard";

export default function RelatedProducts({ products = [] }) {
    console.log(products);
    
  if (!products.length) return null;

  return (
    <section className="border-t border-[#e7e1db] bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94623f]">
              You may also like
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#171717] sm:text-3xl">
              More pieces for your space
            </h2>
          </div>

          {/* Navigation */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              className="related-prev flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd5cd] bg-white text-[#171717] transition hover:border-[#94623f] hover:bg-[#94623f] hover:text-white"
            >
              <FiArrowLeft size={15} />
            </button>

            <button
              type="button"
              className="related-next flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd5cd] bg-white text-[#171717] transition hover:border-[#94623f] hover:bg-[#94623f] hover:text-white"
            >
              <FiArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={18}
          slidesPerView={1.2}
          navigation={{
            prevEl: ".related-prev",
            nextEl: ".related-next",
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 22,
            },
          }}
          className="related-products-swiper !pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
