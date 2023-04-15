import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn:false,
    token: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      const { token, role } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.role = role;
      localStorage.setItem('userData', JSON.stringify({ token, role }));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.role = null;
      localStorage.removeItem('userData');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;