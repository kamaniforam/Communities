import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { store } from "../../app/store";

const initialState = {
  isLoading: false,
  error: "",
  posts: [],
  communities: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    // Actions
  },
  extraReducers: (builder) => {
    // Async actions
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.posts =
          action.payload?.posts?.length > 0
            ? action.payload.posts.reverse()
            : action.payload.posts || [];
        state.communities = action.payload.communities || [];
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.posts = [];
        state.communities = [];
      });
  },
});

export const getFeed = createAsyncThunk("feed/getFeed", async (thunkAPI) => {
  try {
    const token = store.getState().auth.token;
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/feed`, {
      headers: { Authorization: `Basic ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Could not fetch feed");
  }
});

export default feedSlice.reducer;
