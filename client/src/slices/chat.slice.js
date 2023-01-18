import {createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
      adminuser: "",
      conversation:""
  },
  reducers: {
    setChatDetails: (state, {payload}) => {
      state.adminuser = payload.adminuser;
    },
    resetChatDetails: (state, { payload }) => {
      state.adminuser = "";
    },
    setConversationId:(state,{payload})=>{
        state.conversation=payload.conversation
    },
    resetConversationId:(state,{payload})=>{
        state.conversation=""
    }
  },
});

export const { setChatDetails, resetChatDetails,setConversationId,resetConversationId} = chatSlice.actions;
export default chatSlice.reducer;
