"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiDollarSign, FiRotateCcw } from "react-icons/fi";

export default function PriceFilter() {
  const [min_price, set_min_price] = useState(300);
  const [max_price, set_max_price] = useState(1000);

  const router = useRouter();
  const searchParams = useSearchParams();

  // URL se price values lena
  useEffect(() => {
    const minParam = searchParams.get("min_price");
    const maxParam = searchParams.get("max_price");

    set_min_price(minParam !== null ? Number(minParam) : 300);
    set_max_price(maxParam !== null ? Number(maxParam) : 1000);
  }, [searchParams]);

  // Apply price filter
  function handleApplyPrice() {
    if (min_price > max_price) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("min_price", min_price);
    params.set("max_price", max_price);

    router.push(`/store?${params.toString()}`, {
      scroll: false,
    });
  }

  // Remove price filter
  function removePriceFilter() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("min_price");
    params.delete("max_price");

    router.push(`/store?${params.toString()}`, {
      scroll: false,
    });
  }

  const isInvalid = min_price > max_price;

  return (
    <section className="border-b border-stone-200 pb-7">
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-stone-900">
            Price Range
          </h3>

          <p className="mt-1 text-xs text-stone-500">
            Select your preferred price
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
          <FiDollarSign size={17} />
        </div>
      </div>

      {/* Price Inputs */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        {/* Minimum */}
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-stone-500">
            Minimum
          </label>

          <div
            className={`flex h-11 items-center overflow-hidden rounded-lg border bg-white transition ${
              isInvalid
                ? "border-red-400 focus-within:border-red-500"
                : "border-stone-300 focus-within:border-amber-600"
            }`}
          >
            <span className="pl-3 text-sm text-stone-400">₹</span>

            <input
              type="number"
              min={300}
              value={min_price}
              onChange={(e) => set_min_price(Number(e.target.value))}
              placeholder="300"
              className="h-full w-full bg-transparent px-2 text-sm text-stone-800 outline-none"
            />
          </div>
        </div>

        {/* Separator */}
        <span className="mt-6 text-sm text-stone-400">—</span>

        {/* Maximum */}
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-stone-500">
            Maximum
          </label>

          <div
            className={`flex h-11 items-center overflow-hidden rounded-lg border bg-white transition ${
              isInvalid
                ? "border-red-400 focus-within:border-red-500"
                : "border-stone-300 focus-within:border-amber-600"
            }`}
          >
            <span className="pl-3 text-sm text-stone-400">₹</span>

            <input
              type="number"
              min={300}
              value={max_price}
              onChange={(e) => set_max_price(Number(e.target.value))}
              placeholder="1000"
              className="h-full w-full bg-transparent px-2 text-sm text-stone-800 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {isInvalid && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-red-600">
            !
          </span>

          <p className="text-xs font-medium text-red-600">
            Minimum price cannot be greater than maximum price.
          </p>
        </div>
      )}

      {/* Apply Button */}
      <button
        type="button"
        onClick={handleApplyPrice}
        disabled={isInvalid}
        className="mt-5 flex w-full items-center justify-center rounded-lg bg-stone-900 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        Apply Price
      </button>

      {/* Clear Button */}
      <button
        type="button"
        onClick={removePriceFilter}
        className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 py-2.5 text-sm font-medium text-stone-600 transition-all duration-200 hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700"
      >
        <FiRotateCcw size={14} />
        Clear Price Filter
      </button>

      {/* Current Range */}
      {!isInvalid && (
        <p className="mt-4 text-center text-[11px] text-stone-400">
          Showing products from{" "}
          <span className="font-medium text-stone-600">
            ₹{min_price}
          </span>{" "}
          to{" "}
          <span className="font-medium text-stone-600">
            ₹{max_price}
          </span>
        </p>
      )}
    </section>
  );
}