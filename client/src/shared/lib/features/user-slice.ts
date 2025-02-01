import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  if (typeof window === "undefined") return;
  const userFromLocalStorage = localStorage.getItem("LuppoTw-User");
  if (userFromLocalStorage) return JSON.parse(userFromLocalStorage);

  return {
    _id: "",
    name: "",
    email: "",
    logged: false
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    setUser: (state, action) => {
      const { _id, name, email } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.logged = true;
      localStorage.setItem(
        "LuppoTw-User",
        JSON.stringify({ _id, name, email, logged: true })
      );
    },
    logout: () => {
      localStorage.removeItem("LuppoTw-User");
      return {
        _id: "",
        name: "",
        email: "",
        logged: false
      };
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
