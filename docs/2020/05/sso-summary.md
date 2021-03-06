---
title: 单点登录（SSO）小结
date: 2020-05-23 22:29
---

最近公司两条产品线要做打通，首当其冲是统一登录过程，也就是实现内部自己的单点登录。经过一些讨论和思考，于是就有了这篇文章。

单点登录的最大意义我认为有两点：

1. 统一登录流程。实现用一套用户名密码登录多个系统。
2. 同步登录状态。如果登录任意某个系统，其他系统也都是登录状态，登出任意某个系统，其他系统也都是登出状态。

也就是说，单点登录的方案务必要满足上面两个核心功能。

## 基于cookie、session的用户认证体系

基于cookie、session的认证方式，基本流程就不啰嗦了。唯一需要注意的是cookie的同源策略限制（参见[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)的cookie部分）：

- 不同域cookie不可见，浏览器只能在当前页面所属域下设置cookie
- 但是父域cookie对子域可见（.com，.cn这种根域除外），子域页面也可以设置父域cookie

对了，这里再补充一下CORS跨域时有关cookie的限制（参见[CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)的cookie部分）：

- CORS跨域请求要想携带cookie有诸多限制（比如HTTPS、access-control-allow-origin不能为*等）

## 单系统登录

首先回顾一下单系统是如何登录的。

用户首次访问a.com，由于未登录，跳转至登录页面，输入用户名密码登录后，server端将登录状态持久化存储在session中，同时让前端种上登录cookie，与session对应。

用户再次访问a.com，浏览器携带cookie，后端拿到cookie解密查询session，确认登录状态，放行。

## 多系统登录

所谓多系统是指不同域多系统。例如a.com和b.com，即使他们共享一个后端服务，也算是多系统。

而所谓的多系统登录，就是指不同域系统要共享同一套登录体系。即让用户通过同一套用户名和密码完成a.com和b.com的登录，以提升用户体验。

由于上文所说的cookie的限制，即使用户已经登录过a.com了，当首次访问b.com时，浏览器在请求中无法携带a.com域下的cookie，所以后端是无法利用之前的a.com下的session登录状态的，只能再重新登录一遍。那有没有什么办法能够让用户登录一次就能让a.com和b.com同时可判断出登录状态呢？

## 共享父域的多系统

如果系统是共享父域的，例如a.example.com和b.example.com，问题就好办了。因为子域可以读写父域cookie，所以我们可以把登录cookie种在父域上，比如这里都种在example.com上。那这样当用户在a.example.com登录后，再访问b.example.com时，就可以把根域（example.com）下的cookie带上，共享了登录cookie，实现了多系统同时登录。

看似美滋滋，但这种做法有很多局限性。首先就是必须要求多系统一定是共享父域，有些场景下是无法做到的（比如两个公司合并，原先各自有各自的业务，父域不同）。其次是有些场景下我们反倒不希望多系统登录，如果这么做了，反而变成了强制统一登录。比如测试环境的系统通常都是相同父域的：staging001.example.com，staging002.example.com，staging003.example.com等等，这些测试环境彼此应该是互相隔离的，不应该统一登录，但如果把登录cookie种在了父域下，相互之间的登录状态就串了。

综上，共享父域的做法，实际中比较少见。

## 多系统登录 1.0

对于一般不同域系统（比如a.com和b.com），仅通过cookie是无法做到**共享**登录状态的，那怎么办呢？为了解决这个问题，人们发明了单点登录（SSO）。

思路是非常巧妙的。

首先引入了一个第三方域（比如auth.com）专门用于登录，也就是说把a.com和b.com的登录统一放在auth.com下，登录部分将变成单系统，cookie的跨域问题解决了。

那么怎样把a.com和b.com的登录放在auth.com下呢？核心流程是：

1. 用户首次访问a.com，后端302跳转至auth.com进行登录验证
2. 用户在auth.com输入用户名密码发起登录请求，auth.com认证通过，然后生成一个一次性的票据（token/ticket/code），放在url中，再302跳转回a.com
3. a.com后端从url中取出票据，向auth.com后端发起认证，auth.com认证票据通过，a.com最终确定用户已登录

简单说就是先通过302跳转使登录过程发生在auth.com域，登录完成后再302跳转回原a.com域，通过票据经过后端二次验证实现登录状态的传递。

这个过程是不是看着很熟悉？没错，OAuth2就是这个流程。

这个方案有个缺点，那就是每次请求都要走一遍流程，过程复杂效率低，而且用户体验也不好。

## 多系统登录 2.0

上述1.0版本的缺点的原因在于，登录过程完全迁移到了auth.com，使得a.com和b.com丧失了独立验证登录状态的能力。所以优化的方案就是让a.com和b.com恢复登录认证的能力。怎么做呢？

