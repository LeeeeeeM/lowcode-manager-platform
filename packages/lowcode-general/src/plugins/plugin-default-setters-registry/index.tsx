import { IPublicModelPluginContext } from '@alilc/lowcode-types';
// @ts-ignore
import AliLowCodeEngineExt from '@alilc/lowcode-engine-ext';
import VariableBindDialog from './plugin-variable-bind-dialog';

// 设置内置 setter 和事件绑定、插件绑定面板
const DefaultSettersRegistryPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { setterMap, pluginMap } = AliLowCodeEngineExt;
      const { setters, skeleton } = ctx;
      // 注册 setterMap
      setters.registerSetter(setterMap);
      // 注册插件
      // 注册事件绑定面板
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: pluginMap.EventBindDialog,
        name: 'eventBindDialog',
        props: {},
      });

      // 注册变量绑定面板
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: VariableBindDialog,
        name: 'variableBindDialog',
        props: {},
      });
    },
  };
}
DefaultSettersRegistryPlugin.pluginName = 'DefaultSettersRegistryPlugin';
export default DefaultSettersRegistryPlugin;