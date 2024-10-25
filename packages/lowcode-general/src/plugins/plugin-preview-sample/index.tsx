import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button } from '@alifd/next';
import path from 'path-browserify';
// import { saveSchema } from '../../services/mockService';
import { savePage } from '../../services';
import { PAGE_SIG_ID } from 'common';

// 保存功能示例
const PreviewSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, config } = ctx;
      const urlParams = new URLSearchParams(location.search.slice(1));
      const pageId = urlParams.get(PAGE_SIG_ID);
      // 没有 id 隐藏按钮
      if (!pageId) return;
      const doPreview = async () => {
        // const scenarioName = config.get('scenarioName');
        await savePage(pageId);
        setTimeout(() => {
          const search = location.search;
          const newPath = path.join(location.pathname, './preview.html')
          window.open(`${newPath}${search}`);
        }, 500);
      };
      skeleton.add({
        name: 'previewSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button type="primary" onClick={() => doPreview()}>
            预览
          </Button>
        ),
      });
    },
  };
};
PreviewSamplePlugin.pluginName = 'PreviewSamplePlugin';
PreviewSamplePlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default PreviewSamplePlugin;
