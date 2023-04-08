import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from '../../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData && storedData.token && storedData.userId) {
          dispatch(login({ userId: storedData.userId, token: storedData.token }));
        }
    }, [dispatch]);
    
    const loginHandler = (userId, token) => {
    dispatch(login({ userId, token }));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return { isLoggedIn, loginHandler, logoutHandler };
};