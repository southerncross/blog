---
title: i18n与lingui-js总结
date: 2019-08-30 00:11:51
tags: React, i18n
---

# 国际化的基本原理

假设下面一段代码，要怎么国际化呢？

```js
console.log('你好');
```

一种常见思路是使用一个translate方法进行翻译，比如：

```js
// translate方法用来把中文翻译为英文
console.log(translate('你好'));
```

translate方法的实现逻辑也很简单，大致就是拿一个汉英大字典，将中文转换成英文，例如：

```js
// dictionary.js
const dictionary = {
  '你好': 'You ok',
};

// index.js
function translate(message, dictionary) {
  return dictionary[message];
}
```

这就是国际化的基本原理．

# 国际化方案 1.0

通过上面的分析我们知道，国际化的重要内容是构造一个汉英大字典，那么如何构造呢？代码里各种字符串，我怎么知道哪些需要翻译呢？
常见的做法是使用特殊的写法将需要翻译的字符串标记出来，然后借助babel等工具对代码做一次预处理，将需要翻译的文本＂提取＂出来：

```js
console.log(mark('你好')); // 借助babel plugin，我们先将mark对应的文本提取出来，然后将mark偷偷去掉，嘿嘿嘿
```

这个过程，就叫做**extract**

当我们提取了对应的文本后，就会得到一个空的汉英字典：

```js
const dictionary = {
  '你好': '',
  '我好': '',
  '大家好': '',
};
```

下一步就是找翻译人员将字典补充完整：

```js
const dictionary = {
  '你好': 'You ok',
  '我好': 'I ok',
  '大家好': 'We ok',
};
```

最终的代码大致是这样：

```js
import dictionary from './dictionary.js';
import { mark, translate } from './i18n.js';

console.log(translate(mark('你好'), dictionary));
```

聪明如你肯定会想到，既然如此，不如把translate和mark合二为一吧，比如这样：

```js
import dictionary from './dictionary.js';
import { t } from './i18n.js';

console.log(t('你好', dictionary)); // mark和translate合成了一个t
```

甚至dictionary也可以做成配置项，隐式调用，比如：

```js
import dictionary from './dictionary.js';
import { setDictionary, t } from './i18n.js';

setDictionary(dictionary);

console.log(t('你好')); // dictionary隐式生效
```

看上去不错哦，极大提升了开发效率．不过需要注意的是，单独的mark和translate仍然是有意义的,因为有些翻译场景需要处理的文本是个变量，只能在运行时确定:

```js
mark('男'); // 为了能正常提取待翻译文本,这里先将gender所有可能的值都标记下来
mark('女');

console.log(translate(gender)); // gender是变量,变量只有在runtime才能够确定
```

# 国际化方案 2.0

上面的方法有个问题，只支持对常量文本的翻译:

```js
str = t('小明喜欢篮球吗？'); // 这能支持常量文本
str = t(`${name}喜欢${sport}吗?`); // 这种是不支持的，想想为什么
```

如果遇到带变量的文本，我们只能在变量处切割文本，然后对每一小片单独翻译

```js
str = name + t('喜欢') + sport + t('吗?');
```

不过这样做的效果有可能很差，首先是构造的字典非常琐碎对翻译人员很不友好：

```js
const dictionary = {
  '喜欢': 'like',
  '吗?': '?', // 翻译人员：臣妾也无能为力啊
}
```

其次是拼接出来的语序未必符合英文语法，比如上面的例子就会得到：

```
XiaoMing like basketball?
```

这显然不是一个好的结果，正常的翻译结果应该是：

```
Does XiaoMing like basketball?
```

要解决这个问题，我们的汉英字典就需要升级，要支持嵌套变量，比如：

```js
const dictionary = {
  '{name}喜欢{sport}吗?': ''
};
```

此外我们的字典要支持变量插入：

```js
const dictionary = {
  '{name}喜欢{sport}吗?': (values) => { // 字典的value已经不是一个单纯的文本，而是一个可以传入参数的callback方法．
    return `Does ${values.name} like ${values.sport}?`;
  }
};

// 此时的t还负责执行字典的方法
function t(message, values) {
  return dictionary[message](values);
}

// t的用法
t('{name}喜欢{sport}吗?', { name: 'XiaoMing', sport: 'basketball' });
```

构造新的字典不光是翻译，还要生成对应的callback．这个过程叫**compile**．

实际情况中可不只是简单的替换变量就行了，有时候还涉及到时态，单复数，序数等变种．那如何统一规则呢？答案是使用统一的ICU format书写message．
ICU format就是专门用来解决这个问题存在的，它是一个通用的格式，有一定的语法，就好比markdown一样．使用这种格式构造字典并实现翻译逻辑，就能完美解决我们的问题了！

当然，这个方案有个fallback的小缺陷．

```js
t('你好') // 对中文的翻译，如果字典的翻译缺失，大不了把中文直接展示出来即可（fallback到message）
t('{name}喜欢{sport}吗?', { name: 'XiaoMing', sport: 'basketball' }); // 由于'{name}喜欢{sport}吗?'不是一个合法的string，所以如果字典缺失，fallback到message，只能显示一段'{name}喜欢{sport}吗?'类似的文本．
```

也就是说，只要有遇到带文本变量嵌套的翻译文本，就必须构造一次字典，以保证待翻译的文本在字典里能够找得到．

# 国际化方案 3.0

让我们在仔细看看我们目前的方案：

```js
str = `${name}喜欢${sport}吗?`; // 国际化以前

str = t('{name}喜欢{sport}吗?', { name, sport }) // 国际化以后
```

上面的方案虽然解决了问题，但对开发人员很不友好啊，国际化之前和国际化之后的写法也差太多了，而且很不直观．怎么办呢？

答案是借助babel的力量，在编译阶段替我们做一些事情，比如：

```js
str = t(`${name}喜欢${sport}吗?`) // 原始写法

str = t('{name}喜欢{sport}吗?', { name, sport }) // babel-plugin处理后的代码
```

太棒了，这下我们既能保证开发的友好程度，又能做到国际化了！
但仔细想想，这个bebel-plugin该怎么写呢？且听下回分解．

# 总结

1. 国际化就是查字典
2. mark收集（预处理阶段），translate翻译（运行时阶段）
3. ICU format & 优化的babel-plugin写法
