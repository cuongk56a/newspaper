export const _API_ = {
  BASE_URL: import.meta.env.VITE_API_URL,
  AUTH: "/auth",
  USER: "/user",
  POST: "/newspaper/post",
  CATEGORY: "/newspaper/category",
}

export interface IResponse<T=any>{
  data:T;
  message:string;
  status: 200|400|401|403|413|404|500|502;
}