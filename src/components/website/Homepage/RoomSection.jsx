"use client";

const rooms = [
    {
        name: "Living Room",
        count: "98 pieces",
        className: "lg:row-span-2",
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    },
    {
        name: "Bedroom",
        count: "31 pieces",
        image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Study & Storage",
        count: "19 pieces",
        image:
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Dining Room",
        count: "28 pieces",
        image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Home Office",
        count: "24 pieces",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    },
];

export default function RoomSection() {
    return (
        <section className="px-4 pb-10 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">
                <p className="text-[9px] font-medium tracking-[0.28em] text-[#9a6c4c]">
                    CURATED BY SPACE
                </p>

                <h2 className="mt-2 text-[18px] text-[#171717]">
                    Shop by Room
                </h2>

                <div className="mt-5 grid gap-y-[17%] grid-cols-1 gap-3 md:grid-cols-2 lg:h-[380px] lg:grid-cols-3 lg:grid-rows-2">
                    {rooms.map((room) => (
                        <div
                            key={room.name}
                            className={`group relative min-h-[210px] overflow-hidden rounded-[12px] text-left ${room.className}`}
                        >
                            <img
                                src={room.image}
                                alt={room.name}
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                            {/* Text */}
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-[15px] font-medium">
                                    {room.name}
                                </h3>

                                <p className="mt-1 text-[10px] text-white/70">
                                    {room.count}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}