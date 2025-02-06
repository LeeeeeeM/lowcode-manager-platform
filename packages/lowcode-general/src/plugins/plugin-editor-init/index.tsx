import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import { getPageSchema } from '../../services';
// import assets from '../../services/assets.json';
import assets from '../../services/assets.js';
import { PAGE_SIG_ID } from 'common';
// import { getProjectSchema } from '../../services/mockService';
const EditorInitPlugin = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    async init() {
      const { material, project, config } = ctx;
      const scenarioName = options['scenarioName'];
      const scenarioDisplayName = options['displayName'] || scenarioName;
      const scenarioInfo = options['info'] || {};
      // 保存在 config 中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName);
      config.set('scenarioDisplayName', scenarioDisplayName);
      config.set('scenarioInfo', scenarioInfo);
      const urlParams = new URLSearchParams(location.search.slice(1));
      const pageId = urlParams.get(PAGE_SIG_ID);
      const schema = await getPageSchema(pageId, config);
      // 设置物料描述
      await material.setAssets(await injectAssets(assets));
      // await material.setAssets(assets);
      // const schema = await getPageSchema(pageId);
      // const schema = await getProjectSchema(scenarioName);
      // console.log(schema)
      // 加载 schema
      project.importSchema(schema as any);
    },
  };
}
EditorInitPlugin.pluginName = 'EditorInitPlugin';
EditorInitPlugin.meta = {
  preferenceDeclaration: {
    title: '保存插件配置',
    properties: [
      {
        key: 'scenarioName',
        type: 'string',
        description: '用于localstorage存储key',
      },
      {
        key: 'displayName',
        type: 'string',
        description: '用于显示的场景名',
      },
      {
        key: 'info',
        type: 'object',
        description: '用于扩展信息',
      }
    ],
  },
};
export default EditorInitPlugin;