---
title: F-bounded Polymorphism
date: 2020-09-22 01:10
---

## 子类型（subtype）

面向对象编程中，我们可以简单地认为对象就是键值对。

比如直角坐标系中的点（Point）对象：
```js
{ x: 1, y: 2 }
```
其对应的类型是：
```ts
type Point = { x: number, y: number }
```

假设现在有这样一个对象：
```js
{ x: 1, y: 2, color: 'red' }
```
其对应的类型是：
```ts
type ColoredPoint = { x: number, y: number, color: string }
```

可以看到，`ColoredPoint`包含了`Point`的全部信息，此外还多了一个color信息，信息越多越具体（特化），所以我们就说`ColoredPoint`是`Point`的子类型（subtype）。

这个其实是比较容易理解的，比如：
```
植物 -> 水果 -> 苹果 -> 黄元帅苹果
```
越往右，信息越多越具体，右边都是左边的子类型。

因而在面向对象编程中，子类型的对象可以赋值给父类型的对象，即：

```ts
const apple:Apple = new Apple();
const fruit:Fruit = apple;
```

这个过程无需强制类型转换，因为上述子类型的定义符合[里氏替换原则](https://en.wikipedia.org/wiki/Liskov_substitution_principle)，这样写一定不会出错。

> 里氏替换原则通俗版：子类对象可以在程序中替换父类对象

关于里氏替换原则，也可以这样理解：父类型是大人，子类型是小孩。现在一群人满满当当挤在电梯里，你可以把一个大人替换成一个小孩，但是反之不行。也就是，更小的类型可以替换更大的类型。

## 协变（Covariance）、逆变（Contravariance）、不可变（Invariance）

函数是否也有子类型呢？因为函数有参数和返回值，那我们先用控制变量法，只观察参数类型或返回值类型不同的函数。

首先来看参数类型相同而返回值类型不同的函数：

```js
function drawPoint(x: number, y: number): Point {
  return { x, y }
}

function drawRedPoint(x: number, y: number): RedPoint {
  return { x, y, color: 'red' }
}
```

想象一下，如果我们把代码中所有的`drawPoint`都替换成`drawRedPoint`，这应该是没有问题的（返回的对象多了一个color字段，没有什么影响），而反之是有问题的。那么根据里氏替换原则，`drawRedPoint`是`drawPoint`的子类型。

抽象一下总结出来就是，对于参数类型相同的两个函数，返回值类型越小，函数类型越小。emmmm其实类型可没有大小之分，这里是借用之前电梯的那个例子，总之理解我的意思就好。

再来看看返回值类型相同而参数类型不同的函数：

```js
function logPoint(point: Point): string {
  return JSON.stringify(point)
}

function logRedPoint(redPoint: RedPoint): string {
  return JSON.stringify(redPoint)
}
```

同样地，如果把代码中所有的`logRedPoint`替换成`logPoint`，这应该是不会报错的（原来的参数一定有color字段，现在无所谓了），而反之是有问题的。那么根据里氏替换原则，`logPoint`是`logRedPoint`的子类型。

抽象一下总结就是，对于返回值类型相同的参数，参数类型越大，函数类型越小。同理理解我意思就好。

最后，如果函数的参数和返回值类型都不相同，那么我们可以定义：参数类型更大且返回值类型更小的函数类型更小，参数类型更小且返回值类型更大的函数类型更大，其他情况无法比较大小（也就是没有不算子类型）。

用数学符号表示即：

```
if s' <= s and t <= t' then s->t <= s'->t'
```

这里还有一个与之对偶的有趣结论，如果我们把函数固定下来，尝试改变参数和返回值的赋值类型。比如下面这个函数，正常情况下调用该函数，参数是`Point`类型，而返回值的赋值对象是`RedPoint`类型：

```ts
function foo(point: Point): RedPoint
```

实际上，如果我们在调用该函数的时候，把参数换成`RedPoint`类型，或者把返回值的赋值对象换成`Red`类型，这都是没有问题的。即：

1. 有些地方，我们可以使用比原本设定的类型更小的类型（比如函数的参数）
2. 有些地方，我们可以使用比原本设定的类型更大的类型（比如函数的返回值的赋值变量类型）。

第一种情况就叫做协变（Covariance），这是最符合直觉的一种场景，第二种情况叫逆变（Contravariance），这个乍一看不太符合直觉。当然除了协变和逆变之外，如果既不能换成大的也不能换成小的，那就叫不可变（Invariance），这种场景也是存在的。

简单的记忆结论就是：参数可协变，返回值可逆变

## 限定泛型（Bounded Polymorphism）

前文啰嗦了一大堆，总算讲到了正文了，我们先看一看什么叫限定泛型。当然，这里假设你已经知道什么叫泛型了（Polymorphism/Quantification/Generic等）。

限定泛型，的意思就是，限定了的泛型。

比如下面的函数，判断一个东西美不美：

```ts
function isBeautiful<T>(something: T): boolean
```

本来泛型T可以是任意类型，比如可以是植物、动物、建筑等，没有任何限制。现在我们像限制一下T只能是动物的子类型，即：

```ts
function isBeautiful<T extends Animal>(something: T): boolean
```

这就叫做限定泛型（Bounded Polymorphism），可以看到，其实就是对参数增加了一个协变。

## F-bounded Polymorphism

抱歉不知道中文该怎么翻译，有人叫“有界限定泛型”，我觉得不是很贴切。至于为什么叫F-bounded Polymorphism，可以看最初的[论文](http://staff.ustc.edu.cn/~xyfeng/teaching/FOPL/lectureNotes/CookFBound89.pdf)，当时的作者也不知道该起什么名字，索性就拿举例子的函数字母F加个前缀吧，于是就叫做F-bounded Polymorphism。

为什么有这么个玩意呢？

回到之前泛型的例子，假如现在的函数是从两个东西里挑出最美的那一个：

```ts
function pickMostBeautiful<T>(a: T, b: T): T
```

还是一样，现在想限定一下是从动物中挑选，那么我们会下意识地这样写：

```ts
function pickMostBeautiful<T extends Animal>(a: T, b: T): T
```

因为我们期望达到这样的效果：

```ts
const mostBeautiful: Cat = pickMostBeautiful<Cat>(a, b)
```

上面的代码，我们会注意到`Cat`类型作为了函数返回值赋值的类型，相比于最初的泛型函数，相当于是类型缩小了，也就是发生了协变，而我们知道，函数的返回值赋值变量只能逆变，这这这这这，不是矛盾了吗？！

当当当当，F-bounded Polymorphism登场了：

```ts
const mostBeautiful: F[Cat] = pickMostBeautiful<Cat>(a, b)
```

这里，把原来的`Cat`换了个记号`F[Cat]`，其中的F是一个函数，将一个类型转换成另一个类型。

F的定义是：`F[t] = σ`，且`t`是`σ`的子类型。即：σ是来源于t（用F作用于t得到的），而t呢又是来源于σ（子类型的定义），于是σ和t就产生了递归了，这就叫做F-bounded Polymorphism。可见F-bounded Polymorphism其实也是一种Bounded Polymorphism，只是带有递归的Bounded Polymorphism。

回到上面的代码，因为`Cat`是`F[Cat]`的子类型，所以是逆变，圆上了。

就好比先有鸡还是先有蛋，这个问题争论起来没有答案，但是在实际情况中不管是先有鸡还是先有蛋，世界都能正常运转，于其纠结于此（compile time），不如引入一个递归的概念把理论说通了，反正现实中（runtime）都很明确了，不打紧。

另一个比较实际的例子是class的this的类型，这里就不啰嗦了，可以看TS的官方文档：[点击这里](https://www.typescriptlang.org/docs/handbook/advanced-types.html#polymorphic-this-types)

如果到这里你是一头雾水，那就对了，多琢磨琢磨，找找感觉吧。

## 参考资料

- [F-Bounded Polymorphism for Object-Oriented Programming](http://staff.ustc.edu.cn/~xyfeng/teaching/FOPL/lectureNotes/CookFBound89.pdf)
- [Very Rough Notes on F-Bounded Polymorphism](https://courses.cs.washington.edu/courses/cse505/99au/oo/f-bounded.html)
- [Covariance and contravariance](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science))
- [泛型中的协变和逆变](https://docs.microsoft.com/zh-cn/dotnet/standard/generics/covariance-and-contravariance)
- [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
- [F-Bounded Polymorphism in Java](http://codingwithstyle.blogspot.com/2015/07/f-bounded-polymorphism.html)
- [WTF is F-Bounded Polymorphism](https://work.tinou.com/2009/07/wtf-is-fbounded-polymorphism.html)
- [Bounded quantification](https://en.wikipedia.org/wiki/Bounded_quantification)
