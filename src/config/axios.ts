import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";
import { handleResponseError, refreshToken } from "./api/auth.api";
import { _API_ } from "./api.contains";
// import { unstable_batchedUpdates } from "react-dom";


// Khởi tạo axios client với baseURL và cấu hình các thông số mặc định
const axios_client = axios.create({
  baseURL: _API_.BASE_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axios_client.defaults.timeout = 10000;

// Thêm interceptor cho request
axios_client.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      config.headers.Authorization = "Bearer " + access_token;
    }
    // config.headers['Content-Type'] ="application/json";

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
axios_client.interceptors.response.use(
  function (response) {
    // Bất kỳ trạng thái nào trong khoảng 2xx sẽ kích hoạt hàm này
    return response;
  },
  async function (error) {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) {
          window.location.pathname;
          throw error;
        }
        const newToken = await refreshToken({ refresh: refresh_token });
        
        // Update the token in the original request
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        } else {
          originalRequest.headers = { 'Authorization': `Bearer ${newToken}` };
        }
        
        // Retry the original request with the new token
        return axios_client(originalRequest);
      } catch (refreshError) {
        // If refresh fails, the user will be redirected to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
    // handleResponseError(error)
  }
);

// Xuất đối tượng axios_client
export default axios_client;
