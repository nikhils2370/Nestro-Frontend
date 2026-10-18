"use client";

import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user?.user);

  const displayName = user?.name || "Admin";
  const displayRole =
    user?.role === "superadmin"
      ? "Super Admin"
      : user?.role === "admin"
        ? "Admin"
        : "Staff";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 right-0 z-40 h-[65px] border-b border-[#e9edf1] bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left */}
        <div>
          <h1 className="text-[17px] font-semibold text-[#101828]">
            Dashboard
          </h1>
          <p className="mt-[2px] text-[12px] text-[#667085]">
            Welcome back, {displayName} 👋
          </p>
        </div>

        {/* Center Search */}
        <div className="relative hidden w-[340px] md:block">
          <FiSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98a2b3]"
          />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="h-[38px] w-full rounded-[12px] border border-[#dfe3e8] bg-[#f9fafb] pl-10 pr-4 text-[13px] text-[#344054] outline-none transition-colors placeholder:text-[#b5bdc9] focus:border-[#00a99d] focus:bg-white"
          />
        </div>

        {/* Right */}
        <div className="flex items-center">
          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-[40px] w-[40px] items-center justify-center rounded-full text-[#475467] transition-colors hover:bg-[#f2f4f7]"
          >
            <FiBell size={19} strokeWidth={1.8} />
            <span className="absolute right-[9px] top-[8px] h-[6px] w-[6px] rounded-full border border-white bg-[#00a99d]" />
          </button>

          {/* Divider */}
          <div className="mx-4 h-[28px] w-px bg-[#eaecf0]" />

          {/* User Badge */}
          <div className="flex items-center gap-2.5 rounded-[10px] px-1 py-1">
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#00c7b7] bg-[#009f98] text-[13px] font-semibold text-white">
              {firstLetter}
            </div>

            <div className="text-left leading-none">
              <p className="text-[12px] font-semibold text-[#344054]">
                {displayName}
              </p>
              <p className="mt-[4px] text-[10px] text-[#667085]">
                {displayRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}