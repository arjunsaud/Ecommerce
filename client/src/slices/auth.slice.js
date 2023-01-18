import {createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
      email: "",
      bearer_token: "",
      refresh_token: "",
      role: "",
      userid:""
  },
  reducers: {
    setAuthDetails: (state, {payload}) => {
      state.email = payload.email;
      state.bearer_token = payload.bearer_token;
      state.refresh_token = payload.refresh_token;
      state.role = payload.role;
      state.userid=payload.userid
    },
    resetAuthDetails: (state, { payload }) => {
      state.email = "";
      state.bearer_token = "";
      state.refresh_token = "";
      state.role = "";
      state.userid="";
    },
  },
});

export const { setAuthDetails, resetAuthDetails } = authSlice.actions;
export default authSlice.reducer;
