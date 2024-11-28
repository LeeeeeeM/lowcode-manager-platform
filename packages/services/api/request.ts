import axios, {
  CreateAxiosDefaults,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

class API {
  private instance: AxiosInstance;
  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config);
  }
  get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config).then(({ data }) => data);
  }
  post(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config).then(({ data }) => {
      if (data.code !== 200) {
        return Promise.reject(data.message);
      }
      return data;
    });
  }
  customGet(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }
}

export const apiInstance = new API();

export default API;
