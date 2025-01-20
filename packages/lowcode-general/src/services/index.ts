import { Message, Dialog } from '@alifd/next';
import { GetPageDetail, SavePage } from 'services';
import { getUserName } from 'common';
// import { filterPackages } from '@alilc/lowcode-plugin-inject';
import { material, project } from '@alilc/lowcode-engine';
import { filterPackages } from '../utils';
import { IPublicTypeProjectSchema, IPublicEnumTransformStage } from '@alilc/lowcode-types';
import DefaultCustomPageSchema from './defaultCustomPageSchema';
import DefaultFormPageSchema from './defaultFormPageSchema';
// import DefaultI18nSchema from './defaultI18nSchema.json';

export const savePage = async (pageId: string | null): Promise<void> => {
  try {
    const rawSchema = project.exportSchema(IPublicEnumTransformStage.Save);
    const schema = JSON.stringify(rawSchema);
    const packages = await filterPackages(material.getAssets()!.packages, rawSchema);
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
}> => {
  const pageDetail = await GetPageDetail({
    pageId: Number(pageId),
  });

  const { page } = pageDetail || {};
  const { content = '{}', assets = '{}' } = page || {};
  return {
    assets,
    content,
  };
};

export const getPageSchema = async (pageId: string | null): Promise<IPublicTypeProjectSchema> => {
  // 默认的自定义页面schema，不是 form 表单类型
  let pageSchema = DefaultCustomPageSchema;

  console.log(pageSchema)

  if (pageId) {
    try {
      const pageDetail = await GetPageDetail({
        pageId: Number(pageId),
      });
  
      const { page } = pageDetail || {};
      const { content } = page || {};
      const allContent = JSON.parse(content);
      const schema = allContent?.componentsTree?.[0];
      // console.log(schema);
      if (schema) {
        return allContent;
      }
      // 表单类型模板 @todo
      if (true) {
        pageSchema = DefaultFormPageSchema
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
