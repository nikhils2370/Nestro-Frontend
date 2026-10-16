"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiUploadCloud,
  FiSave,
  FiX,
  FiTrash2,
} from "react-icons/fi";
import { client } from "@/utils/helper";
import { toast } from "sonner";
import { fetchProductById } from "@/api/ProductAPI";

export default function Page({ params }) {
  const router = useRouter();

  const { product_id } = use(params);

  // Existing images from database
  const [existingImages, setExistingImages] = useState([]);

  // New selected images
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // GET PRODUCT
  // ==========================================

  useEffect(() => {
    async function getData() {
      try {
        const { success, product, message } =
          await fetchProductById(product_id);

        if (success) {
          setExistingImages(product?.images || []);
        } else {
          toast.error(message || "Product not found");
        }
      } catch (error) {
        console.error("Get product error:", error);

        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    if (product_id) {
      getData();
    }
  }, [product_id]);

  // ==========================================
  // IMAGE SELECT
  // ==========================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setNewImages((prev) => [...prev, ...files]);

    // Same file ko dobara select karne ke liye
    e.target.value = "";
  };

  // ==========================================
  // REMOVE NEW IMAGE
  // ==========================================

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // REMOVE EXISTING IMAGE FROM UI
  // ==========================================

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newImages.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      // IMPORTANT:
      // Backend agar upload.array("image") use kar raha hai
      // to har file ka field name "image" hi hona chahiye.

      newImages.forEach((img) => {
        formData.append("image", img);
      });

      console.log("Uploading images:", newImages);

      const response = await client.post(
        `product/add-images/${product_id}`,
        formData,
      );

      console.log("Add images response:", response);

      if (response.data.success) {
        toast.success(response.data.message || "Images uploaded successfully");

        router.push("/admin/products");
      } else {
        toast.error(response.data.message || "Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);

      const message = error.response?.data?.message;

      toast.error(
        typeof message === "string" ? message : "Image upload failed",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-9 h-9 border-4 border-[#dfe3e8] border-t-[#009f98] rounded-full animate-spin mx-auto" />

          <p className="mt-3 text-[13px] text-[#667085]">Loading product...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-8">
      <div className="max-w-[675px] mx-auto">
        {/* ======================================
            BACK
        ====================================== */}

        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="flex items-center gap-2 text-[13px] text-[#667085] hover:text-[#009f98] transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to product page
        </button>

        {/* ======================================
            HEADING
        ====================================== */}

        <div className="mt-7">
          <h1 className="text-[25px] font-semibold text-[#101828]">
            Add New Images
          </h1>

          <p className="mt-1 text-[13px] text-[#667085]">
            Add new images to this product.
          </p>
        </div>

        {/* ======================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-6 overflow-hidden rounded-[17px] border border-[#e7eaee] bg-white shadow-[0_1px_4px_rgba(16,24,40,0.05)]"
        >
          <div className="p-6">
            {/* ==================================
                UPLOAD
            ================================== */}

            <div>
              <label className="block text-[13px] font-semibold text-[#101828] mb-2">
                Product Images
                <span className="text-[#e11d48]">*</span>
              </label>

              <label
                htmlFor="product-image"
                className="min-h-[175px] rounded-[13px] border-2 border-dashed border-[#dfe3e8] bg-[#fafbfc] hover:border-[#00b8a9] hover:bg-[#f7fffe] flex flex-col items-center justify-center cursor-pointer transition-all"
              >
                <div className="w-[50px] h-[50px] rounded-full bg-[#e8fffc] text-[#009f98] flex items-center justify-center">
                  <FiUploadCloud size={23} />
                </div>

                <p className="mt-3 text-[13px] font-semibold text-[#344054]">
                  Click to upload images
                </p>

                <p className="mt-1 text-[11px] text-[#98a2b3]">
                  PNG, JPG or WEBP
                </p>

                <input
                  id="product-image"
                  name="images"
                  multiple
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* ==================================
                EXISTING IMAGES
            ================================== */}

            {existingImages.length > 0 && (
              <div className="mt-7">
                <p className="text-[13px] font-semibold text-[#101828] mb-3">
                  Existing Images
                </p>

                <div className="grid grid-cols-4 gap-3">
                  {existingImages.map((img, index) => (
                    <div
                      key={`${img}-${index}`}
                      className="relative aspect-square rounded-[12px] overflow-hidden border border-[#e5e7eb] bg-[#f8fafc]"
                    >
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================
                NEW IMAGES
            ================================== */}

            {newImages.length > 0 && (
              <div className="mt-7">
                <p className="text-[13px] font-semibold text-[#101828] mb-3">
                  New Images
                </p>

                <div className="grid grid-cols-4 gap-3">
                  {newImages.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative aspect-square rounded-[12px] overflow-hidden border border-[#e5e7eb] bg-[#f8fafc]"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-red-500 shadow-md flex items-center justify-center hover:bg-red-50"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================
                NO IMAGE
            ================================== */}

            {existingImages.length === 0 && newImages.length === 0 && (
              <p className="mt-5 text-center text-[12px] text-[#98a2b3]">
                No images added yet.
              </p>
            )}
          </div>

          {/* ======================================
              FOOTER
          ====================================== */}

          <div className="h-[78px] px-6 flex items-center justify-end gap-3 border-t border-[#edf0f2] bg-white">
            {/* CANCEL */}

            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="h-[42px] px-6 rounded-[11px] border border-[#dfe3e8] bg-white text-[13px] font-semibold text-[#344054] hover:bg-[#f8fafc] flex items-center gap-2 transition-colors"
            >
              <FiX size={16} />
              Cancel
            </button>

            {/* SAVE */}

            <button
              type="submit"
              disabled={saving || newImages.length === 0}
              className="h-[42px] px-6 rounded-[11px] bg-[#009f98] hover:bg-[#008f89] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <FiSave size={16} />

              {saving ? "Uploading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
