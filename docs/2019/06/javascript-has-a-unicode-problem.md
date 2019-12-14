---
title: javascript的unicode问题
date: 2019-06-28 14:26:27
tags: javascript unicode
---

本文翻译自https://mathiasbynens.be/notes/javascript-unicode

---

Javascript处理Unicode的方式，说实话比较迷。所以这篇文章主要针对这个问题做一些解释，另外看看es6是怎么改进的。

## Unicode基础

在我们继续深入讨论之前，让我们先拉平一下Unicode的认知。

理解Unicode的最简单那的方式就是将它想象成一个数据库，里面存着各式各样的符号以及他们对应的唯一id，这个id被叫做code point，此外还存了他们唯一的名字。这样，当我们要表达某个符号的时候，只要给出对应的code point就可以了。比如：

当我们说：U+0041，别人就知道我们想要表达的是符号A
当我们说：U+1F4A9，别人就知道我们想要表达的符号是💩

Code point通常都是以U+开头的十六进制数字表示，至少有4位，不足的会在前面补0。

Code point的范围是U+0000到U+10FFFF，可以容纳超过110万个字符。为了合理组织和利用，Unicode将这个范围划分成了17个部分（Plane），每个部分大约有6万5前个字符。

第一个部分（U+0000至U+FFFF），叫做Basic Multilingual Plane（BMP）。这是最重要的一个部分，因为它包含了绝大多数常用的符号。如果你是在用英语写作，那你很有可能不会用到BMP之外的符号。跟其他分区一样，这个分区也有大约6晚5千个字符。

除了BMP，剩下的部分（U+010000至U+10FFFF）大概有110万个字符。属于这部分的分区被称作增补分区（supplementary planes或astral planes）。

很容易判断一个字符是否来自增补分区，那就是看它对应的十六进制数字的位数是否超过了4位。

好了，现在我们已经有了Unicode常识，接下来看看Javascript是如何处理字符串的。

## 转义序列

你应该见过这种东西：
```
>> '\x41\x42\x43'
'ABC'

>> '\x61\x62\x63'
'abc'
```

这种东西被称作“十六进制转义序列”（hexadecimal escape sequence）。它是由2位的十六进制数字来对应code point的，例如\x41对应U+0041（大写字母A）。因为只有2位，所以它只能用来对应U+0000到U+00FF的code point。

另一种常见的转移字符形式是这样的：
```
>> '\u0041\u0042\u0043'
'ABC'

>> 'I \u2661 JavaScript!'
'I ♡ JavaScript!'
```

这种东西被称作“Unicode转义序列“。它是由4位的十六进制数字来表示code point的。例如\u2261表示的是U+2261（心型符号）。因为是4位，所以能表示U+0000到U+FFFF范围的code point，也就是完整的BMP。

现在问题出现了，如果是非BMP字符（增补分区），我们需要超过4位的十六进制数字，那么要怎么做呢？

在ES6中，事情就很好办了。因为ES6引入了一种新的转移序列，叫做“Unicode code point转义序列”。举个例子：
```
>> '\u{41}\u{42}\u{43}'
'ABC'

>> '\u{1F4A9}'
'💩' // U+1F4A9 PILE OF POO
```

可以看到，在大括号中间，你可以使用最多6个十六进制数字，足够表示所有的Unicode code point了。也就是说，你可以用这种方式表示任意Unicode字符。

对于ES5甚至更老的环境，为了兼容性，有个倒霉的解决方式叫做“替换对儿”（surrogate pairs）：
```
>> '\uD83D\uDCA9'
'💩' // U+1F4A9 PILE OF POO
```

如上所示，一个code point会被拆分成两部分，不妨就叫做surrogate code point，换句话说，surrogate code point合在一起共同表示一个原始code point。

需要注意的是，surrogate code point跟原始code point长得很不一样。这两者是通过运算公式相互转换的。

通过使用surrogate pairs，现在我们总算是可以表达非BMP字符了。但问题是，用一个转移字符表示BMP和用两个转移字符表示非BMP，这两种方式在写法上没任何区别，十分令人迷惑，并且引发了一系列问题。

## 数一数Javascript中字符串有多少个Unicode符号

