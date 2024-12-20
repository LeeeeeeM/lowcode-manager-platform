const pkgInCurrentSchema = (componentList: any[], packageName: string): boolean => {
  return componentList.some((item) => item.package === packageName);
};

export const filterPackages = async (packages: any[] = [], schema: any) => {
  let result: any[] = [];
  // 先过滤掉不需要的包
  const loadedPackages = ['moment', 'lodash', '@alifd/next'];
  // 需要预置的包
  const needPreloadPackages = ['@ant-design/icons', 'antd'];
  // 暂时需要整体加载的物料包，后续可能干掉。fusion，fusion-ui, layout
  const tempMaterialPackages = ['@alilc/lowcode-materials', '@alifd/layout', '@alifd/fusion-ui'];

  const componentList = schema.componentsMap;

  packages.forEach((pkg) => {
    if (loadedPackages.includes(pkg.package)) {
      return;
    }
    if (needPreloadPackages.includes(pkg.package)) {
      result.push(pkg);
      return;
    }
    if (
      tempMaterialPackages.includes(pkg.package) &&
      pkgInCurrentSchema(componentList, pkg.package)
    ) {
      result.push(pkg);
      return;
    }
    if (pkgInCurrentSchema(componentList, pkg.package)) {
      result.push(pkg);
    }
  });
  // console.log(packages, schema.componentsMap, result);
  return result;
};
