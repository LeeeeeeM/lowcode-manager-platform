import { Page } from "../entity";
import { PAGE_TYPE } from '../constants';
import { Project, SimpleProject } from "../entity/project";

export interface CreateProjectRequest {
  name: string;
  remark: string;
  userName: string;
}

export interface DeleteProjectRequest {
  projectId: number;
}

export interface GetProjectListRequest {
  userName: string;
  pageNum: number;
  pageSize: number;
}

export interface GetProjectRequest {
  projectId: number;
}

export interface GetProjectResponse {
  project: Project;
}

export interface CreatePageRequest {
  projectId: number;
  name: string;
  userName: string;
  identifier: string;
  pageType: PAGE_TYPE;
}

export interface UpdatePageRequest {
  //项目id
  projectId: number;
  //id
  pageId: number;
  //页面名称
  name: string;
  //用户
  userName: string;
  //页面标识
  identifier: string;
  // 页面类型
  pageType: PAGE_TYPE;
}

export interface CreatePageResponse {
  pageId: number;
}

export interface DeletePageRequest {
  pageId: number;
}

export interface SavePageConfRequest {
  pageId: number;
  content: string;
  assets: string;
  userName: string;
}

export interface GetPageRequest {
  pageId: number;
}

export interface GetPageResponse {
  page: Page;
}

export interface GetPageListRequest {
  projectId: number;
  pageNum: number;
  pageSize: number;
}

export interface GetPageListResponse {
  pageList: Page[];
  total: number;
}

export interface Result {
  code: number;
  message: string;
}

export interface CreatePageResult {
  projectId: number;
}

export interface GetProjectListResult {
  projectList: SimpleProject[];
  total: number;
}
