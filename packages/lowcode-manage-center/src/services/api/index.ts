import { CreatePageRequest, CreatePageResult, CreateProjectRequest, DeletePageRequest, DeleteProjectRequest, GetPageListRequest, GetPageRequest, GetProjectListRequest, GetProjectListResult, GetProjectRequest, Result, SavePageConfRequest } from "./model";
import { apiInstance as axios } from './request';
import { CREATE_PAGE, CREATE_PROJECT, DELETE_PAGE, DELETE_PROJECT, GET_PAGE_DETAIL, GET_PAGE_LIST, GET_PROJECT_DETAIL, GET_PROJECT_LIST, SAVE_PAGE } from "./url";

export const CreateProject = (data: CreateProjectRequest): Promise<Result & CreatePageResult> => {
  return axios.post(CREATE_PROJECT, data);
};

export const DeleteProject = (data: DeleteProjectRequest) => {
  return axios.post(DELETE_PROJECT, data);
};

export const GetProjectList = (data: GetProjectListRequest): Promise<Result & GetProjectListResult> => {
  return axios.post(GET_PROJECT_LIST, data);
}

export const GetProjectDetail = (data: GetProjectRequest) => {
  return axios.post(GET_PROJECT_DETAIL, data);
}

export const CreatePage = (data: CreatePageRequest) => {
  return axios.post(CREATE_PAGE, data);
}

export const DeletePage = (data: DeletePageRequest) => {
  return axios.post(DELETE_PAGE, data);
}

export const SavePage = (data: SavePageConfRequest) => {
  return axios.post(SAVE_PAGE, data);
}

export const GetPageDetail = (data: GetPageRequest) => {
  return axios.post(GET_PAGE_DETAIL, data);
}

export const GetPageList = (data: GetPageListRequest) => {
  return axios.post(GET_PAGE_LIST, data);
}