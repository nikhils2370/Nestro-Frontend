import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      console.log(action);
      
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.loading = false;
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, updateUser, clearUser, setUserLoading } =
  userSlice.actions;

export default userSlice.reducer;
