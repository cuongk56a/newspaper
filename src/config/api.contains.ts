export const _API_ = {
  BASE_URL: "http://127.0.0.1:8000/api/v1",
  AUTH: "/auth",
  USER: "/user",
  POST: "/newspaper/post",
}

export interface IResponse<T=any>{
  data:T;
  message:string;
  status: 200|400|401|403|413|404|500|502;
}