import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      console.log(payload);
      payload.qty=1
      if (state.cart.length !== 0) {
        const check = state.cart.filter((value) => {
          if (value._id === payload._id) {
            return true;
          }
        });
        if (check.length !== 1) {
          toast.success("Item Added in Cart");
          return { cart: [payload , ...state.cart] };
        } else {
          toast.warning("Item Already Preasent");
        }
      } else {
        toast.success("Item Added in Cart");
        return { cart: [payload, ...state.cart] };
      }
    },
    removeFromCart: (state, { payload }) => {
      const data = state.cart.filter((value) => {
        if (value._id === payload) {
          return false;
        }
        return true;
      });
      return { cart: [...data] };
    },
    increaseCartItem: (state, { payload }) => {
      const newCart = state.cart.map((value) => {
        if (payload === value._id) return { ...value, qty: value.qty + 1 };
        else return value;
      });
      return { cart: [...newCart] };
    },
    decreaseCartItem: (state, { payload }) => {
      const newCart = state.cart.map((value) => {
        if (payload === value._id) return { ...value, qty: value.qty - 1 };
        else return value;
      });
      return { cart: [...newCart] };
    },
  },
});

export const { addToCart, removeFromCart, increaseCartItem, decreaseCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
