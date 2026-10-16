"use client";

import { fatchCategory } from "@/api/CategoryAPI";
import { fatchRoom } from "@/api/RoomAPI";
import { client, slugify } from "@/utils/helper";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddProductUI() {
  // Basic Information
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  // Category / Room
  const [categoryId, setCategoryId] = useState("");
  const [roomId, setRoomId] = useState("");

  // Pricing
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [salePrice, setSalePrice] = useState("");

  // Inventory
  const [stock, setStock] = useState(true);

  // Image
  const [thumbnail, setThumbnail] = useState(null);

  // Furniture Details
  const [material, setMaterial] = useState("Wood");
  const [color, setColor] = useState("");

  // Dimensions
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [dimensionUnit, setDimensionUnit] = useState("cm");

  // Weight
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");

  // API Data
  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);

  // States
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Fetch Category & Room
  const fetchInitialData = async () => {
    try {
      setFetchingData(true);

      const [categoryResponse, roomResponse] = await Promise.all([
        fatchCategory(),
        fatchRoom(),
      ]);
      console.log(categoryResponse.data);

      if (categoryResponse.success) {
        setCategories(categoryResponse.data || []);
      }

      if (roomResponse.success) {
        setRooms(roomResponse.data || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories or rooms");
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Name Change + Slug
  const handleNameChange = (e) => {
    const value = e.target.value;

    setName(value);
    setSlug(slugify(value));
  };

  // Price Change
  const handlePriceChange = (e) => {
    const value = e.target.value;

    setPrice(value);

    const originalPrice = Number(value);
    const discountValue = Number(discount || 0);

    if (originalPrice > 0) {
      const sale = originalPrice - (originalPrice * discountValue) / 100;

      setSalePrice(sale.toFixed(2));
    } else {
      setSalePrice("");
    }
  };

  // Discount Change
  const handleDiscountChange = (e) => {
    let value = e.target.value;

    // Don't allow discount above 100
    if (Number(value) > 100) {
      value = "100";
    }

    setDiscount(value);

    const originalPrice = Number(price);
    const discountValue = Number(value || 0);

    if (originalPrice > 0) {
      const sale = originalPrice - (originalPrice * discountValue) / 100;

      setSalePrice(sale.toFixed(2));
    } else {
      setSalePrice("");
    }
  };

  // Thumbnail
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setThumbnail(file);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validation
      if (!name.trim()) {
        toast.error("Product name is required");
        return;
      }

      if (!slug.trim()) {
        toast.error("Slug is required");
        return;
      }

      if (!description.trim()) {
        toast.error("Description is required");
        return;
      }

      if (!categoryId) {
        toast.error("Please select category");
        return;
      }

      if (!roomId) {
        toast.error("Please select room");
        return;
      }

      if (!price || Number(price) < 200) {
        toast.error("Price must be at least ₹200");
        return;
      }

      if (!thumbnail) {
        toast.error("Please select product thumbnail");
        return;
      }

      // Create FormData
      const formData = new FormData();

      // Basic Information
      formData.append("name", name.trim());
      formData.append("slug", slug.trim());
      formData.append("shortDescription", shortDescription.trim());
      formData.append("description", description.trim());

      // Category / Room
      formData.append("categoryId", categoryId);
      formData.append("roomId", roomId);

      // Pricing
      formData.append("price", price);
      formData.append("salePrice", salePrice || 0);
      formData.append("discount", discount || 0);

      // Inventory
      formData.append("stock", stock ? 1 : 0);

      // Furniture Details
      formData.append("material", material);
      formData.append("color", color);

      // Dimensions
      formData.append(
        "dimensions",
        JSON.stringify({
          length: Number(length) || 0,
          width: Number(width) || 0,
          height: Number(height) || 0,
          unit: dimensionUnit,
        }),
      );

      // Weight
      formData.append(
        "weight",
        JSON.stringify({
          value: Number(weight) || 0,
          unit: weightUnit,
        }),
      );

      // Thumbnail
      formData.append("image", thumbnail);

      // API Request
      const response = await client.post("product/create", formData);

      console.log("Create product response:", response);

      // Actual backend response
      const data = response.data;

      console.log("Product data:", data);

      if (!data?.success) {
        throw new Error(data?.message || "Failed to create product");
      }

      toast.success(data?.message || "Product created successfully");

      // Reset form
      setName("");
      setSlug("");
      setShortDescription("");
      setDescription("");

      setCategoryId("");
      setRoomId("");

      setPrice("");
      setDiscount("");
      setSalePrice("");

      setStock(true);

      setThumbnail(null);

      setMaterial("Wood");
      setColor("");

      setLength("");
      setWidth("");
      setHeight("");
      setDimensionUnit("cm");

      setWeight("");
      setWeightUnit("kg");

      // Reset form/file input
      e.target.reset();
    } catch (error) {
      console.error("Create Product Error:", error);

      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new furniture product
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter basic product information
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Modern Wooden Sofa"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Slug *
                  </label>

                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="modern-wooden-sofa"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 outline-none focus:border-black"
                  />
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Short Description
                  </label>

                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Premium wooden sofa for modern living rooms"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description *
                  </label>

                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter complete product description..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>
            </section>

            {/* Category & Room */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Category & Room
                </h2>

                <p className="text-sm text-gray-500">
                  Select product category and room
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category *
                  </label>

                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    disabled={fetchingData}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black"
                  >
                    <option value="">
                      {fetchingData
                        ? "Loading categories..."
                        : "Select Category"}
                    </option>

                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Room *
                  </label>

                  <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    disabled={fetchingData}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black"
                  >
                    <option value="">
                      {fetchingData ? "Loading rooms..." : "Select Room"}
                    </option>

                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Original Price *
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-gray-500">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="200"
                      value={price}
                      onChange={handlePriceChange}
                      placeholder="10000"
                      className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Discount (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={handleDiscountChange}
                    placeholder="10"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                  />
                </div>

                {/* Sale Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Sale Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-gray-500">
                      ₹
                    </span>

                    <input
                      type="number"
                      value={salePrice}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-4 font-semibold text-green-600"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Inventory */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Inventory
              </h2>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={stock}
                  onChange={(e) => setStock(e.target.checked)}
                  className="h-5 w-5"
                />

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Product in Stock
                  </p>

                  <p className="text-xs text-gray-500">
                    Customers can purchase this product
                  </p>
                </div>
              </label>
            </section>

            {/* Furniture Details */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Furniture Details
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Material */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Material
                  </label>

                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black"
                  >
                    <option value="Wood">Wood</option>

                    <option value="Sheesham">Sheesham</option>

                    <option value="Engineered Wood">Engineered Wood</option>

                    <option value="Metal">Metal</option>

                    <option value="Steel">Steel</option>

                    <option value="Plastic">Plastic</option>

                    <option value="Glass">Glass</option>

                    <option value="Marble">Marble</option>

                    <option value="Fabric">Fabric</option>

                    <option value="Leather">Leather</option>
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Color
                  </label>

                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Walnut Brown"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                  />
                </div>
              </div>
            </section>

            {/* Dimensions */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Dimensions
              </h2>

              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Length"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                />

                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Width"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                />

                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                />

                <select
                  value={dimensionUnit}
                  onChange={(e) => setDimensionUnit(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black"
                >
                  <option value="cm">cm</option>
                  <option value="inch">inch</option>
                  <option value="ft">ft</option>
                </select>
              </div>
            </section>

            {/* Weight */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Weight
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Weight"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                />

                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="lb">lb</option>
                </select>
              </div>
            </section>

            {/* Thumbnail */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Product Thumbnail
              </h2>

              <p className="mb-5 text-sm text-gray-500">
                Upload one product thumbnail.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="block w-full rounded-lg border border-gray-300 p-3 text-sm"
              />

              {thumbnail && (
                <div className="mt-5">
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Product thumbnail"
                    className="h-40 w-40 rounded-lg border object-cover"
                  />
                </div>
              )}
            </section>

            {/* Submit */}
            <div className="flex justify-end gap-3 pb-8">
              <button
                type="reset"
                onClick={() => {
                  setName("");
                  setSlug("");
                  setShortDescription("");
                  setDescription("");
                  setCategoryId("");
                  setRoomId("");
                  setPrice("");
                  setDiscount("");
                  setSalePrice("");
                  setStock(true);
                  setThumbnail(null);
                  setMaterial("Wood");
                  setColor("");
                  setLength("");
                  setWidth("");
                  setHeight("");
                  setDimensionUnit("cm");
                  setWeight("");
                  setWeightUnit("kg");
                }}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-black px-7 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating Product..." : "Create Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
