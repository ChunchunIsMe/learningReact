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