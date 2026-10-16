"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { client } from "@/utils/helper";
import { setUser as saveUser, clearUser } from "@/redux/features/userSlice";
import { lstoCart } from "@/redux/features/cartSlice.js";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Checkout", href: "/checkout" },
];

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const store = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [profileLoading, setProfileLoading] = useState(!user);

  // Fetch profile and save user in Redux
  useEffect(() => {
    let active = true;
     dispatch(lstoCart());

    const getProfile = async () => {
      try {
        const response = await client.get("user/get-me");

        if (!active) return;

        if (response?.data.success && response.data.user) {
          dispatch(saveUser(response.data.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        if (active) {
          dispatch(clearUser());
        }
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    };

    getProfile();

    return () => {
      active = false;
    };
  }, [dispatch, pathname]);

  // Logout
  const logoutUser = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const response = await client.post("user/logout");

      if (response.data.success) {
        dispatch(clearUser());
        setMobileOpen(false);

        toast.success(response.data.message || "Logout successful");

        router.replace("/signin");
        router.refresh();
      } else {
        toast.error(response.data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to logout");
    } finally {
      setLoggingOut(false);
    }
  };

  const firstLetter = user?.name?.trim()?.charAt(0)?.toUpperCase() || "";

  const cartCount =
    store?.items?.reduce((total, item) => total + (Number(item.qty) || 0), 0) ??
    0;

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8e3dc] bg-[#faf9f7]">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-[17px] font-medium tracking-[0.18em] text-[#292827]"
        >
          NESTRO.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-md px-3 py-2 text-[12px] tracking-wide transition-colors ${
                isActive(item.href)
                  ? "bg-[#eee9e2] text-[#806548]"
                  : "text-[#737782] hover:bg-[#f0ece6] hover:text-[#4d4b48]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center text-[#454545] hover:text-[#8a684b]"
          >
            <FiSearch size={18} />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative flex h-9 w-9 items-center justify-center text-[#454545] hover:text-[#8a684b]"
          >
            <FiShoppingBag size={19} />

            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#8a684b] px-1 text-[9px] text-white">
              {cartCount}
            </span>
          </Link>

          {/* Profile */}
          <Link
            href={user ? "/account" : "/signin"}
            aria-label={user ? `${user.name} profile` : "Sign in"}
            title={user?.name || "Sign in"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cdbda9] bg-[#eee9e2] text-sm font-semibold text-[#806548] transition-colors hover:bg-[#e5d9c9]"
          >
            {profileLoading && !user ? (
              <span className="h-4 w-4 animate-pulse rounded-full bg-[#cdbda9]" />
            ) : user ? (
              firstLetter || <FiUser size={18} />
            ) : (
              <FiUser size={18} />
            )}
          </Link>

          {/* Desktop Sign In / Logout */}
          {user ? (
            <button
              type="button"
              onClick={logoutUser}
              disabled={loggingOut}
              className="hidden items-center gap-2 rounded-md border border-[#cdbda9] px-3 py-2 text-xs font-medium text-[#806548] hover:bg-[#eee9e2] disabled:opacity-60 md:flex"
            >
              <FiLogOut size={15} />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link
              href="/signin"
              className="hidden rounded-md bg-[#8a684b] px-4 py-2 text-xs font-medium text-white hover:bg-[#705239] md:block"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center text-[#454545] md:hidden"
          >
            {mobileOpen ? <FiX size={21} /> : <FiMenu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-[#e8e3dc] bg-[#faf9f7] transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-3 sm:px-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-md px-3 py-3 text-sm ${
                isActive(item.href)
                  ? "bg-[#eee9e2] font-medium text-[#806548]"
                  : "text-[#737782] hover:bg-[#f0ece6]"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Profile */}
          {user && (
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-[#454545] hover:bg-[#f0ece6]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee9e2] font-semibold text-[#806548]">
                {firstLetter || <FiUser />}
              </span>

              <span className="min-w-0">
                <span className="block font-medium">{user.name}</span>
                <span className="block truncate text-xs text-[#737782]">
                  View profile
                </span>
              </span>
            </Link>
          )}

          {/* Mobile Sign In / Logout */}
          {user ? (
            <button
              type="button"
              onClick={logoutUser}
              disabled={loggingOut}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <FiLogOut size={17} />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link
              href="/signin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-[#806548] hover:bg-[#f0ece6]"
            >
              <FiUser size={17} />
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
