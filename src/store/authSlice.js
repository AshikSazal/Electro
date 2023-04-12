import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    token: null,
    position: null,
  },
  reducers: {
    login: (state, action) => {
      const { token, position } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.position = position;
      localStorage.setItem('userData', JSON.stringify({ token, position }));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.position = null;
      localStorage.removeItem('userData');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;