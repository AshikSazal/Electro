import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from '../../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData && storedData.token && storedData.position) {
          dispatch(login({ token: storedData.token, position: storedData.position }));
        }
    }, [dispatch]);
    
    const loginHandler = (token, position) => {
    dispatch(login({ token, position }));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return { isLoggedIn, loginHandler, logoutHandler };
};