假设你要计算一个给定字符串的长度，你会怎么做呢？
```
>> 'A'.length // U+0041 LATIN CAPITAL LETTER A
1

>> 'A' == '\u0041'
true

>> 'B'.length // U+0042 LATIN CAPITAL LETTER B
1

>> 'B' == '\u0042'
true
```

在上面的例子中，字符串的.length属性反应的是字符串中字母的个数。如果我们使用转移序列表示这些字符，那么一个字符刚好对应一个转义符号。但有时候却不是这样：
```
>> '𝐀'.length // U+1D400 MATHEMATICAL BOLD CAPITAL A
2

>> '𝐀' == '\uD835\uDC00'
true

>> '𝐁'.length // U+1D401 MATHEMATICAL BOLD CAPITAL B
2

>> '𝐁' == '\uD835\uDC01'
true

>> '💩'.length // U+1F4A9 PILE OF POO
2

>> '💩' == '\uD83D\uDCA9'
true
```

这是因为Javascript使用surrogate pairs表示了非BMP字符，并且这些“半个surrogate pairs”看上去就像一个独立的字符一样。这种结果非常令人迷惑，因为肉眼看上去无法分辨，只知道是一堆Unicode字符。

## 数一数Javascript中字符串有多少个非BMP符号

回到刚才那个问题，如何精确计算Javascript字符串中有多少个Unicode符号呢？现在我们知道了，关键是要正确识别出其中哪些是surrogate pairs，然后把这些pairs当成是一个符号。下面是一个简单的例子：
```js
var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function countSymbols(string) {
  return string
    // Replace every surrogate pair with a BMP symbol.
    .replace(regexAstralSymbols, '_')
    // …and *then* get the length.
    .length;
}
```

或者你可以用Punycode.js这个库（随node一起发布），先把Javascript字符串转换成一组Unicode code point，然后统计有多少个code point，就像这样：
```js
function countSymbols(string) {
  return punycode.ucs2.decode(string).length;
}
```

如果是ES6，你还可以用`Array.from`，它会使用字符串迭代器对字符串进行切割，数组中每个元素都是一个符号。
```js
function countSymbols(string) {
  return Array.from(string).length;
}
```

或者使用spread运算符
```js
function countSymbols(string) {
  return [...string].length;
}
```

使用上面任意一种方法，我们都能够正确计算出字符串中有多少个符号。
```js
>> countSymbols('A') // U+0041 LATIN CAPITAL LETTER A
1

>> countSymbols('𝐀') // U+1D400 MATHEMATICAL BOLD CAPITAL A
1

>> countSymbols('💩') // U+1F4A9 PILE OF POO
1
```

## 哪些长得很相似的符号

还有更头疼的事情，计算字符串中符号的数量实际上复杂多了。比如下面这个例子：
```js
>> 'mañana' == 'mañana'
false
```

Javascript说这两个字符串是不一样的，但是明明看着没区别呀，这是怎么回事！

