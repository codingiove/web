import axios from "axios";
import { Loading } from "element-ui";
let loadingInstance = Loading.service();

// const API = process.env.NODE_ENV === "development" ? "/api" : "https://autumnfish.cn";
const API = " http://123.207.32.32:9001";

const Axios = axios.create({
  baseURL: API,
});
// 每发送一次网络请求会来到这里
Axios.interceptors.request.use((config) => {
  loadingInstance = Loading.service();
  return config;
});
// 服务器返回结果会来到这里
Axios.interceptors.response.use(
  (res) => {
    loadingInstance.close();
    return res;
  },
  (err) => {
    loadingInstance.close();
    return err;
  }
);

export default Axios;
