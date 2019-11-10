import React, { Component } from 'react';
import './App.css';
import Context from './context';
import Ref from './ref';
import Portals from './Portals';
import Profiler from './Profiler';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Context />
        <Ref />
        <Portals />
        {/* <Profiler /> */}
      </div>
    );
  }
}

export default App;
