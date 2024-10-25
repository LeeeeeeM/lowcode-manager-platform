import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading, Message } from '@alifd/next';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import { buildComponents, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import appHelper from './appHelper';

const Preview = () => {
  const [data, setData] = useState({});

  async function init() {
    const componentsMap: any = {};
    const libraryMap = {};

    try {
      const projectSchema = (window as any).__projectSchema__;
      const packages = (window as any).__projectPackages__;
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
    } catch {
      Message.error(`获取数据失败`);
    }
  }

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
