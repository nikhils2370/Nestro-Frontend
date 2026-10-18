"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiShield,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiSave,
  FiArrowLeft,
  FiLayout,
  FiPackage,
  FiChevronRight,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiLogOut,
  FiX,
  FiTruck,
} from "react-icons/fi";
import { toast } from "sonner";
import { client } from "@/utils/helper";
import { setUser, updateUser, clearUser } from "@/redux/features/userSlice";

const emptyAddress = {
  fullName: "",
  mobile: "",
  pincode: "",
  addressLine: "",
  city: "",
  state: "",
  country: "India",
  isDefault: false,
};

const tabs = [
  { id: "overview", label: "Account Overview", icon: FiLayout },
  { id: "personal", label: "Personal Information", icon: FiUser },
  { id: "addresses", label: "My Addresses", icon: FiMapPin },
  { id: "security", label: "Account Security", icon: FiShield },
  { id: "orders", label: "My Orders", icon: FiPackage },
];

const inputClass =
  "w-full rounded-xl border border-[#e8e3dc] bg-white px-4 py-3 text-sm text-[#292827] outline-none transition placeholder:text-[#aaa198] focus:border-[#8a684b] focus:ring-2 focus:ring-[#8a684b]/10 disabled:cursor-not-allowed disabled:bg-[#f7f5f2] disabled:text-[#777]";

