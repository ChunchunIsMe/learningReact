import React, { Component } from 'react';
import List from './List';
import Num from './Num';
import Count from './Count';
import CircleList from './CircleList';
import FormItem from './FormItem';
import Solt from './Slot';
import './App.css';

class App extends Component {
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
}

export default App;
