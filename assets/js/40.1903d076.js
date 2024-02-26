(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{409:function(e,s,r){"use strict";r.r(s);var v=r(14),a=Object(v.a)({},(function(){var e=this,s=e._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"云计算服务模型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#云计算服务模型"}},[e._v("#")]),e._v(" 云计算服务模型")]),e._v(" "),s("p",[e._v("让我们首先从云计算的概念开始。")]),e._v(" "),s("p",[e._v("要想理清市面上种类繁多的云计算服务，只需要理解云计算服务模型即可。这里借用MSDN中的一张图片说明：")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://dachou.github.io/assets/20110326-cloudmodels.png",alt:"microsoft could models diagram"}})]),e._v(" "),s("p",[e._v("在还没有云计算的时代，如果一个人想搭建一个网站，那么他需要先办理宽带、购买机器、安装操作系统、搭建数据库和web服务器，然后才能编写程序最终把网站运行起来。可以看到，这么做其实浪费了大量精力在基础设施（infrustructure），比如网络、存储、机器等，的维护上，既费时费力且服务能力扩展性也很差。大概20年前大家都是这么做的。")]),e._v(" "),s("p",[e._v("人们发现，既然基础设施是与业务无关的，那么这部分工作其实应该分离出去交给第三方服务供应商去做。于是基础设施就成了一种服务，英文缩写是IaaS，全称Infrustructure as a Service。在IaaS服务模式下，硬件层被完全隔离，开发者得到的是可以直接使用的操作系统环境，剩下的工作就只需要搭建数据库、web服务器，编写代码并运行即可。为了提高硬件资源利用率，提升服务可用性和扩展性，人们需要在一台物理主机虚拟出多个宿主操作系统。因此虚拟化技术（Virtualization）是IaaS的关键技术，也可以说是虚拟化技术的发展带动了IaaS产业的蓬勃发展。IaaS的典型代表是Amazon在2002年推出的AWS服务（Amazon Web Service），AWS被认为是IaaS业务的鼻祖及代表。国内类似的典型业务有阿里云弹性云计算（ECS，Elastic Computing Service），注意这只是阿里云众多服务中的一个。IaaS的出现极大降低了IT业务的研发和运维成本，它像支付宝、ofo一样深刻改变了IT工程师的工作模式。现在如果一个人想弄一个网站，只需要花钱买一个VPS，就可以在上面搭建web服务了。")]),e._v(" "),s("p",[e._v("再到后来（几乎是同时），人们发现像mysql、redis、log等基础服务太常见了，几乎每个IT产品开发都少不了。这部分服务的维护工作其实也可以交给外部服务供应商提供，开发者只需要关系数据以及编写程序使用这些服务就可以了。于是出现了一个新的概念：平台即服务，PaaS（Platform as a Service）。所谓的平台，指的是一切软件层面的服务，底层的服务比如有数据库、消息队列等，高层的服务比如有图片鉴黄、视频转码等，凡是能被抽象出来单独提供软件层面服务的，都算是PaaS。PaaS的典型代表有Amazon的关系型数据库RDS（Relational Database Service），国内类似的典型业务有阿里云的关系型数据库服务（也叫RDS），另外比如支撑小程序开发的腾讯云平台也算。PaaS是很宽泛的一个概念，毕竟一起能提供软件层面服务的都可以算是PaaS。")]),e._v(" "),s("p",[e._v("在PaaS和IaaS场景中，开发者还是需要编写代码才能完成业务的，那么再往上，如果连写代码都不需要就可以完成业务了呢？此时软件本身就变成了一种服务，即Software as a Service，简称SaaS。到了这个层面，也就脱离了开发，想干什么只需要交钱就可以了，有时候甚至都不需要交钱。典型的业务是谷歌的网页版邮件服务Gmail，国内类似的有极牛逼的"),s("a",{attrs:{href:"https://www.mokahr.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("智能招聘管理系统Moka"),s("OutboundLink")],1),e._v("。")]),e._v(" "),s("p",[e._v("上述的云计算服务模型是最经典的服务模型，实际到了具体的业务场景里，为了方便管理，又细分成了很多XaaS。比如BaaS（Backend as a Service），FaaS（function as a service），CaaS（Container as a service），恐怕以后26个字母可能都不够用了。但无论怎样，了解云计算服务模型，我们就能理解：他们的本质都是在某种抽象层面上提供某种服务。")]),e._v(" "),s("h1",{attrs:{id:"从虚拟化到容器化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#从虚拟化到容器化"}},[e._v("#")]),e._v(" 从虚拟化到容器化")]),e._v(" "),s("p",[e._v("上文中曾经提到，虚拟化技术的出现使得IaaS以及后续的PaaS、SaaS蓬勃发展。由于开发人员无须再关心业务无关的其他事情，只需专注在业务层开发，生产力得到了极大解放，因此各种业务层出不穷，百花齐放，反过来也繁荣了整个互联网行业。")]),e._v(" "),s("p",[e._v("事情到此为止了吗？不，渐渐地人们开始发现，在业务开发当中仍然有一部分看似与业务有关实际无关的东西极大影响了开发效率。那就是应用的部署、发布、迁移等运维过程。想象一下你开发了一个网页服务，一开始是跑在单一一台服务器上，直到某一天业务负载太大不得不新增一台服务器，此时就需要在新的服务器上安装配置各种依赖环境。不仅如此，从此以后的每次版本更新你都需要在两台服务器上执行发布流程。假如某天你的新版本需要安装一个新的依赖，那么就必须在两台机器都安装配置一遍新的依赖。也许两台服务器还可以操作得过来，假如有20台服务器甚至200台服务器，此时运维的成本将急剧上升，甚至将超过开发的成本。")]),e._v(" "),s("p",[e._v("怎么办？如果能把应用以所依赖的环境都打包成一个整体，就好像将应用装进了一个容器里，那么之前上面提到的所有操作（比如安装依赖，配置环境）只需要在容器镜像中操作一次就够了，之后的部署、扩容、迁移等操作，只需要把这些打包好的容器放在对应的位置并启动即可，容器化技术（containerization）因此应运而生。这也是为什么容器化技术的名称的来历。Docker是容器化技术的成功实现方案，此外还有后续发展起来的容器编排方案k8s等。")]),e._v(" "),s("p",[e._v("容器化技术的出现使得应用的部署运维成本明显下降，随着应用的部署运维成本变得足够低，有利于应用开始向微服务形态转变。因此容器化技术的成熟推动了微服务架构的蓬勃发展。")]),e._v(" "),s("h1",{attrs:{id:"从单一服务到微服务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#从单一服务到微服务"}},[e._v("#")]),e._v(" 从单一服务到微服务")]),e._v(" "),s("p",[e._v("什么是微服务，最通俗的理解就是微小的服务。没错，当一个服务足够微小，边界很清晰，逻辑很简单，那么这个服务也会非常可靠，开发扩展起来也会非常容易，而且及时出错了影响也非常可控，这是为什么要向微服务架构发展的重要原因。")]),e._v(" "),s("p",[e._v("其实人们很早就意识到了这一点，甚至在计算机以外的其他领域也是如此。比如一个运转高效的几千人的大企业，内部组织结构一定是若干层级并不断细分，保证同一个单元里不会有太多人，降低组织的复杂度。因此，业务从简单到复杂，系统架构从单一服务到微服务是一个天然的发展趋势。")]),e._v(" "),s("p",[e._v("而容器化是实现微服务架构的核心技术。容器化促进了微服务的发展，微服务反过来促进了容器化的发展。")]),e._v(" "),s("h1",{attrs:{id:"什么是serverless"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是serverless"}},[e._v("#")]),e._v(" 什么是serverless")]),e._v(" "),s("p",[e._v("那么，如果我们把应用的部署运维工作交给第三方服务供应商，那么我们就可以说得到了一种全新的云计算服务形态。在这种服务形态下，开发人员只需要写代码，剩下的部署和运维工作完全不需要关心了。就好像是处在一个巨大的调度框架之中，我们所开发的东西只不过是一个一个函数，外加一些触发逻辑，剩下的工作交给运维框架负责。所以实际上，运维框架成了一种服务，DevOps as a Service？似乎不是很恰当，Funcion as a Service？也不是很恰当，干脆叫serverless吧。")]),e._v(" "),s("p",[e._v("所以，serverless在本质上是一种云计算的服务模式，但他具有一些典型的特征以区别其他的几种云计算模式，比如：")]),e._v(" "),s("ol",[s("li",[e._v("无状态")])]),e._v(" "),s("p",[e._v("这是容器化的必然结果。")]),e._v(" "),s("p",[e._v("应用的生命周期是：启动新的容器 -> 执行业务逻辑 -> 销毁容器，所以应用本身是无法保存状态的。")]),e._v(" "),s("p",[e._v("不过虽然服务本身是无状态的，它却可以通过一些操作产生副作用（比如数据库的读写）。所以不要一看到无状态就认为必须像函数式编程那样开发，实际上无状态的本质是没有全局变量，进一步降低了模块间的耦合。")]),e._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[e._v("微服务")])]),e._v(" "),s("p",[e._v("这是容器化的推荐架构。")]),e._v(" "),s("p",[e._v("容器化思想的核心是每个容器只做好一件事情，因此采用容器化部署，每个服务就不能太复杂，外部依赖不能太多，结果必然是以微服务架构的形式组织业务。")]),e._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[e._v("事件驱动")])]),e._v(" "),s("p",[e._v("这是微服务架构的首选通信方式。")]),e._v(" "),s("p",[e._v("在微服务架构下，服务之间的耦合几乎为0，每个服务都可以独立部署、运行。服务和服务之间的通信不应该采用传统的同步调用，而是应该以异步的方式进行。在此前提下，事件驱动成了首选。")]),e._v(" "),s("p",[e._v("但我们也需要注意，事件驱动虽然极大降低了服务之间的耦合，但同时它也使得问题排查变得更加困难。")]),e._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[e._v("弹性")])]),e._v(" "),s("p",[e._v("由于应用都是无状态的，当被事件触发时无需任何其他依赖即可启动容器响应，所以理论上横向扩容可做到自动化，对开发人员来讲完全无感知。并且由于只在触发应用的时候才会消耗资源，未触发应用的时候不占用任何资源，所以对资源的消耗可以做到完全的“需要多少就用多少”的程度，可以说没有任何浪费。")]),e._v(" "),s("p",[e._v("因此，服务商通常都是采用按使用次数收费或者按使用时间收费的计费策略（当然为了避免一个应用占用太长时间，服务商也会对调用时间加以限制）。")]),e._v(" "),s("p",[e._v("好了，现在你应该对serverless有了一个大致的了解。我们说serverless，更多的时候指的是一个业务是符合serverless的形态：其本身是微服务架构，每个模块跑在容器里，按需提供服务。")]),e._v(" "),s("h1",{attrs:{id:"serverless与前端的关系"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#serverless与前端的关系"}},[e._v("#")]),e._v(" serverless与前端的关系")]),e._v(" "),s("p",[e._v("很多前端工程师最近两年越来越多地听到serverless的概念，甚至有人说serverless是前端开发的未来，是前端开发的下一次革命。事实确实如此吗？")]),e._v(" "),s("p",[e._v("通过上文的分析我们可知，虽然叫serverless，但它确实是跟后端的关系更紧密。serverless概念的提出、使用的场景、解决的问题这些都跟前端其实没什么关系，或者说关系不大。如果你去国内的serverless服务商看看他们的demo，你也会发现那些demo基本上跟前端都没关系。")]),e._v(" "),s("p",[e._v("那为什么说serverless是前端开发的未来呢？我觉得是他们想当然地认为如果有serverless，后端开发的难度将会极大地降低，就跟玩儿一样，到时候前端就可以写后端，人人都是全栈。serverless确实会在一定程度上降低后端开发的难度（毕竟不需要考虑扩容以及运维的事情了），但这种降低是有限的。有一开头那种想法的人一定是没有深入接触过后端开发，认为自己会写node和sql就等于会写后端了。前端水浅，会不会游泳都可以扑腾一下，到了深水可就不一定了。")]),e._v(" "),s("p",[e._v("好消息是，serverless对全栈开发工程师很利好。毕竟很多全栈工程师通常都是前端转过来的，serverless正好帮助他们解决了很大一部分知识技能相对薄弱的部分。")]),e._v(" "),s("p",[e._v("目前在前端领域可以看到的非常有实际意义的使用场景只有一个，就是BFF（Backend For Frontend）层的serverless化。毕竟这玩意本身就是要靠前端工程师维护，业务逻辑不算复杂，但是又涉及到性能问题，再适合不过了。确实已经阿里等大厂在采用serverless的BFF，实践得到的反馈也都比较积极。当然，BFF层的前提是后端采用微服务架构，一般小公司玩不起，所以BFF的应用范围比较有限。")]),e._v(" "),s("h1",{attrs:{id:"serverless的发展现状及问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#serverless的发展现状及问题"}},[e._v("#")]),e._v(" serverless的发展现状及问题")]),e._v(" "),s("p",[e._v("国外比较成熟的是2014年上线运行的Amazon Lambda云计算服务，它这是典型的serverless。事件驱动、无状态、按次收费。每月前100万次调用免费，此后每100万次请求收费0.2美元，当然除了调用次数外还有调用耗时的计费规则。")]),e._v(" "),s("p",[e._v("国内各大云计算厂商也都有类似的函数计算业务。比如阿里云的函数计算引擎（Serverless Function Compute），腾讯云的云函数（Serverless Cloud Function）等。计费方式与国外差不多，价格都差不多，区别在于多了一个网络流量的计费规则，毕竟国内带宽价格比较贵。")]),e._v(" "),s("p",[e._v("此外还有大大小小各种serverless服务商，这就出现了一个问题，serverless并没有统一的规范，因此怎么提供服务也都是各家说了算。比如虽然大家都是事件驱动，可是有哪些事件，事件里包含什么信息，有哪些api可以使用等等，不同服务商给出解决方案或多或少存在一些差别。那么采用一个serverless服务商开发的应用若想迁移到其他服务商就需要一定的移植成本，这个成本可大可小，但总之兼容性是退步了。")]),e._v(" "),s("p",[e._v("除了缺乏标准，另一个现阶段serverless服务商的最大问题就是开发体验极差。本人曾尝试将个人博客的静态站点迁移到腾讯云的serverless服务上去，经过周末两天的折腾最终愣是没折腾成功。首先官方给出的demo例子是错的无法跑通。其次官方api文档质量也不高，很多地方没有覆盖到，甚至连基本的配置实例是错的，害得我亲自去翻python cli的源代码才搞清楚正确配置怎么写。最后是调试困难，本地调试是个残废，要想测试功能逻辑就必须远程调试。每改动一行代码就需要build并且上传到云平台，打出来的log还无法实时看到，需要等2-3分钟的延迟。我光是跑通一个最基本的helloworld例子就折腾了整整一天，非常的坑。第二天本以为可以把代码部署上去就可以执行了，结果发现应用返回的数据总是被识别为json，无法正确在浏览器端渲染html页面，文档里没写解决办法，官方demo也一模一样的问题，只能不停打log测试，最终还是没能解决。整个开发过程，也许熟悉了之后会快一些，但开发体验仍然是吃屎般恶心。")]),e._v(" "),s("p",[e._v("说完了serverless服务商，现有的很多开源项目还没有考虑过serverless的解决方案，导致依赖这些项目的项目也比较难转向serverless。比如我想用strapi搭建一个headless的CSM服务，strapi官方目前是没有serverless的解决方案的，如果我想把CMS做出serverless的，要么自己折腾strapi（需要一定开发成本），要么不用strapi。类似的感受还是比较多的，但凡依赖的不是微服务，基本就不可能serverless了。")]),e._v(" "),s("p",[e._v("那serverless适合什么样的人使用呢？个人认为是两类人：个人和大公司。")]),e._v(" "),s("p",[e._v("首先，serverless比较适合个人或小型项目。毕竟省去了运维部署成本，并且用多少服务交多少钱。很多个人项目可能连免费额度都用不完，比如大部分人个人博客，每个月到不了100万的访问量。")]),e._v(" "),s("p",[e._v("其次，serverless适合微服务架构。其实前面也都说了，serverless的一个特点就是微服务化。而一般能玩得转微服务的通常都是大企业，业务逻辑足够多而复杂，微服务的成本被分摊得足够低。")]),e._v(" "),s("h1",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),s("p",[e._v("serverless不是指某种技术而是指一种云计算的服务形态，他是微服务架构、容器化等技术发展成熟后的必然产物。")]),e._v(" "),s("p",[e._v("serverless具有4个典型的特征：无状态、微服务、事件驱动、弹性。")]),e._v(" "),s("p",[e._v("虽说叫serverless，但后端绝不会被替代或者消失，它只是适当降低了一些门槛，全栈开发工程师更加友好。现阶段前端领域最大的受益场景只是BFF层。")]),e._v(" "),s("p",[e._v("理想很美好，现实很骨感。目前众多相关技术的serverless方案迁移成本仍旧过高，各serverless平台功能也不完善，开发体验差。未来还有相当长的一段路要走。")])])}),[],!1,null,null,null);s.default=a.exports}}]);