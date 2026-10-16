"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Pagination({ totalPages = 1 }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(totalPages);
  

  // URL me page nahi hai to page 1
  const currentPage =
    Number(searchParams.get("page")) || 1;

  // Sirf 1 page hai to pagination hide
  if (totalPages <= 1) {
    return null;
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));

    router.push(`/store?${params.toString()}`, {
      scroll: true,
    });
  }

  return (
    <div className="mt-10 flex justify-center pb-5">
      <div className="flex items-center gap-1.5">

        {/* Previous */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
            currentPage <= 1
              ? "cursor-not-allowed border-[#eee8e2] text-[#c8c0b9]"
              : "border-[#E8E0D5] bg-white text-[#6B7280] hover:border-[#8B5E3C] hover:bg-[#faf7f4] hover:text-[#8B5E3C]"
          }`}
          aria-label="Previous page"
        >
          <FaChevronLeft size={11} />
        </button>

        {/* Page Numbers */}
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => {
          const active = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={active ? "page" : undefined}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-all ${
                active
                  ? "border-[#8B5E3C] bg-[#8B5E3C] text-white shadow-sm"
                  : "border-[#E8E0D5] bg-white text-[#6B7280] hover:border-[#C6A27E] hover:bg-[#faf7f4] hover:text-[#8B5E3C]"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
            currentPage >= totalPages
              ? "cursor-not-allowed border-[#eee8e2] text-[#c8c0b9]"
              : "border-[#E8E0D5] bg-white text-[#6B7280] hover:border-[#8B5E3C] hover:bg-[#faf7f4] hover:text-[#8B5E3C]"
          }`}
          aria-label="Next page"
        >
          <FaChevronRight size={11} />
        </button>
      </div>
    </div>
  );
}