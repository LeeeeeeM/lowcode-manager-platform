import { create } from 'zustand'

import { registerStore } from '/@/store/registerStore';

interface CountState {
  count: number;
}

interface CountActions {
  addStateCount: () => void;
  reduceStateCount: () => void;
}

const initState: CountState = {
  count: 0
};

export const useStore = create<CountState & CountActions>((set) => ({
  ...initState,
  addStateCount: () => set((state) => ({ count: state.count + 1 })),
  reduceStateCount: () => set((state) => ({ count: state.count - 1 }))
}));


registerStore('home', useStore);