import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, token, role } = useSelector((state) => state.user);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && storedData.role) {
      dispatch(
        login({ token: storedData.token, role: storedData.role })
      );
    }
  }, [dispatch]);

  const loginHandler = (token, role) => {
    dispatch(login({ token, role }));
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return { isLoggedIn, token, role, loginHandler, logoutHandler };
};
