"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { client } from "@/utils/helper";
import { setUser, clearUser } from "@/redux/features/userSlice";
import { emptyCart } from "@/redux/features/cartSlice";
import ContactDetails from "@/components/website/checkoutpage/ContactDetails";
import DeliveryAddress from "@/components/website/checkoutpage/DeliveryAddress";
import PaymentMethod from "@/components/website/checkoutpage/PaymentMethod";
import OrderSummary from "@/components/website/checkoutpage/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items || []);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    let active = true;
    async function loadUser() {
      try {
        const { data } = await client.get("user/get-me");
        if (!data?.success || !data?.user)
          throw new Error(data?.message || "Please sign in.");
        if (!active) return;
        dispatch(setUser(data.user));
        const addresses = data.user.addresses || [];
        const defaultAddress = addresses.find((address) => address.isDefault);
        setSelectedAddress(
          String(defaultAddress?._id || addresses.indexOf(defaultAddress)),
        );
      } catch (error) {
        if (!active) return;
        dispatch(clearUser());
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Please sign in to continue.",
        );
        router.replace("/signin?redirect=/checkout");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadUser();
    return () => {
      active = false;
    };
  }, [dispatch, router]);

  const addresses = user?.addresses || [];
  const selected = addresses.find(
    (address, index) => String(address._id || index) === selectedAddress,
  );

  const { subtotal, quantity } = useMemo(
    () =>
      cartItems.reduce(
        (result, item) => {
          const price = Number(
            item.salePrice ?? item.price ?? item.originalPrice ?? 0,
          );
          const qty = Number(item.qty ?? 1);
          result.subtotal += price * qty;
          result.quantity += qty;
          return result;
        },
        { subtotal: 0, quantity: 0 },
      ),
    [cartItems],
  );

  const shipping = subtotal === 0 || subtotal >= 1000 ? 0 : 99;

  async function placeOrder() {
    if (!cartItems.length) return toast.error("Your cart is empty.");
    if (!selected) return toast.error("Please select a delivery address.");
    if (placingOrder) return;

    try {
      setPlacingOrder(true);
      const response = await client.post("order/create", {
        items: cartItems.map((item) => ({
          productId: item.id || item._id,
          name: item.name || "Product",
          price: Number(item.price || item.salePrice || 0),
          salePrice: Number(item.salePrice || item.price || 0),
          qty: Number(item.qty || 1),
          thumbnail: item.thumbnail || "",
        })),
        shippingAddress: {
          fullName: selected.fullName,
          mobile: selected.mobile,
          pincode: selected.pincode,
          addressLine: selected.addressLine,
          city: selected.city,
          state: selected.state,
          country: selected.country || "India",
        },
        paymentMethod,
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Failed to place order.");
        return;
      }

      const order = response.data.order;
      toast.success(
        `Order placed successfully! Order #${order?.orderNumber || ""}`,
      );

      // Clear cart in Redux & LocalStorage
      dispatch(emptyCart());
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }

      // Redirect to account orders tab
      router.push("/account?tab=orders");
    } catch (error) {
      console.error("Order Placement Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to place order. Try again.",
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  if (loading)
    return (
      <main className="grid min-h-[50vh] place-items-center">
        <p className="animate-pulse text-sm text-[#806548]">
          Loading checkout...
        </p>
      </main>
    );
  if (!user) return null;

  if (!cartItems.length)
    return (
      <main className="grid min-h-[55vh] place-items-center px-4 text-center">
        <div>
          <FiShoppingBag className="mx-auto mb-3 text-3xl text-[#806548]" />
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <Link
            href="/store"
            className="mt-4 inline-block rounded-lg bg-[#8a684b] px-5 py-3 text-white"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#806548]"
        >
          <FiArrowLeft /> Back to cart
        </Link>
        <h1 className="text-3xl font-semibold text-[#292827]">Checkout</h1>
        <p className="mb-7 mt-2 text-sm text-[#737782]">
          Review your details and complete your order.
        </p>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <ContactDetails user={user} />
            <DeliveryAddress
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={setSelectedAddress}
            />
            <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
          </div>
          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            quantity={quantity}
            onPlaceOrder={placeOrder}
            disabled={!selected || placingOrder}
          />
        </div>
      </div>
    </main>
  );
}
