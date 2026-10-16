"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { client } from "@/utils/helper";
import { lstoCart, setCart } from "@/redux/features/cartSlice.js";
import CartItem from "./CartItem.jsx";
import CartSummary from "./CartSummary.jsx";

export default function CartPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const {
    items = [],
    original_total = 0,
    final_total = 0,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    let cancelled = false;

    const loadCart = async () => {
      try {
        const token = localStorage.getItem("token");

        // Guest user: LocalStorage se cart load karo
        if (!token) {
          dispatch(lstoCart());
          return;
        }

        // Logged-in user: Database se cart fetch karo
        const response = await client.get("cart");

        if (cancelled) return;

        if (!response.data?.success) {
          toast.error(response.data?.message || "Unable to load cart");
          return;
        }

        const cartItems =
          response.data.items || response.data.data?.items || [];

        // Database response ko Redux mein set karne ke liye
        if (response.data?.success) {
          const cartItems =
            response.data.items ?? response.data.data?.items ?? [];

          dispatch(setCart(cartItems));
        }

        // console.log("Cart fetched from database:", cartItems);
      } catch (error) {
        if (!cancelled) {
          console.error("Cart fetch error:", error);

          toast.error(error?.response?.data?.message || "Unable to load cart");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f7]">
        <p className="text-sm text-stone-500">Loading your cart...</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#faf9f7] px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f1e9e2]">
              <FiShoppingBag size={32} className="text-[#94623f]" />
            </div>

            <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>

            <Link
              href="/store"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#94623f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7d5032]"
            >
              <FiArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94623f]">
            Shopping Bag
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <CartSummary
            originalTotal={original_total}
            finalTotal={final_total}
            items={items}
          />
        </div>

        <Link
          href="/store"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-[#94623f]"
        >
          <FiArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
