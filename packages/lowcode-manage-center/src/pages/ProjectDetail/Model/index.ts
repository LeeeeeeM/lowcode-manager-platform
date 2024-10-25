import { create } from "zustand";

import { registerStore } from "/@/store/registerStore";
import { MODEL_NAMESPACE } from "/@/constants/model";
import { ProjectInfo, SimplePage } from "services/entity";

interface ProjectDetailState {
  total: number;
  pageList: SimplePage[];
  projectInfo: ProjectInfo;
}


const initState: ProjectDetailState = {
  total: 0,
  pageList: [],
  projectInfo: {
    remark: "",
    name: "",
  },
};
interface ProjectDetailActions {
  setPageList: (list: SimplePage[]) => void;
  setPageTotal: (total: number) => void;
  reset: () => void;
}



export const useStore = create<ProjectDetailState & ProjectDetailActions>(
  (set) => ({
    ...initState,
    setPageList: (list) => set(() => ({ pageList: list })),
    setPageTotal: (total) => set(() => ({ total })),
    reset: () => {
      set(initState);
    }
  })
);

registerStore(MODEL_NAMESPACE.PROJECT_DETAIL, useStore);
