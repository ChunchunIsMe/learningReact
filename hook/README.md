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
我们通过写一个计数器的例子来介绍useState,创建src/component/state/Count.js
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

我们加上一个同样效果的class组件进行对比，这样就会让代码一目了然,新建 src/component/state/CountClass.js
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
> 如果你刚刚试过很多useState的用法你会发现useState是异步的，那要怎么实现类似setState的回调用法呢？接下来我们介绍Effect

如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

下面是它的基本用法
```
useEffect(() => {
  // 每次实例创建的时候都会调用这个函数
  // 第二个参数数组中的值变化时才会调用该函数，如果数组为空则只在实例创建时调用该函数
  // 如果没有第二个参数则在实例创建和每次组件更新都会调用该函数
  // 这里相当于componentDidMount和componentDidUpdate 

  // 最最需要注意的是：useEffect 使用的 state 是在第一次渲染的时候获取的。 获取的时候，如果是 0。由于一直没有重新执行 effect，所以 如果在setInterval 中让state+1 在闭包中使用的 state 始终是从第一次渲染时来的，所以就有了 state + 1 始终是 1 的现象。

  return () => {
    // useEffect 返回一个函数（可选）
    // 如果返回了该函数则会在组件将要销毁的时候调用  
    // 如果第二个参数不为空数组那么每次调用上面函数之前都会先调用这个函数销毁上一次的副作用
  }
},[第二个参数可选，是一个数组])

如果useEffect第二个参数数组不是state或者state的属性，即使值改变也不会触发。
```
下面我们通过一个定时器的例子来说明吧,创建 Timer.js
```
import React, { useEffect, useState } from 'react';

function Timer() {
  const [time, useTime] = useState(0);
  const [on, setOn] = useState(false);
  let id = null;
  useEffect(() => {
    // 这里做的原因是再生成一个闭包来暂时储存变化的值
    let val = time;
    id = setInterval(() => {
      val++;
      useTime(val);
    }, 1000);
    return () => {
      clearInterval(id);
    }
  }, [on])

  return (
    <div>
      <div>{time}</div>
      <button onClick={() => { useTime(0); setOn(!on) }}>resultTime</button>
    </div>
  )
}

export default Timer;
```
# 自定义hook
自定义hook可以将组件逻辑提取到可重用的函数中。比如我们来创建一个获取浏览器窗口大小的自定义hook。创建src/component/custom/useWindowSize.js
```
import { useEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerHeight,
    height: window.innerHeight
  })

  useEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerHeight,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler);
    }
  }, [])
  return size;
}

export default useWindowSize;
```
> 注意：自定义hook只能在函数式组件中调用！不能在其他地方进行调用。

然后我们创建一个函数式组件来用他吧，创建src/component/custom/HookCustom.js
```
import React from 'react';
import useWindowSize from './useWindowSize';

function HookCustom() {
  const { width, height } = useWindowSize();
  return (
    <div>
      <div>
        宽：{width}
      </div>
      <div>
        高：{height}
      </div>
    </div>
  )
}

export default HookCustom;
```
最后我们在App.js中用他就好了

自定义组件的功能非常强大，在网上找了一个[库](https://github.com/zenghongtu/react-use-chinese '库')它使用自定义组件封装了很多东西，我们之前的例子useWindowSize就是模仿其中的一个自定义hook写的。
# useContext
`useContext(Mycontext)`接收一个context对象(即`React.createContext`的返回值)并返回当该context的值。当前的context值由上层组件中距离当前组件最近的<Mycontext.Provider>的value prop决定

当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。

> useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

我们分别创建component/context 的 context.js、Outer.js、Inner.js 来示范它的用法。

context.js
```
import { createContext } from 'react';

const Mycontext = createContext(0);

export default Mycontext;
```
Inner.js
```
import React, { useContext } from 'react';
import MyContext from './context';

function Inner() {
  const value = useContext(MyContext);
  return (
    <div>
      context value: {value}
    </div>
  )
}

export default Inner;
```
Outer.js
```
import React, { useState } from 'react';
import Inner from './Inner';
import MyContext from './context';

function Outer() {
  const [val, setVal] = useState(0)
  return (
    <MyContext.Provider value={val}>
      <Inner />
      <button onClick={() => setVal(val + 1)}>add val</button>
    </MyContext.Provider>
  )
}

export default Outer;
```