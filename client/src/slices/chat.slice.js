import {createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
      adminuser: "",
  },
  reducers: {
    setChatDetails: (state, {payload}) => {
      state.adminuser = payload.adminuser;
    },
    resetChatDetails: (state, { payload }) => {
      state.adminuser = "";
    },
  },
});

export const { setChatDetails, resetChatDetails} = chatSlice.actions;
export default chatSlice.reducer;
