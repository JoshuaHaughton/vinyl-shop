import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VinylType, VinylState } from "../types";

const initialVinylState: VinylState = { vinyls: [] };

//Here we are allowed to mutate the state, because toolkit uses another package called imgur that detects code like this and automatically clones the existing stae, creates new state object, keep all state we aren't editing and overwrite the state we are editing in an inmmutable way

//Vinyl Reducers
const vinylSlice = createSlice({
  name: "vinyls",
  initialState: initialVinylState,
  reducers: {
    setVinyls: (state, action: PayloadAction<VinylType[]>) => {
      console.log("setting redux state to", action.payload);
      state.vinyls = action.payload;
    },
  },
});

export const vinylActions = vinylSlice.actions;
export default vinylSlice.reducer;
