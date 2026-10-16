"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronDown, FiSliders } from "react-icons/fi";

export default function SortBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "newest";

  function queryHandle(value) {
    const params = new URLSearchParams(searchParams.toString());

    // Set sort
    params.set("sort", value);

    // Reset pagination after sorting
    params.delete("page");

    const queryString = params.toString();

    router.push(
      queryString ? `/store?${queryString}` : "/store",
      {
        scroll: false,
      }
    );
  }

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-[#E8E0D5] bg-white px-4 py-3 shadow-[0_2px_10px_rgba(45,33,24,0.03)] sm:flex-row sm:items-center sm:justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6F0EB] text-[#94623F]">
          <FiSliders size={15} />
        </div>

        <div>
          <p className="text-[11px] font-semibold text-[#302820]">
            Sort Products
          </p>

          <p className="text-[9px] text-[#9A8F86]">
            Choose how products are displayed
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wide text-[#9A8F86]">
          Sort by
        </span>

        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => queryHandle(e.target.value)}
            className="h-9 min-w-[165px] cursor-pointer appearance-none rounded-lg border border-[#E8E0D5] bg-[#FAF8F6] px-3 pr-9 text-[11px] font-medium text-[#302820] outline-none transition-all duration-200 hover:border-[#C6A27E] focus:border-[#94623F] focus:ring-2 focus:ring-[#94623F]/10"
          >
            <option value="newest">
              Newest
            </option>

            <option value="asc">
              Price: Low to High
            </option>

            <option value="desc">
              Price: High to Low
            </option>
          </select>

          {/* Custom Arrow */}
          <FiChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94623F]"
          />
        </div>
      </div>
    </div>
  );
}