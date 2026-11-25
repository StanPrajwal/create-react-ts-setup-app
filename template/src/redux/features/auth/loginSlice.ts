import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoints";

// For better visibility, consider moving these types into a separate file.
export interface LoginRequest {
  username: string;
  password: string;
}

// Replace with the shape your API returns.
export type LoginResponse = Record<string, unknown>;

interface LoginState {
  user: LoginResponse | null;
  loading: boolean;
  error: string;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: "",
};

//#region log in
export const loginApi = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    // Store only the response body: Axios responses are not serializable.
    const response = await API.post<LoginResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      data,
    );
    return response.data;
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.message ?? error.message)
      : "An error occurred";
    return rejectWithValue(String(message));
  }
});
//#endregion

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "An error occurred";
      });
  },
});

export const { reset } = loginSlice.actions;
export const LoginSlice = loginSlice.reducer;
