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
    return this.instance.post(url, data, config).then(({ data }) => data);
  }
}

export const apiInstance = new API();

export default API;
