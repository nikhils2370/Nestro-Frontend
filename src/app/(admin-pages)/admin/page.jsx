"use client";

import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiChevronRight,
  FiStar,
  FiFilter,
  FiMoreVertical,
  FiShoppingCart,
  FiPlus,
  FiTruck,
  FiCreditCard,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Revenue",
    value: "$48,295",
    growth: "+12.5% ↑",
    icon: FiDollarSign,
    iconBg: "bg-[#e9fbf5]",
    iconColor: "text-[#00a67d]",
    growthColor: "text-[#00966d]",
  },
  {
    title: "Total Orders",
    value: "1,284",
    growth: "+8.2% ↑",
    icon: FiShoppingBag,
    iconBg: "bg-[#edf4ff]",
    iconColor: "text-[#1769ff]",
    growthColor: "text-[#00966d]",
  },
  {
    title: "Total Customers",
    value: "5,643",
    growth: "+23.1% ↑",
    icon: FiUsers,
    iconBg: "bg-[#faf0ff]",
    iconColor: "text-[#9b00ff]",
    growthColor: "text-[#00966d]",
  },
  {
    title: "Products",
    value: "847",
    growth: "-2.4% ↓",
    icon: FiBox,
    iconBg: "bg-[#fff6ec]",
    iconColor: "text-[#ff6500]",
    growthColor: "text-[#ff1f3d]",
  },
];

