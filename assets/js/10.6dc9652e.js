(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{101:function(t,v,_){t.exports=_.p+"assets/img/objection.406cab7e.png"},124:function(t,v,_){t.exports=_.p+"assets/img/original-code.dadf7eb2.png"},278:function(t,v,_){t.exports=_.p+"assets/img/bug.c8fbc5bd.png"},279:function(t,v,_){t.exports=_.p+"assets/img/latest-code.d835c7d6.png"},280:function(t,v,_){t.exports=_.p+"assets/img/question.f5a074ff.jpg"},281:function(t,v,_){t.exports=_.p+"assets/img/no-idea.e8ba74ef.png"},282:function(t,v,_){t.exports=_.p+"assets/img/i-know.87477417.jpg"},283:function(t,v,_){t.exports=_.p+"assets/img/so.09437a51.gif"},284:function(t,v,_){t.exports=_.p+"assets/img/break-through.6410ee88.png"},336:function(t,v,_){"use strict";_.r(v);var s=_(3),a=Object(s.a)({},(function(){var t=this,v=t.$createElement,s=t._self._c||v;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("前不久研发团队推行oncall机制改革，有幸体验了一次oncall，修了修bug，还是挺有感慨的，分享一下。")]),t._v(" "),s("h2",{attrs:{id:"一个小bug"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一个小bug"}},[t._v("#")]),t._v(" 一个小bug")]),t._v(" "),s("p",[t._v("当时客户提报的bug是这样的，入职信息中缺少了一个“天”字")]),t._v(" "),s("p",[s("img",{attrs:{src:_(278),alt:"bug"}})]),t._v(" "),s("p",[t._v("对于这样一个bug，你觉得要多久时间能搞定？定位代码，补全缺失文案，5分钟不能再多了吧？实际上最后我花了2个小时，怎么回事儿呢？")]),t._v(" "),s("h2",{attrs:{id:"bug的根本原因是什么？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bug的根本原因是什么？"}},[t._v("#")]),t._v(" bug的根本原因是什么？")]),t._v(" "),s("p",[t._v("首先我定位到了出bug的代码，可以看到，确实是前端生成的文案，而且确实少了一个“天”字。")]),t._v(" "),s("p",[s("img",{attrs:{src:_(279),alt:"the latest code"}})]),t._v(" "),s("p",[t._v("到这里，可能有些同学可能就迫不及待地想要把“天”字加上，然后提交测试了吧。")]),t._v(" "),s("p",[s("img",{attrs:{src:_(101),alt:"objection"}})]),t._v(" "),s("p",[t._v("一斤鸭梨！我们得扒一扒代码看看有没有深层次的原因。")]),t._v(" "),s("p",[t._v("通过blame操作进一步深挖后发现，有问题的代码最初是7个月前重构移动端的时候新引入的逻辑：")]),t._v(" "),s("p",[s("img",{attrs:{src:_(124),alt:"the original code"}})]),t._v(" "),s("p",[t._v("那么就排除了改动老逻辑这种可能，这种相对就比较简单了，因为没有隐含的逻辑在里面。")]),t._v(" "),s("p",[t._v("到这里，又该有些同学迫不及待想把“天”字加上了吧。")]),t._v(" "),s("p",[s("img",{attrs:{src:_(101),alt:"objection"}})]),t._v(" "),s("p",[t._v("其实还有两个疑问：")]),t._v(" "),s("ol",[s("li",[t._v("有问题的代码是7个月前做新功能引入的，所有上线的功能都会经过QA测试、产品设计验收，为什么当时没有发现？")]),t._v(" "),s("li",[t._v("这个bug出现在首页，按理说是一个非常明显的问题，为什么7个月前上线后直到今天才突然被人发现？")])]),t._v(" "),s("p",[s("img",{attrs:{src:_(280),alt:"question"}})]),t._v(" "),s("p",[t._v("所以，真相肯定另有原因，当初是好的，最近有人改了什么东西导致这里坏掉了。")]),t._v(" "),s("p",[t._v("由于这里的文案是用模板字符串拼接得到的，因此自然联想到会不会“天”字原本是包含在workAge变量里，后面变量发生了变化导致的呢？")]),t._v(" "),s("p",[s("img",{attrs:{src:_(124),alt:"the original code"}})]),t._v(" "),s("p",[t._v("经过调查最后发现这里的workAge是来自于一个叫做userInfo的接口，而前端有关这个接口的最后改动是8个月前（早于开发新需求的时间）。也就是说，这大概率不是由于前端改动引起的，难道是后端接口发生改动了？")]),t._v(" "),s("p",[t._v("于是我带着疑问去跟负责这块的后端同学沟通，得到的答复是这个接口最近没有改动。啊，线索断了，案件突然陷入了僵局。")]),t._v(" "),s("p",[s("img",{attrs:{src:_(281),alt:"no idea"}})]),t._v(" "),s("p",[t._v("正当我一筹莫展的时候，偶然间突然听到最近有一个后端接口优化上线，这个优化任务是下掉了一批冗余接口，统一替换成了一批新接口。哦？于是我再次回到7个月前的代码检查，发现调用的接口果然发生了变化，不是一个接口了。")]),t._v(" "),s("p",[t._v("然后再次去找后端同学求证，果然，前后两个接口的workAge一个带“天”，一个不带“天”，破案了。")]),t._v(" "),s("p",[s("img",{attrs:{src:_(282),alt:"i know"}})]),t._v(" "),s("p",[t._v("在得知这个bug后，后端同学表示这是一个后端重构的bug，赶紧去修一下，准备把新接口中缺失的“天”字补上。")]),t._v(" "),s("p",[s("img",{attrs:{src:_(101),alt:"objection"}})]),t._v(" "),s("p",[t._v("且慢！这个做法是有问题的。文案是属于展示层的东西，接口返回的数据应该避免耦合展示层的逻辑。换句话说，后端接口只应该返回raw data，所有展示相关的逻辑应该统一由前端处理。否则如果将来要做国际化，做英文版，展示层的逻辑变化了，前端后端都得跟着变，这显然不合理。")]),t._v(" "),s("p",[s("img",{attrs:{src:_(283),alt:"so"}})]),t._v(" "),s("p",[t._v("所以，正确的做法，应该是修改前端代码，在模板字符串那里把缺失的“天”给补上。")]),t._v(" "),s("p",[t._v("到此，这个问题就算是解决了。真的彻底解决了吗？未必。接着我又去系统里检查了一下看还有没有用到原先老接口的workAge的逻辑，还好搜索了一遍没有发现其他的使用场景了。")]),t._v(" "),s("p",[t._v("最早在接口中返回“天”的做法，明显是因为大家在代码可维护性方面的经验不足，前后端都是如此。其实我们的代码规范里是明确提到了这一点，但也许还是不够具体，这次的bad case值得作为一个bad case写进代码规范中，让大家引以为戒。")]),t._v(" "),s("p",[t._v("这下，才算是彻底完成了。紧接着就是改代码，本地自测，提MR等等一系列操作，这个部分总共耗时不超过5分钟。")]),t._v(" "),s("h2",{attrs:{id:"修bug的三重境界"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#修bug的三重境界"}},[t._v("#")]),t._v(" 修bug的三重境界")]),t._v(" "),s("p",[t._v("不知道你有没有注意到，在上面的描述中，我把最后找到bug的根本原因叫做“破案了”，这是一个很有意思的细节，因为这个过程真的跟调查案件很像，隐秘的细节，顺藤摸瓜，抽丝剥茧，看似无辜的写法，真正的幕后黑手等等。")]),t._v(" "),s("p",[t._v("在Moka，我们都喜欢这么叫：")]),t._v(" "),s("p",[s("img",{attrs:{src:_(284),alt:"break through"}})]),t._v(" "),s("p",[t._v("单就debug这个行为而言，我观察到有三重境界。")]),t._v(" "),s("h3",{attrs:{id:"第一重：碰运气"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第一重：碰运气"}},[t._v("#")]),t._v(" 第一重：碰运气")]),t._v(" "),s("p",[t._v("就是找不到bug到底是怎么产生的，这里改一改试一试，那里改一改试一试，不断碰运气，直到突然代码work了，或者达到了符合的期望，就认为问题解决了。")]),t._v(" "),s("p",[t._v("可以想见，这种修bug的方式，bug能不能修好也是完全看运气，这肯定是不能接受的。这种状态常见于初级同学，毕竟没什么经验，debug手段也不够丰富，可如果中高级同学还是这样的状态，那肯定要被我喷死。")]),t._v(" "),s("p",[t._v("这个阶段的同学的典型特征是：一个bug要反反复复修好几遍才能修好。")]),t._v(" "),s("p",[t._v("一个有趣的现象是，候选人在面试做编程题的时候经常会这样。比如发现代码有个case过不去，就东改一点西改一点，最后把case凑出来了，观察这个过程并且随便问几个问题，你会发现他其实是没什么思考的，就跟碰运气修bug的方式一样，case跑过又能怎样呢？这样的候选人肯定无法通过我的面试的。")]),t._v(" "),s("h3",{attrs:{id:"第二重：停留在表象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第二重：停留在表象"}},[t._v("#")]),t._v(" 第二重：停留在表象")]),t._v(" "),s("p",[t._v("到了这个阶段，大家会去分析并且寻找bug原因，但往往只停留在了表面原因。比如前面的例子，bug的表面原因是代码里缺少了一个“天”字，很多同学定位到这里后，就开始着手修了。")]),t._v(" "),s("p",[t._v("这种修bug的方式，大部分情况下确实可以解决眼前的bug，但也许当前场景下是没bug了，换一个场景bug又出来了，也许这样修复了，但是导致其他地方坏了，就好像按下葫芦起了瓢。因为没有定位到根本原因，没有定位到根本原因也就没法从根本上解决问题。大部分初中级同学都停留在这个阶段，甚至可能还会为自己修bug又多又快而沾沾自喜。对于简单应用，这倒也问题不大，表面原因大概率也就是根本原因了，可是对于复杂系统，尤其是那种业务逻辑极其复杂的toB系统，幕后黑手都是隐藏的很深的，你找到的通常只是个替死鬼。")]),t._v(" "),s("p",[t._v("这个阶段的同学的典型特征是：修bug引发新bug。")]),t._v(" "),s("p",[t._v("我面试比较喜欢有toB项目经验的候选人，就是因为toB业务复杂，项目通常都比较庞大，对系统稳定性要求很高，最终导致开发维护难度很大。在这样的项目中对一个人的各方面能力都有更高的要求，修bug便是如此，否则就很容易修bug引发新bug。")]),t._v(" "),s("h3",{attrs:{id:"第三重：深入挖掘"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第三重：深入挖掘"}},[t._v("#")]),t._v(" 第三重：深入挖掘")]),t._v(" "),s("p",[t._v("故名思意，这个阶段就是在修bug的时候会挖掘问题的本质，找出根本原因。这个过程往往需要深扒代码、需求文档、issue记录，甚至需要找不同的人沟通交流，你会发现修bug的时候其实90%的时间是花在调查和思考上面，剩下10%的时间才是确定方案和具体实施。这才是我所谓的“破案”，往往都是高级或者资深的同学才会达到这种状态。")]),t._v(" "),s("p",[t._v("想必很多同学看到这里都有一个疑问，到底怎样才算是找到了bug的根本原因？我已经把bug挖掘得一清二楚了，为什么你还是觉得我没有找到根本原因呢？")]),t._v(" "),s("p",[t._v("关于这个问题，其实也像破案一样，挖掘案件真相固然是非常重要的，但我们的最终目的难道就是破案吗？不，我们的目的其实是为了避免悲剧再次重演。挖掘案件背后的动机和成因，暴露问题并推动变革，这，才是最根本的目的。")]),t._v(" "),s("p",[t._v("回到修bug本身，如果你挖掘的东西始终停留在技术层面，没有抬头看到业务、流程、规范、甚至人性等因素，你就不算真的挖掘到了问题的本质。")]),t._v(" "),s("p",[t._v("不妨问自己这样一个问题：为什么他/她当时会写出这段有bug的代码？比如：是开发同学能力、经验、意识不够吗？流程上有欠缺吗？产品逻辑不合理吗？原本的技术方案有问题吗？等等等等。")]),t._v(" "),s("p",[t._v("回答完这个问题后，再问一个：怎么做才能避免还有人写出这样有bug的代码？比如：怎么提高大家的编写代码的经验？整理最佳实践文档？加强code review？重构难以维护的代码？等等等等。")]),t._v(" "),s("p",[t._v("这两个问题都回答到位了，说明你真的进行了非常深入的思考，你真的挖掘到了问题的本质。你给出的解决方案，不但能够解决眼前的问题，而且还可以避免类似的问题再次出现，你不是在修一个bug，而是修了无数个“潜在”的bug。")]),t._v(" "),s("h2",{attrs:{id:"修bug式学习"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#修bug式学习"}},[t._v("#")]),t._v(" 修bug式学习")]),t._v(" "),s("p",[t._v("现在回过头来看看一开始的例子，最终的解决方案和一开始的本能方案，都是在前端加一个“天”字，看上去效果是一样的，但其实背后的思考天差地别。任何能够引发思考的东西，都能让人收获和成长。从这个角度上看，修bug其实也能学到很多东西的，但前提是你得思考，努力向着第三重阶段靠拢吧。")]),t._v(" "),s("p",[t._v("多思考，就酱。")]),t._v(" "),s("p",[t._v("（备注：配图来自一个我非常喜欢的游戏《逆转裁判》，墙裂推荐哦）")])])}),[],!1,null,null,null);v.default=a.exports}}]);