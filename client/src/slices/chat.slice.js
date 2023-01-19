import {createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
      adminuser: "",
      message:{},
  },
  reducers: {
    setChatDetails: (state, {payload}) => {
      state.adminuser = payload.adminuser;
    },
    resetChatDetails: (state, { payload }) => {
      state.adminuser = "";
    },
    setMessage:(state,{payload})=>{
      return { message: {...payload} };
    },
    resetMessage:(state,{payload})=>{
      return { message: {} };
    },
  },
});

export const { setChatDetails, resetChatDetails,setMessage,resetMessage} = chatSlice.actions;
export default chatSlice.reducer;
