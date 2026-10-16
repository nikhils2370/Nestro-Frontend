"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FiChevronLeft,
    FiChevronRight,
    FiArrowRight,
} from "react-icons/fi";

const slides = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1748679979601-dc9ec43d900d?auto=format&fit=crop&w=1400&q=80",
        eyebrow: "SUMMER COLLECTION 2026",
        title: (
            <>
                Where Comfort
                <br />
                Meets <span>Craft</span>
            </>
        ),
        description: (
            <>
                Scandinavian-inspired furniture for modern living.
                <br className="hidden sm:block" />
                Curated pieces that endure seasons.
            </>
        ),
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=80",
        eyebrow: "TIMELESS DESIGN",
        title: (
            <>
                Designed for
                <br />
                <span>Everyday Living</span>
            </>
        ),
        description: (
            <>
                Thoughtfully designed furniture made for
                <br className="hidden sm:block" />
                beautiful everyday moments.
            </>
        ),
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
        eyebrow: "CRAFTED WITH CARE",
        title: (
            <>
                Simple Forms.
                <br />
                <span>Beautiful Spaces.</span>
            </>
        ),
        description: (
            <>
                Refined materials and timeless silhouettes
                <br className="hidden sm:block" />
                created to last.
            </>
        ),
    },
];

export default function HeroScroller() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const previousSlide = () => {
        setCurrent(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section className="w-full px-4 pt-5 sm:px-6 lg:px-8">
            <div
                className="relative mx-auto h-[420px] w-full max-w-[1400px] overflow-hidden rounded-[18px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ${index === current
                                ? "z-10 opacity-100"
                                : "z-0 opacity-0"
                            }`}
                    >
                        {/* Image */}
                        <img
                            src={slide.image}
                            alt={slide.eyebrow}
                            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ${index === current ? "scale-105" : "scale-100"
                                }`}
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

                        {/* Bottom overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="px-8 sm:px-12 lg:px-[52px]">
                                <div className="max-w-[540px] text-white">

                                    {/* Eyebrow */}
                                    <p className="mb-5 text-[9px] font-medium tracking-[0.28em] text-[#d79a68] sm:text-[10px]">
                                        {slide.eyebrow}
                                    </p>

                                    {/* Heading */}
                                    <h1 className="text-[38px] font-light leading-[1.12] tracking-[-0.02em] sm:text-[48px] lg:text-[54px]">
                                        {slide.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="mt-5 text-[13px] font-light leading-[1.8] text-white/70 sm:text-[14px]">
                                        {slide.description}
                                    </p>

                                    {/* Buttons */}
                                    <div className="mt-7 flex flex-wrap gap-3">
                                        <Link
                                            href="/store"
                                            className="group flex h-10 items-center gap-2 rounded-[4px] bg-[#a66e44] px-5 text-[12px] font-medium tracking-wide text-white transition-all hover:bg-[#b77d51]"
                                        >
                                            Shop Collection

                                            <FiArrowRight
                                                size={14}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </Link>

                                        <Link
                                            href="/lookbook"
                                            className="flex h-10 items-center rounded-[4px] border border-white/30 px-5 text-[12px] font-medium tracking-wide text-white transition-all hover:bg-white/10"
                                        >
                                            View Lookbook
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Previous */}
                <button
                    onClick={previousSlide}
                    aria-label="Previous slide"
                    className="absolute left-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-5"
                >
                    <FiChevronLeft size={18} />
                </button>

                {/* Next */}
                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-5"
                >
                    <FiChevronRight size={18} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-7 left-8 z-30 flex gap-2 sm:left-[52px]">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-[3px] rounded-full transition-all duration-500 ${index === current
                                    ? "w-6 bg-[#dba170]"
                                    : "w-[22px] bg-white/35 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}