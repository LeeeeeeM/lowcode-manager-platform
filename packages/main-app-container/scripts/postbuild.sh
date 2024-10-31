#!/bin/bash

# 检查当前目录下是否存在 build 文件夹
if [ ! -d "build" ]; then
  # 如果不存在 build 文件夹，则打印错误信息并退出脚本
  echo "Error: 'build' directory does not exist in the current directory."
  exit 1
fi

# 将 build 文件夹内的所有内容移动到 根目录 dist 文件夹中
cd build
mv portal ../../../build

echo "All contents from 'build' have been moved to 'root/build'."