"use client";

import { FiCreditCard, FiTruck } from "react-icons/fi";

export default function PaymentMethod({ value, onChange }) {
  const methods = [
    { id: "cod", title: "Cash on Delivery", description: "Pay when your order arrives.", Icon: FiTruck },
    { id: "online", title: "Online payment", description: "Requires payment gateway integration.", Icon: FiCreditCard },
  ];
  return (
    <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-6">
      <h2 className="mb-4 font-semibold text-[#292827]">Payment method</h2>
      <div className="space-y-3">
        {methods.map(({ id, title, description, Icon }) => (
          <label key={id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${value === id ? "border-[#8a684b] bg-[#faf6f0]" : "border-[#e8e3dc]"}`}>
            <input type="radio" name="paymentMethod" checked={value === id} onChange={() => onChange(id)} className="mt-1 accent-[#8a684b]" />
            <span className="flex-1"><span className="block text-sm font-semibold text-[#292827]">{title}</span><span className="mt-1 block text-sm text-[#737782]">{description}</span></span>
            <Icon className="text-[#8a684b]" />
          </label>
        ))}
      </div>
    </section>
  );
}
