"use client";

import React from "react";
import { FiHeart, FiStar } from "react-icons/fi";
import Link from "next/link";
import AddToCartButton from "./AddToCartBut";

export default function ProductCard({ product }) {
  const productId = product?._id;

  const sellingPrice = product?.salePrice || product?.price;

  const hasDiscount =
    product?.salePrice &&
    product?.price &&
    product.salePrice < product.price;

  return (
    <div className="group block overflow-hidden rounded-[11px] border border-[#e2d9d0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      {/* Product Link */}
      <Link href={`/store/${productId}`} className="block">

        {/* Product Image */}
        <div className="relative aspect-[1.45/1] overflow-hidden bg-[#eee9e4]">

          <img
            src={product?.thumbnail}
            alt={product?.name || "Product"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* Best Seller Badge */}
          {product?.bestSeller && (
            <span className="absolute left-2 top-2 rounded-[2px] bg-[#2d2118] px-2 py-[4px] text-[9px] font-medium tracking-wide text-white">
              Best Seller
            </span>
          )}

          {/* Discount Badge */}
          {product?.discount > 0 && (
            <span className="absolute left-2 top-9 rounded-[2px] bg-[#9a6844] px-2 py-[4px] text-[9px] font-medium tracking-wide text-white">
              {product.discount}% OFF
            </span>
          )}

          {/* Wishlist */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#6d625a] shadow-sm transition hover:text-[#9a6844]"
            aria-label="Add to wishlist"
          >
            <FiHeart size={15} strokeWidth={1.5} />
          </button>

          {/* Out of Stock */}
          {!product?.stock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="rounded-sm bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[#2d2118]">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Content */}
        <div className="px-3 pb-3 pt-2.5">

          {/* Category */}
          <p className="text-[8px] font-medium tracking-[0.2em] text-[#9a6c4c]">
            {product?.material || "Furniture"}
          </p>

          {/* Product Name */}
          <h3 className="mt-1 text-[12px] font-medium capitalize text-[#171717]">
            {product?.name}
          </h3>

          {/* Price + Rating */}
          <div className="mt-3 flex items-center justify-between gap-2">

            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-[#171717]">
                ₹{sellingPrice}
              </span>

              {hasDiscount && (
                <span className="text-[10px] text-[#92877f] line-through">
                  ₹{product.price}
                </span>
              )}
            </div>

            {/* Rating */}
            {product?.rating && (
              <div className="flex items-center gap-1">
                <div className="flex gap-[1px] text-[#bd9478]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      size={10}
                      fill={
                        star <= product.rating
                          ? "currentColor"
                          : "none"
                      }
                      strokeWidth={1.3}
                    />
                  ))}
                </div>

                {product?.reviews && (
                  <span className="text-[9px] text-[#8c8178]">
                    ({product.reviews})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Add To Cart - Link ke bahar */}
      <div
        className="px-3 pb-3"
        // onClick={(e) => {
        //   e.stopPropagation();
        // }}
      >
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}