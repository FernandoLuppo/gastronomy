import { configureStore } from "@reduxjs/toolkit";
import passwordReducer from "./features/showPassword-slice";
import mobileReducer from "./features/mobile-slice";
import userReducer from "./features/user-slice";

export const store = configureStore({
  reducer: {
    passwordReducer,
    mobileReducer,
    userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;
