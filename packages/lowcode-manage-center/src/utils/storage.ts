import { Data } from "../store/Reducer/types"

const keyBefore = 'vite-react-ts-antd-starter-'

const setLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(
    `${keyBefore}${key}`,
    typeof value === 'string' ? value : JSON.stringify(value),
  )
}

const getLocalStorage = (key: string, isParse = false): Data[] => {
  const cache = localStorage.getItem(`${keyBefore}${key}`)

  if (cache === undefined) return cache

  return isParse ? cache && JSON.parse(cache) : cache
}

export { setLocalStorage, getLocalStorage }
