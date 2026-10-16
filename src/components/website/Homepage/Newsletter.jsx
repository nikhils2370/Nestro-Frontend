"use client";

import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) return;

        console.log("Subscribe:", email);
        setEmail("");
    };

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-7 rounded-[14px] bg-[#1d140c] px-7 py-8 sm:px-9 lg:flex-row lg:items-center lg:px-8">
                {/* Content */}
                <div>
                    <p className="text-[9px] font-medium tracking-[0.28em] text-[#d09360]">
                        STAY IN THE LOOP
                    </p>

                    <h2 className="mt-2 text-[20px] font-light text-white">
                        Design tips & new arrivals
                    </h2>

                    <p className="mt-2 text-[12px] text-[#91867c]">
                        Join 8,000 subscribers who get exclusive first looks.
                    </p>
                </div>

                {/* Form */}
                <div className="w-full max-w-[370px]">
                    <form
                        onSubmit={handleSubmit}
                        className="flex overflow-hidden rounded-[4px] border border-[#665344]"
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="min-w-0 flex-1 bg-[#2b2118] px-3 text-[11px] text-white outline-none placeholder:text-[#75695f]"
                        />

                        <button
                            type="submit"
                            className="bg-[#9d6841] px-4 text-[11px] font-medium text-white transition hover:bg-[#b3784e]"
                        >
                            Subscribe
                        </button>
                    </form>

                    <p className="mt-2 text-right text-[9px] text-[#6f6258]">
                        No spam. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}