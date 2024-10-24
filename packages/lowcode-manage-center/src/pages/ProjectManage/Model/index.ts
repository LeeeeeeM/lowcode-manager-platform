import { create } from 'zustand'

import { registerStore } from '/@/store/registerStore';
import { MODEL_NAMESPACE } from '/@/constants/model';
import { SimpleProject } from '/@/services/entity/project';

interface CountState {
  total: number;
  projectList: SimpleProject[];
}

interface CountActions {
  setProjectList: (list: SimpleProject[]) => void;
  setTotal: (total: number) => void;
}

const initState: CountState = {
  total: 0,
  projectList: []
};

export const useStore = create<CountState & CountActions>((set) => ({
  ...initState,
  setProjectList: (list) => set(() => ({ projectList: list })),
  setTotal: (total) => set(() => ({ total }))
}));


registerStore(MODEL_NAMESPACE.PROJECT_MANAGE, useStore);