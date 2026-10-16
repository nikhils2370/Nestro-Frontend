import React from "react";

const STORY_IMAGE =
    "https://images.unsplash.com/photo-1748679979601-dc9ec43d900d?auto=format&fit=crop&w=1400&q=80";

export default function AboutStory() {
    return (
        <section className="px-4 sm:px-6 lg:px-[22px]">
            <div className="overflow-hidden rounded-[15px] bg-[#2d2017]">
                <div className="grid min-h-[430px] grid-cols-1 lg:grid-cols-2">

                    {/* Content */}
                    <div className="flex items-center px-7 py-12 sm:px-10 lg:px-14">
                        <div className="max-w-[580px]">

                            <h1 className="text-[32px] font-light leading-[1.15] text-white sm:text-[38px] lg:text-[40px]">
                                Furniture crafted with{" "}
                                <span className="font-serif italic text-[#d5ad8d]">
                                    purpose
                                </span>
                            </h1>

                            <p className="mt-5 max-w-[600px] text-[13px] leading-6 text-[#a99b90] sm:text-[14px]">
                                Founded in 2018, Nestro was born from a belief that beautiful
                                furniture shouldn&apos;t be a luxury. We work directly with
                                master craftsmen across India and Scandinavia to bring you
                                pieces that are honest in material, thoughtful in design, and
                                built to outlast trends.
                            </p>

                        </div>
                    </div>

                    {/* Image */}
                    <div className="p-5 sm:p-7 lg:p-14 lg:pl-0">
                        <div className="h-full min-h-[260px] overflow-hidden rounded-[14px]">
                            <img
                                src={STORY_IMAGE}
                                alt="Nestro furniture craftsmanship"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}