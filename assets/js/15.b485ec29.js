(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{315:function(t,s,r){t.exports=r.p+"assets/img/zoom_in.9d6b1060.png"},316:function(t,s,r){t.exports=r.p+"assets/img/half_screen.2e34f2ee.png"},317:function(t,s,r){t.exports=r.p+"assets/img/full_screen.0a47f15e.png"},318:function(t,s,r){t.exports=r.p+"assets/img/zoom_in_400.51de3443.png"},319:function(t,s,r){t.exports=r.p+"assets/img/screen_1280.02fb9523.png"},320:function(t,s,r){t.exports=r.p+"assets/img/viewport_853.1a3fc725.png"},321:function(t,s,r){t.exports=r.p+"assets/img/zoom_in_chrome.0d7784b9.png"},424:function(t,s,r){"use strict";r.r(s);var e=r(14),a=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("做网页开发的同学可能都遇到过这种问题：用户也许是嫌文字太小看不清，就用浏览器整体放大了页面，结果一放大页面的展示就乱了。")]),t._v(" "),s("p",[s("img",{attrs:{src:r(315),alt:"放大后页面乱了"}})]),t._v(" "),s("p",[t._v("这个时候，产品经理或者是设计师可能就会幽幽地找上你，“能不能让咱们的页面也能在缩放时保持优雅呢？”，这。。。")]),t._v(" "),s("p",[t._v("显然，浏览器有一套专门的缩放渲染逻辑，可是这个渲染逻辑是怎样的呢？")]),t._v(" "),s("h2",{attrs:{id:"浏览器是怎么放大-或缩小-的呢"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器是怎么放大-或缩小-的呢"}},[t._v("#")]),t._v(" 浏览器是怎么放大（或缩小）的呢？")]),t._v(" "),s("p",[t._v("先来看一个有趣的现象。这是一个页面的原始大小：")]),t._v(" "),s("p",[s("img",{attrs:{src:r(316),alt:"原始图片"}})]),t._v(" "),s("p",[t._v("这是将浏览器窗口变大为原来的两倍，同时将页面缩放为原来的200%的效果：")]),t._v(" "),s("p",[s("img",{attrs:{src:r(317),alt:"2倍窗口2倍放大"}})]),t._v(" "),s("p",[t._v("你会发现，这两个图片的展示效果几乎一样哎。也就是：")]),t._v(" "),s("blockquote",[s("p",[t._v("屏幕尺寸变大2为倍，浏览器缩放比调整为200%，显示效果跟原来相同（1倍屏幕尺寸，100%缩放倍数）")])]),t._v(" "),s("p",[t._v("于是就有个大胆的猜测，那是不是有这样的一个公式呢？")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("显示效果 = 屏幕尺寸 / 缩放倍数\n")])])]),s("p",[t._v("也就是说，如果当前页面缩放为120%，那么其展示效果等效于将浏览器窗口缩小为原来的1/120%。也就是放大其实等效于是在缩小！因缺思厅。")]),t._v(" "),s("p",[t._v("这也就解释了为什么那些有媒体查询的网站，如果你不停地放大，反而会触发小屏幕的媒体查询效果。比如你可以打开"),s("a",{attrs:{href:"https://css-tricks.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSS-TRICKS"),s("OutboundLink")],1),t._v("的首页放大试试。")]),t._v(" "),s("p",[t._v("比如这个页面放大到400%，可以看到已经变成移动端布局了：")]),t._v(" "),s("p",[s("img",{attrs:{src:r(318),alt:"缩放400%变成移动端布局"}})]),t._v(" "),s("p",[t._v("那么事情是不是这样呢？这里做了一个实验。这是原始的页面，可以看到当前viewport的宽度是1280。")]),t._v(" "),s("p",[s("img",{attrs:{src:r(319),alt:"原始图片"}})]),t._v(" "),s("p",[t._v("假如我们将页面缩放至150%，那么理论上就等效于是将viewport缩小为原来的"),s("code",[t._v("1/150%")]),t._v("即853.3333。")]),t._v(" "),s("p",[t._v("现在我们将页面缩放为原来的150%，可以看到此时viewport已经变成了853。")]),t._v(" "),s("p",[s("img",{attrs:{src:r(320),alt:"放大150%之后"}})]),t._v(" "),s("p",[t._v("此外也测试了一下同样场景firefox的表现，也是一样的，只不过有一些误差罢了。所以到此就差不多就印证了那个猜想。")]),t._v(" "),s("p",[t._v("也就是说，所谓浏览器的放大，其实可以这样模拟：")]),t._v(" "),s("ol",[s("li",[t._v("将viewport缩小至原来的1/x，其中x为浏览器缩放倍数")]),t._v(" "),s("li",[t._v("渲染页面")]),t._v(" "),s("li",[t._v("将渲染好的页面等比例再拉伸至真实的窗口大小")])]),t._v(" "),s("p",[t._v("第三步中，svg、字体等矢量元素是可以无损放大的，显示效果依然锐利，只不过像位图一类的东西，放大以后就变模糊了。")]),t._v(" "),s("p",[t._v("ps：上面说的都是放大，缩小也是一样的。")]),t._v(" "),s("p",[s("img",{attrs:{src:r(321),alt:"有人总结"}})]),t._v(" "),s("p",[t._v("熟悉SVG的同学可能突然意识到，这跟SVG的viewport渲染流程好像啊，没错。（不熟悉的同学可以看张鑫旭大佬的"),s("a",{attrs:{href:"https://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/",target:"_blank",rel:"noopener noreferrer"}},[t._v("这篇文章"),s("OutboundLink")],1),t._v("）")]),t._v(" "),s("h2",{attrs:{id:"如何写出兼容浏览器缩放的页面呢"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何写出兼容浏览器缩放的页面呢"}},[t._v("#")]),t._v(" 如何写出兼容浏览器缩放的页面呢")]),t._v(" "),s("p",[t._v("知道了浏览器缩放的流程后，这个问题的答案也就呼之欲出了，其实跟适配不同屏幕尺寸的效果是一样的。比如你想看看用户如果放大到120%页面会是什么样子，那就把浏览器窗口缩小到原来的1/120%就行了。")]),t._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://css-tricks.com/best-way-programmatically-zoom-web-application/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Best Way to Programmatically Zoom a Web Application"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=a.exports}}]);