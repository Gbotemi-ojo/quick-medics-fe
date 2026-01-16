import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
