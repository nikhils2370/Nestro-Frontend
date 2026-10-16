import { FiImage } from "react-icons/fi";
import StatusButton from "@/components/admin/StatusButton";
import TableHeader from "@/components/admin/TableHeader";
import ActionsButton from "@/components/admin/ActionsButton";
import { fetchProduct } from "@/api/ProductAPI";

export default async function Productpage() {
  const product = await fetchProduct({});
  console.log(product);

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-7">
      {/* ================= HEADER ================= */}
      <TableHeader
        tital={"product"}
        p={"Manage, Create, Update, and Delete"}
        add_page={"/admin/products/add"}
      />

      {/* ================= TABLE ================= */}
      <div className="w-full overflow-hidden rounded-[16px] border border-[#e7eaee] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.04)]">
        {/* ================= TABLE HEADER ================= */}
        <div className="grid grid-cols-[90px_1fr_1fr_80px_80px_80px_2fr] min-h-[49px] items-center border-b border-[#edf0f2] px-5">
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
          <div className="text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            STOCK
          </div>
          <div className="text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            BestSeller
          </div>

          <div className="text-right text-[11px] font-semibold tracking-[0.5px] text-[#667085]">
            ACTION
          </div>
        </div>

        {/* ================= TABLE ROWS ================= */}

        {product?.product?.map((item) => (
          // console.log(item),
          <div
            key={item._id}
            className="grid grid-cols-[90px_1fr_1fr_80px_80px_80px_2fr] min-h-[77px] items-center border-b border-[#f0f2f4] px-5 last:border-b-0 hover:bg-[#fcfdfd] transition-colors"
          >
            {/* ================= IMAGE ================= */}
            <div>
              <div className="w-[44px] h-[44px] rounded-[12px] border border-[#dfe3e8] bg-[#f5f6f7] flex items-center justify-center">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
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
                api={`product/status/${item._id}`}
              />
            </div>

            {/* ================= STOCK ================= */}

            <div>
              <StatusButton
                Status={item.stock}
                api={`product/stock/${item._id}`}
              />
            </div>

            {/* ================= BestSeller ================= */}

            <div>
              <StatusButton
                Status={item.bestSeller}
                api={`product/bestSeller/${item._id}`}
              />
            </div>

            {/* ================= ACTION ================= */}

            <div>
              <ActionsButton
                api={`product/delete/${item._id}`}
                id={item._id}
                tital={"products"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
