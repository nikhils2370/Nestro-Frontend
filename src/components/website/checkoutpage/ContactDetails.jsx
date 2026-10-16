"use client";

import { FiMail, FiUser } from "react-icons/fi";

export default function ContactDetails({ user }) {
  return (
    <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-6">
      <h2 className="mb-4 font-semibold text-[#292827]">Contact details</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <p className="flex gap-2 break-words text-sm text-[#454545]"><FiUser className="mt-0.5 shrink-0 text-[#8a684b]" />{user?.name}</p>
        <p className="flex gap-2 break-all text-sm text-[#454545]"><FiMail className="mt-0.5 shrink-0 text-[#8a684b]" />{user?.email}</p>
      </div>
    </section>
  );
}
