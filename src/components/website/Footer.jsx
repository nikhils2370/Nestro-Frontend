"use client";

import Link from "next/link";
import {
    FiInstagram,
    FiYoutube,
    FiChevronRight,
} from "react-icons/fi";

const companyLinks = [
    ["Our Story", "/about"],
    ["Sustainability", "/sustainability"],
    ["Showrooms", "/showrooms"],
    ["Careers", "/careers"],
];

const supportLinks = [
    ["Track Order", "/track-order"],
    ["Returns & Exchange", "/returns"],
    ["Assembly Help", "/assembly"],
    ["Contact Us", "/contact"],
];

const socialLinks = [
    ["Instagram", "/"],
    ["Pinterest", "/"],
    ["Houzz", "/"],
];

export default function Footer() {
    return (
        <footer className="bg-[#181108] px-5 pb-5 pt-10 text-white sm:px-8 lg:px-[22px]">
            <div className="mx-auto max-w-[1400px]">
                <div className="grid grid-cols-2 gap-9 md:grid-cols-5">
                   
                    <div className="md:col-span-2 lg:col-span-2">
                        <Link
                            href="/"
                            className="text-[16px] tracking-[0.16em]"
                        >
                            NESTRO.
                        </Link>

                        <p className="mt-3 max-w-[470px] text-[11px] leading-[1.7] text-[#756b61]">
                            Curated furniture for thoughtful homes. Crafted with
                            intention, made to endure.
                        </p>

                        <form className="mt-4 hidden sm:flex max-w-[475px] overflow-hidden rounded-[4px] border border-[#55473a]">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="min-w-0 flex-1 bg-[#251c14] px-3 py-2 text-[11px] text-white outline-none placeholder:text-[#756b61]"
                            />

                            <button className="bg-[#9d6841] px-5 text-[11px] font-medium">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <FooterColumn title="COMPANY" links={companyLinks} />

                    <FooterColumn title="SUPPORT" links={supportLinks} />

                    <div>
                        <p className="text-[9px] tracking-[0.25em] text-[#c18a5e]">
                            FOLLOW US
                        </p>

                        <div className="mt-3 space-y-2">
                            {socialLinks.map(([name, href]) => (
                                <Link
                                    key={name}
                                    href={href}
                                    className="block text-[11px] text-[#756b61] transition hover:text-white"
                                >
                                    {name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <SocialButton>
                                <FiInstagram size={13} />
                            </SocialButton>

                            <SocialButton>
                                <span className="text-[10px] font-bold">P</span>
                            </SocialButton>

                            <SocialButton>
                                <FiYoutube size={13} />
                            </SocialButton>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-[#30271f] pt-5 text-[9px] text-[#635a52] sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Nestro. All rights reserved.</p>

                    <div className="flex gap-3">
                        <Link href="/privacy">Privacy</Link>
                        <span>•</span>
                        <Link href="/terms">Terms</Link>
                        <span>•</span>
                        <Link href="/sitemap">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }) {
    return (
        <div>
            <p className="text-[9px] tracking-[0.25em] text-[#c18a5e]">
                {title}
            </p>

            <div className="mt-3 space-y-2">
                {links.map(([name, href]) => (
                    <Link
                        key={name}
                        href={href}
                        className="block text-[11px] text-[#756b61] transition hover:text-white"
                    >
                        {name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function SocialButton({ children }) {
    return (
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#57483a] text-[#c18a5e] transition hover:border-[#c18a5e]">
            {children}
        </button>
    );
}