import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoints";

//#region loging into Session
const loginApi: any = createAsyncThunk("employees", async data => {
  try {
    const info = await API.post(API_ENDPOINTS.AUTH_LOGIN, data);
    return info;
  } catch (error) {
    return error.response;
  }
});
//#endregion

//For better visibility, consider creating a separate file to define interfaces and types
interface ILogin {
  loggedIn: [];
  loading: boolean;
  error: string;
}

const initialState: ILogin = {
  loggedIn: [],
  loading: false,
  error: ""
};

const loginSl = createSlice({
  name: "LogIn",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.loggedIn = false;
      state.loading = false;
      state.error = "";
    }
  },

  extraReducers: builder => {
    builder
      .addCase(loginApi.fulfilled, (state: ILogin, action) => {
        state.loggedIn = action.payload; // Update the property based on your actual data structure
        state.loading = false;
        state.error = "";
      })
      .addCase(loginApi.pending, (state: ILogin) => {
        state.loggedIn = [];
        state.loading = true;
        state.error = "";
      })
      .addCase(loginApi.rejected, (state: ILogin, action) => {
        state.loggedIn = [];
        state.loading = false;
        state.error = action?.error.message || "An error occurred"; // Update the property based on your actual error handling
      });
  }
});

export { loginApi };
export const { reset } = loginSl.actions;
export const LoginSlice = loginSl.reducer;
