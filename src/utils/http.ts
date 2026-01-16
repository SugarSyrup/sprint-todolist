import Axios, { AxiosRequestConfig } from "axios";

const axios = Axios.create({
  baseURL: "https://assignment-todolist-api.vercel.app/api/sugarsyrup",
});

export const http = {
  get: async function get<Response = unknown>(
    path: string,
    options: AxiosRequestConfig = {}
  ) {
    const res = await axios.get<Response>(path, options);
    return res.data;
  },
  post: async function post<Request = unknown, Response = unknown>(
    path: string,
    data?: Request,
    options?: AxiosRequestConfig
  ) {
    const res = await axios.post<Response>(path, data, options);
    return res.data;
  },
  patch: async function patch<Request = unknown, Response = unknown>(
    path: string,
    data?: Request,
    options?: AxiosRequestConfig
  ) {
    const res = await axios.patch<Response>(path, data, options);
    return res.data;
  },
  delete: async function del<Response = unknown>(
    path: string,
    options: AxiosRequestConfig = {}
  ) {
    const res = await axios.delete<Response>(path, options);
    return res.data;
  },
};
