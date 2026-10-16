"use client"
import { useSearchParams, useRouter } from "next/navigation";

export default function StockFilter() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const currentParams = Boolean(searchParams.get("stock"));


  function queryHandle() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("stock", true);
    if (currentParams) {
      params.delete("stock");
    }
    router.push(`/store?${params.toString()}`);
  }
  return (
    <section>
      <h3 className="mb-5 text-base font-semibold text-stone-900">
        Availability
      </h3>

      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-stone-50">
        <input
          type="checkbox"
          checked={currentParams}
          readOnly
          onClick={queryHandle}
          className="h-4 w-4 rounded border-stone-300 accent-amber-700"
        />

        <div>
          <p className="text-sm font-medium text-stone-800">
            In Stock
          </p>

          <p className="text-xs text-stone-500">
            Show only available products
          </p>
        </div>
      </label>
    </section>
  );
}

