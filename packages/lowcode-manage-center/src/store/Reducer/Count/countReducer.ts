import { createSlice } from "@reduxjs/toolkit";

import type { InitialCountState, Data, CountActions } from "./countType";

const initialState: InitialCountState = {
  count: 0,
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    addStateCount: (state, action: { payload: Data }) => {
      console.log(action);
      state.count++;
    },

    reduceStateCount: (state, action: { payload: Data }) => {
      console.log(action);
      state.count--;
    },
  },
});

// Action creators are generated for each case reducer function
const { addStateCount, reduceStateCount }: CountActions = countSlice.actions;

const countReducer = countSlice.reducer;

export { addStateCount, reduceStateCount, countReducer };
