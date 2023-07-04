import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "./loginAPI";
import { signupAPI } from "./signupAPI";

// Get token from localstorage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

// Create a slice with initial state
const initialState = {
  token: token ? token : null,
  user: user ? JSON.parse(user) : null,
  isError: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Actions
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // Async actions
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        const token = localStorage.getItem("token");
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.user = action.payload.data;
        state.token = token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        const token = localStorage.getItem("token");
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.user = action.payload.data;
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      });
  },
});

// Export actions
export const signup = createAsyncThunk("auth/signup", async (user, thunkAPI) => {
  try {
    const response = await signupAPI(user);
    let message = "Something went wrong";
    if (response?.response?.data?.error) message = response.response.data.error;
    else if (response.data?._id) return response;
    return thunkAPI.rejectWithValue(message);
  } catch (err) {
    const message = err.response?.data?.error || "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await loginAPI(user);
    let message = "Something went wrong";
    if (response?.response?.data?.error) message = response.response.data.error;
    else if (response.data?._id) return response;
    return thunkAPI.rejectWithValue(message);
  } catch (err) {
    const message = err.response?.data?.error || "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
