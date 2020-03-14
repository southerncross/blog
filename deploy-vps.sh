#!/usr/bin/env sh

hash=`git rev-parse --short HEAD`
blog_name=blog_$hash.zip
user=lishunyang
host=dev.lishunyang.com

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

cd docs/.vuepress/

# 打包压缩
zip -rq $blog_name dist

scp $blog_name $user@$host:~/

ssh $user@$host "nohup ./deploy_blog.sh $blog_name"

cd -

rm $blog_name
