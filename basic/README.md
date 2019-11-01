# 核心概念
因为核心概念比起高级指引和hook来书要简单很多，所以核心概念就放在一个demo中去讲了
## JSX
JSX是JavaScript的语法扩展，它可以是一个表达式，可以嵌入表达式，还能指定子元素和特定属性
```
const divValue = 'hello world';
const inputAttr = '请输入...';

const Input = (<input placeholder={inputAttr}></input>)
const Div = (<div>{divValue}</div>)
```
然后我们可以指定子元素的方式将Input和Div这两个元素放入到App.js中
```
// App.js
// ...
  render() {
    const divValue = 'hello world';
    const inputAttr = '请输入...';
    const Input = (<input placeholder={inputAttr}></input>)
    const Div = (<div>{divValue}</div>)
    return (
      <div className="App">
        {Input}
        {Div}
      </div>
    );
  }
// ...
```
React DOM在渲染所有输入内容之前，默认进行了转义。所以我们可以确保JSX在应用中永远不会被注入。

JSX表示对象

其实你在写
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用,就相当于
```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
所以我们可以像上面一样创建对象
## 元素渲染
我们上一节加入了JSX对象在App.js,可是为什么页面上就能显示了呢，这一切都是ReactDOM.render()这个Api的功劳

它可以将一个React元素渲染到根DOM节点中。详情请看index.js

React DOM会将元素和它的子元素与他们之前的状态进行比较，所以每次你的DOM进行修改时它都只更新它需要的部分，想看具体的算法实现请看Virtual DOM
## 组件和 Props
组件分为函数组件和 class 组件

定义组件最简单的方法就是编写JavaScript函数 而 App.js 则是一个class组件，我们如果要写成函数式组件可以这么写,函数式组件的返回值就是组件渲染的值。而class组件渲染的值则是render函数中的返回值。

> 注意： class组件必须继承React.Component 或者 React.PureComponent, 因为这样React才能确定 这个类是react组件，至于两者的区别，我们以后将会讲到

```
function App (props) {
  const divValue = 'hello world';
  const inputAttr = '请输入...';
  const Input = (<input placeholder={inputAttr}></input>)
  const Div = (<div>{divValue}</div>)
  return (
    <div className="App">
      {Input}
      {Div}
    </div>
  )
}
```
函数是一个有效React组件，因为它接收唯一带有数据的props对象并且返回一个React元素

之前我们写的 Div 和 Input 只是 Dom 标签而已，并不是组件。

我们可以通过`<组件名 />`或者`<组件名></组件名>`的方式来实例化出一个DOM来

我们可以通过`<组件名 属性名=属性值 />`的方式给组件中的props对象添加属性，这样的话就可以将属性传入组件中，函数式组件在实例化时，props作为参数传入函数中，而class组件props则挂载在this下。

现在有 App 这个 Class 组件了 所以我们来编写一个函数式组件吧， 新建 List.js
```
import React from 'react';
function List (props) {
  return (
    <ul>
      <li>hello {props.name}</li>
    </ul>
  )
}
export default List;
```
然后我们在App.js中加入这个组件吧
```
// ...
import List from './List';
// ...
render() {
    const divValue = 'hello world';
    const inputAttr = '请输入...';
    const Input = (<input placeholder={inputAttr}></input>)
    const Div = (<div>{divValue}</div>)
    const name = 'lucy';
    return (
      <div className="App">
        {Input}
        {Div}
        <List name="jack"></List>
        <List name={name}></List>
      </div>
    );
  }
// ...
```
## State和生命周期
State是挂载在组件this下的值，class组件可以使用它，函数式组件如果想使用state的话需要使用hook，这个先不讲后面我们会提到，我们先说class组件

我们新建一个Num.js文件，用来实现一个每秒加1的计时器
```
import React, { Component } from 'react';

class Num extends Component {

  render() {
    return (
      <div>{this.state.count}</div>
    )
  }
}

export default Num;
```
这样就设置了一个变量在组件中，如果要设置state的初始值可以在constructor 函数中设置state的初始值，修改state的值可以调用this.setState函数

> 注意：直接修改thi.state是不会重新渲染到dom上的，必须要在this.setState中修改

所以我们来继续计时器吧
```
import React, { Component } from 'react';

class Num extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
    }
  }

  addCount = () => {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div>{this.state.count}</div>
    )
  }
}

