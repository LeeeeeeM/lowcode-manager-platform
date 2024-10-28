export interface SimplePage {
  id: number;
  //页面名称
  name: string;
  //创建时间
  createOn: bigint;
  //最后修改时间
  updateOn: bigint;
  //创建人
  createBy: string;
  //最后修改人
  updateBy: string;
  // 资源包
  assets: string;
  // 模版
  content: string;
}

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
}
