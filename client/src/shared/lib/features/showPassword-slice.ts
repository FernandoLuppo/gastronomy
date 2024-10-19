import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
  name: "password",
  initialState: {
    show: { password: false, confirmPassword: false }
  },
  reducers: {
    togglePasswordVisibility: (
      state,
      action: PayloadAction<"password" | "confirmPassword">
    ) => {
      const field = action.payload;
      state.show[field] = !state.show[field];
    }
  }
});

export const { togglePasswordVisibility } = passwordSlice.actions;
export default passwordSlice.reducer;
