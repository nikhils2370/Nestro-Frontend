"use client";

import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";

// import { increateQty, decreaseQty, removeItem } from "@/redux/cartSlice";
import { increateQty, decreaseQty, removeItem } from "@/redux/features/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
// console.log(item.thumbnail);

  const price = Number(item.price || 0);
  const salePrice = Number(item.salePrice || item.price || 0);
  const qty = Number(item.qty || 1);

  const itemTotal = salePrice * qty;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex gap-3 sm:gap-5">
        {/* Image */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:h-32 sm:w-32">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.name || "Product"}
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-stone-400">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#94623f]">
                Furniture
              </p>

              <h2 className="mt-1 truncate text-sm font-semibold text-stone-900 sm:text-base">
                {item.name}
              </h2>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() =>
                dispatch(
                  removeItem({
                    id: item.id,
                  }),
                )
              }
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-stone-400
                transition
                hover:bg-red-50
                hover:text-red-500
              "
              aria-label="Remove item"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-semibold text-stone-900">
              ₹{salePrice.toLocaleString("en-IN")}
            </span>

            {price > salePrice && (
              <span className="text-xs text-stone-400 line-through">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Bottom */}
          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            {/* Quantity */}
            <div className="flex items-center rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    decreaseQty({
                      id: item.id,
                    }),
                  )
                }
                disabled={qty <= 1}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  text-stone-600
                  transition
                  hover:text-[#94623f]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <FiMinus size={13} />
              </button>

              <span className="flex h-8 min-w-8 items-center justify-center border-x border-stone-200 px-2 text-xs font-medium">
                {qty}
              </span>

              <button
                type="button"
                onClick={() =>
                  dispatch(
                    increateQty({
                      id: item.id,
                    }),
                  )
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  text-stone-600
                  transition
                  hover:text-[#94623f]
                "
              >
                <FiPlus size={13} />
              </button>
            </div>

            {/* Item Total */}
            <p className="text-sm font-bold text-stone-900">
              ₹{itemTotal.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
