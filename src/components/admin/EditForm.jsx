"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiTag,
  FiLink,
  FiUploadCloud,
  FiSave,
  FiX,
} from "react-icons/fi";
import {client} from "@/utils/helper";
import { toast } from "sonner";

export default function EditForm({ backButton, data, tital }) {
   const router = useRouter();
   const [name, setName] = useState(data.name || "");
   const [slug, setSlug] = useState(data.slug || "");
   const [image, setImage] = useState(data.image || null);

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setSlug(generateSlug(value));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("image", image);

    client
      .put(`${tital}/update/${data._id}`, formData)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          router.push(backButton);
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast.error(
          typeof message === "string" ? message : "Image upload failed",
        );
      });
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-8">
      <div className="max-w-[675px] mx-auto">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push(backButton)}
          className="flex items-center gap-2 text-[13px] text-[#667085] hover:text-[#009f98] transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to {tital}
        </button>

        {/* Heading */}
        <div className="mt-7">
          <h1 className="text-[25px] font-semibold text-[#101828]">
            Add New {tital}
          </h1>

          <p className="mt-1 text-[13px] text-[#667085]">
            Create a new product {tital} for your store
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 overflow-hidden rounded-[17px] border border-[#e7eaee] bg-white shadow-[0_1px_4px_rgba(16,24,40,0.05)]"
        >
          <div className="p-6">
            {/* Category Name */}
            <div>
              <label className="block text-[13px] font-semibold text-[#101828] mb-2">
                {tital} Name <span className="text-[#e11d48]">*</span>
              </label>

              <div className="relative">
                <FiTag
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                />

                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g., Electronics, Fashion, Mobiles"
                  required
                  className="w-full h-[46px] rounded-[11px] border border-[#dfe3e8] bg-[#f9fafb] pl-10 pr-4 text-[13px] text-[#344054] outline-none placeholder:text-[#98a2b3] focus:border-[#00b8a9] focus:bg-white transition-all"
                />
              </div>

              <p className="mt-2 text-[11px] text-[#8190a5]">
                This is how customers will see the {tital}
              </p>
            </div>

            {/* Slug */}
            <div className="mt-7">
              <label className="block text-[13px] font-semibold text-[#101828] mb-2">
                Slug
              </label>

              <div className="relative">
                <FiLink
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                />

                <input
                  type="text"
                  readOnly
                  value={slug}
                  // onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto-generated-slug"
                  className="w-full h-[46px] rounded-[11px] border cursor-not-allowed border-[#dfe3e8] bg-[#f1f3f5] pl-10 pr-4 text-[13px] text-[#667085] outline-none placeholder:text-[#98a2b3]"
                />
              </div>

              <p className="mt-2 text-[11px] text-[#8190a5]">
                URL-friendly name (auto-generated)
              </p>
            </div>

            {/* Image */}
            <div className="mt-7">
              <label className="block text-[13px] font-semibold text-[#101828] mb-2">
                {tital} Image <span className="text-[#e11d48]">*</span>
              </label>

              <label
                htmlFor="category-image"
                className={`relative min-h-[175px] rounded-[13px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  image
                    ? "border-[#00b8a9] bg-[#f2fffd]"
                    : "border-[#dfe3e8] bg-[#fafbfc] hover:border-[#00b8a9] hover:bg-[#f7fffe]"
                }`}
              >
                {image ? (
                  <>
                    <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden bg-white border border-[#e5e7eb]">
                      <img
                        src={image}
                        alt="Category preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="mt-3 text-[12px] font-medium text-[#344054]">
                      {image.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[#98a2b3]">
                      Click to change image
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-[48px] h-[48px] rounded-full bg-[#f1f3f5] flex items-center justify-center">
                      <FiUploadCloud size={22} className="text-[#98a2b3]" />
                    </div>

                    <p className="mt-3 text-[13px] font-medium text-[#344054]">
                      Drag & drop or click to upload
                    </p>

                    <p className="mt-1 text-[11px] text-[#98a2b3]">
                      PNG, JPG, WEBP (Max 5MB)
                    </p>
                  </>
                )}

                <input
                  id="category-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="h-[78px] px-6 flex items-center justify-end gap-3 border-t border-[#edf0f2] bg-white">
            <button
              type="submit"
              className="h-[42px] px-6 rounded-[11px] border border-[#dfe3e8] bg-white text-[13px] font-semibold text-[#344054] hover:bg-[#f8fafc] flex items-center gap-2 transition-colors"
            >
              <FiX size={16} />
              Cancel
            </button>

            <button
              type="submit"
              className="h-[42px] cursor-pointer px-6 rounded-[11px] bg-[#009f98] hover:bg-[#008f89] text-white text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <FiSave size={16} />
              Save {tital}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
