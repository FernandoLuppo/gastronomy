import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme-slice";
import authReducer from "./features/auth-slice";
import passwordReducer from "./features/showPassword-slice";

export const store = configureStore({
  reducer: {
    themeReducer,
    authReducer,
    passwordReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;
