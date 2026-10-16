"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      toast.error("Please accept Terms and Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      const response = await client.post("/user/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (!response.data.success) {
        toast.error(response.data.message || "Registration failed");
        return;
      }

      toast.success(response.data.message || "OTP sent successfully");

      // OTP page par email bhej rahe hain
      router.push(`/verifyotp?email=${encodeURIComponent(form.email)}`);
    } catch (error) {
      console.error("Signup Error:", error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[42%_58%]">
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
              Your{" "}
              <span className="font-serif italic text-[#d8b18e]">
                Dream Home
              </span>
              <br />
              Starts Here
            </h1>

            <p className="mt-5 text-sm leading-6 text-[#b9aa9c]">
              Join Nestro and start designing your dream home.
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[500px]">
          <div className="mb-7 flex border-b border-[#ddd5cc]">
            <Link href="/signin" className="mr-7 pb-3 text-sm text-[#69717b]">
              Sign in
            </Link>

            <Link
              href="/signup"
              className="relative pb-3 text-sm text-[#8e623f]"
            >
              Create account
              <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#8e623f]" />
            </Link>
          </div>

          <h2 className="text-3xl font-medium sm:text-4xl">Create account</h2>

          <p className="mt-2 text-base text-[#707781]">
            Join Nestro and start designing your dream home.
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-xs text-[#6f747b]">
                Full name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul"
                required
                className="h-12 w-full rounded-md border border-[#ddd8d1] bg-white px-4 text-sm outline-none focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
              />
            </div>

            {/* EMAIL */}
            <div className="mt-5">
              <label className="mb-2 block text-xs text-[#6f747b]">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="rahul@email.com"
                required
                className="h-12 w-full rounded-md border border-[#ddd8d1] bg-white px-4 text-sm outline-none focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-5">
              <label className="mb-2 block text-xs text-[#6f747b]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  minLength={6}
                  required
                  className="h-12 w-full rounded-md border border-[#ddd8d1] bg-white px-4 pr-12 text-sm outline-none focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737982]"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-[#69717b]">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                // required
                className="mt-1 h-4 w-4 accent-[#946540]"
              />

              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-[#946540] hover:underline">
                  Terms of Service
                </Link>{" "}
                &{" "}
                <Link
                  href="/privacy"
                  className="text-[#946540] hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex h-12 w-full items-center justify-center rounded-md bg-[#946540] text-sm font-medium tracking-wide text-white transition hover:bg-[#805535] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#707781]">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#946540] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
