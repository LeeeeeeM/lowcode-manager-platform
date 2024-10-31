const projectConfig = {
  portalConfig: {
    hasNav: true,
    hasTitle: false,
  },
  pageConfigList: [
    {
      name: "我是页面 3",
      identifier: "xxx3",
      url: "//localhost:8083/pages/xxx3.html",
    },
    {
      name: "我是页面 2",
      identifier: "xxxx2",
      url: "//localhost:8083/pages/xxxx2.html",
    },
    {
      name: "我是页面1",
      identifier: "xxx1",
      url: "//localhost:8083/pages/xxx1.html",
    },
    // {
    //   name: '本地页面',
    //   identifier: "xxx12",
    //   url: '//localhost:5174/'
    // }
  ],
};

const projectConfigBuild = {
  portalConfig: {
    hasNav: true,
    hasTitle: false,
  },
  pageConfigList: [],
};

export const injectCode = `window.__PROJECT_CONFIG__=${JSON.stringify(
  process.env.NODE_ENV === "production" ?  projectConfigBuild: projectConfig
)}`;
