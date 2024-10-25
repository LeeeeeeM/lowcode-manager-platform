# 问题记录

### 由于原始demo 中没有引入 https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/meta.js 这个包，所以有部分组件没有被加载的话，拖入低代码组件时 控制台会出现报错
所以这里的最佳方案是，如果在入口文件里注册了 await plugins.register(lowcodePlugin); 低代码插件的话，需要动态引入 assets 资源 调用 loadIncrementalAssets 方法

