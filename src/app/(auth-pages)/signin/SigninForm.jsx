"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { client } from "@/utils/helper";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const redirect = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // 1. Login request
      const response = await client.post("user/login", {
        email: form.email.trim(),
        password: form.password,
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Login failed");
        return;
      }

      const token = response.data?.token;
      const user = response.data?.user;
      
      

      if (!token) {
        toast.error("Login token was not received from the server");
        return;
      }

      // 2. Save token
      localStorage.setItem("token", token);

      document.cookie = [
        `token=${encodeURIComponent(token)}`,
        "path=/",
        "max-age=2592000",
        "SameSite=Lax",
      ].join("; ");

      // 3. Save user in Redux
      if (user) {
        dispatch(setUser(user));
      }

      // 4. Read cart from localStorage
      let cartItems = [];

      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "null");

        let items = [];

        if (Array.isArray(cart)) {
          items = cart;
        } else if (Array.isArray(cart?.items)) {
          items = cart.items;
        }

        cartItems = items
          .filter((item) => item?.id && Number(item.qty) > 0)
          .map((item) => ({
            id: item.id,
            qty: Number(item.qty),
          }));
      } catch (error) {
        console.error("Cart read error:", error);
        toast.error("Unable to read cart data");
        return;
      }

      // 5. Sync cart with backend
      if (cartItems.length > 0) {
        const syncResponse = await client.post("cart/sync", {
          items: JSON.stringify(cartItems),
        });

        if (syncResponse.data?.success === false) {
          toast.error(syncResponse.data.message || "Cart sync failed");
          return;
        }
      }

      // 6. Success and redirect
      toast.success(response.data.message || "Login successful");

      if (user.role === "admin" || user.role === "superadmin") {
        router.push("admin");
      } else {
      router.replace(redirect);
      }
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* LEFT */}
      <section className="relative hidden overflow-hidden bg-[#2d1f15] lg:flex">
        <div className="flex w-full flex-col items-center px-10 py-10 text-center">
          <Link
            href="/"
            className="text-[20px] font-medium tracking-[0.18em] text-white"
          >
            NESTRO<span className="text-[#a8754b]">.</span>
          </Link>

          <div className="my-auto max-w-[500px]">
            <div className="mx-auto mb-10 flex h-24 w-28 items-center justify-center rounded-xl bg-[#9a704d]/20">
              <div className="relative h-14 w-24 rounded-lg bg-[#987151]">
                <div className="absolute -left-2 top-3 h-12 w-4 rounded bg-[#a87952]" />
                <div className="absolute -right-2 top-3 h-12 w-4 rounded bg-[#a87952]" />
                <div className="absolute -top-3 left-2 h-8 w-10 rounded bg-[#a17a5a]" />
                <div className="absolute -top-3 right-2 h-8 w-10 rounded bg-[#a17a5a]" />
              </div>
            </div>

            <h1 className="text-4xl font-light leading-tight text-white xl:text-5xl">
              Welcome{" "}
              <span className="font-serif italic text-[#d8b18e]">Back</span>
              <br />
              to Nestro
            </h1>

            <p className="mt-5 text-sm leading-6 text-[#b9aa9c]">
              Sign in to continue shopping and manage your Nestro account.
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[500px]">
          {/* TABS */}
          <div className="mb-7 flex border-b border-[#ddd5cc]">
            <Link
              href={`/signin${
                redirect !== "/"
                  ? `?redirect=${encodeURIComponent(redirect)}`
                  : ""
              }`}
              className="relative mr-7 pb-3 text-sm text-[#8e623f]"
            >
              Sign in
              <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#8e623f]" />
            </Link>

            <Link href="/signup" className="pb-3 text-sm text-[#69717b]">
              Create account
            </Link>
          </div>

          <h2 className="text-2xl font-medium sm:text-3xl">Welcome back</h2>

          <p className="mt-2 text-sm text-[#707781]">
            Sign in to your Nestro account to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs text-[#6f747b]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="rahul@email.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-md border border-[#ddd8d1] bg-white px-4 text-sm outline-none transition placeholder:text-[#999] focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-2 block text-xs text-[#6f747b]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="h-12 w-full rounded-md border border-[#ddd8d1] bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-[#999] focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737982]"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* FORGOT */}
            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-xs text-[#986a45] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#946540] text-sm font-medium tracking-wide text-white transition hover:bg-[#805535] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* GOOGLE */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#ddd8d1]" />
            <span className="text-xs text-[#707781]">or continue with</span>
            <div className="h-px flex-1 bg-[#ddd8d1]" />
          </div>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#ddd8d1] bg-white text-sm text-[#34383d] transition hover:bg-[#faf9f7]"
          >
            <span className="font-medium">G</span>
            Continue with Google
          </button>

          {/* SIGNUP */}
          <p className="mt-6 text-center text-xs text-[#707781]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#946540] hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
