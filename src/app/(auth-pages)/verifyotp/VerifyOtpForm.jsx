"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await client.post("user/verify-register-otp", {
        email,
        otp,
      });

      if (!response.data.success) {
        toast.error(response.data.message || "Invalid OTP");
        return;
      }

      toast.success(response.data.message || "Email verified successfully");

      router.push("/signin");
    } catch (error) {
      console.error("OTP Error:", error);

      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center text-2xl font-medium tracking-[0.18em]"
        >
          NESTRO<span className="text-[#a8754b]">.</span>
        </Link>

        <div className="mt-10 rounded-xl border border-[#ddd8d1] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-medium">Verify your email</h1>

          <p className="mt-2 text-sm leading-6 text-[#707781]">
            We have sent a 6-digit verification code to:
          </p>

          <p className="mt-2 break-all font-medium text-[#946540]">{email}</p>

          <form onSubmit={handleSubmit} className="mt-7">
            <label className="mb-2 block text-xs text-[#6f747b]">
              Verification OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="000000"
              required
              className="h-14 w-full rounded-md border border-[#ddd8d1] bg-white px-4 text-center text-xl tracking-[0.5em] outline-none focus:border-[#986a45] focus:ring-1 focus:ring-[#986a45]"
            />

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-[#946540] text-sm font-medium text-white transition hover:bg-[#805535] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#707781]">
            Wrong email?{" "}
            <Link href="/signup" className="text-[#946540] hover:underline">
              Create account again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
