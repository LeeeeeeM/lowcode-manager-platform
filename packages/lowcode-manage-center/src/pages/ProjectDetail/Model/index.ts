import { create } from 'zustand'

import { registerStore } from '/@/store/registerStore';
import { MODEL_NAMESPACE } from '/@/constants/model';

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


registerStore(MODEL_NAMESPACE.PROJECT_DETAIL, useStore);