# 高级指引
## Context
Context提供了一种在组件之间共享值的方式
### API
#### React.createContext
基本用法
```
const MyContext = React.createContext(defaultValue);
```
创建一个Context对象。当React渲染了一个订阅了这个Context对象的组件，这个组件会从组件树中离自身最近的那个匹配Provider读取到当前的context值。

只有当组件所处树中没有匹配到Provider时，其defaultValue参数才会生效，如果Provider的value是undefined,defaultValue不生效。
#### React.Provider
```
<MyContext.Provider value={/* 某个值 */}>
```
每个Context对象都会返回一个Provider组件，它允许消费组件订阅context的变化

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。
#### Class.contextType
```
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}

MyClass.context = MyContext
```
挂载在class上的contextType属性会被重赋值由React.createContext()创建的Context对象。这能让你使用this.context来消费最近Context的值。你可以在任何一个地方访问到它。并且它也是实时更新并且会刷新dom的存在。
#### Context.Consumer
```
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染 */}
</MyContext.Consumer>
```
这里，React组件可以订阅到context变更。这能让你在函数式组件中完成订阅context

这需要函数作为子元素这种做法。这个函数接收当前的context值，返回一个React节点。传递给函数的value值等同往上组件树离这个context最近的Provider提供的value值。如果没有对应的Provider，value参数等同于传递给createContext()的defaultValue.

函数作为子元素后函数的返回值dom将会被显示出来
#### Context.displayName
context对象接受一个名为displayName的property，类型为字符串。React DevTools使用该字符串确定context要显示的内容。
```
const MyContext = React.createContext(defaultVal);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // 在DevTools中为MyDisplayName.Provider
<MyContext.Consumer>/ / 在DevTools中为MyDisplayName.Consumer
```
### 例子
下面我们就用上面的Api来写例子吧，

创建src/context/context.js 生成MyContext
```
import { createContext } from 'react';

const MyContext = createContext(0);

export default MyContext;
```
创建src/context/index.js，使用Provider储存值
```
import React, { PureComponent } from 'react'
import MyContext from './context';
import Consumer from './mods/Consumer';
import ContextType from './mods/ContextType';

class Context extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  render() {
    const { count } = this.state;
    return (
      <MyContext.Provider value={count}>
        <Consumer />
        <ContextType />
        <button onClick={() => this.setState(({ count }) => ({ count: count + 1 }))}>add count</button>
      </MyContext.Provider>
    )
  }
}

export default Context;
```
创建src/context/mods/Consumer.js 来使用Consumer来进行访问值
```
import React from 'react';
import MyContext from '../context';

function Consumer() {
  return (
    <MyContext.Consumer>
      {
        value => (
          <div>Consumer Count: {value}</div>
        )
      }
    </MyContext.Consumer>
  )
}

export default Consumer;
```
创建src/context/mods/ContextType.js 来使用contextType来访问值
```
import React,{PureComponent} from 'react';
import MyContext from '../context';

class ContextType extends PureComponent {

  render() {
    return (
      <div>ContextType Count: {this.context}</div>
    )
  }
}
ContextType.contextType = MyContext

export default ContextType;
```
如果你需要使用嵌套context你可以在Consumer嵌套的函数返回的组件中再次使用consumer。
## Refs
ref是获取组件节点或者值的一种方法,其实我感觉文档讲的挺混乱的分了两节去讲这个东西，我就用我自己的方法去整理这个用法吧。
### API
#### React.CreateRef
基本用法
```
this.MyRef = React.CreateRef()
```
我们可以通过上述方法创建一个ref

> 注意的是ref的值的更新不会引起dom的更新
#### ref属性
我们可以将ref值放到某个组件或者dom的ref属性下如：
```
<input ref={this.MyRef} />
```
这样我们可以使用`this.MyRef.current`拿到这个dom

如果我们在ref属性传入一个函数，那么这个函数的参数会被传入该dom或该组件实例,如：
```
<input ref={(e) => {this.input = e}} />
```
之后我们就可以使用this.input来访问上面这个节点

如果是class组件使用了ref，如一个ClassRef组件
```
<ClassRef ref={this.MyRef} />
```
我们可以通过`this.MyRef.current`拿到这个组件实例，然后可以通过`this.MyRef.current.func()`的用法去访问组件实例的方法或者属性

如果对function组件使用ref属性，那么它将会报错，因为ref属性对组件使用的时候会拿到它的实例，function组件是没有实例的，除非你使用React.forwardRef
#### React.forwardRef
React.forwardRef 是个高阶组件，它可以让你的函数式组件的第二个参数为ref基本用法
```
import React, { forwardRef } from 'react';

function FunC(props,ref) {
  // ...
}

export default forwardRef(FunC);
```
这样的话函数式组件就拿到了使用这个函数式组件的ref属性上的ref值，但是要注意如果没用使用forwardRef，函数式组件是不能使用ref属性的。

这个高阶组件也让我们能够拿到ref属性的值了。因为如果没有这个Api class组件的ref属性不会挂载在props下function组件也能使用ref
### 例子
详见src/ref 里面父组件的ref传递到了子组件然后获取的子组件的dom，例子还将上面的用法都实现了出来。
## React.Fragments
其实`React.Fragments`就是一个空标签它不会将任何dom渲染到浏览器，他只会将它所包含的东西渲染到浏览器

基本用法
```
function K() {
  return (
    <React.Fragments>
      <div></div>
      <input />
    </React.Fragments>
  )
}
```
这样如果使用K组件的话就只有div和input渲染在浏览器。

还可以使用更简短的语法来声明Fragments。`<></>`除了它不支持key属性其他都一样。Fragments只支持key属性。

