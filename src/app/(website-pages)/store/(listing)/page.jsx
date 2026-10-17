import { fetchProduct } from "@/api/ProductAPI";
import ProductCard from "@/components/website/UI/ProductCard.jsx";
import Pagination from "@/components/website/store/Pagination";


export default async function Page({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || null;
  const room_type = params?.room_type || null;
  const min_price = params?.min_price || null;
  const max_price = params?.max_price || null;
  const stock = params?.stock || null;
  const sort = params?.sort || null;
  const page = Number(params?.page) || 1;
  const limit = 3;
  const response = await fetchProduct({
    category,
    room_type,
    status: true,
    min_price,
    max_price,
    stock,
    sort,
    page,
    limit,
  });
  // console.log(response.pages, "my-response");
  return (
    <>
      {/* Category */}
      {category && (
        <div className="mb-5">
          <h2 className="text-lg font-semibold capitalize text-[#2d2118]">
            {category}
          </h2>
        </div>
      )}
      {/* Products */}
      {response?.product?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {response.product.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      ) : (
        /* Empty State */ <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#ded5ce] bg-[#faf8f6] px-5 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#eee7e1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-[#9a6844]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M5 7l1 12h12l1-12M9 7V5a3 3 0 016 0v2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#2d2118]">
            Products Not Found
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#8c8178]">
            Sorry, we couldn`t find any products in this category. Try selecting
            another category or check back later.
          </p>
        </div>
      )}
      <Pagination totalPages={response?.pages || 1} />
    </>
  );
}
