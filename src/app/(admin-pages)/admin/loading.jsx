"use client";

import { FiDollarSign, FiShoppingBag, FiUsers, FiBox } from "react-icons/fi";

export default function AdminLoading() {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-7 animate-pulse">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="w-[150px] h-[30px] rounded-md bg-[#e9edf1]" />

          <div className="mt-2 w-[310px] h-[16px] rounded-md bg-[#e9edf1]" />
        </div>

        <div className="flex gap-3">
          <div className="w-[175px] h-[38px] rounded-[10px] bg-[#e9edf1]" />

          <div className="w-[95px] h-[38px] rounded-[10px] bg-[#e9edf1]" />
        </div>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-4 gap-4">
        {/* Card 1 */}
        <LoadingCard icon={<FiDollarSign size={20} />} />

        {/* Card 2 */}
        <LoadingCard icon={<FiShoppingBag size={20} />} />

        {/* Card 3 */}
        <LoadingCard icon={<FiUsers size={20} />} />

        {/* Card 4 */}
        <LoadingCard icon={<FiBox size={20} />} />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-[1fr_320px] gap-5 mt-6">
        {/* Sales Overview */}
        <div className="h-[390px] rounded-[16px] border border-[#e7eaee] bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="w-[145px] h-[20px] rounded-md bg-[#e9edf1]" />

            <div className="w-[60px] h-[16px] rounded-md bg-[#e9edf1]" />
          </div>

          {/* Chart Skeleton */}
          <div className="mt-8 h-[285px] flex items-end gap-4 px-4">
            <div className="w-full h-[35%] rounded-t-md bg-[#f0f2f4]" />
            <div className="w-full h-[55%] rounded-t-md bg-[#f0f2f4]" />
            <div className="w-full h-[45%] rounded-t-md bg-[#f0f2f4]" />
            <div className="w-full h-[70%] rounded-t-md bg-[#f0f2f4]" />
            <div className="w-full h-[60%] rounded-t-md bg-[#f0f2f4]" />
            <div className="w-full h-[80%] rounded-t-md bg-[#f0f2f4]" />
            <div className="w-full h-[65%] rounded-t-md bg-[#f0f2f4]" />
          </div>
        </div>

        {/* Top Products */}
        <div className="h-[390px] rounded-[16px] border border-[#e7eaee] bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="w-[115px] h-[20px] rounded-md bg-[#e9edf1]" />

            <div className="w-[60px] h-[16px] rounded-md bg-[#e9edf1]" />
          </div>

          <div className="mt-6 space-y-5">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function LoadingCard({ icon }) {
  return (
    <div className="h-[155px] rounded-[14px] border border-[#e7eaee] bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="w-[42px] h-[42px] rounded-[10px] bg-[#eef1f3] flex items-center justify-center text-[#c7ccd3]">
          {icon}
        </div>

        <div className="w-[55px] h-[14px] rounded-md bg-[#e9edf1]" />
      </div>

      <div className="mt-5 w-[110px] h-[25px] rounded-md bg-[#e9edf1]" />

      <div className="mt-2 w-[90px] h-[14px] rounded-md bg-[#eef1f3]" />
    </div>
  );
}

/* ================= PRODUCT ================= */

function ProductSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[42px] h-[42px] rounded-[9px] bg-[#eef1f3]" />

      <div className="flex-1">
        <div className="w-[125px] h-[13px] rounded-md bg-[#e9edf1]" />

        <div className="mt-2 w-[90px] h-[10px] rounded-md bg-[#eef1f3]" />
      </div>

      <div className="w-[35px] h-[12px] rounded-md bg-[#e9edf1]" />
    </div>
  );
}
