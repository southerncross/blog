(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{322:function(t,s,a){t.exports=a.p+"assets/img/nodejs-inspect.0150c88b.png"},323:function(t,s,a){t.exports=a.p+"assets/img/nodejs-inspect-no-break.d47a30ff.png"},324:function(t,s,a){t.exports=a.p+"assets/img/nodejs-inspect-with-brk.425f94b4.png"},325:function(t,s,a){t.exports=a.p+"assets/img/chrome-inspect.56f74fe7.png"},326:function(t,s,a){t.exports=a.p+"assets/img/nodejs-inspect-arch.eafc6a5d.png"},327:function(t,s,a){t.exports=a.p+"assets/img/vscode-inspect.67620950.png"},328:function(t,s,a){t.exports=a.p+"assets/img/vscode-inspect-before-start.7d8015df.png"},329:function(t,s,a){t.exports=a.p+"assets/img/vscode-inspect-break-point.ca931065.png"},330:function(t,s,a){t.exports=a.p+"assets/img/node_internal_debug_arch.2b1e8316.png"},331:function(t,s,a){t.exports=a.p+"assets/img/v8-protocol-set-breakpoint.2c75e423.png"},332:function(t,s,a){t.exports=a.p+"assets/img/vscode-inspect-config.b4fcfc62.png"},425:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("在开发node程序时，有些时候你需要频繁查看程序的运行状态，比如说开发babel-plugin的时候，你需要经常性地观察AST的结构，如果每次都是用console.log那也未免太低效了，这个时候就需要使用nodejs的调试技巧了。")]),t._v(" "),s("h2",{attrs:{id:"nodejs调试初探"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nodejs调试初探"}},[t._v("#")]),t._v(" nodejs调试初探")]),t._v(" "),s("p",[t._v("要想开启调试功能，需要在启动nodejs程序时添加"),s("code",[t._v("--inspect")]),t._v("参数。此时nodejs会启动一个额外的http server用来与外部调试工具通信，默认监听的地址为127.0.0.1:9229，此时就可以使用调试工具进行调试了，例如：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(322),alt:"启用调试"}})]),t._v(" "),s("p",[t._v("注意到启动后会log出这样的信息：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Debugger listening on ws://127.0.0.1:9229/58290651-b1e0-4a6f-afad-05ac3e9d5af3\nFor help, see: https://nodejs.org/en/docs/inspector\n")])])]),s("p",[t._v("其中，"),s("code",[t._v("ws://127.0.0.1:9229/58290651-b1e0-4a6f-afad-05ac3e9d5af3")]),t._v("就是监听的地址，后面的一段随机字符串代表当前node进程的uuid，有了这个地址，就可以使用外部调试工具（例如Chrome、VSCode之类）进行调试了。")]),t._v(" "),s("p",[t._v("比如有下面的一个nodejs程序：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index.js")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("hello")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("让我们用"),s("code",[t._v("--inspect")]),t._v("来试试：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("> node --inspect index.js\n")])])]),s("p",[s("img",{attrs:{src:a(323),alt:"调试一个index.js"}})]),t._v(" "),s("p",[t._v("可以看到，index.js输出了hello之后就退出了，进程也就存在了一瞬间，这怎么调试呢。。")]),t._v(" "),s("p",[t._v("没关系，可以使用"),s("code",[t._v("--inspect-brk")]),t._v("，它的作用就是等待调试工具连接后才执行，于是再试一下：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(324),alt:"使用break方式启动"}})]),t._v(" "),s("p",[t._v("可以看到没有输出hello，node进程还在，那么现在就可以用调试工具开始调试了。比如我们可以使用Chrome的Dev-Tool：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(325),alt:"使用Chrome调试工具"}})]),t._v(" "),s("p",[t._v("点击inspect进入调试，接下来的工作就跟调试网页中的js一样一样了。")]),t._v(" "),s("p",[t._v("小结一下，nodejs在inspect模式下会启动一个额外的http server与外部调试工具通信，以实现调试的效果，下面是架构图：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(326),alt:"nodejs调试架构"}})]),t._v(" "),s("h2",{attrs:{id:"launch-vs-attach"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#launch-vs-attach"}},[t._v("#")]),t._v(" Launch vs Attach")]),t._v(" "),s("p",[t._v("上面提到的nodejs的调试方法叫做Attach，因为node程序已经启动了，第三方调试工具再附加到上面，常见的浏览器调试工具都属于这一类。还有一类调试方法叫做Launch，顾名思义，就是指通过调试工具直接启动node程序。其实本质上Attach和Launch没什么不同，只是应用的场景不一样罢了。不过理解Launch和Attach的区别能够对理解调试工具有一些帮助。")]),t._v(" "),s("p",[t._v("VSCode默认都是以Launch的方式调试的，比如我们打开VSCode的debug面板：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(327),alt:"VSCode调试模式"}})]),t._v(" "),s("p",[t._v("既然是Launch模式，那么自然需要告诉VSCode该怎么启动nodejs程序（不然我怎么知道你要调试的是a.js还是b.js呢）。所以使用VSCode调试nodejs程序的第一步是要创建一个launch.json配置文件（文件名已经暴露了它的企图）。下面是一个典型的launch.json的例子：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Use IntelliSense to learn about possible attributes.")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Hover to view descriptions of existing attributes.")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.2.0"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"configurations"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"node"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- type代表调试器的类型，node是VSCode自带的调试器，也可以根据需要换成php、go等其他类型")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"request"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"launch"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- 调试类型，这里是launch模式，另一个可选值是attach")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Launch Program"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- 配置文件的名字")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"skipFiles"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<node_internals>/**"')]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"program"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${workspaceFolder}/index.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- 要调试的代码是哪个")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"args"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${env:USERNAME}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- 启动参数")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("大部分参数都比较容易理解，详细的说明请参考VSCode的官方文档（"),s("a",{attrs:{href:"https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),s("OutboundLink")],1),t._v("），写得非常清楚了。")]),t._v(" "),s("p",[t._v("创建好调试工具以后，接下来就是启动调试，点击播放按钮：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(328),alt:"启动调试"}})]),t._v(" "),s("p",[t._v("后面的操作过程也跟Chrome的调试工具差不多了，比如可以加断点看stack：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(329),alt:"断点调试"}})]),t._v(" "),s("p",[t._v("当然VSCode也是支持Attach模式的，比如可以将VSCode配置为自动Attach，那么如果是在VSCode的Debug Terminal启动nodejs程序，就会自动进入debug模式进行调试，当然篇幅有限，这里就不细讲了，感兴趣的同学可以自行阅读"),s("a",{attrs:{href:"https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attaching-to-nodejs",target:"_blank",rel:"noopener noreferrer"}},[t._v("这篇文档"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("p",[t._v("小结一下，调试方法分Attach和Launch两种，Attach模式不需要关心如何启动node进程，但是需要知道调试地址，Launch模式需要知道如何启动node进程，但是不需要知道调试地址。浏览器的调试工具都是Attach模式，VSCode默认是Launch模式。")]),t._v(" "),s("h2",{attrs:{id:"深入inspector"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#深入inspector"}},[t._v("#")]),t._v(" 深入Inspector")]),t._v(" "),s("p",[t._v("前面我们看到了，如果启动node的时候添加"),s("code",[t._v("--inspect")]),t._v("参数，就可以进入调试模式，那么这个调试模式到底是怎么启动的呢？")]),t._v(" "),s("p",[t._v("其实nodejs的调试模式是借助底层的V8引擎实现的，详细的架构图如下所示：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(330),alt:"Node调试模式架构图"}})]),t._v(" "),s("p",[t._v("nodejs程序与外部调试工具通过tcp连接通信（通常是ws或http），完整的通信协议在V8官方的文档中有写明（"),s("a",{attrs:{href:"https://chromedevtools.github.io/devtools-protocol/v8/",target:"_blank",rel:"noopener noreferrer"}},[t._v("点击这里"),s("OutboundLink")],1),t._v("），比如这个是设置断点的描述：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(331),alt:"设置断点"}})]),t._v(" "),s("p",[t._v("因此，通过向调试server发送Debugger.setBreakpoint消息以及对应参数，就可以实现设置断点的效果了，其他功能类似。headless inspector的既视感。")]),t._v(" "),s("p",[t._v("Nodejs已经把V8 inspector相关的API接口封装好了，具体见"),s("a",{attrs:{href:"https://nodejs.org/api/inspector.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),s("OutboundLink")],1),t._v("，所以我们除了使用"),s("code",[t._v("--inspect")]),t._v("参数开启调试模式外，还可以直接在代码中调用inspector的API进行调试，比如下面这个获取CPU信息的例子：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" inspector "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'inspector'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fs "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fs'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 启动调试session")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" session "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("inspector"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Session")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nsession"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("connect")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 向V8 inspector发送消息，具体格式见上文提到的协议")]),t._v("\nsession"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Profiler.enable'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  session"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Profiler.start'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Invoke business logic under measurement here...")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// some time later...")]),t._v("\n    session"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Profiler.stop'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" profile "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Write profile to disk, upload, etc.")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        fs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeFileSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./profile.cpuprofile'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("profile"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"如何调试webpack、npm、gulp、babel-node等"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何调试webpack、npm、gulp、babel-node等"}},[t._v("#")]),t._v(" 如何调试webpack、npm、gulp、babel-node等")]),t._v(" "),s("p",[t._v("至此我们已经介绍了nodejs的调试原理以及常见的调试方法，不过实际使用中经常会遇到各种各样的问题，比如要调试的东西不是直接启动node，而是通过webpack、gulp、babel-node、npm命令等，这该如何调试呢？")]),t._v(" "),s("p",[t._v("这里以babel-node为例，比如启动命令为：")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" babel-node app.js some-args\n")])])]),s("p",[t._v("如果使用Attach模式，可以这样启动：")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("node")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--inspect")]),t._v(" ./node_modules/.bin/babel-node app.js some-args\n")])])]),s("p",[t._v("然后就可以用Attach的方式进行调试了。")]),t._v(" "),s("p",[t._v("如果想用Launch模式（以VSCode为例），因为启动的命令不是node了，所以需要配置"),s("code",[t._v("runtimeExcutable")]),t._v("和"),s("code",[t._v("runtimeArgs")]),t._v("告诉VSCode我要启动的是啥，比如这样：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.2.0"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"configurations"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"node"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"request"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"launch"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Launch Program"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtimeExcutable"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${workspaceRoot}/node_modules/.bin/babel-node"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- 注意这里")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtimeArgs"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"some-args"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- 注意这里")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"program"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${file}"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// <-- ${file}的意思是当前文件")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("如果当前环境变量PATH中已经包含了babel-node，也可以把"),s("code",[t._v("runtimeExcutable")]),t._v("简化成"),s("code",[t._v("babel-node")]),t._v("。")]),t._v(" "),s("p",[t._v("此外VSCode内置了一些常用node工具调试配置模板，可以直接创建对应的配置文件，比如：")]),t._v(" "),s("p",[s("img",{attrs:{src:a(332),alt:"VSCode创建配置类型"}})]),t._v(" "),s("p",[t._v("然后改巴改巴就可以调试了。")]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("ol",[s("li",[t._v("添加"),s("code",[t._v("--inspect")]),t._v("参数可开启nodejs的调试功能，此时node会启动一个websocket server用于跟外部的调试工具通信")]),t._v(" "),s("li",[t._v("有Attach和Launch是两种调试模式，他们根本上是一样的，只是使用方式上有所不同")]),t._v(" "),s("li",[t._v("如果是webpack、npm、babel-node等，也可以用node启动，或者通过runtimeExcutable配置")])]),t._v(" "),s("h2",{attrs:{id:"参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://chromedevtools.github.io/devtools-protocol/v8/",target:"_blank",rel:"noopener noreferrer"}},[t._v("v8 debugging protocol"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://i5ting.github.io/node-debug-tutorial/#601",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node Debug Tutorial"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27",target:"_blank",rel:"noopener noreferrer"}},[t._v("Debugging Node.js with Chrome DevTools"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://code.visualstudio.com/docs/editor/debugging",target:"_blank",rel:"noopener noreferrer"}},[t._v("VSCode debugging"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);