"use client";

import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function CraftSection() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[16px] bg-[#2d2118]">
                <div className="grid min-h-[340px] grid-cols-1 lg:grid-cols-2">
                    {/* Content */}
                    <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-[52px]">
                        <p className="text-[9px] font-medium tracking-[0.28em] text-[#d09360]">
                            OUR CRAFT
                        </p>

                        <h2 className="mt-4 max-w-[430px] text-[28px] font-light leading-[1.15] text-white sm:text-[30px]">
                            Built by artisans who
                            <br />
                            <span className="italic text-[#d6ad8a]">
                                still use their hands
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[510px] text-[13px] leading-[1.8] text-[#b9aca1]">
                            Every Nestro piece passes through a small workshop in Jodhpur
                            before it reaches your home — solid joinery, hand-finished
                            grains, and fabrics tested for years of daily life, not just a
                            showroom photo.
                        </p>

                        {/* Stats */}
                        <div className="mt-7 flex flex-wrap gap-8 sm:gap-12">
                            <div>
                                <p className="text-[22px] font-light text-white">
                                    12,000+
                                </p>
                                <p className="mt-1 text-[9px] tracking-wide text-[#9f9185]">
                                    HOMES FURNISHED
                                </p>
                            </div>

                            <div>
                                <p className="text-[22px] font-light text-white">
                                    18 yrs
                                </p>
                                <p className="mt-1 text-[9px] tracking-wide text-[#9f9185]">
                                    OF CRAFTSMANSHIP
                                </p>
                            </div>

                            <div>
                                <p className="text-[22px] font-light text-white">
                                    4.8/5
                                </p>
                                <p className="mt-1 text-[9px] tracking-wide text-[#9f9185]">
                                    AVERAGE RATING
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative min-h-[280px] lg:min-h-full">
                        <img
                            src="https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1000&q=80"
                            alt="Nestro craftsmanship"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}