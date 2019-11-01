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