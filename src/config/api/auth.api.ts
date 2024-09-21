import { _API_ } from "../api.contains";
import { toast } from "react-toastify";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../../redux/features/authSlice";
import axios_client from "../axios";

export const loginUser = async (
  data: { email: string; password: string },
  dispatch: any,
  navigate: (path: string) => void
) => {
  dispatch(loginStart());
  try {
    const response = await axios_client.post(`${_API_.AUTH}/login/`, data);
    if (response.status == 200) {
      dispatch(loginSuccess(response.data));
      const { access_token, refresh_token } = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      navigate("/");
      return response.data;
    }else{
      return;
    }
  } catch (error) {
    dispatch(loginFailed());
    toast.error("Có lỗi xảy ra khi đăng nhập");
    throw error;
  }
};

export const registerUser = async (
  data: {
    email: string;
    phone: string;
    password: string;
    full_name: string;
    birthday: string;
  },
  dispatch: any,
  navigate: (path: string) => void
) => {
  dispatch(registerStart());

  try {
    const response = await axios_client.post(`${_API_.AUTH}/register/`, data);
    toast.success("Đăng ký thành công");
    dispatch(registerSuccess(response.data));
    navigate("/login");
    return response.data;
  } catch (error) {
    dispatch(registerFailed());
    toast.error("Có lỗi xảy ra khi đăng ký");
    throw error;
  }
};

export const refreshToken = async (data: { refresh: string }) => {
  try {
    const response = await axios_client.post(
      `${_API_.AUTH}/token/refresh/`,
      data
    );
    localStorage.setItem("access_token", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.clear();
    window.location.pathname;
    throw error;
  }
};

export const handleResponseError = async (error: any) => {
  const originalRequest = error.config;
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) {
      window.location.pathname;
      throw error;
    }
    try {
      const newToken = await refreshToken({ refresh: refresh_token });
      axios_client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return axios_client(originalRequest);
    } catch (refreshError) {
      console.error(
        "Retrying request failed after token refresh:",
        refreshError
      );
      window.location.pathname;
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};
