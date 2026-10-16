"use client";

import Link from "next/link";
import { FiCheckCircle, FiMapPin, FiPlus } from "react-icons/fi";

export default function DeliveryAddress({ addresses = [], selectedAddress, onSelect }) {
  return (
    <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="font-semibold text-[#292827]">Delivery address</h2><p className="mt-1 text-sm text-[#737782]">Select a saved address for delivery.</p></div>
        <Link href="/account" className="inline-flex items-center gap-2 rounded-lg border border-[#cdbda9] px-3 py-2 text-sm text-[#806548] hover:bg-[#f7f2ec]"><FiPlus /> Manage addresses</Link>
      </div>
      {!addresses.length ? (
        <div className="rounded-xl border border-dashed border-[#d8cbbd] px-4 py-8 text-center">
          <FiMapPin className="mx-auto mb-2 text-2xl text-[#b09b84]" />
          <p className="text-sm text-[#737782]">No saved address found.</p>
          <Link href="/account" className="mt-3 inline-block text-sm font-medium text-[#806548] underline">Add address in your profile</Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address, index) => {
            const key = String(address._id || index);
            const active = key === selectedAddress;
            return (
              <button key={key} type="button" onClick={() => onSelect(key)}
                className={`rounded-xl border p-4 text-left ${active ? "border-[#8a684b] bg-[#faf6f0] ring-1 ring-[#8a684b]" : "border-[#e8e3dc] hover:border-[#cdbda9]"}`}>
                <span className="flex items-center justify-between gap-2 font-semibold text-[#292827]">{address.fullName}{active && <FiCheckCircle className="shrink-0 text-[#8a684b]" />}</span>
                {address.isDefault && <span className="mt-2 inline-block rounded-full bg-[#f3eee7] px-2 py-1 text-xs text-[#806548]">Default</span>}
                <span className="mt-2 block break-words text-sm leading-6 text-[#737782]">{address.addressLine}<br />{address.city}, {address.state} - {address.pincode}<br />{address.country}</span>
                <span className="mt-2 block text-sm text-[#454545]">Mobile: {address.mobile}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
