---
title: WSL开发环境的坑（不定期更新）
date: 2021-02-15 12:47
tags: WSL windows development
---

记录一些使用WSL做开发环境遇到的问题和解决办法，不定期更新。注意，这里的WSL都是指WSL2。

## WSL与VPN的问题

1. 域名解析不正常

可以ping一下或者dig一下内网域名，看下能否正常解析ip，如果无法正常解析则属于此类。

github上有一个相关的issue：[点击这里](https://github.com/microsoft/WSL/issues/5068)，原因似乎是宿主机连接VPN后，WSL没有把VPN的DNS resolver加上。

倒是有一个非常简单粗暴稳定的解决办法，就是先连接VPN，再打开WSL。其他解决办法似乎都不够稳定。

2. http正常访问，https访问不了

比如执行 `curl http://www.mokahr.com` 可以得到正常响应，但是 `curl https://www.mokahr.com` 不行，那就属于此类。

github上也有一个相关issue，[点击这里](https://github.com/microsoft/WSL/issues/4698)，原因是Path MTU discovery black问题，似乎是说windows和linux的MTU不一致，导致WSL发的包超过了路由的限制，但是路由又没有正确返回错误包，最终请求卡住了。

解决办法是修改WSL的MTU，`sudo ip link set dev eth0 mtu 1400`，这个办法屡试不爽。完整的解释过程在[这里](https://github.com/microsoft/WSL/issues/4698#issuecomment-728967624)

3. 开启VPN后WSL无法翻墙了

这个跟VPN有关，如果你使用的VPN是全局隧道，由于VPN路由表优先级最高，流量都会从VPN走，所以肯定是没法翻墙的。

## WSL如何使用Cypress GUI

Cypress GUI使用了linux原生的GUI，默认情况下WSL无法启动，不过可以参考[这篇博客](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress)解决。
