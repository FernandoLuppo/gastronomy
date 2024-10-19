import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const theme = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) =>
      state === "light" ? "dark" : "light"
  }
});

export const { changeTheme } = theme.actions;
export default theme.reducer;
