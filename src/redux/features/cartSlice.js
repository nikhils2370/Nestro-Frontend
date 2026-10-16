import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  original_total: 0,
  final_total: 0,
};

// Calculate totals using each item's quantity
const calculateTotals = (items) => {
  return items.reduce(
    (totals, item) => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.price ?? item.originalPrice) || 0;
      const salePrice =
        Number(item.salePrice ?? item.price ?? item.originalPrice) || 0;

      totals.original_total += price * qty;
      totals.final_total += salePrice * qty;

      return totals;
    },
    { original_total: 0, final_total: 0 },
  );
};

const saveCart = (state) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add product
    addtoCart: (state, { payload }) => {
      const product = state.items.find(
        (item) => String(item.id) === String(payload.id),
      );

      if (product) {
        product.qty += 1;
      } else {
        state.items.push({
          ...payload,
          qty: Number(payload.qty) || 1,
        });
      }

      const totals = calculateTotals(state.items);
      state.original_total = totals.original_total;
      state.final_total = totals.final_total;

      saveCart(state);
    },

    // Load cart from LocalStorage
    lstoCart: (state) => {
      if (typeof window === "undefined") return;

      try {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "null");

        if (savedCart && Array.isArray(savedCart.items)) {
          state.items = savedCart.items;

          const totals = calculateTotals(state.items);
          state.original_total = totals.original_total;
          state.final_total = totals.final_total;
        }
      } catch (error) {
        console.error("LocalStorage cart error:", error);
      }
    },

    // Load/replace cart from database
    setCart: (state, { payload }) => {
      state.items = Array.isArray(payload) ? payload : [];

      const totals = calculateTotals(state.items);
      state.original_total = totals.original_total;
      state.final_total = totals.final_total;

      saveCart(state);
    },

    // Increase quantity
    increateQty: (state, { payload }) => {
      const product = state.items.find(
        (item) => String(item.id) === String(payload.id),
      );

      if (!product) return;

      product.qty += 1;

      const totals = calculateTotals(state.items);
      state.original_total = totals.original_total;
      state.final_total = totals.final_total;

      saveCart(state);
    },

    // Decrease quantity
    decreaseQty: (state, { payload }) => {
      const product = state.items.find(
        (item) => String(item.id) === String(payload.id),
      );

      if (!product) return;

      if (product.qty > 1) {
        product.qty -= 1;
      } else {
        state.items = state.items.filter(
          (item) => String(item.id) !== String(payload.id),
        );
      }

      const totals = calculateTotals(state.items);
      state.original_total = totals.original_total;
      state.final_total = totals.final_total;

      saveCart(state);
    },

    // Remove product
    removeItem: (state, { payload }) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(payload.id),
      );

      const totals = calculateTotals(state.items);
      state.original_total = totals.original_total;
      state.final_total = totals.final_total;

      saveCart(state);
    },

    // Empty cart
    emptyCart: (state) => {
      state.items = [];
      state.original_total = 0;
      state.final_total = 0;

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const {
  addtoCart,
  lstoCart,
  setCart,
  increateQty,
  decreaseQty,
  removeItem,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
