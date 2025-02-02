import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: {
    mobileMenu: false
  }
};

export const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    toggleMobileMenu: state => {
      state.show.mobileMenu = !state.show.mobileMenu;
    },
    setMobileMenu: (state, action) => {
      state.show.mobileMenu = action.payload;
    }
  }
});

export const { toggleMobileMenu, setMobileMenu } = mobileSlice.actions;
export default mobileSlice.reducer;
