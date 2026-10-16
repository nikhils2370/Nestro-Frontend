"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiEye,
  FiEyeOff,
  FiTruck,
  FiStar,
  FiTag,
  FiSend,
} from "react-icons/fi";

export default function AuthForm({ mode = "signin" }) {
  const isSignup = mode === "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    agree: false,
    offers: false,
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

    setLoading(true);

    // Replace this with your API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log(isSignup ? "Signup Data:" : "Signin Data:", form);

    setLoading(false);

    alert(
      isSignup ? "Account created successfully!" : "Signed in successfully!",
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <div
        className={`grid min-h-screen ${
          isSignup ? "lg:grid-cols-[42%_58%]" : "lg:grid-cols-2"
        }`}
      >
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-[#2d1f15] lg:flex">
          <div className="flex w-full flex-col items-center px-10 py-10 text-center">
            {/* Logo */}
            <Link
              href="/"
              className="text-[20px] font-medium tracking-[0.18em] text-white"
            >
              NESTRO<span className="text-[#a8754b]">.</span>
            </Link>

            {/* Center Content */}
            <div className="my-auto max-w-[500px]">
              {/* Furniture Icon */}
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
                Join 12,000 homeowners who`ve transformed their living spaces
                with Nestro.
              </p>

              <div className="mx-auto mt-8 max-w-sm space-y-4 text-left">
                <Benefit
                  icon={<FiTruck />}
                  text="Free delivery + white glove assembly on all orders"
                />

                <Benefit
                  icon={<FiStar />}
                  text="Earn reward points on every purchase"
                />

                <Benefit
                  icon={<FiTag />}
                  text="Members-only prices & early access"
                />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[500px]">
            {/* Tabs */}
            <div className="mb-7 flex border-b border-[#ddd5cc]">
              <Link
                href="/signin"
                className={`relative px-0 pb-3 text-sm transition ${
                  !isSignup ? "mr-7 text-[#8e623f]" : "mr-7 text-[#69717b]"
                }`}
              >
                Sign in
                {!isSignup && (
                  <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#8e623f]" />
                )}
              </Link>

              <Link
                href="/signup"
                className={`relative px-0 pb-3 text-sm transition ${
                  isSignup ? "text-[#8e623f]" : "text-[#69717b]"
                }`}
              >
                Create account
                {isSignup && (
                  <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#8e623f]" />
                )}
              </Link>
            </div>

            {/* Heading */}
            {isSignup ? (
              <>
                <h2 className="text-3xl font-medium sm:text-4xl">
                  Create account
                </h2>

                <p className="mt-2 text-base text-[#707781]">
                  Join Nestro and start designing your dream home.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-medium sm:text-3xl">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-[#707781]">
                  Sign in to your Nestro account to continue.
                </p>
              </>
            )}

            <form onSubmit={handleSubmit} className="mt-7">
              {/* SIGNUP ONLY */}
              {isSignup && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Full name"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Rahul"
                    required
                  />
                </div>
              )}

              {/* EMAIL */}
              <div className={isSignup ? "mt-5" : ""}>
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rahul@email.com"
                  required
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
                    placeholder={isSignup ? "Min. 8 characters" : "••••••••"}
                    required
                    minLength={isSignup ? 8 : undefined}
                    className="h-12 w-full rounded-md border border-[#ddd8d1] bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-[#999] focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737982]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* SIGNIN FORGOT */}
              {!isSignup && (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    className="text-xs text-[#986a45] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* PHONE */}
              {isSignup && (
                <div className="mt-5">
                  <Input
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              )}

              {/* CHECKBOXES */}
              {isSignup && (
                <div className="mt-6 space-y-4">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-[#69717b]">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      required
                      className="mt-1 h-4 w-4 accent-[#946540]"
                    />

                    <span>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-[#946540] hover:underline"
                      >
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

                  <label className="flex cursor-pointer items-center gap-3 text-sm text-[#69717b]">
                    <input
                      type="checkbox"
                      name="offers"
                      checked={form.offers}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#946540]"
                    />

                    <span>Send me design tips & exclusive offers</span>
                  </label>
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#946540] text-sm font-medium tracking-wide text-white transition hover:bg-[#805535] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {isSignup ? "Creating account..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    {isSignup ? "Create Account" : "Sign in"}

                    {!isSignup && <span>→</span>}
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#ddd8d1]" />
              <span className="text-xs text-[#707781]">
                {isSignup ? "or sign up with" : "or continue with"}
              </span>
              <div className="h-px flex-1 bg-[#ddd8d1]" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#ddd8d1] bg-white text-sm text-[#34383d] transition hover:bg-[#faf9f7]"
            >
              <span className="font-medium">G</span>
              Continue with Google
            </button>

            {/* APPLE ONLY SIGNIN */}
            {!isSignup && (
              <button
                type="button"
                className="mt-3 flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#ddd8d1] bg-white text-sm text-[#34383d] transition hover:bg-[#faf9f7]"
              >
                <span className="text-base"></span>
                Continue with Apple
              </button>
            )}

            {/* BOTTOM LINK */}
            <p className="mt-6 text-center text-xs text-[#707781]">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-[#946540] hover:underline"
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don`t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[#946540] hover:underline"
                  >
                    Create one free
                  </Link>
                </>
              )}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* INPUT COMPONENT */

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs text-[#6f747b]">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-md border border-[#ddd8d1] bg-white px-4 text-sm outline-none transition placeholder:text-[#999] focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
      />
    </div>
  );
}

/* BENEFIT */

function Benefit({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#986a45]/20 text-[#c49a72]">
        {icon}
      </div>

      <p className="text-xs leading-5 text-[#b9aa9c]">{text}</p>
    </div>
  );
}
