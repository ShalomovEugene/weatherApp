import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import type { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
export const useAppDispatch = () =>
  useDispatch<AppDispatch & ThunkDispatch<RootState, any, any>>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
