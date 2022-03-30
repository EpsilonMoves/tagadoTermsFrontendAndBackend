import { createSlice } from "@reduxjs/toolkit";

export const termsSlice = createSlice({
  name: "terms",
  initialState: {
    value: {},
  },
  reducers: {
    setReducerTerms: (state, action) => {
      state.value = { ...action.payload };
    },
    clearReducerTerms: (state) => {
      state.value = {};
    },
  },
});

export const { setReducerTerms, clearReducerTerms } = termsSlice.actions;
export const selectTerms = (state) => state.reducer.value;

export default termsSlice.reducer;
