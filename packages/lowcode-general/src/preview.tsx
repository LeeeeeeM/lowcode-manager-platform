import ReactDOM from 'react-dom';
import React, { FC, useState } from 'react';
import { Loading, Message } from '@alifd/next';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
// import { Slot, Leaf } from './built-in-comp';
import { PAGE_SIG_ID } from 'common';
import { PAGE_TYPE } from 'services/constants';
// import { injectComponents } from '@alilc/lowcode-plugin-inject';
import appHelper from './appHelper';
import { getAllPageInfo } from './services';
import builtInComponentsList from './built-in/components';
import { FORM_COMP_LIST, FORM_ITEM, FORM_ITEM_ADAPTOR_NAME } from './constants/components';
import './landing.less';

// const getScenarioName = function () {
//   if (location.search) {
//     return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
//   }
//   return 'general';
// };

const Preview = () => {
  const [data, setData] = useState({});
  const urlParams = new URLSearchParams(location.search.slice(1));
  const pageId = urlParams.get(PAGE_SIG_ID);

  async function init() {
    // const scenarioName = getScenarioName();

    const componentsMap: any = {};
    const libraryMap = {};

    try {
      const schema = await getAllPageInfo(pageId);
      const { assets, content, pageType } = schema || {};
      const projectSchema = JSON.parse(content) || {};
      const pack = JSON.parse(assets) || [];
      const packages = isEmpty(pack) ? [] : pack;
      const {
        componentsMap: componentsMapArray = [],
        componentsTree = {},
        i18n = {},
        dataSource: projectDataSource = {},
      } = projectSchema;
      const pageSchema = componentsTree?.[0] || {};

      // 渲染器针对 form 表单进行处理
      if (pageType === PAGE_TYPE.FORM) {
        const formPageContainer = pageSchema.children[0];
        const formSchema = await import('./services/defaultFormPageSchema');
        if (formPageContainer?.children) {
          formPageContainer.children.push(formSchema.ButtonGroup);
        }
      }

      componentsMapArray.forEach((component: any) => {
        componentsMap[component.componentName] = component;
      });
      // @ts-ignore
      const libraryAsset = [];
      // @ts-ignore
      packages.forEach(({ package: _package, library, urls, renderUrls }) => {
        // @ts-ignore
        libraryMap[_package] = library;
        if (renderUrls) {
          libraryAsset.push(renderUrls);
        } else if (urls) {
          libraryAsset.push(urls);
        }
      });
      // @ts-ignore
      // const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

      // TODO asset may cause pollution
      const assetLoader = new AssetLoader();
      // @ts-ignore
      await assetLoader.load(libraryAsset);

      // injectComponents 的使用一般在开发环境做调试注入使用（详细见文档），一般纯净的预览环境是不依赖此插件（即预览渲染态理论上是不需要依赖任何引擎及其相关的插件等资源，PS: 一些 utils 和 types 忽略）
      // The use of injectComponents is generally used for debugging and injection in the development environment (see the documentation for details). The generally destroyed preview environment does not rely on this plug-in.
      // const components = await injectComponents(buildComponents(libraryMap, componentsMap));
      // @ts-ignore
      const components = buildComponents(libraryMap, componentsMap);

      setData({
        schema: pageSchema,
        components,
        i18n,
        projectDataSource,
        pageType
      });
    } catch (e) {
      console.log(e);
      Message.error(`获取数据失败`);
    }
  }

  const { schema, components, i18n = {}, projectDataSource = {}, pageType } = data as any;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }
  // const currentLocale = getPreviewLocale(getScenarioName());

  // if (!(window as any).setPreviewLocale) {
  //   // for demo use only, can use this in console to switch language for i18n test
  //   // 在控制台 window.setPreviewLocale('en-US') 或 window.setPreviewLocale('zh-CN') 查看切换效果
  //   (window as any).setPreviewLocale = (locale: string) =>
  //     setPreviewLocale(getScenarioName(), locale);
  // }

  if (isEmpty(schema)) return <div id="lce-empty-page">当前页面模板为空</div>;

  function customizer(objValue: [], srcValue: []) {
    if (isArray(objValue)) {
      return objValue.concat(srcValue || []);
    }
  }

  const builtInComponents = builtInComponentsList.reduce((result: Record<string, FC>, next) => {
    result[next.name] = next.component;
    return result;
  }, {});

  const transform2FormItemText = (schema: any, formData: Record<string, any>) => {
    const formContainer = schema.children[0];
    if (formContainer) {
      const formItems = formContainer.children || [];
      const newChildren = formItems.map((item: any) => {
        if (item.componentName === FORM_ITEM) {
          item.children = item.children.map((childItem: any) => {
            // @todo 几个枚举直接返回
            if (!FORM_COMP_LIST.includes(childItem.componentName)) {
              return childItem;
            }
            return {
              componentName: FORM_ITEM_ADAPTOR_NAME,
              props: {
                parentProps: item.props || {},
                currrentProps: childItem.props || {},
                currentComponent: childItem.componentName,
                formData,
              },
            };
          });
        }
        return item;
      });
      formContainer.children = newChildren;
    }
  };

  if (pageType === PAGE_TYPE.FORM) {
    // 测试代码
    transform2FormItemText(schema, {
      form_item_jldf: 'zzz111',
      form_item_kzp3: 'A',
      form_item_ikwy: 'xxx',
      form_item_efvd: 'C',
      form_item_xxx1: ['B', 'A'],
      form_item_l078: 'tt',
    });
  }


  return (
    <ReactRenderer
      schema={{
        ...schema,
        dataSource: mergeWith(schema.dataSource, projectDataSource, customizer),
      }}
      onCompGetCtx={(schema, ctx) => {
        // @todo 移植过去
        console.log(schema, ctx);
        // setTimeout(() => {
        //   ctx['form_ref'].submit();
        // }, 1000);
      }}
      components={{
        ...builtInComponents,
        ...components,
      }}
      // locale={currentLocale}
      messages={i18n}
      appHelper={appHelper}
    />
  );
};

ReactDOM.render(<Preview />, document.getElementById('ice-container'));
