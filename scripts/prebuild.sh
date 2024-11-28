#!/bin/bash

# 检查是否存在 build 文件夹，如果存在，则删除
if [ -d "build" ]; then
  echo "Removing existing 'build' directory..."
  rm -rf "build"
fi

# 创建 build 文件夹
mkdir "build"

echo "Dir 'build' have been mkdir."

# 移植公共组件
cp -r public build/resources

cd public
# 打包资源库
zip -r resource.zip *

# 移动到 build 中
mv resource.zip ../build