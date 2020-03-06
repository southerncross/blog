---
title: 将blog迁移至腾讯云serverless
date: 2020-03-01 23:17
---

# 成本分析

serverless的一大优点是按需使用按需付费。以腾讯云的serverless云函数为例，计费来自三个部分：调用次数、运行时间、外网流量。具体细节见[这里](https://cloud.tencent.com/document/product/583/12284)

而为了方便开发者，serverless供应商一般都会提供一些免费额度。还是以腾讯云的serverless为例，每月有100万次的免费调用次数，40万GBs的运行时间，至于外网流量嘛，原来似乎也是有免费额度的，目前是没有了，国内的价格大概是0.8元/GB。

粗略统计了一下目前这个博客的情况，每次打开一个博客页面

1. 没有复杂计算，运行时间消耗暂且忽略不计，资源消耗将主要集中在请求次数和外网流量上
2. 平均一次加载会有5个请求，总流量大概是100KB，在有浏览器缓存的情况下，这个可以认为是UV资源损耗

在免费请求额度100万的情况下，假如免费的请求次数全部用光，差不多是`100万 / 5 = 20万`UV，这20万UV一共将产生`20万 * 100KB = 20GB`外网流量，也就是`20 * 0.8 = 16`块人民币，总之还是蛮划算的。

理论上不论选择腾讯云还是阿里云还是华为云，大致思路都是一样的。这里选择腾讯云主要是因为自己的域名恰好是在腾讯云上购买的，放在一起省事儿。PS：以下内容如无意外，“云函数”都是指“腾讯云函数”。

经过差不多一个周末的折腾，这事儿总算搞完了，说实话，坑还是蛮多的，各位准备尝试的朋友要做好心里准备。如果遇到解决不了的问题，多用工单，腾讯云的工单响应都非常及时，如果你工单回复多了甚至会有~~性感荷官在线发牌~~技术小哥亲自电话答疑，这里要赞一个。

# 准备工作

## 安装部署工具

首先安装腾讯云函数的部署命令工具`pip install scf`，这一步参考官方文档即可，点击[这里](https://cloud.tencent.com/document/product/583/37510)。

> 腾讯云函数，serverless cloud function，简称scf。

云函数的创建和部署有如下几种方式：

1. 通过腾讯云Web控制台
2. 通过部署CLI工具
3. 通过VSCode插件

这几种方式最终效果是一样的，主要是在操作流程、模板代码等细节上有不一样的地方。目前暂不推荐方式3，因为VSCode插件功能不全，比较局限。如果你之前完全没有折腾过云函数，我倒是建议方式1、2、3都操作一遍，对理解云函数的开发、部署还是很有帮助的。

这里推荐的开发方式是：
1. 创建云函数使用Web控制台，因为用户体验好
2. 部署使用CLI工具，因为可以集成进脚本自动化
3. 调试使用Web控制台，因为控制台中改代码随改随生效，比较方便

你可以将方式1类比成在github上创建代码仓库，方式2类比成在cli环境使用git命令。

## 注册云函数，关联API网关触发器

直接去Web控制台创建即可，创建云函数是免费的。具体的操作步骤直接看官方文档即可，点击[这里](https://cloud.tencent.com/document/product/583/37509)。

推荐使用创建模板云函数，因为这样里面会带有一些代码，方便你理解。官方文档的例子是用python环境创建了一个hello world空模板，如果你用node环境，不建议使用helloworld，因为helloworld的配置文件是JSON，而官方文档里暂时没有对JSON格式的说明。node环境建议使用`API网关返回自定义HTML页面`这个模板。

文档中还有一步是关联API网关触发器，这里可以先不做，等后面我们会再讲。这一步的效果，简单来说就是让云函数连上网（内网或外网），只有这样才可以被HTTP请求触发。除了API网关触发外，还可以配置成定时触发、消息队列触发、对象存储触发（COS）等。

我们要实现的效果是这样：

![serverless blog arch](./serverless_arch.png)

需要注意，API网关触发器是基于API网关的一个服务。而API网关其实是腾讯云的一个独立业务，是独立收费的。

在创建云函数的时候，腾讯云会给你默认创建一个API网关（用来做API网关触发器），创建是免费的，每月的调用次数是无限的，但流量是收费的，这也是serverless托管博客方案中唯一收费的地方。好在流量还比较便宜，0.8/GB。

这里建议你准备一个域名，因为云函数提供的默认API网关地址是这样的`https://service-fl2iq30f-1310413208.ap-beijing.apigateway.myqcloud.com/blablabla`，太长了，显然不能做博客地址。API网关绑定域名的配置不在云函数服务，在API网关服务里，别搞错了。

## 将云函数代码“clone”到本地

前面通过Web控制台创建的云函数，只能在Web控制台处理，接下来你需要把云函数的代码拉到本地，并同步起来。就好像git clone一个仓库到本地一样。

怎么操作呢？很简单，下载之 :D

![download source code](./download_source.png)

刚才使用Web控制台从模板中创建的云函数里有一个叫template.yaml的配置文件，这个就是云函数的配置文件了，它非常重要。其实配置文件的名字不一定非是这个名字，只要在执行scf时指定好就可以。

默认的配置文件长这样：

```yaml
Resources:
  default:
    Type: TencentCloud::Serverless::Namespace
    API_GW_Html_Demo:
      Type: TencentCloud::Serverless::Function
      Properties:
        CodeUri: ./
        Description: 本示例主要演示如何配置 API 网关触发器返回自定义的html页面
        Environment:
          Variables:
        Handler: index.main_handler
        MemorySize: 128
        Runtime: Nodejs8.9
        Timeout: 3
      Events:
        SCF_API_SERVICE: # api gateway service name
          Type: APIGW # trigger type
          Properties:
              StageName: release
              HttpMethod: ANY
              IntegratedResponse: true
```

这里比较关键的几个配置是：

- API_GW_Html_Demo：这其实是云函数的名字，是可以自己修改的
- CodeUri：这个相当于是base路径，后续所有涉及到路径的配置，都会以这个地址作为base路径，默认是`./`。
- Handler：这个是个云函数的入口方法，默认值是`index.main_handler`，表示index.js文件中的main_handler方法是main方法，当云函数被调用时，这个方法将会被触发。
- SCF_API_SERVICE： 这是API网关触发器的配置，因为我们是在Web控制台关联的触发器，所以这里其实用不到这个配置

不重要的配置其实可以去掉，因为反正都是默认值，留着碍眼，比如我换成了这样：

```yaml
Globals:
  Function:
    Timeout: 10

Resources:
  default:
    Type: TencentCloud::Serverless::Namespace
    blog:
      Type: TencentCloud::Serverless::Function
      Properties:
        CodeUri: ./
        Type: Event
        Description: Lishunyang's blog
        Role: QCS_SCFExcuteRole
        Handler: serverless.main
        Runtime: Nodejs8.9
        Timeout: 3
```

## 跑通部署流程

现在运行scf部署命令，测试是否可以成功部署

```sh
# -f 表示强制覆盖，相当于git push --force
# -t 表示自定义配置文件名
scf deploy -f -t template.yaml
```

如果没有任何报错，说明部署流程已经跑通了。

注意，云函数对部署的资源文件体积比较敏感，超过一定限制（好像是2MB？）就强制你使用腾讯的对象存储服务（COS），说是提升部署体验，实际上是捆绑消费。而scf会把codeUri下所有文件都一起上传上去，如果这里面有个node_modules，那基本上都会超过体积限制。解决办法有两个：

1. 把用不着的东西都删掉
2. 使用ignore配置

方法2不是很推荐，配置不是很友好，非常丑陋，推进用方案1，比如在部署的时候，新建一个干净的目录，把要部署的东西放进去，然后在那里面单独部署。

## 关联API网关触发器

如果之前你没有关联API网关触发器，那此时创建一个也不迟。

![create api gateway](./create_api_gateway.png)

注意其中红框的部分，尤其是最后一个“启用集成响应”，一定要勾上，否则云函数的返回值只能被当作json解析，博客肯定是不行的。这个地方之前坑了我很久。

创建触发器成功后，就可以访问API触发器地址看看是否可以正常触发云函数了。

![test api gateway](./test_api_gateway.png)

如果到此为止，一切正常，那么恭喜你，准备工作终于做完了，接下来就是将博客迁移到云函数上了。

如果有报错，可以去Web控制台看运行日志，日志有一些延迟，大概1~3分钟的样子。

> 如果有任何问题，答应我，去看运行日志好吗

# 迁移博客

## 编写云函数

这个博客是用vuepress写的，发布的时候会build成静态页面，其他例如hexo也是一样，我们要做的事情其实就是托管静态资源。这就是云函数要干的事。

需要注意，云函数被唤起后，只负责响应一次请求，然后就会被销毁，所以我们这个云函数要能够处理html、javascript、CSS、image等响应，并返回正确的结果。

云函数不像node开发http server时有request和response，云函数的入参是一个event，告诉你HTTP请求的一些基本信息，返回值是一个json对象，用来表示response内容。这一点与传统的http server开发不太一样。

这是云函数返回值的结构：

```js
{
  isBase64Encoded: boolean, // 是否是base64编码
  headers: object, // response header
  body: string, // response body
}
```

`headers`和`body`很好理解，分别对应HTTP的header和body，但是这个`isBase64Encoded`是个啥呢？为啥要有这个东西呢？这是因为云函数的body不能是二进制数据，如果你想传输二进制数据就必须使用base64编码，否则就会报错。所以对于图片、音频这种二进制数据，body必须用base64编码，并且将`isBase64Encoded`设置为true。

> HTTP协议是支持二进制数据直传的，所以base64这个限制是云函数引入的，至于为什么要这么做就不得而知了。

其实云函数的伪代码逻辑差不多就是这样：

```
function main(event) {
  if (event.url对应的静态资源文件存在) {
    读静态资源文件内容;
    确定返回体header、是否base64编码、构造body;
    返回json;
  } else {
    读404页面html文件;
    确定返回体header、是否base64编码、构造body;
    返回json;
  }
}
```

在写代码的时候要注意，目前云函数的部署过程还不支持动态安装npm依赖（这个功能还在内测中），解决方法有两个：

1. 不用第三方依赖，完全自己写
2. 是把依赖包放在代码目录里

方案2容易让代码的体积失控，还记得前面说过云函数的部署对体积比较敏感吗，因此，我选择不用第三方package自己撸。

最终的代码实现，可以直接看这个博客的github源代码，见[这里](https://github.com/southerncross/blog/blob/master/serverless.js)

## 编写部署脚本

部署脚本大致流程为

1. build生成静态文件，例如输出到dist目录
2. 把云函数的配置文件放到dist目录下
3. 在dist目录下执行scf的部署命令

比如这是我的：

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 将TSC配置文件复制到dist目录下
cp serverless.js docs/.vuepress/dist
cp tencent-serverless.yml docs/.vuepress/dist

# 进入生成的文件夹
cd docs/.vuepress/dist

scf deploy -f -t tencent-serverless.yml

cd -
```

## 大功告成

ok，到这里基本上所有工作都做完了，现在跑一下部署脚本，如果一切正常，你就可以通过API网关访问博客了。记得给API网关绑定一个自定义域名，美滋滋。

# 后记

用serverless托管博客并不是云函数真正的用途，云函数的能力是很强大的，这里有点大材小用。

整个过程折腾下来，遇到了不少坑，其实有一个最主要的坑前面都没提，那就是云函数的测试、debug很麻烦。基本无法在本地测试（scf支持本地测试，但那个测试非常有限），最方便的方式就是去Web控制台打log，然后触发调试。效率低不说，而且腾讯云的API文档不是很详细，没有文档参考的时候只能靠console.log。比如，在做缓存逻辑的时候，If-Modified-Since这个header死活就是比较不对，后来发现是云函数传入的参数里有一些蜜汁字符。再比如，API网关绑定自定义域名的时候，目录环境名称就是配置不对，文档里也没详细说，后来各种尝试竟然给试出来了。。

撒花庆祝

希望这篇博客能帮助到大家 :D
