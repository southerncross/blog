#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 将TSC配置文件复制到dist目录下
cp serverless.js docs/.vuepress/dist
cp tencent-serverless.yml docs/.vuepress/dist

# 进入生成的文件夹
cd docs/.vuepress/dist

scf -f -t tencent-serverless.yml deploy

cd -
