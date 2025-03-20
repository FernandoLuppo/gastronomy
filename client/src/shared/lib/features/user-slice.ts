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
    setUser: (state, action: PayloadAction<UserState>) => {
      const { _id, name, email, logged } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.logged = logged;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "LuppoTw-User",
          JSON.stringify({ _id, name, email, logged })
        );
      }
    },
    logout: state => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.logged = false;

      if (typeof window !== "undefined")
        localStorage.removeItem("LuppoTw-User");
    },

    getUser: state => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("LuppoTw-User") || "{}";
        const user = JSON.parse(data);
        if (user?.name) {
          state._id = user._id;
          state.name = user.name;
          state.email = user.email;
          state.logged = true;
        }
      }
    }
  }
});

export const { setUser, logout, getUser } = userSlice.actions;
export default userSlice.reducer;
