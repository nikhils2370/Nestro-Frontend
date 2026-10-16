import { fatchCategory } from "@/api/CategoryAPI";

export default async function CategorySection() {
  const category = await fatchCategory();
  return (
    <section className="w-full px-4 pt-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mb-5">
          <p className="text-[9px] font-medium tracking-[0.28em] text-[#9a6c4c]">
            BROWSE
          </p>

          <h2 className="mt-2 text-[18px] font-normal tracking-[-0.01em] text-[#171717]">
            Shop by Category
          </h2>
        </div>

        {/* Categories */}
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide sm:gap-6 md:gap-7 lg:gap-8">
          {category?.data?.map((category) => (
            <button
              key={category.name}
              className="group flex min-w-[85px] flex-shrink-0 flex-col items-center text-center"
            >
              {/* Image */}
              <div className="relative h-[86px] w-[86px] overflow-hidden rounded-full border border-[#d8d0c7] p-[2px] transition-all duration-300 group-hover:border-[#9d7658] group-hover:shadow-md sm:h-[88px] sm:w-[88px]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <h3 className="mt-2 text-[12px] font-medium text-[#242424]">
                {category.name}
              </h3>

              {/* Count */}
              <p className="mt-[2px] text-[10px] text-[#929292]">
                {category.count}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
