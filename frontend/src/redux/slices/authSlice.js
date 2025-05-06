import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Load user from local storage
  isAuthenticated: !!localStorage.getItem("user"), // Check if user exists
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to local storage
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Clear local storage
    },
    updateCredits: (state, action) => {
      if (state.user) {
        state.user.creditPoints = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user)); // Update local storage
      }
    },
  },
});

export const { setCredentials, clearCredentials, updateCredits } =
  authSlice.actions;
export default authSlice.reducer;
