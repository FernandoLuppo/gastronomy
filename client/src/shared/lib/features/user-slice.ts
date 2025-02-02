import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id: string;
  name: string;
  email: string;
  logged: boolean;
}

const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
  logged: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, "logged">>) => {
      const { _id, name, email } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.logged = true;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "LuppoTw-User",
          JSON.stringify({ _id, name, email, logged: true })
        );
      }
    },
    logout: state => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.logged = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("LuppoTw-User");
      }
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
