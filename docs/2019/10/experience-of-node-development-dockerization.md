---
title: Node开发环境的docker体验
date: 2019-10-05 23:26:35
tags: docker, node, javascript, development
---

长久以来一直有两个问题困扰着我：

1. 项目大了，团队成员普遍抱怨搭建开发环境比较困难。能否利用docker简化开发环境搭建？
2. 我本人一直是windows+linux虚拟机的开发方式，但虚拟机比较吃磁盘和内存资源，对笔记本来说不是很友好。能否做到windows+docker的开发方式呢？

如果能找到一种容器化的开发方式，那这两个问题都可以解决了？于是趁着十一在家研究了一下。

# 想要实现什么效果？

我希望完全用docker托管开发环境，宿主系统上不安装任何开发环境依赖。假如我们要做node开发，那宿主机上不允许安装node，干干净净。

# 什么是容器

先说一个题外话。容器（container）是什么意思？我们都知道container是image的运行实例，那么为什么不叫instance呢？这样不是更容易理解吗？而说到容器，总是让我想到各种游戏里的概念，什么灵魂容器啊之类的。

几乎所有的应用程序在运行时都或多或少需要依赖一些外部的东西，上层依赖比如像mysql、redis、nginx，底层的比如文件系统 、网络协议栈、设备驱动。所以说应用程序在运行时并不是一个孤立的个体，而是处在一个合适依赖环境中，就好比植物生长需要土壤、阳光、水、空气一样。而容器技术就像是一个盒子，它将应用程序包裹在其中，在内部提供了所需的各种环境。此外这个盒子还起到了隔离的作用，不同盒子之间不受影响，盒子本身是放在火车上还是飞机上运输都无所谓。

综上，虽然container是一个实例，但它强调的并不是静态和动态的特性，而是强调环境、隔离这些概念，因此叫做container是最合适的。英文里containerization的意思是“集装箱化”，确实，容器的“容生巅峰”可不就是集装箱了。

对应到docker，build image的过程就好像是设计集装箱模板，敲定型号、大小、厚度、适合装什么东西之类。run container的过程就好像是根据模板生产一个一个的集装箱并把东西装进去。

# build image

image做的事情越多，container做的事情就越少，反之亦然。比如你可以让image什么都不做，等到启动container后再在里面安装依赖，跑程序，就像虚拟机一样。你也可以在build image阶段把各种依赖环境都烧录到image里做好，等启动container的时候只需要跑程序就可以了。两种方案哪种更好？自然是后者更好了，因为build image只需要做一次，而启动container可是会做很多次的，而且container启动算是运行时，运行时做的东西越多，出问题的概率就越大。业界推荐的做法是一个container只干一件事情，也就是只运行一条命令，我们要向这个标准看齐。

不过对于应开发环境，要真要让image做到所有事情未必是一个好的选择。

## 代码

首先是代码问题，对于开发环境，代码是不断变化的，当然不适合放在image里，不然开发时每次想看看效果都要临时build一个image，要知道build image虽然有缓存，但也是要花时间的。因此，代码自然是放在volume里了，而挂载volume是运行时的操作，单纯启动container的时候需要加-v或--mount参数，比较麻烦，好在有docker-compose.yml写起来还算是方便。

## node_modules

然后是环境依赖问题，假设我们先不考虑mysql、redis这种的依赖，就只考虑node_modules。这是一个相当纠结的问题，因为node_modules变化得不如代码频繁，所以你既可以把node_modules放在image里也可以放在volumes里。

假如你选择将node_modules放在image里，你需要在Dockerfile里`RUN npm install`，好处是每次创建container的时候自带node_modules可以直接使用，当然坏处就是如果package.json有变化，就需要重新build image。

对于开发环境来说，这个好处可能用不上，因为开发环境我们通常就启动一个container，不会创建多个container，而坏处嘛，这一点就仁者见仁了，个人认为每次npm install后都要接一个docker build有点蠢。

