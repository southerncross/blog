(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{403:function(a,t,r){"use strict";r.r(t);var e=r(14),s=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"为啥要有spf、dkim、dmarc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为啥要有spf、dkim、dmarc"}},[a._v("#")]),a._v(" 为啥要有SPF、DKIM、DMARC")]),a._v(" "),t("p",[a._v("在SMTP协议中，邮件中显示的发信域名和实际发信域名是可以不相同的。比如，A将邮件的from字段设置成B然后发邮件给C，C收到邮件就会以为是B发来的。这个机制有非常大的安全隐患，比如不法分子可以伪造身份给任何人发邮件。SPF，DKIM，DMARC就是为了解决这个问题而被提出的。")]),a._v(" "),t("p",[a._v("其中SPF和DKIM是两种具体的域名验证方式，而DMARC是"),t("strong",[a._v("基于SPF和DKIM的协议")]),a._v("。打个不恰当的比喻，DMARC是销售，负责游说客户，自己本身不负责具体开发业务，SPF和DKIM一个是前端一个是后端，负责具体业务开发。DMARC依赖SPF和DKIM，但光有SPF和DKIM也干不成事。")]),a._v(" "),t("h1",{attrs:{id:"spf-sender-policy-framework"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#spf-sender-policy-framework"}},[a._v("#")]),a._v(" SPF（Sender Policy Framework）")]),a._v(" "),t("p",[a._v("SPF的原理比较像白名单。假设A公司的邮箱域名是a.com，由于A公司树大招风，经常有小人伪造a.com的身份发邮件，让A公司的老板苦不堪言。于是乎，A公司向全社会宣布：大家注意啊，只有ip地址是XXX的发信服务器才有资格说自己发的邮件是a.com来的，其他都是假的！此番过后，收件方看到来源是a.com的邮件，只要对比发信服务器的ip与a.com的SPF记录就知道是不是伪造的了，美滋滋。")]),a._v(" "),t("h1",{attrs:{id:"dkim-domainkeys-identified-mail"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dkim-domainkeys-identified-mail"}},[a._v("#")]),a._v(" DKIM（DomainKeys Identified Mail）")]),a._v(" "),t("p",[a._v("DKIM的原理比较像防伪码。还是刚才那个A公司，它又想到一个方案：他给所有发出的邮件中都附带上一个防伪码，然后向全社会宣布：大家拿到防伪码可以登陆我司网站输入防伪码验证！而且他们专门把防伪码粘在了信封口且一旦揭开就无法再粘贴，以此保证防伪码与邮件一一对应。此番过后，收件方看到来源是a.com的邮件，撕下信封口的防伪码，登陆网站验证一下就知道是不是伪造的了，美滋滋。")]),a._v(" "),t("h1",{attrs:{id:"dmarc-domain-based-message-authentication-reporting-and-conformance"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dmarc-domain-based-message-authentication-reporting-and-conformance"}},[a._v("#")]),a._v(" DMARC（Domain-based Message Authentication, Reporting and Conformance）")]),a._v(" "),t("p",[a._v("A公司发明了SPF，向社会宣布了一次，之后发明了DKIM，又向社会宣布了一次。每一次都要开新闻发布会、买头条、写软文，成本可不低。老板想这以后如果每发明一个防伪技术都要这么折腾一次我可受不了，于是乎想了个办法，一次性告诉全社会：我们采用了防伪技术，究竟有什么防伪手段以及怎么用都白纸黑字贴在公司大门口了，大家以后如果要验证是不是伪造的，就去公司大门口看一下说明书吧。这个说明书就是DMARC。")]),a._v(" "),t("p",[a._v("除此以外，DMARC还增加了举报功能，如果有人发现了伪造A公司的发信ip，就可以直接上报给A公司，便于后续调查。")]),a._v(" "),t("h1",{attrs:{id:"spf、dkim、dmarc的关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#spf、dkim、dmarc的关系"}},[a._v("#")]),a._v(" SPF、DKIM、DMARC的关系")]),a._v(" "),t("p",[a._v("SPF和DKIM是两种具体的邮件域名认证协议，DMARC是告诉大家当前邮件域名是启用了SPF还是DKIM还是二者都启用了。")]),a._v(" "),t("p",[a._v("SPF和DKIM的验证方式有所不同，二者有不同的适用场景。比如某个公司把一部分邮件发信服务外包给了第三方，如果使用DKIM，则必须把私钥交给三方（以便生成签名），这通常是不现实的，因为私钥是不能交给第三方的。此时如果使用SPF，那么只需要将第三方的发信ip添加到SPF记录里就行了。")]),a._v(" "),t("h1",{attrs:{id:"邮件の旅行-旅行邮件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#邮件の旅行-旅行邮件"}},[a._v("#")]),a._v(" 邮件の旅行（旅行邮件）")]),a._v(" "),t("p",[a._v("为了更明白地解释，这里举一个例子。")]),a._v(" "),t("p",[a._v("一封邮件（from=xxx@a.com, to=yyy@b.com），被发送到了收件服务器b.com那里。")]),a._v(" "),t("p",[a._v("收件服务器向DNS查询发信域名a.com的DMARC规则，如果a.com没有配置DMARC，没有需要验证的，直接放行。如果a.com配置了DMARC规则，那么根据其配置的DMARC规则继续查询a.com的SPF或DKIM记录（或者二者都有）。接着依次根据配置好的规则（SPF和DKIM）进行校验，如果成功则放行，否则失败。")]),a._v(" "),t("p",[a._v("看以看到，如果一个邮件发信域名配置了DMARC认证规则，其他人想要伪造发信，基本是不可能了。")])])}),[],!1,null,null,null);t.default=s.exports}}]);