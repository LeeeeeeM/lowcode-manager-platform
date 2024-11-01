#!/bin/bash

# 检查是否存在 lowcode 文件夹，如果存在，则删除
if [ -d "build" ]; then
  echo "Removing existing 'build' directory..."
  rm -rf "build"
fi

# 创建 lowcode 文件夹
mkdir "build"

echo "Dir 'build' have been mkdir."

# 移植公共组件
cp -r public build/resources