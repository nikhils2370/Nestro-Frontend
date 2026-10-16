import { FiImage } from "react-icons/fi";

import StatusButton from "@/components/admin/StatusButton";
import TableHeader from "@/components/admin/TableHeader";
import ActionsButton from "@/components/admin/ActionsButton";
import { fatchCategory } from "@/api/CategoryAPI";

export default async function CategoryPage() {
  const category = await fatchCategory();
  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-7">
      {/* ================= HEADER ================= */}
      <TableHeader
        tital={"Category"}
        p={"Manage, Create, Update, and Delete"}
        add_page={"/admin/category/add"}
      />

      {/* ================= TABLE ================= */}
      <div className="w-full overflow-hidden rounded-[16px] border border-[#e7eaee] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.04)]">
        {/* ================= TABLE HEADER ================= */}
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

        {/* ================= TABLE ROWS ================= */}

        {category?.data?.map(
          (item) => (
            // console.log(item),
            (
              <div
                key={item._id}
                className="grid grid-cols-[92px_1.2fr_1fr_1fr_150px] min-h-[77px] items-center border-b border-[#f0f2f4] px-5 last:border-b-0 hover:bg-[#fcfdfd] transition-colors"
              >
                {/* ================= IMAGE ================= */}
                <div>
                  <div className="w-[44px] h-[44px] rounded-[12px] border border-[#dfe3e8] bg-[#f5f6f7] flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || "Category"}
                        className="w-full h-full object-cover"
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

                {/* ================= NAME ================= */}
                <div>
                  <p className="text-[13px] font-semibold text-[#101828]">
                    {item.name}
                  </p>
                </div>

                {/* ================= SLUG ================= */}
                <div>
                  <p className="text-[13px] text-[#667085]">{item.slug}</p>
                </div>

                {/* ================= STATUS ================= */}

                <div>
                  <StatusButton
                    Status={item.status}
                    api={`category/status/${item._id}`}
                  />
                </div>

                {/* ================= ACTION ================= */}

                <div>
                  <ActionsButton
                    api={`category/delete/${item._id}`}
                    id={item._id}
                    tital={"category"}
                  />
                </div>
              </div>
            )
          ),
        )}
      </div>
    </div>
  );
}
