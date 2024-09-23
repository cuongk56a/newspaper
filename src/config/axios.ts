import axios from "axios";
import queryString from "query-string";
import { handleResponseError } from "./api/auth.api";
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
  function (config) {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      config.headers.Authorization = "Bearer " + access_token;
    }
    config.headers['Content-Type'] ="application/json";

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
    // return Promise.reject(error);
    handleResponseError(error)
  }
);

// Xuất đối tượng axios_client
export default axios_client;
