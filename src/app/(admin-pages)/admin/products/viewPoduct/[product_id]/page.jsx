"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FiShoppingCart,
  FiHeart,
  FiCheck,
  FiX,
  FiPackage,
} from "react-icons/fi";
import { fetchProductById } from "@/api/ProductAPI";

export default function ProductDetailsPage() {
    const { product_id } = useParams();
    // console.log(product_id);
    

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!product_id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

          const response = await fetchProductById(product_id);
        //   console.log(response);
          

        if (!response.success) {
          throw new Error("Product not found");
        }

        const data = await response.product;

        // Agar API direct product bhejti hai
        setProduct(data.data || data);
      } catch (err) {
        console.error("Product Error:", err);
        setError("Product load nahi ho paya.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            {error || "Product available nahi hai."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ================= IMAGE ================= */}
          <div>
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
              {/* Best Seller */}
              {product.bestSeller && (
                <span className="absolute top-5 left-5 z-10 bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                  Best Seller
                </span>
              )}

              {/* New Arrival */}
              {product.newArrival && (
                <span className="absolute top-5 left-5 z-10 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  New Arrival
                </span>
              )}

              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Additional Images */}
            {product.images?.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex flex-col justify-center">
            {/* Name */}
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              {product.slug}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-gray-600 text-lg mt-5">
              {product.shortDescription}
            </p>

            {/* Rating / Status */}
            <div className="flex items-center gap-3 mt-5">
              {product.status ? (
                <span className="flex items-center gap-2 text-green-600 text-sm">
                  <FiCheck />
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-500 text-sm">
                  <FiX />
                  Inactive
                </span>
              )}

              {product.stock ? (
                <span className="text-green-600 text-sm">In Stock</span>
              ) : (
                <span className="text-red-500 text-sm">Out of Stock</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mt-7">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.salePrice}
              </span>

              {product.price > product.salePrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.price}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Material / Color */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">Material</p>

                <p className="font-semibold mt-1">
                  {product.material || "Not specified"}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">Color</p>

                <p className="font-semibold mt-1">
                  {product.color || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Description
          </h2>

          <p className="mt-4 text-gray-600 leading-7 max-w-4xl">
            {product.description}
          </p>
        </section>

        {/* ================= PRODUCT INFORMATION ================= */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <InfoCard
              title="Material"
              value={product.material || "Not specified"}
            />

            <InfoCard title="Color" value={product.color || "Not specified"} />

            <InfoCard
              title="Weight"
              value={
                product.weight?.value
                  ? `${product.weight.value} ${product.weight.unit}`
                  : "Not specified"
              }
            />

            <InfoCard
              title="Dimensions"
              value={
                product.dimensions
                  ? `${product.dimensions.length || 0} × ${
                      product.dimensions.width || 0
                    } × ${product.dimensions.height || 0} ${
                      product.dimensions.unit || ""
                    }`
                  : "Not specified"
              }
            />
          </div>
        </section>

        {/* ================= PRODUCT IDS ================= */}
        <section className="mt-12 pb-12">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>

          <div className="mt-5 space-y-3 text-sm">
            <p>
              <span className="font-medium">Product ID:</span> {product._id}
            </p>

            <p>
              <span className="font-medium">Category ID:</span>{" "}
              {product.categoryId}
            </p>

            <p>
              <span className="font-medium">Room ID:</span> {product.roomId}
            </p>

            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="text-lg font-semibold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
