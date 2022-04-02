import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import vinylReducer from "./vinyls";
import authReducer from "./auth";

//Redux store that hosts all 3 reducer slices
const store = configureStore({
  reducer: {cart: cartReducer, vinyls: vinylReducer, auth: authReducer}
});


export default store;