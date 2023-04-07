import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userId: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      const { userId, token } = action.payload;
      state.isLoggedIn = true;
      state.userId = userId;
      state.token = token;
      localStorage.setItem('userData', JSON.stringify({ userId, token }));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.token = null;
      localStorage.removeItem('userData');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;