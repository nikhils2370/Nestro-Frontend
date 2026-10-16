import Link from "next/link";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-5">
            <div className="w-full max-w-[600px] text-center">

                {/* Logo */}
                <div className="mb-10">
                    <span className="text-[20px] font-medium tracking-[0.18em] text-[#211812]">
                        NESTRO.
                    </span>
                </div>

                {/* 404 */}
                <p className="text-[90px] font-light leading-none tracking-[-0.05em] text-[#3a281d] sm:text-[130px]">
                    404
                </p>

                <p className="mt-5 text-[10px] font-medium tracking-[0.3em] text-[#a16d49]">
                    PAGE NOT FOUND
                </p>

                <h1 className="mt-4 text-2xl font-light text-[#201a16] sm:text-3xl">
                    This space doesn&apos;t exist.
                </h1>

                <p className="mx-auto mt-4 max-w-[430px] text-sm leading-6 text-[#81766d]">
                    The page you&apos;re looking for may have moved,
                    been removed, or never existed in the first place.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-[#93603e] px-6 py-3 text-[11px] font-medium text-white transition hover:bg-[#7f5133]"
                    >
                        <FiHome size={14} />
                        Back Home
                    </Link>

                    <Link
                        href="/store"
                        className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-[#d8cabe] bg-white px-6 py-3 text-[11px] font-medium text-[#5c4b3e] transition hover:bg-[#f3eee9]"
                    >
                        <FiArrowLeft size={14} />
                        Browse Store
                    </Link>

                </div>
            </div>
        </main>
    );
}