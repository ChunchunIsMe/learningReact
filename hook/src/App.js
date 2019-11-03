import React, { Component } from 'react';
import Count from './component/Count';
import CountClass from './component/CountClass';
import Oblong from './component/Oblong';

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Count />
        <CountClass />
        <Oblong />
      </div>
    );
  }
}

export default App;
