import React from "react";

const team = [
    {
        initials: "AK",
        name: "Aarav Kumar",
        role: "Founder & CEO",
    },
    {
        initials: "SM",
        name: "Sanya Mehta",
        role: "Head of Design",
    },
    {
        initials: "VR",
        name: "Vikram Rao",
        role: "Chief Craftsman",
    },
    {
        initials: "PJ",
        name: "Preet Joshi",
        role: "Customer Experience",
    },
];

export default function AboutTeam() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:px-5 lg:py-10">
            <div className="mb-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9a6745]">
                    The people behind Nestro
                </p>

                <h2 className="mt-2 text-[24px] font-normal leading-tight text-[#17120f] sm:text-[27px]">
                    Our Team
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((member) => (
                    <div
                        key={member.initials}
                        className="overflow-hidden rounded-[11px] border border-[#e3d9cf] bg-white"
                    >
                        {/* Initial */}
                        <div className="flex h-[120px] items-center justify-center bg-[#f0ebe4] sm:h-[135px]">
                            <span className="text-[32px] font-light tracking-wide text-[#98623f]">
                                {member.initials}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="px-3.5 py-4">
                            <h3 className="text-[12px] font-medium text-[#17120f]">
                                {member.name}
                            </h3>

                            <p className="mt-0.5 text-[10px] text-[#776b62]">
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}