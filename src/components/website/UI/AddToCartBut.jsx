"use client";

import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { addtoCart } from "@/redux/features/cartSlice";
import { client } from "@/utils/helper";

export default function AddToCartButton({ product = {} }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cartHandler = async () => {
    if (!product?._id) {
      toast.error("Product not found");
      return;
    }

    if (loading) return;

    if (!product.stock || product.stock < 1) {
      toast.error("Product is out of stock");
      return;
    }

    const cartProduct = {
      id: String(product._id),
      name: product.name,
      price: Number(product.price || 0),
      salePrice: Number(product.salePrice || product.price || 0),
      thumbnail: product.thumbnail,
      qty: 1,
    };

    const token = localStorage.getItem("token");

    // Guest user: Redux/local cart
    if (!token) {
      dispatch(addtoCart(cartProduct));
      toast.success("Product added to cart");
      return;
    }

    // Logged-in user: update MongoDB first
    try {
      setLoading(true);

      const response = await client.post(
        "cart/add",
        {
          productId: String(product._id),
          qty: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data?.success) {
        toast.error(response.data?.message || "Unable to add product to cart");
        return;
      }

      // Increment Redux quantity only after backend success
      dispatch(addtoCart(cartProduct));

      toast.success(response.data.message || "Cart updated successfully");
    } catch (error) {
      console.error("Add to cart error:", error?.response?.data || error);

      toast.error(
        error?.response?.data?.message || "Failed to add product to cart",
      );
    } finally {
      setLoading(false);
    }
  };

  const inStock = Number(product.stock || 0) > 0;

  return (
    <button
      type="button"
      onClick={cartHandler}
      disabled={!inStock || loading}
      className={`flex h-8 w-full items-center justify-center gap-1.5 rounded-md px-3 text-[9px] font-medium tracking-wide text-white transition-all duration-300 ${
        inStock && !loading
          ? "cursor-pointer bg-[#171717] hover:bg-[#9a6844]"
          : "cursor-not-allowed bg-[#757373] opacity-70"
      }`}
    >
      <FiShoppingBag size={12} />
      {loading ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
