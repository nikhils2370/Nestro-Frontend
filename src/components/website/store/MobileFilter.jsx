"use client";

import { useState } from "react";
import { FiSliders, FiX } from "react-icons/fi";

export default function MobileFilter({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Open Filter Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-stone-200
          bg-white
          px-4
          py-3
          text-sm
          font-medium
          text-stone-800
          shadow-sm
          transition
          hover:border-[#94623f]
          hover:text-[#94623f]
          sm:w-auto
        "
      >
        <FiSliders size={17} />
        Filters
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div
            className="
              absolute
              left-0
              top-0
              h-full
              w-[85%]
              max-w-sm
              overflow-y-auto
              bg-white
              shadow-2xl
            "
          >
            {/* Drawer Header */}
            <div
              className="
                sticky
                top-0
                z-20
                flex
                items-center
                justify-between
                border-b
                border-stone-200
                bg-white
                px-5
                py-4
              "
            >
              <div>
                <h2 className="text-lg font-bold text-stone-900">Filters</h2>

                <p className="text-xs text-stone-500">Refine your search</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-stone-100
                  text-stone-600
                  transition
                  hover:bg-stone-200
                "
                aria-label="Close filters"
              >
                <FiX size={19} />
              </button>
            </div>

            {/* FilterSidebar comes through children */}
            <div className="p-4 sm:p-5">{children}</div>

            {/* Bottom Button */}
            <div
              className="
                sticky
                bottom-0
                z-20
                border-t
                border-stone-200
                bg-white
                p-4
              "
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  w-full
                  rounded-xl
                  bg-[#94623f]
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#7d5032]
                "
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
