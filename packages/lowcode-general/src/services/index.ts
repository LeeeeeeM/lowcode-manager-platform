import { Message, Dialog } from '@alifd/next';
import { GetPageDetail, SavePage } from 'services';
import { getUserName } from 'common';
import { PAGE_TYPE } from 'services/constants';
// import { filterPackages } from '@alilc/lowcode-plugin-inject';
import { material, project, config } from '@alilc/lowcode-engine';
import { filterPackages } from '../utils';
import { CONFIG_PAGE_TYPE_KEY } from '../constants';
import { IPublicTypeProjectSchema, IPublicEnumTransformStage, IPublicModelEngineConfig } from '@alilc/lowcode-types';
import DefaultCustomPageSchema from './defaultCustomPageSchema';
import DefaultFormPageSchema, { ButtonGroup } from './defaultFormPageSchema';
import { getFormExtraAssets } from './assets';
// import DefaultI18nSchema from './defaultI18nSchema.json';

export const savePage = async (pageId: string | null): Promise<void> => {
  try {
    const pageType = config.get(CONFIG_PAGE_TYPE_KEY);

    // 表单中添加 ButtonGroup 的节点信息
    if (pageType === PAGE_TYPE.FORM) {
      project.currentDocument?.createNode(ButtonGroup);
    }
    
    const rawSchema = project.exportSchema(IPublicEnumTransformStage.Save);
    const schema = JSON.stringify(rawSchema);
    const packages = await filterPackages(material.getAssets()!.packages, rawSchema);

    // 表单添加额外组件
    if (pageType === PAGE_TYPE.FORM) {
      const formExtraAssets = getFormExtraAssets();
      formExtraAssets.forEach((item) => {
        if (!packages.some((pkg) => pkg.package === item.package)) {
          packages.push(item);
        }
      });
    }

    const assets = JSON.stringify(packages);
    await SavePage({
      pageId: Number(pageId),
      content: schema,
      assets,
      userName: getUserName(),
    });
    Message.success(`保存成功`);
  } catch (e) {
    Message.error(`保存失败${e}`);
  }
};

export const getAllPageInfo = async (
  pageId: string | null,
): Promise<{
  assets: string;
  content: string;
  pageType: PAGE_TYPE;
}> => {
  const pageDetail = await GetPageDetail({
    pageId: Number(pageId),
  });
  const { page } = pageDetail || {};
  const { content = '{}', assets = '{}', pageType = PAGE_TYPE.CUSTOM } = page || {};

  return {
    assets,
    content,
    pageType
  };
};

export const getPageSchema = async (pageId: string | null, config: IPublicModelEngineConfig): Promise<IPublicTypeProjectSchema> => {
  // 默认的自定义页面schema，不是 form 表单类型
  let pageSchema = DefaultCustomPageSchema;
  config.set(CONFIG_PAGE_TYPE_KEY, PAGE_TYPE.CUSTOM);

  if (pageId) {
    try {
      const pageDetail = await GetPageDetail({
        pageId: Number(pageId),
      });

      const { page } = pageDetail || {};
      const { content, pageType } = page || {};
      const allContent = JSON.parse(content);
      const schema = allContent?.componentsTree?.[0];

      // 表单类型模板
      if (pageType === PAGE_TYPE.FORM) {
        config.set(CONFIG_PAGE_TYPE_KEY, pageType);
        pageSchema = DefaultFormPageSchema;
      }

      // 如果已经存在模板，直接返回
      if (schema) {
        return allContent;
      }
    } catch {
      Message.warning(`获取模版失败`);
    }
  }
  // console.log(pageSchema)

  return generateProjectSchema(pageSchema, {});
};

const generateProjectSchema = (pageSchema: any, i18nSchema: any): IPublicTypeProjectSchema => {
  return {
    componentsTree: [pageSchema],
    componentsMap: material.componentsMap as any,
    version: '1.0.0',
    i18n: i18nSchema,
  };
};

export const resetSchema = async () => {
  try {
    await new Promise<void>((resolve, reject) => {
      Dialog.confirm({
        content: '确定要重置吗？您所有的修改都将消失！',
        onOk: () => {
          resolve();
        },
        onCancel: () => {
          reject();
        },
      });
    });
  } catch (err) {
    return;
  }
  const defaultSchema = generateProjectSchema(DefaultCustomPageSchema, {});

  project.importSchema(defaultSchema as any);
  project.simulatorHost?.rerender();

  Message.success('成功重置页面');
};
