import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userReducer,
  },
});
