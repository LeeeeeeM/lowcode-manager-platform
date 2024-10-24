export interface Project {
  id: number;
  name: string;
  remark: string;
}

export interface SimpleProject {
  id: number;
  //项目名称
   name: string;
  //创建时间
  createOn: number;
  //创建人
  createBy: string;
  //最后修改时间
  updateOn: number;
  //最后修改人
  updateBy: string;
}