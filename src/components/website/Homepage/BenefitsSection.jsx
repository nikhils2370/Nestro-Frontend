"use client";

import {
    FiTruck,
    FiRefreshCw,
    FiTool,
    FiShield,
} from "react-icons/fi";

const benefits = [
    {
        icon: FiTruck,
        title: "Free Delivery",
        description: "On all orders above ₹50,000",
    },
    {
        icon: FiRefreshCw,
        title: "30-Day Returns",
        description: "Hassle-free return policy",
    },
    {
        icon: FiTool,
        title: "Expert Assembly",
        description: "Professional setup at home",
    },
    {
        icon: FiShield,
        title: "5-Year Warranty",
        description: "On all furniture items",
    },
];

export default function BenefitsSection() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-[1240px] grid-cols-1 overflow-hidden rounded-[12px] border border-[#e3dbd2] bg-white sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className={`flex min-h-[108px] flex-col items-center justify-center px-4 text-center ${index !== 0
                                    ? "border-t border-[#e3dbd2] sm:border-t-0 sm:border-l"
                                    : ""
                                }`}
                        >
                            <Icon
                                size={20}
                                strokeWidth={1.5}
                                className="text-[#a66d43]"
                            />

                            <h3 className="mt-3 text-[12px] font-medium text-[#171717]">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-[10px] text-[#8b8580]">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}