还有一个需要注意的地方是，node_modules是跟项目代码是放在同级目录下的，这会对volume的设计带来一些困扰。[这篇文章](https://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html)的“the node_modules volume trick”提到了这个问题并给出了解决方案。（不过本人没有验证）

假如你选择将node_modules放在image外面，那npm install过程就铁定不可能在build image阶段做了，因为volume的挂载是在contianer阶段才发生的事情，也就是只能等container启动了以后再npm install。等会，那这样岂不是违反了docker的约定吗（一个container只做一个事情），emmm是的，不过还有一种“自欺欺人”的解决方法是启动container时传不同参数决定做什么事情，这样仍然一次只做一件事情。比如这样：

```sh
# 安装依赖
docker run -v .:/app <image> npm install
# 运行app
docker run -v .:/app <image> npm run dev
```

说是自欺欺人是因为从本质上看这跟你启动一个container然后attach上去手动执行npm install没区别，纯粹是为了符合约定。

对了，即使是把node_modules放在image外面，你也不能用host OS安装node_modules，因为node_modules里可能包含与操作系统有关的二进制包，host OS和conatiner OS可能无法兼容。

## 当你的node_modules带有了公开git仓库依赖

如果是这样，你需要在npm install之前先装好git，`atp-get update && apt-get install git`，而且考虑到国内的网络环境，最好提前配置一下apt源。比如：

```Dockerfile
RUN sed -i "s@http://deb.debian.org@http://mirrors.aliyun.com@g" /etc/apt/sources.list && \
    rm -Rf /var/lib/apt/lists/* && \
    apt-get update && \
    apt-get install git
```

## 当你的node_modules带有了私有git仓库依赖

如果很不幸是这样，为了在npm install的时候能够顺利安装那些私有仓库依赖，你只能使用ssh而不是https的方式进行安装，且要在install前配置好ssh_key。需要注意的是ssh_key是敏感信息，不能写在Dockerfile里（可以用ENV或ARG），也不应该在npm install完了残留在image里。
假如你是将node_modules放在image里的，那比较简单，可以用multi-stage build的方式得到仅包含node_modules的干净image。
假如你是将node_modules放在外面，那没办法了，不能构造一个带有ssh_key的image（有安全问题），只能把配置ssh_key这个操作放到运行时也就是启动container后做，好吧更脏了。

# run container

根据上面构造image的方式不同，启动container的时候需要做的事情也不同。理想情况下，我们应该潇洒地`docke run my-app`然后看戏就好，但因为有上面提到的种种问题，启动container的时候可能需要带上arg、cmd、volume等各种参数。尽量使用docker-compose把各种参数写在配置里，但有些动态参数貌似就不行了（比如动态取ssh_key）。

最后，别忘了加上--rm参数，不然container结束了仍然后残留。

# 其他环境依赖

假如依赖了myslq、redis、elasticsearch等第三方依赖，其实是比较好解决的，可以用docker-compose配置多个service即可，就像这样：

```
version: "3"
services:
  app:
    ...
  mysql:
    ...
  redis:
    ...
```

需要注意的是他们产生的持久化数据需要放在volume里。

# 这样做值得吗？

容器化看着很美好，但至少在Docker这种image+container的方式下，要想利用或者说发挥它的优势，至少需要满足两个条件：
1. build image可以很慢，但build过程必须是个低频的过程，这样build开销可以被平摊到忽略不计的程度。
2. build image可以很复杂，但启动container必须要尽量简单，这样对容器的复制、扩容、迁移等运维就更加方便。

在回过头来看看开发环境引入docker，如果node_modules放在image里，则不满足条件1，如果node_modules放在image外面，则不满足条件2。至少对于node开发而言，开发环境docker化，也就是一开始我的那个目标“完全用docker托管开发环境”是不合适的。如果非要这么做，node_modules放在外面是一个相对更好的方案，因为放弃条件2的收益对开发环境影响不会很大。

反倒是那些稳定的第三方服务，比如mysql、redis等，使用docker托管是非常合适的。因为他们的image不频繁变化，且image可以做足够多的事情让启动container变得非常简单。那还有什么场景符合这个标准呢？没错，那就是生产环境，在生产环境全面引入docker托管非常合适。

那么开发环境就没有引入docker的意义了吗？当然不。回顾一下文章开头的设想：

> 我希望完全用docker托管开发环境，宿主系统上不安装任何开发环境依赖。假如我们要做node开发，那宿主机上不允许安装node。

假如换一下，将目标调整为：

> 我希望用docker托管开发环境中的第三方依赖，然后宿主环境只需要处理好代码直接相关的环境即可。

如果是这样，那我们就可以将源代码、node_modules通通放在宿主环境，将mysql、redis、elasticsearch等大型第三方依赖放在docker中托管。这样虽然无法做到完全docker化，但还是将大量代码无关的依赖分离了出去，仍然是非常有意义的，要知道在本地安装mysql也是一个麻烦事情，因为要处理各种配置、建表之类的工作。

在开发环境中，docker+宿主，取长补短，也许这才是Docker最正确的用法。
