import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading, Message } from '@alifd/next';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { PAGE_SIG_ID } from 'common';
// import { injectComponents } from '@alilc/lowcode-plugin-inject';
import appHelper from './appHelper';
import { getAllPageInfo } from './services';

const emptyStyle: React.CSSProperties= {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh'
};

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
      const { assets, content } = schema || {};
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
      });
    } catch(e) {
      console.log(e)
      Message.error(`获取数据失败`);
    }
  }

  const { schema, components, i18n = {}, projectDataSource = {} } = data as any;

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

  if (isEmpty(schema)) return <div style={emptyStyle}>当前页面模板为空</div>;

  function customizer(objValue: [], srcValue: []) {
    if (isArray(objValue)) {
      return objValue.concat(srcValue || []);
    }
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={{
          ...schema,
          dataSource: mergeWith(schema.dataSource, projectDataSource, customizer),
        }}
        components={components}
        // locale={currentLocale}
        messages={i18n}
        appHelper={appHelper}
      />
    </div>
  );
};

ReactDOM.render(<Preview />, document.getElementById('ice-container'));
