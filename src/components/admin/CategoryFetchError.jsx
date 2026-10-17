"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function CategoryFetchError({ message }) {
  useEffect(() => {
    if (message) {
      toast.error("Category Fetch Error", {
        description: message,
        duration: 10000,
      });
    }
  }, [message]);

  return (
    <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <p className="font-semibold">Category load nahi hui</p>
      <p className="mt-1 break-words">{message}</p>
    </div>
  );
}
