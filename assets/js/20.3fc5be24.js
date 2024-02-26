(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{165:function(t,s,e){t.exports=e.p+"assets/img/serverless_arch.1b2a70b1.png"},166:function(t,s,e){t.exports=e.p+"assets/img/download_source.bcdddf7f.png"},167:function(t,s,e){t.exports=e.p+"assets/img/create_api_gateway.56e24790.png"},168:function(t,s,e){t.exports=e.p+"assets/img/test_api_gateway.7b3fd34a.png"},301:function(t,s,e){"use strict";e.r(s);var a=e(3),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"成本分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#成本分析"}},[t._v("#")]),t._v(" 成本分析")]),t._v(" "),a("p",[t._v("serverless的一大优点是按需使用按需付费。以腾讯云的serverless云函数为例，计费来自三个部分：调用次数、运行时间、外网流量。具体细节见"),a("a",{attrs:{href:"https://cloud.tencent.com/document/product/583/12284",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("而为了方便开发者，serverless供应商一般都会提供一些免费额度。还是以腾讯云的serverless为例，每月有100万次的免费调用次数，40万GBs的运行时间，至于外网流量嘛，原来似乎也是有免费额度的，目前是没有了，国内的价格大概是0.8元/GB。")]),t._v(" "),a("p",[t._v("粗略统计了一下目前这个博客的情况，每次打开一个博客页面")]),t._v(" "),a("ol",[a("li",[t._v("没有复杂计算，运行时间消耗暂且忽略不计，资源消耗将主要集中在请求次数和外网流量上")]),t._v(" "),a("li",[t._v("平均一次加载会有5个请求，总流量大概是100KB，在有浏览器缓存的情况下，这个可以认为是UV资源损耗")])]),t._v(" "),a("p",[t._v("在免费请求额度100万的情况下，假如免费的请求次数全部用光，差不多是"),a("code",[t._v("100万 / 5 = 20万")]),t._v("UV，这20万UV一共将产生"),a("code",[t._v("20万 * 100KB = 20GB")]),t._v("外网流量，也就是"),a("code",[t._v("20 * 0.8 = 16")]),t._v("块人民币，总之还是蛮划算的。")]),t._v(" "),a("p",[t._v("理论上不论选择腾讯云还是阿里云还是华为云，大致思路都是一样的。这里选择腾讯云主要是因为自己的域名恰好是在腾讯云上购买的，放在一起省事儿。PS：以下内容如无意外，“云函数”都是指“腾讯云函数”。")]),t._v(" "),a("p",[t._v("经过差不多一个周末的折腾，这事儿总算搞完了，说实话，坑还是蛮多的，各位准备尝试的朋友要做好心里准备。如果遇到解决不了的问题，多用工单，腾讯云的工单响应都非常及时，如果你工单回复多了甚至会有"),a("s",[t._v("性感荷官在线发牌")]),t._v("技术小哥亲自电话答疑，这里要赞一个。")]),t._v(" "),a("h1",{attrs:{id:"准备工作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#准备工作"}},[t._v("#")]),t._v(" 准备工作")]),t._v(" "),a("h2",{attrs:{id:"安装部署工具"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装部署工具"}},[t._v("#")]),t._v(" 安装部署工具")]),t._v(" "),a("p",[t._v("首先安装腾讯云函数的部署命令工具"),a("code",[t._v("pip install scf")]),t._v("，这一步参考官方文档即可，点击"),a("a",{attrs:{href:"https://cloud.tencent.com/document/product/583/37510",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("blockquote",[a("p",[t._v("腾讯云函数，serverless cloud function，简称scf。")])]),t._v(" "),a("p",[t._v("云函数的创建和部署有如下几种方式：")]),t._v(" "),a("ol",[a("li",[t._v("通过腾讯云Web控制台")]),t._v(" "),a("li",[t._v("通过部署CLI工具")]),t._v(" "),a("li",[t._v("通过VSCode插件")])]),t._v(" "),a("p",[t._v("这几种方式最终效果是一样的，主要是在操作流程、模板代码等细节上有不一样的地方。目前暂不推荐方式3，因为VSCode插件功能不全，比较局限。如果你之前完全没有折腾过云函数，我倒是建议方式1、2、3都操作一遍，对理解云函数的开发、部署还是很有帮助的。")]),t._v(" "),a("p",[t._v("这里推荐的开发方式是：")]),t._v(" "),a("ol",[a("li",[t._v("创建云函数使用Web控制台，因为用户体验好")]),t._v(" "),a("li",[t._v("部署使用CLI工具，因为可以集成进脚本自动化")]),t._v(" "),a("li",[t._v("调试使用Web控制台，因为控制台中改代码随改随生效，比较方便")])]),t._v(" "),a("p",[t._v("你可以将方式1类比成在github上创建代码仓库，方式2类比成在cli环境使用git命令。")]),t._v(" "),a("h2",{attrs:{id:"注册云函数，关联api网关触发器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注册云函数，关联api网关触发器"}},[t._v("#")]),t._v(" 注册云函数，关联API网关触发器")]),t._v(" "),a("p",[t._v("直接去Web控制台创建即可，创建云函数是免费的。具体的操作步骤直接看官方文档即可，点击"),a("a",{attrs:{href:"https://cloud.tencent.com/document/product/583/37509",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("p",[t._v("推荐使用创建模板云函数，因为这样里面会带有一些代码，方便你理解。官方文档的例子是用python环境创建了一个hello world空模板，如果你用node环境，不建议使用helloworld，因为helloworld的配置文件是JSON，而官方文档里暂时没有对JSON格式的说明。node环境建议使用"),a("code",[t._v("API网关返回自定义HTML页面")]),t._v("这个模板。")]),t._v(" "),a("p",[t._v("文档中还有一步是关联API网关触发器，这里可以先不做，等后面我们会再讲。这一步的效果，简单来说就是让云函数连上网（内网或外网），只有这样才可以被HTTP请求触发。除了API网关触发外，还可以配置成定时触发、消息队列触发、对象存储触发（COS）等。")]),t._v(" "),a("p",[t._v("我们要实现的效果是这样：")]),t._v(" "),a("p",[a("img",{attrs:{src:e(165),alt:"serverless blog arch"}})]),t._v(" "),a("p",[t._v("需要注意，API网关触发器是基于API网关的一个服务。而API网关其实是腾讯云的一个独立业务，是独立收费的。")]),t._v(" "),a("p",[t._v("在创建云函数的时候，腾讯云会给你默认创建一个API网关（用来做API网关触发器），创建是免费的，每月的调用次数是无限的，但流量是收费的，这也是serverless托管博客方案中唯一收费的地方。好在流量还比较便宜，0.8/GB。")]),t._v(" "),a("p",[t._v("这里建议你准备一个域名，因为云函数提供的默认API网关地址是这样的"),a("code",[t._v("https://service-fl2iq30f-1310413208.ap-beijing.apigateway.myqcloud.com/blablabla")]),t._v("，太长了，显然不能做博客地址。API网关绑定域名的配置不在云函数服务，在API网关服务里，别搞错了。")]),t._v(" "),a("h2",{attrs:{id:"将云函数代码“clone”到本地"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#将云函数代码“clone”到本地"}},[t._v("#")]),t._v(" 将云函数代码“clone”到本地")]),t._v(" "),a("p",[t._v("前面通过Web控制台创建的云函数，只能在Web控制台处理，接下来你需要把云函数的代码拉到本地，并同步起来。就好像git clone一个仓库到本地一样。")]),t._v(" "),a("p",[t._v("怎么操作呢？很简单，下载之 😄")]),t._v(" "),a("p",[a("img",{attrs:{src:e(166),alt:"download source code"}})]),t._v(" "),a("p",[t._v("刚才使用Web控制台从模板中创建的云函数里有一个叫template.yaml的配置文件，这个就是云函数的配置文件了，它非常重要。其实配置文件的名字不一定非是这个名字，只要在执行scf时指定好就可以。")]),t._v(" "),a("p",[t._v("默认的配置文件长这样：")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Resources")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" TencentCloud"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Serverless"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Namespace\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("API_GW_Html_Demo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" TencentCloud"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Serverless"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Function\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Properties")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("CodeUri")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ./\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Description")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 本示例主要演示如何配置 API 网关触发器返回自定义的html页面\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Variables")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Handler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" index.main_handler\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MemorySize")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("128")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Runtime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Nodejs8.9\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Timeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Events")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("SCF_API_SERVICE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# api gateway service name")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" APIGW "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# trigger type")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Properties")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n              "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("StageName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" release\n              "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("HttpMethod")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ANY\n              "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("IntegratedResponse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n")])])]),a("p",[t._v("这里比较关键的几个配置是：")]),t._v(" "),a("ul",[a("li",[t._v("API_GW_Html_Demo：这其实是云函数的名字，是可以自己修改的")]),t._v(" "),a("li",[t._v("CodeUri：这个相当于是base路径，后续所有涉及到路径的配置，都会以这个地址作为base路径，默认是"),a("code",[t._v("./")]),t._v("。")]),t._v(" "),a("li",[t._v("Handler：这个是个云函数的入口方法，默认值是"),a("code",[t._v("index.main_handler")]),t._v("，表示index.js文件中的main_handler方法是main方法，当云函数被调用时，这个方法将会被触发。")]),t._v(" "),a("li",[t._v("SCF_API_SERVICE： 这是API网关触发器的配置，因为我们是在Web控制台关联的触发器，所以这里其实用不到这个配置")])]),t._v(" "),a("p",[t._v("不重要的配置其实可以去掉，因为反正都是默认值，留着碍眼，比如我换成了这样：")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Globals")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Timeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Resources")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" TencentCloud"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Serverless"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Namespace\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("blog")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" TencentCloud"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Serverless"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("Function\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Properties")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("CodeUri")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ./\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Event\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Description")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Lishunyang's blog\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Role")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" QCS_SCFExcuteRole\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Handler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" serverless.main\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Runtime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Nodejs8.9\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Timeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("\n")])])]),a("h2",{attrs:{id:"跑通部署流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#跑通部署流程"}},[t._v("#")]),t._v(" 跑通部署流程")]),t._v(" "),a("p",[t._v("现在运行scf部署命令，测试是否可以成功部署")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# -f 表示强制覆盖，相当于git push --force")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# -t 表示自定义配置文件名")]),t._v("\nscf deploy -f -t template.yaml\n")])])]),a("p",[t._v("如果没有任何报错，说明部署流程已经跑通了。")]),t._v(" "),a("p",[t._v("注意，云函数对部署的资源文件体积比较敏感，超过一定限制（好像是2MB？）就强制你使用腾讯的对象存储服务（COS），说是提升部署体验，实际上是捆绑消费。而scf会把codeUri下所有文件都一起上传上去，如果这里面有个node_modules，那基本上都会超过体积限制。解决办法有两个：")]),t._v(" "),a("ol",[a("li",[t._v("把用不着的东西都删掉")]),t._v(" "),a("li",[t._v("使用ignore配置")])]),t._v(" "),a("p",[t._v("方法2不是很推荐，配置不是很友好，非常丑陋，推进用方案1，比如在部署的时候，新建一个干净的目录，把要部署的东西放进去，然后在那里面单独部署。")]),t._v(" "),a("h2",{attrs:{id:"关联api网关触发器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关联api网关触发器"}},[t._v("#")]),t._v(" 关联API网关触发器")]),t._v(" "),a("p",[t._v("如果之前你没有关联API网关触发器，那此时创建一个也不迟。")]),t._v(" "),a("p",[a("img",{attrs:{src:e(167),alt:"create api gateway"}})]),t._v(" "),a("p",[t._v("注意其中红框的部分，尤其是最后一个“启用集成响应”，一定要勾上，否则云函数的返回值只能被当作json解析，博客肯定是不行的。这个地方之前坑了我很久。")]),t._v(" "),a("p",[t._v("创建触发器成功后，就可以访问API触发器地址看看是否可以正常触发云函数了。")]),t._v(" "),a("p",[a("img",{attrs:{src:e(168),alt:"test api gateway"}})]),t._v(" "),a("p",[t._v("如果到此为止，一切正常，那么恭喜你，准备工作终于做完了，接下来就是将博客迁移到云函数上了。")]),t._v(" "),a("p",[t._v("如果有报错，可以去Web控制台看运行日志，日志有一些延迟，大概1~3分钟的样子。")]),t._v(" "),a("blockquote",[a("p",[t._v("如果有任何问题，答应我，去看运行日志好吗")])]),t._v(" "),a("h1",{attrs:{id:"迁移博客"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#迁移博客"}},[t._v("#")]),t._v(" 迁移博客")]),t._v(" "),a("h2",{attrs:{id:"编写云函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写云函数"}},[t._v("#")]),t._v(" 编写云函数")]),t._v(" "),a("p",[t._v("这个博客是用vuepress写的，发布的时候会build成静态页面，其他例如hexo也是一样，我们要做的事情其实就是托管静态资源。这就是云函数要干的事。")]),t._v(" "),a("p",[t._v("需要注意，云函数被唤起后，只负责响应一次请求，然后就会被销毁，所以我们这个云函数要能够处理html、javascript、CSS、image等响应，并返回正确的结果。")]),t._v(" "),a("p",[t._v("云函数不像node开发http server时有request和response，云函数的入参是一个event，告诉你HTTP请求的一些基本信息，返回值是一个json对象，用来表示response内容。这一点与传统的http server开发不太一样。")]),t._v(" "),a("p",[t._v("这是云函数返回值的结构：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("isBase64Encoded")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" boolean"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 是否是base64编码")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// response header")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("body")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// response body")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("code",[t._v("headers")]),t._v("和"),a("code",[t._v("body")]),t._v("很好理解，分别对应HTTP的header和body，但是这个"),a("code",[t._v("isBase64Encoded")]),t._v("是个啥呢？为啥要有这个东西呢？这是因为云函数的body不能是二进制数据，如果你想传输二进制数据就必须使用base64编码，否则就会报错。所以对于图片、音频这种二进制数据，body必须用base64编码，并且将"),a("code",[t._v("isBase64Encoded")]),t._v("设置为true。")]),t._v(" "),a("blockquote",[a("p",[t._v("HTTP协议是支持二进制数据直传的，所以base64这个限制是云函数引入的，至于为什么要这么做就不得而知了。")])]),t._v(" "),a("p",[t._v("其实云函数的伪代码逻辑差不多就是这样：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("function main(event) {\n  if (event.url对应的静态资源文件存在) {\n    读静态资源文件内容;\n    确定返回体header、是否base64编码、构造body;\n    返回json;\n  } else {\n    读404页面html文件;\n    确定返回体header、是否base64编码、构造body;\n    返回json;\n  }\n}\n")])])]),a("p",[t._v("在写代码的时候要注意，目前云函数的部署过程还不支持动态安装npm依赖（这个功能还在内测中），解决方法有两个：")]),t._v(" "),a("ol",[a("li",[t._v("不用第三方依赖，完全自己写")]),t._v(" "),a("li",[t._v("是把依赖包放在代码目录里")])]),t._v(" "),a("p",[t._v("方案2容易让代码的体积失控，还记得前面说过云函数的部署对体积比较敏感吗，因此，我选择不用第三方package自己撸。")]),t._v(" "),a("p",[t._v("最终的代码实现，可以直接看这个博客的github源代码，见"),a("a",{attrs:{href:"https://github.com/southerncross/blog/blob/master/serverless.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"编写部署脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写部署脚本"}},[t._v("#")]),t._v(" 编写部署脚本")]),t._v(" "),a("p",[t._v("部署脚本大致流程为")]),t._v(" "),a("ol",[a("li",[t._v("build生成静态文件，例如输出到dist目录")]),t._v(" "),a("li",[t._v("把云函数的配置文件放到dist目录下")]),t._v(" "),a("li",[t._v("在dist目录下执行scf的部署命令")])]),t._v(" "),a("p",[t._v("比如这是我的：")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[t._v("#!/usr/bin/env sh")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 确保脚本抛出遇到的错误")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" -e\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生成静态文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run build\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将TSC配置文件复制到dist目录下")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" serverless.js docs/.vuepress/dist\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" tencent-serverless.yml docs/.vuepress/dist\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 进入生成的文件夹")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" docs/.vuepress/dist\n\nscf deploy -f -t tencent-serverless.yml\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" -\n")])])]),a("h2",{attrs:{id:"大功告成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#大功告成"}},[t._v("#")]),t._v(" 大功告成")]),t._v(" "),a("p",[t._v("ok，到这里基本上所有工作都做完了，现在跑一下部署脚本，如果一切正常，你就可以通过API网关访问博客了。记得给API网关绑定一个自定义域名，美滋滋。")]),t._v(" "),a("h1",{attrs:{id:"后记"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#后记"}},[t._v("#")]),t._v(" 后记")]),t._v(" "),a("p",[t._v("用serverless托管博客并不是云函数真正的用途，云函数的能力是很强大的，这里有点大材小用。")]),t._v(" "),a("p",[t._v("整个过程折腾下来，遇到了不少坑，其实有一个最主要的坑前面都没提，那就是云函数的测试、debug很麻烦。基本无法在本地测试（scf支持本地测试，但那个测试非常有限），最方便的方式就是去Web控制台打log，然后触发调试。效率低不说，而且腾讯云的API文档不是很详细，没有文档参考的时候只能靠console.log。比如，在做缓存逻辑的时候，If-Modified-Since这个header死活就是比较不对，后来发现是云函数传入的参数里有一些蜜汁字符。再比如，API网关绑定自定义域名的时候，目录环境名称就是配置不对，文档里也没详细说，后来各种尝试竟然给试出来了。。")]),t._v(" "),a("p",[t._v("撒花庆祝")]),t._v(" "),a("p",[t._v("希望这篇博客能帮助到大家 😄")])])}),[],!1,null,null,null);s.default=n.exports}}]);