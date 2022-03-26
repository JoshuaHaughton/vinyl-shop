import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean
  full_name: string | null
  uid: string | null
}

// type Auth = {
//   id: number;
//   title: string;
//   artist: string;
//   url?: string;
//   originalPrice: number;
//   salePrice: number | null;
//   rating: number;
//   genres: string[]
// }
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
    uid: string | null
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


const initialAuthState: AuthState = { isLogged: false, full_name: null, uid: null};

//Here we are allowed to mutate the state, because toolkit uses another package called imgur that detects code like this and automatically clones the existing stae, creates new state object, keep all state we aren't editing and overwrite the state we are editing in an inmmutable way
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    reduxLogin: (state, action) => {
      state.isLogged = true;
      state.uid = action.payload.uid;
      state.full_name = action.payload.full_name;
    },
    reduxLogout: (state) => {
      state.isLogged = false;
      state.uid = null;
      state.full_name = null;
    },
  },
});

export const { reduxLogin, reduxLogout } = authSlice.actions;

// Selectors
export const selectUser = (state: State) => state.auth;


export default authSlice.reducer;


