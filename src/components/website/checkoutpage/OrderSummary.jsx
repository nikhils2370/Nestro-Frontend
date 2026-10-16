"use client";

import { FiShield } from "react-icons/fi";

const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 2,
}).format(Number(value) || 0);

export default function OrderSummary({ items = [], subtotal = 0, shipping = 0, quantity = 0, onPlaceOrder, disabled }) {
  return (
    <aside className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-6 lg:sticky lg:top-24">
      <h2 className="font-semibold text-[#292827]">Order summary</h2>
      <p className="mt-1 text-sm text-[#737782]">{quantity} item{quantity === 1 ? "" : "s"}</p>
      <div className="my-5 max-h-64 space-y-4 overflow-y-auto border-b border-[#eee8e0] pb-5">
        {items.map((item, index) => {
          const price = Number(item.salePrice ?? item.price ?? item.originalPrice ?? 0);
          const qty = Number(item.qty ?? 1);
          return <div key={item.id || item._id || index} className="flex justify-between gap-3"><div className="min-w-0"><p className="break-words text-sm font-medium text-[#292827]">{item.name || item.title || "Product"}</p><p className="text-xs text-[#737782]">Qty: {qty}</p></div><span className="shrink-0 text-sm">{money(price * qty)}</span></div>;
        })}
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-[#737782]"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between text-[#737782]"><span>Shipping</span><span>{shipping ? money(shipping) : "Free"}</span></div>
        <div className="flex justify-between border-t border-[#eee8e0] pt-4 text-base font-semibold text-[#292827]"><span>Total</span><span>{money(subtotal + shipping)}</span></div>
      </div>
      <button type="button" onClick={onPlaceOrder} disabled={disabled} className="mt-6 w-full rounded-xl bg-[#8a684b] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#705239] disabled:cursor-not-allowed disabled:opacity-50">Place order</button>
      {disabled && <p className="mt-2 text-center text-xs text-amber-700">Select or add a delivery address.</p>}
      <p className="mt-4 flex gap-2 rounded-xl bg-[#faf9f7] p-3 text-xs leading-5 text-[#737782]"><FiShield className="mt-0.5 shrink-0 text-[#8a684b]" /> Your account details are handled securely.</p>
    </aside>
  );
}
