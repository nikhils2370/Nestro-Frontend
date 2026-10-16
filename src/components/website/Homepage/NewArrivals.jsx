"use client";

import Link from "next/link";
import { FiTruck } from "react-icons/fi";

const products = {
    wardrobe: {
        category: "BEDROOM",
        name: "Linen Wardrobe",
        price: "₹1,18,000",
        rating: "★★★★★",
        image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
    },

    console: {
        category: "MEDIA",
        name: "Walnut TV Console",
        price: "₹67,000",
        rating: "★★★★",
        image:
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=700&q=80",
    },
};

export default function NewArrivals() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <p className="text-[9px] tracking-[0.28em] text-[#9a6c4c]">
                            NEW ARRIVALS
                        </p>

                        <h2 className="mt-2 text-[18px] text-[#171717]">
                            Just Landed
                        </h2>
                    </div>

                    <Link
                        href="/store"
                        className="text-[11px] text-[#9a6c4c] underline-offset-4 hover:underline"
                    >
                        View all
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.55fr_0.86fr_0.86fr]">
                    {/* Featured */}
                    <div className="overflow-hidden rounded-[12px] bg-[#2d2118] p-7 text-white sm:p-8">
                        <p className="text-[9px] tracking-[0.25em] text-[#d09360]">
                            FEATURED
                        </p>

                        <h3 className="mt-3 text-[20px] font-light leading-[1.2]">
                            Scandinavian
                            <br />
                            Dining Set
                        </h3>

                        <p className="mt-2 text-[12px] text-[#aaa097]">
                            Ash wood + linen chairs. Set of 4.
                        </p>

                        <p className="mt-4 text-[18px] font-light">
                            ₹1,24,000
                        </p>

                        <button className="mt-5 rounded-[4px] bg-[#a66d43] px-5 py-2 text-[11px] font-medium transition hover:bg-[#b87c51]">
                            View in Store
                        </button>

                        <div className="mt-4 h-[100px] overflow-hidden rounded-[7px] sm:h-[120px]">
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                                alt="Dining set"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Middle cards */}
                    <div className="flex flex-col gap-4">
                        <ProductSmall product={products.wardrobe} />
                        <ProductSmall product={products.console} />
                    </div>

                    {/* Offer */}
                    <div className="flex flex-col gap-4">
                        <div className="rounded-[12px] border border-[#e2d8cc] bg-[#f4ede4] p-5">
                            <p className="text-[9px] tracking-[0.25em] text-[#9a6c4c]">
                                OFFER
                            </p>

                            <h3 className="mt-3 text-[14px] font-medium">
                                First order 15% off
                            </h3>

                            <p className="mt-1 text-[11px] text-[#766b63]">
                                Use code Nestro15 at checkout
                            </p>

                            <button className="mt-3 rounded-[4px] bg-[#9d6841] px-4 py-2 text-[10px] font-medium text-white">
                                Shop Now
                            </button>
                        </div>

                        <div className="flex flex-1 flex-col rounded-[12px] border border-[#e2d8cc] bg-white p-5">
                            <p className="text-[9px] tracking-[0.25em] text-[#9a6c4c]">
                                FREE DELIVERY
                            </p>

                            <h3 className="mt-3 text-[13px] font-medium">
                                On orders above ₹50,000
                            </h3>

                            <p className="mt-1 text-[10px] text-[#7e756d]">
                                White glove service. Assembly included.
                            </p>

                            <FiTruck
                                className="mt-5 text-[#a66d43]"
                                size={21}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProductSmall({ product }) {
    return (
        <Link
            href="/store"
            className="group overflow-hidden rounded-[12px] border border-[#e2d8cc] bg-white"
        >
            <div className="h-[120px] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-3">
                <p className="text-[8px] tracking-[0.2em] text-[#9a6c4c]">
                    {product.category}
                </p>

                <div className="flex items-center justify-between gap-2">
                    <h3 className="mt-1 text-[11px] font-medium">
                        {product.name}
                    </h3>

                    <span className="whitespace-nowrap text-[11px] font-medium">
                        {product.price}
                    </span>
                </div>

                <p className="mt-1 text-[9px] tracking-[1px] text-[#bd9478]">
                    {product.rating}
                </p>
            </div>
        </Link>
    );
}