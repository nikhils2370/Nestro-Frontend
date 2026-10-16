"use client";

import { useState } from "react";
import {
    FiGrid,
    FiTag,
    FiPackage,
    FiHome,
    FiDroplet,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";
import { SiSpeedtest } from "react-icons/si";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { usePathname } from "next/navigation";



const menuItems = [
    {
        title: "Dashboard",
        icon: FiGrid,
        href: "/admin",
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
    {
        title: "Colors",
        icon: FiDroplet,
        href: "/admin/colors",
    },
];

const systemItems = [
    {
        title: "Settings",
        icon: FiSettings,
        href: "/admin/settings",
    },
];

export default function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`sticky top-0
        z-50
        h-screen
        bg-[#0b1b2a]
        text-white
        border-r
        border-[#203141]
        transition-all
        duration-300
        ease-in-out
        ${collapsed ? "w-23" : "w-[255px]"}
      `}
        >
            {/* ================= LOGO ================= */}
            <div
                className={`
          h-[65px]
          flex
          items-center
          border-b
          border-[#203141]
          ${collapsed ? "justify-center px-3" : "px-4"}
        `}
            >
                {/* Logo */}
                <div className="relative shrink-0">
                    <div
                        className="w-[36px]
              h-[36px]
              rounded-[11px]
              bg-gradient-to-br
              from-[#00b8a9]
              to-[#009b91]
              flex
              items-center
              justify-center
              shadow-lg
              shadow-[#00b8a9]/20
            "
                    >
                        <span className="text-white text-[20px] font-medium">
                            <SiSpeedtest />
                        </span>
                    </div>
                </div>

                {/* Brand */}
                {!collapsed && (
                    <div className="ml-3 leading-none">
                        <h1 className="text-[15px] font-semibold tracking-tight">
                            AdminPanel
                        </h1>

                        <p className="mt-[6px] text-[10px] font-medium text-[#00c7b7]">
                            Pro Dashboard
                        </p>
                    </div>
                )}
            </div>

            {/* ================= MAIN MENU ================= */}
            <div className="px-2 pt-5">
                {!collapsed && (
                    <p className="px-3 mb-4 text-[10px] font-semibold tracking-[1.4px] text-[#718499]">
                        MAIN MENU
                    </p>
                )}

                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === pathname;

                        return (
                            <a
                                key={item.title}
                                href={item.href}
                                className={`
                  group
                  relative
                  h-[54px]
                  flex
                  items-center
                  rounded-[12px]
                  transition-all
                  duration-200
                  ${isActive
                                        ? "bg-[#063c43] text-[#00c7b7]"
                                        : "text-[#8da0b4] hover:bg-[#122b3d] hover:text-white"
                                    }
                  ${collapsed ? "justify-center" : "px-2"}
                `}
                            >
                                {/* Active left indicator */}
                                {isActive && (
                                    <span
                                        className="
                      absolute
                      left-0
                      top-[13px]
                      w-[3px]
                      h-[28px]
                      rounded-r-full
                      bg-[#00c7b7]
                    "
                                    />
                                )}

                                {/* Icon box */}
                                <div
                                    className={`
                    w-[38px]
                    h-[38px]
                    rounded-[10px]
                    flex
                    items-center
                    justify-center
                    shrink-0
                    ${isActive
                                            ? "bg-[#00545a]"
                                            : "bg-transparent group-hover:bg-[#193346]"
                                        }
                  `}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {!collapsed && (
                                    <span className="ml-2 text-[14px] font-medium">
                                        {item.title}
                                    </span>
                                )}
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* ================= SYSTEM ================= */}
            <div className="px-2 mt-7">
                {!collapsed && (
                    <p className="px-3 mb-4 text-[10px] font-semibold tracking-[1.4px] text-[#718499]">
                        SYSTEM
                    </p>
                )}

                <nav>
                    {systemItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.title}
                                href={item.href}
                                className={`
                  group
                  h-[54px]
                  flex
                  items-center
                  rounded-[12px]
                  text-[#718499]
                  hover:bg-[#122b3d]
                  hover:text-white
                  transition-all
                  duration-200
                  ${collapsed ? "justify-center" : "px-2"}
                `}
                            >
                                <div
                                    className="
                    w-[38px]
                    h-[38px]
                    rounded-[10px]
                    flex
                    items-center
                    justify-center
                    shrink-0
                    group-hover:bg-[#193346]
                  "
                                >
                                    <Icon size={18} strokeWidth={1.8} />
                                </div>

                                {!collapsed && (
                                    <span className="ml-2 text-[14px] font-medium">
                                        {item.title}
                                    </span>
                                )}
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* ================= BOTTOM USER ================= */}
            <div
                className="
          absolute
          bottom-0
          left-0
          right-0
          h-[79px]
          border-t
          border-[#203141]
          bg-[#0b1b2a]
        "
            >
                <div
                    className={`
            h-full
            flex
            items-center
            ${collapsed ? "justify-center" : "px-4"}
          `}
                >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div
                            className="
                w-[39px]
                h-[39px]
                rounded-full
                bg-[#009f98]
                border
                border-[#00c7b7]
                flex
                items-center
                justify-center
                text-white
                text-[14px]
                font-semibold
              "
                        >
                            A
                        </div>

                        {/* Online dot */}
                        <span
                            className="
                absolute
                right-[-1px]
                bottom-[-1px]
                w-[10px]
                h-[10px]
                rounded-full
                bg-[#00d99d]
                border-2
                border-[#0b1b2a]
              "
                        />
                    </div>

                    {!collapsed && (
                        <>
                            <div className="ml-3 min-w-0">
                                <p className="text-[14px] font-semibold text-white">
                                    Admin
                                </p>

                                <p className="mt-[2px] text-[10px] text-[#718499]">
                                    Super Admin
                                </p>
                            </div>

                            <button
                                type="button"
                                className="
                  ml-auto
                  text-[#657b91]
                  hover:text-white
                  transition-colors
                "
                                aria-label="Logout"
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
                className="absolute top-5.5 right-1 text-2xl z-50 bg-[#0b1b2a] text-[#8da0b4] hover:text-white hover:border-[#00b8a9] flex items-center justify-center transition-all cursor-pointer
        "
            >
                {collapsed ? (
                    <GoSidebarCollapse size={20} />

                ) : (
                    <GoSidebarExpand />
                )}
            </button>
        </aside>
    );
}