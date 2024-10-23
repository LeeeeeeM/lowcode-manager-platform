import { create } from "zustand";

import { registerStore } from "/@/store/registerStore";

interface BearState {
  bears: number;
}

interface BearActions {
  increasePopulation: () => void;
  reset: () => void;
}

const initState: BearState = {
  bears: 0,
};

export const useStore = create<BearState & BearActions>((set) => ({
  ...initState,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  reset: () => {
    set(initState);
  }
}));

registerStore("detail", useStore);
