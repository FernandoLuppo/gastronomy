import { createSlice } from "@reduxjs/toolkit";
import cookies from "js-cookie";
import { redirect } from "next/navigation";

const initialState = {
  cookies: {
    accessToken: "",
    refreshToken: ""
  }
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkUserCredentials: state => {
      const accessToken = cookies.get("accessToken");
      const refreshToken = cookies.get("refreshToken");
      console.log("cookies: ", cookies);
      console.log("accessToken: ", cookies);
      console.log("refreshToken: ", cookies);

      if (!accessToken || !refreshToken) return redirect("/login");

      state.cookies.accessToken = accessToken;
      state.cookies.refreshToken = refreshToken;
    }
  }
});

export const { checkUserCredentials } = auth.actions;
export default auth.reducer;
