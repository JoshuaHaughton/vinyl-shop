import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cart: [], quantity: 0 };

//Here we are allowed to mutate the state, because toolkit uses another package called imgur that detects code like this and automatically clones the existing stae, creates new state object, keep all state we aren't editing and overwrite the state we are editing in an inmmutable way
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      state.cart.push({ ...action.payload, quantity: 1 });
      state.quantity += 1;
    },
    increment(state, action) {
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

      state.cart[itemIndex].quantity = +action.payload.newQuantity;
      state.quantity = newTotalCartQuantity;
    },
    removeVinyl(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.quantity -= action.payload.quantity;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
