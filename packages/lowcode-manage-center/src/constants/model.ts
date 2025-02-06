import { PAGE_TYPE } from "services/constants";

export enum MODEL_NAMESPACE {
  PROJECT_MANAGE = "project_manage",
  PROJECT_DETAIL = "project_detail",
  PAGE_DETAIL = "page_detail",
}


export const PAGE_TYPE_TEXT_MAP: Record<PAGE_TYPE, Record<string, string>> = {
  [PAGE_TYPE.CUSTOM]: {
    text: "自定义页面",
  },
  [PAGE_TYPE.FORM]: {
    text: "表单页面",
  },
  [PAGE_TYPE.FORM_LIST]: {
    text: "表单管理",
  },
}

export const DEFAULT_PAGE_INFO = {
  name: "",
  identifier: "",
  page_type: PAGE_TYPE.CUSTOM,
};

export enum Action {
  PREVIEW = 'preview',
  MODIFY_INFO = 'modify'
}