在1.0版本的最后一步后面再追加一步，登录状态认证成功后，在a.com域下也种下对应的cookie。下次用户在访问a.com的时候，优先检查a.com下的cookie，如果认证成功则直接通过，如果认证不成功再进入1.0版本的过程。这样一来，登录行为还是发生在auth.com，但是a.com和b.com在认证通过后也会各自种下自己的cookie用作后续检查，从而让a.com和b.com也具备登录状态认证的能力。

2.0版本其实已经相当可用了，实际上大部分的SSO系统的核心流程就是这样。但这里还是个缺陷，那就是302跳转引发的问题：对于一些采用hash-route方案的SPA来说，302跳转会丢失url中的hash部分，从而对用户的正常使用产生干扰。另外302跳转至少也会引起白屏，体验也不是很好。能否解决这些问题呢？

> PS：302跳转白屏的问题，如果都是后端直接302，而不是前端手动跳转的话，其实白屏时间非常短，可以忽略不计

> PS：302跳转丢失hash的问题，可以通过在前端对hash部分进行encode和decode解决，但是很不优雅

## 多系统登录 3.0

首先有个问题，为什么要302跳转呢？要回答这个问题，我们先想想如果不用302行不行。我们知道302跳转那一步的作用是将登录过程转移到auth.com域下。

那么，能否在a.com直接向auth.com发起跨域请求进行登录？答案是可以，通过配置是可以让XHR跨域请求携带cookie的，也可以让浏览器在当前页面设置不同域的cookie。这些都是符合CORS规范的，只不过限制条件有点多：

1. access-control-allow-origin不能是*
2. access-control-allow-credential必须是true
3. access-control-allow-methods必须配置好对应方法（因为将会有一次预检请求）

此外还要注意mixed content问题，cookie的same-site问题等等。总之就是，虽然理论上可行，但实际上几乎寸步难行，即使强行搞出来了，兼容性也很差（这里的兼容性指的是系统架构的兼容性）。所以直接CORS跨域登录的方案是不实际的。

如果只是想让request带cookie的话，还有一种选择是使用[beacon API](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)，没有跨域限制。但是beacon API无法处理response，如果只是用来种种cookie还行，登录请求一定是要验证response的，所以这个是不满足需求的。

还有一种hack方式是使用iframe。思路是用iframe取代302跳转，让页面加载一个auth.com域的iframe，登录过程发生在iframe中，通过postMessage将auth.com产生的票据传递给父页面（a.com），再进行后续流程。

这种方式在理论上也是可行的，但是可能导致安全问题，因为iframe有“点击劫持”（Clickjacking）的安全问题。所以OAuth2是禁止使用iframe的。

![](./oauth_clickjacking.png)

所以，到此为止算是解释了为什么要用302跳转。那么到底有什么好办法呢？

方案I：还是采用iframe，但是将交互部分还是放在原来的页面中（容器域），让iframe仅仅负责向auth.com发起登录认证请求，由于iframe不承担用户交互，所以可以避免clickjacking问题。

方案II：仍然还是采用iframe，但是把登录过程反过来：让正常的登录过程发生在a.com，登录成功后拿到一个票据，前端构造auth.com域的iframe，向auth.com做票据校验，以便在auth.com下种下cookie。由于iframe也不承担交互功能，所以也可以避免clickjacking问题。

但这个方案比较奇怪，登录过程仍然是分散在a.com和b.com，只不过多了一个auth.com做状态共享。叫统一登录（SSO）似乎有点“名不正言不顺” 😅

所以综合来看，方案I虽然啰嗦了，但似乎更优一些。

## 登录状态验证以及cookie补种

在单系统中，用户访问a域名，如果发现没有对应的登录cookie（或者session过期），则直接跳转到登录页面进入登录流程即可。

引入SSO以后，用户在a域名下面登录后，会在a域名和passport域名下面种上对应的cookie。因此，假设用户打开b域名，发生了前面单系统的那种“未登录”情况，不应该立即跳转到登录页，而是需要去passport域下进一步确认是否已经“单点登录”了，如果其实已经单点登录过了，那么需要在b域下补种cookie。

好在这个过程不需要任何用户交互参与，而且server端已经有足够的信息，也就是说这个登录状态验证和cookie补种的过程可以做成client端透明的，完全不需要client端参与。怎么做呢？

1. 用户打开b域名
2. b域的server端验证b域的登录状态，发现没有登录，然后302跳转到passport域
3. passport域的server端验证passport域的登录状态，发现已经登录过了，生成一次性code，再次302跳转回b域
4. b域的server端从url中拿到code向passport发起登录认证，认证通过，然后在response里set-cookie补种cookie

于是乎我们神不知鬼不觉地完成了登录状态验证和cookie补种。这其中发生了两次302，但由于完全不需要client参与，所以在前端看来只是“白屏”了一次，如果认证过程很快的话，甚至这个白屏时间是感知不到的。

## 其他问题

最后，有关单点登录在实现细节上，还有一些细节需要考虑

1. 登出问题

