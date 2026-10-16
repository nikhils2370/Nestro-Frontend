"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { emptyCart } from "@/redux/features/cartSlice";

export default function CartSummary({
  originalTotal = 0,
  finalTotal = 0,
  items = [],
}) {
  const dispatch = useDispatch();

  const discount = Number(originalTotal) - Number(finalTotal);

  const shipping = finalTotal >= 1000 ? 0 : 99;

  const grandTotal = Number(finalTotal) + shipping;

  return (
    <div
      className="
        rounded-2xl
        border
        border-stone-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
        lg:sticky
        lg:top-24
      "
    >
      <h2 className="text-lg font-bold text-stone-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        {/* Original */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Original Price</span>

          <span className="text-stone-700">
            ₹{Number(originalTotal).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-500">Discount</span>

            <span className="font-medium text-green-600">
              -₹{discount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Subtotal</span>

          <span className="font-semibold text-stone-900">
            ₹{Number(finalTotal).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Shipping</span>

          <span
            className={`font-medium  ${shipping === 0 ? "text-green-600" : "text-stone-900"}`}
          >
            {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString("en-IN")}`}
          </span>
        </div>

        {/* Total */}
        <div className="border-t border-stone-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-900">Total</span>

            <span className="text-xl font-bold text-[#94623f]">
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Free Shipping */}
      {finalTotal < 1000 && (
        <div className="mt-5 rounded-xl bg-[#f6f0eb] p-3">
          <p className="text-xs leading-5 text-[#76543e]">
            Add ₹{(1000 - Number(finalTotal)).toLocaleString("en-IN")} more to
            get free shipping.
          </p>
        </div>
      )}

      {/* Checkout */}
      <Link
        href="/checkout"
        // href="/signin"
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#94623f]
          px-5
          py-3.5
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#7d5032]
        "
      >
        Proceed to Checkout
        <FiArrowRight size={16} />
      </Link>

      {/* Clear Cart */}
      <button
        type="button"
        onClick={() => dispatch(emptyCart())}
        className="
          mt-4
          flex
          w-full
          items-center
          justify-center
          gap-2
          text-xs
          font-medium
          text-stone-400
          transition
          hover:text-red-500
        "
      >
        <FiTrash2 size={13} />
        Clear Cart
      </button>
    </div>
  );
}