![](https://mathiasbynens.be/_img/javascript-unicode/js-escapes-manana.png)

使用[escape tool](https://mothereff.in/js-escapes#1ma%C3%B1ana%20man%CC%83ana)这个工具，我们就能找到原因了。
```js
>> 'ma\xF1ana' == 'man\u0303ana'
false

>> 'ma\xF1ana'.length
6

>> 'man\u0303ana'.length
7
```

第一个字符串包含了一个U+00F1 LATIN SMALL LETTER N WITH TILDE，但是第二个字符串包含有两个独立的code point（U+006E LATIN SMALL LETTER N和U+0303 COMBINING TILDE）组合在一起形成一样的图案。这就是为什么明明他们看上去一样，`.length`却不一样。

但是，如果你按照人类的正常思维去数到底有多少符号，上面两个字符串的结果都是6，这又是什么鬼呢？

在ES6中，答案是很简单的：
```js
function countSymbolsPedantically(string) {
  // Unicode Normalization, NFC form, to account for lookalikes:
  var normalized = string.normalize('NFC');
  // Account for astral symbols / surrogates, just like we did before:
  return punycode.ucs2.decode(normalized).length;
}
```

这个`normalize`方法的效果是使所有长得类似的Unicode都统一成一个（Unicode normalization）。如果一个code point对应的符号跟两个code points对应的符号组合在一起长得差不多，那么他们就会被统一成一个code point。
```js
>> countSymbolsPedantically('mañana') // U+00F1
6
>> countSymbolsPedantically('mañana') // U+006E + U+0303
6
```

对于ES5和更老的环境，可以使用polyfill达到同样的功能。

## 好多个组合标记

上面的方法仍然不够完美，因为可能同时有很多个字符组合在一起，而且没有对应的normalize形式，这种时候normalize方法就没用了。比如：
```js
>> 'q\u0307\u0323'.normalize('NFC') // `q̣̇`
'q\u0307\u0323'

>> countSymbolsPedantically('q\u0307\u0323')
3 // not 1

>> countSymbolsPedantically('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞')
74 // not 6
```

当然你可以用一些鸡贼的方法，比如用正则表达式剔除掉组合字符然后得到正确的结果：
```js
// Note: replace the following regular expression with its transpiled equivalent
// to make it work in old environments. https://mths.be/bwm
var regexSymbolWithCombiningMarks = /(\P{Mark})(\p{Mark}+)/gu;

function countSymbolsIgnoringCombiningMarks(string) {
  // Remove any combining marks, leaving only the symbols they belong to:
  var stripped = string.replace(regexSymbolWithCombiningMarks, function($0, symbol, combiningMarks) {
    return symbol;
  });
  // Account for astral symbols / surrogates, just like we did before:
  return punycode.ucs2.decode(stripped).length;
}
```

上面这个方法会先剔除那些组合符号，然后再统计符号个数，这个方法甚至对ES3都可以使用，并且提供的结果相当精确。

```js
>> countSymbolsIgnoringCombiningMarks('q\u0307\u0323')
1
>> countSymbolsIgnoringCombiningMarks('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞')
6
```

## 其他类型的符号

上面介绍的方法仍然过于简单了，因为它对于下面这种不是组合符号但又挤在一起的符号使无能为力，比如நி (ந + ி)，或者깍 (ᄁ + ᅡ + ᆨ)，或者特殊emoji序列比如👨‍👩‍👧‍👦 (👨 + U+200D ZERO WIDTH JOINER + 👩 + U+200D ZERO WIDTH JOINER + 👧 + U+200D ZERO WIDTH JOINER + 👦)，或者其他的情况。。

Unicode规范第29号附录“Unicode Text Segmentation”描述了一个判定簇型符号边界的算法。所以，100%精确的解决办法是用Javascript去实现那个算法，然后再统计到底有多少个肉眼可见的字符。ES有一个提案是引入一个叫`Intl.Segmenter`的方法，来决定文本的分隔符的，可以辅助解决这个问题。

## 在Javascript中将字符串反过来

与上面的数字符相比，还有一个类似的问题：反转Javascript的字符串。这有什么难的？最简单的方法是：
```js
// naive solution
function reverse(string) {
  return string.split('').reverse().join('');
}
```

大部分情况下看着都没问题
```js
>> reverse('abc')
'cba'

>> reverse('mañana') // U+00F1
'anañam'
```

但是，如果字符串包含组合标记，或者非BMP符号，就不管用了。比如：
```js
>> reverse('mañana') // U+006E + U+0303
'anãnam' // note: the `~` is now applied to the `a` instead of the `n`

>> reverse('💩') // U+1F4A9
'  ' // `'\uDCA9\uD83D'`, the surrogate pair for `💩` in the wrong order
```

为了能正确反转非BMP符号，我们同样可以用ES6引入的字符串迭代器来做。
```js
// slightly better solution that relies on ES6 StringIterator and `Array.from`
function reverse(string) {
  return Array.from(string).reverse().join('');
}
```

不过这个方法对于组合标记还是不行。

幸运的是，这个还算好解决，就是在反转之前把所有组合标记多反转一次就好了。有个库可以做这个事情。
```js
// using Esrever (https://mths.be/esrever)

>> esrever.reverse('mañana') // U+006E + U+0303
'anañam'

>> esrever.reverse('💩') // U+1F4A9
'💩' // U+1F4A9
```

## 字符串方法中的Unicode问题

字符串的某些方法也会收到影响

### 将code point转换成符号

`String.fromCharCode`可以让你从Unicode code point直接得到对应的符号。但是这个方法只对BMP符号有效。如果你使用了非BMP符号的code point你会得到错误的结果。

```js
>> String.fromCharCode(0x0041) // U+0041
'A' // U+0041

>> String.fromCharCode(0x1F4A9) // U+1F4A9
'' // U+F4A9, not U+1F4A9
```

唯一的办法是使用surrogate pairs，但是你得先学会如何从code points计算得到surrogate code point

```js
>> String.fromCharCode(0xD83D, 0xDCA9)
'💩' // U+1F4A9
```

如果你不想自己计算surrogate code point，你可以用punycode.js的`encode`方法

```js
>> punycode.ucs2.encode([ 0x1F4A9 ])
'💩' // U+1F4A9
```

幸运的是，ES6引入了一个`String.fromCodePoint(codepoint)`的方法，这个方法能够正确处理所有Unicode字符。
```js
>> String.fromCodePoint(0x1F4A9)
'💩' // U+1F4A9
```

如果是ES5或者更老的版本，可以使用String.fromCodePoint的polyfill。

### 从字符串中扣取字符

如果你使用`String.prototype.charAt(position)`来从一个字符串中扣取一个非BMP字符，那么你得到的是半个surrogate pair。
```js
>> '💩'.charAt(0) // U+1F4A9
'\uD83D' // U+D83D, i.e. the first surrogate half for U+1F4A9
```

ES7有一个提案是希望引入一个新方法`String.prototype.at(position)`来解决这个问题。
```js
>> '💩'.at(0) // U+1F4A9
'💩' // U+1F4A9
```

同样的，也有对应的polyfill可用。

### 从字符串中扣取code point

同样的，如果你用`String.prototype.charCodeAt(position)`想扣取指定位置的code point，对于非BMP符号，你只会得到半个surrogate pair。

```js
>> '💩'.charCodeAt(0)
0xD83D
```

ES6提供了一个方法`String.prototype.codePointAt(position)`可以解决这个问题。
```js
>> '💩'.codePointAt(0)
0x1F4A9
```

同样的，也有polyfill可以用。

### 遍历字符串中的所有符号

假设你要遍历字符串中的所有符号，在ES5中，你需要写一大堆代码才能实现正确的逻辑：
```js
function getSymbols(string) {
  var index = 0;
  var length = string.length;
  var output = [];
  for (; index < length; ++index) {
    var charCode = string.charCodeAt(index);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      charCode = string.charCodeAt(index + 1);
      if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
        output.push(string.slice(index, index + 2));
        ++index;
        continue;
      }
    }
    output.push(string.charAt(index));
  }
  return output;
}

var symbols = getSymbols('💩');
symbols.forEach(function(symbol) {
  assert(symbol == '💩');
});
```

或者你可以用正则表达式，比如`var regexCodePoint = /[^\uD800-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDFFF]/g;`来做类似的事情。

在ES6中，直接用for of迭代器就可以了

```js
for (const symbol of '💩') {
  assert(symbol == '💩');
}
```

不过for of是没有polyfill的，因为这是个语法层面的新功能。

### 其他问题

其实几乎所有String的方法都会受到影响，比如（String.prototype.substring，String.prototype.slice等等），所以使用他们的时候要小心。

## Unicode对正则表达式的影响

### 匹配code point和Unicode符号

在正则表达式中，`.`代表一个单个的符号，但是因为javascript是用surrogate pairs来表示非BMP的，而正则表达式会认为这是两个字符。

```js
>> /foo.bar/.test('foo💩bar')
false
```

让我们停下来仔细思考一下，怎么样让正则表达式匹配非BMP符号呢？显然`.`是不行的。
```js
>> /^.$/.test('💩')
false
```

一种办法是直接手写出code points空间，虽然看上去不是那么直观：

```js
>> /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/.test('💩') // wtf
true
```

当然通常你不需要手写这些东西，因为会有一些现成的第三方库帮你做这个事情，比如regenerate，它能够根据code point或符号生成对应的正则。

```js
>> regenerate().addRange(0x0, 0x10FFFF).toString()
'[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]'
```

生成的正则从左到右依次匹配了BMP符号，surroage pairs，long surrogates。至于long surrogate是个什么东西，这里就不作展开了。

ES6引入了一个u标记，用来解决上面所述的正则匹配的`.`问题：
```js
>> /foo.bar/.test('foo💩bar')
false

>> /foo.bar/u.test('foo💩bar')
true
```

### 非BMP符号的分类

比如像`/[a-c]/`这样的正则，我们知道是从U+0061 LATIN SMALL LETTER A 到 U+0063 LATIN SMALL LETTER C。如果是` /[💩-💫]/`，看上去就是从U+1F4A9 PILE OF POO 到 U+1F4AB DIZZY SYMBOL，但实际并不是这样。
```
>> /[💩-💫]/
SyntaxError: Invalid regular expression: Range out of order in character class
```

这是因为上面的正则等价于下面这样
```js
>> /[\uD83D\uDCA9-\uD83D\uDCAB]/
SyntaxError: Invalid regular expression: Range out of order in character class
```

又是surrogate pairs，所以实际上这个正则匹配的是三段，而中间那一段\uDCA9-\uD83D是非法的，因为起始编码大于了结束编码。

ES6再一次拯救了我们，通过u标记可以解决这个问题。

```js
>> /[\uD83D\uDCA9-\uD83D\uDCAB]/u.test('\uD83D\uDCA9') // match U+1F4A9
true

>> /[\u{1F4A9}-\u{1F4AB}]/u.test('\u{1F4A9}') // match U+1F4A9
true

>> /[💩-💫]/u.test('💩') // match U+1F4A9
true

>> /[\uD83D\uDCA9-\uD83D\uDCAB]/u.test('\uD83D\uDCAA') // match U+1F4AA
true

>> /[\u{1F4A9}-\u{1F4AB}]/u.test('\u{1F4AA}') // match U+1F4AA
true

>> /[💩-💫]/u.test('💪') // match U+1F4AA
true

>> /[\uD83D\uDCA9-\uD83D\uDCAB]/u.test('\uD83D\uDCAB') // match U+1F4AB
true

>> /[\u{1F4A9}-\u{1F4AB}]/u.test('\u{1F4AB}') // match U+1F4AB
true

>> /[💩-💫]/u.test('💫') // match U+1F4AB
true
```

不幸的是，这个方法无法兼容ES5和更老的环境，如果你真的有需要，建议使用regenerate这个工具库生成正确的正则表达式。
```js
>> regenerate().addRange('💩', '💫')
'\uD83D[\uDCA9-\uDCAB]'

>> /^\uD83D[\uDCA9-\uDCAB]$/.test('💩') // match U+1F4A9
true

>> /^\uD83D[\uDCA9-\uDCAB]$/.test('💪') // match U+1F4AA
true

>> /^\uD83D[\uDCA9-\uDCAB]$/.test('💫') // match U+1F4AB
true
```

## 生产环境中的bug以及如何避免

举一个实际的例子，twitter的每一个tweet只允许140个字符，而后端可不管这是什么字符，BMP还是非BMP。但是因为Javascript在前端是仅仅通过`length`方法判断长度，所以如果你输入的都是非BMP字符，那最多只能打70个。（这个bug现在已经被修复了）

许多javascript的库都没能正确处理非BMP字符。比如countable.js,underscore.js等等。有时候html中包含一些特殊的数字也可能导致html解码失败，比如&#X1F4A9。这里推荐he这个库做html的编解码。

以上这些都是比较容易产生和修复的错误，毕竟Javascript处理Unicode是很麻烦的。那么除了修复的办法，怎么发现这些错误呢？

## The Pile of Poo Test

无论何时当你编写需要处理字符串或正则表达式的代码时，记得在UT的字符串里添加一个翔（💩），然后看看是否正常。这个方法很方便，很管用，也很有趣，能帮助你检查你的代码是否正确处理了非BMP字符。如果你发现了错误，你就可以使用上面介绍的方法修复了。

更完善的Unicode字符串是`Iñtërnâtiônàlizætiøn☃💩`，这20个字符包含了从U+0100到U+FFFF的BMP字符，以及从U+010000到U+10FFF的非BMP字符。