export default Num;
```
我们这样就完成了count的初始值和修改count并渲染到页面上，接下来我们要在组件添加到页面上的时候进行开始计时，并且在组件销毁时停止计时器，这个时候我们就可以用到周期函数 周期函数有很多，他们分别会在组件在不同的状态的时候调用，而我们要用到的周期函数是componentDidMount和componentWillUnmount,这两个周期函数分别会在组件挂载后和卸载前进行调用

所以我们使用它来完成我们的计时器
```
import React, { Component } from 'react';

class Num extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count
    }
  }

  componentDidMount = () => {
    this.id = setInterval(this.addCount, 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.id);
    this.id = null
  }

  addCount = () => {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div>{this.state.count}</div>
    )
  }
}

export default Num;
```
这样就可以了，我们不用渲染在页面上的变量完全可以不挂载在state下，直接挂载在this下就好了。然后我们在App.js中使用这两个组件
```
// ...
import Num from './Num';
// ...
  render() {
    // ...
    return (
      // ...
        <Num count={0}></Num>
        <Num count={10}></Num>
      // ...
    )
  }
// ...
```
这样我们就可以看到两个计时器在页面上了

但是这样我们的组件还不够完美，因为State的更新可能是异步的如果在this.setState使用props的值或者使用state的值来生成新的值的话，this.setState中应该使用函数作为参数，函数中会传入两个参数，分别是上一个state和props，所以我们修改一下Num.js中的addCount函数
```
// ...
  addCount = () => {
    this.setState((state, props) => ({
      count: ++state.count
    }))
  }
// ...
```
现在我们形成了一个基本的数据流通过props将父组件中的数据状态传入子组件，而父子组件又可以通过state来管理自己的数据状态。
## 事件处理
- React事件的命名采用小驼峰，而不是纯小写
- 使用JSX语法应该传入一个函数而不是字符串
- 你在函数中不能使用return false;来阻止默认事件必须使用preventDefault
- 事件函数中的this如果没用箭头函数或者bind为dom元素

事件算是比较简单的，所以我们直接整理所有的事件特点随后我们写一个按钮计数器，新建Count.js
```
import React, { Component } from 'react';

class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }


  addCount = () => {
    this.setState((state, props) => ({
      count: ++state.count
    }))
  }

  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.addCount}>+1</button>
      </div>
    )
  }
}

export default Count;
```
这里我们使用箭头函数，这样this.setState就可以确保使用了，当然你也可以使用bind或者其他更巧妙的办法将addCount中的this.setState可用。

然后我们在App.js中使用这个组件即可。
## 条件渲染
关于条件渲染react的做法是让你自由操作，你可以
1. 设置一个变量使用 if else 赋值之后在{}中放入这个变量实现条件渲染
2. {(true or false) && dom} 需要注意的是使用&&左边的值虽然会进行隐式转换，但是最好是boolean 因为左边值是false时如果不是boolean将会转化为字符串被渲染出来
3. {(true or false) ? dom1 : dom2}

因为比较简单这里我们就不举例子了
## 列表&key
我们可以在JSX中放入一个dom数组来渲染多个dom 但是如果放入数组每个dom元素必须指定一个key并且兄弟dom的key必须不同

当你在{}放入一个数组的时候react就认为你在渲染一个列表了，而key是帮助react识别哪些元素改变了，比如被添加或者删除。所以你应该给数组中每一个元素赋予一个确定的标识。关于key的用法和渲染我们可以看virtual dom

react支持了这项功能之后我们可以非常方便的循环渲染一个列表了，我们可以先生成一个dom数组`[dom1, dom2, ...]`然后放入`{}`也可以使用`{[value1,value2].map(item => <dom key={item.id}>{item.value}</dom2>)}`这种方式。反正你想怎么用就怎么用。

接下来我们使用这个功能生成一个列表组件,新建CircleList.js
```
import React from 'react';
function CircleList(props) {
  return (
    <ul>
      {
        props.list.map(item => (
          <li key={item.id}>{item.text}</li>
        ))
      }
    </ul>
  )
}
export default CircleList;
```
然后我们在App.js中加入这个组件
```
// ...
import CircleList from './CircleList';
// ...
  render() {
    const divValue = 'hello world';
    const inputAttr = '请输入...';
    const Input = (<input placeholder={inputAttr}></input>)
    const Div = (<div>{divValue}</div>)
    const name = 'lucy';

    const list1 = [{
      id: 1,
      text: '苹果'
    }, {
      id: 2,
      text: '香蕉'
    }];

    const list2 = [{
      id: 3,
      text: '栗子'
    }, {
      id: 4,
      text: '柿子'
    }]
    return (
      <div className="App">
        {Input}
        {Div}
        <List name="jack"></List>
        <List name={name}></List>
        <Num count={0}></Num>
        <Num count={10}></Num>
        <Count></Count>
        <CircleList list={list1}></CircleList>
        <CircleList list={list2}></CircleList>
      </div>
    );
  }
