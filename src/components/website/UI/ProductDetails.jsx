"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiChevronRight,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addtoCart } from "@/redux/features/cartSlice";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();

    const images = [product.thumbnail, ...(product.images || [])].filter(Boolean);
    // console.log(images);
    

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const salePrice = Number(product.salePrice || product.price || 0);
  const originalPrice = Number(product.price || 0);

  const discount =
    product.discount ||
    (originalPrice > salePrice
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : 0);

  const handleAddToCart = () => {
    dispatch(
      addtoCart({
        id: product._id,
        name: product.name,
        salePrice: salePrice,
        originalPrice: originalPrice,
        thumbnail: product.thumbnail,
        qty: quantity,
      }),
    );
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 overflow-hidden text-xs text-gray-500">
        <Link href="/" className="shrink-0 transition hover:text-[#94623f]">
          Home
        </Link>

        <FiChevronRight size={13} />

        <Link
          href="/store"
          className="shrink-0 transition hover:text-[#94623f]"
        >
          Store
        </Link>

        <FiChevronRight size={13} />

        <span className="truncate text-[#171717]">{product.name}</span>
      </div>

      {/* Main Product */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        {/* LEFT - Images */}
        <div>
          <div className="grid grid-cols-[72px_1fr] gap-4 sm:grid-cols-[88px_1fr]">
            {/* Thumbnails */}
            <div className="flex max-h-[650px] flex-col gap-3 overflow-y-auto pr-1">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border bg-white transition ${
                    activeImage === index
                      ? "border-[#94623f] ring-1 ring-[#94623f]"
                      : "border-[#e5dfd8] hover:border-[#b99a7d]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f1eee9]">
              {discount > 0 && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-[#171717] px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white">
                  -{discount}% OFF
                </div>
              )}

              <img
                src={images[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 55vw"
                className="object-cover transition duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT - Product Info */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94623f]">
              Premium Furniture
            </span>

            {product.bestSeller && (
              <>
                <span className="h-1 w-1 rounded-full bg-[#94623f]" />

                <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  Best Seller
                </span>
              </>
            )}
          </div>

          {/* Name */}
          <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  size={14}
                  className="fill-[#b8875f] text-[#b8875f]"
                />
              ))}
            </div>

            <span className="text-xs text-gray-500">4.8 · 24 Reviews</span>
          </div>

          {/* Price */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-semibold text-[#171717]">
              ₹{salePrice.toLocaleString("en-IN")}
            </span>

            {originalPrice > salePrice && (
              <span className="text-base text-gray-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}

            {discount > 0 && (
              <span className="rounded-full bg-[#f2e7dc] px-2.5 py-1 text-[10px] font-semibold text-[#94623f]">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#68615b]">
            {product.shortDescription || product.description}
          </p>

          <div className="my-7 h-px bg-[#e7e1db]" />

          {/* Material */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">
                Material
              </p>

              <p className="mt-1 text-sm font-medium text-[#292522]">
                {product.material || "Premium"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">
                Availability
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    product.stock ? "bg-green-500" : "bg-red-500"
                  }`}
                />

                <span className="text-[#292522]">
                  {product.stock ? "In Stock" : "Currently Unavailable"}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity + Cart */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-12 w-fit items-center rounded-lg border border-[#ddd5cd] bg-white">
              <button
                type="button"
                onClick={decreaseQty}
                className="flex h-full w-11 items-center justify-center text-gray-500 transition hover:text-[#94623f]"
              >
                <FiMinus size={14} />
              </button>

              <span className="w-8 text-center text-sm font-medium">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQty}
                className="flex h-full w-11 items-center justify-center text-gray-500 transition hover:text-[#94623f]"
              >
                <FiPlus size={14} />
              </button>
            </div>

            <button
              type="button"
              disabled={!product.stock}
              onClick={handleAddToCart}
              className="flex h-12 p-4 flex-1 items-center justify-center gap-2 rounded-lg bg-[#171717] px-6 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#94623f] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <FiShoppingBag size={16} />

              {product.stock ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              type="button"
              onClick={() => setWishlist(!wishlist)}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition ${
                wishlist
                  ? "border-[#94623f] bg-[#f5eee8] text-[#94623f]"
                  : "border-[#ddd5cd] bg-white text-gray-600 hover:border-[#94623f] hover:text-[#94623f]"
              }`}
            >
              <FiHeart size={17} className={wishlist ? "fill-current" : ""} />
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[#e7e1db] pt-6 sm:grid-cols-3">
            <Benefit
              icon={<FiTruck size={17} />}
              title="Free Delivery"
              text="On selected orders"
            />

            <Benefit
              icon={<FiRefreshCw size={17} />}
              title="Easy Returns"
              text="Simple return policy"
            />

            <Benefit
              icon={<FiShield size={17} />}
              title="Secure Payment"
              text="100% secure checkout"
            />
          </div>
        </div>
      </div>

      {/* Product Information */}
      <ProductInformation product={product} />
    </section>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1e9e1] text-[#94623f]">
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-semibold text-[#292522]">{title}</p>

        <p className="mt-0.5 text-[9px] text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function ProductInformation({ product }) {
  return (
    <div className="mt-16 border-t border-[#e7e1db] pt-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        {/* Description */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94623f]">
            Product Details
          </p>

          <h2 className="text-2xl font-semibold text-[#171717]">
            Designed for your space
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#68615b]">
            {product.description ||
              "Thoughtfully designed with quality materials and timeless details, this piece brings comfort and character to your space."}
          </p>
        </div>

        {/* Specifications */}
        <div className="rounded-2xl border border-[#e7e1db] bg-white p-6">
          <h3 className="text-sm font-semibold text-[#171717]">
            Specifications
          </h3>

          <div className="mt-5 space-y-4">
            <Specification
              label="Material"
              value={product.material || "Premium"}
            />

            <Specification label="Color" value={product.color || "Natural"} />

            <Specification
              label="Dimension Unit"
              value={product.dimensions?.unit || "cm"}
            />

            <Specification
              label="Weight Unit"
              value={product.weight?.unit || "kg"}
            />

            <Specification
              label="Product Code"
              value={product._id?.slice(-8).toUpperCase()}
            />
          </div>
        </div>
      </div>

      {/* Feature points */}
      <div className="mt-12 grid grid-cols-1 gap-4 border-t border-[#e7e1db] pt-8 sm:grid-cols-3">
        <Feature text="Premium quality materials" />
        <Feature text="Designed for everyday comfort" />
        <Feature text="Carefully finished details" />
      </div>
    </div>
  );
}

function Specification({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#eee9e4] pb-3">
      <span className="text-xs text-gray-500">{label}</span>

      <span className="text-xs font-medium text-[#292522]">{value}</span>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#514942]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f1e9e1] text-[#94623f]">
        <FiCheck size={11} />
      </span>

      {text}
    </div>
  );
}
