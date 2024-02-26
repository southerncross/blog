(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{410:function(e,s,_){"use strict";_.r(s);var t=_(14),v=Object(t.a)({},(function(){var e=this,s=e._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("p",[e._v("本文翻译自"),s("a",{attrs:{href:"http://dreamsongs.com/RiseOfWorseIsBetter.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("The Rise of Worse is Better"),s("OutboundLink")],1)]),e._v(" "),s("blockquote",[s("p",[e._v("Worse is Better 是一种软件开发思想，大意是在软件开发的时候最好是先从一个最简的设计开始，然后逐渐扩展增长。这种思想的另一种叫法是“渐进式增长”。")])]),e._v(" "),s("p",[e._v("我和很多Common Lisp的设计者一样都有一种非常强烈的设计倾向。这种设计倾向的核心是：一定要做"),s("strong",[e._v("正确")]),e._v("的事情。也就是说，一个好的设计应当满足下列特性：")]),e._v(" "),s("ul",[s("li",[e._v("简单。接口和实现都应该是简单的，但是接口简单比实现简单更重要。")]),e._v(" "),s("li",[e._v("正确。这是最重要的特性，必须能正确处理各种已知的情况，错误是不能容忍的。")]),e._v(" "),s("li",[e._v("一致。与正确一样重要，为了达到一致，简单和完备的要求可以适当放松。")]),e._v(" "),s("li",[e._v("完备。应该尽可能多地覆盖各种实际场景，提供完备的功能。")])]),e._v(" "),s("p",[e._v("相信大部分人都认可上面的特性是好的特性。使用这种哲学进行设计，我姑且称之为MIT派。Common Lisp和Scheme就是MIT派的例子。")]),e._v(" "),s("p",[e._v("而 worse-is-better 则稍微有些不同：")]),e._v(" "),s("ul",[s("li",[e._v("简单。接口和实现都应该是简单的。"),s("strong",[e._v("但是实现简单比接口简单更重要。简单是最重要的特性。")])]),e._v(" "),s("li",[e._v("正确。当然要能正确处理各种情况，"),s("strong",[e._v("但正确不是最重要的，简单才是。")])]),e._v(" "),s("li",[e._v("一致。当然要尽量一致，"),s("strong",[e._v("但这个不是很重要，只要不是太离谱就能接受。")])]),e._v(" "),s("li",[e._v("完备。当然要尽可能多地覆盖实际场景，"),s("strong",[e._v("但这个重要性就更低了，这是最不重要的特性。")]),e._v("。")])]),e._v(" "),s("p",[e._v("早期的Unix和C语言就是这种设计哲学的产物，我姑且称他们是New Jersey派。从worse-is-better这个讽刺的名字上就可以看出我本人是很瞧不起它的，worse-is-better很差劲，New Jersey派就是垃圾。")]),e._v(" "),s("p",[e._v("然而即使我再瞧不起它，我也不得不承认，在生存这一点上，“worse-is-better”比“只做正确的事”要更成功。尤其在软件开发领域，New Jersey派是比MIT派更成功的。")]),e._v(" "),s("p",[e._v("让我讲一个故事。")]),e._v(" "),s("p",[e._v("有两个大佬，一个来自MIT，另一个来自Berkeley（Unix用户），某天他俩聚在一起讨论操作系统的问题。")]),e._v(" "),s("p",[e._v("MIT的哥们对ITS（MIT AI实验室的操作系统）很熟悉，最近他正在读Unix操作系统的源码，因为他对Unix系统如何解决电脑的loser-ing问题很感兴趣。所谓的loser-ing问题指的是当用户编写的程序调用system routine去执行一个非常耗时的操作（比如IO操作）时，如果碰巧出现了一个中断，那么用户程序的状态必须要被保存起来。因为system routine通常是单条指令，用户程序很难在此期间捕获到进程的状态并加以保存，所以当这种情况发生时，system routine只能要么回滚，要么继续执行。正确的做法是回滚到开始前的调用位置，这样当中断结束后就程序还可以继续执行，重新再调用system routine。这个问题被叫做loser-ing问题，因为此时计算机已经进入了所谓的loser模式，其中loser是MIT对计算机用户的“爱称”。")]),e._v(" "),s("p",[e._v("MIT的哥们在代码里找了半天也没有看到任何有关处理loser-ing的部分，于是他向New Jersey哥们请教。New Jersey哥们说，我们Unix开发者知道这个问题，但是我们的做法是让system routine继续执行，只不过在会执行完成之后返回一个错误表示。用户写的程序应该负责捕获这个错误并且主动重试这个system routine。")]),e._v(" "),s("p",[e._v("MIT哥们对这个回答不太满意，因为他认为这不是一个“正确”的做法。New Jersey哥们争论说Unix的解决方法才是对的，因为Unix的设计哲学是简单，而你说的所谓“正确”的东西太复杂了，并且对于软件开发者来说，在代码里增加几行对错误的处理又不是什么难事。MIT老哥说，这样做虽然实现起来非常简单，可功能的接口复杂了，用户还需要考虑错误情况。总之就是，他俩在接口和实现谁的简单性更重要上产生了分歧。")]),e._v(" "),s("p",[e._v("MIT哥们嘀咕了一句“有时候强硬的人才能做出鲜嫩的鸡肉”，但是New Jersey哥们没有听懂（我也不知道我自己是不是懂了）")]),e._v(" "),s("blockquote",[s("p",[e._v("原文是：Sometimes it takes a touch man to make a tender chicken. 这是一句美国鸡肉食品生产商的广告标语，大义是只有严格的标准才能生产出高品质的鸡肉。")])]),e._v(" "),s("p",[e._v("故事讲完了，现在我想说的是worse-is-better其实更好。C语言是被设计用来实现Unix的语言，并且这个语言就是New Jersey派的。因此C语言本身的编译器比较容易实现，编程人员也比较容易写出能被编译执行的程序（甚至就有些人说C语言只是汇编语言换了个皮肤而已）。早期的Unix和C编译器都有着非常简单的结构，非常容易移植，对计算机的硬件资源占用很低，50%~80%用户想要的功能它都可以被满足。")]),e._v(" "),s("p",[e._v("当时计算机的性能还很孱弱，但是Unix和C在上面却可以很好的运行。worse-is-better的哲学认为实现的简单是最重要的，于是C和Unix可以很容易地被移植到不同的机器上。结果就是，即使Unix和C只能满足人们50%的需求，人们也会在各种地方使用他们，事实证明确实如此。")]),e._v(" "),s("p",[e._v("Unix和C才是计算机病毒啊。")]),e._v(" "),s("p",[e._v("worse-is-better的更深远的意义在于开发者的定制性更强，比如在移动设备上牺牲一定的安全性换取更好的性能或者更低的资源占用。New Jersey派的软件在各种配置的机器上都可以很好地运行，代码也都比较容易移植，为什么，因为这些程序本身就是基于病毒制作出来的啊。")]),e._v(" "),s("p",[e._v("如果最初的软件本身还算凑合，只要它是可移植的就一定会被传播，而只要它传播了作者就会想办法改进它让他变得更好，比如将它能满足的功能提升到90%，用户直观地感受到了worse is better的好处。总结一下，采用worse-is-better思想开发的软件，首先是能被用户接受，然后会降低用户的期望，最后是逐渐改进直到成为“正确的事情”。一个实际的例子是，Lisp的编译器在1987年跟C编译器各方面都差不多，但却有更多的人去优化C编译器。")]),e._v(" "),s("p",[e._v("worse-is-better还有一个好处。因为New Jersey语言和系统本身能力有限，无法做出一个庞大的复杂软件，因此大型系统只能被设计成多个部分组合，组件复用，集成能力更强。")]),e._v(" "),s("p",[e._v("那么“只做正确的事”有没有什么例子吗？我所知是有两个场景，一个是复杂系统场景，一个是钻石型场景。")]),e._v(" "),s("p",[e._v("复杂系统场景像是这样：")]),e._v(" "),s("p",[e._v("首先，设计要正确，这花费和很多时间。然后，实现部分也要经过充分的设计。最终，是实现过程。因为是正确的，设计非常完备，能满足接近100%的需求，这导致实现起来会相对复杂，实现最终可能会花费非常长的时间。最终做出来的整个系统庞大而复杂，虽然能符合100%的要求，但是为了实现其中20%的功能可能花了80%的精力。与worse-is-better相比，早就被淘汰了。")]),e._v(" "),s("p",[e._v("钻石型场景像是这样：")]),e._v(" "),s("p",[e._v("钻石有很多面，虽然每个面都很小，但是数量庞大。这样设计出来的实现难度可想而知，几乎是不可能的事情。")]),e._v(" "),s("p",[e._v("以上两个场景分别对应了Common Lisp和Scheme。第一个场景通常也是典型的AI软件的场景。")]),e._v(" "),s("p",[s("strong",[e._v("正确的东西通常是一个大的整体，要做到这一点，我们未必从一开始就要完整地设计并做到100%，更明智的做法是先做好一小部分，例如50%，然后开始传播他，让人们使用它习惯他，在这个过程中不断改进直到最后达到90%的程度。")])]),e._v(" "),s("p",[e._v("对了，你可别看了这篇文章就去决定以后用C写AI的程序了，AI领域是个例外。")])])}),[],!1,null,null,null);s.default=v.exports}}]);