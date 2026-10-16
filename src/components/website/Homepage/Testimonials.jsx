"use client";

const testimonials = [
    {
        initials: "PR",
        name: "Priya Rao",
        city: "Mumbai",
        review:
            '"The Ember Velvet sofa is absolutely stunning. Delivery was flawless and the quality is beyond what I expected."',
    },
    {
        initials: "AS",
        name: "Arjun Sharma",
        city: "Bangalore",
        review:
            '"Nestro transformed our living room. Every piece feels like it belongs — timeless and beautifully crafted."',
    },
    {
        initials: "NK",
        name: "Neha Kapoor",
        city: "Delhi",
        review:
            '"Premium quality at a fair price. The travertine side table is a conversation starter every time."',
    },
];

export default function Testimonials() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">
                <p className="text-[9px] font-medium tracking-[0.28em] text-[#9a6c4c]">
                    WHAT OUR CUSTOMERS SAY
                </p>

                <h2 className="mt-2 text-[18px] font-normal text-[#171717]">
                    Loved by 12,000+ homes
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {testimonials.map((item) => (
                        <article
                            key={item.name}
                            className="rounded-[12px] border border-[#e3dbd2] bg-white p-5 sm:p-6"
                        >
                            {/* Stars */}
                            <div className="text-[11px] tracking-[1px] text-[#c29373]">
                                ★★★★★
                            </div>

                            {/* Review */}
                            <p className="mt-3 text-[13px] italic leading-[1.7] text-[#594f48]">
                                {item.review}
                            </p>

                            {/* Customer */}
                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ece6] text-[9px] font-medium text-[#9a6c4c]">
                                    {item.initials}
                                </div>

                                <div>
                                    <p className="text-[11px] font-medium text-[#202020]">
                                        {item.name}
                                    </p>

                                    <p className="text-[9px] text-[#858585]">
                                        {item.city}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}