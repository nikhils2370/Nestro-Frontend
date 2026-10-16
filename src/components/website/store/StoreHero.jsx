"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function StoreHero() {
    return (
        <section className="px-4 pb-6 pt-5 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[16px] bg-[#3a281b] lg:grid-cols-[0.95fr_1fr]">
                {/* Content */}
                <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-[52px]">
                    <p className="text-[9px] font-medium tracking-[0.28em] text-[#d39a68]">
                        NEW COLLECTION — SS 2026
                    </p>

                    <h1 className="mt-4 text-[32px] font-light leading-[1.1] text-white sm:text-[38px]">
                        Modern Living
                        <br />
                        <span className="italic text-[#d8b08e]">
                            Collection
                        </span>
                    </h1>

                    <p className="mt-5 max-w-[390px] text-[12px] leading-[1.8] text-[#b8aca1] sm:text-[13px]">
                        Timeless furniture crafted for elegant spaces.
                        <br />
                        Designed with intention, built to endure.
                    </p>

                    <Link
                        href="/store"
                        className="group mt-6 flex w-fit items-center gap-2 rounded-[4px] bg-[#a56d43] px-5 py-3 text-[11px] font-medium tracking-wide text-white transition hover:bg-[#b77b4f]"
                    >
                        Explore Collection

                        <FiArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Image */}
                <div className="relative min-h-[250px] sm:min-h-[320px] lg:min-h-[265px]">
                    <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                        alt="Modern living room"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}