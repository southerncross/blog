---
title: 自己动手写eslint-plugin解决promise忘记return的问题
date: 2019-05-18 18:10:30
tags: javascript ast eslint
---

最近连续遇到几次因为在Promise链里漏写return而导致的bug了,就是这样:

```js
...
.then(() => {
  // 这里忘记写return了
})
.then((param) => {
  // 这里result永远是undefined
})
```

有没有什么eslint能够检测发现这个问题呢?貌似是没有.那就自己写一个吧.

## 准备工作

我们需要对javascript的AST有一定了解,[AST Explore](https://astexplorer.net/)这个神器不说了都懂,开发调试必备

按照eslint官方文档的方法搭建脚手架,接着就可以开发了(建议看开发时先看第一个,等到要发布的时候再看第二个)
1. [working-with-rules](https://cn.eslint.org/docs/developer-guide/working-with-rules)
2. [working-with-plugins](https://cn.eslint.org/docs/developer-guide/working-with-plugins)

但是官方文档没有说如何发布和引入,这里推荐两篇写的很清楚的文章:
1. [writing-custom-lint-rules-for-your-picky-developers](https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803)
2. [writing-custom-eslint-rules](https://www.kenneth-truyers.net/2016/05/27/writing-custom-eslint-rules/)

ok,现在开始吧!

## 确定要检查的代码片段

首先,我们要确定要检查什么样的代码片段,当然是`.then`这种函数调用了,就像下面这样:

```js
.then(() => {}) // then1
.then((param) => {}) // then2
```

简单来说就是符合2个条件:
1. then1的callback带有参数
2. then2的前面还有一个then1

## 确定要检查的规则

这里,我定义了两种检查规则

规则1,then1不能没有返回值,即下面这种是错误的

```js
.then(() => {}) // then1 没有返回值
.then((param) => {}) // then2
```

规则2,then1的返回值不能是undefined,即下面这种是错误的

```js
.then(() => { return; }) // then1 返回了undefined
.then((param) => {}) // then2
```

其实这两个规则还是粗糙了点,有些场景是检测不出来的,例如:

```js
.then(() => { // then1
  if (condition) {
    return something
  } else {
    // 这个分之忘记return了
  }
})
.then((param) => {}) // then2
```

又或者

```js
import { foo } from 'utils';

.then(foo) // then1 不知道foo是什么东西
.then((param) => {}) // then2
```

如果要完全检测所有情况,恐怕要引进data flow analysis和control flow analysis了,虽然理论上是可以的,但成本过高,这里就暂时不考虑了.

## 思路

首先考虑规则1,如何判断callback中到底有没有return呢?一个直观的想法是:把callback函数体的return都找出来不就行了,当然了,这里有三点需要注意

一是不能无脑把所有return语句都找出来,比如下面这种代码

```js
.then(() => {
  const doubleList = list.map((x) => {
    return x * 2; // 这里虽然有return,但并不是属于then1的return
  });
})
.then((param)) => {})
```

具体说来,就是我们应该只看属于then1的callback的return,其他函数表达式或函数定义的return都不用看.对应到代码实现上,在遍历的时候,对于function expression或function declaration可以直接跳过.

二是即使没有return语句也可能有返回值,比如下面这种代码

```js
.then(() => 123) // 这里没有明确的return statement,但是仍然看做是有返回值的
.then((param)) => {})
```

具体说来,我们需要额外考虑函数体是不是identifier,literal,expression等.

三是即使找到return也有可能算作是没有return,这个是什么意思呢?看下面的代码

```js
.then(() => {
  return asyncFunc() // 这里确实return了
  .then(() => {}); // 但这里才是真正连接下一个promise chain的地方,这里是没有return的
})
.then((param)) => {})
```

这个规则要求我们在找return的时候,如果发现return的是一个call expression,就还要再看这个call expression是否有返回值,而且有可能递归地进一步检查下去.这里稍微有些复杂.

接下来是规则2,如何判断callback的return是不是undefined呢?搞定了规则1,这个就比较简单了,既然已经找到了return,那就看看return是不是`return;`这种形式就得了.

## 代码实现

```js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'prevent forgotten return statement inside promise callback function',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function(context) {

    // variables should be defined here

    const ERR_NO_RETURN = 'No return statements were found while the next promise chain needs some params.';
    const ERR_RETURN_UNDEFINED = 'You need to return something snice the next promise chain needs params.';

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    /**
     * 是否是.then
     *
     * @param {Node} node
     * @return {boolean}
     */
    function checkIsThenNode(node) {
      return node
        && node.type === 'CallExpression'
        && node.callee.type === 'MemberExpression'
        && node.callee.property.name === 'then';
    }

    /**
     * 是否是callback
     *
     * @param {Node} node
     * @param {boolean} requireParam - 是否需要有参数
     * @return {boolean}
     */
    function checkIsCallback(node, requireParam) {
      return node
        && (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression')
        && (!requireParam || node.params.length > 0);
    }

    /**
     * 已知一个.then,寻找语法前置then
     *
     * @param {CallExpression} node
     * @return {CallExpression}
     */
    function findPrevThenNode(node) {
      if (node && checkIsThenNode(node.callee.object)) {
        return node.callee.object;
      } else {
        return null;
      }
    }

    /**
     * return表达式是否返回了非空的内容
     *
     * @param {ReturnStatement} statement
     * @param {number} depth - 递归深度,用来辅助判断是否returnable
     * @return {boolean} whether has returnable statement
     */
    function shouldReturnSomething({ statement, parent, depth = 0 }) {
      if (!statement) {
        return false;
      }

      let returnable = false;
      depth++;

      if (/Expression|Literal|Identifier/.test(statement.type)) {
        returnable = depth === 1; // 只有第一层的expression/literal/identifier是returnable的
      } else if (/ReturnStatement/.test(statement.type)) {
        returnable = true; // 其他时候有return都是returnable的
      }

      switch (statement.type) {
        case 'ReturnStatement':
          if (!statement.argument) {
            // 表示 return;
            context.report({
              node: statement,
              message: ERR_RETURN_UNDEFINED,
            });
          } else {
            // 递归验证
            returnable |= shouldReturnSomething({
              statement: statement.argument,
              parent: statement,
              depth,
            });
          }
          break;
        case 'CallExpression':
          // 判断是不是另一个.then
          if (parent.type === 'ReturnStatement' && checkIsThenNode(statement) && checkIsCallback(statement.arguments[0], false)) {
            returnable |= shouldReturnSomething({
              statement: statement.arguments[0].body,
              parent: statement,
              depth: 0, // 此时要重置depth,以处理 return () => () => () => value 这种代码
            });
          }
          break;
        case 'BlockStatement':
          statement.body.forEach((stmt) => {
            returnable |= shouldReturnSomething({
              statement: stmt,
              parent: statement.body,
              depth,
            });
          });
          break;
        case 'WhileStatement':
        case 'DoWhileStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'ForOfStatement':
          returnable |= shouldReturnSomething({
            statement: statement.body,
            parent: statement,
            depth,
          });
        case 'IfStatement':
          returnable |= shouldReturnSomething({
            statement: statement.consequent,
            parent: statement,
            depth,
          });
          returnable |= shouldReturnSomething({
            statement: statement.alternate,
            depth,
          });
          break;
        case 'SwitchStatement':
          statement.cases.forEach((caseNode) => {
            caseNode.consequent.forEach((stmt) => {
              returnable |= shouldReturnSomething({
                statement: stmt,
                parent: caseNode,
                depth,
              });
            });
          });
          break;
        case 'TryStatement':
          returnable |= shouldReturnSomething({
            statement: statement.block,
            parent: statement,
            depth,
          });
          break;
        default:
          break;
      }

      if (depth === 1 && !returnable) {
        context.report({
          node: parent,
          message: ERR_NO_RETURN,
        });
      }

      return returnable;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // give me methods
      CallExpression: function(node) {
        if (checkIsThenNode(node) && checkIsCallback(node.arguments[0], true)) {
          const prev = findPrevThenNode(node);
          if (checkIsThenNode(prev) && checkIsCallback(prev.arguments[0], false)) {
            shouldReturnSomething({
              statement: prev.arguments[0].body,
              parent: prev.arguments[0],
            });
          }
        }
      },
    };
  },
};
```
