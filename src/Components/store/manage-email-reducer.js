import { createSlice } from "@reduxjs/toolkit";

const initalEmailState = { sent: [], receive:[] };

const manageEmailSlice = createSlice({
  name: "email-manager",
  initialState: initalEmailState,
  reducers: {
    setSendMail(state, action) {
      state.sent = state.sent.push(action.payload);
      console.log(action.payload, "==>inside redux");
    },
    setReceiveMail(state, action) {
      
      state.receive=state.receive.push('hloooo')
      let arr = [];
      let obj = action.payload;
      for (let id in obj) {
        arr.push({
          id: id,
          message: obj[id].message,
          subject: obj[id].subject,
        });
      }
      console.log(arr, "==>INSIDE  MANAGER");
       state.receive = arr
      
    },
  },
});

// console.log(initalEmailState.sent,"==>inside redux")

export const manageEmailActions = manageEmailSlice.actions;
export default manageEmailSlice.reducer;
