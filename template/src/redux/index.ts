import { combineReducers } from "@reduxjs/toolkit";
import { LoginSlice } from "./features/auth/loginSlice";

export default combineReducers({
  LoginAction: LoginSlice

  // ALL YOUR OTHER SLICES GO HERE...
});
