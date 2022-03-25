import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import vinylReducer from "./vinyls";
import authReducer from "./auth";


interface State {
  cart: {
    cart: {
        id: number;
        title: string;
        artist: string;
        url?: string;
        originalPrice: number;
        salePrice: number | null;
        rating: number;
        quantity: number;
        genres: string[]
      }[];
    quantity: number;
  }
  auth: {
    isLogged: boolean
    full_name: string | null
    id: string | null
  }
  vinyls : {
    vinyls: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number | null;
      rating: number;
      genres: string[]
    }[];
  }
}

const store = configureStore({
  reducer: {cart: cartReducer, vinyls: vinylReducer, auth: authReducer}
});


export default store;