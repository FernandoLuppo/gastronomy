import { createSlice } from "@reduxjs/toolkit";

export const mobileSlice = createSlice({
  name: "mobile",
  initialState: {
    show: {
      mobileMenu:
        typeof window !== "undefined" && window.innerWidth > 1024 ? false : true
    }
  },
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
