#!/bin/bash

# 检查是否存在 lowcode 文件夹，如果存在，则删除
if [ -d "dist" ]; then
  echo "Removing existing 'dist' directory..."
  rm -rf "dist"
fi

# 创建 lowcode 文件夹
mkdir "dist"

echo "Dir 'dist' have been mkdir."