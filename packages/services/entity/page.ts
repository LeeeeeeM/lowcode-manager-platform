import { PAGE_TYPE } from "../constants";

export interface Page {
  id: number;
  //页面名称
  name: string;
  //内容
  content: string;
  //依赖
  assets: string;
  //创建时间
  createOn: bigint;
  //最后修改时间
  updateOn: bigint;
  //创建人
  createBy: string;
  //最后修改人
  updateBy: string;
  // 页面标识
  identifier: string;
  // 页面类型
  pageType: PAGE_TYPE;
}
