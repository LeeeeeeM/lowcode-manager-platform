import { StoreApi } from "zustand";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type U = any;

const zStore: Map<string, StoreApi<U>> = new Map();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).__Zstore__ = zStore;

export const registerStore = (name: string, store: StoreApi<U> ) => {
  if (zStore.has(name)) {
    console.warn(`${name} has registered`);
  } else {
    zStore.set(name, store);
  }
}