import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { mailToken: localStorage.getItem("mailBoxToken") };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      localStorage.setItem("mailBoxToken", action.payload);
      state.mailToken = action.payload;
    },
  },
});

export const authAction=authSlice.actions;
export default authSlice.reducer;