function SectionHeading({ title, description, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[#292827]">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 text-sm leading-6 text-[#737782]">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#454545]">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a684b]"
            size={17}
          />
        )}
        {children}
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d8cbbd] px-5 py-12 text-center">
      <Icon className="mx-auto mb-3 text-3xl text-[#b09b84]" size={30} />
      <h3 className="font-semibold text-[#292827]">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#737782]">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default function AccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.user.user);

  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    let active = true;

    async function getProfile() {
      try {
        const response = await client.get("user/get-me");
        if (!active) return;

        if (response.data?.success && response.data?.user) {
          const profile = response.data.user;
          dispatch(setUser(profile));
          setName(profile.name || "");
          setEmail(profile.email || "");
          setAddresses(profile.addresses || []);
        } else {
          dispatch(clearUser());
          router.replace("/signin");
        }
      } catch (error) {
        if (active) {
          dispatch(clearUser());
          router.replace("/signin");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    getProfile();
    return () => {
      active = false;
    };
  }, [dispatch, router]);

  // Fetch orders when orders tab is active
  useEffect(() => {
    let active = true;
    async function loadOrders() {
      try {
        setLoadingOrders(true);
        const response = await client.get("order/my-orders");
        if (!active) return;
        if (response.data?.success && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        if (!active) return;
        console.error("Failed to load orders:", error);
      } finally {
        if (active) setLoadingOrders(false);
      }
    }

    if (activeTab === "orders" || initialTab === "orders") {
      loadOrders();
    }

    return () => {
      active = false;
    };
  }, [activeTab, initialTab]);

  async function saveProfile(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setSaving(true);
      const response = await client.patch("user/update-profile", {
        name: name.trim(),
        email: email.trim(),
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Profile update failed");
        return;
      }

      const updatedUser = response.data.user;
      if (updatedUser) {
        dispatch(setUser(updatedUser));
        setName(updatedUser.name || "");
        setEmail(updatedUser.email || "");
        setAddresses(updatedUser.addresses || []);
      } else {
        dispatch(updateUser({ name: name.trim(), email: email.trim() }));
      }

      setEditing(false);
      toast.success(response.data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  }

  async function saveAddress(event) {
    event.preventDefault();

    const requiredFields = [
      "fullName",
      "mobile",
      "pincode",
      "addressLine",
      "city",
      "state",
      "country",
    ];

    if (
      requiredFields.some((field) => !String(addressForm?.[field] || "").trim())
    ) {
      toast.error("Please fill in all required address fields");
      return;
    }

    let nextAddresses = editingAddressId
      ? addresses.map((address) =>
          String(address._id) === String(editingAddressId)
            ? { ...address, ...addressForm }
            : address,
        )
      : [...addresses, { ...addressForm }];

    // If an address is selected as default, unset the default flag on others.
    if (addressForm.isDefault || nextAddresses.length === 1) {
      const selectedId = editingAddressId;
      nextAddresses = nextAddresses.map((address, index) => {
        const isSelected = selectedId
          ? String(address._id) === String(selectedId)
          : index === nextAddresses.length - 1;
        return { ...address, isDefault: isSelected };
      });
    }

    try {
      setSaving(true);
      const response = await client.patch("user/update-profile", {
        addresses: nextAddresses,
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Address update failed");
        return;
      }

      const updatedUser = response.data.user;
      if (updatedUser) {
        dispatch(setUser(updatedUser));
        setAddresses(updatedUser.addresses || []);
      } else {
        dispatch(updateUser({ addresses: nextAddresses }));
        setAddresses(nextAddresses);
      }

      setAddressForm(null);
      setEditingAddressId(null);
      toast.success("Address saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save address");
    } finally {
      setSaving(false);
    }
  }

  async function deleteAddress(addressId) {
    if (!window.confirm("Do you want to delete this address?")) return;

    const nextAddresses = addresses.filter(
      (address) => String(address._id) !== String(addressId),
    );

    try {
      setSaving(true);
      const response = await client.patch("user/update-profile", {
        addresses: nextAddresses,
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Address deletion failed");
        return;
      }

      const updatedUser = response.data.user;
      if (updatedUser) {
        dispatch(setUser(updatedUser));
        setAddresses(updatedUser.addresses || []);
      } else {
        dispatch(updateUser({ addresses: nextAddresses }));
        setAddresses(nextAddresses);
      }

      toast.success("Address deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete address");
    } finally {
      setSaving(false);
    }
  }

  function startEditAddress(address) {
    setEditingAddressId(address._id || null);
    setAddressForm({ ...emptyAddress, ...address });
  }

  function cancelAddressForm() {
    setAddressForm(null);
    setEditingAddressId(null);
  }

  if (loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#faf9f7] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#e8e3dc] border-t-[#806548]" />
          <p className="text-sm text-[#806548]">Loading your account...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const firstLetter = user.name?.trim()?.charAt(0)?.toUpperCase() || "U";
  const isVerified = Boolean(user.isVerified);
  const defaultAddress = addresses.find((address) => address.isDefault);
  const activeTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label || "My Account";

  function renderOverview() {
    return (
      <div className="space-y-6">
        <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#eee9e2] text-3xl font-semibold text-[#806548]">
              {firstLetter}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[#806548]">Welcome back,</p>
              <h2 className="mt-1 break-words text-2xl font-semibold text-[#292827]">
                {user.name || "User"}
              </h2>
              <p className="mt-1 break-all text-sm text-[#737782]">
                {user.email}
              </p>
            </div>
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${
                isVerified
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {isVerified ? <FiCheckCircle /> : <FiClock />}
              {isVerified ? "Verified account" : "Verification pending"}
            </span>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className="group rounded-2xl border border-[#e8e3dc] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#cdbda9] hover:shadow-sm sm:p-6"
          >
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
              <FiUser size={20} />
            </span>
            <span className="flex items-center justify-between gap-3 font-semibold text-[#292827]">
              Personal Information
              <FiChevronRight className="text-[#806548] transition group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block text-sm leading-6 text-[#737782]">
              Update your name and email address.
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("addresses")}
            className="group rounded-2xl border border-[#e8e3dc] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#cdbda9] hover:shadow-sm sm:p-6"
          >
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
              <FiMapPin size={20} />
            </span>
            <span className="flex items-center justify-between gap-3 font-semibold text-[#292827]">
              Saved Addresses
              <FiChevronRight className="text-[#806548] transition group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block text-sm leading-6 text-[#737782]">
              {addresses.length} saved{" "}
              {addresses.length === 1 ? "address" : "addresses"}.
              {defaultAddress ? " Default delivery address is set." : ""}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className="group rounded-2xl border border-[#e8e3dc] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#cdbda9] hover:shadow-sm sm:p-6"
          >
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
              <FiShield size={20} />
            </span>
            <span className="flex items-center justify-between gap-3 font-semibold text-[#292827]">
              Account Security
              <FiChevronRight className="text-[#806548] transition group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block text-sm leading-6 text-[#737782]">
              Review your verification and account status.
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className="group rounded-2xl border border-[#e8e3dc] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#cdbda9] hover:shadow-sm sm:p-6"
          >
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
              <FiPackage size={20} />
            </span>
            <span className="flex items-center justify-between gap-3 font-semibold text-[#292827]">
              My Orders
              <FiChevronRight className="text-[#806548] transition group-hover:translate-x-1" />
            </span>
            <span className="mt-2 block text-sm leading-6 text-[#737782]">
              View order history when order tracking is connected.
            </span>
          </button>
        </div>

        <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-6">
          <h3 className="font-semibold text-[#292827]">
            Default delivery address
          </h3>
          {defaultAddress ? (
            <div className="mt-4 flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
                <FiHome size={19} />
              </span>
              <div className="min-w-0 flex-1 text-sm leading-6 text-[#737782]">
                <p className="font-medium text-[#292827]">
                  {defaultAddress.fullName}
                </p>
                <p>{defaultAddress.addressLine}</p>
                <p>
                  {defaultAddress.city}, {defaultAddress.state} -{" "}
                  {defaultAddress.pincode}
                </p>
                <p>{defaultAddress.country}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("addresses")}
                className="shrink-0 text-sm font-medium text-[#806548] hover:underline"
              >
                Manage
              </button>
            </div>
          ) : (
            <div className="mt-3">
              <p className="text-sm leading-6 text-[#737782]">
                You have not selected a default delivery address yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("addresses");
                  setAddressForm({ ...emptyAddress });
                  setEditingAddressId(null);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#806548] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#705239]"
              >
                <FiPlus /> Add address
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }

  function renderPersonalInformation() {
    return (
      <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-7">
        <SectionHeading
          title="Personal Information"
          description="Manage the basic information associated with your account."
        >
          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cdbda9] px-4 py-2.5 text-sm font-medium text-[#806548] transition hover:bg-[#f7f2ec]"
            >
              <FiEdit2 size={15} /> Edit details
            </button>
          )}
        </SectionHeading>

        <form onSubmit={saveProfile}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full name" icon={FiUser}>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={!editing || saving}
                required
                autoComplete="name"
                maxLength={100}
                className={`${inputClass} pl-10`}
                placeholder="Enter your full name"
              />
            </Field>

            <Field label="Email address" icon={FiMail}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={!editing || saving}
                required
                autoComplete="email"
                maxLength={254}
                className={`${inputClass} pl-10`}
                placeholder="Enter your email address"
              />
            </Field>
          </div>

          <div className="mt-6 rounded-xl bg-[#faf9f7] p-4">
            <div className="flex items-start gap-3">
              <FiShield className="mt-0.5 shrink-0 text-[#806548]" size={18} />
              <div>
                <p className="text-sm font-medium text-[#292827]">
                  Your information is protected
                </p>
                <p className="mt-1 text-sm leading-6 text-[#737782]">
                  Keep your account details up to date for a smoother checkout
                  experience.
                </p>
              </div>
            </div>
          </div>

          {editing && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#806548] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#705239] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSave />
                {saving ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setName(user.name || "");
                  setEmail(user.email || "");
                  setEditing(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e8e3dc] px-5 py-3 text-sm text-[#454545] transition hover:bg-[#faf9f7] disabled:opacity-60"
              >
                <FiX /> Cancel
              </button>
            </div>
          )}
        </form>
      </section>
    );
  }

  function renderAddresses() {
    return (
      <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-7">
        <SectionHeading
          title="My Addresses"
          description="Save and manage the addresses you use for delivery."
        >
          {!addressForm && (
            <button
              type="button"
              onClick={() => {
                setEditingAddressId(null);
                setAddressForm({ ...emptyAddress });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#806548] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#705239]"
            >
              <FiPlus /> Add address
            </button>
          )}
        </SectionHeading>

        {addressForm && (
          <form
            onSubmit={saveAddress}
            className="mb-6 rounded-2xl border border-[#e8e3dc] bg-[#faf9f7] p-4 sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[#292827]">
                  {editingAddressId ? "Edit address" : "Add a new address"}
                </h3>
                <p className="mt-1 text-sm text-[#737782]">
                  Enter the delivery details below.
                </p>
              </div>
              <button
                type="button"
                onClick={cancelAddressForm}
                disabled={saving}
                aria-label="Close address form"
                className="rounded-lg p-2 text-[#737782] hover:bg-white hover:text-[#292827]"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { key: "fullName", label: "Full name", autoComplete: "name" },
                { key: "mobile", label: "Mobile number", autoComplete: "tel" },
                {
                  key: "pincode",
                  label: "PIN code",
                  autoComplete: "postal-code",
                },
                { key: "city", label: "City", autoComplete: "address-level2" },
                {
                  key: "state",
                  label: "State",
                  autoComplete: "address-level1",
                },
                {
                  key: "country",
                  label: "Country",
                  autoComplete: "country-name",
                },
                {
                  key: "addressLine",
                  label: "House / Street / Area",
                  autoComplete: "street-address",
                },
              ].map(({ key, label, autoComplete }) => (
                <div
                  key={key}
                  className={key === "addressLine" ? "sm:col-span-2" : ""}
                >
                  <label
                    htmlFor={`address-${key}`}
                    className="mb-2 block text-sm font-medium text-[#454545]"
                  >
                    {label}
                  </label>
                  <input
                    id={`address-${key}`}
                    autoComplete={autoComplete}
                    value={addressForm[key] || ""}
                    onChange={(event) =>
                      setAddressForm((previous) => ({
                        ...previous,
                        [key]: event.target.value,
                      }))
                    }
                    required
                    disabled={saving}
                    maxLength={key === "mobile" ? 15 : 150}
                    className={inputClass}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-[#e8e3dc] bg-white p-3.5 text-sm text-[#454545]">
              <input
                type="checkbox"
                checked={Boolean(addressForm.isDefault)}
                onChange={(event) =>
                  setAddressForm((previous) => ({
                    ...previous,
                    isDefault: event.target.checked,
                  }))
                }
                disabled={saving}
                className="h-4 w-4 accent-[#806548]"
              />
              <span>
                <span className="block font-medium text-[#292827]">
                  Set as default address
                </span>
                <span className="mt-0.5 block text-xs text-[#737782]">
                  Use this address as your primary delivery address.
                </span>
              </span>
            </label>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#806548] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#705239] disabled:opacity-60"
              >
                <FiSave /> {saving ? "Saving..." : "Save address"}
              </button>
              <button
                type="button"
                onClick={cancelAddressForm}
                disabled={saving}
                className="rounded-xl border border-[#e8e3dc] px-5 py-3 text-sm text-[#454545] hover:bg-white disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {addresses.length === 0 ? (
          <EmptyState
            icon={FiMapPin}
            title="No saved addresses yet"
            description="Add your delivery address so you can check out faster next time."
            action={
              !addressForm && (
                <button
                  type="button"
                  onClick={() => setAddressForm({ ...emptyAddress })}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#806548] px-4 py-3 text-sm font-medium text-white hover:bg-[#705239]"
                >
                  <FiPlus /> Add your first address
                </button>
              )
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {addresses.map((address, index) => (
              <article
                key={address._id || `address-${index}`}
                className={`min-w-0 rounded-2xl border p-4 transition sm:p-5 ${
                  address.isDefault
                    ? "border-[#b9a38c] bg-[#fcfaf7]"
                    : "border-[#e8e3dc] bg-white"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
                      <FiHome size={18} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-[#292827]">
                        {address.fullName || "Delivery address"}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#737782]">
                        {address.mobile}
                      </p>
                    </div>
                  </div>
                  {address.isDefault && (
                    <span className="shrink-0 rounded-full bg-[#eee6dc] px-2.5 py-1 text-xs font-medium text-[#705239]">
                      Default
                    </span>
                  )}
                </div>

                <div className="break-words text-sm leading-6 text-[#737782]">
                  <p>{address.addressLine}</p>
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p>{address.country}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-[#eee8e0] pt-4">
                  <button
                    type="button"
                    disabled={saving || !address._id}
                    onClick={() => startEditAddress(address)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#806548] hover:underline disabled:opacity-50"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button
                    type="button"
                    disabled={saving || !address._id}
                    onClick={() => deleteAddress(address._id)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderSecurity() {
    return (
      <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-7">
        <SectionHeading
          title="Account Security"
          description="Review your account verification and account details."
        />

        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-xl border border-[#e8e3dc] p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
              <FiMail size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-[#292827]">Email verification</h3>
              <p className="mt-1 break-all text-sm text-[#737782]">
                {user.email}
              </p>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                  isVerified
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {isVerified ? "Email verified" : "Not verified"}
              </span>
              {!isVerified && (
                <p className="mt-2 text-xs leading-5 text-[#737782]">
                  If you need to verify your email, connect your existing OTP
                  verification flow here.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-[#e8e3dc] p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806548]">
              <FiShield size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-[#292827]">Account role</h3>
              <p className="mt-1 text-sm text-[#737782]">
                Your current account access level.
              </p>
              <span className="mt-3 inline-flex rounded-full bg-[#f3eee7] px-3 py-1.5 text-xs font-medium capitalize text-[#806548]">
                {user.role || "user"}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-[#faf9f7] p-4">
            <h3 className="font-medium text-[#292827]">Password and login</h3>
            <p className="mt-1 text-sm leading-6 text-[#737782]">
              For security, password changes should be handled by a dedicated
              backend endpoint. No password is displayed on this page.
            </p>
            <Link
              href="/signin"
              className="mt-3 inline-flex text-sm font-medium text-[#806548] hover:underline"
            >
              Go to sign in page
            </Link>
          </div>
        </div>
      </section>
    );
  }

  function renderOrders() {
    return (
      <section className="rounded-2xl border border-[#e8e3dc] bg-white p-5 sm:p-7">
        <SectionHeading
          title="My Orders"
          description="Track your purchases and view order history."
        />

        {loadingOrders ? (
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-[#8a684b]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#8a684b] border-t-transparent" />
              Loading your orders...
            </div>
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            icon={FiPackage}
            title="No orders placed yet"
            description="When you purchase items from Nestro, your order details and delivery status will appear here."
            action={
              <Link
                href="/store"
                className="inline-flex items-center gap-2 rounded-xl bg-[#806548] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#705239]"
              >
                Browse Furniture <FiChevronRight />
              </Link>
            }
          />
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const statusColors = {
                Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
                Shipped: "bg-purple-50 text-purple-700 border-purple-200",
                Processing: "bg-blue-50 text-blue-700 border-blue-200",
                Pending: "bg-amber-50 text-amber-700 border-amber-200",
                Cancelled: "bg-red-50 text-red-700 border-red-200",
              };

              const badgeClass =
                statusColors[order.orderStatus] ||
                "bg-stone-50 text-stone-700 border-stone-200";

              const orderDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—";

              return (
                <div
                  key={order._id || order.orderNumber}
                  className="overflow-hidden rounded-2xl border border-[#e8e3dc] bg-[#fcfbf9] transition-all hover:border-[#cdbda9]"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee8e0] bg-white p-4 sm:px-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8a79]">
                        Order #{order.orderNumber}
                      </span>
                      <p className="mt-0.5 text-xs text-[#737782]">
                        Placed on {orderDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-[#f0eae1] p-4 sm:px-6">
                    {order.items?.map((item, idx) => (
                      <div
                        key={item._id || idx}
                        className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-stone-400">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-medium text-[#292827]">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-xs text-[#737782]">
                            Qty: {item.qty} × ₹
                            {(
                              Number(item.salePrice || item.price) || 0
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-semibold text-[#292827]">
                            ₹
                            {(
                              (Number(item.salePrice || item.price) || 0) *
                              (Number(item.qty) || 1)
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Details */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#eee8e0] bg-white p-4 sm:px-6">
                    <div className="text-xs text-[#737782]">
                      <span className="font-medium text-[#292827]">
                        Delivery to:{" "}
                      </span>
                      {order.shippingAddress?.fullName},{" "}
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.state} •{" "}
                      <span className="capitalize font-medium text-[#8a684b]">
                        {order.paymentMethod?.toUpperCase()} (
                        {order.paymentStatus})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-[#737782]">
                        Total Amount:{" "}
                      </span>
                      <span className="text-base font-bold text-[#806548]">
                        ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#806548] transition hover:text-[#59432f]"
        >
          <FiArrowLeft size={16} /> Back to store
        </Link>

        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a684b]">
            NESTRO · MY ACCOUNT
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#292827] sm:text-4xl">
            Account dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#737782] sm:text-base">
            Manage your personal information, delivery addresses, and account
            settings in one place.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-[#e8e3dc] bg-white p-3 lg:sticky lg:top-24">
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#faf9f7] p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eee9e2] text-lg font-semibold text-[#806548]">
                {firstLetter}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#292827]">
                  {user.name || "User"}
                </p>
                <p className="truncate text-xs text-[#737782]">{user.email}</p>
              </div>
            </div>

            <p className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a8a79]">
              Manage account
            </p>

            <nav
              aria-label="Account navigation"
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
            >
              {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      setActiveTab(id);
                      if (id !== "personal") setEditing(false);
                    }}
                    className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition lg:w-full ${
                      isActive
                        ? "bg-[#806548] font-medium text-white shadow-sm"
                        : "text-[#55504a] hover:bg-[#f7f2ec] hover:text-[#59432f]"
                    }`}
                  >
                    <Icon className="shrink-0" size={18} />
                    <span>{label}</span>
                    {isActive && (
                      <FiChevronRight className="ml-auto hidden lg:block" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-[#eee8e0] pt-4">
              <Link
                href="/store"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#55504a] transition hover:bg-[#f7f2ec]"
              >
                <FiPackage size={18} /> Continue shopping
              </Link>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9a8a79]">
                Your account
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#292827]">
                {activeTabLabel}
              </h2>
            </div>

            {activeTab === "overview" && renderOverview()}
            {activeTab === "personal" && renderPersonalInformation()}
            {activeTab === "addresses" && renderAddresses()}
            {activeTab === "security" && renderSecurity()}
            {activeTab === "orders" && renderOrders()}

            <p className="mt-6 text-center text-xs text-[#96908a]">
              NESTRO. · Account created{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN")
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
