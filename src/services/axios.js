import axios from "axios";
import router from "../router";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token");

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status == 401) {
      localStorage.removeItem("token");
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export default instance;
