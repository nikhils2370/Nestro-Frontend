"use client";

import { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiSearch,
  FiFilter,
  FiChevronRight,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiXCircle,
  FiEye,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";
import { toast } from "sonner";
import { client } from "@/utils/helper";

const statusList = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus !== "All") params.append("status", selectedStatus);
      if (search.trim()) params.append("search", search.trim());

      const response = await client.get(`order/all?${params.toString()}`);
      if (response.data?.success && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const response = await client.patch(`order/status/${orderId}`, {
        orderStatus: newStatus,
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Failed to update status");
        return;
      }

      toast.success(`Order status updated to ${newStatus}`);

      // Update state in place
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus, paymentStatus: response.data.order?.paymentStatus || order.paymentStatus }
            : order
        )
      );

      if (viewingOrder && viewingOrder._id === orderId) {
        setViewingOrder((prev) => ({
          ...prev,
          orderStatus: newStatus,
          paymentStatus: response.data.order?.paymentStatus || prev.paymentStatus,
        }));
      }
    } catch (error) {
      console.error("Update Status Error:", error);
      toast.error(error.response?.data?.message || "Status update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadgeStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#dff8ed] text-[#00966d] border-[#a5edd1]";
      case "Shipped":
        return "bg-[#f3e3ff] text-[#8b00d9] border-[#e2bbfd]";
      case "Processing":
        return "bg-[#dce9ff] text-[#155eef] border-[#b4d0ff]";
      case "Pending":
        return "bg-[#fff1c7] text-[#b54708] border-[#fde28f]";
      case "Cancelled":
        return "bg-[#fee4e2] text-[#d92d20] border-[#fecdca]";
      default:
        return "bg-stone-100 text-stone-700 border-stone-200";
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-6 py-7">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-7">
        <div>
          <h1 className="text-[25px] font-semibold text-[#101828]">
            Orders Management
          </h1>
          <p className="mt-1 text-[13px] text-[#667085]">
            View customer orders, track fulfillment, and update delivery statuses.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          className="flex h-[38px] items-center gap-2 rounded-[10px] border border-[#dfe3e8] bg-white px-4 text-[12px] font-medium text-[#344054] transition hover:bg-[#f9fafb]"
        >
          <FiRefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ================= FILTERS & SEARCH ================= */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-[12px] border border-[#dfe3e8] bg-white p-1 shadow-sm">
          {statusList.map((st) => {
            const isActive = selectedStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`rounded-[8px] px-3.5 py-1.5 text-[12px] font-medium transition ${
                  isActive
                    ? "bg-[#009f98] text-white shadow-sm"
                    : "text-[#475467] hover:bg-[#f8fafc]"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-[320px]">
          <FiSearch
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98a2b3]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order # or customer..."
            className="h-[40px] w-full rounded-[10px] border border-[#dfe3e8] bg-white pl-10 pr-4 text-[13px] text-[#344054] outline-none transition focus:border-[#00a99d]"
          />
        </form>
      </div>

      {/* ================= ORDERS TABLE ================= */}
      <div className="overflow-hidden rounded-[16px] border border-[#e7eaee] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#edf0f2] bg-[#f9fafb] text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Items</th>
                <th className="py-4 px-6">Total Amount</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Status Update</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf0f2] text-[13px] text-[#344054]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-[#667085]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#009f98] border-t-transparent" />
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-[#667085]">
                    <FiShoppingBag size={32} className="mx-auto mb-2 text-[#98a2b3]" />
                    <p className="font-medium text-[#101828]">No orders found</p>
                    <p className="mt-1 text-xs">Try selecting another status or adjusting your search.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const dateStr = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—";

                  const isUpdating = updatingId === order._id;

                  return (
                    <tr
                      key={order._id}
                      className="transition hover:bg-[#fbfcfd]"
                    >
                      {/* Order Number */}
                      <td className="py-4 px-6 font-semibold text-[#101828]">
                        {order.orderNumber}
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-6">
                        <p className="font-medium text-[#101828]">
                          {order.shippingAddress?.fullName || order.userId?.name || "Customer"}
                        </p>
                        <p className="text-[11px] text-[#667085]">
                          {order.shippingAddress?.mobile || order.userId?.email || "—"}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-[12px] text-[#667085]">
                        {dateStr}
                      </td>

                      {/* Items Count */}
                      <td className="py-4 px-6">
                        <span className="rounded-md bg-[#f2f4f7] px-2 py-1 text-xs font-medium text-[#344054]">
                          {order.items?.length || 0} item{order.items?.length === 1 ? "" : "s"}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="py-4 px-6 font-semibold text-[#101828]">
                        ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                      </td>

                      {/* Payment */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="capitalize font-medium text-xs">
                            {order.paymentMethod?.toUpperCase()}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              order.paymentStatus === "paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>

                      {/* Order Status Select */}
                      <td className="py-4 px-6">
                        <div className="relative inline-block">
                          <select
                            disabled={isUpdating}
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold outline-none transition disabled:opacity-60 ${statusBadgeStyle(
                              order.orderStatus
                            )}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          {isUpdating && (
                            <span className="absolute right-[-18px] top-2 h-3.5 w-3.5 animate-spin rounded-full border border-[#009f98] border-t-transparent" />
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setViewingOrder(order)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#dfe3e8] bg-white px-3 py-1.5 text-xs font-medium text-[#344054] transition hover:bg-[#f2f4f7] hover:text-[#009f98]"
                        >
                          <FiEye size={13} />
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ORDER DETAILS MODAL ================= */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#edf0f2] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#009f98]">
                  Order Details
                </span>
                <h3 className="text-xl font-bold text-[#101828]">
                  {viewingOrder.orderNumber}
                </h3>
                <p className="mt-1 text-xs text-[#667085]">
                  Placed on {new Date(viewingOrder.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="rounded-lg p-2 text-[#98a2b3] transition hover:bg-[#f2f4f7] hover:text-[#101828]"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-6">
              {/* Status Selector in Modal */}
              <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] p-4 border border-[#e7eaee]">
                <div>
                  <p className="text-xs font-medium text-[#667085]">Current Status</p>
                  <p className="font-semibold text-sm text-[#101828] mt-0.5">
                    {viewingOrder.orderStatus}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#667085]">Change to:</span>
                  <select
                    value={viewingOrder.orderStatus}
                    onChange={(e) => handleStatusChange(viewingOrder._id, e.target.value)}
                    className="rounded-lg border border-[#dfe3e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#101828] outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-semibold text-sm text-[#101828] mb-3">
                  Ordered Items ({viewingOrder.items?.length || 0})
                </h4>
                <div className="divide-y divide-[#edf0f2] rounded-xl border border-[#e7eaee] overflow-hidden">
                  {viewingOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-white">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-stone-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#101828]">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#667085]">
                          Qty: {item.qty} × ₹{(item.salePrice || item.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <span className="text-sm font-bold text-[#101828]">
                        ₹{((item.salePrice || item.price || 0) * (item.qty || 1)).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Shipping Details */}
                <div className="rounded-xl border border-[#e7eaee] p-4 bg-[#fcfbf9]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2">
                    Shipping Address
                  </h4>
                  <p className="font-semibold text-sm text-[#101828]">
                    {viewingOrder.shippingAddress?.fullName}
                  </p>
                  <p className="text-xs text-[#667085] mt-1">
                    📞 {viewingOrder.shippingAddress?.mobile}
                  </p>
                  <p className="text-xs text-[#667085] mt-1 leading-5">
                    {viewingOrder.shippingAddress?.addressLine},{" "}
                    {viewingOrder.shippingAddress?.city},{" "}
                    {viewingOrder.shippingAddress?.state} -{" "}
                    {viewingOrder.shippingAddress?.pincode},{" "}
                    {viewingOrder.shippingAddress?.country}
                  </p>
                </div>

                {/* Payment & Summary */}
                <div className="rounded-xl border border-[#e7eaee] p-4 bg-[#fcfbf9] flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2">
                      Payment Details
                    </h4>
                    <p className="text-xs text-[#344054]">
                      Method: <span className="font-semibold uppercase">{viewingOrder.paymentMethod}</span>
                    </p>
                    <p className="text-xs text-[#344054] mt-1">
                      Status:{" "}
                      <span className="font-semibold capitalize text-emerald-700">
                        {viewingOrder.paymentStatus}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 border-t border-[#edf0f2] pt-3">
                    <div className="flex justify-between text-xs text-[#667085]">
                      <span>Subtotal</span>
                      <span>₹{(viewingOrder.subtotal || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#667085] mt-1">
                      <span>Shipping Fee</span>
                      <span>₹{(viewingOrder.shippingFee || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#101828] mt-2 border-t border-[#edf0f2] pt-2">
                      <span>Total Amount</span>
                      <span className="text-[#009f98]">
                        ₹{(viewingOrder.totalAmount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t border-[#edf0f2] pt-4">
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="rounded-xl bg-[#009f98] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#008f89]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
