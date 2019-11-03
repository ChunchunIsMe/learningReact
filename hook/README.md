# Hook简介
Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
## 没有破坏性改动
- 完全可选的。你无需重写任何已有的代码就可以在一些组件中尝试Hook。但是如果你不想，你不必现在就去学习或使用Hook
- 100%向后兼容。Hook不包含任何破坏性改动
- 现在可用。Hook已发布于v16.8.0

**没有计划从 React 中移除 class。**

**Hook 不会影响你对 React 概念的理解。**

## 动机
### 在组件之间复用状态逻辑很难
React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 render props 和 高阶组件。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。
### 富足组件变得难以理解
我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 componentDidMount 和 componentDidUpdate 中获取数据。但是，同一个 componentDidMount 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 componentWillUnmount 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

为了解决这个问题，Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。
### 难以理解的class
除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 this 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的语法提案，这些代码非常冗余。

但是我们发现使用 class 组件会无意中鼓励开发者使用一些让优化措施无效的方案。class 也给目前的工具带来了一些问题。例如，class 不能很好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。

为了解决这些问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。
# 使用 State Hook
我们通过写一个计数器的例子来介绍useState,创建src/component/Count.js
```
import React, { useState } from 'react';

function Count() {
  const [count, useCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => useCount(count + 1)}>add count</button>
    </div>
  )
}

export default Count;
```
将这个组件加到App.js 中，然后我们就可以看到，我们用如此简单的一段代码实现了一个计数器。

而useState的用法也很容易从上面的代码看出来，在useState函数调用时传入一个初始值，随后该函数会返回值和使用它的方法的一个数组([值, 更新方法])当我们需要更新值时，我们可以调用这个更新方法，如上面的useCount，我们直接`useCount(值)`就将新的值赋给了state变量。

我们加上一个同样效果的class组件进行对比，这样就会让代码一目了然,新建 src/component/CountClass.js
```
import React, { Component } from 'react';

class CountClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={() => this.setState(({ count }) => ({ count: count + 1 }))}>add count</button>
      </div>
    )
  }
}

export default CountClass;
```
要注意的是当useState使用一个对象，更新state时不能使用原来的对象进行更新。如下面是一个错误的增加长方形的长和宽的例子：
```
import React, { useState } from 'react';

function Oblong() {
  const [attr, useAttr] = useState({ width: 10, height: 10 })
  return (
    <div>
      <div style={{ backgroundColor: 'red', ...attr }}></div>
      <button
        onClick={() => {
          attr.width += 1;
          useAttr(attr)
        }}
      >add width</button>
      <button
        onClick={() => {
          attr.height += 1;
          useAttr(attr)
        }}
      >add height</button>
    </div>
  )
}

export default Oblong;
```
useState并不会帮你检测引用类型的属性是否改变，它只会检测储存的当前值是否改变，因为当前存的是一个地址，而地址没有改变所以并不会增加长方形的长和宽

正确的写法应该是
```
import React, { useState } from 'react';

function Oblong() {
  const [attr, useAttr] = useState({ width: 100, height: 100 })
  return (
    <div>
      <div style={{ backgroundColor: 'red', ...attr }}></div>
      <button
        onClick={() => {
          useAttr({ ...attr, width: attr.width + 10 })
        }}
      >add width</button>
      <button
        onClick={() => {
          useAttr({ ...attr, height: attr.height + 10 })
        }}
      >add height</button>
    </div>
  )
}

export default Oblong;
```
或者是写两个个useState分别储存长和宽，从而达到以上的功能。 
# 使用 Effect Hook