其实提到了登录，就必须也要提到登出。一个完整的单点登录，应该也是包含登出逻辑的。什么意思呢？就是我在a.com下登出了，那么再访问b.com也应该是登出状态。

这个问题的解决方案是：在后端进行登录状态验证的时候，向auth.com后端做状态同步。比如在a.com下登出后，后端将登出状态同步给auth.com后端，下次用户进入b.com时，除了验证b.com下的cookie，也需要后端向auth.com做一次查询。最终结果已auth.com为准。当然了，后端对接的工作量会多一些，而且对登录状态验证的逻辑有一些小调整。

2. cookie续期问题

为了方便用户使用，通常cookie会有一个自动续期机制。比如cookie有效期为48小时，如果48小时内使用过这个cookie，那么set-cookie的时候就会将cookie的有效时间重置为48小时。这样就达到用户持续使用不会突然因cookie到期而被登出的问题。

但是对于auth.com就尴尬了，用户在登录完成后就跟auth.com没有关系了，平时也不会想auth.com发请求，那么时间长了，auth.com下的cookie很有可能会比a.com或者b.com下的cookie先到期。而auth.com下的cookie是共享登陆状态的关键，如果这个cookie没了，即使a.com和b.com的cookie还在，登录状态也需要被重置为未登录状态。导致原先的cookie续期机制失去作用了。

这个问题的一个解决方案是：将auth.com的cookie存在一个不会过期的地方。比如在前端通过js存在浏览器的localStorage里面，只是如果这样的话，auth.com的cookie就无法设置成http-only的，在安全性上有一定程度的影响。如果有XSS攻击，cookie可能会泄露。

另一种解决方法是让auth.com也暴露一个cookie续期的接口，a.com或b.com在前端定期调取auth.com的续期接口给cookie续命。这个方案的问题在于对业务代码有一定侵入性，显得有些脏。

3. XHR调用触发重新登录问题

原先在单一系统中，如果API调用因登录检查失败了，直接就失败了，跳转到登录页即可，没问题。但现在有了SSO以后，如果用户在页面上发起的API调用因登录检查失败了，可能只是因为a.com下的cookie到期了，而auth.com下的登录状态还是有效的。此时如果还是报错并跳转到登录页，用户就会觉得很奇怪：明明b.com下是登录状态，为什么a.com提示我该登录了？

这个现象出现的概率与用户的使用习惯有很大关系。举个例子，用户在a.com下登录，然后访问b.com，之后一直在a.com下做操作，没有再使用过b.com，但也没有把b.com的页面关闭。一段时间后，用户突然切回到b.com，就有可能出现b.com下的登录状态失效的问题（b.com的cookie过期了）。

一种解决方法是当发现登录状态过期了，先把API请求保留住，向auth.com做一次登录状态检查，更新最新的cookie，然后再重试之前的API调用。通常的XHR库都支持retry，所以重试问题不大。但复杂的地方在于，如果某个用户操作会触发多个API调用，那就得把这些API调用都暂存在一个队列里，等登录状态刷新后再一次重试队列里的请求。这个工作通常就得自己做了，很少有XHR库带这种多请求暂存重试的功能。

4. 多种登录方式的接入

有些时候系统不光是只有用户名密码登录，登录行为的发生可能来自于多种入口，例如微信扫码登录，基于bearer token的链接自动登录，来自第三方SSO对接的登录，等等等等。😰

面对这种场景，如果还想保证实现多系统单点登录，那抱歉，只能给每个登录入口都单独适配一次，毕竟每种登录入口的行为都很不一样，需要做响应的调整适配。着实有些蛋疼。

## 总结

本文总结了SSO的核心流程以及一些优化点，另外列举了一些实际开发中可能遇到的坑。总之就是，单点登录坑还是不少的，尤其是对于复杂大型系统而言。

最后再回顾一下标准的SSO流程。

登录过程（本域和passport域都没有登录）：

1. 用户访问a域
2. a域后端发现未登录，302跳转到passport域
3. 用户在passport域前端填写登录表单，提交登录
4. passport域后端验证登录状态，然后生成code，302跳转回a域用户最初访问页面，同时set-cookie顺便在passport域种上cookie
5. a域后端从url中拿到code，向passport后端验证cookie有效性，验证通过后set-cookie给a域下种上cookie并返回用户最初访问的页面内容

验证过程（本域未登录但passport域登录）：

1. 用户访问a域
2. a域后端发现未登录，302跳转到passport域
3. passport域后端验证登录状态，然后生成code，302跳转回a域用户最初访问页面，同时set-cookie顺便更新passport域下的cookie（演唱有效期）
4. a域后端从url中拿到code，向passport后端验证cookie有效性，验证通过后set-cookie给a域下种上cookie并返回用户最初访问的页面内容

## 参考资料

- [RFC6749 OAuth2](https://tools.ietf.org/html/rfc6749)
- [MDN CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [单点登录（SSO）看这一篇就够了](https://yq.aliyun.com/articles/636281)
