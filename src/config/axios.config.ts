import axios from "axios";
import { environment } from "../environment/environment";
const API = axios.create({
  baseURL: environment.devlopmentURL // OR environment.productionURL
});

API.interceptors.request.use(
  //CHANGE THIS CODE AS PER YOUR NEED

  async (config: any) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      };
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default API;
