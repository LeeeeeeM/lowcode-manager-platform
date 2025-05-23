import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading, Message } from '@alifd/next';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { buildComponents, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import appHelper from './appHelper';
import './landing.less';

const Landing = () => {
  const [data, setData] = useState({});

  const projectSchema = (window as any).__projectSchema__;
  const packages = (window as any).__projectPackages__;

  async function init() {
    const componentsMap: any = {};
    const libraryMap = {};

    try {
      const {
        componentsMap: componentsMapArray,
        componentsTree,
        i18n,
        dataSource: projectDataSource,
      } = projectSchema;
      const pageSchema = componentsTree[0];
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

      // TODO asset may cause pollution
      const assetLoader = new AssetLoader();
      // @ts-ignore
      await assetLoader.load(libraryAsset);
      // @ts-ignore
      const components = buildComponents(libraryMap, componentsMap);

      setData({
        schema: pageSchema,
        components,
        i18n,
        projectDataSource,
      });
    } catch (e) {
      console.log(e);
      Message.error(`获取数据失败`);
    }
  }

  if (isEmpty(projectSchema)) return <div id="lce-empty-page">当前页面模板为空</div>;

  const { schema, components, i18n = {}, projectDataSource = {} } = data as any;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }

  function customizer(objValue: [], srcValue: []) {
    if (isArray(objValue)) {
      return objValue.concat(srcValue || []);
    }
  }

  return (
    <ReactRenderer
      schema={{
        ...schema,
        dataSource: mergeWith(schema.dataSource, projectDataSource, customizer),
      }}
      components={components}
      // locale={currentLocale}
      messages={i18n}
      appHelper={appHelper}
    />
  );
};

ReactDOM.render(<Landing />, document.getElementById('ice-container'));
