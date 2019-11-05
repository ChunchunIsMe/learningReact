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
# useReducer
基本用法：
```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
它接收3个参数，分别为reducer、初始state、惰性初始化state

这里基本和redux一样，我就不多细讲了。我们主要来讲讲第三个参数

> 第三个参数 init 是什么？它是一个可选值，可以用来惰性提供初始状态。这意味着我们可以使用使用一个 init 函数来计算初始状态/值，而不是显式的提供值。如果初始值可能会不一样，这会很方便，最后会用计算的值来代替初始值。

我们接下来就写一个计数器的例子吧，新建src/component/reducer/NumCount.js
```
import React, { useReducer } from 'react';

function init(num) {
  const result = Number(num);
  if (Number.isNaN(result)) {
    throw new Error('not a number');
  }
  return result;
}


function NumCount({ num }) {
  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return state + 1;
      case 'minus':
        return state - 1;
      case 'reset':
        return num;
      default:
        throw new Error('error');
    }
  }

  const [state, dispatch] = useReducer(reducer, num, init);

  return (
    <div>
      <div>count: {state}</div>
      <div>
        <button onClick={() => dispatch({ type: 'add' })}>add count</button>
        <button onClick={() => dispatch({ type: 'minus' })}>minus count</button>
        <button onClick={() => dispatch({ type: 'reset' })}>reset count</button>
      </div>
    </div>
  )
}

export default NumCount;
```
然后我们在App.js中使用它就能看到效果了。
# useMemo、useCallback
现在我们已经介绍完了useReducer、useContext和自定义hook，我们可以使用这两个来编写一个状态管理工具，然后我们通过这个状态管理工具来引出useMemo和useCallback

首先创建src/component/memoAndCallback/下的 stroe.js、Father.js、Children.js实现一个状态管理工具的例子

stroe.js
```
// stroe.js
import { createContext } from 'react';

const state = {
  left: 'red',
  right: 'green'
}

const Context = createContext(null)

function reducer(state, action) {
  let obj = {}
  switch (action.type) {
    case 'left':
      obj = {
        ...state,
        left: state.left === 'red' ? 'yellow' : 'red'
      }
      break;
    case 'right':
      obj = {
        ...state,
        right: state.right === 'green' ? 'blue' : 'green'
      }
      break;
  }
  return obj;
}

export {
  Context,
  reducer,
  state
} 
```
Father.js
```
import React, { useReducer } from 'react';
import { Context, reducer, state } from './stroe';
import Childern from './Children';

function Father() {
  const re = useReducer(reducer, state);
  return (
    <Context.Provider value={re}>
      <Childern />
    </Context.Provider>
  )
}

export default Father;
```
Children.js
```
import React, { useContext } from 'react';
import { Context } from './stroe';

function Children() {
  return (
    <div>
      <Left />
      <Right />
    </div>
  )
}

function Left() {
  const [value, dispatch] = useContext(Context);
  console.log('left');
  return (
    <div
      style={{
        display: 'inline-block',
        width: '100px',
        height: '100px',
        backgroundColor: value.left,
        marginRight: '10px'
      }}
      onClick={() => dispatch({ type: 'right' })}
    >
      点击我改变右边的颜色
    </div>
  )
}

function Right() {
  const [value, dispatch] = useContext(Context);
  console.log('right');
  const click = () => dispatch({ type: 'left' })
  return (
    <div
      style={{
        display: 'inline-block',
        width: '100px',
        height: '100px',
        backgroundColor: value.right,
      }}
      onClick={click}
    >
      点击我改变左边的颜色
    </div>
  )
}

export default Children;
```
然后我们将Father.js这个组件加到页面上，我们会发现Left和Right这两个组件之间进行通信了。但是你发现了吗，Right和Left组件的Click函数的写法不一样，嘿嘿这里的原因待会再告诉你

但是你有没有发现一个问题？不管我是否改变组件Left需要的颜色还是改变Right需要的颜色，两个函数组件都被调用了！这样的话改变组件不需要的值时也会重新生成一个dom。并且每次调用Right组件函数的时候都会生成一个新的click函数！这是非常不合理的！

我们需要解决它！是不是差点忘了我们这节课的主题？没错，我们将会使用useMemo和useCallback来解决上述性能问题

我们先来介绍用法

### useMemo
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
它会返回一个memoized值

它的作用就是把创建memoized的函数和依赖数组作为参数传入useMemo，它仅会在某个依赖项改变的时候才会重新计算memoized值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入useMemo的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，比如useEffect这种副作用操作。

如果没有依赖数组，那么useMemo每次渲染都会计算新的值进行返回。
### useCallback
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
返回一个 memoized 回调函数。

其实`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

有了上面这两个方法我们就可以解决上面性能上的问题啦，修改Children.js
```
import React, { useContext, useCallback, useMemo } from 'react';
import { Context } from './stroe';

function Children() {
  return (
    <div>
      <Left />
      <Right />
    </div>
  )
}

function Left() {
  const [value, dispatch] = useContext(Context);
  console.log('left');
  return useMemo(() => (
    <div
      style={{
        display: 'inline-block',
        width: '100px',
        height: '100px',
        backgroundColor: value.left,
        marginRight: '10px'
      }}
      onClick={() => dispatch({ type: 'right' })}
    >
      点击我改变右边的颜色
    </div>
  ), [value.left])
}

const funSet = new Set();
const domSet = new Set();

function Right() {
  const [value, dispatch] = useContext(Context);
  console.log('right');
  const click = useCallback(() => dispatch({ type: 'left' }), [])

  const dom = useMemo(() => (
    <div
      style={{
        display: 'inline-block',
        width: '100px',
        height: '100px',
        backgroundColor: value.right,
      }}
      onClick={click}
    >
      点击我改变左边的颜色
    </div>
  ), [value.right])
  funSet.add(click);
  domSet.add(dom);
  console.log(funSet);
  console.log(domSet);
  return dom;
}

export default Children;
```
我们将其修改之后，还在Right组件中使用set记录了每次调用Right函数是否生成了新的dom和function，我们可以看到储存函数的set长度一直都是1，但是储存dom的set在右边颜色改变的时候长度会+1但是在左边颜色没有改变的时候set的长度并不会+1。

至此我们使用useContext、useReducer和Context写了一个状态管理器，然后使用useMemo和useCallback解决了它的性能问题。
