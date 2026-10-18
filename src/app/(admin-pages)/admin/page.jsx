"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiChevronRight,
  FiStar,
  FiFilter,
  FiShoppingCart,
  FiPlus,
  FiTruck,
  FiCreditCard,
  FiRefreshCw,
} from "react-icons/fi";
import { client } from "@/utils/helper";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalRevenue: "₹0",
    totalOrders: "0",
    totalCustomers: "0",
    totalProducts: "0",
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const fetchStats = async () => {
    try {
      console.log("hii");

      setLoading(true);
      const response = await client.get("order/stats");
      
      if (response.data?.success) {
        if (response.data.stats) {
          setStatsData(response.data.stats);
        }
        if (Array.isArray(response.data.recentOrders)) {
          setRecentOrders(response.data.recentOrders);
        }
        if (Array.isArray(response.data.topProducts)) {
          setTopProducts(response.data.topProducts);
        }
      }
    } catch (error) {
      console.error("Dashboard Stats Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Revenue",
      value: statsData.totalRevenue || "₹0",
      growth: "+12.5% ↑",
      icon: FiDollarSign,
      iconBg: "bg-[#e9fbf5]",
      iconColor: "text-[#00a67d]",
      growthColor: "text-[#00966d]",
    },
    {
      title: "Total Orders",
      value: statsData.totalOrders || "0",
      growth: "+8.2% ↑",
      icon: FiShoppingBag,
      iconBg: "bg-[#edf4ff]",
      iconColor: "text-[#1769ff]",
      growthColor: "text-[#00966d]",
    },
    {
      title: "Total Customers",
      value: statsData.totalCustomers || "0",
      growth: "+23.1% ↑",
      icon: FiUsers,
      iconBg: "bg-[#faf0ff]",
      iconColor: "text-[#9b00ff]",
      growthColor: "text-[#00966d]",
    },
    {
      title: "Products",
      value: statsData.totalProducts || "0",
      growth: "+4.1% ↑",
      icon: FiBox,
      iconBg: "bg-[#fff6ec]",
      iconColor: "text-[#ff6500]",
      growthColor: "text-[#00966d]",
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
            Welcome back! Here&apos;s real-time live performance of your Nestro store.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchStats}
            className="flex h-[38px] items-center gap-2 rounded-[10px] border border-[#dfe3e8] bg-white px-4 text-[12px] font-medium text-[#344054] transition hover:bg-[#f9fafb]"
          >
            <FiRefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh Data
          </button>

          <Link
            href="/admin/orders"
            className="flex h-[38px] items-center gap-2 rounded-[10px] bg-[#009f98] px-4 text-[12px] font-medium text-white transition hover:bg-[#008f89]"
          >
            <FiShoppingBag size={15} />
            Manage Orders
          </Link>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ====================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="h-[155px] rounded-[14px] border border-[#e7eaee] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)] flex flex-col justify-between"
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

              <div>
                <h2 className="text-[24px] font-semibold text-[#101828]">
                  {loading ? "..." : item.value}
                </h2>
                <p className="mt-1 text-[13px] text-[#667085]">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-5 mt-6">
        {/* ===================================================
            SALES OVERVIEW
        ==================================================== */}
        <div className="h-[390px] rounded-[16px] border border-[#e7eaee] bg-white overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 pt-6">
            <div>
              <h2 className="text-[17px] font-semibold text-[#101828]">
                Sales Performance
              </h2>
              <p className="text-xs text-[#667085] mt-0.5">
                Year-to-date monthly activity
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-[12px] text-[#009f98] font-medium"
            >
              View Orders
              <FiChevronRight size={15} />
            </Link>
          </div>

          {/* Chart Area Simulation */}
          <div className="flex-1 mt-4 px-6 flex items-end pb-6">
            <div className="w-full h-full flex flex-col justify-between">
              {/* Lines */}
              <div className="border-t border-[#f0f2f4]" />
              <div className="border-t border-[#f0f2f4]" />
              <div className="border-t border-[#f0f2f4]" />
              <div className="border-t border-[#f0f2f4]" />

              {/* Bar visualization */}
              <div className="flex items-end justify-between h-[180px] pt-4 px-2">
                {months.map((month, idx) => {
                  const heights = [35, 50, 45, 70, 60, 85, 90, 75, 65, 80, 95, 85];
                  const height = heights[idx];
                  return (
                    <div key={month} className="flex flex-col items-center gap-2 group">
                      <div
                        style={{ height: `${height}%` }}
                        className="w-5 sm:w-7 rounded-t-md bg-[#009f98]/20 group-hover:bg-[#009f98] transition-all duration-300 relative"
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#101828] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition">
                          {height}%
                        </span>
                      </div>
                      <span className="text-[11px] text-[#667085]">{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            TOP PRODUCTS
        ==================================================== */}
        <div className="h-[390px] rounded-[16px] border border-[#e7eaee] bg-white p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-semibold text-[#101828]">
              Top Products
            </h2>

            <Link
              href="/admin/products"
              className="text-[12px] text-[#009f98] font-medium"
            >
              View All
            </Link>
          </div>

          {/* Product List */}
          <div className="space-y-4 overflow-y-auto flex-1">
            {topProducts.length === 0 ? (
              <p className="text-xs text-[#667085] text-center pt-10">No products found</p>
            ) : (
              topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-[9px] bg-[#f2f4f7] flex items-center justify-center overflow-hidden shrink-0">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[18px]">🪑</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#101828] truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-3 mt-[2px]">
                      <span className="text-[11px] text-[#667085]">
                        {product.sales} sales
                      </span>
                      <span className="text-[11px] font-medium text-[#101828]">
                        {product.revenue}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <FiStar size={13} fill="#fdbb05" className="text-[#fdbb05]" />
                    <span className="text-[12px] text-[#475467] font-medium">
                      {product.rating}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CONTENT: RECENT ORDERS & QUICK ACTIONS
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-5 mt-6">
        {/* ===================================================
            RECENT ORDERS
        ==================================================== */}
        <div className="rounded-[16px] border border-[#e7eaee] bg-white overflow-hidden shadow-sm">
          <div className="h-[70px] px-6 flex items-center justify-between border-b border-[#edf0f2]">
            <div>
              <h2 className="text-[17px] font-semibold text-[#101828]">
                Recent Orders
              </h2>
              <p className="text-xs text-[#667085]">Latest customer activity</p>
            </div>

            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-[12px] font-medium text-[#009f98]"
            >
              View All Orders
              <FiChevronRight size={15} />
            </Link>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-[#edf0f2]">
            {loading ? (
              <div className="py-12 text-center text-xs text-[#667085]">
                Loading recent orders...
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#667085]">
                No orders placed yet.
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="px-6 py-4 flex items-center gap-4 transition hover:bg-[#fbfcfd]"
                >
                  <div className="w-[40px] h-[40px] rounded-[10px] bg-[#f2f4f7] flex items-center justify-center shrink-0 text-[#009f98]">
                    <FiShoppingCart size={17} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#101828]">
                      {order.id}
                    </p>
                    <p className="text-[11px] text-[#667085] truncate">
                      {order.customer} • {order.items}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[13px] font-semibold text-[#101828]">
                      {order.amount}
                    </p>
                    <p className="text-[11px] text-[#8190a5]">{order.time}</p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        order.status === "Delivered"
                          ? "bg-[#dff8ed] text-[#00966d]"
                          : order.status === "Processing"
                            ? "bg-[#dce9ff] text-[#155eef]"
                            : order.status === "Shipped"
                              ? "bg-[#f3e3ff] text-[#8b00d9]"
                              : order.status === "Cancelled"
                                ? "bg-[#fee4e2] text-[#d92d20]"
                                : "bg-[#fff1c7] text-[#b54708]"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE: QUICK ACTIONS & STORE PERFORMANCE
        ==================================================== */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="rounded-[16px] bg-[#00958c] p-6 text-white shadow-sm">
            <h2 className="text-[17px] font-semibold">Quick Actions</h2>
            <p className="mt-1 text-[12px] text-white/80">
              Manage your store operations
            </p>

            <div className="mt-5 space-y-2.5">
              <Link
                href="/admin/products/add"
                className="w-full h-[40px] rounded-[10px] bg-white/20 hover:bg-white/25 text-white text-[12px] font-medium flex items-center gap-3 px-4 transition"
              >
                <FiPlus size={17} />
                Add New Product
              </Link>

              <Link
                href="/admin/orders"
                className="w-full h-[40px] rounded-[10px] bg-white/20 hover:bg-white/25 text-white text-[12px] font-medium flex items-center gap-3 px-4 transition"
              >
                <FiTruck size={17} />
                Process & Update Orders
              </Link>

              <Link
                href="/admin/category/add"
                className="w-full h-[40px] rounded-[10px] bg-white/20 hover:bg-white/25 text-white text-[12px] font-medium flex items-center gap-3 px-4 transition"
              >
                <FiPlus size={17} />
                Add New Category
              </Link>
            </div>
          </div>

          {/* Store Info */}
          <div className="rounded-[16px] border border-[#e7eaee] bg-white p-6 shadow-sm">
            <h2 className="text-[14px] font-semibold text-[#101828]">
              System Status
            </h2>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#667085]">Database</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#667085]">API Health</span>
                <span className="font-medium text-emerald-600">Operational</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#667085]">Fulfillment Rate</span>
                <span className="font-medium text-[#101828]">98.2%</span>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f0f2f4]">
                <Link
                  href="/store"
                  className="text-xs font-semibold text-[#009f98] hover:underline inline-flex items-center gap-1"
                >
                  Visit Public Storefront →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
