import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.ts";

const preloadedState = {
  auth: {
    currentUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
    isFetching: false,
    error: false,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra tuần tự hóa (không khuyến khích)
    }),
});

export default store;
