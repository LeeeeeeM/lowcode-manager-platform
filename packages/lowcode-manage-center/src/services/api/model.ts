import { SimpleProject } from "../entity/project";

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

export interface CreatePageRequest {
  projectId: number;
  name: string;
  userName: string;
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

export interface GetPageListRequest {
  pageId: number;
  pageNum: number;
  pageSize: number;
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