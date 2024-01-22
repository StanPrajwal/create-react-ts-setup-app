import { combineReducers } from "redux";
import { LoginSlice } from "./features/auth/loginSlice";

export default combineReducers({
  LoginAction: LoginSlice

  //ALL YOUR OTHER SLICE GO HERE...
});
