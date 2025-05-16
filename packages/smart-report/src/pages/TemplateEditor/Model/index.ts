import { create } from 'zustand'

import { registerStore } from '/@/store/registerStore';
import { MODEL_NAMESPACE } from '/@/constants/model';
import { MenuItem } from 'services/entity/report-menu';

interface TemplateEditorState {
  menuList: MenuItem[];
}

interface TemplateEditorActions {
  setMenuList: (list: MenuItem[]) => void;
}

const initState: TemplateEditorState = {
  menuList: []
};

export const useStore = create<TemplateEditorState & TemplateEditorActions>((set) => ({
  ...initState,
  setMenuList: (list) => set(() => ({ menuList: list }))
}));


registerStore(MODEL_NAMESPACE.TEMPLATE_EDITOR, useStore);