// ...
```
## 表单
表单中的 所有dom 如 input、textarea、select等如果需要受控都是使用vaule值来控制然后通过一系列的事件来实现双向绑定

我们创建一个FormItem.js来举例子
```
import React, { Component } from 'react';

class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      select: '1'
    }
  }

  inputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  selectChange = (e) => {
    this.setState({
      select: e.target.value
    })
  }
  render() {
    const { input, select } = this.state;
    const optionList = [
      {
        id: '1',
        text: '橘子'
      }, {
        id: '2',
        text: '橙子'
      }, {
        id: '3',
        text: '柚子'
      }
    ]
    return (
      <form>
        <input value={input} onChange={this.inputChange} />
        <select value={select} onChange={this.selectChange}>
          {
            optionList.map(item => (
              <option value={item.id} key={item.id}>{item.text}</option>
            ))
          }
        </select>
      </form>
    )
  }
}

export default FormItem;
```
这里的事件对象e react进行了封装，所以和普通js中的事件对象有些不一样。
## 状态提升
这里只是介绍了用法并没有说新的概念，官方文档对这个用法的例子已经非常好了，所以可以去[官方文档](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html '官方文档')看看
## 组合 vs 继承
我们可以使用props.children属性来获取组件实例中的子组件，我们创建一个Slot.js
```
import React from 'react';

function Solt(props) {
  return (
    <div style={{backgroundColor: 'skyblue'}}>
      {props.children}
    </div>
  )
}

export default Solt;
```
然后我们可以在App.js中用它
```
// ...
import Solt from './Slot';
// ...
  render() {
    const divValue = 'hello world';
    const inputAttr = '请输入...';
    const Input = (<input placeholder={inputAttr}></input>)
    const Div = (<div>{divValue}</div>)
    const name = 'lucy';

    const list1 = [{
      id: 1,
      text: '苹果'
    }, {
      id: 2,
      text: '香蕉'
    }];

    const list2 = [{
      id: 3,
      text: '栗子'
    }, {
      id: 4,
      text: '柿子'
    }]
    return (
      <div className="App">
        {Input}
        {Div}
        <List name="jack"></List>
        <List name={name}></List>
        <Num count={0}></Num>
        <Num count={10}></Num>
        <Count></Count>
        <CircleList list={list1}></CircleList>
        <CircleList list={list2}></CircleList>
        <FormItem></FormItem>
        <Solt>
          <div>
            solt1
          </div>
        </Solt>
        <Solt>
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </Solt>
      </div>
    );
  }
// ...
```
这样我们可以给子组件赋予不同的值，更好的实现了组件的抽象化。现在我们组件使用都是双闭合标签，但是如果使用时如果没有包东西还是使用单闭合标签的好，这样可以有效的区分开来，所以我们修改App.js
```
// ...
  render() {
    const divValue = 'hello world';
    const inputAttr = '请输入...';
    const Input = (<input placeholder={inputAttr}></input>)
    const Div = (<div>{divValue}</div>)
    const name = 'lucy';

    const list1 = [{
      id: 1,
      text: '苹果'
    }, {
      id: 2,
      text: '香蕉'
    }];

    const list2 = [{
      id: 3,
      text: '栗子'
    }, {
      id: 4,
      text: '柿子'
    }]
    return (
      <div className="App">
        {Input}
        {Div}
        <List name="jack" />
        <List name={name} />
        <Num count={0} />
        <Num count={10} />
        <Count />
        <CircleList list={list1} />
        <CircleList list={list2} />
        <FormItem />
        <Solt>
          <div>
            solt1
          </div>
        </Solt>
        <Solt>
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </Solt>
      </div>
    );
  }
// ...
```