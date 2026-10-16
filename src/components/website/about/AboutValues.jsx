import React from "react";
import {
    FiFeather,
    FiHeart,
    FiHexagon,
} from "react-icons/fi";

const values = [
    {
        icon: FiFeather,
        title: "Sustainable Craft",
        description:
            "We source responsibly — FSC-certified woods, natural fibres, and local artisans. Furniture that's good for your home and the planet.",
    },
    {
        icon: FiHexagon,
        title: "Uncompromising Quality",
        description:
            "Every piece passes a 23-point quality check before it reaches your home. We back it with a 5-year warranty.",
    },
    {
        icon: FiHeart,
        title: "Design with Soul",
        description:
            "We don't chase trends. We design furniture that ages gracefully and belongs in every chapter of your life.",
    },
];

export default function AboutValues() {
    return (
        <section className="px-4 pb-10 sm:px-6 lg:px-[22px] lg:pb-14">
            {/* Heading */}
            <div className="mb-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9a6745]">
                    What drives us
                </p>

                <h2 className="mt-2 text-[24px] font-normal text-[#17120f] sm:text-[27px]">
                    Our Values
                </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {values.map((value) => {
                    const Icon = value.icon;

                    return (
                        <div
                            key={value.title}
                            className="min-h-[135px] rounded-[12px] border border-[#e3d9cf] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                        >
                            <Icon
                                size={21}
                                strokeWidth={1.6}
                                className="text-[#9a6240]"
                            />

                            <h3 className="mt-4 text-[13px] font-medium text-[#17120f]">
                                {value.title}
                            </h3>

                            <p className="mt-2 text-[11px] leading-5 text-[#6f6259] sm:text-[12px]">
                                {value.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}