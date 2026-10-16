"use client";

import { useEffect } from "react";
import { FiRefreshCw, FiHome } from "react-icons/fi";
import Link from "next/link";

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-5">
            <div className="w-full max-w-[560px] text-center">

                {/* Logo */}
                <div className="mb-10">
                    <span className="text-[20px] font-medium tracking-[0.18em] text-[#211812]">
                        NESTRO.
                    </span>
                </div>

                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eee5dc] text-[#93603e]">
                    <span className="text-2xl">!</span>
                </div>

                <p className="mt-7 text-[10px] font-medium tracking-[0.3em] text-[#a16d49]">
                    SOMETHING WENT WRONG
                </p>

                <h1 className="mt-4 text-2xl font-light text-[#201a16] sm:text-3xl">
                    We couldn&apos;t load this page.
                </h1>

                <p className="mx-auto mt-4 max-w-[420px] text-sm leading-6 text-[#81766d]">
                    Something unexpected happened. Please try again,
                    or return to the Nestro homepage.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-[#93603e] px-6 py-3 text-[11px] font-medium text-white transition hover:bg-[#7f5133]"
                    >
                        <FiRefreshCw size={14} />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-[#d8cabe] bg-white px-6 py-3 text-[11px] font-medium text-[#5c4b3e] transition hover:bg-[#f3eee9]"
                    >
                        <FiHome size={14} />
                        Back Home
                    </Link>

                </div>
            </div>
        </main>
    );
}