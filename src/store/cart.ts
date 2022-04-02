import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { VinylType, CartState } from "../types";

const initialCartState: CartState = { cart: [], quantity: 0 };

//Cart Reducers
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<VinylType>) => {
      state.cart.push({ ...action.payload, quantity: 1 });
      state.quantity += 1;
    },
    increment(state, action: PayloadAction<VinylType>) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.cart[itemIndex].quantity += 1;
      state.quantity += 1;
    },
    decrement(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (state.cart[itemIndex].quantity !== 1) {
        state.cart[itemIndex].quantity -= 1;
        state.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        state.quantity -= 1;
      }
    },
    changeQuantity(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );

      const originalItemQuantity = state.cart[itemIndex].quantity;
      const newTotalCartQuantity =
        state.quantity - originalItemQuantity + +action.payload.newQuantity;

      if (newTotalCartQuantity === 0) {
        state.quantity -= originalItemQuantity;
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        return;
      } else {
        state.cart[itemIndex].quantity = +action.payload.newQuantity;
        state.quantity = newTotalCartQuantity;
      }
    },
    removeVinyl(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.quantity -= action.payload.quantity;
    },
    setCart(state, action) {
      console.log("payload", action.payload);
      state.cart = action.payload.cart;
      state.quantity = action.payload.quantity;
    },
    resetCart(state) {
      state.cart = [];
      state.quantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
