import { GetReportMenuList } from "./model";

import { apiInstance as axios } from "../request";

import { GET_REPORT_MENU } from "./v2-url";

export const getReportMenuList = async (): Promise<GetReportMenuList> => {
  return axios.get(GET_REPORT_MENU);
}