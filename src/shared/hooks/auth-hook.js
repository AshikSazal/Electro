import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../../store/authSlice";
import { useHttpClient } from "./http-hook";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();

  const { token, role } = useSelector((state) => state.user);

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

  const logoutHandler = async () => {
    try {
      await sendRequest("http://127.0.0.1:8000/api/logout", "POST",null, {
        Authorization: "Bearer " + token,
      });
    } catch (err) {}
    dispatch(logout());
    navigate("/");
  };

  return { token, role, loginHandler, logoutHandler };
};
