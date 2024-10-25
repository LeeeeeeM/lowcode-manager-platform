import { IPublicModelPluginContext } from '@alilc/lowcode-types';
// import { material, project } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
// import { saveSchema } from '../../services/mockService';
import { savePage, resetSchema } from '../../services';
import { PAGE_SIG_ID } from 'common';

// 保存功能示例
const SaveSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config } = ctx;
      // const scenarioName = config.get('scenarioName');
      const urlParams = new URLSearchParams(location.search.slice(1));
      const pageId = urlParams.get(PAGE_SIG_ID);
      const save = () => {
        // saveSchema(scenarioName);
        // console.log(ctx);
        savePage(pageId);
        // @TODO 查找当前组件树中 input 组件等，获取其 ref 、 label、componentName
      };

      skeleton.add({
        name: 'resetSchema',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: <Button onClick={() => resetSchema()}>重置页面</Button>,
      });

      if (!pageId) return;

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: <Button onClick={() => save()}>保存</Button>,
      });
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        savePage(pageId);
      });
    },
  };
};
SaveSamplePlugin.pluginName = 'SaveSamplePlugin';
SaveSamplePlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default SaveSamplePlugin;
