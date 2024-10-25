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
}
