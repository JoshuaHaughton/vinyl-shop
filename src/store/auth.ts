import { createSlice } from "@reduxjs/toolkit";
import { ReduxState, AuthState } from '../types'


const initialAuthState: AuthState = { isLogged: false, full_name: null, uid: null};

//Auth Reducers
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
export const selectUser = (state: ReduxState) => state.auth;


export default authSlice.reducer;
