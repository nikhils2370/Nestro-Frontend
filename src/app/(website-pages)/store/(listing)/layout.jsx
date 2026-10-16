import FilterSidebar from "@/components/website/store/FilterSidebar";
import SortBar from "@/components/website/store/SortBar";
import StoreHero from "@/components/website/store/StoreHero.jsx";
import PromoBanner from "@/components/website/store/PromoBanner";
import MobileFilter from "@/components/website/store/MobileFilter";

import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <div className=" hidden sm:block">
        <StoreHero />
      </div>

      <div className="my-6 w-full px-4 sm:my-8 sm:px-6 lg:my-10">
        {/* Mobile Filter */}
        {/* <div className="mb-5 lg:hidden">
          <MobileFilter>
            <FilterSidebar />
          </MobileFilter>
        </div> */}

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-10">
          {/* Desktop Filter */}
          <div className="hidden lg:block lg:w-72 lg:shrink-0">
            <FilterSidebar />
          </div>

          {/* Products */}
          <div className="min-w-0 flex-1">
            <SortBar />

            {children}

            <PromoBanner />
          </div>
        </div>
      </div>
    </>
  );
}
