import { IPublicModelPluginContext, IPublicEnumTransformStage } from '@alilc/lowcode-types';
import { material, project } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import {
  saveSchema,
  resetSchema,
} from '../../services/mockService';

// 保存功能示例
const SaveSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config } = ctx;
      const scenarioName = config.get('scenarioName');

      const save = (scenarioName: string) => {
        saveSchema(scenarioName);
        console.log(ctx);
        console.log(project.exportSchema(IPublicEnumTransformStage.Save));
        // @TODO 查找当前组件树中 input 组件等，获取其 ref 、 label、componentName
      }

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => save(scenarioName)}>
            保存到本地
          </Button>
        ),
      });
      skeleton.add({
        name: 'resetSchema',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => resetSchema(scenarioName)}>
            重置页面
          </Button>
        ),
      });
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        saveSchema(scenarioName);
      });
    },
  };
}
SaveSamplePlugin.pluginName = 'SaveSamplePlugin';
SaveSamplePlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default SaveSamplePlugin;