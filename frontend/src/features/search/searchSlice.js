import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../app/store";

const initialState = {
  isLoading: false,
  error: "",
  communities: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Actions
  },
  extraReducers: (builder) => {
    // Async actions
    builder
      .addCase(searchCommunities.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(searchCommunities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.communities = action.payload;
      })
      .addCase(searchCommunities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.communities = [];
      });
  },
});

export const searchCommunities = createAsyncThunk(
  "search/communities",
  async (searchTerm, thunkAPI) => {
    try {
      const token = store.getState().auth.token;
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/community?search=${searchTerm}`,
        {
          headers: { Authorization: `Basic ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Searh failed");
    }
  }
);

export default searchSlice.reducer;
