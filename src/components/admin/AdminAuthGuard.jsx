"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { client } from "@/utils/helper";
import { setUser, clearUser } from "@/redux/features/userSlice";

export default function AdminAuthGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.user);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkAdminAuth() {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        if (active) {
          router.replace("/signin?redirect=/admin");
        }
        return;
      }

      try {
        const response = await client.get("user/get-me");
        if (!active) return;

        if (response.data?.success && response.data?.user) {
          const user = response.data.user;
          dispatch(setUser(user));

          if (user.role === "admin" || user.role === "superadmin") {
            setAuthorized(true);
          } else {
            router.replace("/signin?redirect=/admin");
          }
        } else {
          dispatch(clearUser());
          router.replace("/signin?redirect=/admin");
        }
      } catch (error) {
        if (active) {
          dispatch(clearUser());
          router.replace("/signin?redirect=/admin");
        }
      } finally {
        if (active) setChecking(false);
      }
    }

    checkAdminAuth();
    return () => {
      active = false;
    };
  }, [router, dispatch]);

  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0b1b2a] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#00c7b7] border-t-transparent" />
          <p className="text-xs font-medium tracking-wide text-[#8da0b4]">
            Verifying Admin Access...
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return children;
}
