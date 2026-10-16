"use client";

import { client } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function StatusButton({ Status, api }) {
  const router = useRouter();

  async function statusHandler() {
    const result = await Swal.fire({
      title: Status ? "Deactivate?" : "Activate?",
      text: Status
        ? "Are you sure you want to deactivate this?"
        : "Are you sure you want to activate this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: Status ? "Yes, deactivate" : "Yes, activate",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#94623f",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    // User clicked Cancel
    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await client.patch(api);

      if (response.data.success) {
        toast.success(response.data.message);
        router.refresh();
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <button
      type="button"
      onClick={statusHandler}
      className={`inline-flex items-center h-[27px] px-3 rounded-full text-[12px] font-medium border transition-all duration-200 ${
        Status
          ? "bg-[#e3fcef] text-[#00966d] border-[#71f3b6] hover:bg-[#d1fae5]"
          : "bg-[#f7f2f2] text-[#856666] border-[#e4e7ec] hover:bg-[#eaecf0]"
      }`}
    >
      {Status ? "Active" : "Inactive"}
    </button>
  );
}
