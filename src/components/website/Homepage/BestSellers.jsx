import Link from "next/link";
import { fetchProduct } from "@/api/ProductAPI";
import BestSellersSlider from "./BestSellersSlider";

export default async function BestSellers() {
  const response = await fetchProduct({
    status: true,
    bestSeller: true,
    limit: 7,
  });

  const products = response?.product || [];

  return (
    <section className="w-full px-4 pb-8 pt-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-medium tracking-[0.28em] text-[#9a6c4c]">
              HANDPICKED FOR YOU
            </p>

            <h2 className="mt-2 text-[18px] font-normal text-[#171717]">
              Best Sellers
            </h2>
          </div>

          <Link
            href="/store"
            className="text-[11px] text-[#9a6c4c] underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Client Slider */}
        <BestSellersSlider products={products} />
      </div>
    </section>
  );
}
