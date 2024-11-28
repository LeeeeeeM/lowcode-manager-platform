import { DEVELOP_COMPONENT_URL } from 'common';
const PREFIX = MODE === 'development' ? DEVELOP_COMPONENT_URL : location.origin;

const assets = {
  packages: [
    // {
    //   package: 'moment',
    //   version: '2.24.0',
    //   urls: [`${PREFIX}/resources/moment/moment.min.js`],
    //   library: 'moment',
    // },
    // {
    //   package: 'lodash',
    //   library: '_',
    //   urls: [`${PREFIX}/resources/lodash/lodash.min.js`],
    // },
    {
      title: 'fusion组件库',
      package: '@alifd/next',
      version: '1.27.29',
      urls: [
        `${PREFIX}/resources/next/next.min.css`,
        `${PREFIX}/resources/next/next.min.js`,
      ],
      library: 'Next',
    },
    {
      package: '@ant-design/icons',
      version: '4.7.0',
      urls: [`${PREFIX}/resources/@ant-design/icons/index.umd.min.js`],
      library: 'icons',
    },
    {
      package: 'antd',
      version: '4.24.16',
      urls: [`${PREFIX}/resources/antd/dist/antd.js`, `${PREFIX}/resources/antd/dist/antd.css`],
      library: 'antd',
    },
    // {
    //   title: 'NextTable',
    //   package: 'NextTable',
    //   version: '1.0.1',
    //   urls: [
    //     `${PREFIX}/resources/next-table/next-table.js`,
    //     `${PREFIX}/resources/next-table/next-table.css`,
    //   ],
    //   library: 'NextTable',
    // },
    {
      package: '@alilc/lowcode-materials',
      version: '1.2.1',
      library: 'AlilcLowcodeMaterials',
      urls: [
        `${PREFIX}/resources/lowcode-materials/build/lowcode/view.js`,
        `${PREFIX}/resources/lowcode-materials/build/lowcode/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/lowcode-materials/build/lowcode/view.js`,
        `${PREFIX}/resources/lowcode-materials/build/lowcode/view.css`,
      ],
    },
    {
      package: '@alifd/layout',
      version: '2.4.1',
      library: 'AlifdLayout',
      urls: [
        `${PREFIX}/resources/layout/build/lowcode/view.js`,
        `${PREFIX}/resources/layout/build/lowcode/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/layout/build/lowcode/view.js`,
        `${PREFIX}/resources/layout/build/lowcode/view.css`,
      ],
    },
    // {
    //   package: '@alifd/pro-layout',
    //   version: '1.0.1-beta.5',
    //   library: 'AlifdProLayout',
    //   urls: [
    //     'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/dist/AlifdProLayout.js',
    //     'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/dist/AlifdProLayout.css',
    //   ],
    //   editUrls: [
    //     'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/view.js',
    //     'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/view.css',
    //   ],
    // },
    {
      package: '@alifd/fusion-ui',
      version: '2.1.0',
      library: 'AlifdFusionUi',
      urls: [
        `${PREFIX}/resources/fusion-ui/build/lowcode/view.js`,
        `${PREFIX}/resources/fusion-ui/build/lowcode/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/fusion-ui/build/lowcode/view.js`,
        `${PREFIX}/resources/fusion-ui/build/lowcode/view.css`,
      ],
    },
    {
      package: '@alilc/antd-lowcode-materials',
      version: '1.2.1',
      library: 'AntdLowcode',
      urls: [
        `${PREFIX}/resources/antd-lowcode-materials/build/lowcode/view.js`,
        `${PREFIX}/resources/antd-lowcode-materials/build/lowcode/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/antd-lowcode-materials/build/lowcode/view.js`,
        `${PREFIX}/resources/antd-lowcode-materials/build/lowcode/view.css`,
      ],
    },
    {
      package: 'custom-table',
      version: '0.1.0',
      library: 'CustomTable',
      urls: [
        `${PREFIX}/resources/custom-table/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-table/build/lowcode/render/default/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/custom-table/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-table/build/lowcode/render/default/view.css`,
      ],
      advancedUrls: {
        default: [
          `${PREFIX}/resources/custom-table/build/lowcode/render/default/view.js`,
          `${PREFIX}/resources/custom-table/build/lowcode/render/default/view.css`,
        ],
      },
      advancedEditUrls: {},
    },
    {
      package: 'custom-tooltip',
      version: '0.1.0',
      library: 'CustomTooltip',
      urls: [
        `${PREFIX}/resources/custom-tooltip/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-tooltip/build/lowcode/render/default/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/custom-tooltip/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-tooltip/build/lowcode/render/default/view.css`,
      ],
      advancedUrls: {
        default: [
          `${PREFIX}/resources/custom-tooltip/build/lowcode/render/default/view.js`,
          `${PREFIX}/resources/custom-tooltip/build/lowcode/render/default/view.css`,
        ],
      },
      advancedEditUrls: {},
    },
    {
      package: 'custom-popover',
      version: '0.1.0',
      library: 'CustomPopover',
      urls: [
        `${PREFIX}/resources/custom-popover/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-popover/build/lowcode/render/default/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/custom-popover/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-popover/build/lowcode/render/default/view.css`,
      ],
      advancedUrls: {
        default: [
          `${PREFIX}/resources/custom-popover/build/lowcode/render/default/view.js`,
          `${PREFIX}/resources/custom-popover/build/lowcode/render/default/view.css`,
        ],
      },
      advancedEditUrls: {},
    },
    {
      package: 'custom-transfer',
      version: '0.1.0',
      library: 'CustomTransfer',
      urls: [
        `${PREFIX}/resources/custom-transfer/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-transfer/build/lowcode/render/default/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/custom-transfer/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/custom-transfer/build/lowcode/render/default/view.css`,
      ],
      advancedUrls: {
        default: [
          `${PREFIX}/resources/custom-transfer/build/lowcode/render/default/view.js`,
          `${PREFIX}/resources/custom-transfer/build/lowcode/render/default/view.css`,
        ],
      },
      advancedEditUrls: {},
    },
    {
      package: 'wujie-container',
      version: '0.1.0',
      library: 'WujieContainer',
      urls: [
        `${PREFIX}/resources/wujie-container/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/wujie-container/build/lowcode/render/default/view.css`,
      ],
      editUrls: [
        `${PREFIX}/resources/wujie-container/build/lowcode/render/default/view.js`,
        `${PREFIX}/resources/wujie-container/build/lowcode/render/default/view.css`,
      ],
      advancedUrls: {
        default: [
          `${PREFIX}/resources/wujie-container/build/lowcode/render/default/view.js`,
          `${PREFIX}/resources/wujie-container/build/lowcode/render/default/view.css`,
        ],
      },
      advancedEditUrls: {},
    },
  ],
  components: [
    {
      exportName: 'AlilcLowcodeMaterialsMeta',
      npm: {
        package: '@alilc/lowcode-materials',
      },
      url: `${PREFIX}/resources/lowcode-materials/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/lowcode-materials/build/lowcode/meta.js`,
        design: `${PREFIX}/resources/lowcode-materials/build/lowcode/meta.design.js`,
      },
    },
    {
      exportName: 'AlifdLayoutMeta',
      npm: {
        package: '@alifd/layout',
        version: '2.4.1',
      },
      url: `${PREFIX}/resources/layout/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/layout/build/lowcode/meta.js`,
      },
    },
    {
      exportName: 'AlifdFusionUiMeta',
      npm: {
        package: '@alifd/fusion-ui',
      },
      url: `${PREFIX}/resources/fusion-ui/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/fusion-ui/build/lowcode/meta.js`,
        design: `${PREFIX}/resources/fusion-ui/build/lowcode/meta.design.js`,
      },
    },
    {
      exportName: 'AlilcAntdLowcodeMaterialsMeta',
      npm: {
        package: '@alilc/antd-lowcode-materials',
        version: '1.2.1',
      },
      url: `${PREFIX}/resources/antd-lowcode-materials/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/antd-lowcode-materials/build/lowcode/meta.js`,
        design: `${PREFIX}/resources/antd-lowcode-materials/build/lowcode/meta.design.js`,
      },
    },
    // {
    //   exportName: 'AlifdProLayoutMeta',
    //   npm: {
    //     package: '@alifd/pro-layout',
    //     version: '1.0.1-beta.5',
    //   },
    //   url: 'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/meta.js',
    //   urls: {
    //     default:
    //       'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/meta.js',
    //     design:
    //       'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/meta.design.js',
    //   },
    // },
    {
      exportName: 'CustomTableMeta',
      npm: {
        package: 'custom-table',
        version: '0.1.0',
      },
      url: `${PREFIX}/resources/custom-table/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/custom-table/build/lowcode/meta.js`,
      },
      advancedUrls: {
        default: `${PREFIX}/resources/custom-table/build/lowcode/meta.js`,
      },
    },
    {
      exportName: 'CustomTooltipMeta',
      npm: {
        package: 'custom-tooltip',
        version: '0.1.0',
      },
      url: `${PREFIX}/resources/custom-tooltip/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/custom-tooltip/build/lowcode/meta.js`,
      },
      advancedUrls: {
        default: `${PREFIX}/resources/custom-tooltip/build/lowcode/meta.js`,
      },
    },
    {
      exportName: 'CustomPopoverMeta',
      npm: {
        package: 'custom-popover',
        version: '0.1.0',
      },
      url: `${PREFIX}/resources/custom-popover/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/custom-popover/build/lowcode/meta.js`,
      },
      advancedUrls: {
        default: `${PREFIX}/resources/custom-popover/build/lowcode/meta.js`,
      },
    },
    {
      exportName: 'CustomTransferMeta',
      npm: {
        package: 'custom-transfer',
        version: '0.1.0',
      },
      url: `${PREFIX}/resources/custom-transfer/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/custom-transfer/build/lowcode/meta.js`,
      },
      advancedUrls: {
        default: `${PREFIX}/resources/custom-transfer/build/lowcode/meta.js`,
      },
    },
    {
      exportName: 'WujieContainerMeta',
      npm: {
        package: 'wujie-container',
        version: '0.1.0',
      },
      url: `${PREFIX}/resources/wujie-container/build/lowcode/meta.js`,
      urls: {
        default: `${PREFIX}/resources/wujie-container/build/lowcode/meta.js`,
      },
      advancedUrls: {
        default: `${PREFIX}/resources/wujie-container/build/lowcode/meta.js`,
      },
    },
  ],
  sort: {
    groupList: ['ANTD组件', 'FUSION基础组件', 'FUSION-UI组件', '布局组件'],
    categoryList: [
      '基础元素',
      '布局容器类',
      '表格类',
      '表单详情类',
      '帮助类',
      '对话框类',
      '业务类',
      '通用',
      '引导',
      '信息输入',
      '信息展示',
      '信息反馈',
    ],
  },
  groupList: ['ANTD组件', 'FUSION基础组件', 'FUSION-UI组件', '布局组件'],
  ignoreComponents: {},
};

export default assets;
