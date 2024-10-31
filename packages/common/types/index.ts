export interface PageConfig {
  name: string;
  url: string;
  identifier: string;
}

export interface ProjectConfInterface {
  portalConfig: {
    hasNav: boolean;
    hasTitle: boolean;
    projectTitle: string;
  };
  pageConfigList: PageConfig[];
}
