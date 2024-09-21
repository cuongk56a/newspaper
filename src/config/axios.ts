// import { useUserStore } from "@pages/authenticate/state";
import axios from "axios";
import queryString from "query-string";
import { handleResponseError } from "./api/auth.api";
// import { unstable_batchedUpdates } from "react-dom";

// Khởi tạo axios client với baseURL và cấu hình các thông số mặc định
const axios_client = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://127.0.0.1:8000/api/v1",
  paramsSerializer: (params) => queryString.stringify(params),
});

axios_client.defaults.timeout = 10000;

// Thêm interceptor cho request
axios_client.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      config.headers.Authorization = "Bearer " + access_token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
axios_client.interceptors.response.use(
  function (response) {
    // Bất kỳ trạng thái nào trong khoảng 2xx sẽ kích hoạt hàm này
    return response;
  },
  function (error) {
    handleResponseError(error)
  }
  // handleResponseError
);

// Xuất đối tượng axios_client
export default axios_client;
