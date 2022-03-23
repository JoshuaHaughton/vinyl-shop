import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import vinylReducer from "./vinyls";



const store = configureStore({
  reducer: {cart: cartReducer, vinyls: vinylReducer}
});


export default store;