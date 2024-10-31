interface PageConfig {
  name: string;
  url: string;
  identifier: string;
}


interface Window {
  __WUJIE: {
    id: string
  },
  __PROJECT_CONFIG__: {
    portalConfig: {
      hasNav: boolean;
      hasTitle: boolean;
    }
    pageConfigList: PageConfig[];
  }
}