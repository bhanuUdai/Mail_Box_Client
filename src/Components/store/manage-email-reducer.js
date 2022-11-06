import { createSlice } from "@reduxjs/toolkit";

const initalEmailState = { sent: [], receive: [] };

const manageEmailSlice = createSlice({
  name: "email-manager",
  initialState: initalEmailState,
  reducers: {
    setSendMail(state, action) {
      state.sent = state.sent.push(action.payload);
      console.log(action.payload,"==>inside redux")
    },
  },
});

// console.log(initalEmailState.sent,"==>inside redux")

export const manageEmailActions = manageEmailSlice.actions;
export default manageEmailSlice.reducer;
