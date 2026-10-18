"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiGrid,
  FiTag,
  FiPackage,
  FiHome,
  FiDroplet,
  FiSettings,
  FiLogOut,
  FiShoppingBag,
} from "react-icons/fi";
import { SiSpeedtest } from "react-icons/si";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/redux/features/userSlice";
import { toast } from "sonner";
import { client } from "@/utils/helper";

const menuItems = [
  {
    title: "Dashboard",
    icon: FiGrid,
    href: "/admin",
  },
  {
    title: "Orders",
    icon: FiShoppingBag,
    href: "/admin/orders",
  },
  {
    title: "Category",
    icon: FiTag,
    href: "/admin/category",
  },
  {
    title: "Products",
    icon: FiPackage,
    href: "/admin/products",
  },
  {
    title: "Rooms",
    icon: FiHome,
    href: "/admin/rooms",
  },
];

const systemItems = [
  {
    title: "View Store",
    icon: FiPackage,
    href: "/store",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await client.post("user/logout");
    } catch (e) {
      console.warn("Logout error:", e);
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; max-age=0";
    }
    dispatch(clearUser());
    toast.success("Logged out successfully");
    window.location.href = "/signin";
  };

  const displayName = user?.name || "Admin";
  const displayRole =
    user?.role === "superadmin"
      ? "Super Admin"
      : user?.role === "admin"
        ? "Admin"
        : "Staff";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <aside
      className={`sticky top-0 z-50 h-screen border-r border-[#203141] bg-[#0b1b2a] text-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[255px]"
      }`}
    >
      {/* ================= LOGO ================= */}
      <div
        className={`flex h-[65px] items-center border-b border-[#203141] ${
          collapsed ? "justify-center px-3" : "px-4"
        }`}
      >
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#00b8a9] to-[#009b91] shadow-lg shadow-[#00b8a9]/20">
            <span className="text-[20px] font-medium text-white">
              <SiSpeedtest />
            </span>
          </div>

          {!collapsed && (
            <div className="leading-none">
              <h1 className="text-[15px] font-semibold tracking-tight">
                AdminPanel
              </h1>
              <p className="mt-[6px] text-[10px] font-medium text-[#00c7b7]">
                Pro Dashboard
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* ================= MAIN MENU ================= */}
      <div className="px-2 pt-5">
        {!collapsed && (
          <p className="mb-4 px-3 text-[10px] font-semibold tracking-[1.4px] text-[#718499]">
            MAIN MENU
          </p>
        )}

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative flex h-[50px] items-center rounded-[12px] transition-all duration-200 ${
                  isActive
                    ? "bg-[#063c43] text-[#00c7b7]"
                    : "text-[#8da0b4] hover:bg-[#122b3d] hover:text-white"
                } ${collapsed ? "justify-center" : "px-2"}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-[11px] h-[28px] w-[3px] rounded-r-full bg-[#00c7b7]" />
                )}

                <div
                  className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] ${
                    isActive
                      ? "bg-[#00545a]"
                      : "bg-transparent group-hover:bg-[#193346]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                {!collapsed && (
                  <span className="ml-2 text-[14px] font-medium">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================= SYSTEM ================= */}
      <div className="mt-7 px-2">
        {!collapsed && (
          <p className="mb-4 px-3 text-[10px] font-semibold tracking-[1.4px] text-[#718499]">
            WEBSITE
          </p>
        )}

        <nav>
          {systemItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex h-[50px] items-center rounded-[12px] text-[#718499] transition-all duration-200 hover:bg-[#122b3d] hover:text-white ${
                  collapsed ? "justify-center" : "px-2"
                }`}
              >
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] group-hover:bg-[#193346]">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                {!collapsed && (
                  <span className="ml-2 text-[14px] font-medium">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================= BOTTOM USER ================= */}
      <div className="absolute bottom-0 left-0 right-0 h-[79px] border-t border-[#203141] bg-[#0b1b2a]">
        <div
          className={`flex h-full items-center ${
            collapsed ? "justify-center" : "px-4"
          }`}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full border border-[#00c7b7] bg-[#009f98] text-[14px] font-semibold text-white">
              {firstLetter}
            </div>

            <span className="absolute bottom-[-1px] right-[-1px] h-[10px] w-[10px] rounded-full border-2 border-[#0b1b2a] bg-[#00d99d]" />
          </div>

          {!collapsed && (
            <>
              <div className="ml-3 min-w-0">
                <p className="truncate text-[14px] font-semibold text-white">
                  {displayName}
                </p>
                <p className="mt-[2px] text-[10px] text-[#718499]">
                  {displayRole}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-[#657b91] transition-colors hover:bg-[#193346] hover:text-red-400"
                aria-label="Logout"
                title="Sign out"
              >
                <FiLogOut size={17} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ================= COLLAPSE TOGGLE ================= */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute right-2 top-5.5 z-50 flex items-center justify-center bg-[#0b1b2a] text-[#8da0b4] transition-all hover:text-white"
      >
        {collapsed ? <GoSidebarCollapse size={20} /> : <GoSidebarExpand size={20} />}
      </button>
    </aside>
  );
}