#!/bin/bash

# 检查当前目录下是否存在 build 文件夹
if [ ! -d "build" ]; then
  # 如果不存在 build 文件夹，则打印错误信息并退出脚本
  echo "Error: 'build' directory does not exist in the current directory."
  exit 1
fi

# 检查是否存在 lowcode 文件夹，如果存在，则删除
if [ -d "lowcode" ]; then
  echo "Removing existing 'lowcode' directory..."
  rm -rf "lowcode"
fi

# 创建 lowcode 文件夹
mkdir "lowcode"

# 将 build 文件夹内的所有内容移动到 lowcode 文件夹中
mv build/* lowcode/

mv lowcode/ build

# 检查移动操作是否成功
if [ $? -eq 0 ]; then
  echo "All contents from 'build' have been moved to 'lowcode'."
else
  echo "Error occurred while moving contents from 'build' to 'lowcode'."
fi