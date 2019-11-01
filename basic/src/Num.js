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
    this.setState((state, props) => ({
      count: ++state.count
    }))
  }

  render() {
    return (
      <div>{this.state.count}</div>
    )
  }
}

export default Num;