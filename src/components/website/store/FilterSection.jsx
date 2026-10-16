"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiCheck } from "react-icons/fi";

export default function FilterSection({ title, items = [], queryKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams =
    searchParams?.get(queryKey)?.split(",").filter(Boolean) || [];

  function queryHandle(slug) {
    const params = new URLSearchParams(searchParams.toString());

    let selectedItems = params.get(queryKey)?.split(",").filter(Boolean) || [];

    // Toggle selected item
    if (selectedItems.includes(slug)) {
      selectedItems = selectedItems.filter((item) => item !== slug);
    } else {
      selectedItems = [...selectedItems, slug];
    }

    // Update query
    if (selectedItems.length > 0) {
      params.set(queryKey, selectedItems.join(","));
    } else {
      params.delete(queryKey);
    }

    // Reset pagination
    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/store?${queryString}` : "/store", {
      scroll: false,
    });
  }

  return (
    <section className="border-b border-stone-200 pb-6">
      {/* Header */}
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#302820]">
              {title}
            </h3>

            <p className="mt-1 text-[10px] text-stone-400">
              {items.length > 0
                ? `${items.length} options available`
                : "No options available"}
            </p>
          </div>

          {/* Selected Count */}
          {currentParams.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#94623f] px-1.5 text-[9px] font-semibold text-white">
              {currentParams.length}
            </span>
          )}
        </div>
      )}

      {/* Filter Items */}
      {items.length > 0 ? (
        <div className="space-y-1">
          {items.map((item, index) => {
            const active = currentParams.includes(item.slug);

            return (
              <label
                key={item._id || item.id || item.slug || index}
                className={`group flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition-all duration-200 ${
                  active ? "bg-[#f6f0eb]" : "hover:bg-stone-50"
                }`}
              >
                {/* Custom Checkbox */}
                <span
                  className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[4px] border transition-all duration-200 ${
                    active
                      ? "border-[#94623f] bg-[#94623f]"
                      : "border-stone-300 bg-white group-hover:border-[#94623f]"
                  }`}
                >
                  {active && (
                    <FiCheck
                      size={11}
                      strokeWidth={2.5}
                      className="text-white"
                    />
                  )}

                  <input
                    type="checkbox"
                    value={item.slug}
                    checked={active}
                    onChange={() => queryHandle(item.slug)}
                    className="sr-only"
                  />
                </span>

                {/* Item Name */}
                <span
                  className={`flex-1 text-[11px] transition-colors ${
                    active
                      ? "font-medium text-[#94623f]"
                      : "text-[#514942] group-hover:text-[#94623f]"
                  }`}
                >
                  {item.name.toUpperCase()}
                </span>

                {/* Count */}
                {item.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-[2px] text-[9px] ${
                      active
                        ? "bg-white text-[#94623f]"
                        : "bg-stone-100 text-[#927b68]"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 px-3 py-5 text-center">
          <p className="text-[11px] font-medium text-stone-500">
            No items found
          </p>

          <p className="mt-1 text-[9px] text-stone-400">Try another filter</p>
        </div>
      )}
    </section>
  );
}
