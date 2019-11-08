import React, { Component } from 'react';
import './App.css';
import Context from './context';
import Ref from './ref';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Context />
        <Ref />
      </div>
    );
  }
}

export default App;
