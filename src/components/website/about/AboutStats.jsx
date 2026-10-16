import React from "react";

const stats = [
    {
        value: "12K+",
        label: "Homes transformed",
    },
    {
        value: "280+",
        label: "Curated products",
    },
    {
        value: "8",
        label: "Showrooms across India",
    },
    {
        value: "4.9★",
        label: "Average rating",
    },
];

export default function AboutStats() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:px-[22px] lg:py-12">
            <div className="grid grid-cols-2 overflow-hidden rounded-[12px] border border-[#e3d9cf] bg-white lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`
              flex min-h-[105px] flex-col items-center justify-center px-4 text-center
              ${index !== 0 ? "border-l border-[#e8dfd7]" : ""}
              ${index >= 2 ? "border-t border-[#e8dfd7] lg:border-t-0" : ""}
            `}
                    >
                        <div className="text-[29px] font-light leading-none text-[#98623f] sm:text-[31px]">
                            {stat.value}
                        </div>

                        <p className="mt-2 text-[10px] text-[#6f6259] sm:text-[11px]">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}