/*
  Sirf 1 product rakha hai.
  Lekin rendering .map() se ho rahi hai.
*/
const topProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    sales: 342,
    revenue: "$10,260",
    rating: 4.8,
    image: "🎧",
  },
];

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Sarah Johnson",
    items: "3 items",
    amount: "$245.00",
    status: "Delivered",
    time: "2 hours ago",
  },
  {
    id: "#ORD-002",
    customer: "Michael Chen",
    items: "2 items",
    amount: "$189.50",
    status: "Processing",
    time: "4 hours ago",
  },
  {
    id: "#ORD-003",
    customer: "Emily Davis",
    items: "5 items",
    amount: "$432.00",
    status: "Shipped",
    time: "6 hours ago",
  },
  {
    id: "#ORD-004",
    customer: "James Wilson",
    items: "1 items",
    amount: "$167.80",
    status: "Pending",
    time: "8 hours ago",
  },
  {
    id: "#ORD-005",
    customer: "Maria Garcia",
    items: "4 items",
    amount: "$523.00",
    status: "Delivered",
    time: "12 hours ago",
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function AdminDashboard() {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-7">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-[25px] font-semibold leading-8 text-[#101828]">
            Dashboard
          </h1>

          <p className="mt-1 text-[13px] text-[#667085]">
            Welcome back! Here`s what`s happening with your store.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period */}
          <div className="h-[38px] flex items-center border border-[#dfe3e8] rounded-[10px] bg-white overflow-hidden">
            <button className="h-full px-4 bg-[#009f98] text-white text-[12px] font-medium">
              Today
            </button>

            <button className="h-full px-4 text-[12px] text-[#475467] hover:bg-[#f8fafc]">
              Week
            </button>

            <button className="h-full px-4 text-[12px] text-[#475467] hover:bg-[#f8fafc]">
              Month
            </button>
          </div>

          {/* Export */}
          <button className="h-[38px] px-4 rounded-[10px] bg-[#009f98] hover:bg-[#008f89] text-white text-[12px] font-medium flex items-center gap-2">
            <span className="text-[17px]">↓</span>
            Export
          </button>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ====================================================== */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="h-[155px] rounded-[14px] border border-[#e7eaee] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)]"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-[42px] h-[42px] rounded-[10px] ${item.iconBg} flex items-center justify-center`}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                    className={item.iconColor}
                  />
                </div>

                <span className={`text-[12px] font-medium ${item.growthColor}`}>
                  {item.growth}
                </span>
              </div>

              <h2 className="mt-4 text-[24px] font-semibold text-[#101828]">
                {item.value}
              </h2>

              <p className="mt-1 text-[13px] text-[#667085]">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="grid grid-cols-[minmax(0,1fr)_330px] gap-5 mt-6">
        {/* ===================================================
            SALES OVERVIEW
        ==================================================== */}
        <div className="h-[390px] rounded-[16px] border border-[#e7eaee] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6">
            <h2 className="text-[17px] font-semibold text-[#101828]">
              Sales Overview
            </h2>

            <button className="flex items-center gap-1 text-[12px] text-[#009f98]">
              View All
              <FiChevronRight size={15} />
            </button>
          </div>

          {/* Chart Area */}
          <div className="h-[285px] mt-4 px-6 flex items-end">
            <div className="w-full h-full flex flex-col justify-between">
              {/* Lines */}
              <div className="border-t border-[#f0f2f4]" />
              <div className="border-t border-[#f0f2f4]" />
              <div className="border-t border-[#f0f2f4]" />
              <div className="border-t border-[#f0f2f4]" />
              <div className="border-t border-[#f0f2f4]" />

              {/* Months */}
              <div className="flex items-center justify-between pt-3">
                {months.map((month) => (
                  <span key={month} className="text-[11px] text-[#667085]">
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            TOP PRODUCTS
        ==================================================== */}
        <div className="h-[390px] rounded-[16px] border border-[#e7eaee] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-[#101828]">
              Top Products
            </h2>

            <button className="text-[12px] text-[#009f98]">View All</button>
          </div>

          {/* Product List */}
          <div className="mt-5 space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                {/* Product Image */}
                <div className="w-[42px] h-[42px] rounded-[9px] bg-[#f2f4f7] flex items-center justify-center text-[21px] shrink-0">
                  {product.image}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#101828] truncate">
                    {product.name}
                  </p>

                  <div className="flex items-center gap-3 mt-[3px]">
                    <span className="text-[11px] text-[#667085]">
                      {product.sales} sales
                    </span>

                    <span className="text-[11px] text-[#667085]">
                      {product.revenue}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <FiStar size={14} fill="#fdbb05" className="text-[#fdbb05]" />

                  <span className="text-[12px] text-[#475467]">
                    {product.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CONTENT
      ====================================================== */}
      <div className="grid grid-cols-[minmax(0,1fr)_330px] gap-5 mt-6">
        {/* ===================================================
            RECENT ORDERS
        ==================================================== */}
        <div className="rounded-[16px] border border-[#e7eaee] bg-white overflow-hidden">
          <div className="h-[70px] px-6 flex items-center justify-between border-b border-[#edf0f2]">
            <h2 className="text-[17px] font-semibold text-[#101828]">
              Recent Orders
            </h2>

            <div className="flex items-center gap-5">
              <button className="text-[#667085]">
                <FiFilter size={17} />
              </button>

              <button className="flex items-center gap-1 text-[12px] text-[#009f98]">
                View All
                <FiChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Orders */}
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="min-h-[73px] px-4 border-b border-[#edf0f2] flex items-center gap-4 last:border-b-0"
            >
              {/* Cart Icon */}
              <div className="w-[40px] h-[40px] rounded-[9px] bg-[#f2f4f7] flex items-center justify-center shrink-0">
                <FiShoppingCart size={17} className="text-[#475467]" />
              </div>

              {/* Customer */}
              <div className="w-[220px]">
                <p className="text-[13px] font-medium text-[#101828]">
                  {order.id}
                </p>

                <p className="mt-[2px] text-[11px] text-[#667085]">
                  {order.customer} • {order.items}
                </p>
              </div>

              {/* Amount */}
              <div className="ml-auto">
                <p className="text-[13px] font-semibold text-[#101828]">
                  {order.amount}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex px-3 py-[5px] rounded-full text-[11px] font-medium ${
                    order.status === "Delivered"
                      ? "bg-[#dff8ed] text-[#00966d]"
                      : order.status === "Processing"
                        ? "bg-[#dce9ff] text-[#155eef]"
                        : order.status === "Shipped"
                          ? "bg-[#f3e3ff] text-[#8b00d9]"
                          : "bg-[#fff1c7] text-[#b54708]"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Time */}
              <div className="w-[75px]">
                <span className="text-[11px] text-[#8190a5]">{order.time}</span>
              </div>

              {/* More */}
              <button className="text-[#98a2b3]">
                <FiMoreVertical size={17} />
              </button>
            </div>
          ))}
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="rounded-[16px] bg-[#00958c] p-6">
            <h2 className="text-[17px] font-semibold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-[12px] text-white/80">
              Manage your store efficiently
            </p>

            <div className="mt-4 space-y-2">
              <button className="w-full h-[40px] rounded-[9px] bg-white/20 hover:bg-white/25 text-white text-[12px] flex items-center gap-3 px-4">
                <FiPlus size={17} />
                Add New Product
              </button>

              <button className="w-full h-[40px] rounded-[9px] bg-white/20 hover:bg-white/25 text-white text-[12px] flex items-center gap-3 px-4">
                <FiTruck size={17} />
                Process Orders
              </button>

              <button className="w-full h-[40px] rounded-[9px] bg-white/20 hover:bg-white/25 text-white text-[12px] flex items-center gap-3 px-4">
                <FiCreditCard size={17} />
                Manage Payments
              </button>
            </div>
          </div>

          {/* Store Performance */}
          <div className="rounded-[16px] border border-[#e7eaee] bg-white p-6">
            <h2 className="text-[14px] font-semibold text-[#101828]">
              Store Performance
            </h2>

            {/* Conversion */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#667085]">
                  Conversion Rate
                </span>

                <span className="text-[13px] text-[#101828]">3.8%</span>
              </div>

              <div className="mt-2 h-[6px] rounded-full bg-[#e4e7ec] overflow-hidden">
                <div className="h-full w-[38%] bg-[#009f98] rounded-full" />
              </div>
            </div>

            {/* Satisfaction */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#667085]">
                  Customer Satisfaction
                </span>

                <span className="text-[13px] text-[#101828]">4.7/5</span>
              </div>

              <div className="mt-2 flex items-center gap-[2px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={17}
                    className={star === 5 ? "text-[#d0d5dd]" : "text-[#ffb800]"}
                    fill={star === 5 ? "transparent" : "#ffb800"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
