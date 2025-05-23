// 携带登录态credentials必须为include
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function fetch(url: RequestInfo, options?: RequestInit) {
  return window.fetch(url, { ...options, credentials: "omit" });
}
