(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{236:function(t,s,e){"use strict";function n(t=""){const s=function(t=""){const s=t.match(/\/(\d{4})\/(\d{2})\//);return s?{year:Number(s[1]),day:Number(s[2])}:null}(t);return s?s.year+"/"+s.day:"N/A"}function a(t){const s=new Date(t);return[s.getFullYear(),s.getMonth()+1,s.getDate()].join("/")}e.d(s,"a",(function(){return n})),e.d(s,"b",(function(){return a}))},240:function(t,s,e){},241:function(t,s,e){},242:function(t,s,e){},247:function(t,s,e){"use strict";e(240)},248:function(t,s,e){"use strict";e(241)},249:function(t,s,e){"use strict";e(242)},252:function(t,s,e){"use strict";e.r(s);var n=e(236),a={name:"PostContent",props:{post:Object},methods:{getDateStringFromPath:n.a,getPostDateString:n.b,getNavLink:(t,s)=>`${t}#${s.toLowerCase().replace(/ /g,"-")}`}},i=(e(247),e(248),e(249),e(14)),r=Object(i.a)(a,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"container"},[s("div",{staticClass:"header"},[s("h1",{staticClass:"title"},[t._v(t._s(t.post.title))]),t._v(" "),s("div",{staticClass:"date-and-tags"},[t.post.frontmatter.date?s("span",{staticClass:"date"},[t._v(t._s(t.getPostDateString(t.post.frontmatter.date)))]):t._e(),t._v(" "),t.post.frontmatter.tags?s("span",{staticClass:"tags"},t._l(t.post.frontmatter.tags.split(" "),(function(e){return s("span",{key:e,staticClass:"tag"},[t._v(t._s(e))])})),0):t._e()])]),t._v(" "),t.post.headers?s("ul",{staticClass:"sidebar"},t._l(t.post.headers.filter(t=>2===t.level),(function(e){return s("li",{key:e.title,staticClass:"sidebar-item"},[s("a",{attrs:{href:t.getNavLink(t.post.path,e.title)}},[t._v(t._s(e.title))])])})),0):t._e(),t._v(" "),s("div",{staticClass:"content"},[s("Content")],1),t._v(" "),s("div",{staticClass:"comment"},[s("Vssue")],1)])}),[],!1,null,"63da4bd6",null);s.default=r.exports}}]);