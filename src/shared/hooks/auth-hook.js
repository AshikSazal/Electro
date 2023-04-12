import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../../store/authSlice";
import { useHttpClient } from "./http-hook";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();

  const { isLoggedIn, token } = useSelector((state) => state.user);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && storedData.position) {
      dispatch(
        login({ token: storedData.token, position: storedData.position })
      );
    }
  }, [dispatch]);

  const loginHandler = (token, position) => {
    dispatch(login({ token, position }));
  };

  const logoutHandler = async () => {
    try {
      await sendRequest("http://127.0.0.1:8000/api/logout", "POST",null, {
        Authorization: "Bearer " + token,
      });
    } catch (err) {}
    dispatch(logout());
  };

  return { isLoggedIn, token, loginHandler, logoutHandler };
};
