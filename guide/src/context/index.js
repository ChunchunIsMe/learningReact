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