import { fatchCategory } from "@/api/CategoryAPI";
import FilterSection from "./FilterSection";
import PriceFilter from "./PriceFilter";
import StockFilter from "./StockFilter";
import { fatchRoom } from "@/api/RoomAPI";
import Link from "next/link";

export default async function FilterSidebar() {
  const { data = [] } = await fatchCategory({ status: true });

  const roomData = await fatchRoom();
  const room = roomData?.data || [];

  return (
    <aside
      className="
        w-full
        rounded-2xl
        border border-stone-200
        bg-white
        p-4
        shadow-sm

        sm:p-5

        lg:sticky
        lg:top-20
        lg:w-72
        lg:shrink-0
        lg:p-6
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-5 sm:mb-8">
        <div>
          <h2 className="text-lg font-bold text-stone-900 sm:text-xl">
            Filters
          </h2>

          <p className="mt-1 text-xs text-stone-500 sm:text-sm">
            Refine your search
          </p>
        </div>

        <Link
          href="/store"
          className="text-xs font-medium text-amber-700 hover:underline sm:text-sm"
        >
          Clear All
        </Link>
      </div>

      {/* Filters */}
      <div className="space-y-6 sm:space-y-8">
        {/* Category */}
        <FilterSection
          title="Category"
          items={data}
          queryKey="category"
        />

        {/* Room */}
        <FilterSection
          title="Room Type"
          items={room}
          queryKey="room_type"
        />

        {/* Price */}
        <PriceFilter />

        {/* Stock */}
        <StockFilter />
      </div>
    </aside>
  );
}