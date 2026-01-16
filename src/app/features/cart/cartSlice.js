import { createSlice } from "@reduxjs/toolkit";

// 1. Get initial state from LocalStorage so cart persists on refresh
const savedCart = localStorage.getItem("cartList");
const initialState = {
  cartList: savedCart ? JSON.parse(savedCart) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productExit = state.cartList.find(
        (item) => item.id === productToAdd.id
      );
      if (productExit) {
        state.cartList = state.cartList.map((item) =>
          item.id === action.payload.product.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item
        );
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    decreaseQty: (state, action) => {
      const productExit = state.cartList.find(
        (item) => item.id === action.payload.id
      );
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.cartList = state.cartList.map((item) =>
          item.id === action.payload.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        );
      }
    },
    deleteProduct: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    // Action to clear cart after payment
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

// 2. Middleware to save cart to LocalStorage on every change
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
