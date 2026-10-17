import { Suspense } from "react";
import VerifyOtpForm from "./VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#946540] border-t-transparent" />
        </div>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  );
}
