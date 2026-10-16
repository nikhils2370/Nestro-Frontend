"use client";

import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";

export default function Header() {
  return (
    <header className=" sticky top-0 left-[255px] right-0 z-40 h-[65px] bg-white border-b border-[#e9edf1]">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left */}
        <div>
          <h1 className="text-[17px] font-semibold text-[#101828]">
            Dashboard
          </h1>

          <p className="mt-[2px] text-[12px] text-[#667085]">
            Welcome back 👋
          </p>
        </div>

        {/* Center Search */}
        <div className="relative w-[385px]">
          <FiSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-[38px] rounded-[12px] border border-[#dfe3e8] bg-[#f9fafb] pl-10 pr-4 text-[13px] text-[#344054] outline-none placeholder:text-[#b5bdc9] focus:border-[#00a99d] focus:bg-white transition-colors"
          />
        </div>

        {/* Right */}
        <div className="flex items-center">
          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-[40px] h-[40px] flex items-center justify-center rounded-full text-[#475467] hover:bg-[#f2f4f7] transition-colors"
          >
            <FiBell size={19} strokeWidth={1.8} />

            <span className="absolute top-[8px] right-[9px] w-[6px] h-[6px] rounded-full bg-[#00a99d] border border-white" />
          </button>

          {/* Divider */}
          <div className="mx-4 h-[28px] w-px bg-[#eaecf0]" />

          {/* User */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-[10px] px-1 py-1 hover:bg-[#f8f9fa] transition-colors"
          >
            <div className="w-[36px] h-[36px] rounded-full bg-[#009f98] border border-[#00c7b7] flex items-center justify-center text-white text-[13px] font-semibold">
              A
            </div>

            <div className="text-left leading-none">
              <p className="text-[12px] font-semibold text-[#344054]">
                Admin
              </p>

              <p className="mt-[5px] text-[10px] text-[#667085]">
                Super Admin
              </p>
            </div>

            <FiChevronDown
              size={15}
              className="ml-1 text-[#98a2b3]"
            />
          </button>
        </div>
      </div>
    </header>
  );
};