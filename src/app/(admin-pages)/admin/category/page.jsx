import { FiImage } from "react-icons/fi";

import StatusButton from "@/components/admin/StatusButton";
import TableHeader from "@/components/admin/TableHeader";
import ActionsButton from "@/components/admin/ActionsButton";
import { fatchCategory } from "@/api/CategoryAPI";
import CategoryFetchError from "@/components/admin/CategoryFetchError";

export default async function CategoryPage() {
  const category = await fatchCategory();

  console.log("Category API response:", category);

  const hasError = !category?.success;

  const categories = Array.isArray(category?.data)
    ? category.data
    : Array.isArray(category?.category)
      ? category.category
      : [];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-7">
      <TableHeader
        tital="Category"
        p="Manage, Create, Update, and Delete"
        add_page="/admin/category/add"
      />

      {hasError && (
        <CategoryFetchError
          message={
            category?.message ||
            category?.massage ||
            "Category fetch failed. Check the API URL and server logs."
          }
        />
      )}

      <div className="w-full overflow-hidden rounded-[16px] border border-[#e7eaee] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.04)]">
        <div className="grid grid-cols-[92px_1.2fr_1fr_1fr_150px] min-h-[49px] items-center border-b border-[#edf0f2] px-5">
          <div className="text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            IMAGE
          </div>
          <div className="text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            NAME
          </div>
          <div className="text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            SLUG
          </div>
          <div className="text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            STATUS
          </div>
          <div className="text-right text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            ACTION
          </div>
        </div>

        {categories.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[92px_1.2fr_1fr_1fr_150px] min-h-[77px] items-center border-b border-[#f0f2f4] px-5 last:border-b-0 hover:bg-[#fcfdfd] transition-colors"
          >
            <div>
              <div className="flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-[12px] border border-[#dfe3e8] bg-[#f5f6f7]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || "Category"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiImage
                    size={19}
                    strokeWidth={1.5}
                    className="text-[#c8ced6]"
                  />
                )}
              </div>
            </div>

            <div>
              <p className="text-[13px] font-semibold text-[#101828]">
                {item.name}
              </p>
            </div>

            <div>
              <p className="text-[13px] text-[#667085]">{item.slug}</p>
            </div>

            <div>
              <StatusButton
                Status={item.status}
                api={`category/status/${item._id}`}
              />
            </div>

            <div>
              <ActionsButton
                api={`category/delete/${item._id}`}
                id={item._id}
                tital="category"
              />
            </div>
          </div>
        ))}

        {!hasError && categories.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-gray-500">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
