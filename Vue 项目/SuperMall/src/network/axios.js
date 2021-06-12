import originAxios from "axios";
import qs from "qs";

export default function axios(config) {
  // 1.创建axios的实例
  const instance = originAxios.create({
    baseURL: "http://123.207.32.32:8000/api/h8", // 自带的地址
    timeout: 100000
  });
  instance.interceptors.request.use(config => config);
  instance.interceptors.response.use(res => res.data);
  return instance(config);
}
