"use client";

import {client} from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { RiMultiImageLine } from "react-icons/ri";

import { toast } from "sonner";

export default function ActionsButton({ api, id, tital }) {
  const router = useRouter();
  function deleltHandler() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (!confirmDelete) return;

    client
      .delete(api)
      .then((response) => {
        toast.success(response.data.message || "Category deleted successfully");
        router.refresh();
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        toast.error("Failed to delete the category");
      });
  }
  
  const handleEdit = () => {
    router.push(`/admin/${tital}/edit/${id}`);
  };

   const viewProduct = () => {
     router.push(`/admin/${tital}/viewPoduct/${id}`);
  };
  const AddImage = () => {
    router.push(`/admin/${tital}/add-images/${id}`);
  };

  return (
    <div className="flex items-center justify-end gap-4">
      {tital == "products" && (
        <>
          <button
            type="button"
            onClick={viewProduct}
            title="view product ditals"
            className="h-[32px] cursor-pointer px-3 rounded-[8px] border border-[#e4e7ec] bg-white text-[#475467] text-[11px] font-medium flex items-center gap-1.5 hover:bg-[#98aece] hover:text-[#000000] transition-colors"
          >
            {/* Uncomment if you import FiEdit2 from 'react-icons/fi' */}
            {/* <FiEdit2 size={14} /> */}
            View ALL
          </button>
          <button
            type="button"
            onClick={AddImage}
            title="Add product images"
            className="h-[32px] cursor-pointer px-3 rounded-[8px] border border-[#e4e7ec] bg-white text-[#475467] text-[11px] font-medium flex items-center gap-1.5 hover:bg-[#59606b] hover:text-[#f5f1f1] transition-colors"
          >
            <RiMultiImageLine size={20} />
          </button>
        </>
      )}
      {/* ///////////////////////////////////////////////// */}
      {/* Edit */}
      <button
        type="button"
        onClick={handleEdit}
        title="Edit Category"
        className="h-[32px] cursor-pointer px-3 rounded-[8px] border border-[#e4e7ec] bg-white text-[#475467] text-[11px] font-medium flex items-center gap-1.5 hover:bg-[#98aece] hover:text-[#000000] transition-colors"
      >
        <FiEdit2 size={14} />
        Edit
      </button>
      {/* Delete */}
      <button
        type="button"
        onClick={deleltHandler}
        title="Delete Category"
        className="h-[32px] px-3 cursor-pointer rounded-[8px] border border-[#fecdd3] bg-white text-[#e11d48] text-[11px] font-medium flex items-center gap-1.5 hover:bg-[#f52f3c] hover:text-white transition-colors"
      >
        <FiTrash2 size={14} />
        Delete
      </button>
    </div>
  );
}
