import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/search/searchSlice";
import feedReducer from "../features/feed/feedSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    feed: feedReducer,
  },
});
