import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      const { token, role } = action.payload;
      state.token = token;
      state.role = role;
      localStorage.setItem('userData', JSON.stringify({ token, role }));
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem('userData');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;